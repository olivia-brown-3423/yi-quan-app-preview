
import React, { useState } from 'react';
import { ChevronLeft, Search, CheckCircle, Circle } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { FOLLOWED_FRIENDS } from '../../types';

export const CreateGroupPage = () => {
   const { popScreen } = useNav();
   const [selected, setSelected] = useState<string[]>([]);
   
   const toggleSelect = (id: string) => {
      if (selected.includes(id)) {
         setSelected(selected.filter(i => i !== id));
      } else {
         setSelected([...selected, id]);
      }
   }

   return (
      <div className="flex flex-col h-full bg-white">
         <div className="h-14 bg-white border-b flex items-center justify-between px-4">
             <div className="flex items-center">
               <button onClick={popScreen} className="mr-3"><ChevronLeft /></button>
               <span className="font-medium text-lg">选择联系人</span>
             </div>
             <button 
               className={`px-4 py-1.5 rounded text-sm font-medium ${selected.length > 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}
               disabled={selected.length === 0}
             >
                完成 {selected.length > 0 && `(${selected.length})`}
             </button>
         </div>
         <div className="p-3 bg-gray-50">
            <div className="bg-white rounded px-3 py-1.5 flex items-center text-sm">
               <Search size={16} className="text-gray-400 mr-2" />
               <input type="text" placeholder="搜索" className="flex-1 focus:outline-none" />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            <div className="bg-gray-100 px-4 py-1 text-xs text-gray-500 font-bold">星标朋友</div>
            {FOLLOWED_FRIENDS.map(f => (
               <div 
                  key={f.id} 
                  className="flex items-center px-4 py-3 border-b border-gray-50 cursor-pointer"
                  onClick={() => toggleSelect(f.id)}
               >
                  <div className="mr-4">
                     {selected.includes(f.id) ? 
                        <CheckCircle className="text-green-500 fill-current" /> : 
                        <Circle className="text-gray-300" />
                     }
                  </div>
                  <img src={f.avatar} className="w-10 h-10 rounded-lg mr-3" alt="avatar" />
                  <span className="text-gray-900 font-medium">{f.name}</span>
               </div>
            ))}
         </div>
      </div>
   );
}
