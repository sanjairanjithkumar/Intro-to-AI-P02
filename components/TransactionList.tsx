
import React from 'react';
import { Transaction, TransactionType, Category } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case Category.FOOD: return 'fa-utensils';
    case Category.TRAVEL: return 'fa-plane';
    case Category.RENT: return 'fa-house';
    case Category.SHOPPING: return 'fa-bag-shopping';
    case Category.EMI: return 'fa-calendar-check';
    case Category.ENTERTAINMENT: return 'fa-gamepad';
    case Category.HEALTH: return 'fa-heart-pulse';
    case Category.SALARY: return 'fa-money-bill-wave';
    default: return 'fa-receipt';
  }
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 py-20">
        <i className="fas fa-folder-open text-4xl opacity-20"></i>
        <p className="text-sm font-medium">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((t) => (
        <div 
          key={t.id} 
          className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group animate-fade-in"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            t.type === TransactionType.INCOME 
              ? 'bg-emerald-500/10 text-emerald-400' 
              : 'bg-rose-500/10 text-rose-400'
          }`}>
            <i className={`fas ${getCategoryIcon(t.category)} text-lg`}></i>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{t.note}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-gray-500 uppercase font-bold">{t.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/10"></span>
              <span className="text-[10px] text-gray-500">{new Date(t.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="text-right">
            <p className={`font-bold ${
              t.type === TransactionType.INCOME ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount.toLocaleString()}
            </p>
            <button 
              onClick={() => onDelete(t.id)}
              className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline mt-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
