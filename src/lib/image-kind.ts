export type ImageKind = "jpeg" | "png" | "webp" | "heif";

const HEIF_BRANDS = new Set([
  "heic",
  "heix",
  "hevc",
  "heim",
  "heis",
  "hevm",
  "hevs",
  "mif1",
  "msf1",
]);

function readAscii(buf: Uint8Array, offset: number, len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += String.fromCharCode(buf[offset + i]!);
  }
  return s;
}

function isJpeg(buf: Uint8Array): boolean {
  return (
    buf.length >= 3 &&
    buf[0] === 0xff &&
    buf[1] === 0xd8 &&
    buf[2] === 0xff
  );
}

function isPng(buf: Uint8Array): boolean {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (buf.length < sig.length) return false;
  return sig.every((b, i) => buf[i] === b);
}

function isWebp(buf: Uint8Array): boolean {
  if (buf.length < 12) return false;
  if (readAscii(buf, 0, 4) !== "RIFF") return false;
  return readAscii(buf, 8, 4) === "WEBP";
}

function isHeif(buf: Uint8Array): boolean {
  if (buf.length < 20) return false;
  const boxSize =
    (buf[0]! << 24) | (buf[1]! << 16) | (buf[2]! << 8) | buf[3]!;
  if (boxSize < 16 || boxSize > 4096 || boxSize > buf.length) return false;
  if (readAscii(buf, 4, 4) !== "ftyp") return false;
  const major = readAscii(buf, 8, 4);
  if (HEIF_BRANDS.has(major)) return true;
  let offset = 16;
  while (offset + 4 <= 8 + boxSize && offset + 4 <= buf.length) {
    const brand = readAscii(buf, offset, 4);
    if (HEIF_BRANDS.has(brand)) return true;
    offset += 4;
  }
  return false;
}

export function detectImageKind(buffer: ArrayBuffer): ImageKind | null {
  const buf = new Uint8Array(buffer);
  if (buf.length < 12) return null;
  if (isJpeg(buf)) return "jpeg";
  if (isPng(buf)) return "png";
  if (isWebp(buf)) return "webp";
  if (isHeif(buf)) return "heif";
  return null;
}

export function extensionForKind(kind: ImageKind): string {
  switch (kind) {
    case "jpeg":
      return "jpg";
    case "png":
      return "png";
    case "webp":
      return "webp";
    case "heif":
      return "heic";
    default:
      return "bin";
  }
}

export function contentTypeForKind(kind: ImageKind): string {
  switch (kind) {
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heif":
      return "image/heic";
    default:
      return "application/octet-stream";
  }
}
