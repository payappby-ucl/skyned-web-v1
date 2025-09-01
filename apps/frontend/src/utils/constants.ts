export const COOKIE_CONSENT_STORAGE_KEY = "cookieConsent";
export const WHATSAPP_PHONE_NUMBER = "2348148171397";
export const serverCacheTags = {
  auth: "auth",
  faqs: "faqs",
  schools: "schools",
  accommodations: "accommodations",
  intakes: "intakes",
  programs: "programs",
  blogs: "blogs",
  categories: "categories",
  tags: "tags",
} as const;

/** Default Page Limit */
export const DEFAULT_PAGINATION_LIMIT = 54;

/** Countries we currently operate in */
export const supportedCountries = [
  { label: "Australia 🇦🇺", value: "AU" },
  { label: "United Kingdom 🇬🇧", value: "GB" },
  { label: "Germany 🇩🇪", value: "DE" },
  { label: "Canada 🇨🇦", value: "CA" },
  { label: "France 🇫🇷", value: "FR" },
  { label: "United States 🇺🇸", value: "US" },
  { label: "Malta 🇲🇹", value: "MT" },
] as const;
