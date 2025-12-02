
import React from 'react';
import { ChevronLeft, Search, QrCode } from 'lucide-react';
import { useNav } from '../../context/NavContext';

export const AddFriendPage = () => {
   const { popScreen } = useNav();
   
   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white border-b flex items-center px-4 relative">
             <button onClick={popScreen}><ChevronLeft /></button>
             <span className="ml-4 font-medium text-lg">添加朋友</span>
         </div>
         <div className="p-4">
            <div className="bg-white rounded-lg flex items-center p-3 shadow-sm mb-4">
               <Search className="text-gray-400 mr-3" size={20} />
               <input type="text" placeholder="手机号 / 仪聚号" className="flex-1 focus:outline-none" />
            </div>
            <div className="flex justify-center items-center space-x-2 mb-8">
               <span className="text-sm text-gray-500">我的仪聚号: mwzy711</span>
               <QrCode size={16} className="text-gray-500" />
            </div>
            <div className="space-y-4">
               <div className="flex items-center p-4 bg-white rounded-lg cursor-pointer">
                  <div className="bg-blue-500 p-2 rounded-full text-white mr-4"><QrCode size={20} /></div>
                  <div className="flex-1">
                     <div className="font-medium">扫一扫</div>
                     <div className="text-xs text-gray-400">扫描二维码名片</div>
                  </div>
                  <ChevronLeft className="rotate-180 text-gray-300" />
               </div>
            </div>
         </div>
      </div>
   );
}
