# INFRA Website

Digital transaction infrastructure for the Dirham economy.

## Tech Stack (Latest Versions)

- **Framework**: Next.js 16.1.1 with App Router
- **Runtime**: React 19.2.3
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Forms**: React Hook Form 7.70.0 with Zod 4.3.5 validation
- **Animations**: Framer Motion 12.24.8
- **Icons**: Lucide React 0.562.0
- **Analytics**: Vercel Analytics 1.6.1 (free tier)
- **TypeScript**: 5.9.3
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note**: The project files are now in the root directory (not in a subdirectory).

## Deployment

### Vercel Deployment

**Pre-deployment Checklist:**
- [ ] Website tested locally on http://localhost:3000
- [ ] All email links working (open user's email client)
- [ ] Responsive design checked on mobile/desktop
- [ ] All sections loading properly

**Deployment Steps:**
1. Push this code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard (Project Settings → Environment Variables)
4. Vercel will automatically detect Next.js and deploy
5. Analytics will be automatically enabled via Vercel Analytics


### Contact System

Simple email links throughout the site that open the user's email client with pre-filled subjects and messages.

**Email Address**: info@infraworld.com
**No setup required** - works immediately on any hosting platform.

## Content Management

This is currently a static website. For content updates:

1. Edit the component files in `src/components/sections/`
2. Rebuild and redeploy

## Features

- ✅ Single-page landing with smooth scrolling navigation
- ✅ Responsive design (mobile-first)
- ✅ Institutional/minimal styling
- ✅ Contact form with validation
- ✅ Vercel Analytics integration
- ✅ SEO optimized
- ✅ Fast loading with Next.js optimization

## Contact System

**Simple & Effective**: All CTA buttons now link to a dedicated contact section that displays the email address and encourages visitors to reach out.

**Benefits:**
- ✅ No complex setup required
- ✅ Works immediately on any hosting platform
- ✅ Clear call-to-action with contact information
- ✅ Professional presentation
- ✅ Easy to update contact details

**Email Address**: info@infraworld.com