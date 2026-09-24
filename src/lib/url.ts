// Normalise Astro's BASE_URL (which has no trailing slash) into a joinable prefix.
const raw = import.meta.env.BASE_URL;

export const base = raw.endsWith("/") ? raw : `${raw}/`;

export function url(path = ""): string {
  return `${base}${path.replace(/^\//, "")}`;
}
