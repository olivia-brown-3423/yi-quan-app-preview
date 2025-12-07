
import React, { useState } from 'react';
import { ChevronLeft, Plus, Archive, MoreHorizontal, Trash2 } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

export const ProductManagementPage = () => {
   const { popScreen, pushScreen } = useNav();
   const [activeTab, setActiveTab] = useState<'on_shelf' | 'off_shelf'>('on_shelf');
   
   const [productList, setProductList] = useState(MOCK_PRODUCTS);
   const [openMenuId, setOpenMenuId] = useState<string | null>(null);

   const myProducts = productList.filter(p => p.seller.id === 'me');
   const displayProducts = myProducts.filter(p => p.status === activeTab);

   const updateStatus = (id: string, newStatus: 'on_shelf' | 'off_shelf') => {
      setProductList(prev => prev.map(p => {
         if (p.id === id) {
             const mockItem = MOCK_PRODUCTS.find(m => m.id === id);
             if (mockItem) mockItem.status = newStatus;
             return { ...p, status: newStatus };
         }
         return p;
      }));
   };

   const handleDelete = (id: string) => {
      if (window.confirm('确定要删除该商品吗？此操作无法恢复。')) {
         setProductList(prev => prev.filter(p => p.id !== id));
         setOpenMenuId(null);
      }
   };

   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
            <button onClick={popScreen}><ChevronLeft /></button>
            <span className="font-bold text-lg">橱窗管理</span>
            <button onClick={() => pushScreen({ name: 'create_product' })} className="text-blue-600">
               <Plus size={24} />
            </button>
         </div>

         <div className="flex bg-white border-b text-sm font-medium">
            <div 
               onClick={() => setActiveTab('on_shelf')}
               className={`flex-1 py-3 text-center cursor-pointer ${activeTab === 'on_shelf' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
               出售中 ({myProducts.filter(p => p.status === 'on_shelf').length})
            </div>
            <div 
               onClick={() => setActiveTab('off_shelf')}
               className={`flex-1 py-3 text-center cursor-pointer ${activeTab === 'off_shelf' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
               仓库中 ({myProducts.filter(p => p.status === 'off_shelf').length})
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4" onClick={() => setOpenMenuId(null)}>
            {displayProducts.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Archive size={48} className="mb-2 opacity-50" />
                  <span>暂无商品</span>
               </div>
            ) : (
               displayProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-xl p-3 shadow-sm flex items-start space-x-3 relative z-0">
                     <img src={p.image} className="w-20 h-20 rounded-lg object-cover bg-gray-100" alt="p" />
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                           <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{p.title}</h3>
                        </div>
                        <div className="text-red-500 font-bold text-sm mb-2">{p.price} 仪豆</div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                           <span>已售 {p.sales}</span>
                           <span>库存 999+</span>
                        </div>
                        <div className="flex space-x-2 relative z-10">
                           <button 
                              onClick={(e) => { e.stopPropagation(); pushScreen({ name: 'create_product', params: { productId: p.id } }); }}
                              className="flex-1 bg-gray-50 text-gray-700 py-1.5 rounded text-xs font-medium border"
                           >
                              编辑
                           </button>
                           {p.status === 'on_shelf' ? (
                              <button 
                                 onClick={(e) => { e.stopPropagation(); updateStatus(p.id, 'off_shelf'); }}
                                 className="flex-1 bg-gray-50 text-orange-600 py-1.5 rounded text-xs font-medium border border-orange-100"
                              >
                                 下架
                              </button>
                           ) : (
                              <button 
                                 onClick={(e) => { e.stopPropagation(); updateStatus(p.id, 'on_shelf'); }}
                                 className="flex-1 bg-blue-50 text-blue-600 py-1.5 rounded text-xs font-medium border border-blue-100"
                              >
                                 上架
                              </button>
                           )}
                           
                           <div className="relative">
                               <button 
                                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === p.id ? null : p.id); }}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 rounded border hover:bg-gray-100"
                               >
                                  <MoreHorizontal size={14} />
                               </button>

                               {openMenuId === p.id && (
                                  <>
                                     <div className="fixed inset-0 z-10 cursor-default" onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}></div>
                                     <div className="absolute right-0 bottom-full mb-1 w-24 bg-white shadow-xl border border-gray-100 rounded-lg py-1 z-20 animate-in fade-in zoom-in-95 origin-bottom-right">
                                        <button 
                                           onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                                           className="w-full text-left px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                        >
                                           <Trash2 size={12} className="mr-2" /> 删除
                                        </button>
                                     </div>
                                  </>
                               )}
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};
