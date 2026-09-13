import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(root, "social", "carousels");
const width = 1080;
const height = 1350;

const groups = [
  {
    number: "01",
    slug: "group-01-never-do",
    label: "5 SALES MISTAKES",
    background: "group-01-background.png",
    dark: true,
    hook: ["5 THINGS YOU", "SHOULD NEVER DO", "IF YOU WANT SALES", "ON WHATSAPP"],
    tips: [
      { title: ["DON’T POST", "ONLY PRICES."], body: ["A price with no value", "gives people no reason", "to care."] },
      { title: ["DON’T START", "WITH ‘BUY NOW.’"], body: ["First show the problem", "your product solves."] },
      { title: ["DON’T HIDE", "ALL YOUR PROOF."], body: ["Show real reviews, results", "and happy buyers."] },
      { title: ["DON’T REPLY", "WITH ONLY", "THE PRICE."], body: ["Explain what they get", "and why it helps."] },
      { title: ["DON’T GIVE UP", "AFTER ONE CHAT."], body: ["A calm follow-up can", "bring the buyer back."] },
    ],
    offerCta: ["CLICK THE LINK BELOW TO LEARN", "HOW TO TURN YOUR WHATSAPP VIEWS", "INTO SALES FOR ₦5,000. ↓"],
  },
  {
    number: "02",
    slug: "group-02-first-million",
    label: "YOUR FIRST ₦1 MILLION",
    background: "group-02-background.png",
    dark: false,
    hook: ["5 THINGS TO DO", "BEFORE YOUR", "FIRST ₦1 MILLION", "ON WHATSAPP"],
    tips: [
      { title: ["PICK ONE", "CLEAR BUYER."], body: ["If you speak to everyone,", "no one feels seen."] },
      { title: ["MAKE THE OFFER", "EASY TO GET."], body: ["What is it? Who is it for?", "Why should they care?"] },
      { title: ["SHOW PROOF", "OFTEN."], body: ["Share reviews, orders and", "real results people can trust."] },
      { title: ["TURN VIEWS", "INTO CHATS."], body: ["Ask one simple question", "that is easy to answer."] },
      { title: ["TRACK WHAT", "LEADS TO SALES."], body: ["Repeat the post, offer and", "follow-up that work."] },
    ],
    offerCta: ["CLICK THE LINK BELOW TO LEARN", "HOW TO MAKE YOUR FIRST ₦1 MILLION", "IN WHATSAPP SALES FOR ₦5,000. ↓"],
  },
  {
    number: "03",
    slug: "group-03-100-sales-weekly",
    label: "THE 100-SALE GOAL",
    background: "group-03-background.png",
    dark: true,
    hook: ["100 SALES", "A WEEK?", "START WITH THESE", "5 MOVES."],
    tips: [
      { title: ["DO THE MATH."], body: ["100 sales is about 15 a day.", "Know how many chats", "you need for one sale."] },
      { title: ["BUILD A DAILY", "STATUS PLAN."], body: ["Use a hook, value, proof,", "an offer and one next step."] },
      { title: ["GIVE ONE CLEAR", "NEXT STEP."], body: ["Tell people how to order.", "Make it easy to act."] },
      { title: ["FOLLOW UP EVERY", "WARM LEAD."], body: ["Keep a list. Return to people", "who showed real interest."] },
      { title: ["FIX THE WEAKEST", "PART EACH WEEK."], body: ["Low views? Fix attention.", "Few chats? Fix the offer."] },
    ],
    offerCta: ["CLICK THE LINK BELOW TO LEARN", "HOW TO MAKE 100 SALES A WEEK", "ON WHATSAPP FOR ₦5,000. ↓"],
  },
];

