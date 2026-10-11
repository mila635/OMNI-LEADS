import React from 'react';
import { LeadCategory } from '../types';
import {
  UtensilsCrossed,
  Activity,
  Hammer,
  Building2,
  Wrench,
  Laptop,
  Scale,
  Landmark,
  SunMedium,
  Sparkles,
  ShoppingBag,
  Car,
  Megaphone,
  PawPrint,
  Truck,
  ShieldCheck,
  GraduationCap,
  Factory
} from 'lucide-react';

interface IndustryLogoProps {
  category: LeadCategory | string;
  size?: number;
  className?: string;
}

export const IndustryLogo: React.FC<IndustryLogoProps> = ({
  category,
  size = 18,
  className = '',
}) => {
  const normalized = (category || '').toLowerCase();

  // 1. Restaurants & Hospitality - Michelin / Culinary Cutlery & Wine
  if (normalized.includes('restaurant') || normalized.includes('hospitality') || normalized.includes('food')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Restaurants & Hospitality"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
          <path d="M15 2v19" />
          <path d="M5 2v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
          <path d="M7 12v9" />
        </svg>
      </span>
    );
  }

  // 2. Dental & Healthcare - Medical Caduceus / Tooth Orthodontics
  if (normalized.includes('dental') || normalized.includes('health') || normalized.includes('clinic')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Dental & Healthcare"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4.5c-2.3 0-4.3 1.2-5 3.5-.8 2.6.2 5.5 1.5 8 1 2 2 4.5 3.5 4.5s2.5-2.5 3.5-4.5c1.3-2.5 2.3-5.4 1.5-8-.7-2.3-2.7-3.5-5-3.5Z" />
          <path d="M9.5 8c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5" />
        </svg>
      </span>
    );
  }

  // 3. Roofing & Construction - Builder Crane / Gable Truss
  if (normalized.includes('roof') || normalized.includes('construction') || normalized.includes('building')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Roofing & Construction"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </span>
    );
  }

  // 4. Real Estate & Brokerages - Commercial Skyscraper Architecture
  if (normalized.includes('estate') || normalized.includes('broker') || normalized.includes('realt')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Real Estate"
      >
        <Building2 style={{ width: size, height: size }} />
      </span>
    );
  }

  // 5. Home Services & Contractors - Industrial Spanner & Toolkit
  if (normalized.includes('contractor') || normalized.includes('home service') || normalized.includes('plumb') || normalized.includes('hvac')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Home Services & Contractors"
      >
        <Wrench style={{ width: size, height: size }} />
      </span>
    );
  }

  // 6. SaaS & Tech - Terminal & Cloud Binary
  if (normalized.includes('saas') || normalized.includes('tech') || normalized.includes('software')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="SaaS & Software"
      >
        <Laptop style={{ width: size, height: size }} />
      </span>
    );
  }

  // 7. Legal & Law Firms - Scales of Justice
  if (normalized.includes('legal') || normalized.includes('law') || normalized.includes('attorney')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Legal & Law Firms"
      >
        <Scale style={{ width: size, height: size }} />
      </span>
    );
  }

  // 8. Accounting & Financial - Banking Pillars & Ledger
  if (normalized.includes('account') || normalized.includes('finan') || normalized.includes('wealth')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Accounting & Financial"
      >
        <Landmark style={{ width: size, height: size }} />
      </span>
    );
  }

  // 9. Solar & CleanTech - Photovoltaic Sun Rays
  if (normalized.includes('solar') || normalized.includes('clean') || normalized.includes('green')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Solar & CleanTech"
      >
        <SunMedium style={{ width: size, height: size }} />
      </span>
    );
  }

  // 10. Fitness & MedSpas - Aesthetic Sparkle & Wellness
  if (normalized.includes('fitness') || normalized.includes('spa') || normalized.includes('aesthetic') || normalized.includes('gym')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-pink-500/10 text-pink-600 dark:text-pink-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Fitness & MedSpas"
      >
        <Sparkles style={{ width: size, height: size }} />
      </span>
    );
  }

  // 11. E-Commerce & DTC - Retail Bag / Shopping Brand
  if (normalized.includes('commerce') || normalized.includes('dtc') || normalized.includes('shop') || normalized.includes('retail')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="E-Commerce & DTC"
      >
        <ShoppingBag style={{ width: size, height: size }} />
      </span>
    );
  }

  // 12. Automotive & Dealerships - Vehicle Motor
  if (normalized.includes('auto') || normalized.includes('dealer') || normalized.includes('car')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Automotive & Dealerships"
      >
        <Car style={{ width: size, height: size }} />
      </span>
    );
  }

  // 13. Marketing & Creative Agency - Megaphone / Growth
  if (normalized.includes('market') || normalized.includes('agency') || normalized.includes('creative')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Marketing & Agencies"
      >
        <Megaphone style={{ width: size, height: size }} />
      </span>
    );
  }

  // 14. Veterinary & Pet Care - Paw Print
  if (normalized.includes('vet') || normalized.includes('pet') || normalized.includes('animal')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-lime-500/10 text-lime-600 dark:text-lime-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Veterinary & Pet Care"
      >
        <PawPrint style={{ width: size, height: size }} />
      </span>
    );
  }

  // 15. Logistics & Supply Chain - Freight Truck
  if (normalized.includes('logistics') || normalized.includes('freight') || normalized.includes('supply')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-stone-500/10 text-stone-600 dark:text-stone-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Logistics & Supply Chain"
      >
        <Truck style={{ width: size, height: size }} />
      </span>
    );
  }

  // 16. Manufacturing & Industrial - Industrial Factory
  if (normalized.includes('manufactur') || normalized.includes('industrial') || normalized.includes('factory')) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 p-1 shrink-0 ${className}`}
        style={{ width: size + 8, height: size + 8 }}
        title="Manufacturing & Industrial"
      >
        <Factory style={{ width: size, height: size }} />
      </span>
    );
  }

  // Fallback Enterprise Building
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 p-1 shrink-0 ${className}`}
      style={{ width: size + 8, height: size + 8 }}
      title={category}
    >
      <Building2 style={{ width: size, height: size }} />
    </span>
  );
};
