
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Plus, 
  MoreVertical, 
  PlayCircle, 
  Share2, 
  Trash2, 
  Edit3, 
  Globe, 
  Lock, 
  CheckSquare, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Video, 
  UploadCloud,
  X
} from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_COLLECTIONS, MOCK_VIDEOS } from '../../types';

export const CollectionDetailPage = ({ params }: { params: { id: string } }) => {
  const { popScreen, pushScreen } = useNav();
  const collection = MOCK_COLLECTIONS.find(c => c.id === params.id) || MOCK_COLLECTIONS[0];
  
  const [showMenu, setShowMenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Mock items inside collection with better copy
  const items = [
     { ...MOCK_VIDEOS[0], title: '电影感开场：城市微光', desc: '使用 Davinci Resolve 调色，营造赛博朋克氛围。', time: '2024-12-04' },
     { ...MOCK_VIDEOS[1], title: '幕后花絮：拍摄背后的故事', desc: '记录零下20度的坚持与热爱。', time: '2024-11-20' },
     { ...MOCK_VIDEOS[2], title: '色彩美学：调色思路解析', desc: '从 Log 到 Rec.709，还原最真实的色彩情感。', time: '2024-10-15' },
     { ...MOCK_VIDEOS[3], title: '上海展会：科技与艺术的交融', desc: '通过镜头记录下的工业之美。', time: '2024-09-08' },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative" onClick={() => { setShowMenu(false); setShowAddMenu(false); }}>
      {/* Header */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-20">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700 active:opacity-60">
           <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900 truncate max-w-[150px]">{collection.title}</span>
        
        <div className="flex space-x-1 relative">
           {/* Add Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); setShowAddMenu(!showAddMenu); setShowMenu(false); }} 
             className={`p-2 rounded-full transition-colors ${showAddMenu ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
           >
             <Plus size={24} />
           </button>

           {/* More Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); setShowAddMenu(false); }} 
             className={`p-2 -mr-2 rounded-full transition-colors ${showMenu ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
           >
             <MoreVertical size={24} />
           </button>

           {/* Dropdown: Add Content */}
           {showAddMenu && (
             <div className="absolute top-12 right-10 w-44 bg-white shadow-xl border border-gray-100 rounded-xl py-2 z-30 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 text-xs text-gray-400 font-medium">添加内容至作品集</div>
                <MenuItem icon={<Video size={18}/>} label="选自我的作品" onClick={() => console.log('select')} />
                <MenuItem icon={<UploadCloud size={18}/>} label="上传本地内容" onClick={() => console.log('upload')} />
                <MenuItem icon={<LinkIcon size={18}/>} label="粘贴外部链接" onClick={() => console.log('link')} />
             </div>
           )}

           {/* Dropdown: More Options */}
           {showMenu && (
             <div className="absolute top-12 right-0 w-48 bg-white shadow-xl border border-gray-100 rounded-xl py-2 z-30 animate-in fade-in slide-in-from-top-2">
                <MenuItem icon={<Share2 size={18}/>} label="分享作品集" onClick={() => console.log('share')} />
                <MenuItem icon={<Edit3 size={18}/>} label="编辑信息" onClick={() => pushScreen({name: 'create_collection'})} />
                <MenuItem icon={<CheckSquare size={18}/>} label="批量管理" onClick={() => console.log('batch')} />
                <div className="h-px bg-gray-100 my-1 mx-4" />
                <MenuItem icon={collection.isPublic ? <Lock size={18}/> : <Globe size={18}/>} label={collection.isPublic ? "设为私密" : "设为公开"} onClick={() => console.log('privacy')} />
                <MenuItem icon={<Trash2 size={18}/>} label="删除作品集" danger onClick={() => console.log('delete')} />
             </div>
           )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-50 p-6 border-b border-gray-100 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
         
         <div className="relative z-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{collection.title}</h1>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed opacity-90">{collection.description}</p>
            
            <div className="flex items-center space-x-3">
               <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border ${collection.isPublic ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
                  {collection.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                  <span>{collection.isPublic ? '公开可见' : '仅自己可见'}</span>
               </div>
               <div className="flex items-center space-x-1 text-gray-500 bg-white px-2.5 py-1 rounded-full text-xs border border-gray-200 shadow-sm">
                  <PlayCircle size={12} />
                  <span>{collection.videoCount} 个内容</span>
               </div>
            </div>
         </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto bg-white">
         <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50 sticky top-0 backdrop-blur-sm z-10">
            内容列表
         </div>
         {items.map((item, idx) => (
            <div 
               key={idx} 
               className="flex p-4 border-b border-gray-50 cursor-pointer active:bg-gray-50 transition-colors group"
               onClick={() => pushScreen({ name: 'video_detail', params: { postId: item.id } })}
            >
               {/* Thumbnail */}
               <div className="w-36 h-24 bg-gray-100 rounded-lg relative overflow-hidden shrink-0 mr-4 border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                  <img src={item.videoInfo?.cover} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt="cover" />
                  <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                     {item.videoInfo?.duration || '03:45'}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                     <PlayCircle className="text-white drop-shadow-lg scale-90 group-hover:scale-100 transition-transform" size={32} />
                  </div>
               </div>

               {/* Info */}
               <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                     <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                           {item.title}
                        </h3>
                     </div>
                     <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                     <div className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{item.time}</div>
                     <button className="text-gray-300 hover:text-gray-600 p-1 -mr-2 active:bg-gray-100 rounded-full">
                        <MoreVertical size={16} />
                     </button>
                  </div>
               </div>
            </div>
         ))}
         
         {/* Footer */}
         <div className="py-10 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-300 mb-2">
               <ImageIcon size={20} />
            </div>
            <div className="text-xs text-gray-400">
               - 已显示全部内容 -
            </div>
         </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, onClick, danger }: { icon: React.ReactNode, label: string, onClick?: () => void, danger?: boolean }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    className={`w-full text-left px-4 py-2.5 flex items-center text-sm transition-colors hover:bg-gray-50 ${danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700'}`}
  >
    <span className={`mr-3 ${danger ? 'text-red-500' : 'text-gray-500'}`}>{icon}</span>
    {label}
  </button>
);
