
import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_COMMUNITY_FEED, MOCK_COMMENTS } from '../../types';

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
