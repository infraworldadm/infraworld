import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const env = readFileSync(join(root, ".env"), "utf8");
const token = env
  .split("\n")
  .find((l) => l.startsWith("FIGMA_ACCESS_TOKEN="))
  ?.replace(/^FIGMA_ACCESS_TOKEN=/, "")
  ?.replace(/^["']|["']$/g, "")
  ?.trim();

if (!token) {
  console.error("FIGMA_ACCESS_TOKEN not found in .env");
  process.exit(1);
}

// Hero background "image 1" node id
const nodeId = "29:2192";
const imagesUrl = `https://api.figma.com/v1/images/B6RBXSgE68tUCuObobgFIb?ids=${encodeURIComponent(nodeId)}&format=jpg`;
const ir = await fetch(imagesUrl, { headers: { "X-Figma-Token": token } });
if (!ir.ok) {
  console.error("Figma Images API error:", ir.status, await ir.text());
  process.exit(1);
}

const { images } = await ir.json();
const imageUrl = images?.[nodeId];
if (!imageUrl) {
  console.error("No image URL for", nodeId);
  process.exit(1);
}

const imgRes = await fetch(imageUrl);
if (!imgRes.ok) {
  console.error("Failed to download image:", imgRes.status);
  process.exit(1);
}

const dir = join(root, "public", "Images");
mkdirSync(dir, { recursive: true });
const out = join(dir, "hero-bg.jpg");
writeFileSync(out, Buffer.from(await imgRes.arrayBuffer()));
console.log("Wrote", out);
