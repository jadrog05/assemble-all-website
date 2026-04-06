"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

import {
  contentTypeForKind,
  detectImageKind,
  extensionForKind,
} from "@/lib/image-kind";

import type { QuoteFormState } from "./quote-form-state";

const MAX_PHOTOS = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type R2BucketLike = {
  put(
    key: string,
    value: ArrayBuffer | Uint8Array,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>;
};

export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const preferredTiming = String(formData.get("preferredTiming") ?? "").trim();
  const itemDescription = String(formData.get("itemDescription") ?? "").trim();

  const fieldErrors: QuoteFormState["fieldErrors"] = {};

  if (!email) fieldErrors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "Enter a valid email address.";

  if (!mobile) fieldErrors.mobile = "Enter your mobile number.";
  else {
    const digits = mobile.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15)
      fieldErrors.mobile = "Enter a valid mobile number.";
  }

  if (!preferredTiming)
    fieldErrors.preferredTiming = "Describe when you would like the assembly.";

  if (!itemDescription)
    fieldErrors.itemDescription = "Describe what you need assembled.";

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  const rawFiles = formData.getAll("photos");
  const files: File[] = [];
  for (const entry of rawFiles) {
    if (entry instanceof File && entry.size > 0) files.push(entry);
  }

  if (files.length > MAX_PHOTOS) {
    return {
      success: false,
      fieldErrors: { photos: `You can upload up to ${MAX_PHOTOS} photos.` },
    };
  }

  for (let i = 0; i < files.length; i++) {
    const f = files[i]!;
    if (f.size > MAX_FILE_BYTES) {
      return {
        success: false,
        fieldErrors: {
          photos: `Each photo must be at most ${MAX_FILE_BYTES / (1024 * 1024)} MB.`,
        },
      };
    }
  }

  let bucket: R2BucketLike | undefined;
  try {
    const ctx = await getCloudflareContext({ async: true });
    bucket = (ctx.env as { QUOTE_PHOTOS?: R2BucketLike }).QUOTE_PHOTOS;
  } catch {
    return {
      success: false,
      message:
        "Quote submission is unavailable in this environment. Try again later or call us.",
    };
  }
  if (!bucket) {
    return {
      success: false,
      message:
        "Quote photo storage is not set up yet. Please call us or try again later.",
    };
  }

  const submissionId = crypto.randomUUID();
  const prefix = `quotes/${submissionId}`;
  const photoRecords: { key: string; originalName: string }[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i]!;
    const buf = await file.arrayBuffer();
    const kind = detectImageKind(buf);
    if (!kind) {
      return {
        success: false,
        fieldErrors: {
          photos:
            "One or more files are not supported images (use JPEG, PNG, WebP, or HEIC).",
        },
      };
    }
    const ext = extensionForKind(kind);
    const key = `${prefix}/photo-${i + 1}.${ext}`;
    try {
      await bucket.put(key, buf, {
        httpMetadata: { contentType: contentTypeForKind(kind) },
      });
    } catch {
      return {
        success: false,
        message:
          "We couldn’t upload your photo(s) right now. Please try again later or contact us.",
      };
    }
    photoRecords.push({ key, originalName: file.name || `photo-${i + 1}` });
  }

  const meta = {
    submittedAt: new Date().toISOString(),
    email,
    mobile,
    preferredTiming,
    itemDescription,
    photos: photoRecords,
  };

  const metaBytes = new TextEncoder().encode(JSON.stringify(meta, null, 2));
  try {
    await bucket.put(`${prefix}/meta.json`, metaBytes, {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
  } catch {
    return {
      success: false,
      message:
        "We saved your request but couldn’t finalize it. Please contact us to confirm your submission.",
    };
  }

  return { success: true };
}
