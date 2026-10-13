import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const env = readFileSync(".env", "utf8");
const token = env
  .split("\n")
  .find((line) => line.startsWith("FIGMA_ACCESS_TOKEN="))
  ?.replace(/^FIGMA_ACCESS_TOKEN=/, "")
  ?.replace(/^[\"']|[\"']$/g, "")
  ?.trim();

if (!token) {
  console.error("FIGMA_ACCESS_TOKEN not found in .env");
  process.exit(1);
}

const nodeId = "55:2267";
const imagesUrl = `https://api.figma.com/v1/images/B6RBXSgE68tUCuObobgFIb?ids=${encodeURIComponent(
  nodeId
)}&format=jpg`;
const res = await fetch(imagesUrl, { headers: { "X-Figma-Token": token } });
if (!res.ok) {
  console.error("Figma Images API error:", res.status, await res.text());
  process.exit(1);
}
const { images } = await res.json();
const imageUrl = images?.[nodeId];
if (!imageUrl) {
  console.error("No image URL for node", nodeId);
  process.exit(1);
}
const imgRes = await fetch(imageUrl);
if (!imgRes.ok) {
  console.error("Failed to download image:", imgRes.status);
  process.exit(1);
}

mkdirSync(join("public", "Images"), { recursive: true });
writeFileSync(
  join("public", "Images", "faq-bg.jpg"),
  Buffer.from(await imgRes.arrayBuffer())
);
console.log("Wrote public/Images/faq-bg.jpg");
