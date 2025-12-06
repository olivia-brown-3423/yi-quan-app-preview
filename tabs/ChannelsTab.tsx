
import React, { useState, useRef } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Hash, 
  User, 
  Music2, 
  Plus,
  Search,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MOCK_CHANNELS, MOCK_VIDEOS } from '../types';
import { useNav } from '../context/NavContext';

export const ChannelsTab = () => {
  const { pushScreen } = useNav();
  const [activeTab, setActiveTab] = useState<'recommend' | 'mine'>('recommend');

  // Generate a mixed feed where videos belong to specific channels
  const CHANNEL_FEED = [
    {
      id: 'f1',
      channel: MOCK_CHANNELS[0], // Expo
      video: MOCK_VIDEOS[0],
      desc: 'This year\'s exhibition site is crowded with people! So many new technologies.',
      music: 'Exhibition Live Audio - Original'
    },
    {
      id: 'f2',
      channel: MOCK_CHANNELS[1], // Tech Group
      video: MOCK_VIDEOS[1],
      desc: 'Encountered a difficult problem during on-site debugging, seeking help from the bosses in the group!',
      music: 'Engineer\'s Daily BGM'
    },
    {
      id: 'f3',
      channel: MOCK_CHANNELS[0],
      video: MOCK_VIDEOS[3],
      desc: 'Unboxing the new analyzer, the details are amazing.',
      music: 'Technology Frontier'
    },
    {
      id: 'f4',
      channel: MOCK_CHANNELS[2], // Personal Garden
      video: MOCK_VIDEOS[2],
      desc: 'Share a piece of my quiet time.',
      music: 'Relaxing Moment'
    },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
       {/* Global Top Tabs (Transparent Overlay) */}
       <div className="absolute top-0 left-0 w-full z-30 flex justify-between items-center px-4 pt-4 pb-2 bg-gradient-to-b from-black/60 to-transparent">
         <div className="w-8">
            <Search className="text-white/80" size={24} onClick={() => pushScreen({ name: 'search' })} />
         </div>
         <div className="flex space-x-6">
           <button 
             onClick={() => setActiveTab('mine')}
             className={`text-base font-medium transition-colors ${activeTab === 'mine' ? 'text-white border-b-2 border-white pb-1' : 'text-white/60'}`}
           >
             关注
           </button>
           <button 
             onClick={() => setActiveTab('recommend')}
             className={`text-base font-medium transition-colors ${activeTab === 'recommend' ? 'text-white border-b-2 border-white pb-1' : 'text-white/60'}`}
           >
             推荐
           </button>
         </div>
         <div className="w-8 flex justify-end">
            <Plus className="text-white/80" size={28} onClick={() => pushScreen({ name: 'create_channel' })} />
         </div>
       </div>

       {/* Main Content Area */}
       <div className="flex-1 overflow-y-auto snap-y snap-mandatory no-scrollbar bg-gray-900">
         {activeTab === 'recommend' ? (
           CHANNEL_FEED.map((item, index) => (
              <div key={item.id} className="w-full h-full snap-start relative bg-gray-800">
                 {/* Video/Image Cover */}
                 <img 
                    src={item.video.videoInfo?.cover} 
                    className="absolute inset-0 w-full h-full object-cover opacity-90" 
                    alt="video-cover" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>

                 {/* TOP CHANNEL HEADER (Floating) */}
                 <div className="absolute top-16 left-0 w-full px-4 flex justify-between items-start z-20 pointer-events-none">
                    {/* Spacer to balance layout */}
                    <div className="w-10"></div> 
                    
                    {/* Center: User Name Pill (Formerly Channel Name) */}
                    <div 
                      className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center space-x-2 shadow-lg pointer-events-auto cursor-pointer active:scale-95 transition-transform"
                      onClick={() => pushScreen({ name: 'user_profile', params: { id: item.video.user.id } })}
                    >
                       <User size={14} className="text-blue-400" />
                       <span className="text-xs font-bold tracking-wide truncate max-w-[150px]">{item.video.user.name}</span>
                       <span className="w-1 h-1 rounded-full bg-white/50"></span>
                       <span className="text-[10px] text-white/80">进入主页</span>
                    </div>

                    {/* Right: Chat Button (Links to Personal Chat) - UPDATED TO BLUE */}
                    <button 
                       className="w-11 h-11 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/30 active:scale-90 transition-transform pointer-events-auto border border-blue-400/50 hover:bg-blue-500"
                       onClick={() => pushScreen({ name: 'chat_detail', params: { title: item.video.user.name } })}
                    >
                       <MessageCircle size={22} fill="currentColor" className="text-white" />
                    </button>
                 </div>

                 {/* Right Sidebar Interaction */}
                 <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-6 z-20 w-14">
                    {/* User Avatar */}
                    <div className="relative mb-2">
                       <img 
                         src={item.video.user.avatar} 
                         className="w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-pointer" 
                         onClick={() => pushScreen({ name: 'user_profile', params: { id: item.video.user.id } })}
                       />
                       <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-white">
                          <Plus size={10} className="text-white" />
                       </div>
                    </div>

                    {/* Join Channel Button */}
                    <div className="flex flex-col items-center animate-in slide-in-from-right duration-500 delay-100 pb-2">
                        <button 
                            className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/30 active:scale-90 transition-transform border border-white/30 backdrop-blur-md group relative overflow-hidden"
                            onClick={() => pushScreen({ name: 'channel_detail', params: { title: item.channel.name, count: item.channel.members } })}
                        >
                           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                           <Hash size={18} className="text-white relative z-10" />
                        </button>
                        <span className="text-[10px] font-medium text-white/90 shadow-black drop-shadow-md mt-1.5 tracking-wide">加入频道</span>
                    </div>

                    {/* Likes */}
                    <div className="flex flex-col items-center space-y-1">
                       <Heart size={30} className="text-white drop-shadow-md cursor-pointer active:scale-75 transition-transform" />
                       <span className="text-xs font-medium shadow-black drop-shadow-md">{item.video.stats.likes}</span>
                    </div>

                    {/* Comments */}
                    <div className="flex flex-col items-center space-y-1">
                       <MessageCircle size={30} className="text-white drop-shadow-md cursor-pointer" />
                       <span className="text-xs font-medium shadow-black drop-shadow-md">{item.video.stats.comments}</span>
                    </div>

                    {/* Share */}
                    <div className="flex flex-col items-center space-y-1">
                       <Share2 size={30} className="text-white drop-shadow-md cursor-pointer" />
                       <span className="text-xs font-medium shadow-black drop-shadow-md">分享</span>
                    </div>
                 </div>

                 {/* Bottom Info (Personal) */}
                 <div className="absolute bottom-4 left-0 w-full px-4 pb-16 z-20 pointer-events-none">
                    <div className="max-w-[80%] pointer-events-auto">
                       <div 
                         className="font-bold text-lg mb-2 text-white drop-shadow-md flex items-center cursor-pointer"
                         onClick={() => pushScreen({ name: 'user_profile', params: { id: item.video.user.id } })}
                       >
                          @{item.video.user.name}
                       </div>
                       <p className="text-sm text-white/90 leading-relaxed mb-3 drop-shadow-md line-clamp-2">
                          {item.desc}
                       </p>
                       <div className="flex items-center text-white/70 text-xs space-x-2">
                          <Music2 size={12} className="animate-spin-slow" />
                          <div className="w-32 overflow-hidden">
                             <div className="whitespace-nowrap">{item.music}</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           ))
         ) : (
           /* Simple 'Mine' Tab View */
           <div className="min-h-full bg-gray-50 pt-16 px-4 pb-20">
              <div className="text-gray-500 text-sm mb-4 flex items-center justify-center">
                 <Hash size={14} className="mr-1"/> 我关注的频道更新
              </div>
              <div className="grid grid-cols-2 gap-3">
                 {CHANNEL_FEED.slice(0,2).map(item => (
                    <div key={'mine-'+item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" onClick={() => pushScreen({ name: 'channel_detail', params: { title: item.channel.name } })}>
                       <div className="aspect-[3/4] bg-gray-200 relative">
                          <img src={item.video.videoInfo?.cover} className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-md">
                             {item.channel.name}
                          </div>
                       </div>
                       <div className="p-2">
                          <div className="text-sm font-bold text-gray-900 line-clamp-2">{item.desc}</div>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                             <img src={item.video.user.avatar} className="w-4 h-4 rounded-full mr-1" />
                             {item.video.user.name}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         )}
       </div>
    </div>
  );
};
