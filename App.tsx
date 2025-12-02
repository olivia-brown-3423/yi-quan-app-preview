
import React, { useState, createContext, useContext } from 'react';
import { 
  MessageSquare, 
  Users, 
  Hash, 
  Aperture, 
  User as UserIcon 
} from 'lucide-react';
import { MessagesTab } from './components/MainTabs';
import { ContactsTab } from './components/MainTabs';
import { ChannelsTab } from './components/MainTabs';
import { CommunityTab } from './components/MainTabs';
import { MeTab } from './components/MainTabs';
import { 
  ChatDetail, 
  CreateChannel, 
  UserProfile, 
  ChannelDetail, 
  SearchPage, 
  CommunityDetail, 
  WalletPage, 
  SettingsPage,
  ProductDetail,
  PublishPage,
  ArticleDetail,
  QADetail,
  AddFriendPage,
  CreateGroupPage,
  VideoDetail,
  ProjectDetail,
  CreateProductPage,
  ProductManagementPage,
  ChannelShopPage
} from './components/SubPages';

// --- Navigation Context ---
type Screen = 
  | 'messages' 
  | 'contacts' 
  | 'channels' 
  | 'community' 
  | 'me'
  | { name: 'chat_detail'; params: any }
  | { name: 'create_channel' }
  | { name: 'user_profile'; params: any }
  | { name: 'channel_detail'; params: any }
  | { name: 'search' }
  | { name: 'community_detail'; params: any }
  | { name: 'article_detail'; params: any }
  | { name: 'qa_detail'; params: any }
  | { name: 'video_detail'; params: any }
  | { name: 'project_detail'; params: any }
  | { name: 'wallet' }
  | { name: 'settings' }
  | { name: 'product_detail'; params: any }
  | { name: 'publish' }
  | { name: 'add_friend' }
  | { name: 'create_group' }
  | { name: 'create_product'; params?: any }
  | { name: 'product_management' }
  | { name: 'channel_shop'; params?: any };

interface NavContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  screenStack: Screen[];
  pushScreen: (screen: Screen) => void;
  popScreen: () => void;
}

export const NavContext = createContext<NavContextType>({
  activeTab: 'messages',
  setActiveTab: () => {},
  screenStack: [],
  pushScreen: () => {},
  popScreen: () => {},
});

export const useNav = () => useContext(NavContext);

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('messages');
  const [screenStack, setScreenStack] = useState<Screen[]>([]);

  const pushScreen = (screen: Screen) => {
    setScreenStack((prev) => [...prev, screen]);
  };

  const popScreen = () => {
    setScreenStack((prev) => prev.slice(0, -1));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'messages': return <MessagesTab />;
      case 'contacts': return <ContactsTab />;
      case 'channels': return <ChannelsTab />;
      case 'community': return <CommunityTab />;
      case 'me': return <MeTab />;
      default: return <MessagesTab />;
    }
  };

  const renderStackScreen = (screen: Screen) => {
    if (typeof screen === 'string') return null; 

    switch (screen.name) {
      case 'chat_detail': return <ChatDetail params={screen.params} />;
      case 'create_channel': return <CreateChannel />;
      case 'user_profile': return <UserProfile params={screen.params} />;
      case 'channel_detail': return <ChannelDetail params={screen.params} />;
      case 'search': return <SearchPage />;
      case 'community_detail': return <CommunityDetail params={screen.params} />;
      case 'article_detail': return <ArticleDetail params={screen.params} />;
      case 'qa_detail': return <QADetail params={screen.params} />;
      case 'video_detail': return <VideoDetail params={screen.params} />;
      case 'project_detail': return <ProjectDetail params={screen.params} />;
      case 'wallet': return <WalletPage />;
      case 'settings': return <SettingsPage />;
      case 'product_detail': return <ProductDetail params={screen.params} />;
      case 'publish': return <PublishPage />;
      case 'add_friend': return <AddFriendPage />;
      case 'create_group': return <CreateGroupPage />;
      case 'create_product': return <CreateProductPage params={screen.params} />;
      case 'product_management': return <ProductManagementPage />;
      case 'channel_shop': return <ChannelShopPage />;
      default: return null;
    }
  };

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab, screenStack, pushScreen, popScreen }}>
      <div className="flex justify-center bg-gray-900 h-screen w-full">
        <div className="w-full max-w-md h-full bg-white relative flex flex-col shadow-2xl overflow-hidden">
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden relative">
            {/* The Base Tab Layer */}
            <div className={`absolute inset-0 w-full h-full ${screenStack.length > 0 ? 'hidden' : 'block'}`}>
               {renderActiveTab()}
            </div>

            {/* Stacked Screens (Overlays) */}
            {screenStack.map((screen, index) => (
               <div key={index} className="absolute inset-0 w-full h-full bg-white z-20 slide-in">
                 {renderStackScreen(screen)}
               </div>
            ))}
          </div>

          {/* Bottom Navigation Bar - Only visible if no stack */}
          {screenStack.length === 0 && (
            <div className="h-16 border-t border-gray-200 flex items-center justify-around bg-white shrink-0 pb-safe">
              <NavButton id="messages" label="消息" icon={<MessageSquare size={24} />} active={activeTab === 'messages'} onClick={setActiveTab} />
              <NavButton id="contacts" label="通讯录" icon={<Users size={24} />} active={activeTab === 'contacts'} onClick={setActiveTab} />
              <NavButton id="channels" label="频道" icon={<Hash size={24} />} active={activeTab === 'channels'} onClick={setActiveTab} />
              <NavButton id="community" label="社区" icon={<Aperture size={24} />} active={activeTab === 'community'} onClick={setActiveTab} />
              <NavButton id="me" label="我的" icon={<UserIcon size={24} />} active={activeTab === 'me'} onClick={setActiveTab} />
            </div>
          )}
        </div>
      </div>
    </NavContext.Provider>
  );
}

const NavButton = ({ id, label, icon, active, onClick }: { id: string, label: string, icon: React.ReactNode, active: boolean, onClick: (id: string) => void }) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${active ? 'text-blue-600' : 'text-gray-500'}`}
  >
    {icon}
    <span className="text-[10px]">{label}</span>
  </button>
);
