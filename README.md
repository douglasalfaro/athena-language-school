<div align="center">

<img src="assets/hero-classroom-students.jpg" alt="Athena Language School" width="100%" style="max-height:320px;object-fit:cover;border-radius:12px;">

# 雅喜娜美語補習班 · Athena Language School

**讓孩子愛上說 English！** — a warm, fun, and effective English-education website for young learners in Taiwan.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)
![Bilingual](https://img.shields.io/badge/Bilingual-中文%20%2F%20English-success)
![License](https://img.shields.io/badge/License-Proprietary-lightgrey)

</div>

---

## ✨ Overview

Athena Language School (雅喜娜美語補習班) is a children's English cram school in Taiwan. This repository contains its **marketing website** — a fast, responsive, bilingual (Traditional Chinese / English) static site designed to introduce the school's courses and teachers, build trust with parents, and drive **free-trial-class** sign-ups.

The site is hand-built with vanilla HTML, CSS, and JavaScript (no framework, no build step) and is deployed on **Netlify**, using Netlify Forms to capture trial-class enquiries.

---

## 🚀 Features

- **Bilingual, parent-focused content** — Traditional Chinese with English highlights, written for Taiwanese families.
- **Course showcase** — programs presented for different age groups.
- **Teacher profiles** — introductions to the school's teaching team.
- **Free-trial sign-up** — a Netlify-powered enquiry form with a dedicated `success.html` confirmation page.
- **Interactive grammar game** — a lightweight `grammar-game.html` mini-game to engage students.
- **LINE integration** — direct contact via LINE, the primary messaging channel in Taiwan.
- **Responsive design** — built to read well on phones, where most parents browse.

---

## 🛠 Tech Stack

| Area | Technology |
| --- | --- |
| **Markup & styling** | HTML5, CSS3 |
| **Interactivity** | Vanilla JavaScript |
| **Forms** | Netlify Forms |
| **Hosting / Deploy** | Netlify |

---

## 📂 Project Structure

```
.
├── index.html                # Main landing page
├── grammar-game.html         # Interactive grammar mini-game
├── success.html              # Form-submission confirmation page
├── assets/                   # Images (hero photos, teacher portraits, LINE QR)
└── athena-netlify-site/      # Netlify deploy bundle (site copy served in production)
```

> The site is static — open the HTML files directly or serve the folder locally; no build step or environment variables are required.

---

## 💻 Run Locally

Because the site is fully static, you can preview it with any static file server:

```bash
git clone https://github.com/douglasalfaro/athena-language-school.git
cd athena-language-school

# Option A: open index.html directly in your browser
# Option B: serve it locally
python -m http.server 8000
# then visit http://localhost:8000
```

---

## 🚢 Deployment

The site is deployed on **Netlify**. Pushing to the default branch publishes the latest version, and the trial-class form is handled by Netlify Forms (submissions redirect to `success.html`).

---

## 🔭 Future Improvements

- Consolidate image assets and remove unused source photos to slim the repo.
- Add Open Graph / structured-data metadata for richer link previews and local SEO.
- Add basic analytics to measure trial-sign-up conversion.
- Optimize and lazy-load images for faster mobile loading.

---

## 👤 About the Developer

**Douglas Alfaro** is a full-stack developer with experience building practical business
solutions using modern web technologies, automation, APIs, and cloud-based tools. His work
focuses on creating useful, scalable applications for real-world business problems.

- GitHub: [@douglasalfaro](https://github.com/douglasalfaro)

---

## 📄 License

© Athena Language School / Douglas Alfaro. All rights reserved. See [LICENSE](LICENSE).

The website content, branding, and photographs are proprietary and may not be reused without permission.
