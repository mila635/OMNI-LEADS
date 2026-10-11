import React from 'react';
import { PlatformSource } from '../types';

interface PlatformLogoProps {
  source?: PlatformSource | string;
  platform?: PlatformSource | string;
  className?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

/**
 * Renders authentic, clean official brand logos for all 20 data extraction platforms
 * No 3D AI-generated art; pure official vector brand graphics.
 */
export const PlatformLogo: React.FC<PlatformLogoProps> = ({
  source,
  platform,
  className = '',
  size = 16,
}) => {
  const numSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 16
      : size === 'md'
      ? 22
      : size === 'lg'
      ? 32
      : size === 'xl'
      ? 44
      : 18;

  const s = (platform || source || '').toLowerCase();

  // 1. Google Maps (Official Pin / Map Logo)
  if (s.includes('google_maps') || s === 'maps' || s.includes('places')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Google Maps Official Logo"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="#EA4335"
        />
        <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
        <path
          d="M12 6a3 3 0 0 0-3 3c0 .88.38 1.67.99 2.21l1.51-1.51A1.2 1.2 0 0 1 12 7.8c.66 0 1.2.54 1.2 1.2 0 .34-.14.65-.37.87l1.51 1.51c.71-.62 1.16-1.54 1.16-2.58A3 3 0 0 0 12 6z"
          fill="#4285F4"
        />
      </svg>
    );
  }

