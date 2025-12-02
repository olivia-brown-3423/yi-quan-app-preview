
import React from 'react';
import { Search, UserPlus, MessageCircle, Hash } from 'lucide-react';
import { CONTACT_GROUPS, MY_CHANNELS, FOLLOWED_FRIENDS } from '../types';
import { useNav } from '../context/NavContext';

export const ContactsTab = () => {
  const { pushScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4">
        <div className="w-8"></div>
        <span className="font-medium text-lg text-gray-800">通讯录</span>
        <button onClick={() => pushScreen({ name: 'add_friend' })} className="p-2 text-gray-600">
          <UserPlus size={24} />
        </button>
      </div>

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
