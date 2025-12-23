
import React, { useState, useEffect } from 'react';
import { getFinancialAdvice } from '../services/gemini';
import { Transaction } from '../types';

interface SmartAdvisorProps {
  transactions: Transaction[];
}

const SmartAdvisor: React.FC<SmartAdvisorProps> = ({ transactions }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const tip = await getFinancialAdvice(transactions);
      setAdvice(tip);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length > 0 && transactions.length % 3 === 0) { // Fetch periodically or on milestones
      fetchAdvice();
    } else if (transactions.length === 0) {
      setAdvice('Start adding transactions to get your personalized AI financial strategy.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions.length]);

  return (
    <div className="glass-card p-6 rounded-3xl border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fas fa-brain text-blue-400"></i>
          AI Financial Advisor
        </h2>
        <button 
          onClick={fetchAdvice}
          disabled={loading || transactions.length === 0}
          className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
          Refresh
        </button>
      </div>
      
      <div className="relative">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-white/5 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-white/5 animate-pulse rounded w-1/2"></div>
            <div className="h-4 bg-white/5 animate-pulse rounded w-2/3"></div>
          </div>
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line italic">
            "{advice || "Analyzing your spending patterns..."}"
          </p>
        )}
      </div>
      
      <div className="mt-4 flex items-center gap-2 opacity-50">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Powered by Gemini 3</span>
      </div>
    </div>
  );
};

export default SmartAdvisor;
