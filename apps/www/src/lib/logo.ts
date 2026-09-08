import fs from "node:fs";
import path from "node:path";

const LOGO_DIR = path.join(process.cwd(), "public/images/logo");
const IMAGE_EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg", ".svg"];
const FALLBACK_LOGO = "/tabec-logo.png";

export function getLogoSrc(): string {
  if (!fs.existsSync(LOGO_DIR)) return FALLBACK_LOGO;
  const file = fs
    .readdirSync(LOGO_DIR)
    .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort()[0];
  return file ? `/images/logo/${file}` : FALLBACK_LOGO;
}
