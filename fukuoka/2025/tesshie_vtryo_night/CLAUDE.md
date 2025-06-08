# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a single-page Japanese food event website for "Tesshie & VTRyo Night!" - a special dinner event featuring two chefs. The project consists of three main files:

- `index.html` - Main HTML structure with embedded event configuration data
- `script.js` - JavaScript for dynamic content generation and interactivity
- `style.css` - Complete CSS styling with responsive design

## Key Features

### Data-Driven Content System
All event content is centralized in the `EVENT_CONFIG` object at the top of `index.html` (lines 15-94). This allows easy updates to:
- Event details (title, date, description)
- Chef profiles and images
- Course menu items
- Drink categories and pricing
- Venue information

### Dynamic Content Generation
JavaScript functions in `script.js` dynamically populate HTML sections:
- `generateChefProfiles()` - Creates chef cards from config data
- `generateCourseDetails()` - Builds course menu sections
- `generateDrinkMenu()` - Generates categorized drink listings
- `updatePricing()` - Updates pricing information
- `updateVenueInfo()` - Populates venue details and map

### Interactive Elements
- Real-time countdown timer to event date
- Responsive hamburger navigation menu
- Modal reservation form
- Smooth scrolling navigation

## Content Updates

To modify event content, edit the `EVENT_CONFIG` object in `index.html`:
- Event information: `EVENT_CONFIG.event`
- Chef details: `EVENT_CONFIG.chefs` array
- Menu items: `EVENT_CONFIG.courses` array
- Beverages: `EVENT_CONFIG.drinks` array
- Pricing: `EVENT_CONFIG.pricing`
- Location: `EVENT_CONFIG.venue`

## Development Notes

- No build process required - direct file editing
- All external dependencies loaded via CDN (Font Awesome, Google Fonts)
- Responsive design with mobile-first approach
- CSS uses custom properties for consistent theming
- Japanese text support with Noto Sans JP font