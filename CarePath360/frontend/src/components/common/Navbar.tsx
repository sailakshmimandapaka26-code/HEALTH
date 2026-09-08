import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Bell,
  User,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Droplet,
  ShieldCheck,
  Hospital,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const { currentUser, switchRole, notifications, markAllNotificationsRead, unreadCount } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const navigate = useNavigate();

  const roleOptions = [
    { key: 'patient', label: 'Patient (Sarah Jenkins)', icon: User, color: 'text-teal-600' },
    { key: 'hospital', label: 'Hospital (Metro Cancer Inst.)', icon: Hospital, color: 'text-blue-600' },
    { key: 'doctor', label: 'Doctor (Dr. Priya Sharma)', icon: Stethoscope, color: 'text-indigo-600' },
    { key: 'caregiver', label: 'Caregiver (Mark Jenkins)', icon: HeartHandshake, color: 'text-purple-600' },
    { key: 'donor', label: 'Donor (Alex Rivera — B+)', icon: Droplet, color: 'text-rose-600' },
    { key: 'admin', label: 'Admin (Operations)', icon: ShieldCheck, color: 'text-slate-700' }
  ];

  const handleRoleSelect = (roleKey: string) => {
    switchRole(roleKey);
    setShowRoleMenu(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 bg-clip-text text-transparent">
                    CarePath 360
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    Survivorship & BloodSOS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block">
                  Connected Care Journey & Emergency Coordination
                </p>
              </div>
            </Link>
          </div>

          {/* Right Tools: Role Switcher & Notifications */}
          <div className="flex items-center space-x-3">
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-teal-500 bg-slate-50 hover:bg-white text-xs font-medium text-slate-700 transition shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-900">Role:</span>
                <span className="text-teal-700 font-bold">{currentUser.role}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Demo Role Switcher
                  </div>
                  {roleOptions.map(opt => {
                    const Icon = opt.icon;
                    const isActive = currentUser.role.toLowerCase() === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleRoleSelect(opt.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 transition ${
                          isActive ? 'bg-teal-50 font-bold text-teal-900' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className={`w-4 h-4 ${opt.color}`} />
                          <span>{opt.label}</span>
                        </div>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Notifications ({notifications.length})</span>
                    <button
                      onClick={() => markAllNotificationsRead()}
                      className="text-[11px] text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.slice(0, 5).map(n => (
                      <div
                        key={n.id}
                        className={`p-3 text-xs hover:bg-slate-50 transition ${!n.is_read ? 'bg-teal-50/40' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-semibold text-slate-800">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-1 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs font-medium text-teal-600 hover:text-teal-700"
                    >
                      View All Notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/30"
              />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 capitalize">{currentUser.role.toLowerCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
