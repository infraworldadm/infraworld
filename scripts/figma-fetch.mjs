import { readFileSync, writeFileSync } from "fs";
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

const url =
  "https://api.figma.com/v1/files/B6RBXSgE68tUCuObobgFIb?depth=4&nodes=22-696";
const res = await fetch(url, { headers: { "X-Figma-Token": token } });

if (!res.ok) {
  console.error("Figma API error:", res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
writeFileSync(join(root, "figma_response.json"), JSON.stringify(data, null, 2));
console.log("Wrote figma_response.json");
