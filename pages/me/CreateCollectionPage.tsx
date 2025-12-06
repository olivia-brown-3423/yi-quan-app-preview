
import React, { useState } from 'react';
import { ChevronLeft, Camera, Globe } from 'lucide-react';
import { useNav } from '../../context/NavContext';

export const CreateCollectionPage = () => {
  const { popScreen } = useNav();
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700">
           <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900">新建作品集</span>
        <button onClick={popScreen} className="text-blue-600 font-bold text-sm px-2">
           保存
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
         <div className="bg-gray-100 rounded-xl h-48 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 mb-6 cursor-pointer active:bg-gray-200 transition-colors">
            <Camera size={32} className="mb-2" />
            <span className="text-sm">点击设置封面</span>
         </div>

         <div className="space-y-6">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">标题</label>
               <input 
                 type="text" 
                 placeholder="例如：我的2024年度影像记录" 
                 className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
               />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">简介</label>
               <textarea 
                 placeholder="简单描述一下这个作品集的内容，记录灵感与故事..." 
                 className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 resize-none transition-colors"
                 value={desc}
                 onChange={(e) => setDesc(e.target.value)}
               />
            </div>

            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                     <Globe size={20} />
                  </div>
                  <div>
                     <div className="font-bold text-gray-900 text-sm">公开作品集</div>
                     <div className="text-xs text-gray-500">所有人可见</div>
                  </div>
               </div>
               <div 
                 onClick={() => setIsPublic(!isPublic)}
                 className={`w-12 h-7 rounded-full relative transition-colors cursor-pointer ${isPublic ? 'bg-blue-600' : 'bg-gray-300'}`}
               >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-all ${isPublic ? 'left-6' : 'left-1'}`}></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
