🎮 PokeApp — API-Driven Pokémon Data Platform

PokeApp is a modern web application built with Vite that provides real-time access to structured Pokémon game data such as base stats, moves, abilities, evolution chains, and type effectiveness.
The application consumes external REST API endpoints and dynamically renders an interactive interface to support in-game decision-making.

🌐 Live Demo

https://pokeapp-pi.vercel.app/

🧱 Tech Stack

Vite
JavaScript (ES Modules)
Progressive Web App (PWA)
Service Workers
REST API Integration
Fetch API (Async/Await)
JSON Data Processing
Deployment via Vercel

🔗 Data Source

All data is retrieved in real time from:
PokéAPI

⚙️ Features

Pokémon base stats lookup
Move data explorer
Ability details
Evolution chain display
Type effectiveness reference
Dynamic search functionality
Multi-tab structured UI

📱 Progressive Web App (PWA)

PokeApp is built as a Progressive Web Application, allowing users to install it directly on their mobile devices without requiring an app store.
PWA Capabilities
Installable on Android and iOS devices
App-like user experience
Home screen launch support
Fast load performance

📲 How to Install (Mobile)

Users can install the application directly from the browser:

Android (Chrome)
Open the application in Chrome
Tap the browser menu
Select "Add to Home Screen"

iOS (Safari)
Open the application in Safari
Tap the Share button
Select "Add to Home Screen"

Once installed, the application behaves like a native mobile app.

🧠 Technical Highlights

Modular project structure using Vite
Asynchronous API requests with error handling
Dynamic DOM rendering based on API responses
Multi-endpoint REST consumption
Production-ready cloud deployment
Progressive Web App architecture  
Service worker caching strategy  
Installable mobile-first deployment

🏗️ Local Development

To run locally:
npm install
npm run dev

Build for production:
npm run build

🎯 Purpose

This project was developed as a personal initiative to explore API-driven application architecture and improve front-end data consumption patterns using real-time external data.

🚀 Deployment

The application is deployed in production via:
Vercel
