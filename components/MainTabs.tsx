
import React, { useState } from 'react';
import { 
  Search, Plus, MoreHorizontal, ChevronRight, 
  MessageCircle, UserPlus, FileText, Heart, Video, 
  ThumbsUp, MessageSquare as CommentIcon, Share2, AlertTriangle,
  Settings, ShoppingCart, CreditCard, Wallet, FilePlus, ChevronDown, Hash,
  PlayCircle, HelpCircle, File, Folder, MapPin, Target, Users, ArrowRight
} from 'lucide-react';
import { MOCK_MESSAGES, MOCK_COMMUNITY_FEED, CONTACT_GROUPS, MY_CHANNELS, FOLLOWED_FRIENDS, MOCK_CHANNELS, CURRENT_USER, MOCK_PRODUCTS, MOCK_MY_COMMENTS } from '../types';
import { useNav } from '../App';

// --- 1. Messages Tab ---
export const MessagesTab = () => {
  const { pushScreen } = useNav();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 relative z-10">
        <span className="font-medium text-lg text-gray-800">消息</span>
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-gray-600 relative">
          <UserPlus size={24} />
          {/* Action Menu Popup */}
          {showMenu && (
            <div className="absolute top-10 right-0 w-40 bg-white shadow-xl border rounded-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
              <MenuItem icon={<MessageCircle size={18} />} label="新建群聊" onClick={() => { setShowMenu(false); pushScreen({ name: 'create_group' }); }} />
              <MenuItem icon={<Hash size={18} />} label="创建频道" onClick={() => { setShowMenu(false); pushScreen({ name: 'create_channel' }); }} />
              <MenuItem icon={<UserPlus size={18} />} label="加好友/群" onClick={() => { setShowMenu(false); pushScreen({ name: 'add_friend' }); }} />
            </div>
          )}
        </button>
      </div>

      {/* Search Placeholder */}
      <div className="px-4 py-2 bg-white">
        <div 
          onClick={() => pushScreen({ name: 'search' })}
          className="bg-gray-100 rounded-lg flex items-center justify-center py-1.5 text-gray-400 text-sm cursor-pointer"
        >
          <Search size={16} className="mr-2" />
          <span>搜索</span>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {MOCK_MESSAGES.map((msg) => (
          <div 
            key={msg.id} 
            className="flex items-start px-4 py-3 bg-white border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => pushScreen({ name: 'chat_detail', params: { title: msg.sender, count: msg.isGroup ? 20 : undefined } })}
          >
            <div className="relative">
              <img src={msg.avatar} alt={msg.sender} className="w-12 h-12 rounded-lg object-cover" />
              {msg.unreadCount ? (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] flex items-center justify-center w-5 h-5 rounded-full border-2 border-white">
                  {msg.unreadCount}
                </span>
              ) : null}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium text-gray-900 truncate pr-2">{msg.sender}</h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-sm text-gray-700">
    <span className="mr-3 text-gray-500">{icon}</span>
    {label}
  </button>
);

// --- 2. Contacts Tab ---
export const ContactsTab = () => {
  const { pushScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4">
        <div className="w-8"></div> {/* Spacer */}
        <span className="font-medium text-lg text-gray-800">通讯录</span>
        <button onClick={() => pushScreen({ name: 'add_friend' })} className="p-2 text-gray-600">
          <UserPlus size={24} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-2 bg-gray-50">
        <div 
          onClick={() => pushScreen({ name: 'search' })}
          className="bg-white rounded-lg flex items-center justify-center py-1.5 text-gray-400 text-sm border cursor-pointer"
        >
          <Search size={16} className="mr-2" />
          <span>搜索</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Static Groups */}
        {CONTACT_GROUPS.map((group, idx) => (
          <div key={idx} className="flex items-center px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50">
            <div className={`w-10 h-10 rounded-lg ${group.color} flex items-center justify-center text-white mr-3`}>
              {group.icon === 'UserPlus' && <UserPlus size={20} />}
              {group.icon === 'MessageCircle' && <MessageCircle size={20} />}
              {group.icon === 'Hash' && <Hash size={20} />}
            </div>
            <span className="text-base font-medium">{group.title}</span>
          </div>
        ))}

        {/* My Channels */}
        <div className="bg-gray-100 px-4 py-1 text-xs text-gray-500 font-medium mt-2">我的频道</div>
        {MY_CHANNELS.map((ch, idx) => (
          <div 
            key={idx} 
            className="flex items-center px-4 py-3 border-b border-gray-50 cursor-pointer"
            onClick={() => pushScreen({ name: 'chat_detail', params: { title: ch.name, count: 500 } })}
          >
            <img src={ch.icon} className="w-10 h-10 rounded-lg mr-3 bg-gray-200" alt="icon" />
            <span className="text-base text-gray-800">{ch.name}</span>
          </div>
        ))}

        {/* Starred Friends */}
        <div className="bg-gray-100 px-4 py-1 text-xs text-gray-500 font-medium mt-2">☆ 关注好友</div>
        {FOLLOWED_FRIENDS.map((f, idx) => (
          <div 
            key={idx} 
            className="flex items-center px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50"
            onClick={() => pushScreen({ name: 'user_profile', params: { id: f.id } })}
          >
            <img src={f.avatar} className="w-10 h-10 rounded-lg mr-3" alt="avatar" />
            <span className="text-base text-gray-800">{f.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 3. Channels Tab (Video Feed) ---
export const ChannelsTab = () => {
  const { pushScreen } = useNav();
  const [activeTab, setActiveTab] = useState<'recommend' | 'mine'>('recommend');

  const myChannels = MOCK_CHANNELS.filter(c => c.ownerId === 'me' || c.members > 1000); // Mock filter

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white relative">
       {/* Top Overlay Tabs */}
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

       {/* Feed Content */}
       <div className="flex-1 overflow-hidden relative">
         {activeTab === 'recommend' ? (
           // Horizontal Swiper (Snap X)
           <div className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar">
             {MOCK_CHANNELS.map((ch) => (
                <div key={ch.id} className="w-full h-full shrink-0 snap-center relative flex flex-col justify-end pb-20 bg-gray-800">
                   {/* Background Image simulating video */}
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

                   {/* Right Side Actions */}
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
           // My Channels List
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

// --- 4. Community Tab ---
export const CommunityTab = () => {
  const { pushScreen } = useNav();
  const [subTab, setSubTab] = useState('dynamic');

  const getFilteredFeed = (type: string) => {
     if (type === 'dynamic') return MOCK_COMMUNITY_FEED.filter(i => i.type === 'dynamic' || !i.type);
     return MOCK_COMMUNITY_FEED.filter(i => i.type === type);
  };

  const renderContent = () => {
    const feed = getFilteredFeed(subTab);

    if (feed.length === 0) {
      return <div className="p-8 text-center text-gray-400">暂无内容</div>;
    }

    if (subTab === 'video') {
       return (
          <div className="flex-1 overflow-y-auto p-2">
             <div className="grid grid-cols-2 gap-2">
                {feed.map(item => (
                   <div 
                     key={item.id} 
                     className="bg-white rounded-lg overflow-hidden shadow-sm relative cursor-pointer group"
                     onClick={() => pushScreen({ name: 'video_detail', params: { postId: item.id } })}
                   >
                      <div className="relative aspect-[3/4]">
                         <img src={item.videoInfo?.cover} className="w-full h-full object-cover" />
                         <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">
                            {item.videoInfo?.duration}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <PlayCircle className="text-white" size={32} />
                         </div>
                      </div>
                      <div className="p-2">
                         <div className="text-sm font-medium line-clamp-2 text-gray-900 mb-1 leading-snug">{item.content}</div>
                         <div className="flex items-center justify-between text-xs text-gray-400">
                             <div className="flex items-center">
                                <img src={item.user.avatar} className="w-4 h-4 rounded-full mr-1" />
                                <span className="truncate max-w-[60px]">{item.user.name}</span>
                             </div>
                             <div className="flex items-center">
                                <Heart size={10} className="mr-0.5" />
                                {item.stats.likes}
                             </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       );
    }

    if (subTab === 'project') {
       return (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
             {feed.map(item => (
                <div 
                   key={item.id} 
                   className="bg-white p-4 rounded-xl shadow-sm cursor-pointer border border-transparent hover:border-blue-100 transition-colors"
                   onClick={() => pushScreen({ name: 'project_detail', params: { postId: item.id } })}
                >
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase
                           ${item.projectInfo?.status === 'recruiting' ? 'bg-green-100 text-green-600' : 
                             item.projectInfo?.status === 'funding' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                           {item.projectInfo?.status === 'recruiting' ? '招募中' : 
                            item.projectInfo?.status === 'funding' ? '众筹中' : '已完成'}
                        </span>
                        {item.tags?.map(t => <span key={t} className="text-xs text-gray-500 bg-gray-50 px-1 rounded">{t}</span>)}
                      </div>
                      <span className="text-xs text-gray-400">{item.time}</span>
                   </div>
                   
                   <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                   <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.content}</p>

                   {/* Progress */}
                   {item.projectInfo?.progress !== undefined && (
                      <div className="mb-3">
                         <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>进度 {item.projectInfo.progress}%</span>
                            {item.projectInfo.targetAmount && (
                               <span>目标 ¥{item.projectInfo.targetAmount.toLocaleString()}</span>
                            )}
                         </div>
                         <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${item.projectInfo.status === 'funding' ? 'bg-orange-500' : 'bg-green-500'}`} 
                              style={{ width: `${item.projectInfo.progress}%` }}
                            ></div>
                         </div>
                      </div>
                   )}

                   <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div className="flex items-center">
                         <img src={item.user.avatar} className="w-5 h-5 rounded-full mr-2" />
                         <span className="text-xs text-gray-500">{item.user.name}</span>
                      </div>
                      <div className="flex space-x-4 text-gray-400 text-xs">
                         <span className="flex items-center"><Target size={12} className="mr-1" /> {item.projectInfo?.location || '远程'}</span>
                         <span className="flex items-center"><Users size={12} className="mr-1" /> {item.projectInfo?.roles?.length || 0} 岗位</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       );
    }

    return (
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {feed.map((item) => {
          if (item.type === 'article') {
            return (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50 transition-colors cursor-pointer flex justify-between"
                onClick={() => pushScreen({ name: 'article_detail', params: { postId: item.id } })}
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <div className="text-xs text-gray-400 flex items-center space-x-2">
                    <span>{item.user.name}</span>
                    <span>{item.time}</span>
                    <span>{item.stats.likes} 赞</span>
                  </div>
                </div>
                {item.images && <img src={item.images[0]} className="w-24 h-16 object-cover rounded" alt="cover" />}
              </div>
            );
          }
          if (item.type === 'qa') {
             return (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => pushScreen({ name: 'qa_detail', params: { postId: item.id } })}
              >
                 <div className="flex items-center space-x-2 mb-2">
                   <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded font-bold">问</span>
                   <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                 </div>
                 <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.content}</p>
                 <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex space-x-2">
                       {(item.tags || []).map(tag => <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded">{tag}</span>)}
                    </div>
                    <span>{item.stats.comments} 回答</span>
                 </div>
              </div>
             );
          }
          // Dynamic & Video fallback
          return (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => pushScreen({ name: 'community_detail', params: { postId: item.id } })}
            >
              <div className="flex items-center mb-3">
                <img src={item.user.avatar} className="w-10 h-10 rounded-full mr-3" alt="avatar" />
                <div>
                  <div className="font-medium text-gray-900">{item.user.name}</div>
                  <div className="text-xs text-gray-400">刚刚</div>
                </div>
              </div>
              
              <p className="text-gray-800 mb-3 text-base leading-relaxed">{item.content}</p>
              
              {item.images && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img src={item.images[0]} alt="content" className="w-full h-auto object-cover max-h-60" />
                </div>
              )}

              {item.hasVideo && (
                <div className="mb-3 rounded-lg overflow-hidden bg-black h-48 flex items-center justify-center relative">
                   <Video className="text-white w-12 h-12 opacity-80" />
                   <span className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">10:42</span>
                </div>
              )}

              <div className="flex items-center justify-between text-gray-500 text-sm mt-2 pt-2 border-t border-gray-50">
                 <span className="text-xs text-gray-400">{item.time}</span>
                 <div className="flex space-x-6">
                   <button className="flex items-center space-x-1 hover:text-red-500">
                     <Heart size={16} /> <span>{item.stats.likes}</span>
                   </button>
                   <button className="flex items-center space-x-1 hover:text-blue-500">
                     <CommentIcon size={16} /> <span>{item.stats.comments}</span>
                   </button>
                   <button className="flex items-center space-x-1 hover:text-green-500">
                     <Share2 size={16} />
                   </button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4">
        <div className="flex-1 flex justify-center">
            <span className="font-medium text-lg text-gray-800">社区</span>
        </div>
        <div className="absolute right-4 flex space-x-3 text-gray-600">
          <Search size={22} onClick={() => pushScreen({ name: 'search' })} />
          <Plus size={22} onClick={() => pushScreen({ name: 'publish' })} />
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex bg-white border-b text-sm text-gray-500 sticky top-0 z-10">
        {[
           { id: 'dynamic', label: '动态' },
           { id: 'video', label: '视频' },
           { id: 'qa', label: '问一问' },
           { id: 'article', label: '文章' },
           { id: 'project', label: '项目' }
        ].map((tab) => (
          <div 
            key={tab.id} 
            onClick={() => setSubTab(tab.id)}
            className={`flex-1 py-3 text-center cursor-pointer transition-all ${subTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : ''}`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Feed */}
      {renderContent()}
    </div>
  );
};

// --- 5. Me Tab ---
export const MeTab = () => {
  const { pushScreen } = useNav();
  const user = CURRENT_USER;
  const [activeTab, setActiveTab] = useState<'works' | 'showcase' | 'liked' | 'forward' | 'comments'>('works');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'works':
        return (
          <>
             <div className="flex px-4 py-2 space-x-4">
                {['动态', '视频', '文章', '问答', '项目'].map((t, i) => (
                  <span key={t} className={`text-xs px-3 py-1 rounded-full ${i === 0 ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {t}
                  </span>
                ))}
             </div>
             <div className="p-1 grid grid-cols-2 gap-1 overflow-y-auto pb-4">
                {/* Simulated Works */}
                {MOCK_COMMUNITY_FEED.map((item, idx) => (
                   <div 
                     key={idx} 
                     className="bg-gray-100 aspect-[3/4] relative rounded overflow-hidden cursor-pointer"
                     onClick={() => pushScreen({ name: 'community_detail', params: { postId: item.id } })}
                   >
                     {item.images ? (
                       <img src={item.images[0]} className="absolute inset-0 w-full h-full object-cover" alt="work" />
                     ) : (
                       <div className="absolute inset-0 flex items-center justify-center p-2 text-xs text-gray-500 text-center bg-gray-200">
                         {item.content.substring(0, 30)}...
                       </div>
                     )}
                     <div className="absolute bottom-2 left-2 text-white text-xs drop-shadow-md z-10">
                       <div className="font-bold mb-1 opacity-90 line-clamp-1">{item.title || item.content.substring(0, 10)}</div>
                       <div className="opacity-80">{item.stats.likes} 赞</div>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                   </div>
                ))}
             </div>
          </>
        );
      case 'showcase':
        return (
           <div className="flex-1 overflow-y-auto pb-4">
             {/* Seller Control */}
             <div className="px-4 py-2">
                <button 
                  onClick={() => pushScreen({ name: 'product_management' })}
                  className="w-full bg-blue-50 text-blue-600 border border-blue-200 rounded-lg py-2 text-sm font-medium flex items-center justify-center"
                >
                  <Plus size={16} className="mr-1" /> 橱窗管理 / 添加商品
                </button>
             </div>
             <div className="p-2 grid grid-cols-2 gap-2">
               {MOCK_PRODUCTS.filter(p => p.status === 'on_shelf').map(product => (
                 <div 
                   key={product.id} 
                   className="bg-white border rounded-lg overflow-hidden shadow-sm cursor-pointer"
                   onClick={() => pushScreen({ name: 'product_detail', params: { productId: product.id } })}
                 >
                    <div className="relative">
                      <img src={product.image} className="w-full h-32 object-cover" />
                      <div className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                         {product.type === 'file' ? '文件' : product.type === 'video_collection' ? '视频集' : '虚拟'}
                      </div>
                    </div>
                    <div className="p-2">
                       <div className="text-sm font-medium line-clamp-1">{product.title}</div>
                       <div className="flex items-center justify-between mt-1">
                          <div className="text-red-500 font-bold text-xs">
                             <span className="text-[10px]">仪豆 </span>
                             {product.price}
                          </div>
                          <div className="text-[10px] text-gray-400">已售 {product.sales}</div>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        );
      case 'liked':
        return (
          <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
             <div className="text-xs text-gray-500 p-3">我赞过的内容</div>
             {MOCK_COMMUNITY_FEED.slice(0, 3).map(item => (
                <div 
                  key={'like-'+item.id} 
                  className="bg-white p-3 mb-2 flex items-center cursor-pointer"
                  onClick={() => pushScreen({ name: 'community_detail', params: { postId: item.id } })}
                >
                   <img src={item.user.avatar} className="w-10 h-10 rounded-lg mr-3" />
                   <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">@{item.user.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.content || item.title}</div>
                   </div>
                   {item.images && <img src={item.images[0]} className="w-12 h-12 rounded object-cover ml-2" />}
                </div>
             ))}
          </div>
        );
      case 'forward':
        return (
          <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
             <div className="text-xs text-gray-500 p-3">我转发的内容</div>
             {MOCK_COMMUNITY_FEED.slice(1, 2).map(item => (
                <div 
                  key={'fwd-'+item.id} 
                  className="bg-white p-3 mb-2 cursor-pointer"
                  onClick={() => pushScreen({ name: 'community_detail', params: { postId: item.id } })}
                >
                   <div className="text-sm text-gray-800 mb-2">转发了 @{item.user.name} 的动态</div>
                   <div className="bg-gray-100 p-2 rounded flex items-center">
                      {item.images && <img src={item.images[0]} className="w-10 h-10 rounded mr-2" />}
                      <div className="text-xs text-gray-500 line-clamp-2">{item.content || item.title}</div>
                   </div>
                </div>
             ))}
          </div>
        );
      case 'comments':
        return (
          <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
             <div className="text-xs text-gray-500 p-3">我的评论</div>
             {MOCK_MY_COMMENTS.map(c => (
                <div 
                  key={c.id} 
                  className="bg-white p-3 mb-2 border-b border-gray-100 cursor-pointer"
                  onClick={() => pushScreen({ name: 'community_detail', params: { postId: c.targetId } })}
                >
                   <div className="text-sm text-gray-900 mb-2">{c.myContent}</div>
                   <div className="bg-gray-100 p-2 rounded text-xs text-gray-500 line-clamp-1">
                      原文: {c.targetContent}
                   </div>
                   <div className="text-[10px] text-gray-400 mt-2">{c.time}</div>
                </div>
             ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Profile Card */}
      <div className="bg-white p-5 pb-2 mb-2">
        {/* Top Controls */}
        <div className="flex justify-end mb-4">
          <Settings size={22} className="text-gray-600 cursor-pointer" onClick={() => pushScreen({ name: 'settings' })} />
        </div>

        {/* User Info */}
        <div className="flex items-start mb-4 cursor-pointer" onClick={() => pushScreen({ name: 'user_profile', params: { id: 'me' } })}>
          <div className="relative">
            <img src={user.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow" alt="me" />
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <div className="text-xs text-gray-400 mt-1">会员到期时间：2029.12.28</div>
          </div>
          <button className="text-sm px-3 py-1 border border-gray-300 rounded-full text-gray-600">
            编辑主页
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-between mb-4 px-2">
          {[
            { label: '获赞', val: user.stats?.likes },
            { label: '互关', val: user.stats?.mutuals },
            { label: '关注', val: user.stats?.following },
            { label: '粉丝', val: user.stats?.followers },
            { label: '仪豆', val: user.stats?.coins },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-bold text-gray-900 text-lg">{stat.val}</span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-500 mb-3">{user.bio}</p>

        {/* Tags */}
        <div className="flex space-x-2 mb-4">
           <span className="bg-blue-50 text-blue-500 text-xs px-2 py-0.5 rounded">女 · 20岁</span>
           <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">+ 添加所在地等标签</span>
        </div>

        {/* VIP Banner */}
        <div className="bg-gray-800 rounded-lg p-3 flex justify-between items-center text-amber-400 mb-2">
          <div className="flex items-center space-x-2">
             <div className="bg-amber-500 p-1 rounded-full text-white"><span className="text-xs font-bold">V</span></div>
             <span className="font-medium text-sm">至尊会员卡</span>
          </div>
          <button className="bg-amber-400 text-gray-900 text-xs px-3 py-1 rounded-full font-bold">立即开通</button>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="bg-white mb-2 py-4 flex justify-around">
         {[
           { icon: ShoppingCart, label: '购物车', action: () => {} },
           { icon: CreditCard, label: '待付款', action: () => {} },
           { icon: Wallet, label: '我的钱包', action: () => pushScreen({ name: 'wallet' }) },
           { icon: FileText, label: '我的收益', action: () => pushScreen({ name: 'wallet' }) },
           { icon: FilePlus, label: '全部订单', action: () => {} }
         ].map((item) => (
           <div 
             key={item.label} 
             className="flex flex-col items-center space-y-2 cursor-pointer active:opacity-50"
             onClick={item.action}
           >
              <item.icon size={24} className="text-gray-600" />
              <span className="text-xs text-gray-500">{item.label}</span>
           </div>
         ))}
      </div>

      {/* Content Tabs */}
      <div className="bg-white flex-1 flex flex-col min-h-[400px]">
        <div className="flex border-b">
           {[
             { id: 'works', label: '作品' },
             { id: 'showcase', label: '橱窗' },
             { id: 'liked', label: '赞过' },
             { id: 'forward', label: '转发' },
             { id: 'comments', label: '评论' }
           ].map((t) => (
             <div 
               key={t.id} 
               onClick={() => setActiveTab(t.id as any)}
               className={`flex-1 py-3 text-center text-sm cursor-pointer transition-colors ${activeTab === t.id ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-500'}`}
             >
               {t.label}
             </div>
           ))}
        </div>
        
        {/* Content Render */}
        <div className="flex-1 bg-white">
           {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
