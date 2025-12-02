
import React, { useState } from 'react';
import { ChevronLeft, Volume2, MessageCircle, File as FileIcon } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_CHANNELS } from '../../types';

export const ChannelDetail = ({ params }: { params: any }) => {
  const { popScreen, pushScreen } = useNav();
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'files'>('home');

  const channel = MOCK_CHANNELS.find(c => c.name === params.title) || {
    name: params.title || '未知频道',
    members: params.count || 10,
    resources: 100,
    description: '这是一个频道的简介...',
    cover: 'https://picsum.photos/id/1018/300/300',
    ownerId: 'unknown',
    announcements: []
  };

  const isOwner = channel.ownerId === 'me';

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <div className="h-48 w-full relative">
         <img src={channel.cover} className="w-full h-full object-cover" alt="cover" />
         <div className="absolute inset-0 bg-black/30"></div>
         <button onClick={popScreen} className="absolute top-4 left-4 p-2 bg-black/20 rounded-full text-white backdrop-blur-md">
            <ChevronLeft size={20} />
         </button>
         <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl font-bold mb-1">{channel.name}</h1>
            <div className="text-xs opacity-80 flex space-x-3">
               <span>频道号: 8848123</span>
               <span>{channel.members} 成员</span>
            </div>
         </div>
         <div className="absolute bottom-4 right-4 flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold">
               {isOwner ? '管理' : '+ 加入'}
            </button>
         </div>
      </div>

      <div className="bg-white flex border-b px-4">
         {[
           {id: 'home', label: '主页'},
           {id: 'chat', label: '群聊'},
           {id: 'files', label: '资源'},
         ].map(tab => (
           <div 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-4 py-3 text-sm font-medium cursor-pointer ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
           >
              {tab.label}
           </div>
         ))}
      </div>

      <div className="flex-1 overflow-y-auto">
         {activeTab === 'home' && (
            <div className="p-4 space-y-4">
               <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                     <h3 className="font-bold text-gray-900 flex items-center"><Volume2 size={16} className="mr-2 text-orange-500" /> 公告</h3>
                     <span className="text-xs text-gray-400">更多</span>
                  </div>
                  <div className="space-y-2">
                     {(channel.announcements || ['暂无公告']).map((a, i) => (
                        <div key={i} className="text-sm text-gray-600 truncate">• {a}</div>
                     ))}
                  </div>
               </div>
               <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">简介</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{channel.description}</p>
               </div>
            </div>
         )}
         {activeTab === 'chat' && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
               <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle size={32} />
               </div>
               <h3 className="font-bold text-lg mb-2">加入群聊</h3>
               <p className="text-gray-500 text-sm mb-6">与 {channel.members} 位成员一起讨论</p>
               <button 
                  onClick={() => pushScreen({ name: 'chat_detail', params: { title: channel.name, count: channel.members } })}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
               >
                  进入群聊
               </button>
            </div>
         )}
         {activeTab === 'files' && (
            <div className="p-4 space-y-3">
               {[1,2,3].map(i => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                     <div className="w-10 h-10 bg-red-100 text-red-500 rounded flex items-center justify-center mr-3">
                        <FileIcon size={20} />
                     </div>
                     <div className="flex-1">
                        <div className="font-medium text-sm">行业标准文档_v{i}.0.pdf</div>
                        <div className="text-xs text-gray-400">2.5MB · 2023-11-20</div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}
