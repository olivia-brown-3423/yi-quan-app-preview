
import React from 'react';
import { ChevronLeft, MoreHorizontal, FileText, Wrench, Video, ShoppingBag, Download, Ticket } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

export const ChannelShopPage = ({ params }: { params?: { title?: string, userId?: string } }) => {
  const { popScreen, pushScreen } = useNav();
  
  const pageTitle = params?.title || '群橱窗';
  const userId = params?.userId;

  // Mock data filter
  // If userId is provided, show only products from that user (User Shop)
  // Otherwise show a mix (Channel/Group Shop)
  
  let shopItems: any[] = [];
  
  if (userId) {
      shopItems = MOCK_PRODUCTS.filter(p => p.seller.id === userId && p.status === 'on_shelf').map(p => ({
          ...p,
          hasImage: true,
          desc: p.description
      }));
      // Fallback mock items if empty for demo
      if (shopItems.length === 0) {
          shopItems = [
              { ...MOCK_PRODUCTS[0], hasImage: true, desc: '测试商品' },
              { ...MOCK_PRODUCTS[1], hasImage: true, desc: '测试商品' }
          ];
      }
  } else {
       shopItems = [
        {
           id: 's1',
           title: 'GB/T 1234-2024 工业自动化仪表通用技术条件.pdf',
           desc: '最新版国标文件下载，高清无水印',
           price: 10,
           type: 'file',
           seller: { name: '资料管理员', avatar: 'https://picsum.photos/id/1012/50/50' },
           hasImage: false
        },
        {
           id: 's2',
           title: '远程技术支持服务 (1小时)',
           desc: '资深工程师在线解答PLC、DCS调试问题，支持视频指导',
           price: 500,
           type: 'service',
           seller: { name: '工控老张', avatar: 'https://picsum.photos/id/1013/50/50' },
           hasImage: false
        },
        // Include an existing product from mocks
        {
           ...MOCK_PRODUCTS[0], // Fluke Multimeter
           desc: '全新正品，包含表笔、电池、说明书。',
           hasImage: true
        },
        {
           id: 's3',
           title: '西门子 S7-200 SMART 编程实例源码 100例',
           desc: '包含运动控制、PID算法、通讯等常用程序，实战参考必备',
           price: 88,
           type: 'code',
           seller: { name: '自动化小王子', avatar: 'https://picsum.photos/id/1014/50/50' },
           hasImage: false
        },
         {
           ...MOCK_PRODUCTS[1], // PLC Tutorial
           desc: '电子版教程，拍下自动发货。',
           hasImage: true
        },
        {
           id: 's4',
           title: '2024上海国际仪器仪表展 (早鸟票)',
           desc: '含展会指南、午餐券，仅限业内人士',
           price: 20,
           type: 'ticket',
           seller: { name: '展会小助手', avatar: 'https://picsum.photos/id/1015/50/50' },
           hasImage: false
        },
        {
            id: 's5',
            title: '二手横河EJA变送器 (9成新)',
            desc: '项目剩余物资处理，功能完好，低价转让',
            price: 800,
            type: 'product',
            seller: { name: '工程队老李', avatar: 'https://picsum.photos/id/1016/50/50' },
            hasImage: true,
            image: 'https://picsum.photos/id/1018/200/200'
        }
      ];
  }

  const getIcon = (type: string) => {
      switch(type) {
          case 'file': return <FileText size={24} className="text-blue-500" />;
          case 'service': return <Wrench size={24} className="text-orange-500" />;
          case 'code': return <Download size={24} className="text-green-500" />;
          case 'ticket': return <Ticket size={24} className="text-purple-500" />;
          default: return <ShoppingBag size={24} className="text-gray-400" />;
      }
  };

  const getTypeName = (type: string) => {
      switch(type) {
          case 'file': return '文件';
          case 'service': return '服务';
          case 'code': return '源码';
          case 'ticket': return '票务';
          default: return '商品';
      }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
        <button onClick={popScreen} className="p-2 -ml-2 text-gray-700"><ChevronLeft size={24} /></button>
        <span className="font-bold text-lg text-gray-900">{pageTitle}</span>
        <button className="p-2 -mr-2 text-gray-700"><MoreHorizontal size={24} /></button>
      </div>

      <div className="bg-orange-50 px-4 py-2 flex items-start space-x-2">
         <span className="text-orange-500 mt-0.5">ⓘ</span>
         <div className="text-xs text-orange-800 leading-relaxed">
            交易请注意资金安全，平台推荐使用<span className="font-bold">仪豆支付</span>，享受担保交易服务。
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
         {shopItems.map((item, idx) => (
            <div 
               key={idx} 
               className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-start active:scale-[0.99] transition-transform cursor-pointer"
               onClick={() => pushScreen({ name: 'product_detail', params: { productId: item.id } })}
            >
               {item.hasImage ? (
                   <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                       <img src={item.image} className="w-full h-full object-cover" alt="product" />
                   </div>
               ) : (
                   <div className="w-20 h-20 rounded-lg bg-gray-50 flex flex-col items-center justify-center shrink-0 border border-gray-100">
                       {getIcon(item.type)}
                       <span className="text-[10px] text-gray-400 mt-1">{getTypeName(item.type)}</span>
                   </div>
               )}

               <div className="flex-1 ml-3 min-w-0 flex flex-col h-20 justify-between py-0.5">
                   <div>
                       <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1">{item.title}</h3>
                       <p className="text-xs text-gray-500 line-clamp-1">{item.desc || item.description}</p>
                   </div>
                   
                   <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-0.5 rounded-full">
                           <img src={item.seller.avatar} className="w-3 h-3 rounded-full" alt="s" />
                           <span className="text-[10px] text-gray-500 truncate max-w-[80px]">{item.seller.name}</span>
                       </div>
                       <div className="text-right">
                           <div className="text-red-500 font-bold text-base flex items-baseline">
                               <span className="text-[10px] text-gray-400 mr-1 font-normal">仪豆</span>
                               {item.price}
                           </div>
                       </div>
                   </div>
               </div>
            </div>
         ))}
         
         <div className="text-center text-xs text-gray-400 py-6">
            — 到底了 —
         </div>
      </div>
    </div>
  );
};
