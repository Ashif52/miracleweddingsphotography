# Miracle Weddings Photography — Luxury Website

A high-fidelity, bespoke web application built exclusively with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)** for **Miracle Weddings Photography** (Kodambakkam, Chennai, Tamil Nadu).

---

## 1. Project Overview & Architecture

```
miracleweddingsphotography/
├── index.html              # Cinematic Homepage with Hero, Stories, Gallery, Video, Testimonials & CTA
├── about.html              # Brand Story, Creative Approach, The Heritage of Muhurtham & FAQ
├── portfolio.html          # Comprehensive Portfolio Archive with Category Filtering & Lightbox
├── wedding-films.html      # 4K Cinematic Films Showcase & Video Player with Showreel
├── contact.html            # Reservation & Booking Inquiry Desk with Direct WhatsApp Handoff
├── css/
│   └── styles.css          # Core Luxury Editorial Stylesheet (Custom Properties, Fluid Clamp, Grid)
├── js/
│   ├── main.js             # Navigation, Scroll Observer, Testimonials Carousel, Back to Top
│   ├── gallery.js          # Authentic Asset Registry, Filter State Engine, Accessible Lightbox
│   └── contact.js          # Inquiry Form Validation, Date Constraints & Demo WhatsApp Integration
├── assets/
│   ├── images/             # Web-optimized high-resolution authentic photography (Max 2200px)
│   ├── thumbnails/         # High-performance grid thumbnails (Max 800px)
│   ├── videos/             # 1080p MP4 Cinematic Showreel teaser (`showreel.mp4`)
│   └── logos/              # Razor-sharp vector SVGs (`logo-light.svg`, `logo-dark.svg`, `favicon.svg`)
├── source-images/          # Original untouched 60MP Sony Alpha RAW camera exports
└── README.md               # Documentation, Local Launch & Deployment Guide
```

---

## 2. Design System & Art Direction

* **Color Palette:**
  * **Ivory:** `#F8F5F0` (Primary editorial canvas background)
  * **Charcoal:** `#171614` (Deep luxury contrast & cinematic night sections)
  * **Champagne Gold:** `#B79A67` (Accents, monograms, borders, active indicators)
  * **Gold Light:** `#D4BF94` (Hover states & micro-badges)
  * **Warm Beige:** `#E8DFD2` (Subtle dividers & metadata text)
  * **Pure White:** `#FFFFFF` (High contrast highlights & typography)
* **Typography:**
  * **Headings (Serif):** `Cormorant Garamond` (Google Fonts: 300, 400, 500, 600, with italics)
  * **Body & Navigation (Sans):** `Montserrat` (Google Fonts: 300, 400, 500, 600)
* **Visual Philosophy:** Intentional art direction prioritizing authentic South Indian wedding traditions, sacred ceremonies (Thaali Dharanam, Maalai Maatral), and unscripted emotion over generic tech cards.

---

## 3. How to Run Locally

You can preview the website locally using any standard static web server:

### Option A: Python Built-in HTTP Server (Recommended)
```bash
# Navigate to the project root directory
cd d:/AFOCAS/miracleweddingsphotography

# Start server on port 8080
python -m http.server 8080
```
Open your browser to: **[http://localhost:8080](http://localhost:8080)**

### Option B: Node.js `npx serve`
```bash
npx -y serve .
```

### Option C: VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 4. How to Update & Replace Assets

### A. Photographs (`assets/images/` and `assets/thumbnails/`)
1. Place high-resolution photos in `source-images/`.
2. Generate optimized web versions (e.g. max 2200px wide, quality 85%) in `assets/images/` and thumbnail versions (max 800px wide) in `assets/thumbnails/`.
3. Update the metadata in `js/gallery.js` under `PORTFOLIO_ASSETS`:
   ```javascript
   {
     id: 'unique-slug',
     title: 'Story Title',
     category: 'weddings', // 'weddings' | 'bridal' | 'candid' | 'prewedding' | 'receptions'
     categoryLabel: 'Traditional Wedding',
     image: 'assets/images/your-photo.jpg',
     thumb: 'assets/thumbnails/your-photo.jpg',
     description: 'Detailed description of ritual and emotion...',
     orientation: 'landscape', // 'landscape' | 'portrait'
     couple: 'Couple Names',
     location: 'City, Venue'
   }
   ```

### B. Wedding Films & Showreels (`assets/videos/`)
* Replace `assets/videos/showreel.mp4` with an H.264/MP4 web-optimized video file (recommended: 1080p, CRF 24-26, `faststart` enabled).
* Update video poster references in `index.html` and `wedding-films.html`.
* The external video links directly connect to the studio's verified YouTube channel: `https://www.youtube.com/@MiracleWeddingsphotography`.

---

## 5. Verified Business Contact Information

* **Brand:** Miracle Weddings Photography
* **Phone / WhatsApp:** `+91 90250 52520`
* **Email:** `miracleweddings95@gmail.com`
* **Studio Location:** Kodambakkam, Chennai, Tamil Nadu, India — 600024
* **Instagram:** [@miracleweddingsphotography](https://www.instagram.com/miracleweddingsphotography/)
* **YouTube:** [@MiracleWeddingsphotography](https://www.youtube.com/@MiracleWeddingsphotography)

---

## 6. Deployment Guide

Because this project is built entirely on native web standards (zero build steps, zero transpilation, pure HTML5/CSS3/JS):

### Deploy to Netlify / Vercel:
* Simply link the repository or drag and drop the project folder directly to Netlify Drop or Vercel.
* **Build command:** (leave empty)
* **Publish directory:** `.`

### Deploy to GitHub Pages:
* Go to repository **Settings** &rarr; **Pages**.
* Select `master` (or `main`) branch and root directory `/`.
* Save and access your live URL instantly.
