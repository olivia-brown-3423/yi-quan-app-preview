
import React from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { useNav } from '../../context/NavContext';

export const CreateChannel = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center px-4 shrink-0 relative">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700 absolute left-4">
          <ChevronLeft size={24} />
        </button>
        <span className="w-full text-center font-medium text-lg text-gray-900">创建频道</span>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
           <div className="w-24 h-24 bg-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-500 mb-2 border-2 border-dashed border-gray-300">
             <Camera size={32} />
             <span className="text-xs mt-1">添加头像 *</span>
           </div>
        </div>
        <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col space-y-1">
             <label className="text-sm font-medium text-gray-700">频道名称 <span className="text-red-500">*</span></label>
             <input type="text" placeholder="3-15个字" className="bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col space-y-1">
             <label className="text-sm font-medium text-gray-700">频道简介 <span className="text-red-500">*</span></label>
             <textarea placeholder="介绍你的频道，10-200个字" className="bg-gray-50 rounded-lg p-3 text-sm h-24 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
          </div>
        </div>
        <button onClick={popScreen} className="w-full bg-blue-500 text-white font-medium py-3 rounded-full mt-8 shadow-lg hover:bg-blue-600 active:scale-95 transition-all">
          立即创建
        </button>
      </div>
    </div>
  );
};
