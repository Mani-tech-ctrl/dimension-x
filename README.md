# Dimension-X 🚀

Dimension-X is an AI-inspired 2D → 3D reconstruction prototype that converts a single image into an interactive 3D preview using Next.js and Three.js.

This project focuses on **frontend architecture**, **real-time UX**, and **asynchronous AI pipelines**, simulating how real image-to-3D systems work.

---

## ✨ Features

- Upload any JPG/PNG image
- Simulated AI reconstruction pipeline using Server-Sent Events (SSE)
- Real-time progress stages (background removal, classification, reconstruction, texturing)
- Interactive 3D viewer (rotate / zoom / pan)
- Lighting toggle (Studio / Ambient)
- Export generated model (.glb)
- Mobile responsive UI

---

## 🛠 Tech Stack

- Next.js (App Router)
- React
- TypeScript
- React Three Fiber / Drei (Three.js)
- Tailwind CSS
- Server-Sent Events (SSE)

---

## 🧠 Architecture Overview

Frontend communicates with a Next.js API route that simulates a multi-stage AI pipeline:

1. Background removal (Rembg simulation)
2. Object classification
3. Multi-view reconstruction (Zero-1-to-3 simulation)
4. Texture consistency check

Each stage streams progress updates to the UI using SSE.

The generated model is then rendered using Three.js with OrbitControls and export support.

---

## ⚠️ Note

This project currently uses a mock backend to demonstrate UX and system design.

Real AI models (TripoSR / Zero-1-to-3 / Meshy) can be integrated later by replacing the API logic.

---

## ▶ Run Locally

```bash
npm install
npm run dev