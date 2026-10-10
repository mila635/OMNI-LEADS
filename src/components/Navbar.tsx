import React, { useState } from 'react';
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
  Download
} from 'lucide-react';
import { AgencyProfile } from '../types';

export type ActiveTab = 'leads' | 'history' | 'analytics';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  leadsCount: number;
  hotLeadsCount: number;
  activeAgency?: AgencyProfile;
  agencies?: AgencyProfile[];
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
  theme,
  onToggleTheme,
  onSelectAgency,
  onOpenAgencyModal,
  onOpenExportModal,
  onOpenAgent,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'leads', label: 'Command Center', icon: <Search className="w-3.5 h-3.5" />, badge: `${leadsCount}` },
    { id: 'history', label: 'Extraction History', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'analytics', label: 'Analytics & Visuals', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  const isLight = theme === 'light';

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-150 backdrop-blur-md ${
      isLight ? 'bg-white/95 border-zinc-200 text-zinc-900 shadow-xs' : 'bg-[#09090B]/95 border-[#27272A] text-zinc-100'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo & Active Business Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('leads')}>
              <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-xs shadow-sm shadow-indigo-600/30">
                AI
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold text-sm tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    LEADGEN<span className="text-indigo-600 dark:text-indigo-400 font-extrabold">PRO</span>
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                    isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-[#18181B] border-[#27272A] text-zinc-400'
                  }`}>
                    Realtime v4.5
                  </span>
                </div>
              </div>
            </div>

            {/* Active Pitching Business Switcher Pill */}
            {activeAgency && (
              <div className="relative">
                <button
                  type="button"
                  id="btn-active-agency-dropdown"
                  onClick={() => setAgencyDropdownOpen(!agencyDropdownOpen)}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                    isLight
                      ? 'bg-zinc-100 hover:bg-zinc-200/80 border-indigo-300 text-zinc-900'
                      : 'bg-[#18181B] border-indigo-500/40 hover:border-indigo-400 text-white'
                  }`}
                  title="Click to switch or configure pitching businesses"
                >
                  {activeAgency.logoUrl ? (
                    <img
                      src={activeAgency.logoUrl}
                      alt={activeAgency.name}
                      referrerPolicy="no-referrer"
                      className="w-4 h-4 rounded-xs object-cover bg-zinc-900"
                    />
                  ) : (
                    <Building className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  )}
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider leading-none font-bold">
                      Business:
                    </span>
                    <span className={`text-xs font-bold truncate max-w-[120px] sm:max-w-[170px] leading-tight mt-0.5 ${
                      isLight ? 'text-zinc-900' : 'text-white'
                    }`}>
                      {activeAgency.name}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5" />
                </button>

                {/* Dropdown Menu */}
                {agencyDropdownOpen && (
                  <div className={`absolute left-0 top-full mt-1.5 w-64 rounded-lg border shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                    isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#121215] border-[#27272A] text-zinc-100'
                  }`}>
                    <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-zinc-500 border-b border-zinc-200 dark:border-[#27272A] mb-1">
                      Switch Business Profile
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
                          className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs text-left transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-300 font-bold border border-indigo-500/30'
                              : isLight
                              ? 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'
                              : 'text-zinc-300 hover:bg-[#18181B] hover:text-white'
                          }`}
                        >
                          <div className="truncate">
                            <div className="truncate font-semibold">{agency.name}</div>
                            <div className="text-[10px] text-zinc-400 truncate">{agency.website.replace(/^https?:\/\//, '')}</div>
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
                        className="w-full flex items-center justify-center gap-1.5 px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
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

          {/* Desktop Navigation Tabs */}
          <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-lg border ${
            isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-[#121215] border-[#27272A]'
          }`}>
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? isLight
                        ? 'bg-white text-zinc-900 border border-zinc-300 shadow-xs font-bold'
                        : 'bg-[#27272A] text-white border border-zinc-700 shadow-sm'
                      : isLight
                      ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        active
                          ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30'
                          : isLight
                          ? 'bg-zinc-200 text-zinc-600'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status & Action Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Nexus AI Agent Button */}
            {onOpenAgent && (
              <button
                type="button"
                id="btn-navbar-open-agent"
                onClick={onOpenAgent}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                  isLight
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/40 shadow-indigo-950/50'
                }`}
                title="Launch Nexus Autonomous AI Agent"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span className="hidden sm:inline">Nexus Agent</span>
                <span className="sm:hidden">AI</span>
              </button>
            )}

            {/* Dark/Light Theme Switcher */}
            <button
              type="button"
              id="theme-switcher-btn"
              onClick={onToggleTheme}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer shadow-xs ${
                isLight
                  ? 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
                  : 'bg-[#18181B] border-[#27272A] text-zinc-400 hover:text-white hover:border-zinc-500'
              }`}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-lg border ${
                isLight ? 'bg-zinc-100 border-zinc-300 text-zinc-700' : 'bg-[#18181B] border-[#27272A] text-zinc-400'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-3 pt-2.5 pb-3 space-y-2 ${
          isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#09090B] border-[#27272A] text-zinc-100'
        }`}>
          {activeAgency && (
            <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
              isLight ? 'bg-indigo-50 border-indigo-200 text-zinc-900' : 'bg-indigo-950/30 border-indigo-500/40 text-white'
            }`}>
              <div>
                <div className="text-[9px] uppercase font-bold text-indigo-500 dark:text-indigo-400 tracking-wider">Active Pitching Business</div>
                <div className="font-bold text-sm">{activeAgency.name}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onOpenAgencyModal) onOpenAgencyModal();
                  setMobileMenuOpen(false);
                }}
                className="px-2 py-1 rounded bg-indigo-600 text-white text-[11px] font-semibold"
              >
                Switch / Manage
              </button>
            </div>
          )}

          <div className="mb-2">
            <div className={`p-2 rounded border text-xs ${
              isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-[#18181B] border-[#27272A] text-zinc-200'
            }`}>
              <div className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider">Active Pipeline</div>
              <div className="font-bold text-sm mt-0.5">{leadsCount} Verified Records</div>
            </div>
          </div>

          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-tab-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-zinc-300 hover:bg-[#18181B]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
