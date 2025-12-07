
import React, { useState } from 'react';
import { Settings, Plus, ShoppingCart, CreditCard, Wallet, FileText, FilePlus, Heart, FolderHeart } from 'lucide-react';
import { CURRENT_USER, MOCK_COMMUNITY_FEED, MOCK_PRODUCTS, MOCK_MY_COMMENTS } from '../types';
import { useNav } from '../context/NavContext';

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
           <div className="flex-1 overflow-y-auto pb-4 bg-gray-50">
             <div className="px-4 py-3 bg-white mb-2">
                <button 
                  onClick={() => pushScreen({ name: 'product_management' })}
                  className="w-full bg-blue-50 text-blue-600 border border-blue-200 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center active:scale-[0.99] transition-transform"
                >
                  <Plus size={16} className="mr-1" /> 橱窗管理 / 添加商品
                </button>
             </div>
             <div className="px-3 space-y-3">
               {MOCK_PRODUCTS.filter(p => p.status === 'on_shelf').map(product => (
                 <div 
                   key={product.id} 
                   className="bg-white p-3 rounded-xl flex space-x-3 shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => pushScreen({ name: 'product_detail', params: { productId: product.id } })}
                 >
                    <div className="relative w-24 h-24 shrink-0">
                      <img src={product.image} className="w-full h-full object-cover rounded-lg bg-gray-100" alt="prod" />
                      <div className="absolute top-0 left-0 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-tl-lg rounded-br-lg backdrop-blur-sm">
                         {product.type === 'file' ? '文件' : product.type === 'video_collection' ? '视频集' : '虚拟'}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                       <div>
                          <div className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1">{product.title}</div>
                          <div className="flex flex-wrap gap-1">
                             <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">自动发货</span>
                             <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">平台担保</span>
                          </div>
                       </div>
                       
                       <div className="flex items-end justify-between">
                          <div className="text-red-600 font-bold text-base">
                             <span className="text-xs font-normal mr-0.5">仪豆</span>
                             {product.price}
                          </div>
                          <div className="text-xs text-gray-400 mb-0.5">已售 {product.sales}</div>
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
      <div className="bg-white p-5 pb-2 mb-2">
        <div className="flex justify-end mb-4">
          <Settings size={22} className="text-gray-600 cursor-pointer" onClick={() => pushScreen({ name: 'settings' })} />
        </div>

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

        <p className="text-sm text-gray-500 mb-3">{user.bio}</p>

        <div className="flex space-x-2 mb-4">
           <span className="bg-blue-50 text-blue-500 text-xs px-2 py-0.5 rounded">女 · 20岁</span>
           <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">+ 添加所在地等标签</span>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 flex justify-between items-center text-amber-400 mb-2">
          <div className="flex items-center space-x-2">
             <div className="bg-amber-500 p-1 rounded-full text-white"><span className="text-xs font-bold">V</span></div>
             <span className="font-medium text-sm">至尊会员卡</span>
          </div>
          <button className="bg-amber-400 text-gray-900 text-xs px-3 py-1 rounded-full font-bold">立即开通</button>
        </div>
      </div>

      <div className="bg-white mb-2 py-4 flex justify-around">
         {[
           { icon: ShoppingCart, label: '购物车', action: () => pushScreen({ name: 'shopping_cart' }) },
           { icon: FolderHeart, label: '作品集', action: () => pushScreen({ name: 'collection_list' }) },
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
        
        <div className="flex-1 bg-white">
           {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
