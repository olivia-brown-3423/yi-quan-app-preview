
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Users, 
  Search, 
  ChevronRight, 
  MessageCircle, 
  MoreHorizontal, 
  Share2, 
  Bell, 
  LogOut, 
  ShieldAlert, 
  Edit3, 
  Megaphone,
  QrCode,
  Check,
  Plus,
  UserPlus,
  UserMinus,
  X,
  CheckCircle,
  Circle
} from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_CHANNELS, CURRENT_USER, FOLLOWED_FRIENDS } from '../../types';

export const ChannelDetail = ({ params }: { params: any }) => {
  const { popScreen, pushScreen } = useNav();
  const [activeTab, setActiveTab] = useState<'info' | 'members'>('info');
  
  // Logic to determine initial join state. 
  // Default changed to false to show the Join button for demonstration.
  const [isJoined, setIsJoined] = useState(params.joined !== undefined ? params.joined : false); 

  const channel = MOCK_CHANNELS.find(c => c.name === params.title) || {
    name: params.title || '未知频道',
    members: params.count || 567,
    id: 'ch_8848123',
    resources: 2394,
    description: '这是一个频道的简介，点击编辑可以修改频道信息。',
    cover: 'https://picsum.photos/id/1018/600/400',
    ownerId: 'me', 
    announcements: ['欢迎新成员加入！本群禁止发布广告。']
  };

  const isOwner = channel.ownerId === 'me' || channel.ownerId === CURRENT_USER.id;
  
  // State for editable fields
  const [channelName, setChannelName] = useState(channel.name);
  const [announcement, setAnnouncement] = useState(channel.announcements?.[0] || '暂无公告');
  const [notification, setNotification] = useState(true);

  // Mock members list - initialize in state
  const [memberList, setMemberList] = useState(() => Array(20).fill(null).map((_, i) => ({
      ...FOLLOWED_FRIENDS[i % FOLLOWED_FRIENDS.length],
      id: `m_${i}`,
      role: i === 0 ? 'owner' : (i < 3 ? 'admin' : 'member')
  })));

  // Invite Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSearchTerm, setInviteSearchTerm] = useState('');
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  
  // Mock Friends to Invite
  const FRIENDS_TO_INVITE = [
      { id: 'u_new_1', name: '隔壁老王', avatar: 'https://picsum.photos/seed/u1/200/200', bio: '爱好多' },
      { id: 'u_new_2', name: '不吃香菜', avatar: 'https://picsum.photos/seed/u2/200/200', bio: '前端开发' },
      { id: 'u_new_3', name: 'Traveler', avatar: 'https://picsum.photos/seed/u3/200/200', bio: '一直在路上' },
      { id: 'u_new_4', name: 'Alice', avatar: 'https://picsum.photos/seed/u4/200/200', bio: 'UI Designer' },
      { id: 'u_new_5', name: 'Bob', avatar: 'https://picsum.photos/seed/u5/200/200', bio: 'Product Manager' },
      { id: 'u_new_6', name: 'Charlie', avatar: 'https://picsum.photos/seed/u6/200/200', bio: 'Fullstack Dev' },
      { id: 'u_new_7', name: 'David', avatar: 'https://picsum.photos/seed/u7/200/200', bio: 'Engineer' },
      { id: 'u_new_8', name: 'Eve', avatar: 'https://picsum.photos/seed/u8/200/200', bio: 'Hacker' },
  ];

  // Handlers
  const handleJoin = () => { setIsJoined(true); };
  const handleExit = () => { 
      if(confirm('确定要退出该频道吗？')) {
          setIsJoined(false); 
          popScreen();
      }
  };
  const handleDisband = () => {
      if(confirm('确定要解散该频道吗？此操作不可逆。')) {
          popScreen();
      }
  };
  const handleEditName = () => {
      if(!isOwner) return;
      const newName = prompt("修改频道名称", channelName);
      if(newName) setChannelName(newName);
  };
  const handleEditAnnouncement = () => {
      if(!isOwner) return;
      const newText = prompt("修改频道公告", announcement);
      if(newText) setAnnouncement(newText);
  };
  
  const handleRemoveMember = (memberId: string, memberName: string) => {
      if (window.confirm(`确定要将 ${memberName} 移出本群吗？`)) {
          setMemberList(prev => prev.filter(m => m.id !== memberId));
      }
  };

  const toggleInvitee = (id: string) => {
      setSelectedInvitees(prev => 
          prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
  };

  const handleConfirmInvite = () => {
      const newMembers = FRIENDS_TO_INVITE.filter(f => selectedInvitees.includes(f.id)).map(f => ({
          ...f,
          role: 'member', // default role
          location: '新加入',
          stats: { likes: 0, mutuals: 0, following: 0, followers: 0, coins: 0 }, // mock
          isVip: false
      }));
      // Prepend new members to the list (or append)
      setMemberList(prev => [...newMembers, ...prev]);
      setShowInviteModal(false);
      setSelectedInvitees([]);
  };

  return (
    <div className="flex flex-col h-full bg-[#f2f4f7] relative">
      {/* --- HERO HEADER --- */}
      <div className="relative w-full h-64 shrink-0 bg-gray-900 group overflow-hidden">
         {/* Background Image */}
         <img src={channel.cover} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" alt="cover" />
         
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
         
         {/* Navbar Actions */}
         <div className="absolute top-0 w-full p-4 pt-safe flex justify-between items-center z-20">
            <button onClick={popScreen} className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-white/20 transition-all">
               <ChevronLeft size={22} />
            </button>
            <div className="flex items-center space-x-3">
               {!isJoined && (
                   <button 
                       onClick={handleJoin}
                       className="bg-blue-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm active:scale-95 transition-all"
                   >
                       加入
                   </button>
               )}
               <button className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-white/20 transition-all">
                   <Share2 size={18} />
               </button>
               <button className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-white/20 transition-all">
                   <MoreHorizontal size={18} />
               </button>
            </div>
         </div>

         {/* Hero Content */}
         <div className="absolute bottom-0 w-full p-5 z-20 flex justify-between items-end">
            <div className="flex-1 mr-4">
                <h1 className="text-2xl font-bold text-white mb-2 leading-snug drop-shadow-md">{channelName}</h1>
                <div className="flex items-center space-x-3 text-xs text-white/80 font-medium">
                    <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">频道号: {channel.id.replace(/\D/g,'') || '8848123'}</span>
                    <span>{channel.members} 成员</span>
                </div>
            </div>
            
            {/* JOIN BUTTON (Floating on Image) */}
            {!isJoined && (
                 <button 
                   onClick={handleJoin}
                   className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-blue-900/40 active:scale-95 transition-all flex items-center animate-in zoom-in"
                 >
                   <Plus size={18} className="mr-1" /> 加入频道
                 </button>
            )}
         </div>
      </div>

      {/* --- TABS --- */}
      <div className="bg-white flex border-b sticky top-0 z-30 shadow-sm rounded-t-xl -mt-4 relative">
         {[
           {id: 'info', label: '主页'},
           {id: 'members', label: '成员'},
         ].map(tab => (
           <div 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex-1 py-3.5 text-sm font-bold text-center cursor-pointer transition-colors relative
               ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400'}`}
           >
              {tab.label}
              {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-900 rounded-full"></div>
              )}
           </div>
         ))}
      </div>

      {/* --- CONTENT --- */}
      <div className="flex-1 overflow-y-auto pb-safe">
         {activeTab === 'info' && (
             <div className="p-4 space-y-4">
                
                {/* Section 1: Basic Info */}
                <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
                    <MenuItem 
                       icon={<Edit3 size={18} />} 
                       label="群名称" 
                       value={channelName} 
                       onClick={isOwner ? handleEditName : undefined}
                       showArrow={isOwner}
                       iconColor="text-blue-500 bg-blue-50"
                    />
                    <MenuItem 
                       icon={<QrCode size={18} />} 
                       label="群二维码" 
                       value={<QrCode size={16} className="text-gray-400" />} 
                       showArrow
                       iconColor="text-gray-500 bg-gray-100"
                    />
                    <div className="flex flex-col px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl" onClick={isOwner ? handleEditAnnouncement : undefined}>
                       <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center space-x-3">
                               <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                   <Megaphone size={16} />
                               </div>
                               <span className="font-medium text-sm text-gray-900">群公告</span>
                           </div>
                           {isOwner && <ChevronRight size={16} className="text-gray-300" />}
                       </div>
                       <p className="text-sm text-gray-500 leading-relaxed pl-11 pr-2 line-clamp-3">
                          {announcement}
                       </p>
                    </div>
                </div>

                {/* Section 2: Members Preview */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setActiveTab('members')}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                               <Users size={16} />
                           </div>
                           <span className="font-medium text-sm text-gray-900">群成员</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                            <span>共 {channel.members} 人</span>
                            <ChevronRight size={16} className="ml-1 text-gray-300" />
                        </div>
                    </div>
                    <div className="flex items-center pl-11 -space-x-2 overflow-hidden py-1">
                        {memberList.slice(0, 6).map(m => (
                            <img key={m.id} src={m.avatar} className="w-8 h-8 rounded-full border-2 border-white" />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-gray-400 text-xs">•••</div>
                    </div>
                </div>

                {/* Section 3: Settings (If Joined) */}
                {isJoined && (
                    <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
                        <div className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer" onClick={() => setNotification(!notification)}>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Bell size={16} />
                                </div>
                                <span className="font-medium text-sm text-gray-900">消息通知</span>
                            </div>
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${notification ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 transition-all ${notification ? 'left-5' : 'left-1'}`}></div>
                            </div>
                        </div>
                        <MenuItem 
                           icon={<Search size={18} />} 
                           label="查找聊天记录" 
                           showArrow
                           iconColor="text-gray-500 bg-gray-100"
                        />
                        <MenuItem 
                           icon={<ShieldAlert size={18} />} 
                           label="投诉" 
                           showArrow
                           iconColor="text-red-500 bg-red-50"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="pt-4 pb-8 space-y-3">
                   {isJoined ? (
                       <>
                          <button 
                             onClick={() => pushScreen({ name: 'chat_detail', params: { title: channelName, count: channel.members } })}
                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                          >
                             <MessageCircle size={20} />
                             <span>进入聊天</span>
                          </button>
                          
                          {isOwner ? (
                              <button 
                                onClick={handleDisband}
                                className="w-full bg-white text-red-500 font-bold py-3.5 rounded-xl border border-gray-200 hover:bg-red-50 active:scale-[0.98] transition-all"
                              >
                                解散群组
                              </button>
                          ) : (
                              <button 
                                onClick={handleExit}
                                className="w-full bg-white text-gray-500 font-bold py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                              >
                                <LogOut size={18} />
                                <span>退出群组</span>
                              </button>
                          )}
                       </>
                   ) : (
                       <button 
                          onClick={handleJoin}
                          className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center"
                       >
                          <Plus size={20} className="mr-2" />
                          加入群组
                       </button>
                   )}
                </div>
             </div>
         )}

         {activeTab === 'members' && (
             <div className="bg-white min-h-full pb-8 animate-in fade-in">
                 {/* Search & Invite Header */}
                 <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-50">
                     <div className="p-3">
                        <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                             <Search size={16} className="text-gray-400 mr-2" />
                             <input type="text" placeholder="搜索群成员" className="bg-transparent text-sm w-full focus:outline-none placeholder:text-gray-400" />
                        </div>
                     </div>
                     
                     <div 
                        className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50"
                        onClick={() => setShowInviteModal(true)}
                     >
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 mr-3">
                              <UserPlus size={20} />
                          </div>
                          <div className="flex-1">
                              <div className="font-bold text-sm text-gray-900">邀请新成员</div>
                              <div className="text-xs text-gray-400">分享链接或二维码邀请好友加入</div>
                          </div>
                          <ChevronRight size={16} className="text-gray-300" />
                     </div>
                 </div>
                 
                 {/* List */}
                 <div className="divide-y divide-gray-50">
                     {memberList.map((m) => (
                         <div key={m.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group">
                             <div className="flex items-center space-x-3 overflow-hidden">
                                 <div className="relative shrink-0">
                                     <img src={m.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                                     {m.role === 'owner' && (
                                         <span className="absolute -bottom-1 -right-1 bg-amber-400 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm border border-white font-bold scale-90">
                                             群主
                                         </span>
                                     )}
                                     {m.role === 'admin' && (
                                         <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm border border-white font-bold scale-90">
                                             管理员
                                         </span>
                                     )}
                                 </div>
                                 <div className="min-w-0">
                                     <div className="text-sm font-bold text-gray-900 truncate">{m.name}</div>
                                     <div className="text-xs text-gray-400 truncate">{m.location || '未知地区'} · {m.bio || '无签名'}</div>
                                 </div>
                             </div>
                             
                             {/* Action Buttons */}
                             {isOwner && m.role !== 'owner' && (
                                 <button 
                                     onClick={() => handleRemoveMember(m.id, m.name)}
                                     className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors"
                                 >
                                     <UserMinus size={18} />
                                 </button>
                             )}
                         </div>
                     ))}
                 </div>
                 <div className="text-center text-xs text-gray-300 py-6">
                      - 仅显示最近活跃成员 -
                 </div>
             </div>
         )}
      </div>

      {/* --- INVITE MODAL --- */}
      {showInviteModal && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setShowInviteModal(false)}></div>
              
              {/* Modal Content */}
              <div className="bg-white w-full h-[85vh] rounded-t-2xl relative z-10 flex flex-col animate-in slide-in-from-bottom duration-300 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                      <button onClick={() => setShowInviteModal(false)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                          <X size={24} />
                      </button>
                      <span className="font-bold text-lg text-gray-900">邀请好友</span>
                      <button 
                          onClick={handleConfirmInvite}
                          disabled={selectedInvitees.length === 0}
                          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${selectedInvitees.length > 0 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-gray-100 text-gray-400'}`}
                      >
                          确定{selectedInvitees.length > 0 ? `(${selectedInvitees.length})` : ''}
                      </button>
                  </div>
                  
                  {/* Search */}
                  <div className="px-4 py-3">
                      <div className="bg-gray-100 rounded-xl px-4 py-2.5 flex items-center">
                          <Search size={18} className="text-gray-400 mr-2" />
                          <input 
                              type="text" 
                              placeholder="搜索好友" 
                              className="bg-transparent text-sm w-full focus:outline-none placeholder:text-gray-400 text-gray-900" 
                              value={inviteSearchTerm}
                              onChange={(e) => setInviteSearchTerm(e.target.value)}
                          />
                      </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto px-2">
                       {/* Filtered List */}
                       {FRIENDS_TO_INVITE.filter(f => f.name.includes(inviteSearchTerm)).map(friend => (
                           <div 
                              key={friend.id}
                              onClick={() => toggleInvitee(friend.id)}
                              className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer mb-1"
                           >
                              <div className="flex items-center space-x-3">
                                  <img src={friend.avatar} className="w-10 h-10 rounded-full border border-gray-100" />
                                  <div>
                                      <div className="font-bold text-gray-900 text-sm">{friend.name}</div>
                                      <div className="text-xs text-gray-400">{friend.bio}</div>
                                  </div>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedInvitees.includes(friend.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                                   {selectedInvitees.includes(friend.id) && <Check size={14} className="text-white" strokeWidth={3} />}
                              </div>
                           </div>
                       ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, value, onClick, showArrow, iconColor }: any) => (
    <div 
       className={`flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 rounded-xl transition-colors ${onClick ? 'cursor-pointer' : ''}`}
       onClick={onClick}
    >
       <div className="flex items-center space-x-3">
           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor}`}>
               {icon}
           </div>
           <span className="font-medium text-sm text-gray-900">{label}</span>
       </div>
       <div className="flex items-center">
           <span className="text-sm text-gray-500 mr-2 truncate max-w-[150px]">{value}</span>
           {showArrow && <ChevronRight size={16} className="text-gray-300" />}
       </div>
    </div>
);
