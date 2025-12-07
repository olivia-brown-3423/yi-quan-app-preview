
import React, { createContext, useContext } from 'react';

export type Screen = 
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
  | { name: 'channel_shop'; params?: any }
  | { name: 'channel_list_selector'; params?: any }
  | { name: 'collection_list' }
  | { name: 'create_collection' }
  | { name: 'collection_detail'; params: any }
  | { name: 'shopping_cart' }
  | { name: 'order_list'; params?: any };

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
