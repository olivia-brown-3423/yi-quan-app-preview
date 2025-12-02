
import React from 'react';
import { ChevronLeft, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_COMMUNITY_FEED } from '../../types';

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
