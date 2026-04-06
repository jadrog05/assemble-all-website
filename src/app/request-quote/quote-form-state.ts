export type QuoteFormState = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<
    Record<
      "email" | "mobile" | "preferredTiming" | "itemDescription" | "photos",
      string
    >
  >;
};

export const initialQuoteFormState: QuoteFormState = { success: false };
