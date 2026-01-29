# Skyned Consults Corporation

![logo](https://skyned-frontend--skyned-test-31a2e.us-central1.hosted.app/assets/images/brand/icon.png "Logo")

## 🏗️ Monorepo

This is a **monorepo** managed with [pnpm workspaces](https://pnpm.io/workspaces).  
It contains multiple projects that together form the full Skyned's system. It contains the following:

- [Skyned's public facing frontend](https://www.skynedconsults.com)
- [Skyned's admin facing frontend](https://admin.skynedconsults.com)
- Skyned's backend

## 🧩 General Project Structure

```text
.
├── README.md
├── apphosting.admindev.yaml # config file for admin staging frontend hosting
├── apphosting.adminprod.yaml # config file for admin production frontend hosting
├── apphosting.frontenddev.yaml # config file for frontend staging hosting
├── apphosting.frontendprod.yaml # config file for frontend hosting
├── apphosting.yaml
├── apps
│   ├── admin
│   ├── backend
│   └── frontend
├── nx.json
├── package.json
├── packages
│   ├── api
│   ├── eslint-config
│   ├── shared
│   ├── typescript-config
│   └── ui
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.json
```

## Skyned Frontend

This project is a website serving as the public facing platform through which Skyned showcases and renders it's services to the general public

---

### 🧩 Project Structure

```text
.
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   └── assets
│       ├── images
│       │   ├── android-chrome-192x192.png
│       │   ├── android-chrome-512x512.png
│       │   ├── apple-icon.png
│       │   ├── backgrounds
│       │   │   ├── about-bg.jpg
│       │   │   ├── about-bg.png
│       │   │   ├── blog-bg.png
│       │   │   ├── consultation-bg.png
│       │   │   ├── faq-1.png
│       │   │   ├── faq-2.png
│       │   │   ├── faq-3.png
│       │   │   ├── faqs.png
│       │   │   ├── infohub-bg.png
│       │   │   ├── loan-bg.png
│       │   │   ├── loan.jpg
│       │   │   ├── pattern-1.png
│       │   │   ├── privacy-bg.png
│       │   │   ├── resources-bg.jpg
│       │   │   ├── school-bg.png
│       │   │   ├── students-1.png
│       │   │   ├── students.png
│       │   │   └── whatsapp_background.jpeg
│       │   ├── brand
│       │   │   ├── icon.png
│       │   │   ├── icon_black.png
│       │   │   ├── icon_gray.png
│       │   │   ├── logo.png
│       │   │   ├── logo_black.png
│       │   │   ├── logo_gray.png
│       │   │   └── logo_white.png
│       │   ├── consultation.jpg
│       │   ├── countries
│       │   │   ├── australia.jpeg
│       │   │   ├── canada.jpg
│       │   │   ├── france.jpg
│       │   │   ├── germany.jpg
│       │   │   ├── malta.jpeg
│       │   │   ├── united_kingdom.jpeg
│       │   │   └── united_states.jpeg
│       │   ├── favicon.ico
│       │   ├── icef_badge.png
│       │   ├── icon.png
│       │   ├── opengraph-image.png
│       │   ├── partners-icons
│       │   │   ├── mpower.png
│       │   │   └── passage.png
│       │   ├── products
│       │   │   ├── 1.png
│       │   │   ├── 2.png
│       │   │   ├── 3.png
│       │   │   ├── 4.png
│       │   │   └── 5.png
│       │   └── visa_consultation.jpg
│       └── svgs
│           ├── icon.svg
│           ├── icon_gray.svg
│           ├── logo.svg
│           ├── logo_gray.svg
│           └── logo_white.svg
├── src
│   ├── app
│   │   ├── _components
│   │   │   ├── analytics.tsx
│   │   │   ├── blog.tsx
│   │   │   ├── cookie
│   │   │   │   ├── cookie-banner.tsx
│   │   │   │   ├── cookie-settings.tsx
│   │   │   │   └── schema.ts
│   │   │   ├── hero.tsx
│   │   │   ├── jumbotron.tsx
│   │   │   ├── partners.tsx
│   │   │   ├── personality.tsx
│   │   │   ├── products.tsx
│   │   │   ├── schema.ts
│   │   │   ├── search.tsx
│   │   │   └── testimonials.tsx
│   │   ├── about
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── api
│   │   │   ├── scholarships
│   │   │   │   └── route.ts
│   │   │   ├── schools
│   │   │   │   ├── [slug]
│   │   │   │   │   ├── programs
│   │   │   │   │   │   ├── [pslug]
│   │   │   │   │   │   │   └── route.ts
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── search
│   │   │       └── route.ts
│   │   ├── blog
│   │   │   ├── [slug]
│   │   │   │   ├── _components
│   │   │   │   │   └── related-posts.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── _components
│   │   │   │   ├── categories.tsx
│   │   │   │   ├── featured.tsx
│   │   │   │   ├── latest-posts.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   └── post.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── consultation
│   │   │   ├── page.tsx
│   │   │   ├── physical-consultation
│   │   │   │   ├── page.tsx
│   │   │   │   └── sitemap.ts
│   │   │   ├── sitemap.ts
│   │   │   └── visa-consultation
│   │   │       ├── page.tsx
│   │   │       └── sitemap.ts
│   │   ├── contact
│   │   │   ├── _actions
│   │   │   │   ├── contact-us.ts
│   │   │   │   └── index.ts
│   │   │   ├── _components
│   │   │   │   ├── contact-form.tsx
│   │   │   │   └── offices
│   │   │   │       ├── office.tsx
│   │   │   │       └── offices.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── error.tsx
│   │   ├── faqs
│   │   │   ├── _components
│   │   │   │   └── faqs.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── information-hub
│   │   │   ├── _components
│   │   │   │   ├── scholarship
│   │   │   │   │   └── scholarship-summary.tsx
│   │   │   │   └── scholarship-summary-list.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── layout.tsx
│   │   ├── loans
│   │   │   ├── _actions
│   │   │   │   └── index.ts
│   │   │   ├── _components
│   │   │   │   └── loan-application.tsx
│   │   │   ├── eligibility
│   │   │   │   ├── _components
│   │   │   │   │   ├── form.tsx
│   │   │   │   │   ├── program-combobox-search.tsx
│   │   │   │   │   └── school-combobox-search.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── our-village
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── page.tsx
│   │   ├── privacy-policy
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── scholarships
│   │   │   ├── [slug]
│   │   │   │   └── page.tsx
│   │   │   ├── _components
│   │   │   │   ├── list.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   └── scholarship-post.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── schools
│   │   │   ├── [slug]
│   │   │   │   ├── page.tsx
│   │   │   │   └── programs
│   │   │   │       ├── [pslug]
│   │   │   │       │   ├── _actions.ts
│   │   │   │       │   │   ├── form.ts
│   │   │   │       │   │   └── index.ts
│   │   │   │       │   ├── _components
│   │   │   │       │   │   ├── apply-form.tsx
│   │   │   │       │   │   ├── education-level.tsx
│   │   │   │       │   │   ├── english-proficiency.tsx
│   │   │   │       │   │   ├── fee.tsx
│   │   │   │       │   │   ├── intakes.tsx
│   │   │   │       │   │   ├── program-gate-modal.tsx
│   │   │   │       │   │   ├── program-header.tsx
│   │   │   │       │   │   └── tab-watcher.tsx
│   │   │   │       │   └── page.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── _components
│   │   │   │   ├── card.tsx
│   │   │   │   ├── list.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   └── program
│   │   │   │       └── index.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── search
│   │   │   ├── _components
│   │   │   │   └── list.tsx
│   │   │   ├── page.tsx
│   │   │   └── sitemap.ts
│   │   ├── sitemap.ts
│   │   └── team
│   │       ├── _components
│   │       │   ├── member-details.tsx
│   │       │   ├── our-team.tsx
│   │       │   └── team-member.tsx
│   │       ├── page.tsx
│   │       └── sitemap.ts
│   ├── components
│   │   ├── alert.tsx
│   │   ├── chats
│   │   │   └── whatsapp.tsx
│   │   ├── country-display.tsx
│   │   ├── country.tsx
│   │   ├── custom-bredcrumb.tsx
│   │   ├── data-fetching-handler.tsx
│   │   ├── date-display.tsx
│   │   ├── footer
│   │   │   ├── accreditation.tsx
│   │   │   ├── actions
│   │   │   │   ├── index.ts
│   │   │   │   └── subscribe.ts
│   │   │   ├── copy-right.tsx
│   │   │   ├── footer-nav.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── news-letter-form.tsx
│   │   │   ├── news-letter.tsx
│   │   │   ├── schema.ts
│   │   │   └── socials.tsx
│   │   ├── format-currency.tsx
│   │   ├── format-number.tsx
│   │   ├── loading.tsx
│   │   ├── nav.tsx
│   │   ├── navigation.tsx
│   │   ├── personality-test.tsx
│   │   ├── profile.tsx
│   │   ├── program-card.tsx
│   │   ├── providers
│   │   │   ├── auth-provider.tsx
│   │   │   ├── cookie-consent.tsx
│   │   │   ├── tanstack-provider.tsx
│   │   │   └── theme-provider.tsx
│   │   ├── search-filters.tsx
│   │   ├── social-icons.tsx
│   │   ├── social-share.tsx
│   │   ├── state-display.tsx
│   │   └── svg.tsx
│   ├── config
│   │   ├── env.ts
│   │   ├── firebase.ts
│   │   └── index.ts
│   ├── hooks
│   │   ├── use-financial-aid-eligibility.ts
│   │   └── use-get.ts
│   ├── interfaces
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── lib
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils
│       ├── constants.ts
│       ├── data
│       │   ├── consultation.ts
│       │   ├── contacts.ts
│       │   ├── faqs.ts
│       │   ├── index.ts
│       │   ├── mission-vision.ts
│       │   └── team.ts
│       ├── index.ts
│       ├── shared-json-ld.ts
│       └── shared-metadata.ts
└── tsconfig.json
```

---

### 🧱 Tech Stack

- [React](https://react.dev) - Javascript frontend framework
- [Nextjs](https://nextjs.org) - Framework built on top of [React](https://react.dev) with added performance and optimizations
- [Typescript](https://www.typescriptlang.org/) - Programming language. Type safe code
- [Tailwindcss](https://tailwindcss.com/) - CSS Library

---

### 📦 Prerequisites

Before setting up, ensure you have:

- [Node.js](https://nodejs.org/) ≥ 20
- [pnpm](https://pnpm.io)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [A Firebase project](https://console.firebase.google.com/)

---

### ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   https://github.com/beantech-designs/skyned.git
   cd skyned
   ```

2. **Install Dependencies**

   ```bash
   pnpm i
   ```

3. **Change into project directory**

   ```bash
   cd apps/frontend
   ```

4. **Set up environment variables**

   See .env.sample for environment variables

   ```bash
   # * Client ENV
   NEXT_PUBLIC_APP_ENV=emulator # Only use this when running locally
   NEXT_PUBLIC_BASE_URL=

   NEXT_PUBLIC_API_KEY=
   NEXT_PUBLIC_AUTH_DOMAIN=
   NEXT_PUBLIC_PROJECT_ID=
   NEXT_PUBLIC_STORAGE_BUCKET=
   NEXT_PUBLIC_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_APP_ID=


   # * Server ENV
   API_URL=

   # * Socials
   NEXT_PUBLIC_TWITTER_HANDLE=
   NEXT_PUBLIC_TWITTER_ID=
   NEXT_PUBLIC_INSTAGRAM_HANDLE=
   NEXT_PUBLIC_TIKTOK_HANDLE=
   NEXT_PUBLIC_FACEBOOK_HANDLE=
   NEXT_PUBLIC_LINKEDIN_HANDLE=

   # * Tags and verification
   NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=
   NEXT_PUBLIC_GOOGLE_VERIFICATION_SITE_ID=
   ```

   create environment variable file and add all necessary envs

   ```bash
    touch .env.dev
    touch .env.local

    # Backend running locally
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    API_URL=http://127.0.0.1:5001/skyned-test-31a2e/us-central1/api

    # Backend running on the staging remote environment
    NEXT_PUBLIC_BASE_URL=https://skyned-frontend--skyned-test-31a2e.us-central1.hosted.app
    API_URL=https://api-dxmhb5dscq-uc.a.run.app
   ```

   leave .env.local empty and add env variables to .env.dev

5. **Start local server**

   ```bash
   pnpm run dev
   ```

   Onces started, frontend server will be available at:

   ```bash
    http://localhost:3000
   ```

## Skyned Admin

This project is a website serving as the admin internal platform

---

### 🧩 Project Structure for admin

```text
.
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   └── assets
│       ├── images
│       │   ├── about_us.jpg
│       │   ├── android-chrome-192x192.png
│       │   ├── android-chrome-512x512.png
│       │   ├── apple-icon.png
│       │   ├── backgrounds
│       │   │   └── pattern-1.png
│       │   ├── brand
│       │   │   ├── icon.png
│       │   │   ├── icon_black.png
│       │   │   ├── icon_gray.png
│       │   │   ├── icon_white.png
│       │   │   ├── logo.png
│       │   │   ├── logo_black.png
│       │   │   ├── logo_gray.png
│       │   │   └── logo_white.png
│       │   ├── consultation.jpg
│       │   ├── countries
│       │   │   ├── australia.jpeg
│       │   │   ├── canada.jpg
│       │   │   ├── united_kingdom.jpeg
│       │   │   └── united_states.jpeg
│       │   ├── favicon.ico
│       │   ├── icef_badge.png
│       │   ├── icon.png
│       │   ├── opengraph-image.png
│       │   ├── partners-icons
│       │   │   ├── mpower.png
│       │   │   └── passage.png
│       │   └── visa_consultation.jpg
│       └── svgs
│           ├── icon.svg
│           ├── icon_gray.svg
│           ├── logo.svg
│           ├── logo_gray.svg
│           └── logo_white.svg
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── forgot-password
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── login
│   │   │       ├── _components
│   │   │       │   ├── form.tsx
│   │   │       │   └── schema.ts
│   │   │       └── page.tsx
│   │   ├── (protected)
│   │   │   ├── _components
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── activitv-logs.tsx
│   │   │   │   │   ├── applications-pie.tsx
│   │   │   │   │   ├── kpi.tsx
│   │   │   │   │   ├── staff-pie
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── pie.tsx
│   │   │   │   │   ├── students-by-nationality
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── pie.tsx
│   │   │   │   │   ├── students-pie.tsx
│   │   │   │   │   ├── trends
│   │   │   │   │   │   ├── faq.tsx
│   │   │   │   │   │   ├── inquiry.tsx
│   │   │   │   │   │   ├── post.tsx
│   │   │   │   │   │   ├── program.tsx
│   │   │   │   │   │   ├── school.tsx
│   │   │   │   │   │   └── staffs.tsx
│   │   │   │   │   └── trends.tsx
│   │   │   │   └── nav
│   │   │   │       ├── app-sidebar.tsx
│   │   │   │       ├── main-nav.tsx
│   │   │   │       ├── nav-projects.tsx
│   │   │   │       ├── nav-title.tsx
│   │   │   │       └── nav-user.tsx
│   │   │   ├── admins
│   │   │   │   ├── [id]
│   │   │   │   │   ├── edit
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── _actions
│   │   │   │   │   ├── actions.ts
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── update.ts
│   │   │   │   ├── _components
│   │   │   │   │   ├── admin-list.tsx
│   │   │   │   │   ├── edit-form.tsx
│   │   │   │   │   ├── form.tsx
│   │   │   │   │   └── social-form.tsx
│   │   │   │   ├── _data
│   │   │   │   │   └── columns.tsx
│   │   │   │   ├── _hooks
│   │   │   │   │   ├── admin.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── blog
│   │   │   │   ├── [slug]
│   │   │   │   │   ├── _components
│   │   │   │   │   │   └── form.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── _actions
│   │   │   │   │   └── index.ts
│   │   │   │   ├── _components
│   │   │   │   │   ├── blog-links.tsx
│   │   │   │   │   ├── blog-list.tsx
│   │   │   │   │   ├── blog-post.tsx
│   │   │   │   │   └── form.tsx
│   │   │   │   ├── categories
│   │   │   │   │   ├── _actions
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── _components
│   │   │   │   │   │   └── category-list.tsx
│   │   │   │   │   ├── _data
│   │   │   │   │   │   └── column.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── tags
│   │   │   │       ├── _actions
│   │   │   │       │   └── index.ts
│   │   │   │       ├── _components
│   │   │   │       │   └── tag-list.tsx
│   │   │   │       ├── _data
│   │   │   │       │   └── column.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── departments
│   │   │   │   ├── [name]
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── _components
│   │   │   │   │   └── card.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── faqs
│   │   │   │   ├── [id]
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── _actions
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── delete.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── update.ts
│   │   │   │   ├── _components
│   │   │   │   │   ├── faq-form.tsx
│   │   │   │   │   └── faq-list.tsx
│   │   │   │   ├── _data
│   │   │   │   │   └── columns.tsx
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── financial-aids
│   │   │   │   ├── _components
│   │   │   │   │   └── financial-aids-list.tsx
│   │   │   │   ├── _data
│   │   │   │   │   └── columns.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── inquiries
│   │   │   │   ├── _actions
│   │   │   │   │   ├── delete.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── _components
│   │   │   │   │   └── inquiry-list.tsx
│   │   │   │   ├── _data
│   │   │   │   │   └── columns.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── scholarships
│   │   │   │   ├── [slug]
│   │   │   │   │   ├── _components
│   │   │   │   │   │   └── form.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── _actions
│   │   │   │   │   └── index.ts
│   │   │   │   ├── _components
│   │   │   │   │   ├── create-scholarship-form.tsx
│   │   │   │   │   ├── links.tsx
│   │   │   │   │   ├── list.tsx
│   │   │   │   │   └── scholarship-post.tsx
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── schools
│   │   │       ├── [slug]
│   │   │       │   ├── _components
│   │   │       │   │   ├── accommodation-form.tsx
│   │   │       │   │   ├── intake-form.tsx
│   │   │       │   │   ├── intake-list.tsx
│   │   │       │   │   ├── program-list.tsx
│   │   │       │   │   └── school-menu.tsx
│   │   │       │   ├── accommodation
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── edit
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── intakes
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── page.tsx
│   │   │       │   └── programs
│   │   │       │       ├── [pslug]
│   │   │       │       │   ├── _components
│   │   │       │       │   │   └── program-options.tsx
│   │   │       │       │   ├── edit
│   │   │       │       │   │   └── page.tsx
│   │   │       │       │   └── page.tsx
│   │   │       │       ├── _components
│   │   │       │       │   ├── add-intakes-form.tsx
│   │   │       │       │   ├── education-level.tsx
│   │   │       │       │   ├── english-proficiency.tsx
│   │   │       │       │   ├── fee.tsx
│   │   │       │       │   ├── financial-aids-form.tsx
│   │   │       │       │   ├── intakes.tsx
│   │   │       │       │   ├── program-form.tsx
│   │   │       │       │   └── program-proficiency-form.tsx
│   │   │       │       ├── new
│   │   │       │       │   └── page.tsx
│   │   │       │       ├── page.tsx
│   │   │       │       └── upload
│   │   │       │           ├── _actions
│   │   │       │           │   ├── client.ts
│   │   │       │           │   └── server.ts
│   │   │       │           ├── _components
│   │   │       │           │   ├── loading-template.tsx
│   │   │       │           │   ├── program-template.tsx
│   │   │       │           │   └── upload-form.tsx
│   │   │       │           └── page.tsx
│   │   │       ├── _actions
│   │   │       │   ├── accommodation.ts
│   │   │       │   ├── index.ts
│   │   │       │   ├── intake.ts
│   │   │       │   ├── program.ts
│   │   │       │   └── school.ts
│   │   │       ├── _components
│   │   │       │   ├── edit-form.tsx
│   │   │       │   ├── form.tsx
│   │   │       │   ├── location.tsx
│   │   │       │   └── school-list.tsx
│   │   │       ├── _data
│   │   │       │   ├── columns.tsx
│   │   │       │   ├── intake-columns.tsx
│   │   │       │   └── program-columns.tsx
│   │   │       ├── _hooks
│   │   │       │   ├── index.ts
│   │   │       │   ├── program.ts
│   │   │       │   └── school.ts
│   │   │       ├── new
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   ├── admins
│   │   │   │   ├── me
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── blogs
│   │   │   │   └── route.ts
│   │   │   ├── categories
│   │   │   │   └── route.ts
│   │   │   ├── dashboard
│   │   │   │   └── trends
│   │   │   │       └── route.ts
│   │   │   ├── departments
│   │   │   │   └── create
│   │   │   │       └── route.ts
│   │   │   ├── faqs
│   │   │   │   └── route.ts
│   │   │   ├── financial-aids
│   │   │   │   └── route.ts
│   │   │   ├── inquiries
│   │   │   │   └── route.ts
│   │   │   ├── scholarships
│   │   │   │   └── route.ts
│   │   │   ├── schools
│   │   │   │   ├── [slug]
│   │   │   │   │   ├── intakes
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── programs
│   │   │   │   │       └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── tags
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   └── layout.tsx
│   ├── components
│   │   ├── alert.tsx
│   │   ├── compute-proficiency.tsx
│   │   ├── country-display.tsx
│   │   ├── custom-bredcrumb.tsx
│   │   ├── data-fetching-handler.tsx
│   │   ├── format-date.tsx
│   │   ├── format-number.tsx
│   │   ├── has-permission.tsx
│   │   ├── loading.tsx
│   │   ├── profile.tsx
│   │   ├── providers
│   │   │   ├── auth-provider.tsx
│   │   │   ├── tanstack-provider.tsx
│   │   │   └── theme-provider.tsx
│   │   ├── school-profile.tsx
│   │   ├── social-icons.tsx
│   │   ├── status-view.tsx
│   │   └── text-copy.tsx
│   ├── config
│   │   ├── env.ts
│   │   ├── firebase.ts
│   │   └── index.ts
│   ├── hooks
│   │   ├── use-get.ts
│   │   └── use-grading-scheme.ts
│   ├── lib
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils
│       ├── constants.ts
│       └── index.ts
└── tsconfig.json
```

---

### 🧱 Tech Stack for admin

- [React](https://react.dev) - Javascript frontend framework
- [Nextjs](https://nextjs.org) - Framework built on top of [React](https://react.dev) with added performance and optimizations
- [Typescript](https://www.typescriptlang.org/) - Programming language. Type safe code
- [Tailwindcss](https://tailwindcss.com/) - CSS Library

---

### 📦 Prerequisites for admin

Before setting up, ensure you have:

- [Node.js](https://nodejs.org/) ≥ 20
- [pnpm](https://pnpm.io)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [A Firebase project](https://console.firebase.google.com/)

---

### ⚙️ Setup Instructions for admin

1. **Clone the repository**

   ```bash
   https://github.com/beantech-designs/skyned.git
   cd skyned
   ```

2. **Install Dependencies**

   ```bash
   pnpm i
   ```

3. **Change into project directory**

   ```bash
   cd apps/admin
   ```

4. **Set up environment variables**

   See .env.sample for environment variables

   ```bash
    # * Client ENV
    NEXT_PUBLIC_APP_ENV=emulator # Only use this when running locally
    NEXT_PUBLIC_BASE_URL=

    NEXT_PUBLIC_API_KEY=
    NEXT_PUBLIC_AUTH_DOMAIN=
    NEXT_PUBLIC_PROJECT_ID=
    NEXT_PUBLIC_STORAGE_BUCKET=
    NEXT_PUBLIC_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_APP_ID=


    # * Server ENV
    API_URL=
   ```

   create environment variable file and add all necessary envs

   ```bash
    touch .env.dev
    touch .env.local

    # Backend running locally
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    API_URL=http://127.0.0.1:5001/skyned-test-31a2e/us-central1/api

    # Backend running on the staging remote environment
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    API_URL=https://api-dxmhb5dscq-uc.a.run.app
   ```

   leave .env.local empty and add env variables to .env.dev

5. **Start local server**

   ```bash
   pnpm run dev
   ```

   Onces started, frontend server will be available at:

   ```bash
    http://localhost:3000
   ```

## 🏗️ Deployment for both frontend environments

- Ensure both apps builds locally without breaking/failure
- Change dir to root
- Add and commit changes
- Push to sandbox branch
- Merge to dev branch - This triggers deployment on both staging sites.
- [Skyned Production Site](https://www.skynedconsults.com)
- [Skyned Staging Site](https://skyned-frontend--skyned-test-31a2e.us-central1.hosted.app)
- [Skyned Admin Production Site](https://admin.skynedconsults.com)
- [Skyned Admin Staging Site](https://skyned-admin--skyned-test-31a2e.us-central1.hosted.app/)

## Skyned Backend

This project is a backend API service serving the Skyned frontend platforms

---

### 🧩 Project Structure for backend

Root

```text
.
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── functions
│   ├── __tests__
│   │   ├── accommodation.ts
│   │   ├── admin.ts
│   │   ├── auth.ts
│   │   ├── blog.ts
│   │   ├── category.ts
│   │   ├── contact.ts
│   │   ├── department.ts
│   │   ├── faq.ts
│   │   ├── financial-aid.ts
│   │   ├── health.ts
│   │   ├── helpers
│   │   │   ├── constants.ts
│   │   │   └── utils.ts
│   │   ├── index.ts
│   │   ├── lead.ts
│   │   ├── newsletter.ts
│   │   ├── our-team.ts
│   │   ├── program.ts
│   │   ├── scholarship.ts
│   │   ├── school.ts
│   │   └── tag.ts
│   ├── coverage
│   │   ├── __tests__
│   │   │   └── helpers
│   │   │       ├── constants.ts.html
│   │   │       ├── firebase.ts.html
│   │   │       ├── index.html
│   │   │       └── utils.ts.html
│   │   ├── base.css
│   │   ├── block-navigation.js
│   │   ├── clover.xml
│   │   ├── coverage-final.json
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── lcov-report
│   │   │   ├── __tests__
│   │   │   │   └── helpers
│   │   │   │       ├── constants.ts.html
│   │   │   │       ├── firebase.ts.html
│   │   │   │       ├── index.html
│   │   │   │       └── utils.ts.html
│   │   │   ├── base.css
│   │   │   ├── block-navigation.js
│   │   │   ├── favicon.png
│   │   │   ├── index.html
│   │   │   ├── prettify.css
│   │   │   ├── prettify.js
│   │   │   ├── sort-arrow-sprite.png
│   │   │   ├── sorter.js
│   │   │   └── src
│   │   │       ├── app.ts.html
│   │   │       ├── config
│   │   │       │   ├── env.ts.html
│   │   │       │   ├── index.html
│   │   │       │   └── index.ts.html
│   │   │       ├── controllers
│   │   │       │   ├── health
│   │   │       │   │   ├── index.html
│   │   │       │   │   ├── index.ts.html
│   │   │       │   │   └── interface.ts.html
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   └── v1
│   │   │       │       ├── accommodation
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── admin
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── auth
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── blog-post
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── category
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── contact
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── department
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── exception
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── interface.ts.html
│   │   │       │       ├── faq
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── financial-aid
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── index.html
│   │   │       │       ├── index.ts.html
│   │   │       │       ├── lead
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── newsletter
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── out-team
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── program
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── scholarship
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── school
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── tag
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       └── utils
│   │   │       │           ├── index.html
│   │   │       │           └── index.ts.html
│   │   │       ├── data
│   │   │       │   ├── accommodation.ts.html
│   │   │       │   ├── admin.ts.html
│   │   │       │   ├── blog-post.ts.html
│   │   │       │   ├── financial-aid.ts.html
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   ├── intake.ts.html
│   │   │       │   ├── program.ts.html
│   │   │       │   ├── scholarship.ts.html
│   │   │       │   └── school.ts.html
│   │   │       ├── enum
│   │   │       │   ├── events.ts.html
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   └── registry-keys.ts.html
│   │   │       ├── index.html
│   │   │       ├── infrastructure
│   │   │       │   ├── auth
│   │   │       │   │   ├── index.html
│   │   │       │   │   ├── index.ts.html
│   │   │       │   │   └── schema.ts.html
│   │   │       │   ├── email
│   │   │       │   │   ├── index.html
│   │   │       │   │   ├── index.ts.html
│   │   │       │   │   ├── interface.ts.html
│   │   │       │   │   └── schema.ts.html
│   │   │       │   ├── events
│   │   │       │   │   ├── index.html
│   │   │       │   │   └── index.ts.html
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   ├── logger
│   │   │       │   │   ├── index.html
│   │   │       │   │   ├── index.ts.html
│   │   │       │   │   └── interface.ts.html
│   │   │       │   ├── marketing
│   │   │       │   │   ├── index.html
│   │   │       │   │   ├── index.ts.html
│   │   │       │   │   └── schema.ts.html
│   │   │       │   ├── repository
│   │   │       │   │   ├── accommodation
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   └── interface.ts.html
│   │   │       │   │   ├── activity-log
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   └── interface.ts.html
│   │   │       │   │   ├── admin
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   ├── interface.ts.html
│   │   │       │   │   │   └── schema.ts.html
│   │   │       │   │   ├── department
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   └── interface.ts.html
│   │   │       │   │   ├── faq
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   ├── interface.ts.html
│   │   │       │   │   │   └── schema.ts.html
│   │   │       │   │   ├── index.html
│   │   │       │   │   ├── index.ts.html
│   │   │       │   │   ├── inquiry
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   ├── interface.ts.html
│   │   │       │   │   │   └── schema.ts.html
│   │   │       │   │   ├── intake
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   └── interface.ts.html
│   │   │       │   │   ├── prisma.ts.html
│   │   │       │   │   ├── school
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   └── interface.ts.html
│   │   │       │   │   ├── token
│   │   │       │   │   │   ├── index.html
│   │   │       │   │   │   ├── index.ts.html
│   │   │       │   │   │   ├── interface.ts.html
│   │   │       │   │   │   └── schema.ts.html
│   │   │       │   │   └── utils.ts.html
│   │   │       │   └── storage
│   │   │       │       ├── index.html
│   │   │       │       ├── index.ts.html
│   │   │       │       └── interface.ts.html
│   │   │       ├── lib
│   │   │       │   ├── constants.ts.html
│   │   │       │   ├── exception.ts.html
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   └── utils
│   │   │       │       ├── index.html
│   │   │       │       └── index.ts.html
│   │   │       ├── middleware
│   │   │       │   ├── auth.ts.html
│   │   │       │   ├── binder
│   │   │       │   │   ├── index.html
│   │   │       │   │   └── index.ts.html
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   ├── rate-limit.ts.html
│   │   │       │   └── request-validation
│   │   │       │       ├── index.html
│   │   │       │       ├── index.ts.html
│   │   │       │       └── interface.ts.html
│   │   │       ├── publisher
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   └── interface.ts.html
│   │   │       ├── registry.ts.html
│   │   │       ├── routers
│   │   │       │   ├── api
│   │   │       │   │   ├── index.html
│   │   │       │   │   ├── index.ts.html
│   │   │       │   │   └── v1
│   │   │       │   │       ├── accommodation
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── admin
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── auth
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── blog-post
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── categories
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── contact
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── department
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── faq
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── financial-aids
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── index.html
│   │   │       │   │       ├── index.ts.html
│   │   │       │   │       ├── lead
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── newsletter
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── our-team
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── program
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── scholarship
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       ├── school
│   │   │       │   │       │   ├── index.html
│   │   │       │   │       │   └── index.ts.html
│   │   │       │   │       └── tag
│   │   │       │   │           ├── index.html
│   │   │       │   │           └── index.ts.html
│   │   │       │   ├── health
│   │   │       │   │   ├── index.html
│   │   │       │   │   └── index.ts.html
│   │   │       │   ├── index.html
│   │   │       │   └── index.ts.html
│   │   │       ├── seed
│   │   │       │   ├── image.ts.html
│   │   │       │   └── index.html
│   │   │       ├── services
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   └── v1
│   │   │       │       ├── accommodation
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── activity-log
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── admin
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── analytics
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── blog-post
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── category
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── department
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── email
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.tsx.html
│   │   │       │       │   ├── interface.ts.html
│   │   │       │       │   └── templates
│   │   │       │       │       ├── admin-account-creation.tsx.html
│   │   │       │       │       ├── contact-us.tsx.html
│   │   │       │       │       ├── financial-aid.tsx.html
│   │   │       │       │       ├── footer.tsx.html
│   │   │       │       │       ├── header.tsx.html
│   │   │       │       │       ├── index.html
│   │   │       │       │       ├── index.ts.html
│   │   │       │       │       ├── layout.tsx.html
│   │   │       │       │       ├── lead-submission.tsx.html
│   │   │       │       │       ├── regards.tsx.html
│   │   │       │       │       └── verify-email.tsx.html
│   │   │       │       ├── faq
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── financial-aid
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── id-generator
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── index.html
│   │   │       │       ├── index.ts.html
│   │   │       │       ├── inquiry
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── intake
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── logger
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── interface.ts.html
│   │   │       │       ├── our-team
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── phone-number
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── program
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── scholarship
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       ├── school
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── storage
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── interface.ts.html
│   │   │       │       ├── tag
│   │   │       │       │   ├── index.html
│   │   │       │       │   ├── index.ts.html
│   │   │       │       │   └── schema.ts.html
│   │   │       │       ├── token
│   │   │       │       │   ├── index.html
│   │   │       │       │   └── index.ts.html
│   │   │       │       └── utils.ts.html
│   │   │       ├── subscribers
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   └── interface.ts.html
│   │   │       ├── swagger
│   │   │       │   ├── index.html
│   │   │       │   └── index.ts.html
│   │   │       ├── utils
│   │   │       │   ├── constants.ts.html
│   │   │       │   ├── helpers
│   │   │       │   │   ├── index.html
│   │   │       │   │   └── index.ts.html
│   │   │       │   ├── index.html
│   │   │       │   ├── index.ts.html
│   │   │       │   └── validation
│   │   │       │       ├── index.html
│   │   │       │       └── index.ts.html
│   │   │       └── zod-schemas
│   │   │           ├── analytics.ts.html
│   │   │           ├── blog-post.ts.html
│   │   │           ├── category.ts.html
│   │   │           ├── general.ts.html
│   │   │           ├── id.ts.html
│   │   │           ├── index.html
│   │   │           ├── index.ts.html
│   │   │           ├── intake.ts.html
│   │   │           ├── program.ts.html
│   │   │           ├── query.ts.html
│   │   │           ├── scholarship.ts.html
│   │   │           ├── school.ts.html
│   │   │           └── tag.ts.html
│   │   ├── lcov.info
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── sort-arrow-sprite.png
│   │   ├── sorter.js
│   │   └── src
│   │       ├── app.ts.html
│   │       ├── config
│   │       │   ├── env.ts.html
│   │       │   ├── index.html
│   │       │   └── index.ts.html
│   │       ├── controllers
│   │       │   ├── health
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   └── interface.ts.html
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   └── v1
│   │       │       ├── accommodation
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── admin
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── auth
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── blog-post
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── category
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── contact
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── department
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── exception
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── interface.ts.html
│   │       │       ├── faq
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── financial-aid
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── index.html
│   │       │       ├── index.ts.html
│   │       │       ├── lead
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── newsletter
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── out-team
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── program
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── scholarship
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── school
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── tag
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       └── utils
│   │       │           ├── index.html
│   │       │           └── index.ts.html
│   │       ├── data
│   │       │   ├── accommodation.ts.html
│   │       │   ├── admin.ts.html
│   │       │   ├── blog-post.ts.html
│   │       │   ├── financial-aid.ts.html
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   ├── intake.ts.html
│   │       │   ├── program.ts.html
│   │       │   ├── scholarship.ts.html
│   │       │   └── school.ts.html
│   │       ├── enum
│   │       │   ├── events.ts.html
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   └── registry-keys.ts.html
│   │       ├── index.html
│   │       ├── infrastructure
│   │       │   ├── auth
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   └── schema.ts.html
│   │       │   ├── email
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   ├── interface.ts.html
│   │       │   │   └── schema.ts.html
│   │       │   ├── events
│   │       │   │   ├── index.html
│   │       │   │   └── index.ts.html
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   ├── logger
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   └── interface.ts.html
│   │       │   ├── marketing
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   └── schema.ts.html
│   │       │   ├── repository
│   │       │   │   ├── accommodation
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   └── interface.ts.html
│   │       │   │   ├── activity-log
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   └── interface.ts.html
│   │       │   │   ├── admin
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   ├── interface.ts.html
│   │       │   │   │   └── schema.ts.html
│   │       │   │   ├── department
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   └── interface.ts.html
│   │       │   │   ├── faq
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   ├── interface.ts.html
│   │       │   │   │   └── schema.ts.html
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   ├── inquiry
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   ├── interface.ts.html
│   │       │   │   │   └── schema.ts.html
│   │       │   │   ├── intake
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   └── interface.ts.html
│   │       │   │   ├── prisma.ts.html
│   │       │   │   ├── school
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   └── interface.ts.html
│   │       │   │   ├── token
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── index.ts.html
│   │       │   │   │   ├── interface.ts.html
│   │       │   │   │   └── schema.ts.html
│   │       │   │   └── utils.ts.html
│   │       │   └── storage
│   │       │       ├── index.html
│   │       │       ├── index.ts.html
│   │       │       └── interface.ts.html
│   │       ├── lib
│   │       │   ├── constants.ts.html
│   │       │   ├── exception.ts.html
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   └── utils
│   │       │       ├── index.html
│   │       │       └── index.ts.html
│   │       ├── middleware
│   │       │   ├── auth.ts.html
│   │       │   ├── binder
│   │       │   │   ├── index.html
│   │       │   │   └── index.ts.html
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   ├── rate-limit.ts.html
│   │       │   └── request-validation
│   │       │       ├── index.html
│   │       │       ├── index.ts.html
│   │       │       └── interface.ts.html
│   │       ├── publisher
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   └── interface.ts.html
│   │       ├── registry.ts.html
│   │       ├── routers
│   │       │   ├── api
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   └── v1
│   │       │   │       ├── accommodation
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── admin
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── auth
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── blog-post
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── categories
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── contact
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── department
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── faq
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── financial-aids
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── index.html
│   │       │   │       ├── index.ts.html
│   │       │   │       ├── lead
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── newsletter
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── our-team
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── program
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── scholarship
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       ├── school
│   │       │   │       │   ├── index.html
│   │       │   │       │   └── index.ts.html
│   │       │   │       └── tag
│   │       │   │           ├── index.html
│   │       │   │           └── index.ts.html
│   │       │   ├── health
│   │       │   │   ├── index.html
│   │       │   │   └── index.ts.html
│   │       │   ├── index.html
│   │       │   └── index.ts.html
│   │       ├── seed
│   │       │   ├── image.ts.html
│   │       │   └── index.html
│   │       ├── services
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   └── v1
│   │       │       ├── accommodation
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── activity-log
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── admin
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── analytics
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── blog-post
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── category
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── department
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── email
│   │       │       │   ├── index.html
│   │       │       │   ├── index.tsx.html
│   │       │       │   ├── interface.ts.html
│   │       │       │   └── templates
│   │       │       │       ├── admin-account-creation.tsx.html
│   │       │       │       ├── contact-us.tsx.html
│   │       │       │       ├── financial-aid.tsx.html
│   │       │       │       ├── footer.tsx.html
│   │       │       │       ├── header.tsx.html
│   │       │       │       ├── index.html
│   │       │       │       ├── index.ts.html
│   │       │       │       ├── layout.tsx.html
│   │       │       │       ├── lead-submission.tsx.html
│   │       │       │       ├── regards.tsx.html
│   │       │       │       └── verify-email.tsx.html
│   │       │       ├── faq
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── financial-aid
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── id-generator
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── index.html
│   │       │       ├── index.ts.html
│   │       │       ├── inquiry
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── intake
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── logger
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── interface.ts.html
│   │       │       ├── our-team
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── phone-number
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── program
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── scholarship
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       ├── school
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── storage
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── interface.ts.html
│   │       │       ├── tag
│   │       │       │   ├── index.html
│   │       │       │   ├── index.ts.html
│   │       │       │   └── schema.ts.html
│   │       │       ├── token
│   │       │       │   ├── index.html
│   │       │       │   └── index.ts.html
│   │       │       └── utils.ts.html
│   │       ├── subscribers
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   └── interface.ts.html
│   │       ├── swagger
│   │       │   ├── index.html
│   │       │   └── index.ts.html
│   │       ├── utils
│   │       │   ├── constants.ts.html
│   │       │   ├── helpers
│   │       │   │   ├── index.html
│   │       │   │   └── index.ts.html
│   │       │   ├── index.html
│   │       │   ├── index.ts.html
│   │       │   └── validation
│   │       │       ├── index.html
│   │       │       └── index.ts.html
│   │       └── zod-schemas
│   │           ├── analytics.ts.html
│   │           ├── blog-post.ts.html
│   │           ├── category.ts.html
│   │           ├── general.ts.html
│   │           ├── id.ts.html
│   │           ├── index.html
│   │           ├── index.ts.html
│   │           ├── intake.ts.html
│   │           ├── program.ts.html
│   │           ├── query.ts.html
│   │           ├── scholarship.ts.html
│   │           ├── school.ts.html
│   │           └── tag.ts.html
│   ├── cp-local
│   ├── cp-yaml
│   ├── db.dbml
│   ├── docker-compose.yml
│   ├── jest.config.js
│   ├── lib
│   │   ├── __tests__
│   │   │   ├── accommodation.js
│   │   │   ├── accommodation.js.map
│   │   │   ├── admin.js
│   │   │   ├── admin.js.map
│   │   │   ├── auth.js
│   │   │   ├── auth.js.map
│   │   │   ├── blog.js
│   │   │   ├── blog.js.map
│   │   │   ├── category.js
│   │   │   ├── category.js.map
│   │   │   ├── contact.js
│   │   │   ├── contact.js.map
│   │   │   ├── department.js
│   │   │   ├── department.js.map
│   │   │   ├── faq.js
│   │   │   ├── faq.js.map
│   │   │   ├── financial-aid.js
│   │   │   ├── financial-aid.js.map
│   │   │   ├── health.js
│   │   │   ├── health.js.map
│   │   │   ├── helpers
│   │   │   │   ├── constants.js
│   │   │   │   ├── constants.js.map
│   │   │   │   ├── utils.js
│   │   │   │   └── utils.js.map
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   ├── lead.js
│   │   │   ├── lead.js.map
│   │   │   ├── newsletter.js
│   │   │   ├── newsletter.js.map
│   │   │   ├── our-team.js
│   │   │   ├── our-team.js.map
│   │   │   ├── program.js
│   │   │   ├── program.js.map
│   │   │   ├── scholarship.js
│   │   │   ├── scholarship.js.map
│   │   │   ├── school.js
│   │   │   ├── school.js.map
│   │   │   ├── tag.js
│   │   │   └── tag.js.map
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── coverage
│   │   │   │   ├── __tests__
│   │   │   │   │   └── helpers
│   │   │   │   │       ├── constants.ts.html
│   │   │   │   │       ├── firebase.ts.html
│   │   │   │   │       ├── index.html
│   │   │   │   │       └── utils.ts.html
│   │   │   │   ├── base.css
│   │   │   │   ├── block-navigation.js
│   │   │   │   ├── clover.xml
│   │   │   │   ├── coverage-final.json
│   │   │   │   ├── favicon.png
│   │   │   │   ├── index.html
│   │   │   │   ├── lcov-report
│   │   │   │   │   ├── __tests__
│   │   │   │   │   │   └── helpers
│   │   │   │   │   │       ├── constants.ts.html
│   │   │   │   │   │       ├── firebase.ts.html
│   │   │   │   │   │       ├── index.html
│   │   │   │   │   │       └── utils.ts.html
│   │   │   │   │   ├── base.css
│   │   │   │   │   ├── block-navigation.js
│   │   │   │   │   ├── favicon.png
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── prettify.css
│   │   │   │   │   ├── prettify.js
│   │   │   │   │   ├── sort-arrow-sprite.png
│   │   │   │   │   ├── sorter.js
│   │   │   │   │   └── src
│   │   │   │   │       ├── app.ts.html
│   │   │   │   │       ├── config
│   │   │   │   │       │   ├── env.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   └── index.ts.html
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   ├── health
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   ├── index.ts.html
│   │   │   │   │       │   │   └── interface.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   └── v1
│   │   │   │   │       │       ├── accommodation
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── admin
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── auth
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── blog-post
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── category
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── contact
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── department
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── exception
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── interface.ts.html
│   │   │   │   │       │       ├── faq
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── financial-aid
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── index.html
│   │   │   │   │       │       ├── index.ts.html
│   │   │   │   │       │       ├── lead
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── newsletter
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── out-team
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── program
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── scholarship
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── school
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── tag
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       └── utils
│   │   │   │   │       │           ├── index.html
│   │   │   │   │       │           └── index.ts.html
│   │   │   │   │       ├── data
│   │   │   │   │       │   ├── accommodation.ts.html
│   │   │   │   │       │   ├── admin.ts.html
│   │   │   │   │       │   ├── blog-post.ts.html
│   │   │   │   │       │   ├── financial-aid.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   ├── intake.ts.html
│   │   │   │   │       │   ├── program.ts.html
│   │   │   │   │       │   ├── scholarship.ts.html
│   │   │   │   │       │   └── school.ts.html
│   │   │   │   │       ├── enum
│   │   │   │   │       │   ├── events.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   └── registry-keys.ts.html
│   │   │   │   │       ├── index.html
│   │   │   │   │       ├── infrastructure
│   │   │   │   │       │   ├── auth
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   ├── index.ts.html
│   │   │   │   │       │   │   └── schema.ts.html
│   │   │   │   │       │   ├── email
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   ├── index.ts.html
│   │   │   │   │       │   │   ├── interface.ts.html
│   │   │   │   │       │   │   └── schema.ts.html
│   │   │   │   │       │   ├── events
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   └── index.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   ├── logger
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   ├── index.ts.html
│   │   │   │   │       │   │   └── interface.ts.html
│   │   │   │   │       │   ├── marketing
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   ├── index.ts.html
│   │   │   │   │       │   │   └── schema.ts.html
│   │   │   │   │       │   ├── repository
│   │   │   │   │       │   │   ├── accommodation
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │   │       │   │   ├── activity-log
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │   │       │   │   ├── admin
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │   │       │   │   ├── department
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │   │       │   │   ├── faq
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   ├── index.ts.html
│   │   │   │   │       │   │   ├── inquiry
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │   │       │   │   ├── intake
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │   │       │   │   ├── prisma.ts.html
│   │   │   │   │       │   │   ├── school
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │   │       │   │   ├── token
│   │   │   │   │       │   │   │   ├── index.html
│   │   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │   │       │   │   └── utils.ts.html
│   │   │   │   │       │   └── storage
│   │   │   │   │       │       ├── index.html
│   │   │   │   │       │       ├── index.ts.html
│   │   │   │   │       │       └── interface.ts.html
│   │   │   │   │       ├── lib
│   │   │   │   │       │   ├── constants.ts.html
│   │   │   │   │       │   ├── exception.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   └── utils
│   │   │   │   │       │       ├── index.html
│   │   │   │   │       │       └── index.ts.html
│   │   │   │   │       ├── middleware
│   │   │   │   │       │   ├── auth.ts.html
│   │   │   │   │       │   ├── binder
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   └── index.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   ├── rate-limit.ts.html
│   │   │   │   │       │   └── request-validation
│   │   │   │   │       │       ├── index.html
│   │   │   │   │       │       ├── index.ts.html
│   │   │   │   │       │       └── interface.ts.html
│   │   │   │   │       ├── publisher
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   └── interface.ts.html
│   │   │   │   │       ├── registry.ts.html
│   │   │   │   │       ├── routers
│   │   │   │   │       │   ├── api
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   ├── index.ts.html
│   │   │   │   │       │   │   └── v1
│   │   │   │   │       │   │       ├── accommodation
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── admin
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── auth
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── blog-post
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── categories
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── contact
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── department
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── faq
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── financial-aids
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── index.html
│   │   │   │   │       │   │       ├── index.ts.html
│   │   │   │   │       │   │       ├── lead
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── newsletter
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── our-team
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── program
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── scholarship
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       ├── school
│   │   │   │   │       │   │       │   ├── index.html
│   │   │   │   │       │   │       │   └── index.ts.html
│   │   │   │   │       │   │       └── tag
│   │   │   │   │       │   │           ├── index.html
│   │   │   │   │       │   │           └── index.ts.html
│   │   │   │   │       │   ├── health
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   └── index.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   └── index.ts.html
│   │   │   │   │       ├── seed
│   │   │   │   │       │   ├── image.ts.html
│   │   │   │   │       │   └── index.html
│   │   │   │   │       ├── services
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   └── v1
│   │   │   │   │       │       ├── accommodation
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── activity-log
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── admin
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── analytics
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── blog-post
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── category
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── department
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── email
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.tsx.html
│   │   │   │   │       │       │   ├── interface.ts.html
│   │   │   │   │       │       │   └── templates
│   │   │   │   │       │       │       ├── admin-account-creation.tsx.html
│   │   │   │   │       │       │       ├── contact-us.tsx.html
│   │   │   │   │       │       │       ├── financial-aid.tsx.html
│   │   │   │   │       │       │       ├── footer.tsx.html
│   │   │   │   │       │       │       ├── header.tsx.html
│   │   │   │   │       │       │       ├── index.html
│   │   │   │   │       │       │       ├── index.ts.html
│   │   │   │   │       │       │       ├── layout.tsx.html
│   │   │   │   │       │       │       ├── lead-submission.tsx.html
│   │   │   │   │       │       │       ├── regards.tsx.html
│   │   │   │   │       │       │       └── verify-email.tsx.html
│   │   │   │   │       │       ├── faq
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── financial-aid
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── id-generator
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── index.html
│   │   │   │   │       │       ├── index.ts.html
│   │   │   │   │       │       ├── inquiry
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── intake
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── logger
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── interface.ts.html
│   │   │   │   │       │       ├── our-team
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── phone-number
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── program
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── scholarship
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       ├── school
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── storage
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── interface.ts.html
│   │   │   │   │       │       ├── tag
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   ├── index.ts.html
│   │   │   │   │       │       │   └── schema.ts.html
│   │   │   │   │       │       ├── token
│   │   │   │   │       │       │   ├── index.html
│   │   │   │   │       │       │   └── index.ts.html
│   │   │   │   │       │       └── utils.ts.html
│   │   │   │   │       ├── subscribers
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   └── interface.ts.html
│   │   │   │   │       ├── swagger
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   └── index.ts.html
│   │   │   │   │       ├── utils
│   │   │   │   │       │   ├── constants.ts.html
│   │   │   │   │       │   ├── helpers
│   │   │   │   │       │   │   ├── index.html
│   │   │   │   │       │   │   └── index.ts.html
│   │   │   │   │       │   ├── index.html
│   │   │   │   │       │   ├── index.ts.html
│   │   │   │   │       │   └── validation
│   │   │   │   │       │       ├── index.html
│   │   │   │   │       │       └── index.ts.html
│   │   │   │   │       └── zod-schemas
│   │   │   │   │           ├── analytics.ts.html
│   │   │   │   │           ├── blog-post.ts.html
│   │   │   │   │           ├── category.ts.html
│   │   │   │   │           ├── general.ts.html
│   │   │   │   │           ├── id.ts.html
│   │   │   │   │           ├── index.html
│   │   │   │   │           ├── index.ts.html
│   │   │   │   │           ├── intake.ts.html
│   │   │   │   │           ├── program.ts.html
│   │   │   │   │           ├── query.ts.html
│   │   │   │   │           ├── scholarship.ts.html
│   │   │   │   │           ├── school.ts.html
│   │   │   │   │           └── tag.ts.html
│   │   │   │   ├── lcov.info
│   │   │   │   ├── prettify.css
│   │   │   │   ├── prettify.js
│   │   │   │   ├── sort-arrow-sprite.png
│   │   │   │   ├── sorter.js
│   │   │   │   └── src
│   │   │   │       ├── app.ts.html
│   │   │   │       ├── config
│   │   │   │       │   ├── env.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   └── index.ts.html
│   │   │   │       ├── controllers
│   │   │   │       │   ├── health
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   ├── index.ts.html
│   │   │   │       │   │   └── interface.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   └── v1
│   │   │   │       │       ├── accommodation
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── admin
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── auth
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── blog-post
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── category
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── contact
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── department
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── exception
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── interface.ts.html
│   │   │   │       │       ├── faq
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── financial-aid
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── index.html
│   │   │   │       │       ├── index.ts.html
│   │   │   │       │       ├── lead
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── newsletter
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── out-team
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── program
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── scholarship
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── school
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── tag
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       └── utils
│   │   │   │       │           ├── index.html
│   │   │   │       │           └── index.ts.html
│   │   │   │       ├── data
│   │   │   │       │   ├── accommodation.ts.html
│   │   │   │       │   ├── admin.ts.html
│   │   │   │       │   ├── blog-post.ts.html
│   │   │   │       │   ├── financial-aid.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   ├── intake.ts.html
│   │   │   │       │   ├── program.ts.html
│   │   │   │       │   ├── scholarship.ts.html
│   │   │   │       │   └── school.ts.html
│   │   │   │       ├── enum
│   │   │   │       │   ├── events.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   └── registry-keys.ts.html
│   │   │   │       ├── index.html
│   │   │   │       ├── infrastructure
│   │   │   │       │   ├── auth
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   ├── index.ts.html
│   │   │   │       │   │   └── schema.ts.html
│   │   │   │       │   ├── email
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   ├── index.ts.html
│   │   │   │       │   │   ├── interface.ts.html
│   │   │   │       │   │   └── schema.ts.html
│   │   │   │       │   ├── events
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   └── index.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   ├── logger
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   ├── index.ts.html
│   │   │   │       │   │   └── interface.ts.html
│   │   │   │       │   ├── marketing
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   ├── index.ts.html
│   │   │   │       │   │   └── schema.ts.html
│   │   │   │       │   ├── repository
│   │   │   │       │   │   ├── accommodation
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │       │   │   ├── activity-log
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │       │   │   ├── admin
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │       │   │   ├── department
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │       │   │   ├── faq
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   ├── index.ts.html
│   │   │   │       │   │   ├── inquiry
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │       │   │   ├── intake
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │       │   │   ├── prisma.ts.html
│   │   │   │       │   │   ├── school
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   └── interface.ts.html
│   │   │   │       │   │   ├── token
│   │   │   │       │   │   │   ├── index.html
│   │   │   │       │   │   │   ├── index.ts.html
│   │   │   │       │   │   │   ├── interface.ts.html
│   │   │   │       │   │   │   └── schema.ts.html
│   │   │   │       │   │   └── utils.ts.html
│   │   │   │       │   └── storage
│   │   │   │       │       ├── index.html
│   │   │   │       │       ├── index.ts.html
│   │   │   │       │       └── interface.ts.html
│   │   │   │       ├── lib
│   │   │   │       │   ├── constants.ts.html
│   │   │   │       │   ├── exception.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   └── utils
│   │   │   │       │       ├── index.html
│   │   │   │       │       └── index.ts.html
│   │   │   │       ├── middleware
│   │   │   │       │   ├── auth.ts.html
│   │   │   │       │   ├── binder
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   └── index.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   ├── rate-limit.ts.html
│   │   │   │       │   └── request-validation
│   │   │   │       │       ├── index.html
│   │   │   │       │       ├── index.ts.html
│   │   │   │       │       └── interface.ts.html
│   │   │   │       ├── publisher
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   └── interface.ts.html
│   │   │   │       ├── registry.ts.html
│   │   │   │       ├── routers
│   │   │   │       │   ├── api
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   ├── index.ts.html
│   │   │   │       │   │   └── v1
│   │   │   │       │   │       ├── accommodation
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── admin
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── auth
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── blog-post
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── categories
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── contact
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── department
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── faq
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── financial-aids
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── index.html
│   │   │   │       │   │       ├── index.ts.html
│   │   │   │       │   │       ├── lead
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── newsletter
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── our-team
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── program
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── scholarship
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       ├── school
│   │   │   │       │   │       │   ├── index.html
│   │   │   │       │   │       │   └── index.ts.html
│   │   │   │       │   │       └── tag
│   │   │   │       │   │           ├── index.html
│   │   │   │       │   │           └── index.ts.html
│   │   │   │       │   ├── health
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   └── index.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   └── index.ts.html
│   │   │   │       ├── seed
│   │   │   │       │   ├── image.ts.html
│   │   │   │       │   └── index.html
│   │   │   │       ├── services
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   └── v1
│   │   │   │       │       ├── accommodation
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── activity-log
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── admin
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── analytics
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── blog-post
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── category
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── department
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── email
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.tsx.html
│   │   │   │       │       │   ├── interface.ts.html
│   │   │   │       │       │   └── templates
│   │   │   │       │       │       ├── admin-account-creation.tsx.html
│   │   │   │       │       │       ├── contact-us.tsx.html
│   │   │   │       │       │       ├── financial-aid.tsx.html
│   │   │   │       │       │       ├── footer.tsx.html
│   │   │   │       │       │       ├── header.tsx.html
│   │   │   │       │       │       ├── index.html
│   │   │   │       │       │       ├── index.ts.html
│   │   │   │       │       │       ├── layout.tsx.html
│   │   │   │       │       │       ├── lead-submission.tsx.html
│   │   │   │       │       │       ├── regards.tsx.html
│   │   │   │       │       │       └── verify-email.tsx.html
│   │   │   │       │       ├── faq
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── financial-aid
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── id-generator
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── index.html
│   │   │   │       │       ├── index.ts.html
│   │   │   │       │       ├── inquiry
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── intake
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── logger
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── interface.ts.html
│   │   │   │       │       ├── our-team
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── phone-number
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── program
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── scholarship
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       ├── school
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── storage
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── interface.ts.html
│   │   │   │       │       ├── tag
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   ├── index.ts.html
│   │   │   │       │       │   └── schema.ts.html
│   │   │   │       │       ├── token
│   │   │   │       │       │   ├── index.html
│   │   │   │       │       │   └── index.ts.html
│   │   │   │       │       └── utils.ts.html
│   │   │   │       ├── subscribers
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   └── interface.ts.html
│   │   │   │       ├── swagger
│   │   │   │       │   ├── index.html
│   │   │   │       │   └── index.ts.html
│   │   │   │       ├── utils
│   │   │   │       │   ├── constants.ts.html
│   │   │   │       │   ├── helpers
│   │   │   │       │   │   ├── index.html
│   │   │   │       │   │   └── index.ts.html
│   │   │   │       │   ├── index.html
│   │   │   │       │   ├── index.ts.html
│   │   │   │       │   └── validation
│   │   │   │       │       ├── index.html
│   │   │   │       │       └── index.ts.html
│   │   │   │       └── zod-schemas
│   │   │   │           ├── analytics.ts.html
│   │   │   │           ├── blog-post.ts.html
│   │   │   │           ├── category.ts.html
│   │   │   │           ├── general.ts.html
│   │   │   │           ├── id.ts.html
│   │   │   │           ├── index.html
│   │   │   │           ├── index.ts.html
│   │   │   │           ├── intake.ts.html
│   │   │   │           ├── program.ts.html
│   │   │   │           ├── query.ts.html
│   │   │   │           ├── scholarship.ts.html
│   │   │   │           ├── school.ts.html
│   │   │   │           └── tag.ts.html
│   │   │   └── doc
│   │   │       ├── assets
│   │   │       │   ├── hierarchy.js
│   │   │       │   ├── highlight.css
│   │   │       │   ├── icons.js
│   │   │       │   ├── icons.svg
│   │   │       │   ├── main.js
│   │   │       │   ├── navigation.js
│   │   │       │   ├── search.js
│   │   │       │   └── style.css
│   │   │       ├── classes
│   │   │       │   ├── app.App.html
│   │   │       │   ├── controllers.AccommodationController.html
│   │   │       │   ├── controllers.AdminController.html
│   │   │       │   ├── controllers.AuthController.html
│   │   │       │   ├── controllers.BlogPostController.html
│   │   │       │   ├── controllers.CategoryController.html
│   │   │       │   ├── controllers.ContactController.html
│   │   │       │   ├── controllers.DepartmentController.html
│   │   │       │   ├── controllers.ExceptionController.html
│   │   │       │   ├── controllers.FaqController.html
│   │   │       │   ├── controllers.FinancialAidController.html
│   │   │       │   ├── controllers.HealthController.html
│   │   │       │   ├── controllers.LeadController.html
│   │   │       │   ├── controllers.NewsletterController.html
│   │   │       │   ├── controllers.OurTeamController.html
│   │   │       │   ├── controllers.ProgramController.html
│   │   │       │   ├── controllers.ScholarshipController.html
│   │   │       │   ├── controllers.SchoolController.html
│   │   │       │   ├── controllers.TagController.html
│   │   │       │   ├── cron-jobs.CronJobs.html
│   │   │       │   ├── infrastructure.AccommodationRepository.html
│   │   │       │   ├── infrastructure.ActivityLogRepository.html
│   │   │       │   ├── infrastructure.AdminRepository.html
│   │   │       │   ├── infrastructure.Auth.html
│   │   │       │   ├── infrastructure.DepartmentRepository.html
│   │   │       │   ├── infrastructure.FaqRepository.html
│   │   │       │   ├── infrastructure.InquiryRepository.html
│   │   │       │   ├── infrastructure.IntakeRepository.html
│   │   │       │   ├── infrastructure.Logger.html
│   │   │       │   ├── infrastructure.Marketing.html
│   │   │       │   ├── infrastructure.Repository.html
│   │   │       │   ├── infrastructure.SchoolRepository.html
│   │   │       │   ├── infrastructure.TokenRepository.html
│   │   │       │   ├── lib.Exception.html
│   │   │       │   ├── middleware.AuthMiddleware.html
│   │   │       │   ├── middleware.BinderMiddleware.html
│   │   │       │   ├── middleware.RateLimiterMiddleware.html
│   │   │       │   ├── middleware.RequestValidationMiddleware.html
│   │   │       │   ├── publisher.Publisher.html
│   │   │       │   ├── registry.default.html
│   │   │       │   ├── routers.BaseRouter.html
│   │   │       │   ├── services.AccommodationService.html
│   │   │       │   ├── services.ActivityLogService.html
│   │   │       │   ├── services.AdminService.html
│   │   │       │   ├── services.AnalyticsService.html
│   │   │       │   ├── services.BlogPostService.html
│   │   │       │   ├── services.CategoryService.html
│   │   │       │   ├── services.DepartmentService.html
│   │   │       │   ├── services.EmailService.html
│   │   │       │   ├── services.FaqService.html
│   │   │       │   ├── services.FinancialAidService.html
│   │   │       │   ├── services.IdGeneratorService.html
│   │   │       │   ├── services.InquiryService.html
│   │   │       │   ├── services.IntakeService.html
│   │   │       │   ├── services.OurTeamService.html
│   │   │       │   ├── services.PhoneNumberService.html
│   │   │       │   ├── services.ProgramService.html
│   │   │       │   ├── services.ScholarshipService.html
│   │   │       │   ├── services.SchoolService.html
│   │   │       │   ├── services.StorageService.html
│   │   │       │   ├── services.TagService.html
│   │   │       │   ├── services.TokenService.html
│   │   │       │   ├── subscribers.Subscriber.html
│   │   │       │   ├── utils.SkynedUtils.html
│   │   │       │   └── utils.ValidationUtility.html
│   │   │       ├── enums
│   │   │       │   ├── enum.EventsEnum.html
│   │   │       │   └── enum.RegistryKeysEnum.html
│   │   │       ├── functions
│   │   │       │   ├── middleware._failed.html
│   │   │       │   ├── middleware._success.html
│   │   │       │   ├── services.ContactUsEmail.html
│   │   │       │   ├── services.FinancialAidNotificationEmail.html
│   │   │       │   └── services.LeadCollection.html
│   │   │       ├── hierarchy.html
│   │   │       ├── index.html
│   │   │       ├── interfaces
│   │   │       │   ├── app.Dependencies.html
│   │   │       │   ├── controllers.AdminControllerDependencies.html
│   │   │       │   ├── controllers.AuthControllerDependencies.html
│   │   │       │   ├── controllers.CategoryControllerDependencies.html
│   │   │       │   ├── controllers.ContactControllerDependencies.html
│   │   │       │   ├── controllers.ExceptionControllerDependencies.html
│   │   │       │   ├── controllers.FinancialAidControllerDependencies.html
│   │   │       │   ├── controllers.IAccommodationControllerDependencies.html
│   │   │       │   ├── controllers.IBlogPostControllerDependencies.html
│   │   │       │   ├── controllers.IDepartmentControllerDependencies.html
│   │   │       │   ├── controllers.IFaqControllerDependencies.html
│   │   │       │   ├── controllers.INewsletterControllerDependencies.html
│   │   │       │   ├── controllers.IOurTeamControllerDependencies.html
│   │   │       │   ├── controllers.IProgramControllerDependencies.html
│   │   │       │   ├── controllers.ISchoolControllerDependencies.html
│   │   │       │   ├── controllers.LeadControllerDependencies.html
│   │   │       │   ├── controllers.ScholarshipControllerDependencies.html
│   │   │       │   ├── controllers.TagControllerDependencies.html
│   │   │       │   ├── cron-jobs.ICronJobsDependencies.html
│   │   │       │   ├── express.Express.Application.html
│   │   │       │   ├── express.Express.Locals.html
│   │   │       │   ├── express.Express.Request.html
│   │   │       │   ├── express.Express.Response.html
│   │   │       │   ├── infrastructure.AuthDependencies.html
│   │   │       │   ├── infrastructure.EmailDependencies.html
│   │   │       │   ├── infrastructure.IAccommodationRepository.html
│   │   │       │   ├── infrastructure.IActivityLogRepository.html
│   │   │       │   ├── infrastructure.IAdminRepository.html
│   │   │       │   ├── infrastructure.IDepartmentRepository.html
│   │   │       │   ├── infrastructure.IFaqRepository.html
│   │   │       │   ├── infrastructure.IInquiryRepository.html
│   │   │       │   ├── infrastructure.IIntakeRepository.html
│   │   │       │   ├── infrastructure.ISchoolRepository.html
│   │   │       │   ├── infrastructure.ITokenRepository.html
│   │   │       │   ├── infrastructure.MarketingDependencies.html
│   │   │       │   ├── infrastructure.RepositoryDependencies.html
│   │   │       │   ├── interfaces.IAccommodationController.html
│   │   │       │   ├── interfaces.IAccommodationService.html
│   │   │       │   ├── interfaces.IActivityLogService.html
│   │   │       │   ├── interfaces.IAdminAccountCreationEmailProps.html
│   │   │       │   ├── interfaces.IAdminController.html
│   │   │       │   ├── interfaces.IAdminService.html
│   │   │       │   ├── interfaces.IAnalyticsCronJobs.html
│   │   │       │   ├── interfaces.IAnalyticsService.html
│   │   │       │   ├── interfaces.IApp.html
│   │   │       │   ├── interfaces.IAuth.html
│   │   │       │   ├── interfaces.IAuthController.html
│   │   │       │   ├── interfaces.IAuthMiddleware.html
│   │   │       │   ├── interfaces.IBlogPostController.html
│   │   │       │   ├── interfaces.IBlogPostCronJobs.html
│   │   │       │   ├── interfaces.IBlogPostService.html
│   │   │       │   ├── interfaces.ICategoryController.html
│   │   │       │   ├── interfaces.ICategoryService.html
│   │   │       │   ├── interfaces.IContactController.html
│   │   │       │   ├── interfaces.IContactUsEmailProps.html
│   │   │       │   ├── interfaces.ICreateActivityLog.html
│   │   │       │   ├── interfaces.ICreateMarketingContactEvent.html
│   │   │       │   ├── interfaces.IDepartmentController.html
│   │   │       │   ├── interfaces.IDepartmentService.html
│   │   │       │   ├── interfaces.IEmail.html
│   │   │       │   ├── interfaces.IEmailService.html
│   │   │       │   ├── interfaces.IEmailTemplate.html
│   │   │       │   ├── interfaces.IExceptionController.html
│   │   │       │   ├── interfaces.IFaqController.html
│   │   │       │   ├── interfaces.IFaqService.html
│   │   │       │   ├── interfaces.IFinancialAidController.html
│   │   │       │   ├── interfaces.IFinancialAidEmailProps.html
│   │   │       │   ├── interfaces.IFinancialAidService.html
│   │   │       │   ├── interfaces.IHealthController.html
│   │   │       │   ├── interfaces.IIDGeneratorService.html
│   │   │       │   ├── interfaces.IInquiryService.html
│   │   │       │   ├── interfaces.IIntakeCronJobs.html
│   │   │       │   ├── interfaces.IIntakeService.html
│   │   │       │   ├── interfaces.ILeadCollectionEmailProps.html
│   │   │       │   ├── interfaces.ILeadController.html
│   │   │       │   ├── interfaces.ILogger.html
│   │   │       │   ├── interfaces.IMarketing.html
│   │   │       │   ├── interfaces.INewsletterController.html
│   │   │       │   ├── interfaces.IOurTeamController.html
│   │   │       │   ├── interfaces.IOurTeamService.html
│   │   │       │   ├── interfaces.IPhoneNumberService.html
│   │   │       │   ├── interfaces.IProgramController.html
│   │   │       │   ├── interfaces.IProgramService.html
│   │   │       │   ├── interfaces.IQueryConstruct.html
│   │   │       │   ├── interfaces.IRepository.html
│   │   │       │   ├── interfaces.IRouter.html
│   │   │       │   ├── interfaces.IScholarshipController.html
│   │   │       │   ├── interfaces.IScholarshipService.html
│   │   │       │   ├── interfaces.ISchoolController.html
│   │   │       │   ├── interfaces.ISchoolService.html
│   │   │       │   ├── interfaces.ISendEmailEvent.html
│   │   │       │   ├── interfaces.ISkynedCronJobs.html
│   │   │       │   ├── interfaces.IStorage.html
│   │   │       │   ├── interfaces.IStorageService.html
│   │   │       │   ├── interfaces.ITagController.html
│   │   │       │   ├── interfaces.ITagService.html
│   │   │       │   ├── interfaces.IToken.html
│   │   │       │   ├── interfaces.ITokenService.html
│   │   │       │   ├── interfaces.IValidationUtility.html
│   │   │       │   ├── interfaces.IVerifyEmail.html
│   │   │       │   ├── middleware.IAuthMiddlewareDependencies.html
│   │   │       │   ├── middleware.IValidationData.html
│   │   │       │   ├── publisher.IPublisher.html
│   │   │       │   ├── publisher.PublisherDependencies.html
│   │   │       │   ├── routers.Dependencies.html
│   │   │       │   ├── services.AdminAccountCreationEmailProps.html
│   │   │       │   ├── services.EmailServiceDependencies.html
│   │   │       │   ├── services.FinancialAidNotificationEmailProps.html
│   │   │       │   ├── services.LayoutProps.html
│   │   │       │   ├── services.LeadCollectionNotificationEmailProps.html
│   │   │       │   ├── services.PhoneNumberServiceDependencies.html
│   │   │       │   ├── services.RegardsProps.html
│   │   │       │   ├── services.StorageServiceDependencies.html
│   │   │       │   ├── services.VerifyEmailProps.html
│   │   │       │   ├── subscribers.ISubscriber.html
│   │   │       │   └── subscribers.SubscriberDependencies.html
│   │   │       ├── modules
│   │   │       │   ├── app.html
│   │   │       │   ├── config.html
│   │   │       │   ├── controllers.html
│   │   │       │   ├── cron-jobs.html
│   │   │       │   ├── data.html
│   │   │       │   ├── enum.html
│   │   │       │   ├── express.Express.html
│   │   │       │   ├── express.html
│   │   │       │   ├── index.html
│   │   │       │   ├── infrastructure.html
│   │   │       │   ├── interfaces.html
│   │   │       │   ├── lib.html
│   │   │       │   ├── middleware.html
│   │   │       │   ├── publisher.html
│   │   │       │   ├── registry.html
│   │   │       │   ├── routers.html
│   │   │       │   ├── seed.html
│   │   │       │   ├── services.html
│   │   │       │   ├── subscribers.html
│   │   │       │   ├── swagger.html
│   │   │       │   ├── types.html
│   │   │       │   ├── utils.html
│   │   │       │   └── zod-schemas.html
│   │   │       ├── types
│   │   │       │   ├── infrastructure.AuthCreationSchema.html
│   │   │       │   ├── infrastructure.AuthUpdateSchema.html
│   │   │       │   ├── infrastructure.CreateContactUsSchema.html
│   │   │       │   ├── infrastructure.CreateDbFaqSchema.html
│   │   │       │   ├── infrastructure.TokenVerifySchema.html
│   │   │       │   ├── infrastructure.UpdateDbFaqSchema.html
│   │   │       │   ├── interfaces.EventTypes.html
│   │   │       │   ├── interfaces.TemplateDataType.html
│   │   │       │   ├── services.ContactUsEmailTemplateProps.html
│   │   │       │   ├── services.DeleteCategoriesSchema.html
│   │   │       │   ├── services.DeleteTagsSchema.html
│   │   │       │   ├── types.ResolveStoragePathType.html
│   │   │       │   ├── zod-schemas.AdminIdSchema.html
│   │   │       │   ├── zod-schemas.BlogPostParamsSchema.html
│   │   │       │   ├── zod-schemas.BlogPostQuerySchema.html
│   │   │       │   ├── zod-schemas.CategoryQuerySchema.html
│   │   │       │   ├── zod-schemas.DateRangeSchema.html
│   │   │       │   ├── zod-schemas.GeneralSchema.html
│   │   │       │   ├── zod-schemas.IdSchema.html
│   │   │       │   ├── zod-schemas.IntakeQuery.html
│   │   │       │   ├── zod-schemas.PageQuerySchema.html
│   │   │       │   ├── zod-schemas.ProgramQuerySchema.html
│   │   │       │   ├── zod-schemas.ProgramSlugSchema.html
│   │   │       │   ├── zod-schemas.ScholarshipQuerySchema.html
│   │   │       │   ├── zod-schemas.SchoolIdSchema.html
│   │   │       │   ├── zod-schemas.SchoolQuerySchema.html
│   │   │       │   ├── zod-schemas.SchoolSlugSchema.html
│   │   │       │   └── zod-schemas.TagQuerySchema.html
│   │   │       └── variables
│   │   │           ├── app.app.html
│   │   │           ├── config.env.html
│   │   │           ├── controllers.accommodationController.html
│   │   │           ├── controllers.adminController.html
│   │   │           ├── controllers.authController.html
│   │   │           ├── controllers.blogPostController.html
│   │   │           ├── controllers.categoryController.html
│   │   │           ├── controllers.contactController.html
│   │   │           ├── controllers.departmentController.html
│   │   │           ├── controllers.exceptionController.html
│   │   │           ├── controllers.faqController.html
│   │   │           ├── controllers.financialAidController.html
│   │   │           ├── controllers.healthController.html
│   │   │           ├── controllers.leadController.html
│   │   │           ├── controllers.newsletterController.html
│   │   │           ├── controllers.ourTeamController.html
│   │   │           ├── controllers.programController.html
│   │   │           ├── controllers.scholarshipController.html
│   │   │           ├── controllers.schoolController.html
│   │   │           ├── controllers.tagController.html
│   │   │           ├── cron-jobs.cronJobs.html
│   │   │           ├── data.accommodationData.html
│   │   │           ├── data.admin.html
│   │   │           ├── data.adminPassword.html
│   │   │           ├── data.blogPostData.html
│   │   │           ├── data.financialAidData.html
│   │   │           ├── data.intakeData.html
│   │   │           ├── data.programData.html
│   │   │           ├── data.scholarshipData.html
│   │   │           ├── data.schoolData.html
│   │   │           ├── infrastructure.AuthCreationSchema.html
│   │   │           ├── infrastructure.AuthUpdateSchema.html
│   │   │           ├── infrastructure.CreateContactUsSchema.html
│   │   │           ├── infrastructure.CreateDbFaqSchema.html
│   │   │           ├── infrastructure.TokenVerifySchema.html
│   │   │           ├── infrastructure.UpdateDbFaqSchema.html
│   │   │           ├── infrastructure.adminSchema.html
│   │   │           ├── infrastructure.auth.html
│   │   │           ├── infrastructure.email.html
│   │   │           ├── infrastructure.logger.html
│   │   │           ├── infrastructure.marketing.html
│   │   │           ├── infrastructure.repository.html
│   │   │           ├── infrastructure.storage.html
│   │   │           ├── infrastructure.tokenSchema.html
│   │   │           ├── middleware.authMiddleware.html
│   │   │           ├── publisher.publisher.html
│   │   │           ├── routers.baseRouter.html
│   │   │           ├── services.AdminAccountCreation.html
│   │   │           ├── services.DeleteCategoriesSchema.html
│   │   │           ├── services.DeleteTagsSchema.html
│   │   │           ├── services.Footer.html
│   │   │           ├── services.Header.html
│   │   │           ├── services.Layout.html
│   │   │           ├── services.Regards.html
│   │   │           ├── services.VerifyEmail.html
│   │   │           ├── services.accommodationService.html
│   │   │           ├── services.activityLogService.html
│   │   │           ├── services.adminService.html
│   │   │           ├── services.analyticsService.html
│   │   │           ├── services.blogPostService.html
│   │   │           ├── services.categoryService.html
│   │   │           ├── services.departmentService.html
│   │   │           ├── services.emailService.html
│   │   │           ├── services.faqService.html
│   │   │           ├── services.financialAidService.html
│   │   │           ├── services.idGeneratorService.html
│   │   │           ├── services.inquiryService.html
│   │   │           ├── services.intakeService.html
│   │   │           ├── services.ourTeamService.html
│   │   │           ├── services.phoneNumberService.html
│   │   │           ├── services.programService.html
│   │   │           ├── services.scholarshipService.html
│   │   │           ├── services.schoolService.html
│   │   │           ├── services.storageService.html
│   │   │           ├── services.tagService.html
│   │   │           ├── services.tokenService.html
│   │   │           ├── subscribers.subscriber.html
│   │   │           ├── swagger.default.html
│   │   │           ├── utils.DEFAULT_QUERY_LIMIT.html
│   │   │           ├── utils.DEFAULT_RATE_LIMIT_MINUTE.html
│   │   │           ├── utils.PROHIBITED_USER_EMAIL_DOMAINS.html
│   │   │           ├── utils.REQUESTS_PER_DEFAULT_RATE_LIMIT_MINUTE.html
│   │   │           ├── utils.TOKEN_EXPIRY_IN_MINUTE.html
│   │   │           ├── utils.adminProfileKeys.html
│   │   │           ├── utils.validationUtility.html
│   │   │           ├── zod-schemas.AdminIdSchema.html
│   │   │           ├── zod-schemas.BlogPostParamsSchema.html
│   │   │           ├── zod-schemas.BlogPostQuerySchema.html
│   │   │           ├── zod-schemas.CategoryQuerySchema.html
│   │   │           ├── zod-schemas.DateRangeSchema.html
│   │   │           ├── zod-schemas.GeneralSchema.html
│   │   │           ├── zod-schemas.IdSchema.html
│   │   │           ├── zod-schemas.IntakeQuery.html
│   │   │           ├── zod-schemas.PageQuerySchema.html
│   │   │           ├── zod-schemas.ProgramQuerySchema.html
│   │   │           ├── zod-schemas.ProgramSlugSchema.html
│   │   │           ├── zod-schemas.ScholarshipQuerySchema.html
│   │   │           ├── zod-schemas.SchoolIdSchema.html
│   │   │           ├── zod-schemas.SchoolQuerySchema.html
│   │   │           ├── zod-schemas.SchoolSlugSchema.html
│   │   │           └── zod-schemas.TagQuerySchema.html
│   │   └── src
│   │       ├── app.js
│   │       ├── app.js.map
│   │       ├── config
│   │       │   ├── env.js
│   │       │   ├── env.js.map
│   │       │   ├── index.js
│   │       │   └── index.js.map
│   │       ├── controllers
│   │       │   ├── health
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   └── index.test.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   └── v1
│   │       │       ├── accommodation
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── admin
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── auth
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── blog-post
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── category
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── contact
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── department
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── exception
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── faq
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── financial-aid
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── index.js
│   │       │       ├── index.js.map
│   │       │       ├── lead
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── newsletter
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── out-team
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── program
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── scholarship
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── school
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── tag
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       └── utils
│   │       │           ├── index.js
│   │       │           └── index.js.map
│   │       ├── cron-jobs
│   │       │   ├── analytics.js
│   │       │   ├── analytics.js.map
│   │       │   ├── blog-post.js
│   │       │   ├── blog-post.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── intake.js
│   │       │   └── intake.js.map
│   │       ├── data
│   │       │   ├── accommodation.js
│   │       │   ├── accommodation.js.map
│   │       │   ├── admin.js
│   │       │   ├── admin.js.map
│   │       │   ├── blog-post.js
│   │       │   ├── blog-post.js.map
│   │       │   ├── financial-aid.js
│   │       │   ├── financial-aid.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── intake.js
│   │       │   ├── intake.js.map
│   │       │   ├── program.js
│   │       │   ├── program.js.map
│   │       │   ├── scholarship.js
│   │       │   ├── scholarship.js.map
│   │       │   ├── school.js
│   │       │   └── school.js.map
│   │       ├── enum
│   │       │   ├── events.js
│   │       │   ├── events.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── registry-keys.js
│   │       │   └── registry-keys.js.map
│   │       ├── index.js
│   │       ├── index.js.map
│   │       ├── infrastructure
│   │       │   ├── auth
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   ├── index.test.js.map
│   │       │   │   ├── schema.js
│   │       │   │   └── schema.js.map
│   │       │   ├── email
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── key.json
│   │       │   │   ├── schema.js
│   │       │   │   └── schema.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── logger
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   └── index.test.js.map
│   │       │   ├── marketing
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   ├── index.test.js.map
│   │       │   │   ├── schema.js
│   │       │   │   └── schema.js.map
│   │       │   ├── repository
│   │       │   │   ├── accommodation
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   └── interface.js.map
│   │       │   │   ├── activity-log
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   └── interface.js.map
│   │       │   │   ├── admin
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   ├── interface.js.map
│   │       │   │   │   ├── schema.js
│   │       │   │   │   └── schema.js.map
│   │       │   │   ├── department
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   └── interface.js.map
│   │       │   │   ├── faq
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   ├── interface.js.map
│   │       │   │   │   ├── schema.js
│   │       │   │   │   └── schema.js.map
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   ├── index.test.js.map
│   │       │   │   ├── inquiry
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   ├── interface.js.map
│   │       │   │   │   ├── schema.js
│   │       │   │   │   └── schema.js.map
│   │       │   │   ├── intake
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   └── interface.js.map
│   │       │   │   ├── prisma-client
│   │       │   │   │   ├── client.d.ts
│   │       │   │   │   ├── client.js
│   │       │   │   │   ├── default.d.ts
│   │       │   │   │   ├── default.js
│   │       │   │   │   ├── edge.d.ts
│   │       │   │   │   ├── edge.js
│   │       │   │   │   ├── index-browser.js
│   │       │   │   │   ├── index.d.ts
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── libquery_engine-darwin-arm64.dylib.node
│   │       │   │   │   ├── libquery_engine-debian-openssl-3.0.x.so.node
│   │       │   │   │   ├── package.json
│   │       │   │   │   ├── prisma-client
│   │       │   │   │   │   ├── client.d.ts
│   │       │   │   │   │   ├── client.js
│   │       │   │   │   │   ├── default.d.ts
│   │       │   │   │   │   ├── default.js
│   │       │   │   │   │   ├── edge.d.ts
│   │       │   │   │   │   ├── edge.js
│   │       │   │   │   │   ├── index-browser.js
│   │       │   │   │   │   ├── index.d.ts
│   │       │   │   │   │   ├── index.js
│   │       │   │   │   │   ├── libquery_engine-darwin-arm64.dylib.node
│   │       │   │   │   │   ├── libquery_engine-debian-openssl-3.0.x.so.node
│   │       │   │   │   │   ├── package.json
│   │       │   │   │   │   ├── query_engine_bg.js
│   │       │   │   │   │   ├── query_engine_bg.wasm
│   │       │   │   │   │   ├── runtime
│   │       │   │   │   │   │   ├── edge-esm.js
│   │       │   │   │   │   │   ├── edge.js
│   │       │   │   │   │   │   ├── index-browser.d.ts
│   │       │   │   │   │   │   ├── index-browser.js
│   │       │   │   │   │   │   ├── library.d.ts
│   │       │   │   │   │   │   ├── library.js
│   │       │   │   │   │   │   ├── react-native.js
│   │       │   │   │   │   │   ├── wasm-compiler-edge.js
│   │       │   │   │   │   │   ├── wasm-engine-edge.js
│   │       │   │   │   │   │   └── wasm.js
│   │       │   │   │   │   ├── schema.prisma
│   │       │   │   │   │   ├── wasm-edge-light-loader.mjs
│   │       │   │   │   │   ├── wasm-worker-loader.mjs
│   │       │   │   │   │   ├── wasm.d.ts
│   │       │   │   │   │   └── wasm.js
│   │       │   │   │   ├── query_engine_bg.js
│   │       │   │   │   ├── query_engine_bg.wasm
│   │       │   │   │   ├── runtime
│   │       │   │   │   │   ├── edge-esm.js
│   │       │   │   │   │   ├── edge.js
│   │       │   │   │   │   ├── index-browser.d.ts
│   │       │   │   │   │   ├── index-browser.js
│   │       │   │   │   │   ├── library.d.ts
│   │       │   │   │   │   ├── library.js
│   │       │   │   │   │   ├── react-native.js
│   │       │   │   │   │   ├── wasm-compiler-edge.js
│   │       │   │   │   │   ├── wasm-engine-edge.js
│   │       │   │   │   │   └── wasm.js
│   │       │   │   │   ├── schema.prisma
│   │       │   │   │   ├── wasm-edge-light-loader.mjs
│   │       │   │   │   ├── wasm-worker-loader.mjs
│   │       │   │   │   ├── wasm.d.ts
│   │       │   │   │   └── wasm.js
│   │       │   │   ├── prisma.js
│   │       │   │   ├── prisma.js.map
│   │       │   │   ├── school
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   └── interface.js.map
│   │       │   │   ├── token
│   │       │   │   │   ├── index.js
│   │       │   │   │   ├── index.js.map
│   │       │   │   │   ├── index.test.js
│   │       │   │   │   ├── index.test.js.map
│   │       │   │   │   ├── interface.js
│   │       │   │   │   ├── interface.js.map
│   │       │   │   │   ├── schema.js
│   │       │   │   │   └── schema.js.map
│   │       │   │   ├── utils.js
│   │       │   │   └── utils.js.map
│   │       │   └── storage
│   │       │       ├── index.js
│   │       │       └── index.js.map
│   │       ├── interfaces
│   │       │   ├── app
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── token.js
│   │       │   │   └── token.js.map
│   │       │   ├── controllers
│   │       │   │   ├── accommodation.js
│   │       │   │   ├── accommodation.js.map
│   │       │   │   ├── admin.js
│   │       │   │   ├── admin.js.map
│   │       │   │   ├── auth.js
│   │       │   │   ├── auth.js.map
│   │       │   │   ├── blog-post.js
│   │       │   │   ├── blog-post.js.map
│   │       │   │   ├── category.js
│   │       │   │   ├── category.js.map
│   │       │   │   ├── contact.js
│   │       │   │   ├── contact.js.map
│   │       │   │   ├── department.js
│   │       │   │   ├── department.js.map
│   │       │   │   ├── exception.js
│   │       │   │   ├── exception.js.map
│   │       │   │   ├── faq.js
│   │       │   │   ├── faq.js.map
│   │       │   │   ├── financial-aid.js
│   │       │   │   ├── financial-aid.js.map
│   │       │   │   ├── health.js
│   │       │   │   ├── health.js.map
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── intake.js
│   │       │   │   ├── intake.js.map
│   │       │   │   ├── lead.js
│   │       │   │   ├── lead.js.map
│   │       │   │   ├── newsletter.js
│   │       │   │   ├── newsletter.js.map
│   │       │   │   ├── our-team.js
│   │       │   │   ├── our-team.js.map
│   │       │   │   ├── program.js
│   │       │   │   ├── program.js.map
│   │       │   │   ├── scholarship.js
│   │       │   │   ├── scholarship.js.map
│   │       │   │   ├── school.js
│   │       │   │   ├── school.js.map
│   │       │   │   ├── tag.js
│   │       │   │   └── tag.js.map
│   │       │   ├── cron-jobs
│   │       │   │   ├── analytics.js
│   │       │   │   ├── analytics.js.map
│   │       │   │   ├── blog-post.js
│   │       │   │   ├── blog-post.js.map
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── intake.js
│   │       │   │   └── intake.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── infrastructure
│   │       │   │   ├── auth.js
│   │       │   │   ├── auth.js.map
│   │       │   │   ├── email.js
│   │       │   │   ├── email.js.map
│   │       │   │   ├── events.js
│   │       │   │   ├── events.js.map
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── logger.js
│   │       │   │   ├── logger.js.map
│   │       │   │   ├── marketing.js
│   │       │   │   ├── marketing.js.map
│   │       │   │   ├── repository
│   │       │   │   │   ├── index.js
│   │       │   │   │   └── index.js.map
│   │       │   │   ├── storage.js
│   │       │   │   └── storage.js.map
│   │       │   ├── middlewares
│   │       │   │   ├── auth.js
│   │       │   │   ├── auth.js.map
│   │       │   │   ├── index.js
│   │       │   │   └── index.js.map
│   │       │   ├── services
│   │       │   │   ├── accommodation.js
│   │       │   │   ├── accommodation.js.map
│   │       │   │   ├── activity-log.js
│   │       │   │   ├── activity-log.js.map
│   │       │   │   ├── admin.js
│   │       │   │   ├── admin.js.map
│   │       │   │   ├── analytics.js
│   │       │   │   ├── analytics.js.map
│   │       │   │   ├── blog-post.js
│   │       │   │   ├── blog-post.js.map
│   │       │   │   ├── category.js
│   │       │   │   ├── category.js.map
│   │       │   │   ├── department.js
│   │       │   │   ├── department.js.map
│   │       │   │   ├── email.js
│   │       │   │   ├── email.js.map
│   │       │   │   ├── faq.js
│   │       │   │   ├── faq.js.map
│   │       │   │   ├── financial-aid.js
│   │       │   │   ├── financial-aid.js.map
│   │       │   │   ├── id-generator.js
│   │       │   │   ├── id-generator.js.map
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── inquiry.js
│   │       │   │   ├── inquiry.js.map
│   │       │   │   ├── intake.js
│   │       │   │   ├── intake.js.map
│   │       │   │   ├── our-team.js
│   │       │   │   ├── our-team.js.map
│   │       │   │   ├── phone-number.js
│   │       │   │   ├── phone-number.js.map
│   │       │   │   ├── program.js
│   │       │   │   ├── program.js.map
│   │       │   │   ├── scholarship.js
│   │       │   │   ├── scholarship.js.map
│   │       │   │   ├── school.js
│   │       │   │   ├── school.js.map
│   │       │   │   ├── storage.js
│   │       │   │   ├── storage.js.map
│   │       │   │   ├── tag.js
│   │       │   │   ├── tag.js.map
│   │       │   │   ├── token.js
│   │       │   │   └── token.js.map
│   │       │   └── utils
│   │       │       ├── index.js
│   │       │       ├── index.js.map
│   │       │       ├── validation.js
│   │       │       └── validation.js.map
│   │       ├── lib
│   │       │   ├── exception.js
│   │       │   ├── exception.js.map
│   │       │   ├── index.js
│   │       │   └── index.js.map
│   │       ├── middleware
│   │       │   ├── auth.js
│   │       │   ├── auth.js.map
│   │       │   ├── binder
│   │       │   │   ├── index.js
│   │       │   │   └── index.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── rate-limit.js
│   │       │   ├── rate-limit.js.map
│   │       │   └── request-validation
│   │       │       ├── index.js
│   │       │       ├── index.js.map
│   │       │       ├── interface.js
│   │       │       └── interface.js.map
│   │       ├── publisher
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── index.test.js
│   │       │   ├── index.test.js.map
│   │       │   ├── interface.js
│   │       │   └── interface.js.map
│   │       ├── registry.js
│   │       ├── registry.js.map
│   │       ├── routers
│   │       │   ├── api
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   ├── index.test.js.map
│   │       │   │   └── v1
│   │       │   │       ├── accommodation
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── admin
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── auth
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── blog-post
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── categories
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── contact
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── department
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── faq
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── financial-aids
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── index.js
│   │       │   │       ├── index.js.map
│   │       │   │       ├── index.test.js
│   │       │   │       ├── index.test.js.map
│   │       │   │       ├── lead
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── newsletter
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── our-team
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── program
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── scholarship
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       ├── school
│   │       │   │       │   ├── index.js
│   │       │   │       │   ├── index.js.map
│   │       │   │       │   ├── index.test.js
│   │       │   │       │   └── index.test.js.map
│   │       │   │       └── tag
│   │       │   │           ├── index.js
│   │       │   │           ├── index.js.map
│   │       │   │           ├── index.test.js
│   │       │   │           └── index.test.js.map
│   │       │   ├── health
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   └── index.test.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── index.test.js
│   │       │   └── index.test.js.map
│   │       ├── seed
│   │       │   ├── admin.js
│   │       │   ├── admin.js.map
│   │       │   ├── department.js
│   │       │   ├── department.js.map
│   │       │   ├── image.js
│   │       │   ├── image.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── test-seed.js
│   │       │   └── test-seed.js.map
│   │       ├── services
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   └── v1
│   │       │       ├── accommodation
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── activity-log
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── admin
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── analytics
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── blog-post
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── category
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── department
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.ts.js
│   │       │       │   ├── index.test.ts.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── email
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   └── templates
│   │       │       │       ├── admin-account-creation.js
│   │       │       │       ├── admin-account-creation.js.map
│   │       │       │       ├── contact-us.js
│   │       │       │       ├── contact-us.js.map
│   │       │       │       ├── financial-aid.js
│   │       │       │       ├── financial-aid.js.map
│   │       │       │       ├── footer.js
│   │       │       │       ├── footer.js.map
│   │       │       │       ├── header.js
│   │       │       │       ├── header.js.map
│   │       │       │       ├── index.js
│   │       │       │       ├── index.js.map
│   │       │       │       ├── layout.js
│   │       │       │       ├── layout.js.map
│   │       │       │       ├── lead-submission.js
│   │       │       │       ├── lead-submission.js.map
│   │       │       │       ├── regards.js
│   │       │       │       ├── regards.js.map
│   │       │       │       ├── verify-email.js
│   │       │       │       └── verify-email.js.map
│   │       │       ├── faq
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── financial-aid
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── id-generator
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── index.js
│   │       │       ├── index.js.map
│   │       │       ├── inquiry
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── intake
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── our-team
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── phone-number
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── program
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── scholarship
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── school
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── storage
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── tag
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   ├── index.test.js.map
│   │       │       │   ├── schema.js
│   │       │       │   └── schema.js.map
│   │       │       ├── token
│   │       │       │   ├── index.js
│   │       │       │   ├── index.js.map
│   │       │       │   ├── index.test.js
│   │       │       │   └── index.test.js.map
│   │       │       ├── utils.js
│   │       │       └── utils.js.map
│   │       ├── subscribers
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── index.test.js
│   │       │   ├── index.test.js.map
│   │       │   ├── interface.js
│   │       │   └── interface.js.map
│   │       ├── swagger
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── parameters
│   │       │   │   ├── admin-id.yaml
│   │       │   │   ├── id.yaml
│   │       │   │   ├── limit.yaml
│   │       │   │   ├── offset.yaml
│   │       │   │   ├── range.yaml
│   │       │   │   └── school.yaml
│   │       │   ├── paths
│   │       │   │   ├── accommodation.yaml
│   │       │   │   ├── admin.yaml
│   │       │   │   ├── auth.yaml
│   │       │   │   ├── blog.yaml
│   │       │   │   ├── category.yaml
│   │       │   │   ├── contact.yaml
│   │       │   │   ├── department.yaml
│   │       │   │   ├── faq.yaml
│   │       │   │   ├── newsletter.yaml
│   │       │   │   ├── our-team.yaml
│   │       │   │   ├── scholarship.yaml
│   │       │   │   ├── school.yaml
│   │       │   │   └── tag.yaml
│   │       │   ├── responses
│   │       │   │   └── index.yaml
│   │       │   ├── schemas
│   │       │   │   ├── accommodation.yaml
│   │       │   │   ├── admin-profile.yaml
│   │       │   │   ├── admin.yaml
│   │       │   │   ├── blog.yaml
│   │       │   │   ├── department.yaml
│   │       │   │   ├── faq.yaml
│   │       │   │   ├── inquiry.yaml
│   │       │   │   ├── intake.yaml
│   │       │   │   ├── object.yaml
│   │       │   │   ├── phone-number.yaml
│   │       │   │   ├── proficiency.yaml
│   │       │   │   ├── program.yaml
│   │       │   │   ├── responses.yaml
│   │       │   │   ├── scholarship.yaml
│   │       │   │   ├── school.yaml
│   │       │   │   ├── social.yaml
│   │       │   │   ├── team.yaml
│   │       │   │   └── timestamp.yaml
│   │       │   └── security
│   │       │       └── index.yaml
│   │       ├── types
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   ├── storage-path.js
│   │       │   └── storage-path.js.map
│   │       ├── utils
│   │       │   ├── constants.js
│   │       │   ├── constants.js.map
│   │       │   ├── helpers
│   │       │   │   ├── index.js
│   │       │   │   ├── index.js.map
│   │       │   │   ├── index.test.js
│   │       │   │   └── index.test.js.map
│   │       │   ├── index.js
│   │       │   ├── index.js.map
│   │       │   └── validation
│   │       │       ├── index.js
│   │       │       ├── index.js.map
│   │       │       ├── index.test.js
│   │       │       └── index.test.js.map
│   │       └── zod-schemas
│   │           ├── analytics.js
│   │           ├── analytics.js.map
│   │           ├── blog-post.js
│   │           ├── blog-post.js.map
│   │           ├── category.js
│   │           ├── category.js.map
│   │           ├── general.js
│   │           ├── general.js.map
│   │           ├── id.js
│   │           ├── id.js.map
│   │           ├── index.js
│   │           ├── index.js.map
│   │           ├── intake.js
│   │           ├── intake.js.map
│   │           ├── program.js
│   │           ├── program.js.map
│   │           ├── query.js
│   │           ├── query.js.map
│   │           ├── scholarship.js
│   │           ├── scholarship.js.map
│   │           ├── school.js
│   │           ├── school.js.map
│   │           ├── tag.js
│   │           └── tag.js.map
│   ├── package.json
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20250417212220_added_admin_schema
│   │   │   │   └── migration.sql
│   │   │   ├── 20250424100702_added_inquiry_schema
│   │   │   │   └── migration.sql
│   │   │   ├── 20250424221527_added_subject_to_inquiry
│   │   │   │   └── migration.sql
│   │   │   ├── 20250501222613_made_id_on_admin_unique_and_created_activity_log
│   │   │   │   └── migration.sql
│   │   │   ├── 20250509133859_added_created_by_id_to_teams
│   │   │   │   └── migration.sql
│   │   │   ├── 20250521032651_added_school
│   │   │   │   └── migration.sql
│   │   │   ├── 20250521144503_added_index_to_school
│   │   │   │   └── migration.sql
│   │   │   ├── 20250521225919_used_random_id_for_school_id
│   │   │   │   └── migration.sql
│   │   │   ├── 20250522180415_added_accommodation_and_intakes
│   │   │   │   └── migration.sql
│   │   │   ├── 20250526143252_added_uniqueness_for_intakes
│   │   │   │   └── migration.sql
│   │   │   ├── 20250527232805_made_intake_a_string
│   │   │   │   └── migration.sql
│   │   │   ├── 20250625124457_added_programs
│   │   │   │   └── migration.sql
│   │   │   ├── 20250701111752_refactored_intakes_and_programs_and_added_proficiencies
│   │   │   │   └── migration.sql
│   │   │   ├── 20250707064546_added_blog_post
│   │   │   │   └── migration.sql
│   │   │   ├── 20250721132055_added_daily_metrics
│   │   │   │   └── migration.sql
│   │   │   ├── 20250721172523_modified_daily_metrics
│   │   │   │   └── migration.sql
│   │   │   ├── 20250724060917_added_indexes_for_kpis
│   │   │   │   └── migration.sql
│   │   │   ├── 20250802060502_added_indexes
│   │   │   │   └── migration.sql
│   │   │   ├── 20250825114933_added_random_key
│   │   │   │   └── migration.sql
│   │   │   ├── 20250825124529_added_more_indexes_to_programs
│   │   │   │   └── migration.sql
│   │   │   ├── 20250825125146_removed_text_indexes
│   │   │   │   └── migration.sql
│   │   │   ├── 20250904105426_make_falculty_optional
│   │   │   │   └── migration.sql
│   │   │   ├── 20250909182408_removed_index_for_overview_on_programs
│   │   │   │   └── migration.sql
│   │   │   ├── 20250925112429_added_financial_aids_to_programs_schema
│   │   │   │   └── migration.sql
│   │   │   ├── 20250925161359_added_finantial_aid_to_index
│   │   │   │   └── migration.sql
│   │   │   ├── 20250926151410_added_scholarship_schema
│   │   │   │   └── migration.sql
│   │   │   ├── 20251017091541_added_financial_aid
│   │   │   │   └── migration.sql
│   │   │   ├── 20251017095402_remove_text_constrain
│   │   │   │   └── migration.sql
│   │   │   ├── 20251017153833_added_relation_to_financial_aid
│   │   │   │   └── migration.sql
│   │   │   ├── 20251028110354_added_offer_letter
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── shared
│   │   ├── dist
│   │   │   ├── access-control
│   │   │   │   ├── index.d.ts
│   │   │   │   ├── index.js
│   │   │   │   ├── interfaces.d.ts
│   │   │   │   ├── interfaces.js
│   │   │   │   ├── policies
│   │   │   │   │   ├── accommodations.d.ts
│   │   │   │   │   ├── accommodations.js
│   │   │   │   │   ├── admins.d.ts
│   │   │   │   │   ├── admins.js
│   │   │   │   │   ├── blog.d.ts
│   │   │   │   │   ├── blog.js
│   │   │   │   │   ├── category.d.ts
│   │   │   │   │   ├── category.js
│   │   │   │   │   ├── department.d.ts
│   │   │   │   │   ├── department.js
│   │   │   │   │   ├── faq.d.ts
│   │   │   │   │   ├── faq.js
│   │   │   │   │   ├── financial-aid.d.ts
│   │   │   │   │   ├── financial-aid.js
│   │   │   │   │   ├── index.d.ts
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── inquiry.d.ts
│   │   │   │   │   ├── inquiry.js
│   │   │   │   │   ├── intakes.d.ts
│   │   │   │   │   ├── intakes.js
│   │   │   │   │   ├── programs.d.ts
│   │   │   │   │   ├── programs.js
│   │   │   │   │   ├── scholarship.d.ts
│   │   │   │   │   ├── scholarship.js
│   │   │   │   │   ├── schools.d.ts
│   │   │   │   │   ├── schools.js
│   │   │   │   │   ├── tag.d.ts
│   │   │   │   │   └── tag.js
│   │   │   │   ├── types.d.ts
│   │   │   │   └── types.js
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   ├── interfaces
│   │   │   │   ├── accommodation.d.ts
│   │   │   │   ├── accommodation.js
│   │   │   │   ├── activity-log.d.ts
│   │   │   │   ├── activity-log.js
│   │   │   │   ├── admin.d.ts
│   │   │   │   ├── admin.js
│   │   │   │   ├── analytics.d.ts
│   │   │   │   ├── analytics.js
│   │   │   │   ├── blog.d.ts
│   │   │   │   ├── blog.js
│   │   │   │   ├── department.d.ts
│   │   │   │   ├── department.js
│   │   │   │   ├── faq.d.ts
│   │   │   │   ├── faq.js
│   │   │   │   ├── financial-aid.d.ts
│   │   │   │   ├── financial-aid.js
│   │   │   │   ├── index.d.ts
│   │   │   │   ├── index.js
│   │   │   │   ├── inquiry.d.ts
│   │   │   │   ├── inquiry.js
│   │   │   │   ├── intake.d.ts
│   │   │   │   ├── intake.js
│   │   │   │   ├── program.d.ts
│   │   │   │   ├── program.js
│   │   │   │   ├── response.d.ts
│   │   │   │   ├── response.js
│   │   │   │   ├── scholarship.d.ts
│   │   │   │   ├── scholarship.js
│   │   │   │   ├── school.d.ts
│   │   │   │   ├── school.js
│   │   │   │   ├── team.d.ts
│   │   │   │   ├── team.js
│   │   │   │   ├── utils.d.ts
│   │   │   │   └── utils.js
│   │   │   ├── schemas
│   │   │   │   ├── accommodation.d.ts
│   │   │   │   ├── accommodation.js
│   │   │   │   ├── admin.d.ts
│   │   │   │   ├── admin.js
│   │   │   │   ├── apply.d.ts
│   │   │   │   ├── apply.js
│   │   │   │   ├── blog-post.d.ts
│   │   │   │   ├── blog-post.js
│   │   │   │   ├── common.d.ts
│   │   │   │   ├── common.js
│   │   │   │   ├── contact.d.ts
│   │   │   │   ├── contact.js
│   │   │   │   ├── english-proficiency.d.ts
│   │   │   │   ├── english-proficiency.js
│   │   │   │   ├── faq.d.ts
│   │   │   │   ├── faq.js
│   │   │   │   ├── financial-aid.d.ts
│   │   │   │   ├── financial-aid.js
│   │   │   │   ├── index.d.ts
│   │   │   │   ├── index.js
│   │   │   │   ├── intake.d.ts
│   │   │   │   ├── intake.js
│   │   │   │   ├── program.d.ts
│   │   │   │   ├── program.js
│   │   │   │   ├── register.d.ts
│   │   │   │   ├── register.js
│   │   │   │   ├── scholarship.d.ts
│   │   │   │   ├── scholarship.js
│   │   │   │   ├── school.d.ts
│   │   │   │   └── school.js
│   │   │   ├── types
│   │   │   │   ├── index.d.ts
│   │   │   │   ├── index.js
│   │   │   │   ├── utils.d.ts
│   │   │   │   └── utils.js
│   │   │   └── utils
│   │   │       ├── constants.d.ts
│   │   │       ├── constants.js
│   │   │       ├── degree-types.d.ts
│   │   │       ├── degree-types.js
│   │   │       ├── education-level.d.ts
│   │   │       ├── education-level.js
│   │   │       ├── english-proficiency.d.ts
│   │   │       ├── english-proficiency.js
│   │   │       ├── financial-aid.d.ts
│   │   │       ├── financial-aid.js
│   │   │       ├── index.d.ts
│   │   │       └── index.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── access-control
│   │   │   │   ├── index.ts
│   │   │   │   ├── interfaces.ts
│   │   │   │   ├── policies
│   │   │   │   │   ├── accommodations.ts
│   │   │   │   │   ├── admins.ts
│   │   │   │   │   ├── blog.ts
│   │   │   │   │   ├── category.ts
│   │   │   │   │   ├── department.ts
│   │   │   │   │   ├── faq.ts
│   │   │   │   │   ├── financial-aid.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── inquiry.ts
│   │   │   │   │   ├── intakes.ts
│   │   │   │   │   ├── programs.ts
│   │   │   │   │   ├── scholarship.ts
│   │   │   │   │   ├── schools.ts
│   │   │   │   │   └── tag.ts
│   │   │   │   └── types.ts
│   │   │   ├── index.ts
│   │   │   ├── interfaces
│   │   │   │   ├── accommodation.ts
│   │   │   │   ├── activity-log.ts
│   │   │   │   ├── admin.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   ├── blog.ts
│   │   │   │   ├── department.ts
│   │   │   │   ├── faq.ts
│   │   │   │   ├── financial-aid.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── inquiry.ts
│   │   │   │   ├── intake.ts
│   │   │   │   ├── program.ts
│   │   │   │   ├── response.ts
│   │   │   │   ├── scholarship.ts
│   │   │   │   ├── school.ts
│   │   │   │   ├── team.ts
│   │   │   │   └── utils.ts
│   │   │   ├── schemas
│   │   │   │   ├── accommodation.ts
│   │   │   │   ├── admin.ts
│   │   │   │   ├── apply.ts
│   │   │   │   ├── blog-post.ts
│   │   │   │   ├── common.ts
│   │   │   │   ├── contact.ts
│   │   │   │   ├── english-proficiency.ts
│   │   │   │   ├── faq.ts
│   │   │   │   ├── financial-aid.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── intake.ts
│   │   │   │   ├── program.ts
│   │   │   │   ├── register.ts
│   │   │   │   ├── scholarship.ts
│   │   │   │   └── school.ts
│   │   │   ├── types
│   │   │   │   ├── index.ts
│   │   │   │   └── utils.ts
│   │   │   └── utils
│   │   │       ├── constants.ts
│   │   │       ├── degree-types.ts
│   │   │       ├── education-level.ts
│   │   │       ├── english-proficiency.ts
│   │   │       ├── financial-aid.ts
│   │   │       └── index.ts
│   │   └── tsconfig.json
│   ├── src
│   │   ├── app.ts
│   │   ├── config
│   │   │   ├── env.ts
│   │   │   └── index.ts
│   │   ├── controllers
│   │   │   ├── health
│   │   │   │   ├── index.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── v1
│   │   │       ├── accommodation
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── admin
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── auth
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── blog-post
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── category
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── contact
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── department
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── exception
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── faq
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── financial-aid
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── index.ts
│   │   │       ├── lead
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── newsletter
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── out-team
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── program
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── scholarship
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── school
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── tag
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       └── utils
│   │   │           └── index.ts
│   │   ├── cron-jobs
│   │   │   ├── analytics.ts
│   │   │   ├── blog-post.ts
│   │   │   ├── index.ts
│   │   │   └── intake.ts
│   │   ├── data
│   │   │   ├── accommodation.ts
│   │   │   ├── admin.ts
│   │   │   ├── blog-post.ts
│   │   │   ├── financial-aid.ts
│   │   │   ├── index.ts
│   │   │   ├── intake.ts
│   │   │   ├── program.ts
│   │   │   ├── scholarship.ts
│   │   │   └── school.ts
│   │   ├── enum
│   │   │   ├── events.ts
│   │   │   ├── index.ts
│   │   │   └── registry-keys.ts
│   │   ├── express.d.ts
│   │   ├── index.ts
│   │   ├── infrastructure
│   │   │   ├── auth
│   │   │   │   ├── index.test.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── schema.ts
│   │   │   ├── email
│   │   │   │   ├── index.ts
│   │   │   │   ├── key.json
│   │   │   │   └── schema.ts
│   │   │   ├── index.ts
│   │   │   ├── logger
│   │   │   │   ├── index.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── marketing
│   │   │   │   ├── index.test.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── schema.ts
│   │   │   ├── repository
│   │   │   │   ├── accommodation
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── interface.ts
│   │   │   │   ├── activity-log
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── interface.ts
│   │   │   │   ├── admin
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── interface.ts
│   │   │   │   │   └── schema.ts
│   │   │   │   ├── department
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── interface.ts
│   │   │   │   ├── faq
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── interface.ts
│   │   │   │   │   └── schema.ts
│   │   │   │   ├── index.test.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── inquiry
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── interface.ts
│   │   │   │   │   └── schema.ts
│   │   │   │   ├── intake
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── interface.ts
│   │   │   │   ├── prisma-client
│   │   │   │   │   ├── client.d.ts
│   │   │   │   │   ├── client.js
│   │   │   │   │   ├── default.d.ts
│   │   │   │   │   ├── default.js
│   │   │   │   │   ├── edge.d.ts
│   │   │   │   │   ├── edge.js
│   │   │   │   │   ├── index-browser.js
│   │   │   │   │   ├── index.d.ts
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── libquery_engine-darwin-arm64.dylib.node
│   │   │   │   │   ├── libquery_engine-debian-openssl-3.0.x.so.node
│   │   │   │   │   ├── package.json
│   │   │   │   │   ├── query_engine_bg.js
│   │   │   │   │   ├── query_engine_bg.wasm
│   │   │   │   │   ├── runtime
│   │   │   │   │   │   ├── edge-esm.js
│   │   │   │   │   │   ├── edge.js
│   │   │   │   │   │   ├── index-browser.d.ts
│   │   │   │   │   │   ├── index-browser.js
│   │   │   │   │   │   ├── library.d.ts
│   │   │   │   │   │   ├── library.js
│   │   │   │   │   │   ├── react-native.js
│   │   │   │   │   │   ├── wasm-compiler-edge.js
│   │   │   │   │   │   ├── wasm-engine-edge.js
│   │   │   │   │   │   └── wasm.js
│   │   │   │   │   ├── schema.prisma
│   │   │   │   │   ├── wasm-edge-light-loader.mjs
│   │   │   │   │   ├── wasm-worker-loader.mjs
│   │   │   │   │   ├── wasm.d.ts
│   │   │   │   │   └── wasm.js
│   │   │   │   ├── prisma.ts
│   │   │   │   ├── school
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── interface.ts
│   │   │   │   ├── token
│   │   │   │   │   ├── index.test.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── interface.ts
│   │   │   │   │   └── schema.ts
│   │   │   │   └── utils.ts
│   │   │   └── storage
│   │   │       └── index.ts
│   │   ├── interfaces
│   │   │   ├── app
│   │   │   │   ├── index.ts
│   │   │   │   └── token.ts
│   │   │   ├── controllers
│   │   │   │   ├── accommodation.ts
│   │   │   │   ├── admin.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── blog-post.ts
│   │   │   │   ├── category.ts
│   │   │   │   ├── contact.ts
│   │   │   │   ├── department.ts
│   │   │   │   ├── exception.ts
│   │   │   │   ├── faq.ts
│   │   │   │   ├── financial-aid.ts
│   │   │   │   ├── health.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── intake.ts
│   │   │   │   ├── lead.ts
│   │   │   │   ├── newsletter.ts
│   │   │   │   ├── our-team.ts
│   │   │   │   ├── program.ts
│   │   │   │   ├── scholarship.ts
│   │   │   │   ├── school.ts
│   │   │   │   └── tag.ts
│   │   │   ├── cron-jobs
│   │   │   │   ├── analytics.ts
│   │   │   │   ├── blog-post.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── intake.ts
│   │   │   ├── index.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── auth.ts
│   │   │   │   ├── email.ts
│   │   │   │   ├── events.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── logger.ts
│   │   │   │   ├── marketing.ts
│   │   │   │   ├── repository
│   │   │   │   │   └── index.ts
│   │   │   │   └── storage.ts
│   │   │   ├── middlewares
│   │   │   │   ├── auth.ts
│   │   │   │   └── index.ts
│   │   │   ├── services
│   │   │   │   ├── accommodation.ts
│   │   │   │   ├── activity-log.ts
│   │   │   │   ├── admin.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   ├── blog-post.ts
│   │   │   │   ├── category.ts
│   │   │   │   ├── department.ts
│   │   │   │   ├── email.ts
│   │   │   │   ├── faq.ts
│   │   │   │   ├── financial-aid.ts
│   │   │   │   ├── id-generator.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── inquiry.ts
│   │   │   │   ├── intake.ts
│   │   │   │   ├── our-team.ts
│   │   │   │   ├── phone-number.ts
│   │   │   │   ├── program.ts
│   │   │   │   ├── scholarship.ts
│   │   │   │   ├── school.ts
│   │   │   │   ├── storage.ts
│   │   │   │   ├── tag.ts
│   │   │   │   └── token.ts
│   │   │   └── utils
│   │   │       ├── index.ts
│   │   │       └── validation.ts
│   │   ├── lib
│   │   │   ├── exception.ts
│   │   │   └── index.ts
│   │   ├── middleware
│   │   │   ├── auth.ts
│   │   │   ├── binder
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── rate-limit.ts
│   │   │   └── request-validation
│   │   │       ├── index.ts
│   │   │       └── interface.ts
│   │   ├── publisher
│   │   │   ├── index.test.ts
│   │   │   ├── index.ts
│   │   │   └── interface.ts
│   │   ├── registry.ts
│   │   ├── routers
│   │   │   ├── api
│   │   │   │   ├── index.test.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── v1
│   │   │   │       ├── accommodation
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── admin
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── auth
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── blog-post
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── categories
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── contact
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── department
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── faq
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── financial-aids
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── index.test.ts
│   │   │   │       ├── index.ts
│   │   │   │       ├── lead
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── newsletter
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── our-team
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── program
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── scholarship
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── school
│   │   │   │       │   ├── index.test.ts
│   │   │   │       │   └── index.ts
│   │   │   │       └── tag
│   │   │   │           ├── index.test.ts
│   │   │   │           └── index.ts
│   │   │   ├── health
│   │   │   │   ├── index.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── index.test.ts
│   │   │   └── index.ts
│   │   ├── seed
│   │   │   ├── admin.ts
│   │   │   ├── department.ts
│   │   │   ├── image.ts
│   │   │   ├── index.ts
│   │   │   └── test-seed.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   └── v1
│   │   │       ├── accommodation
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── activity-log
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── admin
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── analytics
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── blog-post
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── category
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── department
│   │   │       │   ├── index.test.ts.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── email
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.tsx
│   │   │       │   └── templates
│   │   │       │       ├── admin-account-creation.tsx
│   │   │       │       ├── contact-us.tsx
│   │   │       │       ├── financial-aid.tsx
│   │   │       │       ├── footer.tsx
│   │   │       │       ├── header.tsx
│   │   │       │       ├── index.ts
│   │   │       │       ├── layout.tsx
│   │   │       │       ├── lead-submission.tsx
│   │   │       │       ├── regards.tsx
│   │   │       │       └── verify-email.tsx
│   │   │       ├── faq
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── financial-aid
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── id-generator
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── index.ts
│   │   │       ├── inquiry
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── intake
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── our-team
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── phone-number
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── program
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── scholarship
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── school
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── storage
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       ├── tag
│   │   │       │   ├── index.test.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── schema.ts
│   │   │       ├── token
│   │   │       │   ├── index.test.ts
│   │   │       │   └── index.ts
│   │   │       └── utils.ts
│   │   ├── subscribers
│   │   │   ├── index.test.ts
│   │   │   ├── index.ts
│   │   │   └── interface.ts
│   │   ├── swagger
│   │   │   ├── index.ts
│   │   │   ├── parameters
│   │   │   │   ├── admin-id.yaml
│   │   │   │   ├── id.yaml
│   │   │   │   ├── limit.yaml
│   │   │   │   ├── offset.yaml
│   │   │   │   ├── range.yaml
│   │   │   │   └── school.yaml
│   │   │   ├── paths
│   │   │   │   ├── accommodation.yaml
│   │   │   │   ├── admin.yaml
│   │   │   │   ├── auth.yaml
│   │   │   │   ├── blog.yaml
│   │   │   │   ├── category.yaml
│   │   │   │   ├── contact.yaml
│   │   │   │   ├── department.yaml
│   │   │   │   ├── faq.yaml
│   │   │   │   ├── newsletter.yaml
│   │   │   │   ├── our-team.yaml
│   │   │   │   ├── scholarship.yaml
│   │   │   │   ├── school.yaml
│   │   │   │   └── tag.yaml
│   │   │   ├── responses
│   │   │   │   └── index.yaml
│   │   │   ├── schemas
│   │   │   │   ├── accommodation.yaml
│   │   │   │   ├── admin-profile.yaml
│   │   │   │   ├── admin.yaml
│   │   │   │   ├── blog.yaml
│   │   │   │   ├── department.yaml
│   │   │   │   ├── faq.yaml
│   │   │   │   ├── inquiry.yaml
│   │   │   │   ├── intake.yaml
│   │   │   │   ├── object.yaml
│   │   │   │   ├── phone-number.yaml
│   │   │   │   ├── proficiency.yaml
│   │   │   │   ├── program.yaml
│   │   │   │   ├── responses.yaml
│   │   │   │   ├── scholarship.yaml
│   │   │   │   ├── school.yaml
│   │   │   │   ├── social.yaml
│   │   │   │   ├── team.yaml
│   │   │   │   └── timestamp.yaml
│   │   │   └── security
│   │   │       └── index.yaml
│   │   ├── types
│   │   │   ├── index.ts
│   │   │   └── storage-path.ts
│   │   ├── utils
│   │   │   ├── constants.ts
│   │   │   ├── helpers
│   │   │   │   ├── index.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── prod-service-account.json
│   │   │   ├── test-service-account.json
│   │   │   └── validation
│   │   │       ├── index.test.ts
│   │   │       └── index.ts
│   │   └── zod-schemas
│   │       ├── analytics.ts
│   │       ├── blog-post.ts
│   │       ├── category.ts
│   │       ├── general.ts
│   │       ├── id.ts
│   │       ├── index.ts
│   │       ├── intake.ts
│   │       ├── program.ts
│   │       ├── query.ts
│   │       ├── scholarship.ts
│   │       ├── school.ts
│   │       └── tag.ts
│   ├── tsconfig.dev.json
│   ├── tsconfig.json
│   └── typedoc.json
└── storage.rules
```

---

### 🧱 Tech Stack for backend

- [React](https://react.dev) - Javascript frontend framework for email templates
- [Typescript](https://www.typescriptlang.org/) - Programming language. Type safe code
- [Nodejs](https://nodejs.org/en) - Javascript runtime engine
- [Prisma ORM](https://www.prisma.io/) - Database ORM
- [Jest](https://jestjs.io/) - Testing Framework
- [Neon](https://neon.com/) - Third party Postgres Database service

---

### 📦 Prerequisites for backend

Before setting up, ensure you have:

- [Node.js](https://nodejs.org/) ≥ 20
- [pnpm](https://pnpm.io)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [A Firebase project](https://console.firebase.google.com/)
- [Docker Desktop](https://www.docker.com/)

---

### ⚙️ Setup Instructions for backend

1. **Clone the repository**

   ```bash
   https://github.com/beantech-designs/skyned.git
   cd skyned
   ```

2. **Install Dependencies**

   ```bash
   pnpm i
   ```

3. **Change into project directory**

   ```bash
   cd apps/backend/functions
   ```

4. **Download Service accounts**
   Download service account files from firebase projects renaming to: [test|prod]-service-account.json and place in functions/src/utils.

5. **Set up environment variables**

   See .env.sample for environment variables

   ````bash
   create environment variable file and add all necessary envs

   ```env
    touch .env
    touch .env.dev
    touch .env.prod
    touch .env.test

    # Constants .env.test
      DATABASE_URL=postgresql://skyned:skyned@localhost:5432/skyned
      BASE_URL=https://api-dxmhb5dscq-uc.a.run.app
      PUBLIC_DOMAIN_URL=http://localhost:3000
      SKYNED_ENVIRONMENT=test
      GOOGLE_APPLICATION_CREDENTIALS="./src/utils/test-service-account.json"

    # constants .env.dev
      SKYNED_ENVIRONMENT=dev
   ````

   leave .env empty

6. **Start local server**
   Start docker desktop

   ```bash
      pnpm run start:emulators
      pnpm run start:test:server
   ```

## 🏗️ Deployment for backend environments

1. **Login to firebase**

   ```bash
   firebase login
   ```

2. **Start docker desktop**
3. **Start postgres database on a clean slate locally on docker**

   ```bash
   pnpm run start:test:server
   ```

4. **Start Firebase Emulators**

   ```bash
   pnpm run start:emulators
   ```

5. **Deploy**

   ```bash
   pnpm run deploy:prod
   ```

   This runs all testcases, deploy to staging/dev before deploying to prod

## Other Documentations

<!-- [Entry](https://api-dxmhb5dscq-uc.a.run.app)
[Health Check](https://api-dxmhb5dscq-uc.a.run.app/health) -->

[API Documentation](https://api-dxmhb5dscq-uc.a.run.app/api-docs)
[Test Coverage](https://api-dxmhb5dscq-uc.a.run.app/coverage)
[Code Documentation](https://api-dxmhb5dscq-uc.a.run.app/code-docs)