const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function textLines(lines, { x, y, size, lineHeight, fill, weight = 800, anchor = "start", family = "Arial, Helvetica, sans-serif", letterSpacing = 0 }) {
  return `<text x="${x}" y="${y}" fill="${fill}" text-anchor="${anchor}" font-family="${family}" font-size="${size}" font-weight="${weight}" letter-spacing="${letterSpacing}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${escapeXml(line)}</tspan>`).join("")}</text>`;
}

function baseSvg(group, page) {
  const ink = group.dark ? "#F8F6EC" : "#10271C";
  const muted = group.dark ? "#C6D2C8" : "#3E5C4C";
  const panel = group.dark ? "rgba(4,18,11,0.68)" : "rgba(255,252,242,0.88)";
  return { ink, muted, panel, top: `
    <rect width="1080" height="1350" fill="${group.dark ? "rgba(0,0,0,0.24)" : "rgba(255,255,255,0.08)"}"/>
    <rect x="56" y="54" width="${Math.max(300, group.label.length * 17 + 74)}" height="54" rx="27" fill="${panel}" stroke="${group.dark ? "#40C96B" : "#087B3F"}" stroke-width="2"/>
    <text x="84" y="89" fill="${ink}" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" letter-spacing="1.5">${escapeXml(group.label)}</text>
    <text x="1024" y="88" fill="${muted}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">${page}/7</text>
    <text x="56" y="1294" fill="${muted}" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" letter-spacing="2">COPIWRITE</text>
  ` };
}

function hookOverlay(group) {
  const { ink, muted, panel, top } = baseSvg(group, 1);
  const titleSize = group.number === "03" ? 104 : 74;
  const titleLine = group.number === "03" ? 112 : 92;
  return `<svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    ${top}
    <rect x="50" y="230" width="980" height="750" rx="30" fill="${panel}"/>
    ${textLines(group.hook, { x: 540, y: 382, size: titleSize, lineHeight: titleLine, fill: ink, weight: 900, anchor: "middle", letterSpacing: -2 })}
    <rect x="348" y="1040" width="384" height="76" rx="38" fill="#FFD348"/>
    <text x="540" y="1090" fill="#10271C" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="900">SWIPE TO SEE ALL 5 →</text>
    <text x="540" y="1178" fill="${muted}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700">Save this for your next sales post.</text>
  </svg>`;
}

function tipOverlay(group, tip, index) {
  const { ink, muted, panel, top } = baseSvg(group, index + 2);
  const titleSize = tip.title.length === 3 ? 72 : 82;
  return `<svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    ${top}
    <rect x="54" y="186" width="972" height="930" rx="32" fill="${panel}"/>
    <text x="92" y="420" fill="${group.dark ? "#53D27A" : "#D9E5D8"}" font-family="Georgia, serif" font-size="270" font-weight="900">${String(index + 1).padStart(2, "0")}</text>
    <text x="94" y="516" fill="#F2BE35" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="900" letter-spacing="3">THING ${index + 1}</text>
    ${textLines(tip.title, { x: 94, y: 626, size: titleSize, lineHeight: 88, fill: ink, weight: 900, letterSpacing: -2 })}
    <line x1="94" y1="${tip.title.length === 3 ? 886 : 798}" x2="986" y2="${tip.title.length === 3 ? 886 : 798}" stroke="${group.dark ? "#40C96B" : "#087B3F"}" stroke-width="4"/>
    ${textLines(tip.body, { x: 94, y: tip.title.length === 3 ? 962 : 884, size: 39, lineHeight: 55, fill: muted, weight: 600 })}
    <text x="1024" y="1294" fill="${muted}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">Share this with a vendor →</text>
  </svg>`;
}

function offerOverlay(group) {
  const { top } = baseSvg(group, 7);
  return `<svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    <rect width="1080" height="1350" fill="rgba(2,12,7,0.76)"/>
    ${top}
    <rect x="54" y="760" width="972" height="462" rx="32" fill="rgba(4,18,11,0.96)" stroke="#37B960" stroke-width="2"/>
    <rect x="102" y="824" width="876" height="326" rx="34" fill="#FFD348"/>
    ${textLines(group.offerCta, { x: 540, y: 914, size: 45, lineHeight: 69, fill: "#10271C", weight: 900, anchor: "middle", letterSpacing: -0.5 })}
  </svg>`;
}

async function renderSlide(group, page, overlay, extra = []) {
  const destination = join(outputRoot, group.slug, `slide-${String(page).padStart(2, "0")}.png`);
  const background = join(outputRoot, "assets", group.background);
  await sharp(background)
    .resize(width, height, { fit: "cover" })
    .composite([...extra, { input: Buffer.from(overlay), top: 0, left: 0 }])
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(destination);
  return destination;
}

async function makeContactSheet(group, slides) {
  const thumbWidth = 270;
  const thumbHeight = 338;
  const gap = 18;
  const columns = 3;
  const rows = 3;
  const sheetWidth = columns * thumbWidth + (columns + 1) * gap;
  const sheetHeight = rows * thumbHeight + (rows + 1) * gap;
  const composites = [];
  for (let index = 0; index < slides.length; index += 1) {
    const input = await sharp(slides[index]).resize(thumbWidth, thumbHeight).png().toBuffer();
    composites.push({ input, left: gap + (index % columns) * (thumbWidth + gap), top: gap + Math.floor(index / columns) * (thumbHeight + gap) });
  }
  await sharp({ create: { width: sheetWidth, height: sheetHeight, channels: 3, background: "#E9E4D8" } })
    .composite(composites)
    .jpeg({ quality: 88 })
    .toFile(join(outputRoot, group.slug, "contact-sheet.jpg"));
}

await mkdir(outputRoot, { recursive: true });
const productMockup = await sharp(join(root, "public", "products", "whatsapp-guide-bonus-bundle.png"))
  .resize({ width: 970 })
  .png()
  .toBuffer();

for (const group of groups) {
  const slides = [];
  slides.push(await renderSlide(group, 1, hookOverlay(group)));
  for (let index = 0; index < group.tips.length; index += 1) {
    slides.push(await renderSlide(group, index + 2, tipOverlay(group, group.tips[index], index)));
  }
  slides.push(await renderSlide(group, 7, offerOverlay(group), [{ input: productMockup, left: 55, top: 75 }]));
  await makeContactSheet(group, slides);
}

console.log(`Created ${groups.length * 7} carousel slides in ${outputRoot}`);
