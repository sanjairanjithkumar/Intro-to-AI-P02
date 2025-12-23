
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, TransactionType, Category } from './types';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import SmartAdvisor from './components/SmartAdvisor';

const STORAGE_KEY = 'luxespend_transactions';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      income,
      expenses,
      balance: income - expenses
    };
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const resetData = () => {
    if (confirm("Are you sure you want to delete all transactions? This cannot be undone.")) {
      setTransactions([]);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-8 bg-[#0a0b10] text-gray-100">
      <header className="max-w-6xl mx-auto px-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            LuxeSpend
          </h1>
          <p className="text-gray-400 text-sm">Elevate your financial clarity</p>
        </div>
        <button 
          onClick={resetData}
          className="text-xs text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest font-bold"
        >
          Reset All
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Overview */}
        <div className="lg:col-span-8 space-y-8">
          <SummaryCards 
            balance={totals.balance}
            income={totals.income}
            expenses={totals.expenses}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-3xl">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <i className="fas fa-chart-pie text-blue-400"></i>
                Spending Analysis
              </h2>
              <ExpenseChart transactions={transactions} />
            </div>
            
            <div className="space-y-6">
              <SmartAdvisor transactions={transactions} />
              <div className="glass-card p-6 rounded-3xl">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <i className="fas fa-plus-circle text-emerald-400"></i>
                  Quick Add
                </h2>
                <TransactionForm onAdd={addTransaction} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Transactions */}
        <div className="lg:col-span-4 glass-card rounded-3xl flex flex-col overflow-hidden max-h-[calc(100vh-160px)]">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold flex items-center justify-between">
              <span>Recent Activity</span>
              <span className="text-xs font-normal text-gray-500">{transactions.length} items</span>
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction} 
            />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 glass-card border-t border-white/10 md:hidden flex justify-around items-center z-50 px-6">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-gray-500'}`}
        >
          <i className="fas fa-home"></i>
          <span className="text-[10px] uppercase font-bold">Dash</span>
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'transactions' ? 'text-blue-400' : 'text-gray-500'}`}
        >
          <i className="fas fa-list"></i>
          <span className="text-[10px] uppercase font-bold">List</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
