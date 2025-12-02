
import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useNav } from '../../context/NavContext';

export const SearchPage = () => {
  const { popScreen } = useNav();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center p-3 border-b border-gray-100">
         <div className="flex-1 bg-gray-100 rounded-lg flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              autoFocus
              type="text" 
              placeholder="搜索联系人、群聊、聊天记录" 
              className="bg-transparent text-sm flex-1 focus:outline-none text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <button onClick={popScreen} className="ml-3 text-sm text-blue-600 font-medium">取消</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
         {!searchTerm && (
           <div className="mb-6">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="text-sm font-bold text-gray-900">搜索历史</h3>
                 <Trash2 size={14} className="text-gray-400" />
               </div>
               <div className="flex flex-wrap gap-2">
                 {['在线分析仪', '聚仪堂', '何刺刺'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                     {tag}
                   </span>
                 ))}
               </div>
           </div>
         )}
      </div>
    </div>
  );
};
