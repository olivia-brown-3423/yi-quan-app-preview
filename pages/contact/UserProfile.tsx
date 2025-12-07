
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Share2, 
  MessageCircle, 
  Flag, 
  Ban, 
  UserMinus, 
  Send, 
  Star, 
  Lock, 
  Heart, 
  ChevronRight, 
  X, 
  UserPlus, 
  Hash, 
  PlayCircle,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Search,
  Filter,
  ShoppingBag
} from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { CURRENT_USER, FOLLOWED_FRIENDS, MOCK_COMMUNITY_FEED, MOCK_PRODUCTS, MOCK_CHANNELS, FeedItem } from '../../types';

export const UserProfile = ({ params }: { params: { id: string } }) => {
  const { popScreen, pushScreen } = useNav();
  const [showMenu, setShowMenu] = useState(false);
  const isMe = params.id === 'me';
  
  const user = isMe ? CURRENT_USER : (FOLLOWED_FRIENDS.find(u => u.id === params.id) || {
     ...CURRENT_USER,
     name: '未知用户',
     avatar: 'https://picsum.photos/id/64/200/200',
     id: params.id,
     stats: { likes: 0, mutuals: 0, following: 0, followers: 0, coins: 0 }
  });

  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'article' | 'topic'>('all');

  // Mock data fetching for this user
  const getUserFeed = () => {
     let feed = MOCK_COMMUNITY_FEED.filter(i => i.user.id === user.id);
     // If empty (because mock data is sparse), use some random items for demo
     if (feed.length === 0) {
        feed = MOCK_COMMUNITY_FEED.slice(0, 8); 
     }
     return feed;
  };

  const feed = getUserFeed();
  
  // Calculate counts for buttons
  const productCount = MOCK_PRODUCTS.filter(p => p.seller.id === user.id).length || 28; // Default mock
  const channelCount = MOCK_CHANNELS.filter(ch => ch.ownerId === user.id).length || 3; // Default mock

  const renderTabContent = () => {
    switch (activeTab) {
       case 'all':
          return (
             <div className="bg-gray-50 min-h-[300px] pb-4 space-y-2">
                {/* Pinned Post (Mock) */}
                <div className="bg-white p-4 flex items-start space-x-3">
                   <div className="bg-yellow-100 text-yellow-600 text-[10px] px-1.5 py-0.5 rounded font-bold mt-1">置顶</div>
                   <div className="flex-1">
                      <p className="text-gray-900 text-sm font-medium line-clamp-2">欢迎来到我的个人主页！这里记录了我的生活和工作点滴。</p>
                      <div className="mt-2 grid grid-cols-3 gap-1">
                         <img src="https://picsum.photos/id/1015/200/200" className="w-full aspect-square object-cover rounded" />
                         <img src="https://picsum.photos/id/1016/200/200" className="w-full aspect-square object-cover rounded" />
                         <img src="https://picsum.photos/id/1018/200/200" className="w-full aspect-square object-cover rounded" />
                      </div>
                   </div>
                </div>

                {feed.map(item => (
                   <FeedItemCard key={item.id} item={item} pushScreen={pushScreen} />
                ))}
             </div>
          );
       case 'video':
          return (
             <div className="p-1 grid grid-cols-2 gap-1 pb-4 bg-gray-50 min-h-[300px]">
                {feed.filter(i => i.hasVideo || i.type === 'video').map((item, idx) => (
                   <div key={idx} className="bg-gray-100 aspect-[3/4] relative rounded overflow-hidden cursor-pointer group" onClick={() => pushScreen({ name: 'video_detail', params: { postId: item.id } })}>
                     {item.videoInfo ? (
                        <img src={item.videoInfo.cover} className="absolute inset-0 w-full h-full object-cover" alt="work" />
                     ) : (
                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 text-xs">视频</div>
                     )}
                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="text-white drop-shadow-md" size={24} />
                     </div>
                     <div className="absolute bottom-2 left-2 right-2 text-white z-10">
                        <div className="text-xs line-clamp-2 font-medium mb-1 drop-shadow-md">{item.content}</div>
                        <div className="flex justify-between items-center text-[10px] opacity-90">
                            <span className="flex items-center"><PlayCircle size={10} className="mr-0.5"/> {item.videoInfo?.views || 1234}</span>
                            <span>{item.videoInfo?.duration || '00:30'}</span>
                        </div>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                   </div>
                ))}
                {feed.filter(i => i.hasVideo || i.type === 'video').length === 0 && (
                    <div className="col-span-2 py-12 flex flex-col items-center text-gray-400">
                        <PlayCircle size={32} className="mb-2 opacity-50"/>
                        <span className="text-xs">暂无视频</span>
                    </div>
                )}
             </div>
          );
       case 'article':
          return (
             <div className="bg-gray-50 min-h-[300px] pb-4 space-y-2">
                {feed.filter(i => i.type === 'article').map(item => (
                   <div 
                     key={item.id} 
                     className="bg-white p-4 flex justify-between cursor-pointer active:bg-gray-50 transition-colors"
                     onClick={() => pushScreen({ name: 'article_detail', params: { postId: item.id } })}
                   >
                      <div className="flex-1 pr-4 flex flex-col justify-between">
                         <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug">{item.title}</h3>
                         <div className="flex items-center text-xs text-gray-400 mt-2 space-x-2">
                            <span>{item.stats.likes} 赞</span>
                            <span>·</span>
                            <span>{item.stats.comments} 评论</span>
                            <span>·</span>
                            <span>{item.time}</span>
                         </div>
                      </div>
                      {item.images && (
                         <div className="w-28 h-20 shrink-0">
                            <img src={item.images[0]} className="w-full h-full object-cover rounded-lg bg-gray-100" />
                         </div>
                      )}
                   </div>
                ))}
                {feed.filter(i => i.type === 'article').length === 0 && (
                    <div className="py-12 flex flex-col items-center text-gray-400">
                        <FileText size={32} className="mb-2 opacity-50"/>
                        <span className="text-xs">暂无文章</span>
                    </div>
                )}
             </div>
          );
       case 'topic':
          return (
             <div className="bg-gray-50 min-h-[300px] pb-4 space-y-2">
                {feed.filter(i => i.type === 'dynamic' || i.type === 'qa').map(item => (
                   <FeedItemCard key={item.id} item={item} pushScreen={pushScreen} />
                ))}
                {feed.filter(i => i.type === 'dynamic' || i.type === 'qa').length === 0 && (
                    <div className="py-12 flex flex-col items-center text-gray-400">
                        <MessageSquare size={32} className="mb-2 opacity-50"/>
                        <span className="text-xs">暂无微话题</span>
                    </div>
                )}
             </div>
          );
       default:
          return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-start z-20">
         <button onClick={popScreen} className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-transform hover:bg-black/40">
            <ChevronLeft size={20} />
         </button>
         <div className="flex space-x-3">
             <button 
                className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-transform hover:bg-black/40"
             >
                <Search size={20} />
             </button>
             <button 
                onClick={() => setShowMenu(true)}
                className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-transform hover:bg-black/40"
             >
                <MoreHorizontal size={20} />
             </button>
         </div>
      </div>

      {/* Header Profile */}
      <div className="relative bg-white pb-2">
         {/* Cover */}
         <div className="h-48 w-full relative">
             <img src={`https://picsum.photos/seed/${user.id}_cover/600/400`} className="w-full h-full object-cover" alt="cover" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>
         </div>
         
         <div className="px-5 relative">
            {/* Avatar & Action Button Row */}
            <div className="flex justify-between items-end -mt-12 mb-3 relative z-10">
               <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                 <img src={user.avatar} className="w-full h-full object-cover" alt="avatar" />
               </div>
               
               <div className="flex space-x-2 mb-2">
                  {isMe ? (
                     <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold border border-gray-200 active:scale-95 transition-transform">
                        编辑资料
                     </button>
                  ) : (
                     <>
                        <button className="px-6 py-2 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg shadow-red-500/30 active:scale-95 transition-transform flex items-center">
                           <UserPlus size={16} className="mr-1" /> 关注
                        </button>
                        <button className="p-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200 active:bg-gray-200 transition-colors">
                           <Send size={18} />
                        </button>
                     </>
                  )}
               </div>
            </div>

            {/* User Info */}
            <div className="mb-4">
               <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-2xl font-extrabold text-gray-900">{user.name}</h2>
                  {user.isVip && <span className="text-amber-500"><Star size={18} fill="currentColor" /></span>}
               </div>
               <div className="text-xs text-gray-500 mb-3 font-medium flex items-center">
                  <span>仪号：{user.id}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span>{user.location || '未知地区'}</span>
               </div>
               <p className="text-sm text-gray-700 mb-4 leading-relaxed max-w-sm">{user.bio || '这个人很懒，什么都没有留下...'}</p>
               
               {/* Tags */}
               <div className="flex flex-wrap gap-2 mb-4">
                  {user.gender && (
                     <span className={`text-xs px-2 py-1 rounded flex items-center font-medium ${user.gender === 'Female' ? 'bg-pink-50 text-pink-500' : 'bg-blue-50 text-blue-500'}`}>
                        {user.gender === 'Female' ? '♀' : '♂'} {user.age}岁
                     </span>
                  )}
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">✨ 水质分析专家</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">🎓 认证工程师</span>
               </div>

               {/* Stats */}
               <div className="flex items-center space-x-6 text-gray-900">
                  <div className="flex items-baseline space-x-1">
                     <span className="font-bold text-lg">{user.stats?.likes || 0}</span>
                     <span className="text-xs text-gray-500">获赞</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                     <span className="font-bold text-lg">{user.stats?.following || 0}</span>
                     <span className="text-xs text-gray-500">关注</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                     <span className="font-bold text-lg">{user.stats?.followers || 0}</span>
                     <span className="text-xs text-gray-500">粉丝</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex px-4 py-2 space-x-3 bg-white mb-2">
         <div 
            className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center space-x-3 active:scale-[0.98] transition-transform cursor-pointer"
            onClick={() => pushScreen({ name: 'channel_shop', params: { title: `${user.name}的橱窗`, userId: user.id } })}
         >
            <div className="bg-white p-2 rounded-lg shadow-sm text-gray-800">
               <ShoppingBag size={20} />
            </div>
            <div>
               <div className="font-bold text-sm text-gray-900">商品橱窗</div>
               <div className="text-xs text-gray-400">{productCount}件好物</div>
            </div>
         </div>
         
         <div 
            className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center space-x-3 active:scale-[0.98] transition-transform cursor-pointer"
            onClick={() => pushScreen({ name: 'channel_list_selector', params: { title: `${user.name}的频道`, userId: user.id } })}
         >
            <div className="bg-white p-2 rounded-lg shadow-sm text-gray-800">
               <MessageCircle size={20} />
            </div>
            <div>
               <div className="font-bold text-sm text-gray-900">公开群/频道</div>
               <div className="text-xs text-gray-400">{channelCount}个群聊</div>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-14 z-20 shadow-sm flex items-center justify-between px-2">
         <div className="flex space-x-1 flex-1">
            {[
                { id: 'all', label: '全部' },
                { id: 'video', label: '视频' },
                { id: 'article', label: '文章' },
                { id: 'topic', label: '微话题' },
            ].map((t) => (
                <div 
                key={t.id} 
                onClick={() => setActiveTab(t.id as any)}
                className={`relative px-4 py-3 text-sm font-bold cursor-pointer transition-colors whitespace-nowrap
                    ${activeTab === t.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                {t.label}
                {activeTab === t.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-500 rounded-full"></div>
                )}
                </div>
            ))}
         </div>
         <div className="p-3 text-gray-400">
             <Filter size={16} />
         </div>
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 bg-white min-h-screen">
         {renderTabContent()}
      </div>

      {/* Bottom Sheet Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={() => setShowMenu(false)}></div>
           <div className="bg-gray-100 rounded-t-3xl w-full max-w-md mx-auto relative z-10 animate-in slide-in-from-bottom duration-300 overflow-hidden pb-safe">
              <div className="bg-white p-5 rounded-t-3xl">
                 <div className="flex items-center space-x-3 mb-6">
                    <img src={user.avatar} className="w-12 h-12 rounded-full border border-gray-100" />
                    <div className="flex-1">
                       <div className="font-bold text-lg text-gray-900">{user.name}</div>
                       <div className="text-xs text-gray-500">仪号: {user.id}</div>
                    </div>
                    <button onClick={() => setShowMenu(false)} className="text-gray-400 bg-gray-50 p-1.5 rounded-full"><X size={16}/></button>
                 </div>

                 <div className="grid grid-cols-4 gap-4 mb-6">
                    <ActionIcon icon={Share2} label="分享名片" />
                    <ActionIcon icon={MessageCircle} label="发消息" />
                    <ActionIcon icon={Flag} label="举报" />
                    <ActionIcon icon={Ban} label="拉黑" />
                 </div>

                 <div className="space-y-4">
                    <MenuItem label="设置备注" />
                    <MenuItem label="特别关注" subLabel="作品优先推荐，更新及时提示" isSwitch />
                    <MenuItem label="不让他(她)看" subLabel="开启后，他(她)将看不到我发布的内容" isSwitch />
                    <MenuItem label="加朋友" icon={<div className="bg-gray-200 rounded-full p-0.5"><UserPlus size={14} className="text-gray-500"/></div>} />
                 </div>
              </div>

               {!isMe && (
                  <div className="mt-2 bg-white p-4 text-center cursor-pointer active:bg-gray-50">
                     <span className="text-red-500 font-bold">取消关注</span>
                  </div>
               )}
               <div className="mt-2 bg-white p-4 text-center cursor-pointer active:bg-gray-50" onClick={() => setShowMenu(false)}>
                  <span className="text-gray-900 font-medium">取消</span>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Component for Feed Item in "All" / "Topic" tabs
const FeedItemCard = ({ item, pushScreen }: { item: FeedItem, pushScreen: any }) => {
   const isVideo = item.hasVideo || item.type === 'video';

   return (
      <div className="bg-white p-4">
         {/* Header */}
         <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
               {/* Usually avatar is hidden in profile feed list if it's the user's own profile, 
                   but 'All' tab can show it for consistency or hide it. 
                   Design usually keeps it minimal. Let's show date/time prominently. */}
               <div className="text-xs text-gray-400 font-medium">{item.time}</div>
            </div>
            {item.type === 'article' && <div className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">文章</div>}
            {item.type === 'qa' && <div className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">问答</div>}
         </div>

         {/* Content */}
         <div 
            className="cursor-pointer"
            onClick={() => pushScreen({ name: item.type === 'article' ? 'article_detail' : (item.type === 'qa' ? 'qa_detail' : (isVideo ? 'video_detail' : 'community_detail')), params: { postId: item.id } })}
         >
            {item.title && <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>}
            <p className={`text-base text-gray-800 leading-relaxed mb-3 ${isVideo ? 'line-clamp-1' : 'line-clamp-3'}`}>{item.content}</p>
            
            {/* Media */}
            {item.images && item.images.length > 0 && !isVideo && (
               <div className={`grid gap-1 mb-3 ${item.images.length === 1 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {item.images.slice(0, 3).map((img, i) => (
                     <div key={i} className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${item.images?.length === 1 ? 'aspect-video w-full' : ''}`}>
                        <img src={img} className="w-full h-full object-cover" />
                     </div>
                  ))}
                  {item.images.length > 3 && (
                     <div className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        +{item.images.length - 3}
                     </div>
                  )}
               </div>
            )}

            {isVideo && (
               <div className="w-2/3 aspect-video bg-black rounded-lg overflow-hidden relative mb-3">
                   <img src={item.videoInfo?.cover || 'https://picsum.photos/400/300'} className="w-full h-full object-cover opacity-80" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="text-white opacity-80" size={32} />
                   </div>
               </div>
            )}
         </div>

         {/* Footer Stats */}
         <div className="flex items-center justify-between pt-2">
             <div className="flex space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
                    <Share2 size={16} />
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
                    <MessageCircle size={16} />
                    <span className="text-xs">{item.stats.comments || 0}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                    <Heart size={16} />
                    <span className="text-xs">{item.stats.likes || 0}</span>
                </button>
             </div>
             <button className="text-gray-400">
                <MoreHorizontal size={16} />
             </button>
         </div>
      </div>
   );
};

const ActionIcon = ({ icon: Icon, label }: { icon: any, label: string }) => (
   <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer active:opacity-60">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
         <Icon size={24} />
      </div>
      <span className="text-xs text-gray-500">{label}</span>
   </div>
);

const MenuItem = ({ label, subLabel, isSwitch, icon }: { label: string, subLabel?: string, isSwitch?: boolean, icon?: React.ReactNode }) => (
  <div className="flex items-center justify-between py-1 cursor-pointer">
     <div className="flex-1">
        <div className="text-base font-medium text-gray-900">{label}</div>
        {subLabel && <div className="text-xs text-gray-400 mt-0.5">{subLabel}</div>}
     </div>
     {isSwitch ? (
        <div className="w-10 h-6 bg-gray-200 rounded-full relative transition-colors">
           <div className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 left-0.5 border border-gray-100"></div>
        </div>
     ) : icon ? (
        <div className="text-gray-400">{icon}</div>
     ) : (
        <ChevronRight size={20} className="text-gray-300" />
     )}
  </div>
);
