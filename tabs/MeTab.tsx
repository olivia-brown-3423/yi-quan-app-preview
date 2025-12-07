
import React from 'react';
import { 
  Settings, 
  ChevronRight, 
  FileText, 
  MessageCircle, 
  FilePlus, 
  UserX, 
  Megaphone, 
  Newspaper, 
  Folder, 
  FolderHeart, 
  Headphones, 
  FileSearch, 
  AlertTriangle, 
  ClipboardList, 
  Crown, 
  CheckCircle2, 
  Gift, 
  Dna,
  Store,
  ShoppingCart,
  ShoppingBag,
  Receipt
} from 'lucide-react';
import { useNav } from '../context/NavContext';
import { CURRENT_USER } from '../types';

export const MeTab = () => {
  const { pushScreen } = useNav();
  const user = CURRENT_USER;

  return (
    <div className="flex flex-col h-full bg-[#f5f6fa] overflow-y-auto no-scrollbar">
      
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-6 mb-3">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <img src={user.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover" alt="avatar" />
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-white">
                         <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-bold text-gray-900">令狐冲</h2>
                        <Crown size={16} className="text-orange-500 fill-current" />
                        <CheckCircle2 size={16} className="text-green-500 fill-current" />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{user.bio || '个人的Slogan'}</div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs text-blue-400 font-medium">邀请码:</div>
                <div className="text-sm font-bold text-blue-600">763957</div>
            </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center bg-blue-50/50 rounded-xl px-6 py-4 mt-4">
            <StatItem label="粉丝" value={4} />
            <StatItem label="关注" value={9} />
            <StatItem label="资料库" value={0} />
        </div>
      </div>

      {/* Wallet Card */}
      <div className="px-4 mb-3">
        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex space-x-8">
                <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">2760</div>
                    <div className="text-xs text-gray-400">我的金币</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">460</div>
                    <div className="text-xs text-gray-400">我的仪豆</div>
                </div>
            </div>
            <button 
                onClick={() => pushScreen({ name: 'wallet' })}
                className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm active:scale-95 transition-transform flex items-center"
            >
                <span className="mr-1">¥</span> 提现
            </button>
        </div>
      </div>

      {/* Welfare Center */}
      <div className="px-4 mb-3">
         <h3 className="text-base font-bold text-gray-800 mb-3 px-1">福利中心</h3>
         <div className="flex space-x-3">
             <div className="flex-1 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl relative overflow-hidden flex items-center px-4 shadow-sm cursor-pointer active:opacity-90">
                 <div className="text-white z-10">
                     <div className="font-bold text-lg">积分中心</div>
                     <div className="text-[10px] opacity-90">每日签到领好礼</div>
                 </div>
                 <Dna size={48} className="absolute -right-2 -bottom-4 text-white/20 rotate-12" />
                 <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Gift className="text-white" size={20} />
                 </div>
             </div>
             <div className="flex-1 h-20 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-xl relative overflow-hidden flex items-center px-4 shadow-sm cursor-pointer active:opacity-90">
                 <div className="text-white z-10">
                     <div className="font-bold text-lg">绑定邀请</div>
                     <div className="text-[10px] opacity-90">送积分</div>
                 </div>
                 <div className="absolute right-0 bottom-0 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                 <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <UserX className="text-white" size={20} />
                 </div>
             </div>
         </div>
      </div>

      {/* Transaction Center (New Section) */}
      <div className="px-4 mb-3">
         <h3 className="text-base font-bold text-gray-800 mb-3 px-1">交易中心</h3>
         <div className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-4 gap-y-6">
             <GridItem icon={Store} color="text-indigo-600" bg="bg-indigo-50" label="我的橱窗" onClick={() => pushScreen({ name: 'product_management' })} />
             <GridItem icon={ShoppingCart} color="text-orange-600" bg="bg-orange-50" label="购物车" onClick={() => pushScreen({ name: 'shopping_cart' })} />
             <GridItem icon={ShoppingBag} color="text-blue-600" bg="bg-blue-50" label="我买到的" onClick={() => pushScreen({ name: 'order_list', params: { view: 'buyer' } })} />
             <GridItem icon={Receipt} color="text-green-600" bg="bg-green-50" label="我卖出的" onClick={() => pushScreen({ name: 'order_list', params: { view: 'seller' } })} />
         </div>
      </div>

      {/* My Community */}
      <div className="px-4 mb-3">
         <h3 className="text-base font-bold text-gray-800 mb-3 px-1">我的社区</h3>
         <div className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-4 gap-y-6">
             <GridItem icon={FileText} color="text-green-600" bg="bg-green-50" label="我的文章" onClick={() => pushScreen({ name: 'collection_list' })} />
             <GridItem icon={MessageCircle} color="text-blue-600" bg="bg-blue-50" label="我的话题" />
             <GridItem icon={FilePlus} color="text-orange-600" bg="bg-orange-50" label="草稿箱" />
             <GridItem icon={UserX} color="text-cyan-600" bg="bg-cyan-50" label="黑名单" />
             
             <GridItem icon={Megaphone} color="text-purple-600" bg="bg-purple-50" label="我的广告" />
             <GridItem icon={Newspaper} color="text-yellow-600" bg="bg-yellow-50" label="我的新闻" />
             <GridItem icon={Folder} color="text-rose-600" bg="bg-rose-50" label="我的项目" />
             <GridItem icon={FolderHeart} color="text-pink-600" bg="bg-pink-50" label="我的作品集" onClick={() => pushScreen({ name: 'collection_list' })} />
             
             <GridItem icon={Headphones} color="text-blue-500" bg="bg-blue-50" label="联系客服" />
         </div>
      </div>

      {/* Management Center */}
      <div className="px-4 mb-3">
         <h3 className="text-base font-bold text-gray-800 mb-3 px-1">管理中心</h3>
         <div className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-4 gap-y-6">
             <GridItem icon={FileSearch} color="text-gray-700" bg="bg-gray-100" label="项目审核" />
             <GridItem icon={AlertTriangle} color="text-gray-700" bg="bg-gray-100" label="举报信息" />
             <GridItem icon={ClipboardList} color="text-gray-700" bg="bg-gray-100" label="问卷调查" />
             <GridItem icon={Settings} color="text-gray-700" bg="bg-gray-100" label="设置" onClick={() => pushScreen({ name: 'settings' })} />
         </div>
      </div>

      {/* Version */}
      <div className="px-4 pb-8">
          <div className="bg-white rounded-xl px-4 py-4 shadow-sm flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-600">当前版本</span>
              <div className="flex items-center text-xs text-gray-400">
                  <span>v2.1.0</span>
                  <ChevronRight size={16} />
              </div>
          </div>
      </div>

    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center flex-1">
        <div className="text-sm text-gray-500 mb-1">{label}</div>
        <div className="text-xl font-bold text-blue-600">{value}</div>
    </div>
);

const GridItem = ({ icon: Icon, color, bg, label, onClick }: any) => (
    <div className="flex flex-col items-center space-y-2 cursor-pointer active:opacity-70" onClick={onClick}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
            <Icon size={24} />
        </div>
        <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
);
