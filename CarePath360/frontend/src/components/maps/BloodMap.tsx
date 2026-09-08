import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Donor, BloodRequest } from '../../types';

interface BloodMapProps {
  hospitalLat: number;
  hospitalLng: number;
  hospitalName: string;
  radiusKm: number;
  donors: Donor[];
  onSelectDonor?: (donor: Donor) => void;
}

// Custom Leaflet DivIcons for crisp styling without asset loading issues
const createHospitalIcon = () =>
  L.divIcon({
    className: 'custom-hospital-icon',
    html: `<div style="
      background-color: #e11d48;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      font-weight: bold;
      border: 3px solid white;
      box-shadow: 0 4px 10px rgba(0,0,0,0.35);
    ">🏥</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });

const createDonorIcon = (status?: string) => {
  let bgColor = '#94a3b8'; // default gray
  let label = '⚪';

  if (status === 'ACCEPTED') {
    bgColor = '#16a34a'; // green
    label = '🟢';
  } else if (status === 'ON_THE_WAY') {
    bgColor = '#2563eb'; // blue
    label = '🔵';
  } else if (status === 'ALERTED') {
    bgColor = '#eab308'; // yellow
    label = '🟡';
  } else if (status === 'DECLINED') {
    bgColor = '#dc2626'; // red
    label = '🔴';
  }

  return L.divIcon({
    className: 'custom-donor-icon',
    html: `<div style="
      background-color: ${bgColor};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: bold;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    ">${label}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

export const BloodMap: React.FC<BloodMapProps> = ({
  hospitalLat,
  hospitalLng,
  hospitalName,
  radiusKm,
  donors,
  onSelectDonor
}) => {
  const radiusMeters = radiusKm * 1000;

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
      <MapContainer
        center={[hospitalLat, hospitalLng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Hospital Location Marker */}
        <Marker position={[hospitalLat, hospitalLng]} icon={createHospitalIcon()}>
          <Popup>
            <div className="text-xs p-1">
              <div className="font-bold text-rose-700 text-sm">🏥 {hospitalName}</div>
              <div className="text-slate-600 mt-1">Emergency Blood Coordination Epicenter</div>
              <div className="mt-2 text-[10px] bg-rose-50 text-rose-800 font-semibold px-2 py-0.5 rounded">
                Current Search Radius: {radiusKm} KM
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Progressive Search Radius Circle */}
        <Circle
          center={[hospitalLat, hospitalLng]}
          radius={radiusMeters}
          pathOptions={{
            color: radiusKm === 1.0 ? '#0d9488' : radiusKm === 3.0 ? '#eab308' : '#e11d48',
            fillColor: radiusKm === 1.0 ? '#14b8a6' : radiusKm === 3.0 ? '#facc15' : '#fb7185',
            fillOpacity: 0.15,
            weight: 2,
            dashArray: '5, 5'
          }}
        />

        {/* Donor Markers */}
        {donors.map(donor => (
          <Marker
            key={donor.id}
            position={[donor.latitude, donor.longitude]}
            icon={createDonorIcon(donor.current_response_status)}
          >
            <Popup>
              <div className="text-xs p-1.5 min-w-[200px]">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="font-bold text-slate-900">{donor.name}</span>
                  <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 font-black rounded text-[10px]">
                    {donor.blood_group}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <strong className="text-slate-900">{donor.distance_km} KM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Arrival:</span>
                    <strong className="text-teal-700">{donor.eta_minutes} min</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority Score:</span>
                    <strong className="text-indigo-600">{donor.priority_score || 85} / 99</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-bold text-slate-800">
                      {donor.current_response_status === 'ACCEPTED' && '🟢 Accepted'}
                      {donor.current_response_status === 'ON_THE_WAY' && '🔵 On The Way'}
                      {donor.current_response_status === 'ALERTED' && '🟡 Alerted'}
                      {donor.current_response_status === 'DECLINED' && '🔴 Declined'}
                      {(!donor.current_response_status || donor.current_response_status === 'NO_RESPONSE') && '⚪ Awaiting Response'}
                    </span>
                  </div>
                </div>
                {donor.match_rationale && (
                  <p className="mt-2 pt-1.5 border-t text-[10px] text-slate-500 italic">
                    "{donor.match_rationale}"
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-slate-200 text-[11px] space-y-1">
        <div className="font-bold text-slate-700 mb-1">Live Map Legend</div>
        <div className="flex items-center space-x-2">
          <span>🏥</span>
          <span className="text-slate-600">Hospital Coordinator</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🟢</span>
          <span className="text-slate-600">Accepted Donor</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🔵</span>
          <span className="text-slate-600">Donor On The Way</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🟡</span>
          <span className="text-slate-600">Alerted Candidate</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>⚪</span>
          <span className="text-slate-600">Awaiting Response</span>
        </div>
      </div>
    </div>
  );
};
