
import React from 'react';
import { PlusCircle, MapPin, Hash, ChevronLeft } from 'lucide-react';
import { useNav } from '../../context/NavContext';

export const PublishPage = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-14 flex items-center justify-between px-4 border-b">
         <button onClick={popScreen} className="text-gray-600">取消</button>
         <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">发布</button>
      </div>
      <div className="p-4">
         <textarea 
            placeholder="分享你的新鲜事..." 
            className="w-full h-32 text-base resize-none focus:outline-none placeholder:text-gray-400"
         ></textarea>
         <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
               <PlusCircle size={32} />
            </div>
         </div>
         <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
               <div className="flex items-center space-x-2 text-gray-600"><MapPin size={20} /><span className="text-sm">所在位置</span></div>
               <ChevronLeft className="rotate-180 text-gray-300" size={16} />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
               <div className="flex items-center space-x-2 text-gray-600"><Hash size={20} /><span className="text-sm">添加话题</span></div>
               <ChevronLeft className="rotate-180 text-gray-300" size={16} />
            </div>
         </div>
      </div>
    </div>
  );
};
