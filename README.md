# NextLevel Food 🍔

NextLevel Food is a modern web application built using **Next.js 14 (App Router)**. It provides a platform for food enthusiasts to discover new recipes, share their favorite dishes with the global community, and connect with other food lovers.

---

## 🚀 Features

- **Dynamic Hero Slideshow**: A beautiful, automated image slideshow showcasing delicious cuisines.
- **Meal Directory**: Browse through an interactive list of recipes shared by community members.
- **Detailed Recipe Pages**: Dynamic routing retrieves single-meal recipes along with ingredients and step-by-step instructions.
- **Share Recipes**: Anyone can upload their own recipe details, including an image, a short summary, instructions, and creator information.
- **SQLite Database Integration**: Persistent storage of recipes using `better-sqlite3`.
- **Next.js Server Actions & Optimizations**: Native performance optimizations for server-side operations, form submissions, and image/metadata caching.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Database**: [SQLite](https://www.sqlite.org/) (via `better-sqlite3`)
- **Styling**: Vanilla CSS Modules
- **Validation & Security**: `slugify` (for SEO-friendly URLs) and `xss` (for cleaning HTML content)

---

## 💻 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or later is recommended).

### 1. Clone & Navigate to Repository

```bash
git clone <repository-url>
cd foodies-nextjs-app
```

### 2. Install Dependencies

Install all required packages from `package.json`:

```bash
npm install
```

### 3. Initialize the Database

Populate your SQLite database with dummy meals to get started:

```bash
node initdb.js
```
This script creates a local `meals.db` SQLite database in the root folder and seeding it with placeholder recipes.

### 4. Run the Development Server

Start the Next.js local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the app!

---

## 🎓 Key Next.js Concepts Used

This project serves as a showcase for several core Next.js features and paradigms:

1. **App Router & Routing Conventions**
   - **Nested Routes & Layouts**: Uses folder-based routing structure with custom layouts (`layout.js`) to share headers/footers across routes, and `page.js` to render specific route content.
   - **Dynamic Segments**: Implements `[mealSlug]` dynamic folders to retrieve custom parameters from URLs.
   - **Custom Error & 404 Handlers**: Leverages custom `error.js` Client Component boundaries and localized `not-found.js` pages to gracefully manage runtime and missing resource errors.

2. **React Server Components (RSC) vs. Client Components**
   - **RSC by Default**: Main pages (like `/meals`) run purely on the server, permitting secure, direct database querying (`meals.db`) without exposed REST APIs.
   - **Client Boundaries**: Sections requiring user interaction or client state (like the interactive image picker and stateful submission forms) opt in via `'use client'`.

3. **React & Next.js Hooks**
   - **`usePathname`** (from `next/navigation`): Used in `<NavLink>` to check the current URL path and highlight the active link in the navigation header.
   - **`useFormState`** (from `react-dom`): Used in `<ShareMealPage>` to hook up form actions to the `shareMeal` Server Action, enabling server-side validation error reporting.
   - **`useFormStatus`** (from `react-dom`): Used in `<MealsFormSubmit>` to check the submission status of the parent form to disable the button and show a "Submitting..." spinner.
   - **React Core Hooks**: Power custom interactive components, including **`useState`** / **`useEffect`** for the automated `<ImageSlideshow>`, and **`useRef`** / **`useState`** for previewing images in `<ImagePicker>`.

4. **Data Fetching, Loading & Streaming**
   - **Streaming with Suspense**: Wraps database-driven async components (like `<Meals />`) in React `<Suspense>` loaders, allowing static layout shells to render instantly while slow-loading data streams in.

5. **Server Actions (`"use server"`)**
   - Employs native Server Actions (`shareMeal` in `lib/actions.js`) bound directly to forms. This enables submitting data, validating inputs, saving to SQLite, and redirecting clients directly from the server code.

6. **Caching & On-Demand Revalidation**
   - Utilizes `revalidatePath("/meals")` to purge cached static/dynamic meals listings, ensuring newly uploaded recipes are visible immediately without manual cache TTL expirations.

7. **SEO & Asset Optimization**
   - **Next.js `<Image />`**: Uses standard optimized components to handle responsive layouts (`fill`) and image lazy-loading.
   - **Metadata API**: Utilizes static metadata objects alongside dynamic `generateMetadata({ params })` calls to dynamically customize `<title>` and `<meta>` tags for SEO.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router folders (pages, layouts, and routing)
│   ├── community/        # Community page
│   ├── meals/            # Meals page and [mealSlug] dynamic page
│   ├── layout.js         # Root layout configuration
│   └── page.js           # Homepage layout and logic
├── components/           # Reusable React components (header, image slide, grid)
├── lib/                  # Server Actions and database utility files
├── public/               # Static assets (images, icons, etc.)
├── initdb.js             # Initial database setup script
├── meals.db              # SQLite Database file (generated after initdb.js)
├── package.json          # Dependency and script definitions
└── README.md             # Project documentation (this file)
```
