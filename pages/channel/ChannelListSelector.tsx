
import React from 'react';
import { ChevronLeft, Search, Hash, MoreHorizontal } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_CHANNELS } from '../../types';

export const ChannelListSelector = ({ params }: { params?: { title?: string, userId?: string } }) => {
  const { popScreen, pushScreen } = useNav();
  
  const pageTitle = params?.title || '频道列表';
  const userId = params?.userId;

  // Filter logic for channels
  let channels = MOCK_CHANNELS;
  if (userId) {
      // In a real app, query backend for channels owned by userId.
      // For mock:
      const owned = MOCK_CHANNELS.filter(c => c.ownerId === userId);
      
      if (owned.length > 0) {
          channels = owned;
      } else if (userId === 'me') {
          // If viewing my own profile and no channels found in mock, fallback to created mock ones
          channels = MOCK_CHANNELS.filter(c => c.ownerId === 'me'); 
      } else {
          // For demo purposes: if the specific user has no channels in mock data, 
          // show a subset of channels to demonstrate the UI instead of an empty state,
          // or show empty state if strict.
          // Let's simulate that "other users" have some channels.
          channels = [MOCK_CHANNELS[0], MOCK_CHANNELS[1]];
      }
  }

  // Enrich data for display (simulate tags, avatars)
  const displayChannels = channels.map(ch => ({
      ...ch,
      tags: ['频道号: ' + (parseInt(ch.id.replace(/\D/g, '')) + 1000), ch.members + ' 人加入'],
      avatars: [
          `https://picsum.photos/seed/${ch.id}av1/50/50`, 
          `https://picsum.photos/seed/${ch.id}av2/50/50`, 
          `https://picsum.photos/seed/${ch.id}av3/50/50`
      ]
  }));

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700">
            <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900">{pageTitle}</span>
        <button className="p-2 -mr-2 text-gray-700">
            <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-4 space-y-6">
         {/* Search Bar */}
         <div className="bg-gray-100 rounded-full flex items-center justify-center py-2 text-gray-400 text-sm mb-4 cursor-pointer">
             <Search size={16} className="mr-2" />
             <span>搜索频道...</span>
         </div>

         {displayChannels.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                 <Hash size={48} className="mb-2 opacity-30" />
                 <span>该用户暂无公开频道</span>
             </div>
         ) : (
             displayChannels.map(channel => (
                <div 
                    key={channel.id} 
                    className="flex items-start group cursor-pointer active:opacity-70 transition-opacity"
                    onClick={() => pushScreen({ name: 'channel_detail', params: { title: channel.name, count: channel.members } })}
                >
                    {/* Left: Cover Image */}
                    <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100 mr-3">
                        <img src={channel.cover} className="w-full h-full object-cover" alt="cover" />
                    </div>

                    {/* Right: Info */}
                    <div className="flex-1 min-w-0 border-b border-gray-50 pb-4">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1">{channel.name}</h3>
                        </div>
                        
                        {/* Tags Row */}
                        <div className="flex items-center space-x-2 mb-1.5">
                            {channel.tags.map((tag, i) => (
                                <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${i === 0 ? 'bg-gray-100 text-gray-500' : 'text-gray-400'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2.5">
                            {channel.description || '暂无简介'}
                        </p>

                        {/* Bottom: Avatars + Button */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center pl-2">
                                {channel.avatars.map((avatar, i) => (
                                    <img key={i} src={avatar} className="w-5 h-5 rounded-full border border-white -ml-2 bg-gray-200" alt="member" />
                                ))}
                                <div className="w-5 h-5 rounded-full border border-white bg-gray-100 -ml-2 flex items-center justify-center text-[8px] text-gray-500 font-bold">
                                    +
                                </div>
                            </div>

                            <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform">
                                进入
                            </button>
                        </div>
                    </div>
                </div>
             ))
         )}
         
         <div className="text-center text-xs text-gray-300 py-4">
             — 已显示全部公开频道 —
         </div>
      </div>
    </div>
  );
};
