import React, { useState } from 'react';
import { useHistoryStore } from '../store/history.store';
import { X, Download, Trash2, ChevronDown, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HistoryItem = ({ entry }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg mb-3 p-3 text-sm">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
          <div>
            <p className="font-semibold text-white">{entry.actionType} Operation</p>
            <p className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {entry.successCount > 0 && (
            <span className="flex items-center gap-1 text-green-400">
              <CheckCircle2 className="w-4 h-4" /> {entry.successCount}
            </span>
          )}
          {entry.failedCount > 0 && (
            <span className="flex items-center gap-1 text-red-400">
              <XCircle className="w-4 h-4" /> {entry.failedCount}
            </span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3 pt-3 border-t border-gray-700"
          >
            {entry.successfulRepos?.length > 0 && (
              <div className="mb-2">
                <p className="text-green-400 font-medium mb-1">Successful:</p>
                <ul className="list-disc pl-5 text-gray-300">
                  {entry.successfulRepos.map((repo, i) => <li key={`success-${i}`}>{repo}</li>)}
                </ul>
              </div>
            )}
            {entry.failedRepos?.length > 0 && (
              <div>
                <p className="text-red-400 font-medium mb-1">Failed:</p>
                <ul className="list-disc pl-5 text-gray-300">
                  {entry.failedRepos.map((repo, i) => <li key={`fail-${i}`}>{repo}</li>)}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BulkHistoryPanel = ({ isOpen, onClose }) => {
  const { history, clearHistory } = useHistoryStore();

  const exportCSV = () => {
    if (history.length === 0) return;
    const header = ['ID', 'Timestamp', 'Action Type', 'Success Count', 'Failed Count', 'Successful Repos', 'Failed Repos'];
    const rows = history.map(entry => [
      entry.id,
      entry.timestamp,
      entry.actionType,
      entry.successCount,
      entry.failedCount,
      `"${(entry.successfulRepos || []).join(';')}"`,
      `"${(entry.failedRepos || []).join(';')}"`
    ]);
    
    const csvContent = [header, ...rows].map(e => e.join(',')).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'repo_reaper_history.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    if (history.length === 0) return;
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'repo_reaper_history.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Bulk Action History</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <p>No bulk actions performed in this session.</p>
                </div>
              ) : (
                history.map((entry) => (
                  <HistoryItem key={entry.id} entry={entry} />
                ))
              )}
            </div>

            <div className="p-5 border-t border-gray-800 bg-gray-900/50 flex flex-wrap gap-3">
              <button
                onClick={exportCSV}
                disabled={history.length === 0}
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
              >
                <Download className="w-4 h-4" /> CSV
              </button>
              <button
                onClick={exportJSON}
                disabled={history.length === 0}
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
              >
                <Download className="w-4 h-4" /> JSON
              </button>
              <button
                onClick={clearHistory}
                disabled={history.length === 0}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 border border-red-900/50 hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed text-red-400 rounded-lg transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" /> Clear History
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BulkHistoryPanel;
