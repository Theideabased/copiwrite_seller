import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import {
  hasValidDeliveryAccessKey,
  isCompletedProductPayment,
  verifyPaystackTransaction,
} from "@/lib/paystack";
import { findWhatsAppProductFile } from "@/lib/whatsapp-product-files";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference") || "";
  const accessKey = request.nextUrl.searchParams.get("key") || "";
  const requestedFile = request.nextUrl.searchParams.get("file") || "whatsapp-views-to-sales";

  if (!/^[A-Za-z0-9.=-]{5,100}$/.test(reference) || !hasValidDeliveryAccessKey(reference, accessKey)) {
    return NextResponse.json({ message: "This download link is invalid." }, { status: 403 });
  }

  const verification = await verifyPaystackTransaction(reference).catch(() => null);
  if (!verification || !isCompletedProductPayment(verification)) {
    return NextResponse.json({ message: "A completed payment is required." }, { status: 403 });
  }

  const productFile = findWhatsAppProductFile(requestedFile);
  if (!productFile) {
    return NextResponse.json({ message: "This product file does not exist." }, { status: 404 });
  }

  try {
    const file = await readFile(
      path.join(process.cwd(), "products", productFile.filename),
    );
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${productFile.downloadName}"`,
        "Content-Length": String(file.byteLength),
        "Cache-Control": "private, no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch (error) {
    console.error("Guide download failed:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: "The guide could not be downloaded right now. Please try again." },
      { status: 500 },
    );
  }
}
