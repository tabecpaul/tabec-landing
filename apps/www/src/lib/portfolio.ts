import fs from "node:fs";
import path from "node:path";

const PORTFOLIO_IMAGES_DIR = path.join(process.cwd(), "public/images/portfolio");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export function getPortfolioImages(slug: string): string[] {
  const dir = path.join(PORTFOLIO_IMAGES_DIR, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => `/images/portfolio/${slug}/${file}`);
}
