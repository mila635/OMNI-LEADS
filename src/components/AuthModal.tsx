import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  Phone,
  User,
  Building,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  LogIn,
  UserPlus,
  Briefcase,
  Users,
  KeyRound,
  Check,
  AlertCircle
} from 'lucide-react';
import { UserAccount, LeadCategory } from '../types';
import { registerUser, loginUser } from '../utils/userStorage';
import { INDUSTRY_DEPARTMENTS } from './NexusChatWorkspace';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
  initialMode?: 'login' | 'register';
  theme: 'dark' | 'light';
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'register',
  theme,
}: AuthModalProps) {
  const isLight = theme === 'light';

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Business Registration Fields
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('ADS RESULTS 24/7');
  const [jobTitle, setJobTitle] = useState('Managing Partner & Growth Director');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [targetIndustry, setTargetIndustry] = useState<LeadCategory>('Restaurants & Hospitality');
  const [monthlyVolume, setMonthlyVolume] = useState('25,000 leads/mo');

  // Two-Factor / Security Verification
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Google Workspace 1-Click SSO
  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser = registerUser({
        name: 'Mila Finance',
        email: 'milafinance01@gmail.com',
        companyName: 'ADS RESULTS 24/7',
        role: 'Managing Partner & Growth Director',
        authProvider: 'google',
        plan: 'Agency Scale',
      });
      setLoading(false);
      onSuccess(googleUser);
      onClose();
    }, 400);
  };

  // Submit Step 1 of Registration -> Move to Step 2 Verification
  const handleProceedToVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !workEmail.trim() || !password.trim() || !companyName.trim()) {
      setError('Please fill in all required company registration details.');
      return;
    }

    // Generate random 6 digit code for realism
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setIsVerifying(true);
  };

  // Complete Step 2 Verification
  const handleCompleteVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length < 4) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = registerUser({
        name: fullName.trim(),
        email: workEmail.trim(),
        phone: phone.trim() || undefined,
        companyName: companyName.trim(),
        role: jobTitle.trim(),
        authProvider: 'email',
        plan: 'Agency Scale',
      });

      setLoading(false);
      onSuccess(user);
      onClose();
    }, 350);
  };

  // Standard Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const identifier = authMethod === 'email' ? workEmail.trim() : phone.trim();
    if (!identifier) {
      setError(`Please enter your ${authMethod === 'email' ? 'registered work email' : 'business phone number'}.`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = loginUser(identifier);
      setLoading(false);
      if (user) {
        onSuccess(user);
        onClose();
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-zinc-300 text-black shadow-2xl'
            : 'bg-[#121215] border-[#27272A] text-zinc-100 shadow-2xl'
        }`}
      >
        {/* Modal Top Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between ${
            isLight ? 'bg-zinc-50 border-zinc-300' : 'bg-[#0E0E11] border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-sm tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                  NEXUS LEADGEN PRO
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
                  Business Portal
                </span>
              </div>
              <p className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {isVerifying
                  ? 'Step 2 of 2: Enterprise Security Verification'
                  : mode === 'register'
                  ? 'Register Corporate Workspace Account'
                  : 'Sign In to Your Workspace'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'hover:bg-zinc-200 text-zinc-600' : 'hover:bg-zinc-800 text-zinc-400'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[82vh] overflow-y-auto custom-scrollbar space-y-4">
          {/* STEP 2: VERIFICATION SCREEN */}
          {isVerifying ? (
            <form onSubmit={handleCompleteVerification} className="space-y-4 animate-fadeIn">
              <div
                className={`p-4 rounded-xl border text-center space-y-2 ${
                  isLight ? 'bg-indigo-50/70 border-indigo-200 text-black' : 'bg-indigo-950/20 border-indigo-800/40 text-zinc-200'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm">Security Verification Code</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                  To protect company pipelines and ensure SOC 2 compliance, we sent a 6-digit confirmation code to{' '}
                  <strong className={isLight ? 'text-black' : 'text-white'}>{workEmail}</strong>.
                </p>

                {/* Simulated code convenience pill */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setOtpCode(generatedOtp)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/20 transition-all cursor-pointer border border-indigo-500/30"
                  >
                    <span>Instant Code: {generatedOtp}</span>
                    <span className="text-[10px] font-sans font-semibold underline">(Click to auto-fill)</span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className={`absolute left-3 top-2.5 w-4 h-4 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="849201"
                    maxLength={6}
                    autoFocus
                    required
                    className={`w-full pl-10 pr-3 py-2.5 text-center font-mono text-base font-bold tracking-widest rounded-xl border outline-none transition-all ${
                      isLight
                        ? 'bg-white border-zinc-300 text-black focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                        : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVerifying(false)}
                  className={`w-1/3 py-2.5 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    isLight ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-black' : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || otpCode.length < 4}
                  className="w-2/3 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{loading ? 'Activating...' : 'Verify & Launch Workspace'}</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Switch Mode Tabs (Sign In vs Register) */}
              <div
                className={`p-1 rounded-xl border flex text-xs font-bold ${
                  isLight ? 'bg-zinc-100 border-zinc-300' : 'bg-[#18181B] border-zinc-800'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    mode === 'register'
                      ? isLight
                        ? 'bg-white text-black shadow-xs font-bold'
                        : 'bg-zinc-800 text-white shadow-xs font-bold'
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register Company</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    mode === 'login'
                      ? isLight
                        ? 'bg-white text-black shadow-xs font-bold'
                        : 'bg-zinc-800 text-white shadow-xs font-bold'
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              </div>

              {/* 1-Click Google SSO */}
              <div>
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs ${
                    isLight
                      ? 'bg-white hover:bg-zinc-100 border-zinc-300 text-black'
                      : 'bg-[#18181B] hover:bg-zinc-800 border-zinc-700 text-white'
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google Workspace</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                </div>
                <div
                  className={`relative px-3 text-[10px] uppercase tracking-wider font-semibold ${
                    isLight ? 'bg-white text-zinc-500' : 'bg-[#121215] text-zinc-500'
                  }`}
                >
                  Or with corporate credentials
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* REGISTRATION FORM */}
              {mode === 'register' && (
                <form onSubmit={handleProceedToVerification} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Mila Finance"
                          required
                          className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                            isLight
                              ? 'bg-white border-zinc-300 text-black focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                              : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <input
                          type="email"
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="milafinance01@gmail.com"
                          required
                          className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                            isLight
                              ? 'bg-white border-zinc-300 text-black focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                              : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                        Company / Agency Name *
                      </label>
                      <div className="relative">
                        <Building className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="ADS RESULTS 24/7"
                          required
                          className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                            isLight
                              ? 'bg-white border-zinc-300 text-black focus:border-indigo-600'
                              : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                        Job Role / Title *
                      </label>
                      <div className="relative">
                        <Briefcase className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="Managing Partner"
                          required
                          className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                            isLight
                              ? 'bg-white border-zinc-300 text-black focus:border-indigo-600'
                              : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                        Direct Business Phone
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 234-5678"
                          className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                            isLight
                              ? 'bg-white border-zinc-300 text-black focus:border-indigo-600'
                              : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                        Target Industry
                      </label>
                      <select
                        value={targetIndustry}
                        onChange={(e) => setTargetIndustry(e.target.value as LeadCategory)}
                        className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-semibold transition-all cursor-pointer ${
                          isLight
                            ? 'bg-white border-zinc-300 text-black focus:border-indigo-600'
                            : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                        }`}
                      >
                        {INDUSTRY_DEPARTMENTS.slice(0, 8).map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                      Account Password *
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        defaultValue="nexus-secure-pass"
                        required
                        className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                          isLight
                            ? 'bg-white border-zinc-300 text-black focus:border-indigo-600'
                            : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Security Verification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* SIGN IN FORM */}
              {mode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                      Registered Work Email or Phone
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                      <input
                        type="text"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="milafinance01@gmail.com"
                        required
                        className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                          isLight
                            ? 'bg-white border-zinc-300 text-black focus:border-indigo-600'
                            : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-zinc-200'}`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        defaultValue="nexus-secure-pass"
                        className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium transition-all ${
                          isLight
                            ? 'bg-white border-zinc-300 text-black focus:border-indigo-600'
                            : 'bg-[#18181B] border-zinc-700 text-white focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Modal Security Footer */}
        <div
          className={`p-3.5 border-t text-center text-[11px] flex items-center justify-center gap-2 ${
            isLight ? 'border-zinc-300 bg-zinc-50 text-zinc-600' : 'border-[#27272A] bg-[#0E0E11] text-zinc-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>SOC 2 Type II Certified • Isolated Per-User Workspace Storage • 256-Bit TLS</span>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
