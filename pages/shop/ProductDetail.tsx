
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, ShoppingBag, MessageSquare, Wallet } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

export const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const { popScreen, pushScreen } = useNav();
  const product = MOCK_PRODUCTS.find(p => p.id === params.productId) || MOCK_PRODUCTS[0];
  const [showBuyConfirm, setShowBuyConfirm] = useState(false);
  const isSeller = product.seller.id === 'me';

  return (
    <div className="flex flex-col h-full bg-white relative">
       <div className="relative h-72 bg-gray-100">
          <img src={product.image} className="w-full h-full object-cover" alt="product" />
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start bg-gradient-to-b from-black/30 to-transparent">
             <button onClick={popScreen} className="bg-black/20 text-white p-2 rounded-full backdrop-blur-md"><ChevronLeft size={20} /></button>
             <button className="bg-black/20 text-white p-2 rounded-full backdrop-blur-md"><MoreHorizontal size={20} /></button>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto -mt-4 bg-white rounded-t-3xl relative z-10 px-4 pt-6 pb-20">
          <div className="mb-4">
             <div className="flex items-baseline space-x-2 text-red-500 mb-2">
                <span className="text-sm font-bold">¥</span>
                <span className="text-3xl font-extrabold">{product.price}</span>
                <span className="text-sm bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[10px]">仪豆交易</span>
             </div>
             <h1 className="text-xl font-bold text-gray-900 leading-snug mb-2">{product.title}</h1>
             <div className="flex justify-between text-xs text-gray-400">
                <span>类型: {product.type}</span>
                <span>已售 {product.sales}</span>
             </div>
          </div>

          <div className="flex items-center space-x-3 mb-6 bg-gray-50 p-3 rounded-xl">
             <img src={product.seller.avatar} className="w-12 h-12 rounded-full" alt="seller" />
             <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">{product.seller.name}</div>
                <div className="text-xs text-gray-500">信誉极好 · 实名认证</div>
             </div>
             <button className="text-xs border border-blue-500 text-blue-500 px-4 py-1.5 rounded-full font-medium">进店逛逛</button>
          </div>

          <div className="space-y-2">
             <h3 className="font-bold text-gray-900 text-sm">商品详情</h3>
             <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
             <p className="text-sm text-gray-600 leading-relaxed mt-4">
                特别说明：虚拟商品一经售出，概不退换。请购买前仔细确认。所有交易均通过平台仪豆结算。
             </p>
          </div>
       </div>

       <div className="absolute bottom-0 w-full bg-white border-t p-2 flex items-center space-x-2 pb-safe z-20">
          {isSeller ? (
             <div className="flex w-full space-x-3 px-2">
                <button 
                   onClick={() => pushScreen({ name: 'create_product', params: { productId: product.id } })}
                   className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-full font-bold text-sm"
                >
                   编辑商品
                </button>
                <button className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-full font-bold text-sm">
                   分享
                </button>
             </div>
          ) : (
             <>
                <div className="flex-1 flex justify-around text-xs text-gray-500">
                   <div className="flex flex-col items-center"><ShoppingBag size={20} /><span>店铺</span></div>
                   <div className="flex flex-col items-center"><MessageSquare size={20} /><span>客服</span></div>
                </div>
                <button 
                   onClick={() => setShowBuyConfirm(true)}
                   className="flex-[2] bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg"
                >
                   立即购买 ({product.price} 仪豆)
                </button>
             </>
          )}
       </div>

       {showBuyConfirm && (
          <div className="absolute inset-0 bg-black/60 z-50 flex items-end animate-in fade-in">
             <div className="bg-white w-full rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold">确认付款</h3>
                   <button onClick={() => setShowBuyConfirm(false)} className="text-gray-400"><ChevronLeft className="-rotate-90" /></button>
                </div>
                <div className="flex justify-between items-center mb-4 py-4 border-b">
                   <span className="text-gray-600">支付金额</span>
                   <span className="text-2xl font-bold text-red-500">{product.price} 仪豆</span>
                </div>
                <div className="flex justify-between items-center mb-8">
                   <span className="text-gray-600">付款方式</span>
                   <div className="flex items-center space-x-2">
                      <Wallet size={16} className="text-blue-600" />
                      <span className="text-gray-900 font-medium">我的钱包 (余额 1230)</span>
                   </div>
                </div>
                <button className="w-full bg-red-500 text-white py-3.5 rounded-full font-bold text-lg mb-2">
                   确认支付
                </button>
             </div>
          </div>
       )}
    </div>
  );
};
