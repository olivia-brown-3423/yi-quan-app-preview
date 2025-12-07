
import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, ShoppingBag, MessageCircle, Wallet, ShoppingCart, ShieldCheck, X, Check, CheckCircle2, Star, ThumbsUp } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS, CURRENT_USER } from '../../types';

export const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const { popScreen, pushScreen } = useNav();
  const product = MOCK_PRODUCTS.find(p => p.id === params.productId) || MOCK_PRODUCTS[0];
  const [showBuyConfirm, setShowBuyConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  
  // Cart state
  const [cartCount, setCartCount] = useState(0);

  const myBalance = CURRENT_USER.stats?.coins || 0;
  const canAfford = myBalance >= product.price;

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handlePay = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
        setPaymentStatus('success');
    }, 1500);
  };

  const closePayModal = () => {
      setShowBuyConfirm(false);
      setPaymentStatus('idle'); // Reset for next time
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative animate-in fade-in duration-300">
       {/* Custom Toast */}
       {showToast && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-xl z-[60] flex items-center space-x-2 animate-in zoom-in fade-in duration-200 shadow-2xl">
            <Check size={20} className="text-green-400" />
            <span className="font-medium">已成功加入购物车</span>
         </div>
       )}

       {/* Top Nav (Transparent to White) */}
       <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20 pointer-events-none">
          <button onClick={popScreen} className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md pointer-events-auto active:scale-90 transition-transform"><ChevronLeft size={20} /></button>
          <button className="bg-black/30 text-white p-2 rounded-full backdrop-blur-md pointer-events-auto active:scale-90 transition-transform"><MoreHorizontal size={20} /></button>
       </div>

       {/* Product Image */}
       <div className="relative h-96 w-full bg-white shrink-0">
          <img src={product.image} className="w-full h-full object-cover" alt="product" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
       </div>

       {/* Content Body */}
       <div className="flex-1 overflow-y-auto -mt-6 relative z-10 pb-24 no-scrollbar">
          {/* Main Info Card */}
          <div className="bg-white rounded-t-3xl px-4 pt-6 pb-2 shadow-sm mb-2">
             <div className="flex justify-between items-end mb-3">
                <div className="flex items-baseline text-red-600">
                   <span className="text-xs font-bold mr-1">仪豆</span>
                   <span className="text-3xl font-extrabold">{product.price}</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">
                   已售 {product.sales} · 库存充足
                </div>
             </div>
             
             <h1 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2">{product.title}</h1>
             
             <div className="flex flex-wrap gap-2 mb-4">
                <Tag text="平台担保" icon={<ShieldCheck size={10}/>} />
                <Tag text={product.type === 'file' ? '自动发货' : '极速发货'} />
                <Tag text="不支持退款" color="text-gray-400 bg-gray-100" />
             </div>
          </div>

          {/* Seller Card (Personal Profile Link) */}
          <div className="bg-white p-4 mb-2 flex items-center justify-between">
             <div 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => pushScreen({ name: 'user_profile', params: { id: product.seller.id } })}
             >
                <img src={product.seller.avatar} className="w-10 h-10 rounded-lg border border-gray-100" alt="seller" />
                <div>
                   <div className="text-sm font-bold text-gray-900">{product.seller.name}</div>
                   <div className="text-xs text-gray-500 flex items-center">
                      <span className="text-orange-500 mr-1">★ 4.9</span> 
                      <span>| 关注 1.2w</span>
                   </div>
                </div>
             </div>
             <button 
                onClick={() => pushScreen({ name: 'user_profile', params: { id: product.seller.id } })}
                className="text-xs border border-blue-600 text-blue-600 px-3 py-1.5 rounded-full font-medium active:bg-blue-50"
             >
                查看主页
             </button>
          </div>

          {/* Product Details Section (No Tabs) */}
          <div className="bg-white p-4 min-h-[200px] mb-4">
            <div className="flex items-center space-x-2 mb-4">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                <h3 className="font-bold text-gray-900 text-sm">商品详情</h3>
            </div>
            {/* Rich Text Content */}
            <div 
                className="text-sm text-gray-700 leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:mb-2 [&>img]:rounded-lg [&>img]:my-2 [&>img]:w-full"
                dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }}
            />
            
            <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-400 leading-relaxed">
                免责声明：本商品为用户自行上传，仪聚平台仅提供交易撮合服务。如遇到版权或欺诈问题，请立即举报。
            </div>
          </div>

          {/* Recommendations */}
          <div className="px-4 mb-2">
             <div className="flex items-center space-x-2 mb-3">
                 <div className="w-1 h-3 bg-red-500 rounded-full"></div>
                 <h3 className="font-bold text-gray-900 text-sm">猜你喜欢</h3>
             </div>
             <div className="grid grid-cols-2 gap-2">
                 {MOCK_PRODUCTS.slice(0, 2).map(p => (
                     <div key={p.id} className="bg-white rounded-lg p-2 shadow-sm" onClick={() => pushScreen({ name: 'product_detail', params: { productId: p.id } })}>
                         <img src={p.image} className="w-full h-24 object-cover rounded mb-2" />
                         <div className="text-xs font-medium line-clamp-2 mb-1">{p.title}</div>
                         <div className="text-red-500 font-bold text-xs">{p.price} 仪豆</div>
                     </div>
                 ))}
             </div>
          </div>
       </div>

       {/* Bottom Action Bar (Fixed) */}
       <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-4 py-2 pb-safe z-30 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            {/* Always show Buyer View (No Seller Check) */}
            <>
            {/* Left Icons - Removed Shop Icon */}
            <div className="flex space-x-8 mr-6 ml-4 shrink-0">
                <IconBtn 
                    icon={MessageCircle} 
                    label="私信" 
                    onClick={() => pushScreen({ name: 'chat_detail', params: { title: product.seller.name } })}
                />
                <IconBtn 
                    icon={ShoppingCart} 
                    label="购物车" 
                    badge={cartCount > 0 ? cartCount : undefined} 
                    onClick={() => pushScreen({ name: 'shopping_cart' })} 
                />
            </div>

            {/* Right Buttons */}
            <div className="flex-1 flex h-10 space-x-2">
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#ff9500] text-white text-sm font-bold rounded-full shadow-sm active:opacity-90 transition-opacity"
                >
                    加入购物车
                </button>
                <button 
                    onClick={() => setShowBuyConfirm(true)}
                    className="flex-1 bg-[#ff0036] text-white text-sm font-bold rounded-full shadow-sm active:opacity-90 transition-opacity"
                >
                    立即购买
                </button>
            </div>
            </>
       </div>

       {/* Checkout Modal (YiDou Cashier) */}
       {showBuyConfirm && (
          <div className="absolute inset-0 z-50 flex items-end">
             {/* Backdrop */}
             <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
                onClick={paymentStatus === 'success' ? closePayModal : () => setShowBuyConfirm(false)}
             ></div>
             
             {/* Panel */}
             <div className="bg-white w-full rounded-t-2xl p-6 relative z-10 animate-in slide-in-from-bottom duration-300 pb-safe">
                {paymentStatus === 'success' ? (
                    // Success View
                    <div className="flex flex-col items-center py-6 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
                            <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">支付成功</h3>
                        <p className="text-gray-500 text-sm mb-8">已成功支付 {product.price} 仪豆</p>
                        
                        <div className="w-full space-y-3">
                            <button 
                                onClick={closePayModal}
                                className="w-full bg-blue-600 text-white py-3.5 rounded-full font-bold text-lg"
                            >
                                完成
                            </button>
                            <button className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-full font-bold text-lg">
                                查看订单
                            </button>
                        </div>
                    </div>
                ) : (
                    // Payment View
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">确认付款</h3>
                            {paymentStatus !== 'processing' && (
                                <button onClick={() => setShowBuyConfirm(false)} className="bg-gray-100 p-1.5 rounded-full text-gray-500"><X size={16} /></button>
                            )}
                        </div>

                        {/* Product Summary */}
                        <div className="flex items-start space-x-3 mb-6 bg-gray-50 p-3 rounded-xl">
                            <img src={product.image} className="w-16 h-16 rounded object-cover bg-white" />
                            <div className="flex-1">
                                <div className="text-sm font-bold text-gray-900 line-clamp-1">{product.title}</div>
                                <div className="text-red-500 font-bold mt-1 text-sm">{product.price} 仪豆</div>
                            </div>
                        </div>

                        {/* Balance Calculation */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">我的余额</span>
                                <span className="font-medium">{myBalance} 仪豆</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">应付金额</span>
                                <span className="font-bold text-red-500">-{product.price} 仪豆</span>
                            </div>
                            <div className="border-t border-dashed pt-3 flex justify-between items-center">
                                <span className="font-bold text-gray-900">支付后余额</span>
                                <div className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
                                    {myBalance - product.price} 仪豆
                                </div>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button 
                            disabled={!canAfford || paymentStatus === 'processing'}
                            onClick={handlePay}
                            className={`w-full py-3.5 rounded-full font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all
                                ${canAfford ? 'bg-red-600 text-white active:scale-[0.98]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            {paymentStatus === 'processing' ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : canAfford ? (
                                <>
                                    <Wallet size={20} />
                                    <span>确认支付</span>
                                </>
                            ) : (
                                <span>余额不足，请先充值</span>
                            )}
                        </button>
                        
                        {!canAfford && paymentStatus !== 'processing' && (
                            <div className="text-center mt-3 text-blue-600 text-sm font-medium cursor-pointer" onClick={() => pushScreen({ name: 'wallet' })}>
                                去钱包充值 &gt;
                            </div>
                        )}
                    </>
                )}
             </div>
          </div>
       )}
    </div>
  );
};

const Tag = ({ text, icon, color = "text-orange-600 bg-orange-50" }: { text: string, icon?: React.ReactNode, color?: string }) => (
    <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${color}`}>
        {icon}
        <span>{text}</span>
    </div>
);

const IconBtn = ({ icon: Icon, label, badge, onClick }: { icon: any, label: string, badge?: number, onClick?: () => void }) => (
   <div className="flex flex-col items-center justify-center space-y-0.5 cursor-pointer relative active:opacity-60" onClick={onClick}>
      <div className="relative">
        <Icon size={24} className="text-gray-600" />
        {badge ? (
            <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[10px] px-1 h-3.5 min-w-[14px] flex items-center justify-center rounded-full border border-white">
                {badge}
            </span>
        ) : null}
      </div>
      <span className="text-[10px] text-gray-500">{label}</span>
   </div>
);
