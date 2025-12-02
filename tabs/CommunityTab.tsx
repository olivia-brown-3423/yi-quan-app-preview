
import React, { useState } from 'react';
import { Search, Plus, PlayCircle, Heart, Share2, Target, Users, MessageSquare as CommentIcon, Video } from 'lucide-react';
import { MOCK_COMMUNITY_FEED } from '../types';
import { useNav } from '../context/NavContext';

export const CommunityTab = () => {
  const { pushScreen } = useNav();
  const [subTab, setSubTab] = useState('dynamic');

  const getFilteredFeed = (type: string) => {
     if (type === 'dynamic') return MOCK_COMMUNITY_FEED.filter(i => i.type === 'dynamic' || !i.type);
     return MOCK_COMMUNITY_FEED.filter(i => i.type === type);
  };

  const renderContent = () => {
    const feed = getFilteredFeed(subTab);

    if (feed.length === 0) {
      return <div className="p-8 text-center text-gray-400">暂无内容</div>;
    }

    if (subTab === 'video') {
       return (
          <div className="flex-1 overflow-y-auto p-2">
             <div className="grid grid-cols-2 gap-2">
                {feed.map(item => (
                   <div 
                     key={item.id} 
                     className="bg-white rounded-lg overflow-hidden shadow-sm relative cursor-pointer group"
                     onClick={() => pushScreen({ name: 'video_detail', params: { postId: item.id } })}
                   >
                      <div className="relative aspect-[3/4]">
                         <img src={item.videoInfo?.cover} className="w-full h-full object-cover" />
                         <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">
                            {item.videoInfo?.duration}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <PlayCircle className="text-white" size={32} />
                         </div>
                      </div>
                      <div className="p-2">
                         <div className="text-sm font-medium line-clamp-2 text-gray-900 mb-1 leading-snug">{item.content}</div>
                         <div className="flex items-center justify-between text-xs text-gray-400">
                             <div className="flex items-center">
                                <img src={item.user.avatar} className="w-4 h-4 rounded-full mr-1" />
                                <span className="truncate max-w-[60px]">{item.user.name}</span>
                             </div>
                             <div className="flex items-center">
                                <Heart size={10} className="mr-0.5" />
                                {item.stats.likes}
                             </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       );
    }

    if (subTab === 'project') {
       return (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
             {feed.map(item => (
                <div 
                   key={item.id} 
                   className="bg-white p-4 rounded-xl shadow-sm cursor-pointer border border-transparent hover:border-blue-100 transition-colors"
                   onClick={() => pushScreen({ name: 'project_detail', params: { postId: item.id } })}
                >
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase
                           ${item.projectInfo?.status === 'recruiting' ? 'bg-green-100 text-green-600' : 
                             item.projectInfo?.status === 'funding' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                           {item.projectInfo?.status === 'recruiting' ? '招募中' : 
                            item.projectInfo?.status === 'funding' ? '众筹中' : '已完成'}
                        </span>
                        {item.tags?.map(t => <span key={t} className="text-xs text-gray-500 bg-gray-50 px-1 rounded">{t}</span>)}
                      </div>
                      <span className="text-xs text-gray-400">{item.time}</span>
                   </div>
                   
                   <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                   <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.content}</p>

                   {/* Progress */}
                   {item.projectInfo?.progress !== undefined && (
                      <div className="mb-3">
                         <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>进度 {item.projectInfo.progress}%</span>
                            {item.projectInfo.targetAmount && (
                               <span>目标 ¥{item.projectInfo.targetAmount.toLocaleString()}</span>
                            )}
                         </div>
                         <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${item.projectInfo.status === 'funding' ? 'bg-orange-500' : 'bg-green-500'}`} 
                              style={{ width: `${item.projectInfo.progress}%` }}
                            ></div>
                         </div>
                      </div>
                   )}

                   <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div className="flex items-center">
                         <img src={item.user.avatar} className="w-5 h-5 rounded-full mr-2" />
                         <span className="text-xs text-gray-500">{item.user.name}</span>
                      </div>
                      <div className="flex space-x-4 text-gray-400 text-xs">
                         <span className="flex items-center"><Target size={12} className="mr-1" /> {item.projectInfo?.location || '远程'}</span>
                         <span className="flex items-center"><Users size={12} className="mr-1" /> {item.projectInfo?.roles?.length || 0} 岗位</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       );
    }

    return (
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {feed.map((item) => {
          if (item.type === 'article') {
            return (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50 transition-colors cursor-pointer flex justify-between"
                onClick={() => pushScreen({ name: 'article_detail', params: { postId: item.id } })}
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <div className="text-xs text-gray-400 flex items-center space-x-2">
                    <span>{item.user.name}</span>
                    <span>{item.time}</span>
                    <span>{item.stats.likes} 赞</span>
                  </div>
                </div>
                {item.images && <img src={item.images[0]} className="w-24 h-16 object-cover rounded" alt="cover" />}
              </div>
            );
          }
          if (item.type === 'qa') {
             return (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => pushScreen({ name: 'qa_detail', params: { postId: item.id } })}
              >
                 <div className="flex items-center space-x-2 mb-2">
                   <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded font-bold">问</span>
                   <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                 </div>
                 <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.content}</p>
                 <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex space-x-2">
                       {(item.tags || []).map(tag => <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded">{tag}</span>)}
                    </div>
                    <span>{item.stats.comments} 回答</span>
                 </div>
              </div>
             );
          }
          // Dynamic & Video fallback
          return (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => pushScreen({ name: 'community_detail', params: { postId: item.id } })}
            >
              <div className="flex items-center mb-3">
                <img src={item.user.avatar} className="w-10 h-10 rounded-full mr-3" alt="avatar" />
                <div>
                  <div className="font-medium text-gray-900">{item.user.name}</div>
                  <div className="text-xs text-gray-400">刚刚</div>
                </div>
              </div>
              
              <p className="text-gray-800 mb-3 text-base leading-relaxed">{item.content}</p>
              
              {item.images && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img src={item.images[0]} alt="content" className="w-full h-auto object-cover max-h-60" />
                </div>
              )}

              {item.hasVideo && (
                <div className="mb-3 rounded-lg overflow-hidden bg-black h-48 flex items-center justify-center relative">
                   <Video className="text-white w-12 h-12 opacity-80" />
                   <span className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">10:42</span>
                </div>
              )}

              <div className="flex items-center justify-between text-gray-500 text-sm mt-2 pt-2 border-t border-gray-50">
                 <span className="text-xs text-gray-400">{item.time}</span>
                 <div className="flex space-x-6">
                   <button className="flex items-center space-x-1 hover:text-red-500">
                     <Heart size={16} /> <span>{item.stats.likes}</span>
                   </button>
                   <button className="flex items-center space-x-1 hover:text-blue-500">
                     <CommentIcon size={16} /> <span>{item.stats.comments}</span>
                   </button>
                   <button className="flex items-center space-x-1 hover:text-green-500">
                     <Share2 size={16} />
                   </button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4">
        <div className="flex-1 flex justify-center">
            <span className="font-medium text-lg text-gray-800">社区</span>
        </div>
        <div className="absolute right-4 flex space-x-3 text-gray-600">
          <Search size={22} onClick={() => pushScreen({ name: 'search' })} />
          <Plus size={22} onClick={() => pushScreen({ name: 'publish' })} />
        </div>
      </div>

      <div className="flex bg-white border-b text-sm text-gray-500 sticky top-0 z-10">
        {[
           { id: 'dynamic', label: '动态' },
           { id: 'video', label: '视频' },
           { id: 'qa', label: '问一问' },
           { id: 'article', label: '文章' },
           { id: 'project', label: '项目' }
        ].map((tab) => (
          <div 
            key={tab.id} 
            onClick={() => setSubTab(tab.id)}
            className={`flex-1 py-3 text-center cursor-pointer transition-all ${subTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : ''}`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};
