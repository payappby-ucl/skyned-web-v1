import { DayOfWeek } from "schema-dts";

export const env = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV as string,
  organization: {
    name: "Skyned Consults Corporation",
    email: "info@skynedconsults.com",
    telephone: "+1 (226) 773 3101",
    addressLocality: "Ontario",
    addressRegion: "CA",
    postalCode: "N2M 0B5",
    streetAddress: "403 Westwood Drive, Kitchener",
    keywords:
      "Skyned Consults, Skyned educational consults, Study Abroad Consultants, Study Visa Assistance, Study in Canada, Study in the UK, Study in Australia, Study in the USA, International Student Services, Study Abroad, Student Visa, Student Visa Consultants, Education Consultancy Services, University Admission Assistance, Scholarships for International Students, Study and Work Abroad",
    description:
      "We offer free expert support for international study applications into bachelor's, master's & diploma programs. Get guidance on admissions, visas, and study funding.",
    hoursAvailable: {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ] as DayOfWeek[],
      opens: "09:00",
      closes: "17:00",
    },
  },
  client: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
    firebaseConfig: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN as string,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID as string,
      appId: process.env.NEXT_PUBLIC_APP_ID as string,
    },
  },
  server: {
    baseUrl: process.env.API_URL as string,
  },
  socials: {
    twitter: {
      handle: process.env.NEXT_PUBLIC_TWITTER_HANDLE as string,
      id: process.env.NEXT_PUBLIC_TWITTER_ID as string,
    },
    instagram: {
      handle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE as string,
    },
    tiktok: {
      handle: process.env.NEXT_PUBLIC_TIKTOK_HANDLE as string,
    },
    facebook: {
      handle: process.env.NEXT_PUBLIC_FACEBOOK_HANDLE as string,
    },
    linkedin: {
      handle: process.env.NEXT_PUBLIC_LINKEDIN_HANDLE as string,
    },
  },
  seo: {
    googleTagManagerId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    googleSiteVerificationId:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_SITE_ID,
  },
};
