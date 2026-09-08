import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Calendar,
  Droplet,
  HeartPulse,
  HeartHandshake,
  Stethoscope,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoBadge } from '../../components/common/DemoBadge';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState('ALL');

  const filtered = notifications.filter(n => {
    if (filter === 'ALL') return true;
    return n.category === filter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'BLOOD_SOS':
        return <Droplet className="w-4 h-4 text-rose-600" />;
      case 'APPOINTMENT':
        return <Calendar className="w-4 h-4 text-teal-600" />;
      case 'MONITORING':
        return <HeartPulse className="w-4 h-4 text-purple-600" />;
      case 'CAREGIVER':
        return <HeartHandshake className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Notification Center</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time notifications for survivorship appointments, monitoring plan updates, and BloodSOS alerts.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition self-start sm:self-auto"
        >
          Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'APPOINTMENT', 'MONITORING', 'BLOOD_SOS', 'CAREGIVER'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === f
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f === 'ALL' ? 'All Alerts' : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No notifications matching this category.
          </div>
        ) : (
          filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 transition cursor-pointer flex items-start justify-between gap-4 hover:bg-slate-50 ${
                !notif.is_read ? 'bg-teal-50/30' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">{notif.title}</span>
                    {!notif.is_read && (
                      <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-400 whitespace-nowrap flex items-center space-x-1 flex-shrink-0">
                <Clock className="w-3 h-3 text-slate-300" />
                <span>{notif.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
