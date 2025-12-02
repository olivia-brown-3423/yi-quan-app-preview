
import React from 'react';
import { ChevronLeft, Shield, Bell, Lock, Hash, AlertCircle } from 'lucide-react';
import { useNav } from '../../context/NavContext';

export const SettingsPage = () => {
  const { popScreen } = useNav();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="h-14 bg-white border-b flex items-center px-4">
        <button onClick={popScreen}><ChevronLeft /></button>
        <span className="ml-4 font-medium">设置</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
         <div className="bg-white">
            <SettingItem label="账号与安全" icon={Shield} />
            <SettingItem label="消息通知" icon={Bell} />
            <SettingItem label="隐私设置" icon={Lock} />
         </div>
         <div className="bg-white">
            <SettingItem label="通用" icon={Hash} />
            <SettingItem label="帮助与反馈" icon={AlertCircle} />
         </div>
         <button className="w-full bg-white text-red-500 py-3 font-medium text-sm mt-4">
            退出登录
         </button>
      </div>
    </div>
  );
};

const SettingItem = ({ label, icon: Icon }: any) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 active:bg-gray-50">
     <div className="flex items-center space-x-3">
        <Icon size={18} className="text-gray-500" />
        <span className="text-sm text-gray-800">{label}</span>
     </div>
     <ChevronLeft className="rotate-180 text-gray-300" size={16} />
  </div>
);
