# CAMZON Website

A modern React + Vite website for CAMZON bathware, faucets, sanitaryware, and luxury bathroom solutions.

## Run locally

Prerequisites: Node.js

1. Install dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`
3. Open the app in your browser at `http://localhost:3000`

## Build for production

`npm run build`

## Product data

Product records are maintained in category-specific JSON files under [`src/data/collections`](./src/data/collections). The catalog sidebar groups those categories into GCC Lineups, Indian Lineups, Divertors & Spout, Sensor Faucets, Exclusive, Overhead Showers, and Accessories. Add or remove a product object in the matching category file; set its `category` field to the category ID in `src/data/products.ts`. Each record includes its product details, descriptions, images, specifications, and reviews.
