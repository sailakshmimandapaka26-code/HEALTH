import React, { useState } from 'react';
import {
  FolderLock,
  UploadCloud,
  FileText,
  Eye,
  Download,
  Calendar,
  Tag,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MedicalReport } from '../../types';
import { DemoBadge } from '../../components/common/DemoBadge';

export const ReportsPage: React.FC = () => {
  const { reports, uploadReport } = useApp();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'Lab' as 'Lab' | 'Imaging' | 'Discharge Summary' | 'Treatment' | 'Follow-up',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name.trim()) return;

    uploadReport({
      patient_id: 'pat-1',
      name: uploadForm.name,
      category: uploadForm.category,
      date: uploadForm.date,
      status: 'Available',
      file_url: '#',
      notes: uploadForm.notes
    });

    setShowUploadModal(false);
    setUploadForm({
      name: '',
      category: 'Lab',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Imaging':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Lab':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Discharge Summary':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Medical Report Management</h1>
            <DemoBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Secure longitudinal record repository for blood work, pathology, mammograms, and discharge summaries.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm self-start md:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New Report</span>
        </button>
      </div>

      {/* Safety & Demo Storage Notice */}
      <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center space-x-2.5">
        <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span>
          <strong>Prototype Notice:</strong> Document storage runs in simulated hackathon mode. Does not claim real medical verification or legal HIPAA archival.
        </span>
      </div>

      {/* Reports Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Archived Clinical Documents ({reports.length})</h2>
          <span className="text-xs text-slate-500">Encrypted Local Demonstration Store</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold text-[10px]">
              <tr>
                <th className="px-5 py-3">Report Document</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{report.name}</div>
                        {report.notes && (
                          <div className="text-[11px] text-slate-500 line-clamp-1">{report.notes}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryBadge(report.category)}`}
                    >
                      {report.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{report.date}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{report.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg font-bold text-[11px] transition flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => alert(`Simulating download of: ${report.name}`)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                        title="Download placeholder"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Upload Diagnostic Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Document Title *</label>
                <input
                  type="text"
                  placeholder="e.g. CBC Differential & Liver Panel"
                  value={uploadForm.name}
                  onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={e => setUploadForm({ ...uploadForm, category: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    <option value="Lab">Lab Results</option>
                    <option value="Imaging">Imaging Scan</option>
                    <option value="Discharge Summary">Discharge Summary</option>
                    <option value="Treatment">Treatment Plan</option>
                    <option value="Follow-up">Follow-up Note</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700">Date</label>
                  <input
                    type="date"
                    value={uploadForm.date}
                    onChange={e => setUploadForm({ ...uploadForm, date: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Clinical Findings / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter normal values, physician signature notes, or summary..."
                  value={uploadForm.notes}
                  onChange={e => setUploadForm({ ...uploadForm, notes: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-teal-200 rounded-xl bg-teal-50/40 text-center">
                <UploadCloud className="w-8 h-8 text-teal-600 mx-auto" />
                <p className="font-bold text-slate-800 text-xs mt-1">Select PDF or Image file</p>
                <p className="text-[10px] text-slate-500">Supports PDF, JPG, PNG (Simulated mock storage)</p>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">{selectedReport.name}</h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Category:</span>
                <span className="font-bold text-slate-800">{selectedReport.category}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Date Logged:</span>
                <span className="font-bold text-slate-800">{selectedReport.date}</span>
              </div>
              <div>
                <span className="text-slate-500">Document Summary & Notes:</span>
                <p className="mt-1 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-mono text-[11px]">
                  {selectedReport.notes || 'Routine surveillance finding without pathological abnormality.'}
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                {selectedReport.disclaimer}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-teal-600 text-white rounded-xl font-bold text-xs"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
