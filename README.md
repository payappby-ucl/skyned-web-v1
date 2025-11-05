# Skyned Consults Cooperation

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
