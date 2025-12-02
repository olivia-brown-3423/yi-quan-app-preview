
import React, { useState } from 'react';
import { Search, MessageCircle, UserPlus, Hash } from 'lucide-react';
import { MOCK_MESSAGES } from '../types';
import { useNav } from '../context/NavContext';

export const MessagesTab = () => {
  const { pushScreen } = useNav();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 relative z-10">
        <span className="font-medium text-lg text-gray-800">消息</span>
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-gray-600 relative">
          <UserPlus size={24} />
          {showMenu && (
            <div className="absolute top-10 right-0 w-40 bg-white shadow-xl border rounded-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
              <MenuItem icon={<MessageCircle size={18} />} label="新建群聊" onClick={() => { setShowMenu(false); pushScreen({ name: 'create_group' }); }} />
              <MenuItem icon={<Hash size={18} />} label="创建频道" onClick={() => { setShowMenu(false); pushScreen({ name: 'create_channel' }); }} />
              <MenuItem icon={<UserPlus size={18} />} label="加好友/群" onClick={() => { setShowMenu(false); pushScreen({ name: 'add_friend' }); }} />
            </div>
          )}
        </button>
      </div>

      <div className="px-4 py-2 bg-white">
        <div 
          onClick={() => pushScreen({ name: 'search' })}
          className="bg-gray-100 rounded-lg flex items-center justify-center py-1.5 text-gray-400 text-sm cursor-pointer"
        >
          <Search size={16} className="mr-2" />
          <span>搜索</span>
        </div>
      </div>

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
