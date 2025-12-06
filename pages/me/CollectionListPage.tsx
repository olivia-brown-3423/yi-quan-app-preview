
import React from 'react';
import { ChevronLeft, Plus, MoreVertical, Search, Globe, Lock } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_COLLECTIONS } from '../../types';

export const CollectionListPage = () => {
  const { popScreen, pushScreen } = useNav();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700">
           <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900">我的作品集</span>
        <div className="flex space-x-2">
           <button className="p-2 text-gray-700"><Search size={22} /></button>
           <button 
             onClick={() => pushScreen({ name: 'create_collection' })}
             className="p-2 -mr-2 text-blue-600"
            >
             <Plus size={24} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {MOCK_COLLECTIONS.map(collection => (
          <div 
            key={collection.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col cursor-pointer active:scale-[0.99] transition-transform"
            onClick={() => pushScreen({ name: 'collection_detail', params: { id: collection.id } })}
          >
            <div className="relative h-48 bg-gray-200">
               <img src={collection.cover} className="w-full h-full object-cover" alt="cover" />
               <div className="absolute top-2 right-2">
                 {collection.isPublic ? (
                    <span className="bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full flex items-center">
                       <Globe size={12} className="mr-1" /> 公开
                    </span>
                 ) : (
                    <span className="bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full flex items-center">
                       <Lock size={12} className="mr-1" /> 私密
                    </span>
                 )}
               </div>
            </div>
            <div className="p-4">
               <div className="flex justify-between items-start">
                  <div>
                     <h3 className="font-bold text-lg text-gray-900 mb-1">{collection.title}</h3>
                     <p className="text-gray-500 text-sm mb-2 line-clamp-2">{collection.description}</p>
                     <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded inline-block">
                        {collection.videoCount} 个作品
                     </div>
                  </div>
                  <button className="text-gray-400 p-1">
                     <MoreVertical size={20} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
