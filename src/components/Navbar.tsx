import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  Database,
  BarChart3,
  Search,
  Cpu,
  Menu,
  X,
  Zap,
  Globe,
  Building,
  ChevronDown,
  Plus,
  History,
  Sun,
  Moon,
  Download,
  MessageSquare,
  User,
  LogOut,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { AgencyProfile, UserAccount } from '../types';

export type ActiveTab = 'chat' | 'leads' | 'history' | 'analytics';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  leadsCount: number;
  hotLeadsCount: number;
  activeAgency?: AgencyProfile;
  agencies?: AgencyProfile[];
  currentUser?: UserAccount | null;
  onSignOut?: () => void;
  onOpenAuthModal?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectAgency?: (agency: AgencyProfile) => void;
  onOpenAgencyModal?: () => void;
  onOpenExportModal?: () => void;
  onOpenAgent?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  leadsCount,
  hotLeadsCount,
  activeAgency,
  agencies = [],
  currentUser,
  onSignOut,
  onOpenAuthModal,
  theme,
  onToggleTheme,
  onSelectAgency,
  onOpenAgencyModal,
  onOpenExportModal,
  onOpenAgent,
}) => {
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navDropdownRef = useRef<HTMLDivElement>(null);
  const agencyDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
        setNavDropdownOpen(false);
      }
      if (agencyDropdownRef.current && !agencyDropdownRef.current.contains(event.target as Node)) {
        setAgencyDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: ActiveTab; label: string; desc: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'chat',
      label: 'Nexus AI Chat (Default)',
      desc: 'Interactive chat, filters & live autonomous extraction',
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      badge: 'Core'
    },
    {
      id: 'leads',
      label: 'Command Center',
      desc: 'Pipeline database, detailed lead dossiers & playbooks',
      icon: <Search className="w-4 h-4 text-emerald-500" />,
      badge: `${leadsCount} Leads`
    },
    {
      id: 'history',
      label: 'Extraction History',
      desc: 'Audit trail of past scrapes and platform queries',
      icon: <History className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'analytics',
      label: 'Analytics & Visuals',
      desc: 'Market charts, rating distributions & ROI metrics',
      icon: <BarChart3 className="w-4 h-4 text-sky-500" />
    },
  ];

  const currentNav = navItems.find((n) => n.id === activeTab) || navItems[0];
  const isLight = theme === 'light';

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-150 backdrop-blur-md ${
      isLight ? 'bg-white/95 border-zinc-200 text-zinc-950 shadow-xs' : 'bg-[#09090B]/95 border-[#27272A] text-zinc-100'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo & Active Business Branding */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveTab('chat')}
              title="Return to Nexus AI Chat (Default)"
            >
              <div className="w-7 h-7 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-sm shadow-indigo-600/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-black text-sm tracking-tight ${isLight ? 'text-zinc-950' : 'text-white'}`}>
                    NEXUS <span className="text-indigo-600 font-extrabold">LEADGEN PRO</span>
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border hidden sm:inline-block ${
                    isLight ? 'bg-zinc-100 border-zinc-300 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-300'
                  }`}>
                    Enterprise
                  </span>
                </div>
              </div>
            </div>

            {/* Active Pitching Business Switcher Pill */}
            {activeAgency && (
              <div className="relative" ref={agencyDropdownRef}>
                <button
                  type="button"
                  id="btn-active-agency-dropdown"
                  onClick={() => setAgencyDropdownOpen(!agencyDropdownOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                    isLight
                      ? 'bg-zinc-100 hover:bg-zinc-200/80 border-zinc-300 text-zinc-950'
                      : 'bg-[#18181B] hover:bg-[#202024] border-zinc-800 text-zinc-200'
                  }`}
                  title="Switch pitching business persona"
                >
                  <Building className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-[160px]">{activeAgency.name}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </button>

                {/* Dropdown Menu */}
                {agencyDropdownOpen && (
                  <div
                    className={`absolute left-0 mt-1.5 w-64 rounded-xl border shadow-xl p-2 z-50 text-xs animate-fadeIn ${
                      isLight
                        ? 'bg-white border-zinc-300 text-zinc-950 shadow-zinc-300'
                        : 'bg-[#121215] border-[#27272A] text-zinc-200 shadow-2xl'
                    }`}
                  >
                    <div className="px-2 py-1 mb-1 font-bold text-[10px] uppercase tracking-wider text-zinc-500">
                      Pitching Agency Personas
                    </div>
                    {agencies.map((agency) => {
                      const isSel = agency.id === activeAgency.id;
                      return (
                        <button
                          key={agency.id}
                          type="button"
                          onClick={() => {
                            if (onSelectAgency) onSelectAgency(agency);
                            setAgencyDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                            isSel
                              ? isLight
                                ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                                : 'bg-indigo-950/40 text-indigo-300 font-bold border border-indigo-800/40'
                              : isLight
                              ? 'text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950'
                              : 'text-zinc-300 hover:bg-[#18181B] hover:text-white'
                          }`}
                        >
                          <div className="truncate">
                            <div className="truncate font-semibold">{agency.name}</div>
                            <div className="text-[10px] text-zinc-500 truncate">{agency.website.replace(/^https?:\/\//, '')}</div>
                          </div>
                          {isSel && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
                        </button>
                      );
                    })}

                    <div className="pt-1.5 mt-1 border-t border-zinc-200 dark:border-[#27272A]">
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenAgencyModal) onOpenAgencyModal();
                          setAgencyDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Manage / Add Business</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Single Navigation Dropdown + Theme Switcher + User Account */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* SINGLE TOP-RIGHT NAVIGATION DROPDOWN (as requested by user) */}
            <div className="relative" ref={navDropdownRef}>
              <button
                type="button"
                id="btn-all-navigation-dropdown"
                onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  navDropdownOpen
                    ? isLight
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-indigo-600 text-white border-indigo-500'
                    : isLight
                    ? 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-950 hover:border-zinc-400'
                    : 'bg-[#18181B] hover:bg-[#202024] border-zinc-700 text-white'
                }`}
                title="Open all pages and navigation modules"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{currentNav.label.replace(' (Default)', '')}</span>
                <span className="sm:hidden">Pages</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-75" />
              </button>

              {/* Navigation Dropdown List */}
              {navDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl p-2 z-50 text-xs animate-fadeIn ${
                    isLight
                      ? 'bg-white border-zinc-300 text-zinc-950 shadow-zinc-300'
                      : 'bg-[#121215] border-[#27272A] text-zinc-200 shadow-2xl'
                  }`}
                >
                  <div className="px-3 py-1.5 mb-1 font-bold text-[10px] uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                    <span>Workspaces & Modules</span>
                    <span className="text-indigo-500 font-mono">4 Active</span>
                  </div>

                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(item.id);
                            setNavDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                            isActive
                              ? isLight
                                ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold'
                                : 'bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 font-bold'
                              : isLight
                              ? 'hover:bg-zinc-100 text-zinc-800 hover:text-zinc-950'
                              : 'hover:bg-[#18181B] text-zinc-300 hover:text-white'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : isLight ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 truncate">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">{item.label}</span>
                              {item.badge && (
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                                  isActive
                                    ? isLight ? 'bg-indigo-200 text-indigo-900 font-bold' : 'bg-indigo-900 text-indigo-200'
                                    : isLight ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-800 text-zinc-400'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className={`text-[10px] truncate ${isLight ? 'text-zinc-600' : 'text-zinc-500'}`}>
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Nexus Agent Action Inside Dropdown */}
                  {onOpenAgent && (
                    <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-[#27272A]">
                      <button
                        type="button"
                        onClick={() => {
                          onOpenAgent();
                          setNavDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                          isLight
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-indigo-200" />
                          <span>Launch Nexus Agent Console</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20">AI</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dark/Light Theme Switcher */}
            <button
              type="button"
              id="theme-switcher-btn"
              onClick={onToggleTheme}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer shadow-xs ${
                isLight
                  ? 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:text-zinc-950 hover:bg-zinc-200'
                  : 'bg-[#18181B] border-[#27272A] text-zinc-400 hover:text-white hover:border-zinc-500'
              }`}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* User Account / Profile Dropdown */}
            {currentUser && (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  id="btn-user-profile"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                    isLight
                      ? 'bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-950'
                      : 'bg-[#18181B] hover:bg-[#202024] border-zinc-700 text-white'
                  }`}
                  title={`Account: ${currentUser.name}`}
                >
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <span className="hidden md:inline truncate max-w-[100px]">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </button>

                {/* User Menu Dropdown */}
                {userDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-3 z-50 text-xs animate-fadeIn ${
                      isLight
                        ? 'bg-white border-zinc-300 text-black shadow-zinc-300'
                        : 'bg-[#121215] border-[#27272A] text-zinc-100 shadow-2xl'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-zinc-200 dark:border-zinc-800">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {currentUser.name.charAt(0)}
                      </div>
                      <div className="truncate flex-1">
                        <div className={`font-bold truncate ${isLight ? 'text-black' : 'text-white'}`}>{currentUser.name}</div>
                        <div className={`text-[10px] truncate ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{currentUser.email}</div>
                      </div>
                    </div>

                    <div className="py-2.5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs py-1">
                        <span className={isLight ? 'text-zinc-700 font-medium' : 'text-zinc-400 font-medium'}>Workplace Plan</span>
                        <span className="font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded font-mono text-[11px] border border-indigo-200 dark:border-indigo-800/40">
                          {currentUser.plan}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1">
                        <span className={isLight ? 'text-zinc-700 font-medium' : 'text-zinc-400 font-medium'}>Company / Agency</span>
                        <span className={`font-bold truncate max-w-[130px] ${isLight ? 'text-black' : 'text-white'}`}>
                          {currentUser.companyName}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
                      {(currentUser.plan === 'Agency Scale' || currentUser.plan === 'Enterprise') && onOpenAgencyModal && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenAgencyModal();
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer text-xs ${
                            isLight ? 'hover:bg-zinc-100 text-black font-medium' : 'hover:bg-[#18181B] text-zinc-300'
                          }`}
                        >
                          <Building className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Manage Agency Personas</span>
                        </button>
                      )}

                      {onSignOut && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onSignOut();
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer text-xs font-bold ${
                            isLight
                              ? 'text-rose-600 hover:bg-rose-50'
                              : 'text-rose-400 hover:bg-rose-950/30'
                          }`}
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
