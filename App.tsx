
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Hash, 
  Aperture, 
  User as UserIcon 
} from 'lucide-react';

import { NavContext, Screen } from './context/NavContext';

// Tabs
import { MessagesTab } from './tabs/MessagesTab';
import { ContactsTab } from './tabs/ContactsTab';
import { ChannelsTab } from './tabs/ChannelsTab';
import { CommunityTab } from './tabs/CommunityTab';
import { MeTab } from './tabs/MeTab';

// Pages
import { ChatDetail } from './pages/chat/ChatDetail';
import { CreateChannel } from './pages/channel/CreateChannel';
import { UserProfile } from './pages/contact/UserProfile';
import { ChannelDetail } from './pages/channel/ChannelDetail';
import { SearchPage } from './pages/search/SearchPage';
import { CommunityDetail } from './pages/community/CommunityDetail';
import { ArticleDetail } from './pages/community/ArticleDetail';
import { QADetail } from './pages/community/QADetail';
import { VideoDetail } from './pages/community/VideoDetail';
import { ProjectDetail } from './pages/community/ProjectDetail';
import { WalletPage } from './pages/me/WalletPage';
import { SettingsPage } from './pages/me/SettingsPage';
import { ProductDetail } from './pages/shop/ProductDetail';
import { PublishPage } from './pages/community/PublishPage';
import { AddFriendPage } from './pages/contact/AddFriendPage';
import { CreateGroupPage } from './pages/chat/CreateGroupPage';
import { CreateProductPage } from './pages/shop/CreateProductPage';
import { ProductManagementPage } from './pages/shop/ProductManagementPage';
import { ChannelShopPage } from './pages/channel/ChannelShopPage';
import { ChannelListSelector } from './pages/channel/ChannelListSelector';
import { CollectionListPage } from './pages/me/CollectionListPage';
import { CreateCollectionPage } from './pages/me/CreateCollectionPage';
import { CollectionDetailPage } from './pages/me/CollectionDetailPage';
import { ShoppingCartPage } from './pages/shop/ShoppingCartPage';

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
      case 'channel_list_selector': return <ChannelListSelector />;
      case 'collection_list': return <CollectionListPage />;
      case 'create_collection': return <CreateCollectionPage />;
      case 'collection_detail': return <CollectionDetailPage params={screen.params} />;
      case 'shopping_cart': return <ShoppingCartPage />;
      default: return null;
    }
  };

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab, screenStack, pushScreen, popScreen }}>
      <div className="flex justify-center bg-gray-900 h-screen w-full">
        <div className="w-full max-w-md h-full bg-white relative flex flex-col shadow-2xl overflow-hidden">
          
          <div className="flex-1 overflow-hidden relative">
            <div className={`absolute inset-0 w-full h-full ${screenStack.length > 0 ? 'hidden' : 'block'}`}>
               {renderActiveTab()}
            </div>

            {screenStack.map((screen, index) => (
               <div key={index} className="absolute inset-0 w-full h-full bg-white z-20 slide-in">
                 {renderStackScreen(screen)}
               </div>
            ))}
          </div>

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
