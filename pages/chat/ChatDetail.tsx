
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Wifi, Gift, Video, Mic, Smile, Send, PlusCircle, ImageIcon, Camera, Link, ShoppingBag, Hash, User, MapPin, Trash2 } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { Message, CURRENT_USER, MOCK_CHAT_HISTORY, FOLLOWED_FRIENDS } from '../../types';

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

  const openChannelList = () => {
    pushScreen({ name: 'channel_list_selector' });
  };

  const handleAvatarClick = (msg: Message) => {
    const targetId = msg.isMe ? 'me' : (FOLLOWED_FRIENDS.find(f => f.name === msg.sender)?.id || 'u_generic');
    pushScreen({ name: 'user_profile', params: { id: targetId } });
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 shrink-0 shadow-sm z-10 sticky top-0">
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

      <div className="flex-1 p-4 overflow-y-auto space-y-4" onClick={() => setSelectedMessageId(null)}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.type === 'system' ? 'items-center' : (msg.isMe ? 'items-end' : 'items-start')}`}
          >
            {msg.type === 'system' ? (
              <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full">{msg.content}</span>
            ) : (
              <div 
                className={`flex max-w-[85%] group relative ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedMessageId(msg.id === selectedMessageId ? null : msg.id); }}
              >
                 <img 
                    src={msg.avatar} 
                    alt={msg.sender} 
                    className="w-10 h-10 rounded-lg object-cover shadow-sm mx-2 cursor-pointer active:opacity-80 transition-opacity" 
                    onClick={(e) => {
                       e.stopPropagation();
                       handleAvatarClick(msg);
                    }}
                 />
                 
                 <div className="flex flex-col relative">
                    <div className={`text-[10px] text-gray-400 mb-1 transition-opacity duration-200 ${selectedMessageId === msg.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${msg.isMe ? 'text-right' : 'text-left'}`}>
                       {msg.time}
                    </div>

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

         {showTools && (
           <div className="grid grid-cols-4 gap-4 px-4 py-4 border-t border-gray-100 animate-in slide-in-from-bottom-5 bg-gray-50 h-60 overflow-y-auto">
              {[
                { icon: ImageIcon, label: '图片' },
                { icon: Camera, label: '拍照' },
                { icon: Video, label: '视频通话', action: () => sendMessage('videoCall', '视频通话已取消') },
                { icon: Gift, label: '红包', action: () => sendMessage('redPacket', '', { redPacket: { status: 'sent', note: '恭喜发财', amount: '10' } }) },
                { icon: Link, label: '链接' },
                { icon: ShoppingBag, label: '群橱窗', action: openChannelShop },
                { icon: Hash, label: '频道', action: openChannelList },
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
