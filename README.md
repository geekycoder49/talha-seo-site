# Talha Bajwa – SEO Portfolio (Static Site)

A simple, modern, **static portfolio website** for an **On-Page SEO Specialist & SEO Content Writer**.  
Built with **HTML, CSS, and vanilla JavaScript** only – no build tools or backend required.

> All copy, case studies, and links are **placeholder content**. Replace them with your real details before going live.

---

## Files

- `index.html` – Main single-page site with all sections and SEO markup
- `style.css` – Styling, layout, responsive design, and light/dark theme
- `script.js` – Interactions (nav, theme toggle, filters, FAQ, small animations)
- `assets/ffffff.png` – Hero/profile image (you must add this file)

Create the `assets` folder in the project root and place your image:

```text
talha-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── ffffff.png   <-- copy your image here (from `C:\Users\DELL\Downloads\Extras\Pics\ffffff.png`)
```

Update any image paths or alt text in `index.html` as needed.

---

## Features

- **Clean, modern layout** with plenty of white space and subtle gradients
- **Sticky top navigation** with anchor links and smooth scrolling
- **Dark / light mode toggle** (stored in `localStorage`)
- **Sections included**:
  - Hero
  - Services
  - Case Studies
  - Portfolio / Writing Samples
  - Testimonials
  - Tools Used
  - About
  - Blog (dummy posts)
  - Free Mini Audit form
  - Contact form + email + WhatsApp + Calendly placeholder
  - FAQ
- **Lead & conversion features**:
  - Repeated CTAs (Book Consultation, Request Quote, Free Audit)
  - `Free Mini Audit` form (Netlify Forms-ready)
  - `Contact` form (Netlify Forms-ready)
- **SEO details**:
  - Semantic HTML and logical heading structure
  - Basic meta tags + Open Graph tags
  - JSON-LD schema for `Person` and `FAQPage`
  - Internal links between services, case studies, portfolio, and blog

---

## Running locally

No build setup is required.

1. Clone or download this repository into a folder, e.g. `C:\laragon\www\talha`.
2. Ensure the structure matches the tree above and that `assets/ffffff.png` exists.
3. Open `index.html` directly in your browser (double-click) **or** serve it via a simple static server (e.g., VS Code Live Server).

---

## Deploying to Netlify via GitHub

1. **Create a GitHub repository**
   - Go to GitHub and create a new repository (public or private).
   - Initialize it empty or with a README.

2. **Push this project to GitHub**
   In your terminal (from the project root):

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Talha SEO portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. **Create a new site on Netlify**
   - Sign in to [Netlify](https://app.netlify.com/).
   - Click **“Add new site” → “Import an existing project”**.
   - Choose **GitHub**, and authorize if needed.
   - Select your repository.

4. **Configure build settings**
   - Since this is a plain static site:
     - **Build command**: leave **empty**
     - **Publish directory**: `/` (root) or simply leave the default if it’s the repo root
   - Click **Deploy site**.

5. **Wait for the deploy**
   - Netlify will build (no build step, just copies files) and assign a URL like `https://your-site-name.netlify.app/`.
   - You can later attach a custom domain from Netlify’s domain settings.

---

## Netlify Forms

This project uses **Netlify Forms** attributes in HTML only; no extra JavaScript or backend is required.

Two forms are wired:

- `Free Mini Audit` form (`name="free-mini-audit"`)
- `Contact` form (`name="contact"`)

Netlify automatically parses these when you deploy:

- You can view submissions in the **Forms** tab of your Netlify site.
- For extra spam protection, you can later add `netlify-honeypot` attributes or reCAPTCHA as needed.

---

## Customizing

1. **Replace placeholder copy**
   - Edit all text in `index.html`:
     - Hero heading and subheading
     - Services descriptions
     - Case studies metrics and narratives
     - Portfolio items, Blog posts, Testimonials, FAQ answers, etc.

2. **Update contact details**
   - Update the `mailto:` email.
   - Replace the WhatsApp link (`https://wa.me/000000000000`) with your real number.
   - Replace the Calendly link with your actual scheduling URL.

3. **SEO tuning**
   - Update `<title>`, `<meta name="description">`, and Open Graph tags in `<head>`.
   - Update the URLs and social profiles inside the `Person` JSON-LD schema.

4. **Theme & colors**
   - Open `style.css` and adjust the CSS variables in `:root` and `.theme-dark`.
   - You can tweak radiuses, shadows, and font family from the top of the file as well.

---

## Notes

- No node modules, bundlers, or build tools are used – this is a **pure static** site.
- All JavaScript is client-side only; forms rely on **Netlify Forms** for handling submissions.
- The design is intentionally minimal and easy to modify without touching complex tooling.

