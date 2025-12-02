
import React, { useState } from 'react';
import { ChevronRight, Heart, MessageCircle, Share2, Hash, Plus } from 'lucide-react';
import { MOCK_CHANNELS } from '../types';
import { useNav } from '../context/NavContext';

export const ChannelsTab = () => {
  const { pushScreen } = useNav();
  const [activeTab, setActiveTab] = useState<'recommend' | 'mine'>('recommend');

  const myChannels = MOCK_CHANNELS.filter(c => c.ownerId === 'me' || c.members > 1000);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white relative">
       <div className="absolute top-0 w-full z-20 flex justify-center pt-4 space-x-6">
         <button 
           onClick={() => setActiveTab('recommend')}
           className={`text-lg transition-colors ${activeTab === 'recommend' ? 'font-bold border-b-2 border-white pb-1' : 'text-gray-400'}`}
         >
           频道
         </button>
         <button 
           onClick={() => setActiveTab('mine')}
           className={`text-lg transition-colors ${activeTab === 'mine' ? 'font-bold border-b-2 border-white pb-1' : 'text-gray-400'}`}
         >
           我的频道
         </button>
       </div>

       <div className="flex-1 overflow-hidden relative">
         {activeTab === 'recommend' ? (
           <div className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar">
             {MOCK_CHANNELS.map((ch) => (
                <div key={ch.id} className="w-full h-full shrink-0 snap-center relative flex flex-col justify-end pb-20 bg-gray-800">
                   <img src={ch.cover} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="cover" />
                   
                   <div className="relative z-10 px-4 mb-10">
                     <div 
                        onClick={() => pushScreen({ name: 'channel_detail', params: { title: ch.name } })}
                        className="cursor-pointer"
                     >
                       <h2 className="text-2xl font-bold mb-2 flex items-center">
                          @{ch.name} <ChevronRight className="ml-1 opacity-70" />
                       </h2>
                       <p className="text-sm text-gray-200 mb-4 line-clamp-2">{ch.description}</p>
                     </div>
                     <div className="flex space-x-4">
                       <button 
                        onClick={() => pushScreen({ name: 'chat_detail', params: { title: ch.name, count: ch.members } })}
                        className="bg-blue-600 px-6 py-2 rounded-full font-medium active:scale-95 transition-transform shadow-lg shadow-blue-900/50"
                       >
                         进入群聊
                       </button>
                       <button className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full font-medium">
                         加入频道
                       </button>
                     </div>
                   </div>

                   <div className="absolute right-2 bottom-32 flex flex-col items-center space-y-6">
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center mb-1">
                          <Heart size={20} />
                        </div>
                        <span className="text-xs text-white/80">{ch.members}</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center mb-1">
                          <MessageCircle size={20} />
                        </div>
                        <span className="text-xs text-white/80">{ch.resources}</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center mb-1">
                          <Share2 size={20} />
                        </div>
                        <span className="text-xs text-white/80">分享</span>
                     </div>
                   </div>
                </div>
             ))}
           </div>
         ) : (
           <div className="h-full bg-gray-100 overflow-y-auto pt-16 px-4">
              <div className="mb-6">
                 <h3 className="text-gray-900 font-bold mb-3 flex items-center">
                    <Hash size={18} className="mr-2 text-blue-500" /> 我创建的频道
                 </h3>
                 <div className="grid grid-cols-1 gap-3">
                    {MOCK_CHANNELS.filter(c => c.ownerId === 'me').map(ch => (
                      <div 
                        key={ch.id} 
                        className="bg-white p-4 rounded-xl shadow-sm flex items-center cursor-pointer active:scale-[0.99] transition-transform"
                        onClick={() => pushScreen({ name: 'channel_detail', params: { title: ch.name } })}
                      >
                         <img src={ch.cover} className="w-12 h-12 rounded-lg object-cover mr-3" />
                         <div className="flex-1">
                            <div className="font-bold text-gray-900">{ch.name}</div>
                            <div className="text-xs text-gray-500">{ch.members} 成员 · {ch.resources} 资源</div>
                         </div>
                         <button className="text-gray-400"><ChevronRight /></button>
                      </div>
                    ))}
                    {MOCK_CHANNELS.filter(c => c.ownerId === 'me').length === 0 && (
                       <div 
                          className="bg-white border-2 border-dashed border-gray-300 p-4 rounded-xl flex items-center justify-center text-gray-400 cursor-pointer"
                          onClick={() => pushScreen({ name: 'create_channel' })}
                       >
                          <Plus size={20} className="mr-2" /> 创建新频道
                       </div>
                    )}
                 </div>
              </div>

              <div>
                 <h3 className="text-gray-900 font-bold mb-3 flex items-center">
                    <Heart size={18} className="mr-2 text-red-500" /> 我加入的频道
                 </h3>
                 <div className="grid grid-cols-1 gap-3">
                    {myChannels.map(ch => (
                       <div 
                         key={ch.id} 
                         className="bg-white p-4 rounded-xl shadow-sm flex items-center cursor-pointer active:scale-[0.99] transition-transform"
                         onClick={() => pushScreen({ name: 'channel_detail', params: { title: ch.name } })}
                       >
                          <img src={ch.cover} className="w-12 h-12 rounded-lg object-cover mr-3" />
                          <div className="flex-1">
                             <div className="font-bold text-gray-900">{ch.name}</div>
                             <div className="text-xs text-gray-500 line-clamp-1">{ch.description}</div>
                          </div>
                          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                             进入
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
         )}
       </div>
    </div>
  );
};
