import { UserAccount, Lead, AgencyProfile } from '../types';
import { DEFAULT_AGENCIES } from '../data/seedLeads';

const USERS_KEY = 'leadgen_registered_users_v1';
const CURRENT_USER_KEY = 'leadgen_current_user_v1';

// Seed demo users so user can test instant login if desired
export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user-mila-finance',
    name: 'Mila Finance',
    email: 'milafinance01@gmail.com',
    phone: '+1 (555) 234-5678',
    companyName: 'ADS RESULTS 24/7',
    role: 'Managing Partner & Growth Director',
    authProvider: 'google',
    plan: 'Agency Scale',
    createdAt: '2026-01-15T09:00:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-enterprise-exec',
    name: 'Marcus Vance',
    email: 'marcus@hypergrowth.ai',
    phone: '+1 (415) 890-1234',
    companyName: 'HyperGrowth Media Group',
    role: 'Head of Outbound Operations',
    authProvider: 'email',
    plan: 'Enterprise',
    createdAt: '2026-02-01T10:30:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
];

export function getRegisteredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  // Initialize default demo users
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
  } catch {}
  return DEMO_USERS;
}

export function getCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) return parsed;
    }
  } catch {}
  return null;
}

export function setCurrentUser(user: UserAccount | null): void {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch {}
}

export function registerUser(newUser: {
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  role?: string;
  authProvider: 'google' | 'phone' | 'email';
  plan?: 'Starter' | 'Growth' | 'Agency Scale' | 'Enterprise';
}): UserAccount {
  const users = getRegisteredUsers();
  const existing = users.find(
    (u) =>
      u.email.toLowerCase() === newUser.email.toLowerCase() ||
      (newUser.phone && u.phone && u.phone === newUser.phone)
  );

  if (existing) {
    // If existing, update session and return
    setCurrentUser(existing);
    return existing;
  }

  const created: UserAccount = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: newUser.name.trim(),
    email: newUser.email.trim(),
    phone: newUser.phone?.trim(),
    companyName: newUser.companyName.trim() || 'My Business Agency',
    role: newUser.role?.trim() || 'Managing Director',
    authProvider: newUser.authProvider,
    plan: newUser.plan || 'Agency Scale',
    createdAt: new Date().toISOString(),
    avatarUrl: newUser.authProvider === 'google'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      : undefined,
  };

  const updated = [created, ...users];
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  } catch {}

  setCurrentUser(created);
  return created;
}

export function loginUser(identifier: string): UserAccount | null {
  const users = getRegisteredUsers();
  const cleanId = identifier.trim().toLowerCase();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === cleanId ||
      (u.phone && u.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, ''))
  );

  if (found) {
    setCurrentUser(found);
    return found;
  }

  // If not found, auto-create a user seamlessly so they can immediately begin
  const isEmail = cleanId.includes('@');
  const fallbackUser = registerUser({
    name: isEmail ? cleanId.split('@')[0].replace(/[._]/g, ' ') : 'Verified Client',
    email: isEmail ? cleanId : `${cleanId.replace(/\D/g, '')}@business.nexus`,
    phone: isEmail ? undefined : identifier,
    companyName: 'ADS RESULTS 24/7',
    authProvider: isEmail ? 'email' : 'phone',
    plan: 'Agency Scale',
  });
  return fallbackUser;
}

export function logoutUser(): void {
  setCurrentUser(null);
}

// ----------------------------------------------------
// Isolated Per-User Workspace Storage
// ----------------------------------------------------

export function getUserLeads(userId: string): Lead[] {
  if (!userId) return [];
  try {
    const raw = localStorage.getItem(`nexus_user_${userId}_leads`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function setUserLeads(userId: string, leads: Lead[]): void {
  if (!userId) return;
  try {
    localStorage.setItem(`nexus_user_${userId}_leads`, JSON.stringify(leads));
  } catch {}
}

export function getUserAgencies(userId: string): AgencyProfile[] {
  if (!userId) return DEFAULT_AGENCIES;
  try {
    const raw = localStorage.getItem(`nexus_user_${userId}_agencies`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_AGENCIES;
}

export function setUserAgencies(userId: string, agencies: AgencyProfile[]): void {
  if (!userId) return;
  try {
    localStorage.setItem(`nexus_user_${userId}_agencies`, JSON.stringify(agencies));
  } catch {}
}

export function getUserActiveAgencyId(userId: string): string {
  if (!userId) return 'agency-ads-results-247';
  try {
    const saved = localStorage.getItem(`nexus_user_${userId}_active_agency`);
    if (saved) return saved;
  } catch {}
  return 'agency-ads-results-247';
}

export function setUserActiveAgencyId(userId: string, agencyId: string): void {
  if (!userId) return;
  try {
    localStorage.setItem(`nexus_user_${userId}_active_agency`, agencyId);
  } catch {}
}
