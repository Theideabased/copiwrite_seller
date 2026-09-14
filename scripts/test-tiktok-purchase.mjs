import { createHash, randomUUID } from "node:crypto";

const pixelId = "DAJGBM3C77U2FG645JDG";
const endpoint = "https://business-api.tiktok.com/open_api/v1.3/event/track/";
const accessToken = process.env.TIKTOK_EVENTS_API_ACCESS_TOKEN?.trim();
const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE?.trim();

if (!accessToken) {
  console.error("Add TIKTOK_EVENTS_API_ACCESS_TOKEN to .env.local before running this test.");
  process.exit(1);
}

if (!testEventCode) {
  console.error("Add TIKTOK_TEST_EVENT_CODE to .env.local before running this test.");
  process.exit(1);
}

const eventId = `test_purchase_${randomUUID().replaceAll("-", "")}`;
const externalId = createHash("sha256").update("copiwrite-tiktok-test").digest("hex");
const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Access-Token": accessToken,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    event_source: "web",
    event_source_id: pixelId,
    test_event_code: testEventCode,
    data: [
      {
        event: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        user: {
          external_id: externalId,
          ip: "127.0.0.1",
          user_agent: "Copiwrite TikTok Events API test",
        },
        properties: {
          currency: "NGN",
          value: 5_000,
          content_type: "product",
          contents: [
            {
              content_id: "whatsapp-views-to-sales",
              content_name: "WhatsApp Views-to-Sales",
              content_type: "product",
              quantity: 1,
              price: 5_000,
            },
          ],
        },
        page: {
          url: "https://copiwrite.com/payment/verify",
        },
      },
    ],
  }),
});

const result = await response.json().catch(() => null);
if (!response.ok || result?.code !== 0) {
  console.error("TikTok rejected the test Purchase event:", result || response.statusText);
  process.exit(1);
}

console.log("TikTok accepted the test Purchase event.", {
  eventId,
  requestId: result?.request_id || "not-returned",
  testEventCode,
});

