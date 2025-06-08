# CLAUDE.md - Template

This file provides guidance to Claude Code (claude.ai/code) when working with this event website template.

## Template Overview

This is a template for Japanese food event websites. The template is designed for easy customization and reuse across different events and locations.

## Key Files

- `index.html` - Main HTML structure with embedded event configuration data
- `script.js` - JavaScript for dynamic content generation and interactivity  
- `style.css` - Complete CSS styling with responsive design
- `CLAUDE.md` - This development guidance file

## Customization Process

### 1. Event Configuration
Edit the `EVENT_CONFIG` object at the top of `index.html` (lines 15-94) to customize:
- Event details (title, date, description)
- Chef profiles and images
- Course menu items
- Drink categories and pricing
- Venue information

### 2. Styling Adjustments
Modify `style.css` for theme customization:
- Color scheme (CSS custom properties in `:root`)
- Fonts and typography
- Layout adjustments

### 3. Functionality Changes
Update `script.js` for behavioral modifications:
- Dynamic content generation functions
- Interactive elements
- Event handlers

## Template Features

### Data-Driven Content System
All event content is centralized in the `EVENT_CONFIG` object, allowing easy updates without touching HTML structure.

### Dynamic Content Generation
JavaScript functions automatically populate HTML sections from configuration data:
- `generateChefProfiles()` - Creates chef cards
- `generateCourseDetails()` - Builds course menu sections
- `generateDrinkMenu()` - Generates categorized drink listings
- `updatePricing()` - Updates pricing information
- `updateVenueInfo()` - Populates venue details and map

### Interactive Elements
- Real-time countdown timer to event date
- Responsive hamburger navigation menu
- Modal reservation form
- Smooth scrolling navigation

### Responsive Design
- Mobile-first approach
- Japanese text support with Noto Sans JP font
- CSS custom properties for consistent theming

## Usage Instructions

1. Copy this template to your event directory: `[place]/[year]/[event_name]/`
2. Edit `EVENT_CONFIG` in `index.html` with your event details
3. Customize styling in `style.css` if needed
4. Test all functionality
5. Deploy to Netlify with publish directory set to your event folder

## Development Notes

- No build process required - direct file editing
- All external dependencies loaded via CDN
- Maintains accessibility with semantic HTML
- Optimized for performance and SEO