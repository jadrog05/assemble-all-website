"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { submitQuoteRequest } from "@/app/request-quote/actions";
import {
  initialQuoteFormState,
  type QuoteFormState,
} from "@/app/request-quote/quote-form-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MAX_PHOTOS = 5;
const MAX_MB = 5;

const inputClass =
  "w-full rounded-lg border border-white/15 bg-[#0a0d17] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400/30";

const labelClass = "text-sm font-medium text-white/90";

function QuoteRequestFormFields({ onNewRequest }: { onNewRequest: () => void }) {
  const [state, formAction, isPending] = useActionState<
    QuoteFormState,
    FormData
  >(submitQuoteRequest, initialQuoteFormState);

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [preferredTiming, setPreferredTiming] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  useEffect(() => {
    if (state.success) {
      setEmail("");
      setMobile("");
      setPreferredTiming("");
      setItemDescription("");
      setPhotos([]);
      if (galleryRef.current) galleryRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  }, [state.success]);

  const mergeFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    setPhotos((prev) => {
      const next = [...prev];
      for (let i = 0; i < incoming.length; i++) {
        const f = incoming.item(i);
        if (!f || f.size === 0) continue;
        if (next.length >= MAX_PHOTOS) break;
        next.push(f);
      }
      return next;
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", email);
    fd.append("mobile", mobile);
    fd.append("preferredTiming", preferredTiming);
    fd.append("itemDescription", itemDescription);
    for (const f of photos) {
      fd.append("photos", f);
    }
    startTransition(() => {
      formAction(fd);
    });
  };

  if (state.success) {
    return (
      <Card className="border-white/10 bg-[#0a0d17] text-white">
        <CardHeader>
          <CardTitle>Thank you</CardTitle>
          <CardDescription className="text-white/70">
            Your quote request was received. We will get back to you soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/10"
            onClick={onNewRequest}
          >
            Submit another request
          </Button>
        </CardContent>
      </Card>
    );
  }

  const err = state.fieldErrors;

  return (
    <Card className="border-white/10 bg-[#0a0d17] text-white">
      <CardHeader>
        <CardTitle>Request a quote</CardTitle>
        <CardDescription className="text-white/70">
          Tell us what you need assembled and when. Add up to {MAX_PHOTOS}{" "}
          photos of your boxes (JPEG, PNG, WebP, or HEIC).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id={formId} onSubmit={handleSubmit} className="space-y-5">
          {state.message ? (
            <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {state.message}
            </p>
          ) : null}

          <div className="space-y-2">
            <label htmlFor={`${formId}-email`} className={labelClass}>
              Email
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(inputClass, err?.email && "border-red-400/60")}
            />
            {err?.email ? (
              <p className="text-sm text-red-300">{err.email}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${formId}-mobile`} className={labelClass}>
              Mobile number
            </label>
            <input
              id={`${formId}-mobile`}
              name="mobile"
              type="tel"
              autoComplete="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={cn(inputClass, err?.mobile && "border-red-400/60")}
            />
            {err?.mobile ? (
              <p className="text-sm text-red-300">{err.mobile}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${formId}-when`} className={labelClass}>
              When would you like it assembled?
            </label>
            <textarea
              id={`${formId}-when`}
              name="preferredTiming"
              required
              rows={3}
              value={preferredTiming}
              onChange={(e) => setPreferredTiming(e.target.value)}
              className={cn(
                inputClass,
                "min-h-[5rem] resize-y",
                err?.preferredTiming && "border-red-400/60"
              )}
            />
            {err?.preferredTiming ? (
              <p className="text-sm text-red-300">{err.preferredTiming}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${formId}-what`} className={labelClass}>
              What do you want assembled?
            </label>
            <textarea
              id={`${formId}-what`}
              name="itemDescription"
              required
              rows={4}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className={cn(
                inputClass,
                "min-h-[6rem] resize-y",
                err?.itemDescription && "border-red-400/60"
              )}
            />
            {err?.itemDescription ? (
              <p className="text-sm text-red-300">{err.itemDescription}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <span className={labelClass}>Photos of boxes (optional)</span>
            <p className="text-xs text-white/55">
              Up to {MAX_PHOTOS} photos, {MAX_MB} MB each. iPhone camera often
              saves as HEIC — supported.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10"
                onClick={() => galleryRef.current?.click()}
              >
                Choose photos
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10"
                onClick={() => cameraRef.current?.click()}
              >
                Take photo
              </Button>
            </div>
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                mergeFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                mergeFiles(e.target.files);
                e.target.value = "";
              }}
            />
            {err?.photos ? (
              <p className="text-sm text-red-300">{err.photos}</p>
            ) : null}
            {photos.length > 0 ? (
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                {photos.map((f, i) => (
                  <li
                    key={`${f.name}-${f.size}-${i}`}
                    className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-black/30 px-3 py-2"
                  >
                    <span className="truncate">{f.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-red-300 hover:bg-red-500/10 hover:text-red-200"
                      onClick={() => removePhoto(i)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:bg-blue-500"
          >
            {isPending ? "Sending…" : "Send quote request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function QuoteRequestForm() {
  const [instance, setInstance] = useState(0);
  return (
    <QuoteRequestFormFields
      key={instance}
      onNewRequest={() => setInstance((n) => n + 1)}
    />
  );
}
