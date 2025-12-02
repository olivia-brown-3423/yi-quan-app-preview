
import React, { useState } from 'react';
import { ChevronLeft, Camera, CreditCard } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

export const CreateProductPage = ({ params }: { params?: { productId: string } }) => {
   const { popScreen } = useNav();
   const isEdit = !!params?.productId;
   
   const existingProduct = isEdit ? MOCK_PRODUCTS.find(p => p.id === params?.productId) : null;

   const [sellerPrice, setSellerPrice] = useState<number | ''>(existingProduct ? (existingProduct.originalPrice || 0) : '');
   const [type, setType] = useState(existingProduct?.type || 'virtual');
   const [title, setTitle] = useState(existingProduct?.title || '');
   const [desc, setDesc] = useState(existingProduct?.description || '');

   const displayPrice = sellerPrice ? Math.floor(sellerPrice * 1.1) : 0;
   const fee = sellerPrice ? displayPrice - sellerPrice : 0;

   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white border-b flex items-center justify-between px-4">
            <button onClick={popScreen}><ChevronLeft /></button>
            <span className="font-bold text-lg">{isEdit ? '编辑商品' : '上架商品'}</span>
            <span className="text-sm text-gray-400 w-6"></span>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 h-40 relative overflow-hidden">
               {existingProduct ? (
                  <img src={existingProduct.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="upload" />
               ) : null}
               <div className="relative z-10 flex flex-col items-center">
                  <Camera className="text-gray-400 mb-2" size={32} />
                  <span className="text-gray-500 text-sm">添加商品主图</span>
               </div>
            </div>

            <div className="bg-white rounded-xl p-4 space-y-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品类型</label>
                  <div className="flex space-x-2">
                     {[
                        { id: 'virtual', label: '虚拟商品' },
                        { id: 'file', label: '文件' },
                        { id: 'video_collection', label: '视频集' }
                     ].map(t => (
                        <button 
                           key={t.id}
                           onClick={() => setType(t.id as any)}
                           className={`flex-1 py-2 text-sm rounded-lg border ${type === t.id ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-200 text-gray-600'}`}
                        >
                           {t.label}
                        </button>
                     ))}
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品标题</label>
                  <input 
                     type="text" 
                     value={title}
                     onChange={e => setTitle(e.target.value)}
                     placeholder="请输入商品标题" 
                     className="w-full bg-gray-50 p-2 rounded border border-gray-200 focus:outline-none focus:border-blue-500" 
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品描述</label>
                  <textarea 
                     value={desc}
                     onChange={e => setDesc(e.target.value)}
                     placeholder="描述你的商品..." 
                     className="w-full h-24 bg-gray-50 p-2 rounded border border-gray-200 resize-none focus:outline-none focus:border-blue-500"
                  ></textarea>
               </div>
            </div>

            <div className="bg-white rounded-xl p-4">
               <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="text-orange-500" size={20} />
                  <span className="font-bold text-gray-900">价格设置 (仪豆)</span>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>你的预期收入 (定价)</span>
                        <span className="text-gray-400 text-xs">到账金额</span>
                     </label>
                     <div className="relative">
                        <input 
                           type="number" 
                           value={sellerPrice}
                           onChange={(e) => setSellerPrice(Number(e.target.value))}
                           placeholder="3000"
                           className="w-full bg-gray-50 p-3 rounded-lg text-lg font-bold text-gray-900 border border-gray-200 focus:outline-none focus:border-blue-500" 
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500 text-sm">仪豆</span>
                     </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 space-y-2 border border-blue-100">
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">橱窗售价 (消费者支付)</span>
                        <span className="text-lg font-bold text-red-500">{displayPrice} 仪豆</span>
                     </div>
                     <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>交易管理费 (10%)</span>
                        <span>{fee} 仪豆</span>
                     </div>
                  </div>
               </div>
            </div>

            {isEdit && (
               <button className="w-full bg-white text-red-500 py-3 rounded-lg font-bold border border-gray-200">
                  删除商品
               </button>
            )}
         </div>

         <div className="bg-white p-4 border-t pb-safe">
            <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold shadow-lg">
               {isEdit ? '保存修改' : '立即上架'}
            </button>
         </div>
      </div>
   );
};
