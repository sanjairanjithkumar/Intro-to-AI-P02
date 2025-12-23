
import React from 'react';

interface SummaryCardsProps {
  balance: number;
  income: number;
  expenses: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ balance, income, expenses }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Balance Card */}
      <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <i className="fas fa-wallet text-6xl"></i>
        </div>
        <p className="text-gray-400 text-sm font-medium mb-1">Total Balance</p>
        <h3 className={`text-3xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
          {formatCurrency(balance)}
        </h3>
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000" 
            style={{ width: '60%' }}
          ></div>
        </div>
      </div>

      {/* Income Card */}
      <div className="glass-card p-6 rounded-3xl relative overflow-hidden border-emerald-500/20 group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <i className="fas fa-arrow-trend-up text-6xl text-emerald-500"></i>
        </div>
        <p className="text-gray-400 text-sm font-medium mb-1">Total Income</p>
        <h3 className="text-3xl font-bold text-emerald-400">
          {formatCurrency(income)}
        </h3>
        <p className="text-xs text-emerald-500/60 mt-2 flex items-center gap-1">
          <i className="fas fa-caret-up"></i>
          Positive flow
        </p>
      </div>

      {/* Expense Card */}
      <div className="glass-card p-6 rounded-3xl relative overflow-hidden border-rose-500/20 group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <i className="fas fa-arrow-trend-down text-6xl text-rose-500"></i>
        </div>
        <p className="text-gray-400 text-sm font-medium mb-1">Total Expenses</p>
        <h3 className="text-3xl font-bold text-rose-400">
          {formatCurrency(expenses)}
        </h3>
        <p className="text-xs text-rose-500/60 mt-2 flex items-center gap-1">
          <i className="fas fa-caret-down"></i>
          Spending rate
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