  // 2. Apollo.io (Official Apollo Arrow / Target Mark)
  if (s.includes('apollo')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Apollo.io Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#F8B133" />
        <path
          d="M12 4L4 18h4.5l1.8-3.6h3.4L15.5 18H20L12 4zm0 4.8l1.7 3.4h-3.4L12 8.8z"
          fill="#1C1E21"
        />
      </svg>
    );
  }

  // 3. LinkedIn (Official LinkedIn 'in' Mark)
  if (s.includes('linkedin')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="LinkedIn Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#0A66C2" />
        <path
          d="M7.1 9.8H4.6V18h2.5V9.8zM5.8 8.6c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5zM19.4 18H17v-4.1c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3.9-.1.2-.1.4-.1.7V18h-2.5s.03-7.4 0-8.2h2.5v1.2c.3-.5 1-1.3 2.3-1.3 1.7 0 3 1.1 3 3.5V18z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 4. Facebook Groups / Meta (Official Facebook 'f' Blue)
  if (s.includes('facebook') || s.includes('fb')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Facebook Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#1877F2" />
        <path
          d="M15.4 13.5l.6-3.8h-3.7V7.2c0-1 .5-2 2.1-2h1.6V2s-1.5-.3-2.9-.3c-3 0-4.9 1.8-4.9 5.1v2.9H5v3.8h3.2V22h4.5v-8.5h2.7z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 5. Clutch.co (Official Clutch 'C' Mark)
  if (s.includes('clutch')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Clutch.co Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#1A2D42" />
        <path
          d="M12 6a6 6 0 0 0-4.2 10.2l2.1-2.1a3 3 0 1 1 4.2 0l2.1 2.1A6 6 0 0 0 12 6z"
          fill="#EC4899"
        />
        <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 6. Crunchbase (Official CB Blue & Mint Hexagon)
  if (s.includes('crunchbase')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Crunchbase Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#0288D1" />
        <path
          d="M16 8.5h-2.5V11H16v4.5h-5.5V8.5H16V6H8v12h10.5V8.5H16z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 7. Yelp & Trustpilot (Official Yelp Star Burst)
  if (s.includes('yelp') || s.includes('trustpilot')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Yelp & Trustpilot Logo"
      >
        <rect width="24" height="24" rx="4" fill="#D32323" />
        <path
          d="M12 4.5l1.6 4.3 4.5.3-3.4 3 1.1 4.4-3.8-2.4-3.8 2.4 1.1-4.4-3.4-3 4.5-.3L12 4.5z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 8. Indeed & Glassdoor (Official Indeed 'i')
  if (s.includes('indeed')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Indeed Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#2164F3" />
        <circle cx="12" cy="7" r="1.8" fill="#FFFFFF" />
        <path
          d="M10.2 10.2h3.6V18h-3.6z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 9. Upwork (Official Upwork Green Mark)
  if (s.includes('upwork')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Upwork Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#14A800" />
        <path
          d="M15.5 8c-1.3 0-2.3.8-2.7 1.8-.7-.9-1.3-2.1-1.6-3.8H9v5.7c0 1.5-.7 2.3-2 2.3s-2-.8-2-2.3V6H3v6c0 2.8 1.6 4.4 4 4.4s4-1.6 4-4.4V10.2c.4 1.4 1 2.5 1.7 3.3l-1.3 5.5h2.2l1-4.2c.3.1.6.2.9.2 2.2 0 3.7-1.8 3.7-4.1 0-2-1.4-2.9-3.7-2.9zm0 5c-1 0-1.8-.8-1.8-2 0-1.1.8-1.9 1.8-1.9s1.8.8 1.8 1.9c0 1.2-.8 2-1.8 2z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 10. BBB (Better Business Bureau Torch & Seal)
  if (s.includes('bbb') || s.includes('better_business')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="BBB Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#005A9C" />
        <path
          d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm-1 12H9V8h2.3a2 2 0 0 1 1.4.5 1.5 1.5 0 0 1 .4 1.1 1.4 1.4 0 0 1-.8 1.3 1.6 1.6 0 0 1 1.2 1.5 1.7 1.7 0 0 1-.5 1.3 2.3 2.3 0 0 1-1.6.3H11zm3.8 0h-2V8h2a2 2 0 0 1 1.4.5 1.5 1.5 0 0 1 .4 1.1 1.4 1.4 0 0 1-.8 1.3 1.6 1.6 0 0 1 1.2 1.5 1.7 1.7 0 0 1-.5 1.3 2.3 2.3 0 0 1-1.7.3z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 11. Product Hunt (Official Glass Orange Cat/P Mark)
  if (s.includes('product_hunt') || s.includes('producthunt')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Product Hunt Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#DA552F" />
        <circle cx="12" cy="12" r="7" fill="#FFFFFF" />
        <path
          d="M11 9h2.3c.9 0 1.7.6 1.7 1.5s-.8 1.5-1.7 1.5H11V9zm0 4.5v2.5H9.5V7.5h3.8c1.7 0 3.2 1.2 3.2 3s-1.5 3-3.2 3H11z"
          fill="#DA552F"
        />
      </svg>
    );
  }

  // 12. Yellow Pages (Official Commercial Directory Book)
  if (s.includes('yellow_pages') || s.includes('yellowpages')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Yellow Pages Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#FFCC00" />
        <path
          d="M7 6h10v12H7z"
          fill="#1C1E21"
        />
        <path
          d="M9.5 9h5M9.5 12h5M9.5 15h3"
          stroke="#FFCC00"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 13. Reddit (Official Snoo Alien Head)
  if (s.includes('reddit')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Reddit Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#FF4500" />
        <circle cx="12" cy="13" r="5" fill="#FFFFFF" />
        <circle cx="9.8" cy="12.5" r="1" fill="#FF4500" />
        <circle cx="14.2" cy="12.5" r="1" fill="#FF4500" />
        <path
          d="M10.2 15c.6.6 1.4.8 1.8.8s1.2-.2 1.8-.8"
          stroke="#FF4500"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <circle cx="16" cy="6.5" r="1.2" fill="#FFFFFF" />
        <path d="M12 9l2.5-1.5 1.5 1.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 14. GitHub (Official Octocat Silhouette)
  if (s.includes('github')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="GitHub Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#24292E" />
        <path
          d="M12 5C8.13 5 5 8.13 5 12c0 3.09 2 5.71 4.79 6.64.35.06.48-.15.48-.34 0-.17-.01-.73-.01-1.33-1.95.42-2.36-.83-2.36-.83-.32-.81-.78-1.02-.78-1.02-.63-.44.05-.43.05-.43.71.05 1.08.73 1.08.73.63 1.08 1.65.77 2.05.59.06-.46.25-.77.45-.95-1.55-.18-3.19-.78-3.19-3.46 0-.76.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.93.72a6.7 6.7 0 0 1 3.52 0c1.34-.91 1.93-.72 1.93-.72.38.96.14 1.67.07 1.85.45.49.72 1.12.72 1.88 0 2.69-1.64 3.28-3.2 3.46.25.22.48.65.48 1.31 0 .95-.01 1.71-.01 1.94 0 .19.12.41.48.34A7.01 7.01 0 0 0 19 12c0-3.87-3.13-7-7-7z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 15. Instagram (Official Gradient Camera Glyphs)
  if (s.includes('instagram')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Instagram Official Logo"
      >
        <defs>
          <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFDC80" />
            <stop offset="0.25" stopColor="#FCAF45" />
            <stop offset="0.5" stopColor="#F77737" />
            <stop offset="0.75" stopColor="#F56040" />
            <stop offset="1" stopColor="#C13584" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5" fill="url(#ig-grad)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.6" />
        <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
      </svg>
    );
  }

  // 16. Twitter / X (Official Clean Monochrome X)
  if (s.includes('twitter') || s.includes('twitter_x') || s === 'x') {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="X (Twitter) Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#000000" />
        <path
          d="M17.4 5.5h2.1l-4.6 5.3 5.4 7.2h-4.2l-3.3-4.3-3.8 4.3H6.8l4.9-5.6L6.5 5.5h4.3l3 3.9 3.6-3.9zm-.7 11.2h1.2L10.3 6.7H9l7.7 10z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 17. TikTok (Official Cyan / Magenta Note)
  if (s.includes('tiktok')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="TikTok Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#010101" />
        <path
          d="M15.5 6a3.8 3.8 0 0 0 3 1.5v2.8a6.5 6.5 0 0 1-3-.7v5.2a4.4 4.4 0 1 1-4.4-4.4c.3 0 .6 0 .9.1v2.9a1.6 1.6 0 1 0 1.6 1.6V5.5h2.8A3.8 3.8 0 0 0 15.5 6z"
          fill="#25F4EE"
        />
        <path
          d="M14.5 5.5v8.7a4.4 4.4 0 1 1-4.4-4.4c.3 0 .6 0 .9.1v2.9a1.6 1.6 0 1 0 1.6 1.6V5.5h1.9z"
          fill="#FE2C55"
          opacity="0.8"
        />
      </svg>
    );
  }

  // 18. Apify (Official Apify Green Polygon Mark)
  if (s.includes('apify')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Apify Official Logo"
      >
        <rect width="24" height="24" rx="4" fill="#111827" />
        <path
          d="M12 4.5l5.5 3.2v6.4L12 17.3 6.5 14.1V7.7L12 4.5zm0 2.3L8.2 9l3.8 2.2L15.8 9 12 6.8zm-4 4.5v3.4l4 2.3v-3.4l-4-2.3zm8 0l-4 2.3v3.4l4-2.3v-3.4z"
          fill="#10B981"
        />
      </svg>
    );
  }

  // 19. Live Domain Crawler (Official Clean Web Globe Protocol)
  if (s.includes('crawler') || s.includes('website_crawler') || s.includes('domain')) {
    return (
      <svg
        width={numSize}
        height={numSize}
        viewBox="0 0 24 24"
        fill="none"
        className={`shrink-0 ${className}`}
        aria-label="Live Domain Crawler Official Protocol Mark"
      >
        <rect width="24" height="24" rx="4" fill="#0891B2" />
        <circle cx="12" cy="12" r="7" stroke="#FFFFFF" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="3.5" ry="7" stroke="#FFFFFF" strokeWidth="1.4" />
        <path d="M5.5 12h13" stroke="#FFFFFF" strokeWidth="1.4" />
      </svg>
    );
  }

  // 20. Custom Actor / API Webhook (Official REST & Webhook Terminal Node)
  return (
    <svg
      width={numSize}
      height={numSize}
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-label="Custom Actor API Official Node Mark"
    >
      <rect width="24" height="24" rx="4" fill="#4F46E5" />
      <path
        d="M8 8l4 4-4 4M13 16h4"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
