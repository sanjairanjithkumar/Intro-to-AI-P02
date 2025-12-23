
import React, { useState } from 'react';
import { TransactionType, Category, Transaction } from '../types';

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(Category.OTHER);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    onAdd({
      amount: parseFloat(amount),
      type,
      category,
      date,
      note: note || category
    });

    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex bg-white/5 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setType(TransactionType.EXPENSE)}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            type === TransactionType.EXPENSE ? 'bg-rose-500/20 text-rose-400' : 'text-gray-400'
          }`}
        >
          EXPENSE
        </button>
        <button
          type="button"
          onClick={() => setType(TransactionType.INCOME)}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            type === TransactionType.INCOME ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400'
          }`}
        >
          INCOME
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-xl font-bold"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 focus:outline-none text-sm appearance-none"
          >
            {Object.values(Category).map(cat => (
              <option key={cat} value={cat} className="bg-[#1a1c24]">{cat}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Note (Optional)</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What was this for?"
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 focus:outline-none text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 glow-button mt-4"
      >
        Save Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
