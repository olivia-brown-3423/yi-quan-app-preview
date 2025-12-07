
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Hash, 
  User, 
  Music2, 
  Plus,
  Search,
  MoreHorizontal,
  ArrowRight,
  Users,
  FileText
} from 'lucide-react';
import { MOCK_CHANNELS, MOCK_VIDEOS } from '../types';
import { useNav } from '../context/NavContext';

export const ChannelsTab = () => {
  const { pushScreen } = useNav();
  // 'channels' = The new list view (Design), 'recommend' = The TikTok video feed
  const [activeTab, setActiveTab] = useState<'channels' | 'recommend'>('channels');

  return (
    <div className="flex flex-col h-full bg-white relative">
       {/* Global Top Tabs (Floating on Video, Static on List) */}
       <div className={`w-full z-30 flex justify-between items-center px-4 pt-2 pb-2 transition-colors ${activeTab === 'recommend' ? 'absolute top-0 left-0 bg-transparent text-white pointer-events-none' : 'bg-white text-gray-900 sticky top-0 border-b border-gray-100'}`}>
         <div className="w-8 pointer-events-auto">
            {activeTab === 'channels' ? (
                <Search size={24} className="text-gray-900" onClick={() => pushScreen({ name: 'search' })} />
            ) : (
                <Search size={24} className="text-white/80" onClick={() => pushScreen({ name: 'search' })} />
            )}
         </div>
         <div className="flex space-x-8 text-lg font-bold pointer-events-auto">
           <button 
             onClick={() => setActiveTab('channels')}
             className={`transition-all relative pb-1 ${activeTab === 'channels' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
           >
             频道
             {activeTab === 'channels' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-black rounded-full"></div>}
           </button>
           <button 
             onClick={() => setActiveTab('recommend')}
             className={`transition-all relative pb-1 ${activeTab === 'recommend' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
           >
             推荐
             {activeTab === 'recommend' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full"></div>}
           </button>
         </div>
         <div className="w-8 flex justify-end pointer-events-auto">
            <Plus size={28} className={activeTab === 'recommend' ? 'text-white/80' : 'text-gray-900'} onClick={() => pushScreen({ name: 'create_channel' })} />
         </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-hidden relative">
         {activeTab === 'channels' ? <ChannelListView /> : <RecommendVideoView />}
       </div>
    </div>
  );
};

// --- Sub-View: Channel List (New Design) ---
const ChannelListView = () => {
    const { pushScreen } = useNav();
    const [subTab, setSubTab] = useState('discover');

    // Extended Mock Data for display
    const MY_JOINED = [
        { id: 'mj1', name: '在线分析仪...', icon: 'https://picsum.photos/id/1015/100/100', hasNew: true },
        { id: 'mj2', name: '聚仪堂技术...', icon: 'https://picsum.photos/id/1016/100/100', hasNew: true },
        { id: 'mj3', name: '何刺刺的后...', icon: 'https://picsum.photos/id/1018/100/100', hasNew: false },
    ];

    const DISCOVER_LIST = [
        {
            ...MOCK_CHANNELS[0],
            tags: ['频道号: 1001', '567 人加入'],
            desc: '该频道由中国仪表协会主办，主要为推动国产仪器仪表发展...',
            avatars: ['https://picsum.photos/id/10/50/50', 'https://picsum.photos/id/11/50/50', 'https://picsum.photos/id/12/50/50'],
            isJoined: true
        },
        {
            ...MOCK_CHANNELS[1],
            tags: ['频道号: 1002', '1567 人加入'],
            desc: '仪聚信息技术支持圈，解决APP各类问题，技术大牛在线...',
            avatars: ['https://picsum.photos/id/20/50/50', 'https://picsum.photos/id/21/50/50'],
            isJoined: true
        },
        {
            ...MOCK_CHANNELS[2],
            tags: ['频道号: 1003', '20 人加入'],
            desc: '记录生活，分享快乐。这里是我的个人后花园。',
            avatars: ['https://picsum.photos/id/30/50/50'],
            isJoined: true
        },
        {
            id: 'ch_new1',
            name: '仪器仪表技术交流1群',
            cover: 'https://picsum.photos/id/1020/300/300',
            tags: ['频道号: 1004', '173 人加入'],
            desc: '欢迎各位同行加入交流，禁止广告。纯技术讨论区。',
            members: 173,
            resources: 0,
            ownerId: 'u_xx',
            description: '',
            avatars: [],
            isJoined: false
        },
        {
            id: 'ch_new2',
            name: '仪器仪表技术交流2群',
            cover: 'https://picsum.photos/id/1021/300/300',
            tags: ['频道号: 1005', '296 人加入'],
            desc: '欢迎各位同行加入交流，禁止广告。资源共享区。',
            members: 296,
            resources: 0,
            ownerId: 'u_yy',
            description: '',
            avatars: [],
            isJoined: false
        }
    ];

    return (
        <div className="h-full overflow-y-auto bg-white no-scrollbar">
            {/* Search Bar */}
            <div className="px-4 py-2">
                <div className="bg-gray-100 rounded-full flex items-center justify-center py-2 text-gray-400 text-sm">
                    <Search size={16} className="mr-2" />
                    <span>搜索感兴趣的频道...</span>
                </div>
            </div>

            {/* My Channels Section */}
            <div className="mt-2 px-4 pb-6 border-b border-gray-50">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-900 text-base">我的频道</h3>
                    <span className="text-xs text-gray-400 flex items-center">管理 <MoreHorizontal size={12} className="ml-1"/></span>
                </div>
                <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                    {MY_JOINED.map((item) => (
                        <div key={item.id} className="flex flex-col items-center shrink-0 w-16 space-y-2 cursor-pointer" onClick={() => pushScreen({ name: 'channel_detail', params: { title: item.name } })}>
                            <div className="relative w-14 h-14">
                                <img src={item.icon} className="w-full h-full rounded-2xl object-cover shadow-sm border border-gray-100" />
                                {item.hasNew && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>}
                            </div>
                            <span className="text-xs text-gray-600 text-center truncate w-full">{item.name}</span>
                        </div>
                    ))}
                    {/* Add Button */}
                    <div className="flex flex-col items-center shrink-0 w-16 space-y-2 cursor-pointer" onClick={() => pushScreen({ name: 'create_channel' })}>
                        <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 active:bg-gray-100">
                            <Plus size={24} />
                        </div>
                        <span className="text-xs text-gray-400">加入</span>
                    </div>
                </div>
            </div>

            {/* Discover Section */}
            <div className="pt-2">
                {/* Tabs */}
                <div className="flex items-center px-4 mb-2">
                    <span className="text-lg font-bold text-gray-900 mr-4">发现频道</span>
                    <div className="flex space-x-4 text-sm text-gray-500 font-medium pt-1">
                        <span className="text-gray-400 cursor-pointer hover:text-gray-900">同城</span>
                        <span className="text-gray-400 cursor-pointer hover:text-gray-900">榜单</span>
                    </div>
                </div>

                {/* List */}
                <div className="px-4 pb-20 space-y-6">
                    {DISCOVER_LIST.map((channel, index) => (
                        <div 
                            key={channel.id} 
                            className="flex items-start group cursor-pointer active:opacity-70 transition-opacity"
                            onClick={() => pushScreen({ name: 'channel_detail', params: { title: channel.name, count: channel.members } })}
                        >
                            {/* Left: Cover Image */}
                            <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100 mr-3">
                                {channel.cover ? (
                                    <img src={channel.cover} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                        <Hash size={32} />
                                    </div>
                                )}
                            </div>

                            {/* Right: Info */}
                            <div className="flex-1 min-w-0 border-b border-gray-50 pb-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1">{channel.name}</h3>
                                </div>
                                
                                {/* Tags Row */}
                                <div className="flex items-center space-x-2 mb-1.5">
                                    {channel.tags && channel.tags.map((tag, i) => (
                                        <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${i === 0 ? 'bg-gray-100 text-gray-500' : 'text-gray-400'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2.5">
                                    {channel.description || channel.desc}
                                </p>

                                {/* Bottom: Avatars + Button */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center pl-2">
                                        {channel.avatars && channel.avatars.length > 0 ? (
                                            <>
                                                {channel.avatars.map((avatar, i) => (
                                                    <img key={i} src={avatar} className="w-5 h-5 rounded-full border border-white -ml-2" />
                                                ))}
                                                <div className="w-5 h-5 rounded-full border border-white bg-gray-100 -ml-2 flex items-center justify-center text-[8px] text-gray-500 font-bold">
                                                    +99
                                                </div>
                                            </>
                                        ) : (
                                            <span className="text-[10px] text-gray-400">暂无活跃成员</span>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    {channel.isJoined ? (
                                        <button className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform">
                                            进入
                                        </button>
                                    ) : (
                                        <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform">
                                            加入
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Padding for bottom nav */}
                    <div className="h-10"></div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-View: Video Feed Item (Support Horizontal Swipe for Profile) ---
const VideoFeedItem = ({ item }: { item: any }) => {
    const { pushScreen } = useNav();
    const horizontalRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            className="w-full h-full snap-center overflow-x-auto snap-x snap-mandatory flex no-scrollbar relative group/item" 
            ref={horizontalRef}
        >
            {/* Slide 1: Video Player */}
            <div className="min-w-full w-full h-full snap-center relative bg-gray-900 shrink-0">
                <div className="w-full h-full relative">
                    {/* Video/Image Cover */}
                    <img 
                        src={item.video.videoInfo?.cover} 
                        className="absolute inset-0 w-full h-full object-cover opacity-90" 
                        alt="video-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>

                    {/* TOP HEADER (Floating) */}
                    <div className="absolute top-16 left-0 w-full px-4 flex justify-between items-start z-20 pointer-events-none">
                        <div className="w-10"></div> 
                        
                        {/* Center: User Name Pill */}
                        <div 
                        className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center space-x-2 shadow-lg pointer-events-auto cursor-pointer active:scale-95 transition-transform"
                        onClick={() => pushScreen({ name: 'user_profile', params: { id: item.video.user.id } })}
                        >
                        <User size={14} className="text-white" />
                        <span className="text-xs font-bold tracking-wide truncate max-w-[150px] text-white">{item.video.user.name}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50"></span>
                        <span className="text-[10px] text-white/80">进入主页</span>
                        </div>

                        {/* Right: Chat Button (Links to CHANNEL Chat now) */}
                        <button 
                        className="w-11 h-11 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/30 active:scale-90 transition-transform pointer-events-auto border border-blue-400/50 hover:bg-blue-500"
                        onClick={() => pushScreen({ name: 'chat_detail', params: { title: item.channel.name, count: item.channel.members } })}
                        >
                        <MessageCircle size={22} fill="currentColor" className="text-white" />
                        </button>
                    </div>

                    {/* Right Sidebar Interaction */}
                    <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-6 z-20 w-14">
                        {/* User Avatar */}
                        <div className="relative mb-2">
                        <img 
                            src={item.video.user.avatar} 
                            className="w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-pointer" 
                            onClick={() => pushScreen({ name: 'user_profile', params: { id: item.video.user.id } })}
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-white">
                            <Plus size={10} className="text-white" />
                        </div>
                        </div>

                        {/* Join Channel Button */}
                        <div className="flex flex-col items-center animate-in slide-in-from-right duration-500 delay-100 pb-2">
                            <button 
                                className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/30 active:scale-90 transition-transform border border-white/30 backdrop-blur-md relative overflow-hidden group/btn"
                                onClick={() => pushScreen({ name: 'channel_detail', params: { title: item.channel.name, count: item.channel.members } })}
                            >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                            <Hash size={18} className="text-white relative z-10" />
                            </button>
                            <span className="text-[10px] font-medium text-white/90 shadow-black drop-shadow-md mt-1.5 tracking-wide">加入频道</span>
                        </div>

                        {/* Likes */}
                        <div className="flex flex-col items-center space-y-1">
                        <Heart size={30} className="text-white drop-shadow-md cursor-pointer active:scale-75 transition-transform" />
                        <span className="text-xs font-medium shadow-black drop-shadow-md text-white">{item.video.stats.likes}</span>
                        </div>

                        {/* Comments */}
                        <div className="flex flex-col items-center space-y-1">
                        <MessageCircle size={30} className="text-white drop-shadow-md cursor-pointer" />
                        <span className="text-xs font-medium shadow-black drop-shadow-md text-white">{item.video.stats.comments}</span>
                        </div>

                        {/* Share */}
                        <div className="flex flex-col items-center space-y-1">
                        <Share2 size={30} className="text-white drop-shadow-md cursor-pointer" />
                        <span className="text-xs font-medium shadow-black drop-shadow-md text-white">分享</span>
                        </div>
                    </div>

                    {/* Bottom Info (Personal) */}
                    <div className="absolute bottom-4 left-0 w-full px-4 pb-16 z-20 pointer-events-none">
                        <div className="max-w-[80%] pointer-events-auto">
                        <div 
                            className="font-bold text-lg mb-2 text-white drop-shadow-md flex items-center cursor-pointer"
                            onClick={() => pushScreen({ name: 'user_profile', params: { id: item.video.user.id } })}
                        >
                            @{item.video.user.name}
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed mb-3 drop-shadow-md line-clamp-2">
                            {item.desc}
                        </p>
                        <div className="flex items-center text-white/70 text-xs space-x-2">
                            <Music2 size={12} className="animate-spin-slow" />
                            <div className="w-32 overflow-hidden">
                                <div className="whitespace-nowrap">{item.music}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 2: Channel Profile Preview */}
            <div className="min-w-full w-full h-full snap-center relative bg-gray-950 shrink-0 flex items-center justify-center">
                 {/* Background Blur */}
                 <div className="absolute inset-0 overflow-hidden">
                    <img src={item.channel.cover} className="w-full h-full object-cover blur-3xl opacity-30 scale-110" />
                    <div className="absolute inset-0 bg-black/40"></div>
                 </div>

                 {/* Content Card */}
                 <div className="relative z-10 w-full max-w-sm p-8 flex flex-col items-center text-center animate-in zoom-in duration-300">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 mb-6 relative group/icon">
                        <img src={item.channel.cover} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover/icon:bg-transparent transition-colors"></div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2">{item.channel.name}</h2>
                    <div className="flex items-center space-x-3 text-white/60 text-xs mb-6">
                        <span className="flex items-center"><Users size={12} className="mr-1" /> {item.channel.members} 成员</span>
                        <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                        <span className="flex items-center"><FileText size={12} className="mr-1" /> {item.channel.resources} 资源</span>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed mb-8 line-clamp-4 px-4">
                        {item.channel.description || item.channel.desc}
                    </p>

                    <button 
                        onClick={() => pushScreen({ name: 'channel_detail', params: { title: item.channel.name } })}
                        className="w-full bg-white text-black py-4 rounded-full font-bold text-base flex items-center justify-center space-x-2 hover:bg-gray-100 active:scale-95 transition-all shadow-lg shadow-white/10"
                    >
                        <span>进入频道主页</span>
                        <ArrowRight size={18} />
                    </button>
                 </div>
            </div>
        </div>
    );
};

// --- Sub-View: Recommend Videos (Vertical Feed) ---
const RecommendVideoView = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Enhanced Mock Data
    const EXTENDED_CHANNEL_FEED = useMemo(() => [
        {
            id: 'f1',
            channel: MOCK_CHANNELS[0], // Expo
            video: MOCK_VIDEOS[0],
            desc: '今年的展会现场人山人海！好多新技术，国产仪器正在崛起！',
            music: '展会现场原声'
        },
        {
            id: 'f2',
            channel: MOCK_CHANNELS[1], // Tech Group
            video: MOCK_VIDEOS[1],
            desc: '现场调试遇到个棘手的问题，求群里大佬支招！PID参数怎么调都不对。',
            music: '工程师日常创作'
        },
        {
            id: 'f3',
            channel: MOCK_CHANNELS[0],
            video: MOCK_VIDEOS[3],
            desc: '开箱新到的分析仪，细节做得真不错，外壳工艺提升很大。',
            music: '科技前沿 · 节奏感'
        },
        {
            id: 'f4',
            channel: MOCK_CHANNELS[2], // Personal Garden
            video: MOCK_VIDEOS[2],
            desc: '分享一段我的静谧时光，工作之余也要学会放松。',
            music: '轻音乐 · 放松'
        },
        {
            id: 'f5',
            channel: { ...MOCK_CHANNELS[1], name: '自动化编程俱乐部', cover: 'https://picsum.photos/id/1033/300/300' },
            video: { ...MOCK_VIDEOS[1], videoInfo: { ...MOCK_VIDEOS[1].videoInfo, cover: 'https://picsum.photos/id/180/400/600' }, user: { ...MOCK_VIDEOS[1].user, name: 'PLC老司机' } },
            desc: 'S7-1200 Modbus TCP 通讯实战演示，需要的自取。',
            music: '教学原声'
        },
        {
            id: 'f6',
            channel: { ...MOCK_CHANNELS[0], name: '环保监测站', cover: 'https://picsum.photos/id/1035/300/300' },
            video: { ...MOCK_VIDEOS[3], videoInfo: { ...MOCK_VIDEOS[3].videoInfo, cover: 'https://picsum.photos/id/190/400/600' }, user: { ...MOCK_VIDEOS[3].user, name: '环保卫士' } },
            desc: 'CEMS 系统日常巡检 vlog，爬烟囱的一天。',
            music: '奋斗者之歌'
        },
        {
            id: 'f7',
            channel: MOCK_CHANNELS[2],
            video: { ...MOCK_VIDEOS[2], videoInfo: { ...MOCK_VIDEOS[2].videoInfo, cover: 'https://picsum.photos/id/210/400/600' }, user: { ...MOCK_VIDEOS[2].user, name: '生活家' } },
            desc: '周末去露营，带上吉他和心爱的她。',
            music: '原声吉他 · 纯音乐'
        },
        {
            id: 'f8',
            channel: MOCK_CHANNELS[0],
            video: { ...MOCK_VIDEOS[0], videoInfo: { ...MOCK_VIDEOS[0].videoInfo, cover: 'https://picsum.photos/id/220/400/600' }, user: { ...MOCK_VIDEOS[0].user, name: '黑科技' } },
            desc: '这是什么神仙仪器？测量速度也太快了吧！',
            music: '赛博朋克 2077 原声带'
        }
    ], []);

    const [randomFeed, setRandomFeed] = useState(EXTENDED_CHANNEL_FEED);

    // Randomize feed order on mount
    useEffect(() => {
        const shuffled = [...EXTENDED_CHANNEL_FEED].sort(() => 0.5 - Math.random());
        setRandomFeed(shuffled);
    }, [EXTENDED_CHANNEL_FEED]);

    return (
        <div className="relative h-full w-full bg-black group">
            {/* Vertical Container (Main Feed) */}
            <div 
                ref={scrollContainerRef}
                className="flex flex-col h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar"
            >
                {randomFeed.map((item) => (
                    <div key={item.id} className="w-full h-full shrink-0 snap-start">
                         <VideoFeedItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
