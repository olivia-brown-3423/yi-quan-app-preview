
import React from 'react';
import { ChevronLeft, Edit3, PlusCircle } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_COMMUNITY_FEED } from '../../types';

export const QADetail = ({ params }: { params: { postId: string } }) => {
   const { popScreen } = useNav();
   const qa = MOCK_COMMUNITY_FEED.find(p => p.id === params.postId) || MOCK_COMMUNITY_FEED[3];

   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white flex items-center px-2 border-b">
            <button onClick={popScreen} className="p-2"><ChevronLeft /></button>
         </div>
         <div className="flex-1 overflow-y-auto">
            <div className="bg-white p-5 mb-2">
               <h1 className="text-lg font-bold text-gray-900 mb-2">{qa.title}</h1>
               <div className="flex flex-wrap gap-2 mb-3">
                  {(qa.tags || []).map(t => <span key={t} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{t}</span>)}
               </div>
               <p className="text-sm text-gray-600 mb-4">{qa.content}</p>
               <div className="flex justify-between">
                  <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center"><Edit3 size={14} className="mr-1" />写回答</button>
                  <button className="text-gray-500 text-sm flex items-center"><PlusCircle size={14} className="mr-1" />邀请回答</button>
               </div>
            </div>
            <div className="bg-white p-4">
               <h3 className="font-bold text-gray-900 mb-4">全部回答 ({qa.stats.comments})</h3>
               <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                     <img src="https://picsum.photos/id/1011/50/50" className="w-6 h-6 rounded-full" alt="avatar" />
                     <span className="text-sm font-medium text-gray-800">仪表老司机</span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">这种情况一般是因为电极内的KCL溶液自然挥发导致的。</p>
                  <div className="text-xs text-gray-400">2023-11-02 · 12 赞同</div>
               </div>
            </div>
         </div>
      </div>
   );
};
