
import React from 'react';
import { ChevronLeft, AlertCircle, Plus, CreditCard } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_TRANSACTIONS } from '../../types';

export const WalletPage = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-48 bg-blue-600 p-6 text-white relative flex flex-col justify-between">
        <div>
           <button onClick={popScreen} className="p-2 -ml-2"><ChevronLeft /></button>
           <div className="mt-4 text-sm opacity-80">总资产 (仪豆)</div>
           <div className="text-4xl font-bold mt-1">1,230.00</div>
        </div>
        <div className="flex space-x-4">
           <button className="flex-1 bg-white/20 backdrop-blur-md text-white py-2 rounded-lg font-medium">充值</button>
           <button className="flex-1 bg-white text-blue-600 py-2 rounded-lg font-medium">提现</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start space-x-2">
            <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={16} />
            <div className="text-xs text-orange-700 leading-relaxed">
               <span className="font-bold">提现说明：</span> 平台默认按照 10:1 方式进行仪豆金额转换。例如：提现 1000 元人民币，需扣除 10,000 仪豆。
            </div>
         </div>

         <div className="bg-white rounded-xl overflow-hidden shadow-sm">
           <div className="px-4 py-3 text-sm font-bold text-gray-800 border-b flex justify-between items-center">
              <span>交易记录</span>
              <span className="text-xs text-gray-400 font-normal">全部 &gt;</span>
           </div>
           {MOCK_TRANSACTIONS.map(t => (
             <div key={t.id} className="flex justify-between items-center px-4 py-3 border-b last:border-0 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {t.amount > 0 ? <Plus size={16} /> : <CreditCard size={16} />}
                   </div>
                   <div>
                      <div className="text-sm font-medium text-gray-900">{t.desc}</div>
                      <div className="text-xs text-gray-400">{t.time}</div>
                   </div>
                </div>
                <div className={`text-sm font-bold ${t.amount > 0 ? 'text-green-500' : 'text-gray-900'}`}>
                  {t.amount > 0 ? '+' : ''}{t.amount}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
