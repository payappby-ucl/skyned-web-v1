import { z } from "@workspace/ui/lib/utils";

export const CookieConsentForm = z.object({
  necessary: z.boolean().default(true),
  functional: z.boolean().default(false),
  marketing: z.boolean().default(false),
  analytics: z.boolean().default(false),
});
export type CookieConsentForm = z.infer<typeof CookieConsentForm>;
