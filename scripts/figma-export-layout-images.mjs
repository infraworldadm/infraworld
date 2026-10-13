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

const files = [
  { id: "38:2384", out: "infra-bg.jpg" },
  { id: "44:3327", out: "reaed-bg.jpg" },
  { id: "41:3195", out: "enterprise-bg.jpg" },
  { id: "46:1033", out: "image-8.jpg" },
  { id: "73:3776", out: "image-10.jpg" },
];

const base = "https://api.figma.com/v1/images/B6RBXSgE68tUCuObobgFIb";
mkdirSync(join("public", "Images"), { recursive: true });

for (const f of files) {
  const imagesUrl = `${base}?ids=${encodeURIComponent(f.id)}&format=jpg`;
  const res = await fetch(imagesUrl, { headers: { "X-Figma-Token": token } });
  if (!res.ok) {
    console.error("Figma Images API error:", f.id, res.status, await res.text());
    process.exit(1);
  }
  const { images } = await res.json();
  const imageUrl = images?.[f.id];
  if (!imageUrl) {
    console.error("No image URL for node", f.id);
    process.exit(1);
  }
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    console.error("Failed to download image:", f.id, imgRes.status);
    process.exit(1);
  }
  writeFileSync(
    join("public", "Images", f.out),
    Buffer.from(await imgRes.arrayBuffer())
  );
  console.log("Wrote", f.out);
}
