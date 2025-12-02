

import React, { useState } from 'react';
import { 
  ChevronLeft, MoreHorizontal, Mic, Image as ImageIcon, Camera, Link, ShoppingBag, Hash, Smile, PlusCircle, 
  MapPin, User, ArrowRight, Share2, AlertCircle, Ban, EyeOff, Send, Clock, ThumbsUp, MessageSquare, Trash2,
  Search, Heart, Wallet, Shield, FileText, Bell, LogOut, Gift, Video, Edit3, Lock, Wifi, QrCode, Smartphone,
  CheckCircle, Circle, Play, Pause, Target, Users, Map, ChevronRight, Plus, PlayCircle, File as FileIcon, Volume2, Settings, MessageCircle,
  HelpCircle, CreditCard, BarChart2, Eye, Archive, Flag, Edit2, X, Star, UserMinus
} from 'lucide-react';
import { useNav } from '../App';
import { CURRENT_USER, MOCK_CHAT_HISTORY, MOCK_COMMUNITY_FEED, MOCK_COMMENTS, MOCK_PRODUCTS, MOCK_TRANSACTIONS, Message, FOLLOWED_FRIENDS, MOCK_MY_COMMENTS, MOCK_VIDEOS, MOCK_PROJECTS, MOCK_CHANNELS, Product } from '../types';

