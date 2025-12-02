
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Share2, MessageCircle, Flag, Ban, UserMinus, Send, Star, Lock, Heart, ChevronRight, X, UserPlus } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { CURRENT_USER, FOLLOWED_FRIENDS, MOCK_COMMUNITY_FEED, MOCK_PRODUCTS } from '../../types';

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

  const [activeTab, setActiveTab] = useState<'works' | 'showcase' | 'liked'>('works');

  const renderTabContent = () => {
    switch (activeTab) {
       case 'works':
          return (
             <div className="p-1 grid grid-cols-3 gap-1 pb-4">
                {MOCK_COMMUNITY_FEED.map((item, idx) => (
                   <div key={idx} className="bg-gray-100 aspect-[3/4] relative rounded overflow-hidden cursor-pointer" onClick={() => pushScreen({ name: 'community_detail', params: { postId: item.id } })}>
                     {item.images && <img src={item.images[0]} className="absolute inset-0 w-full h-full object-cover" alt="work" />}
                     <div className="absolute bottom-1 left-1 text-white text-[10px] z-10 font-bold drop-shadow-md">
                        <Heart size={10} className="inline mr-0.5" /> {item.stats.likes}
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                   </div>
                ))}
             </div>
          );
       case 'showcase':
          return (
             <div className="grid grid-cols-2 gap-3 p-3 pb-6">
               {MOCK_PRODUCTS.map(product => (
                 <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm" onClick={() => pushScreen({ name: 'product_detail', params: { productId: product.id } })}>
                    <div className="relative aspect-square">
                      <img src={product.image} className="w-full h-full object-cover" alt="prod" />
                      <div className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                          {product.type === 'file' ? '文件' : product.type === 'video_collection' ? '视频集' : '虚拟'}
                      </div>
                    </div>
                    <div className="p-2">
                       <div className="text-sm font-medium line-clamp-1">{product.title}</div>
                       <div className="text-red-500 font-bold text-xs mt-1">¥ {product.price}</div>
                       <div className="text-[10px] text-gray-400 mt-1">已售 {product.sales}</div>
                    </div>
                 </div>
               ))}
             </div>
          );
       default:
          return (
             <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                <Lock size={40} className="mb-2 opacity-50" />
                <span className="text-xs">该用户设置了权限，内容不可见</span>
             </div>
          );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="absolute top-0 w-full p-4 flex justify-between items-start z-10">
         <button onClick={popScreen} className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-transform">
            <ChevronLeft size={20} />
         </button>
         <button 
            onClick={() => setShowMenu(true)}
            className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-transform"
         >
            <MoreHorizontal size={20} />
         </button>
      </div>

      <div className="relative">
         <div className="h-40 bg-gradient-to-b from-gray-400 to-gray-200">
             <img src={`https://picsum.photos/seed/${user.id}/600/300`} className="w-full h-full object-cover opacity-80" alt="cover" />
         </div>
         
         <div className="px-5 pb-4 bg-white relative">
            <div className="flex justify-between items-end -mt-10 mb-3">
               <img src={user.avatar} className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-white" alt="avatar" />
               <div className="flex space-x-2 mb-1">
                  {isMe ? (
                     <button className="px-6 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                        编辑资料
                     </button>
                  ) : (
                     <>
                        <button className="px-6 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm active:scale-95 transition-transform">
                           + 关注
                        </button>
                        <button className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center">
                           <Send size={14} className="mr-1" /> 私信
                        </button>
                     </>
                  )}
               </div>
            </div>

            <div className="mb-4">
               <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  {user.isVip && <span className="text-amber-500"><Star size={16} fill="currentColor" /></span>}
               </div>
               <div className="text-xs text-gray-400 mb-3">仪号：{user.id} · {user.location || '未知地区'}</div>
               <p className="text-sm text-gray-600 mb-3">{user.bio || '这个人很懒，什么都没有留下...'}</p>
               
               <div className="flex space-x-2 mb-4">
                  {user.gender && (
                     <span className={`text-xs px-2 py-0.5 rounded flex items-center ${user.gender === 'Female' ? 'bg-pink-50 text-pink-500' : 'bg-blue-50 text-blue-500'}`}>
                        {user.gender === 'Female' ? '♀' : '♂'} {user.age}岁
                     </span>
                  )}
                  <span className="bg-purple-50 text-purple-600 text-xs px-2 py-0.5 rounded">水质分析专家</span>
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">河南 · 许昌</span>
               </div>
            </div>

            <div className="flex justify-between border-t pt-4">
               {[
                  { label: '获赞', val: user.stats?.likes },
                  { label: '粉丝', val: user.stats?.followers },
                  { label: '关注', val: user.stats?.following },
                  { label: '频道', val: 8 }, 
               ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center px-4">
                     <span className="font-bold text-gray-900 text-lg">{stat.val}</span>
                     <span className="text-xs text-gray-400">{stat.label}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="bg-white flex border-b sticky top-14 z-20">
         {[
            { id: 'works', label: '动态' },
            { id: 'video', label: '视频' },
            { id: 'showcase', label: '橱窗' },
            { id: 'liked', label: '喜欢' },
         ].map((t) => (
            <div 
               key={t.id} 
               onClick={() => setActiveTab(t.id as any)}
               className={`flex-1 py-3 text-center text-sm font-medium cursor-pointer transition-colors ${activeTab === t.id ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}
            >
               {t.label}
            </div>
         ))}
      </div>
      
      <div className="flex-1 bg-white">
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
