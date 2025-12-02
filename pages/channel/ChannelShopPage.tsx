
import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

export const ChannelShopPage = () => {
  const { popScreen, pushScreen } = useNav();
  
  const displayList = MOCK_PRODUCTS;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700"><ChevronLeft size={24} /></button>
        <span className="font-bold text-lg text-gray-900">群橱窗</span>
        <button className="p-2 -mr-2 text-gray-700"><MoreHorizontal size={24} /></button>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
         <h2 className="font-bold text-lg mb-1">群友优选好物</h2>
         <p className="text-xs opacity-90">严选优质商品 · 仪豆安全交易</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
         <div className="grid grid-cols-2 gap-3">
            {displayList.map(product => (
               <div 
                  key={product.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                  onClick={() => pushScreen({ name: 'product_detail', params: { productId: product.id } })}
               >
                  <div className="relative aspect-square bg-gray-100">
                     <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
                     <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-md">
                        {product.type === 'file' ? '文件' : product.type === 'video_collection' ? '视频' : '虚拟'}
                     </div>
                  </div>
                  <div className="p-3">
                     <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 h-10 leading-snug">{product.title}</h3>
                     <div className="flex items-center justify-between">
                        <div className="text-red-500 font-bold text-sm">
                           <span className="text-xs">¥</span> {product.price}
                        </div>
                        <span className="text-[10px] text-gray-400">已售 {product.sales}</span>
                     </div>
                     <div className="mt-2 flex items-center space-x-1.5 pt-2 border-t border-gray-50">
                        <img src={product.seller.avatar} className="w-4 h-4 rounded-full" alt="avatar" />
                        <span className="text-[10px] text-gray-500 truncate">{product.seller.name}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <div className="text-center text-xs text-gray-400 mt-6 pb-6">
            — 到底了 —
         </div>
      </div>
    </div>
  );
};