// --- Channel Shop Page ---
export const ChannelShopPage = () => {
  const { popScreen, pushScreen } = useNav();
  
  // Simulate fetching all products associated with this channel/group
  const displayList = MOCK_PRODUCTS;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700"><ChevronLeft size={24} /></button>
        <span className="font-bold text-lg text-gray-900">群橱窗</span>
        <button className="p-2 -mr-2 text-gray-700"><MoreHorizontal size={24} /></button>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
         <h2 className="font-bold text-lg mb-1">群友优选好物</h2>
         <p className="text-xs opacity-90">严选优质商品 · 仪豆安全交易</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3">
         <div className="grid grid-cols-2 gap-3">
            {displayList.map(product => (
               <div 
                  key={product.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                  onClick={() => pushScreen({ name: 'product_detail', params: { productId: product.id } })}
               >
                  <div className="relative aspect-square bg-gray-100">
                     <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
                     <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-md">
                        {product.type === 'file' ? '文件' : product.type === 'video_collection' ? '视频' : '虚拟'}
                     </div>
                  </div>
                  <div className="p-3">
                     <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 h-10 leading-snug">{product.title}</h3>
                     <div className="flex items-center justify-between">
                        <div className="text-red-500 font-bold text-sm">
                           <span className="text-xs">¥</span> {product.price}
                        </div>
                        <span className="text-[10px] text-gray-400">已售 {product.sales}</span>
                     </div>
                     <div className="mt-2 flex items-center space-x-1.5 pt-2 border-t border-gray-50">
                        <img src={product.seller.avatar} className="w-4 h-4 rounded-full" alt="avatar" />
                        <span className="text-[10px] text-gray-500 truncate">{product.seller.name}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <div className="text-center text-xs text-gray-400 mt-6 pb-6">
            — 到底了 —
         </div>
      </div>
    </div>
  );
};

// --- Chat Detail ---
export const ChatDetail = ({ params }: { params: { title: string, count?: number } }) => {
  const { popScreen, pushScreen } = useNav();
  const [messages, setMessages] = useState<Message[]>(MOCK_CHAT_HISTORY);
  const [inputText, setInputText] = useState('');
  const [showTools, setShowTools] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const sendMessage = (type: Message['type'] = 'text', content: string = inputText, extra: any = {}) => {
    if (!content.trim() && type === 'text') return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'me',
      content: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type,
      isMe: true,
      avatar: CURRENT_USER.avatar,
      ...extra
    };
    setMessages([...messages, newMsg]);
    setInputText('');
    setShowTools(false);
  };

  const openChannelShop = () => {
    pushScreen({ name: 'channel_shop' });
  };

  const handleAvatarClick = (msg: Message) => {
    // Logic to determine the User ID.
    // If it's me, go to 'me'. If it's a known contact, use their ID. Otherwise use a generic ID.
    const targetId = msg.isMe ? 'me' : (FOLLOWED_FRIENDS.find(f => f.name === msg.sender)?.id || 'u_generic');
    pushScreen({ name: 'user_profile', params: { id: targetId } });
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-medium text-base text-gray-900">{params.title}</span>
          {params.count && <span className="text-[10px] text-gray-500">({params.count} 成员)</span>}
        </div>
        <button 
          className="p-2 -mr-2 text-gray-700"
          onClick={() => pushScreen({ name: 'channel_detail', params: { title: params.title, count: params.count } })}
        >
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4" onClick={() => setSelectedMessageId(null)}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.type === 'system' ? 'items-center' : (msg.isMe ? 'items-end' : 'items-start')}`}
          >
            {/* System Message */}
            {msg.type === 'system' ? (
              <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full">{msg.content}</span>
            ) : (
              <div 
                className={`flex max-w-[85%] group relative ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedMessageId(msg.id === selectedMessageId ? null : msg.id); }}
              >
                 {/* Avatar */}
                 <img 
                    src={msg.avatar} 
                    alt={msg.sender} 
                    className="w-10 h-10 rounded-lg object-cover shadow-sm mx-2 cursor-pointer active:opacity-80 transition-opacity" 
                    onClick={(e) => {
                       e.stopPropagation();
                       handleAvatarClick(msg);
                    }}
                 />
                 
                 {/* Bubble Wrapper for timestamp logic */}
                 <div className="flex flex-col relative">
                    {/* Timestamp */}
                    <div className={`text-[10px] text-gray-400 mb-1 transition-opacity duration-200 ${selectedMessageId === msg.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${msg.isMe ? 'text-right' : 'text-left'}`}>
                       {msg.time}
                    </div>

                    {/* Content Bubble Types */}
                    {msg.type === 'image' ? (
                      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                        <img src={msg.image} alt="Sent" className="max-w-[200px] h-auto" />
                      </div>
                    ) : msg.type === 'redPacket' ? (
                      <div className="bg-orange-500 w-60 rounded-xl overflow-hidden shadow-sm">
                         <div className="p-3 flex items-center space-x-3">
                            <div className="bg-yellow-100 p-2 rounded-full"><Gift className="text-orange-500" size={20} /></div>
                            <div className="text-white">
                               <div className="text-sm font-medium">{msg.redPacket?.note}</div>
                               <div className="text-xs opacity-90">{msg.redPacket?.status === 'opened' ? '已领取' : '查看红包'}</div>
                            </div>
                         </div>
                         <div className="bg-white/10 px-3 py-1 text-[10px] text-white/80">仪聚红包</div>
                      </div>
                    ) : msg.type === 'product' ? (
                      <div className="bg-white w-60 rounded-xl overflow-hidden shadow-sm border border-gray-200 p-2 flex space-x-2 items-start cursor-pointer" onClick={() => msg.product && pushScreen({ name: 'product_detail', params: { productId: msg.product.id } })}>
                         <img src={msg.product?.image} className="w-16 h-16 rounded bg-gray-100 object-cover" alt="product" />
                         <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1">{msg.product?.title}</div>
                            <div className="text-red-500 text-sm font-bold">¥{msg.product?.price}</div>
                         </div>
                      </div>
                    ) : msg.type === 'voice' ? (
                      <div className={`px-3 py-2 rounded-xl flex items-center space-x-2 min-w-[80px] cursor-pointer ${msg.isMe ? 'bg-blue-500 text-white' : 'bg-white border text-gray-800'}`}>
                         <Wifi size={16} className={`rotate-90 ${msg.isMe ? 'text-white' : 'text-gray-500'}`} />
                         <span className="text-sm font-medium">{msg.voiceDuration}''</span>
                      </div>
                    ) : msg.type === 'videoCall' ? (
                      <div className={`px-4 py-3 rounded-xl flex items-center space-x-2 bg-white border text-gray-800`}>
                         <div className="bg-gray-100 p-1.5 rounded-full"><Video size={16} className="text-gray-500" /></div>
                         <span className="text-sm">{msg.content}</span>
                      </div>
                    ) : (
                      <div 
                        className={`px-4 py-2.5 shadow-sm text-base leading-relaxed break-words relative
                          ${msg.isMe 
                            ? 'bg-blue-500 text-white rounded-2xl rounded-tr-none' 
                            : 'bg-white text-gray-900 rounded-2xl rounded-tl-none border border-gray-100'
                          }`}
                      >
                        {msg.content}
                      </div>
                    )}
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-2 pb-safe">
         <div className="flex items-end space-x-2 mb-2 p-1">
            <button className="text-gray-500 p-2"><Mic size={24} /></button>
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 flex items-center">
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                 placeholder="发送消息..." 
                 className="flex-1 bg-transparent text-sm focus:outline-none max-h-24" 
               />
               <button className="text-gray-400 ml-2"><Smile size={24} /></button>
            </div>
            {inputText ? (
              <button onClick={() => sendMessage()} className="bg-blue-500 text-white p-2 rounded-full mb-1">
                <Send size={20} />
              </button>
            ) : (
              <button onClick={() => setShowTools(!showTools)} className={`text-gray-500 p-2 transition-transform ${showTools ? 'rotate-45' : ''}`}>
                <PlusCircle size={26} />
              </button>
            )}
         </div>

         {/* Feature Grid */}
         {showTools && (
           <div className="grid grid-cols-4 gap-4 px-4 py-4 border-t border-gray-100 animate-in slide-in-from-bottom-5 bg-gray-50 h-60 overflow-y-auto">
              {[
                { icon: ImageIcon, label: '图片' },
                { icon: Camera, label: '拍照' },
                { icon: Video, label: '视频通话', action: () => sendMessage('videoCall', '视频通话已取消') },
                { icon: Gift, label: '红包', action: () => sendMessage('redPacket', '', { redPacket: { status: 'sent', note: '恭喜发财', amount: '10' } }) },
                { icon: Link, label: '链接' },
                { icon: ShoppingBag, label: '群橱窗', action: openChannelShop },
                { icon: Hash, label: '频道' },
                { icon: User, label: '名片' },
                { icon: MapPin, label: '位置' },
                { icon: Trash2, label: '文件' },
              ].map((tool) => (
                <div 
                  key={tool.label} 
                  onClick={() => tool.action && tool.action()}
                  className="flex flex-col items-center space-y-2 cursor-pointer active:scale-95 transition-transform"
                >
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-600 border border-gray-200">
                     <tool.icon size={24} />
                   </div>
                   <span className="text-xs text-gray-500">{tool.label}</span>
                </div>
              ))}
           </div>
         )}
      </div>
    </div>
  );
};

// --- Product Management Page ---
export const ProductManagementPage = () => {
   const { popScreen, pushScreen } = useNav();
   const [activeTab, setActiveTab] = useState<'on_shelf' | 'off_shelf'>('on_shelf');
   
   const [productList, setProductList] = useState(MOCK_PRODUCTS);

   const myProducts = productList.filter(p => p.seller.id === 'me');
   const displayProducts = myProducts.filter(p => p.status === activeTab);

   const updateStatus = (id: string, newStatus: 'on_shelf' | 'off_shelf') => {
      setProductList(prev => prev.map(p => {
         if (p.id === id) {
             const mockItem = MOCK_PRODUCTS.find(m => m.id === id);
             if (mockItem) mockItem.status = newStatus;
             return { ...p, status: newStatus };
         }
         return p;
      }));
   };

   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
            <button onClick={popScreen}><ChevronLeft /></button>
            <span className="font-bold text-lg">橱窗管理</span>
            <button onClick={() => pushScreen({ name: 'create_product' })} className="text-blue-600">
               <Plus size={24} />
            </button>
         </div>

         <div className="flex bg-white border-b text-sm font-medium">
            <div 
               onClick={() => setActiveTab('on_shelf')}
               className={`flex-1 py-3 text-center cursor-pointer ${activeTab === 'on_shelf' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
               出售中 ({myProducts.filter(p => p.status === 'on_shelf').length})
            </div>
            <div 
               onClick={() => setActiveTab('off_shelf')}
               className={`flex-1 py-3 text-center cursor-pointer ${activeTab === 'off_shelf' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
               仓库中 ({myProducts.filter(p => p.status === 'off_shelf').length})
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {displayProducts.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Archive size={48} className="mb-2 opacity-50" />
                  <span>暂无商品</span>
               </div>
            ) : (
               displayProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-xl p-3 shadow-sm flex items-start space-x-3">
                     <img src={p.image} className="w-20 h-20 rounded-lg object-cover bg-gray-100" alt="p" />
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                           <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{p.title}</h3>
                        </div>
                        <div className="text-red-500 font-bold text-sm mb-2">¥ {p.price}</div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                           <span>已售 {p.sales}</span>
                           <span>库存 999+</span>
                        </div>
                        <div className="flex space-x-2">
                           <button 
                              onClick={() => pushScreen({ name: 'create_product', params: { productId: p.id } })}
                              className="flex-1 bg-gray-50 text-gray-700 py-1.5 rounded text-xs font-medium border"
                           >
                              编辑
                           </button>
                           {p.status === 'on_shelf' ? (
                              <button 
                                 onClick={() => updateStatus(p.id, 'off_shelf')}
                                 className="flex-1 bg-gray-50 text-orange-600 py-1.5 rounded text-xs font-medium border border-orange-100"
                              >
                                 下架
                              </button>
                           ) : (
                              <button 
                                 onClick={() => updateStatus(p.id, 'on_shelf')}
                                 className="flex-1 bg-blue-50 text-blue-600 py-1.5 rounded text-xs font-medium border border-blue-100"
                              >
                                 上架
                              </button>
                           )}
                           <button className="w-8 flex items-center justify-center bg-gray-50 text-gray-400 rounded border">
                              <MoreHorizontal size={14} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

// --- Create Product Page ---
export const CreateProductPage = ({ params }: { params?: { productId: string } }) => {
   const { popScreen } = useNav();
   const isEdit = !!params?.productId;
   
   const existingProduct = isEdit ? MOCK_PRODUCTS.find(p => p.id === params?.productId) : null;

   const [sellerPrice, setSellerPrice] = useState<number | ''>(existingProduct ? (existingProduct.originalPrice || 0) : '');
   const [type, setType] = useState(existingProduct?.type || 'virtual');
   const [title, setTitle] = useState(existingProduct?.title || '');
   const [desc, setDesc] = useState(existingProduct?.description || '');

   const displayPrice = sellerPrice ? Math.floor(sellerPrice * 1.1) : 0;
   const fee = sellerPrice ? displayPrice - sellerPrice : 0;

   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white border-b flex items-center justify-between px-4">
            <button onClick={popScreen}><ChevronLeft /></button>
            <span className="font-bold text-lg">{isEdit ? '编辑商品' : '上架商品'}</span>
            <span className="text-sm text-gray-400 w-6"></span>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 h-40 relative overflow-hidden">
               {existingProduct ? (
                  <img src={existingProduct.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="upload" />
               ) : null}
               <div className="relative z-10 flex flex-col items-center">
                  <Camera className="text-gray-400 mb-2" size={32} />
                  <span className="text-gray-500 text-sm">添加商品主图</span>
               </div>
            </div>

            <div className="bg-white rounded-xl p-4 space-y-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品类型</label>
                  <div className="flex space-x-2">
                     {[
                        { id: 'virtual', label: '虚拟商品' },
                        { id: 'file', label: '文件' },
                        { id: 'video_collection', label: '视频集' }
                     ].map(t => (
                        <button 
                           key={t.id}
                           onClick={() => setType(t.id as any)}
                           className={`flex-1 py-2 text-sm rounded-lg border ${type === t.id ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-200 text-gray-600'}`}
                        >
                           {t.label}
                        </button>
                     ))}
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品标题</label>
                  <input 
                     type="text" 
                     value={title}
                     onChange={e => setTitle(e.target.value)}
                     placeholder="请输入商品标题" 
                     className="w-full bg-gray-50 p-2 rounded border border-gray-200 focus:outline-none focus:border-blue-500" 
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品描述</label>
                  <textarea 
                     value={desc}
                     onChange={e => setDesc(e.target.value)}
                     placeholder="描述你的商品..." 
                     className="w-full h-24 bg-gray-50 p-2 rounded border border-gray-200 resize-none focus:outline-none focus:border-blue-500"
                  ></textarea>
               </div>
            </div>

            <div className="bg-white rounded-xl p-4">
               <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="text-orange-500" size={20} />
                  <span className="font-bold text-gray-900">价格设置 (仪豆)</span>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>你的预期收入 (定价)</span>
                        <span className="text-gray-400 text-xs">到账金额</span>
                     </label>
                     <div className="relative">
                        <input 
                           type="number" 
                           value={sellerPrice}
                           onChange={(e) => setSellerPrice(Number(e.target.value))}
                           placeholder="3000"
                           className="w-full bg-gray-50 p-3 rounded-lg text-lg font-bold text-gray-900 border border-gray-200 focus:outline-none focus:border-blue-500" 
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500 text-sm">仪豆</span>
                     </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 space-y-2 border border-blue-100">
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">橱窗售价 (消费者支付)</span>
                        <span className="text-lg font-bold text-red-500">{displayPrice} 仪豆</span>
                     </div>
                     <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>交易管理费 (10%)</span>
                        <span>{fee} 仪豆</span>
                     </div>
                  </div>
               </div>
            </div>

            {isEdit && (
               <button className="w-full bg-white text-red-500 py-3 rounded-lg font-bold border border-gray-200">
                  删除商品
               </button>
            )}
         </div>

         <div className="bg-white p-4 border-t pb-safe">
            <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold shadow-lg">
               {isEdit ? '保存修改' : '立即上架'}
            </button>
         </div>
      </div>
   );
};

// --- Product Detail ---
export const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const { popScreen, pushScreen } = useNav();
  const product = MOCK_PRODUCTS.find(p => p.id === params.productId) || MOCK_PRODUCTS[0];
  const [showBuyConfirm, setShowBuyConfirm] = useState(false);
  const isSeller = product.seller.id === 'me';

  return (
    <div className="flex flex-col h-full bg-white relative">
       {/* Image Header */}
       <div className="relative h-72 bg-gray-100">
          <img src={product.image} className="w-full h-full object-cover" alt="product" />
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start bg-gradient-to-b from-black/30 to-transparent">
             <button onClick={popScreen} className="bg-black/20 text-white p-2 rounded-full backdrop-blur-md"><ChevronLeft size={20} /></button>
             <button className="bg-black/20 text-white p-2 rounded-full backdrop-blur-md"><MoreHorizontal size={20} /></button>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto -mt-4 bg-white rounded-t-3xl relative z-10 px-4 pt-6 pb-20">
          {/* Price & Title */}
          <div className="mb-4">
             <div className="flex items-baseline space-x-2 text-red-500 mb-2">
                <span className="text-sm font-bold">¥</span>
                <span className="text-3xl font-extrabold">{product.price}</span>
                <span className="text-sm bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[10px]">仪豆交易</span>
             </div>
             <h1 className="text-xl font-bold text-gray-900 leading-snug mb-2">{product.title}</h1>
             <div className="flex justify-between text-xs text-gray-400">
                <span>类型: {product.type}</span>
                <span>已售 {product.sales}</span>
             </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center space-x-3 mb-6 bg-gray-50 p-3 rounded-xl">
             <img src={product.seller.avatar} className="w-12 h-12 rounded-full" alt="seller" />
             <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">{product.seller.name}</div>
                <div className="text-xs text-gray-500">信誉极好 · 实名认证</div>
             </div>
             <button className="text-xs border border-blue-500 text-blue-500 px-4 py-1.5 rounded-full font-medium">进店逛逛</button>
          </div>

          {/* Description */}
          <div className="space-y-2">
             <h3 className="font-bold text-gray-900 text-sm">商品详情</h3>
             <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
             <p className="text-sm text-gray-600 leading-relaxed mt-4">
                特别说明：虚拟商品一经售出，概不退换。请购买前仔细确认。所有交易均通过平台仪豆结算。
             </p>
          </div>
       </div>

       {/* Bottom Bar */}
       <div className="absolute bottom-0 w-full bg-white border-t p-2 flex items-center space-x-2 pb-safe z-20">
          {isSeller ? (
             <div className="flex w-full space-x-3 px-2">
                <button 
                   onClick={() => pushScreen({ name: 'create_product', params: { productId: product.id } })}
                   className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-full font-bold text-sm"
                >
                   编辑商品
                </button>
                <button className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-full font-bold text-sm">
                   分享
                </button>
             </div>
          ) : (
             <>
                <div className="flex-1 flex justify-around text-xs text-gray-500">
                   <div className="flex flex-col items-center"><ShoppingBag size={20} /><span>店铺</span></div>
                   <div className="flex flex-col items-center"><MessageSquare size={20} /><span>客服</span></div>
                </div>
                <button 
                   onClick={() => setShowBuyConfirm(true)}
                   className="flex-[2] bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg"
                >
                   立即购买 ({product.price} 仪豆)
                </button>
             </>
          )}
       </div>

       {/* Buy Modal */}
       {showBuyConfirm && (
          <div className="absolute inset-0 bg-black/60 z-50 flex items-end animate-in fade-in">
             <div className="bg-white w-full rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold">确认付款</h3>
                   <button onClick={() => setShowBuyConfirm(false)} className="text-gray-400"><ChevronLeft className="-rotate-90" /></button>
                </div>
                <div className="flex justify-between items-center mb-4 py-4 border-b">
                   <span className="text-gray-600">支付金额</span>
                   <span className="text-2xl font-bold text-red-500">{product.price} 仪豆</span>
                </div>
                <div className="flex justify-between items-center mb-8">
                   <span className="text-gray-600">付款方式</span>
                   <div className="flex items-center space-x-2">
                      <Wallet size={16} className="text-blue-600" />
                      <span className="text-gray-900 font-medium">我的钱包 (余额 1230)</span>
                   </div>
                </div>
                <button className="w-full bg-red-500 text-white py-3.5 rounded-full font-bold text-lg mb-2">
                   确认支付
                </button>
             </div>
          </div>
       )}
    </div>
  );
};

// --- Wallet Page ---
export const WalletPage = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-48 bg-blue-600 p-6 text-white relative flex flex-col justify-between">
        <div>
           <button onClick={popScreen} className="p-2 -ml-2"><ChevronLeft /></button>
           <div className="mt-4 text-sm opacity-80">总资产 (仪豆)</div>
           <div className="text-4xl font-bold mt-1">1,230.00</div>
        </div>
        <div className="flex space-x-4">
           <button className="flex-1 bg-white/20 backdrop-blur-md text-white py-2 rounded-lg font-medium">充值</button>
           <button className="flex-1 bg-white text-blue-600 py-2 rounded-lg font-medium">提现</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start space-x-2">
            <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={16} />
            <div className="text-xs text-orange-700 leading-relaxed">
               <span className="font-bold">提现说明：</span> 平台默认按照 10:1 方式进行仪豆金额转换。例如：提现 1000 元人民币，需扣除 10,000 仪豆。
            </div>
         </div>

         <div className="bg-white rounded-xl overflow-hidden shadow-sm">
           <div className="px-4 py-3 text-sm font-bold text-gray-800 border-b flex justify-between items-center">
              <span>交易记录</span>
              <span className="text-xs text-gray-400 font-normal">全部 &gt;</span>
           </div>
           {MOCK_TRANSACTIONS.map(t => (
             <div key={t.id} className="flex justify-between items-center px-4 py-3 border-b last:border-0 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {t.amount > 0 ? <Plus size={16} /> : <CreditCard size={16} />}
                   </div>
                   <div>
                      <div className="text-sm font-medium text-gray-900">{t.desc}</div>
                      <div className="text-xs text-gray-400">{t.time}</div>
                   </div>
                </div>
                <div className={`text-sm font-bold ${t.amount > 0 ? 'text-green-500' : 'text-gray-900'}`}>
                  {t.amount > 0 ? '+' : ''}{t.amount}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// --- Settings Page ---
export const SettingsPage = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center px-4">
        <button onClick={popScreen}><ChevronLeft /></button>
        <span className="ml-4 font-medium">设置</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
         <div className="bg-white">
            <SettingItem label="账号与安全" icon={Shield} />
            <SettingItem label="消息通知" icon={Bell} />
            <SettingItem label="隐私设置" icon={Lock} />
         </div>
         <div className="bg-white">
            <SettingItem label="通用" icon={Hash} />
            <SettingItem label="帮助与反馈" icon={AlertCircle} />
         </div>
         <button className="w-full bg-white text-red-500 py-3 font-medium text-sm mt-4">
            退出登录
         </button>
      </div>
    </div>
  );
};
const SettingItem = ({ label, icon: Icon }: any) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 active:bg-gray-50">
     <div className="flex items-center space-x-3">
        <Icon size={18} className="text-gray-500" />
        <span className="text-sm text-gray-800">{label}</span>
     </div>
     <ChevronLeft className="rotate-180 text-gray-300" size={16} />
  </div>
);

// --- Publish Page ---
export const PublishPage = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-14 flex items-center justify-between px-4 border-b">
         <button onClick={popScreen} className="text-gray-600">取消</button>
         <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">发布</button>
      </div>
      <div className="p-4">
         <textarea 
            placeholder="分享你的新鲜事..." 
            className="w-full h-32 text-base resize-none focus:outline-none placeholder:text-gray-400"
         ></textarea>
         <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
               <PlusCircle size={32} />
            </div>
         </div>
         <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
               <div className="flex items-center space-x-2 text-gray-600"><MapPin size={20} /><span className="text-sm">所在位置</span></div>
               <ChevronLeft className="rotate-180 text-gray-300" size={16} />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
               <div className="flex items-center space-x-2 text-gray-600"><Hash size={20} /><span className="text-sm">添加话题</span></div>
               <ChevronLeft className="rotate-180 text-gray-300" size={16} />
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Article Detail ---
export const ArticleDetail = ({ params }: { params: { postId: string } }) => {
  const { popScreen } = useNav();
  const article = MOCK_COMMUNITY_FEED.find(p => p.id === params.postId) || MOCK_COMMUNITY_FEED[2];

  return (
     <div className="flex flex-col h-full bg-white">
        <div className="h-14 flex items-center justify-between px-4 border-b sticky top-0 bg-white z-10">
           <button onClick={popScreen}><ChevronLeft /></button>
           <div className="flex space-x-4 text-gray-600"><Heart /><Share2 /><MoreHorizontal /></div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
           <h1 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h1>
           <div className="flex items-center space-x-3 mb-6">
              <img src={article.user.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
              <div className="text-xs text-gray-500">
                 <div className="text-gray-900 font-medium">{article.user.name}</div>
                 <div>{article.time}</div>
              </div>
              <button className="ml-auto text-blue-600 text-xs border border-blue-600 px-2 py-0.5 rounded">关注</button>
           </div>
           {article.images && <img src={article.images[0]} className="w-full rounded-lg mb-6" alt="content" />}
           <div className="prose prose-sm text-gray-800 leading-7">
              <p>{article.content}</p>
           </div>
        </div>
        <div className="p-3 border-t bg-white pb-safe">
           <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400">写评论...</div>
        </div>
     </div>
  );
};

// --- QA Detail ---
export const QADetail = ({ params }: { params: { postId: string } }) => {
   const { popScreen } = useNav();
   const qa = MOCK_COMMUNITY_FEED.find(p => p.id === params.postId) || MOCK_COMMUNITY_FEED[3];

   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white flex items-center px-2 border-b">
            <button onClick={popScreen} className="p-2"><ChevronLeft /></button>
         </div>
         <div className="flex-1 overflow-y-auto">
            <div className="bg-white p-5 mb-2">
               <h1 className="text-lg font-bold text-gray-900 mb-2">{qa.title}</h1>
               <div className="flex flex-wrap gap-2 mb-3">
                  {(qa.tags || []).map(t => <span key={t} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{t}</span>)}
               </div>
               <p className="text-sm text-gray-600 mb-4">{qa.content}</p>
               <div className="flex justify-between">
                  <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center"><Edit3 size={14} className="mr-1" />写回答</button>
                  <button className="text-gray-500 text-sm flex items-center"><PlusCircle size={14} className="mr-1" />邀请回答</button>
               </div>
            </div>
            <div className="bg-white p-4">
               <h3 className="font-bold text-gray-900 mb-4">全部回答 ({qa.stats.comments})</h3>
               <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                     <img src="https://picsum.photos/id/1011/50/50" className="w-6 h-6 rounded-full" alt="avatar" />
                     <span className="text-sm font-medium text-gray-800">仪表老司机</span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">这种情况一般是因为电极内的KCL溶液自然挥发导致的。</p>
                  <div className="text-xs text-gray-400">2023-11-02 · 12 赞同</div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Add Friend Page ---
export const AddFriendPage = () => {
   const { popScreen } = useNav();
   
   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white border-b flex items-center px-4 relative">
             <button onClick={popScreen}><ChevronLeft /></button>
             <span className="ml-4 font-medium text-lg">添加朋友</span>
         </div>
         <div className="p-4">
            <div className="bg-white rounded-lg flex items-center p-3 shadow-sm mb-4">
               <Search className="text-gray-400 mr-3" size={20} />
               <input type="text" placeholder="手机号 / 仪聚号" className="flex-1 focus:outline-none" />
            </div>
            <div className="flex justify-center items-center space-x-2 mb-8">
               <span className="text-sm text-gray-500">我的仪聚号: mwzy711</span>
               <QrCode size={16} className="text-gray-500" />
            </div>
            <div className="space-y-4">
               <div className="flex items-center p-4 bg-white rounded-lg cursor-pointer">
                  <div className="bg-blue-500 p-2 rounded-full text-white mr-4"><QrCode size={20} /></div>
                  <div className="flex-1">
                     <div className="font-medium">扫一扫</div>
                     <div className="text-xs text-gray-400">扫描二维码名片</div>
                  </div>
                  <ChevronLeft className="rotate-180 text-gray-300" />
               </div>
            </div>
         </div>
      </div>
   );
}

// --- Create Group Page ---
export const CreateGroupPage = () => {
   const { popScreen } = useNav();
   const [selected, setSelected] = useState<string[]>([]);
   
   const toggleSelect = (id: string) => {
      if (selected.includes(id)) {
         setSelected(selected.filter(i => i !== id));
      } else {
         setSelected([...selected, id]);
      }
   }

   return (
      <div className="flex flex-col h-full bg-white">
         <div className="h-14 bg-white border-b flex items-center justify-between px-4">
             <div className="flex items-center">
               <button onClick={popScreen} className="mr-3"><ChevronLeft /></button>
               <span className="font-medium text-lg">选择联系人</span>
             </div>
             <button 
               className={`px-4 py-1.5 rounded text-sm font-medium ${selected.length > 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}
               disabled={selected.length === 0}
             >
                完成 {selected.length > 0 && `(${selected.length})`}
             </button>
         </div>
         <div className="p-3 bg-gray-50">
            <div className="bg-white rounded px-3 py-1.5 flex items-center text-sm">
               <Search size={16} className="text-gray-400 mr-2" />
               <input type="text" placeholder="搜索" className="flex-1 focus:outline-none" />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            <div className="bg-gray-100 px-4 py-1 text-xs text-gray-500 font-bold">星标朋友</div>
            {FOLLOWED_FRIENDS.map(f => (
               <div 
                  key={f.id} 
                  className="flex items-center px-4 py-3 border-b border-gray-50 cursor-pointer"
                  onClick={() => toggleSelect(f.id)}
               >
                  <div className="mr-4">
                     {selected.includes(f.id) ? 
                        <CheckCircle className="text-green-500 fill-current" /> : 
                        <Circle className="text-gray-300" />
                     }
                  </div>
                  <img src={f.avatar} className="w-10 h-10 rounded-lg mr-3" alt="avatar" />
                  <span className="text-gray-900 font-medium">{f.name}</span>
               </div>
            ))}
         </div>
      </div>
   );
}

// --- Channel Homepage ---
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

// --- Create Channel ---
export const CreateChannel = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center px-4 shrink-0 relative">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700 absolute left-4">
          <ChevronLeft size={24} />
        </button>
        <span className="w-full text-center font-medium text-lg text-gray-900">创建频道</span>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
           <div className="w-24 h-24 bg-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-500 mb-2 border-2 border-dashed border-gray-300">
             <Camera size={32} />
             <span className="text-xs mt-1">添加头像 *</span>
           </div>
        </div>
        <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col space-y-1">
             <label className="text-sm font-medium text-gray-700">频道名称 <span className="text-red-500">*</span></label>
             <input type="text" placeholder="3-15个字" className="bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col space-y-1">
             <label className="text-sm font-medium text-gray-700">频道简介 <span className="text-red-500">*</span></label>
             <textarea placeholder="介绍你的频道，10-200个字" className="bg-gray-50 rounded-lg p-3 text-sm h-24 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
          </div>
        </div>
        <button onClick={popScreen} className="w-full bg-blue-500 text-white font-medium py-3 rounded-full mt-8 shadow-lg hover:bg-blue-600 active:scale-95 transition-all">
          立即创建
        </button>
      </div>
    </div>
  );
};

// --- Search Page ---
export const SearchPage = () => {
  const { popScreen } = useNav();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center p-3 border-b border-gray-100">
         <div className="flex-1 bg-gray-100 rounded-lg flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              autoFocus
              type="text" 
              placeholder="搜索联系人、群聊、聊天记录" 
              className="bg-transparent text-sm flex-1 focus:outline-none text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <button onClick={popScreen} className="ml-3 text-sm text-blue-600 font-medium">取消</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
         {!searchTerm && (
           <div className="mb-6">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="text-sm font-bold text-gray-900">搜索历史</h3>
                 <Trash2 size={14} className="text-gray-400" />
               </div>
               <div className="flex flex-wrap gap-2">
                 {['在线分析仪', '聚仪堂', '何刺刺'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                     {tag}
                   </span>
                 ))}
               </div>
           </div>
         )}
      </div>
    </div>
  );
};

// --- Community Detail (Post View) ---
export const CommunityDetail = ({ params }: { params: { postId: string } }) => {
  const { popScreen } = useNav();
  const post = MOCK_COMMUNITY_FEED.find(p => p.id === params.postId) || MOCK_COMMUNITY_FEED[0];

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center space-x-2">
           <img src={post.user.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
           <span className="font-medium text-sm">{post.user.name}</span>
        </div>
        <button className="p-2 -mr-2 text-gray-700">
          <MoreHorizontal size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-safe">
        <div className="bg-white p-4 mb-2">
           <p className="text-base text-gray-900 leading-relaxed mb-4">{post.content}</p>
           {post.images && post.images.map((img, i) => (
             <img key={i} src={img} className="w-full h-auto rounded-lg mb-2" alt="post" />
           ))}
           <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
             <span>{post.time}</span>
             <span>{post.stats.likes} likes · {post.stats.shares} shares</span>
           </div>
        </div>
        <div className="bg-white p-4 min-h-[300px]">
           <h3 className="font-bold text-sm mb-4">全部评论 ({MOCK_COMMENTS.length})</h3>
           <div className="space-y-6">
             {MOCK_COMMENTS.map(comment => (
               <div key={comment.id} className="flex items-start space-x-3">
                  <img src={comment.user.avatar} className="w-8 h-8 rounded-full mt-1" alt="u" />
                  <div className="flex-1">
                     <p className="text-sm text-gray-800 mt-0.5">{comment.content}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Video Detail ---
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

// --- Project Detail ---
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

// --- User Profile (Refined & Fixed) ---
export const UserProfile = ({ params }: { params: { id: string } }) => {
  const { popScreen, pushScreen } = useNav();
  const [showMenu, setShowMenu] = useState(false);
  const isMe = params.id === 'me';
  
  // Resolve User Data
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
      {/* Top Navigation Overlay */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-start z-10">
         <button onClick={popScreen} className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md">
            <ChevronLeft size={20} />
         </button>
         <div className="relative">
            <button 
               onClick={() => setShowMenu(true)}
               className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md"
            >
               <MoreHorizontal size={20} />
            </button>
            {/* Context Menu for User Profile */}
            {showMenu && (
               <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)}></div>
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-2 border border-gray-100">
                     <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-400">仪号: {user.id}</div>
                     </div>
                     <div className="grid grid-cols-4 gap-2 mb-2 p-1">
                        <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                           <Share2 size={18} className="text-gray-600 mb-1" />
                           <span className="text-[10px] text-gray-500">分享</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                           <MessageCircle size={18} className="text-gray-600 mb-1" />
                           <span className="text-[10px] text-gray-500">私信</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                           <Flag size={18} className="text-gray-600 mb-1" />
                           <span className="text-[10px] text-gray-500">举报</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                           <Ban size={18} className="text-gray-600 mb-1" />
                           <span className="text-[10px] text-gray-500">拉黑</span>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <MenuItem label="设置备注" />
                        <MenuItem label="特别关注" isSwitch={true} />
                        <MenuItem label="不让他看" isSwitch={true} />
                     </div>
                     {!isMe && (
                        <div className="mt-2 pt-2 border-t border-gray-50">
                           <div className="flex items-center px-3 py-2 text-red-500 hover:bg-red-50 rounded cursor-pointer">
                              <UserMinus size={16} className="mr-2" />
                              <span className="text-sm font-medium">取消关注</span>
                           </div>
                        </div>
                     )}
                  </div>
               </>
            )}
         </div>
      </div>

      {/* Header Profile Card */}
      <div className="relative">
         {/* Background Cover */}
         <div className="h-40 bg-gradient-to-b from-gray-400 to-gray-200">
             <img src={`https://picsum.photos/seed/${user.id}/600/300`} className="w-full h-full object-cover opacity-80" alt="cover" />
         </div>
         
         <div className="px-5 pb-4 bg-white relative">
            {/* Avatar & Action Button */}
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

            {/* User Info */}
            <div className="mb-4">
               <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  {user.isVip && <span className="text-amber-500"><Star size={16} fill="currentColor" /></span>}
               </div>
               <div className="text-xs text-gray-400 mb-3">仪号：{user.id} · {user.location || '未知地区'}</div>
               <p className="text-sm text-gray-600 mb-3">{user.bio || '这个人很懒，什么都没有留下...'}</p>
               
               {/* Tags */}
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

            {/* Stats */}
            <div className="flex justify-between border-t pt-4">
               {[
                  { label: '获赞', val: user.stats?.likes },
                  { label: '粉丝', val: user.stats?.followers },
                  { label: '关注', val: user.stats?.following },
                  { label: '频道', val: 8 }, // Mock
               ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center px-4">
                     <span className="font-bold text-gray-900 text-lg">{stat.val}</span>
                     <span className="text-xs text-gray-400">{stat.label}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Sticky Tabs */}
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
      
      {/* Tab Content */}
      <div className="flex-1 bg-white">
         {renderTabContent()}
      </div>
    </div>
  );
};

const MenuItem = ({ label, isSwitch, onClick }: { label: string, isSwitch?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
     <span className="text-sm font-medium text-gray-700">{label}</span>
     {isSwitch ? (
        <div className="w-8 h-4 bg-gray-200 rounded-full relative">
           <div className="w-4 h-4 bg-white rounded-full shadow-sm absolute top-0 left-0 border border-gray-100"></div>
        </div>
     ) : (
        <ChevronRight size={16} className="text-gray-300" />
     )}
  </div>
);
