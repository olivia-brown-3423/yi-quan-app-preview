
import React from 'react';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_CHANNELS } from '../../types';

export const ChannelListSelector = () => {
  const { popScreen, pushScreen } = useNav();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700">
            <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900">频道列表</span>
        <div className="w-8"></div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
         <div className="mb-4 flex items-center text-sm text-gray-500">
            <Hash size={16} className="mr-1" />
            <span>选择一个频道进入主页</span>
         </div>
         {MOCK_CHANNELS.map(ch => (
             <div 
                key={ch.id}
                className="bg-white p-4 rounded-xl shadow-sm mb-3 flex items-center cursor-pointer active:scale-[0.98] transition-transform border border-gray-100 hover:border-blue-200"
                onClick={() => pushScreen({ name: 'channel_detail', params: { title: ch.name, count: ch.members } })}
             >
                <img src={ch.cover} className="w-12 h-12 rounded-lg object-cover mr-4 bg-gray-200" alt={ch.name} />
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{ch.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">{ch.description}</p>
                    <div className="flex items-center mt-1 space-x-2">
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{ch.members} 成员</span>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{ch.resources} 资源</span>
                    </div>
                </div>
                <ChevronRight className="text-gray-300 ml-2" size={20} />
             </div>
         ))}
      </div>
    </div>
  );
};