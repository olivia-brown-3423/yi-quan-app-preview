
import React from 'react';
import { ChevronLeft, PlayCircle } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_VIDEOS } from '../../types';

export const VideoDetail = ({ params }: { params: { postId: string } }) => {
   const { popScreen } = useNav();
   const video = MOCK_VIDEOS.find(v => v.id === params.postId) || MOCK_VIDEOS[0];

   return (
      <div className="flex flex-col h-full bg-black">
         <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10">
            <button onClick={popScreen} className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white">
               <ChevronLeft size={24} />
            </button>
         </div>
         <div className="flex-1 flex items-center justify-center bg-gray-900 relative">
             <img src={video.videoInfo?.cover} className="w-full h-full object-contain opacity-80" alt="cover" />
             <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle size={64} className="text-white/50" />
             </div>
             <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-center space-x-2 mb-2">
                   <img src={video.user.avatar} className="w-10 h-10 rounded-full border border-white/50" alt="u" />
                   <div className="text-white">
                      <div className="font-bold text-sm">@{video.user.name}</div>
                      <div className="text-xs opacity-80">2小时前</div>
                   </div>
                </div>
                <p className="text-white text-sm mb-4 leading-relaxed line-clamp-2">{video.content}</p>
             </div>
         </div>
      </div>
   );
}
