# ShopSphere

ShopSphere is a modern e-commerce storefront built with React and Vite. It provides a polished shopping experience with product discovery, dynamic filtering, cart management, wishlist interactions, and a responsive layout designed for desktop and mobile users.

## Overview

This project simulates a premium online store experience with a clean UI, featured product sections, category-based browsing, and interactive purchase flows. It is a front-end demo focused on user experience and storefront design rather than backend or payment processing.

## Features

- Responsive storefront layout for desktop, tablet, and mobile
- Hero section and featured product presentation
- Search and filter capabilities
- Category browsing and sorting options
- Product cards with pricing, ratings, and action buttons
- Wishlist toggle support
- Shopping cart with add/remove controls and quantity updates
- Cart totals, shipping threshold messaging, and checkout summary
- Demo forms for login, signup, contact, and newsletter sign-up
- Local state persistence with browser `localStorage`

## Tech Stack

- React 19
- Vite
- JavaScript
- CSS
- Lucide React icons

## Project Structure

```text
E-commerce-Website/
├── dist/                  # Production build output
├── Images/                # Store image assets
├── src/
│   ├── main.jsx           # App logic and UI components
│   └── styles.css         # Styling and layout
├── index.html             # Vite entry page
├── package.json           # Project scripts and dependencies
├── package-lock.json      # Lock file for dependencies
├── README.md              # Project documentation
└── node_modules/          # Installed dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
```

## Demo Notes

This project is a front-end storefront prototype. It does not include a real backend, authentication system, or payment integration. Product and cart data are managed in the browser for demo purposes.

## Author

Developed as a responsive e-commerce web application prototype for demonstration and learning purposes.

## License

This project is provided for educational and demonstration purposes.
