
import React from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PROJECTS } from '../../types';

export const ProjectDetail = ({ params }: { params: { postId: string } }) => {
   const { popScreen } = useNav();
   const project = MOCK_PROJECTS.find(p => p.id === params.postId) || MOCK_PROJECTS[0];

   return (
      <div className="flex flex-col h-full bg-white">
         <div className="h-14 flex items-center justify-between px-4 border-b sticky top-0 bg-white z-10">
            <button onClick={popScreen} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
            <span className="font-bold text-lg">项目详情</span>
            <Share2 size={24} className="text-gray-600" />
         </div>
         <div className="flex-1 overflow-y-auto">
            {project.images && (
               <div className="w-full h-48 bg-gray-100">
                  <img src={project.images[0]} className="w-full h-full object-cover" alt="p" />
               </div>
            )}
            <div className="p-5">
               <h1 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h1>
               <div className="flex items-center space-x-3 mb-6">
                  <img src={project.user.avatar} className="w-12 h-12 rounded-full" alt="u" />
                  <div>
                     <div className="font-bold text-gray-900">{project.user.name}</div>
                     <div className="text-xs text-gray-500">发起人 · 信用分 780</div>
                  </div>
               </div>
               <h3 className="font-bold text-lg text-gray-900 mb-3">项目介绍</h3>
               <p className="text-gray-700 leading-relaxed mb-6">{project.content}</p>
            </div>
         </div>
         <div className="p-3 border-t flex space-x-3 pb-safe">
            <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-full font-medium text-sm">
               联系发起人
            </button>
         </div>
      </div>
   );
}
