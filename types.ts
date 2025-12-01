
// --- Types ---

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  gender?: 'Male' | 'Female';
  age?: number;
  location?: string;
  stats?: {
    likes: number;
    mutuals: number;
    following: number;
    followers: number;
    coins: number;
  };
  isVip?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  type: 'text' | 'image' | 'voice' | 'system' | 'redPacket' | 'videoCall';
  unreadCount?: number;
  avatar?: string;
  isGroup?: boolean;
  isMe?: boolean;
  image?: string;
  voiceDuration?: number; // seconds
  redPacket?: {
    amount?: string;
    status: 'sent' | 'received' | 'opened';
    note: string;
  };
}

export interface FeedItem {
  id: string;
  user: User;
  content: string;
  images?: string[];
  time: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  hasVideo?: boolean;
  type?: 'dynamic' | 'article' | 'qa' | 'project' | 'video';
  title?: string; // For articles/projects
  tags?: string[];
  
  // Video specific
  videoInfo?: {
    duration: string;
    views: number;
    cover: string;
  };

  // Project specific
  projectInfo?: {
    status: 'recruiting' | 'funding' | 'ongoing' | 'completed';
    progress: number; // 0-100
    targetAmount?: number;
    currentAmount?: number;
    roles?: string[];
    location?: string;
  };
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  members: number;
  resources: number;
  cover: string;
  ownerId: string;
  announcements?: string[];
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  time: string;
  likes: number;
  replies?: number;
}

export interface Product {
  id: string;
  title: string;
  price: number; // Display Price (Buyer Pays)
  originalPrice?: number; // Seller Income
  type: 'file' | 'video_collection' | 'virtual';
  image: string;
  sales: number;
  description: string;
  seller: User;
  status: 'on_shelf' | 'off_shelf';
}

export interface Transaction {
  id: string;
  type: 'recharge' | 'withdraw' | 'income' | 'expense';
  amount: number;
  desc: string;
  time: string;
}

export interface UserCommentHistory {
  id: string;
  targetId: string; // Post ID
  targetContent: string;
  myContent: string;
  time: string;
}

// --- Mock Data ---

export const CURRENT_USER: User = {
  id: 'me',
  name: '何刺刺',
  avatar: 'https://picsum.photos/id/64/200/200',
  bio: '该用户很懒，没留下文字...',
  gender: 'Female',
  age: 20,
  location: '河南 · 许昌',
  isVip: true,
  stats: {
    likes: 33,
    mutuals: 8,
    following: 188,
    followers: 50,
    coins: 1230
  }
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: '仪聚新闻',
    content: '三个失踪孩子，已全部遇难',
    time: '昨天 16:21',
    type: 'system',
    unreadCount: 8,
    avatar: 'https://picsum.photos/id/10/100/100',
    isGroup: false
  },
  {
    id: '2',
    sender: '服务通知',
    content: '新用户：欢迎文刀刘加入',
    time: '9:12',
    type: 'system',
    unreadCount: 8,
    avatar: 'https://picsum.photos/id/20/100/100',
    isGroup: false
  },
  {
    id: '3',
    sender: '我的提醒',
    content: '频道申请：流浪的阿刁申请加入在线分析...',
    time: '8:12',
    type: 'system',
    unreadCount: 8,
    avatar: 'https://picsum.photos/id/30/100/100',
    isGroup: false
  },
  {
    id: '4',
    sender: '语文张老师',
    content: '是的，先约好时间',
    time: '星期日',
    type: 'text',
    unreadCount: 8,
    avatar: 'https://picsum.photos/id/1005/100/100',
    isGroup: false
  },
  {
    id: '5',
    sender: '会飞的猪',
    content: '是呀，没办法，到处漂[捂脸]',
    time: '星期六',
    type: 'text',
    unreadCount: 8,
    avatar: 'https://picsum.photos/id/1011/100/100',
    isGroup: false
  },
  {
    id: '6',
    sender: '仪聚猿人 (5/20)',
    content: '老杨：哈哈哈',
    time: '19:21',
    type: 'text',
    unreadCount: 8,
    avatar: 'https://picsum.photos/id/1012/100/100',
    isGroup: true
  },
  {
    id: '7',
    sender: '在钱分析仪展会 (567/3000)',
    content: '小徐:[OK]',
    time: '22:18',
    type: 'text',
    unreadCount: 8,
    avatar: 'https://picsum.photos/id/1013/100/100',
    isGroup: true
  },
  {
    id: '8',
    sender: '聚仪堂 (21/200)',
    content: '老孙：本月11日杭州在线分析仪表展',
    time: '12:18',
    type: 'text',
    unreadCount: 0,
    avatar: 'https://picsum.photos/id/1014/100/100',
    isGroup: true
  }
];

export const MOCK_CHAT_HISTORY: Message[] = [
  {
    id: 'c1',
    sender: 'System',
    content: '你已添加了会飞的猪，现在可以开始聊天了。',
    time: '10:00',
    type: 'system',
    isMe: false,
    avatar: ''
  },
  {
    id: 'c2',
    sender: '会飞的猪',
    content: 'Hello! 听说你在做仪表行业的APP？',
    time: '10:05',
    type: 'text',
    isMe: false,
    avatar: 'https://picsum.photos/id/1011/100/100'
  },
  {
    id: 'c3',
    sender: 'me',
    content: '是的，主要做垂直领域的社交和资源对接。',
    time: '10:06',
    type: 'text',
    isMe: true,
    avatar: CURRENT_USER.avatar
  },
  {
    id: 'c4',
    sender: '会飞的猪',
    content: '听起来不错！我这里有一些展会的资料，发给你看看。',
    time: '10:07',
    type: 'voice',
    voiceDuration: 12,
    isMe: false,
    avatar: 'https://picsum.photos/id/1011/100/100'
  },
  {
    id: 'c5',
    sender: '会飞的猪',
    content: '',
    image: 'https://picsum.photos/id/1060/400/300',
    time: '10:08',
    type: 'image',
    isMe: false,
    avatar: 'https://picsum.photos/id/1011/100/100'
  },
  {
    id: 'c6',
    sender: 'me',
    content: '收到，这正是我们需要的！',
    time: '10:10',
    type: 'text',
    isMe: true,
    avatar: CURRENT_USER.avatar
  },
  {
    id: 'c7',
    sender: 'me',
    content: '大吉大利',
    time: '10:11',
    type: 'redPacket',
    isMe: true,
    avatar: CURRENT_USER.avatar,
    redPacket: {
      status: 'sent',
      note: '请喝咖啡',
      amount: '50.00'
    }
  },
  {
    id: 'c8',
    sender: '会飞的猪',
    content: '视频通话已结束',
    time: '10:15',
    type: 'videoCall',
    isMe: false,
    avatar: 'https://picsum.photos/id/1011/100/100'
  }
];

export const MOCK_VIDEOS: FeedItem[] = [
  {
    id: 'v1',
    user: { id: 'u10', name: '科技前沿', avatar: 'https://picsum.photos/id/10/100/100' },
    content: '2024最新仪表技术展示，精度提升10倍！',
    time: '10-24',
    type: 'video',
    stats: { likes: 1200, comments: 45, shares: 200 },
    videoInfo: {
      duration: '03:45',
      views: 15000,
      cover: 'https://picsum.photos/id/201/400/600'
    }
  },
  {
    id: 'v2',
    user: { id: 'u11', name: '工程师日常', avatar: 'https://picsum.photos/id/11/100/100' },
    content: '现场调试Vlog，今天遇到个棘手的问题...',
    time: '昨天',
    type: 'video',
    stats: { likes: 340, comments: 22, shares: 15 },
    videoInfo: {
      duration: '01:20',
      views: 4500,
      cover: 'https://picsum.photos/id/202/400/600'
    }
  },
   {
    id: 'v3',
    user: { id: 'u12', name: '仪器小百科', avatar: 'https://picsum.photos/id/12/100/100' },
    content: '如何正确维护PH计？这三点一定要记住。',
    time: '2天前',
    type: 'video',
    stats: { likes: 890, comments: 56, shares: 110 },
    videoInfo: {
      duration: '05:10',
      views: 8900,
      cover: 'https://picsum.photos/id/203/400/600'
    }
  },
  {
    id: 'v4',
    user: { id: 'u13', name: '展会直击', avatar: 'https://picsum.photos/id/13/100/100' },
    content: '带你逛上海国际仪器仪表展，好多新品！',
    time: '3天前',
    type: 'video',
    stats: { likes: 2300, comments: 120, shares: 560 },
    videoInfo: {
      duration: '10:05',
      views: 32000,
      cover: 'https://picsum.photos/id/204/400/600'
    }
  }
];

export const MOCK_PROJECTS: FeedItem[] = [
  {
    id: 'pj1',
    user: { id: 'u20', name: '张工', avatar: 'https://picsum.photos/id/20/100/100' },
    title: '便携式多功能水质分析仪研发',
    content: '致力于开发一款低成本、高精度的手持式水质分析设备，主要应用于户外快速检测。目前已完成原型机验证。',
    time: '1周前',
    type: 'project',
    tags: ['硬件研发', '环保', '智能硬件'],
    stats: { likes: 45, comments: 12, shares: 8 },
    images: ['https://picsum.photos/id/250/600/300'],
    projectInfo: {
      status: 'funding',
      progress: 65,
      targetAmount: 500000,
      currentAmount: 325000,
      roles: ['嵌入式工程师', '工业设计师'],
      location: '上海'
    }
  },
  {
    id: 'pj2',
    user: { id: 'u21', name: '李教授团队', avatar: 'https://picsum.photos/id/21/100/100' },
    title: '基于AI的工业仪表故障诊断系统',
    content: '利用深度学习算法，对工业现场的仪表数据进行实时分析，预测潜在故障。',
    time: '2天前',
    type: 'project',
    tags: ['人工智能', '工业SaaS', '数据分析'],
    stats: { likes: 128, comments: 34, shares: 20 },
    images: ['https://picsum.photos/id/251/600/300'],
    projectInfo: {
      status: 'recruiting',
      progress: 30,
      roles: ['后端开发', '算法工程师', '产品经理'],
      location: '北京'
    }
  }
];

export const MOCK_COMMUNITY_FEED: FeedItem[] = [
  {
    id: 'c1',
    user: { id: 'u1', name: 'QY', avatar: 'https://picsum.photos/id/1025/100/100' },
    content: '学长学姐们，怎么样才能把图一的表格做成图二的样子啊😭',
    images: ['https://picsum.photos/id/1070/400/300'],
    time: '10-23 01:09',
    type: 'dynamic',
    stats: { likes: 4, comments: 13, shares: 0 }
  },
  {
    id: 'c2',
    user: { id: 'u2', name: '踏踏路', avatar: 'https://picsum.photos/id/1027/100/100' },
    content: '感受清晨第一缕阳光',
    hasVideo: true,
    time: '2024年3月3日',
    type: 'dynamic',
    stats: { likes: 35, comments: 2, shares: 5 }
  },
  {
    id: 'a1',
    user: { id: 'u5', name: '仪表专家', avatar: 'https://picsum.photos/id/1020/100/100' },
    title: '2024年中国在线分析仪器市场发展趋势报告',
    content: '随着工业4.0的推进，在线分析仪器市场迎来了新的增长点...',
    time: '2小时前',
    type: 'article',
    images: ['https://picsum.photos/id/1031/400/250'],
    stats: { likes: 120, comments: 45, shares: 88 }
  },
  {
    id: 'q1',
    user: { id: 'u6', name: '小白求教', avatar: 'https://picsum.photos/id/1040/100/100' },
    title: 'PH计电极保护液干了怎么办？',
    content: '如题，放置了大概一个月，发现保护液已经完全干了，电极还能用吗？需要怎么处理？',
    time: '1天前',
    type: 'qa',
    tags: ['PH计', '维护保养'],
    stats: { likes: 5, comments: 8, shares: 1 }
  },
  ...MOCK_VIDEOS,
  ...MOCK_PROJECTS
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Fluke 17B+ 数字万用表 (官方正品)',
    price: 3300, // Display Price
    originalPrice: 3000, // Seller gets
    type: 'virtual',
    image: 'https://picsum.photos/id/1080/300/300',
    sales: 12,
    description: '全新正品，包含表笔、电池、说明书。仪豆交易，安全保障。',
    seller: CURRENT_USER,
    status: 'on_shelf'
  },
  {
    id: 'p2',
    title: '西门子PLC编程入门教程(PDF)',
    price: 55, 
    originalPrice: 50,
    type: 'file',
    image: 'https://picsum.photos/id/1081/300/300',
    sales: 589,
    description: '电子版教程，拍下自动发货。适合初学者。',
    seller: CURRENT_USER,
    status: 'on_shelf'
  },
  {
    id: 'p3',
    title: '仪表调试技巧合集(内部资料)',
    price: 110,
    originalPrice: 100,
    type: 'file',
    image: 'https://picsum.photos/id/1082/300/300',
    sales: 0,
    description: '多年工作经验总结，干货满满。',
    seller: CURRENT_USER,
    status: 'off_shelf'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'recharge', amount: 1000, desc: '微信充值', time: '2024-03-10 10:23' },
  { id: 't2', type: 'expense', amount: -200, desc: '购买商品', time: '2024-03-09 15:30' },
  { id: 't3', type: 'income', amount: 50, desc: '出售商品收入', time: '2024-03-08 09:12' },
  { id: 't4', type: 'withdraw', amount: -500, desc: '提现到银行卡', time: '2024-03-01 12:00' }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'cm1',
    user: { id: 'u3', name: '子秋', avatar: 'https://picsum.photos/id/33/100/100' },
    content: '不明白白可以再问',
    time: '10-23 01:20',
    likes: 2,
  },
  {
    id: 'cm2',
    user: { id: 'u4', name: 'QY', avatar: 'https://picsum.photos/id/1025/100/100' },
    content: '好的好的谢谢谢谢🙏',
    time: '10-23 01:25',
    likes: 0,
  },
  {
    id: 'cm3',
    user: { id: 'u3', name: '子秋', avatar: 'https://picsum.photos/id/33/100/100' },
    content: '1、先选择需要的合并的单元格，选择“单元格”列表里有“合并单元格”2、先选择需要合并的单元格，再点工具栏上方有带合并单元格的选项。',
    time: '10-23 01:30',
    likes: 5,
  }
];

export const MOCK_MY_COMMENTS: UserCommentHistory[] = [
  {
    id: 'mc1',
    targetId: 'c1',
    targetContent: '学长学姐们，怎么样才能把图一的表格做成图二的样子啊😭',
    myContent: '这个需要用到Excel的透视表功能，我可以教你。',
    time: '昨天 14:20'
  },
  {
    id: 'mc2',
    targetId: 'a1',
    targetContent: '2024年中国在线分析仪器市场发展趋势报告',
    myContent: '非常有深度的报告，感谢分享！',
    time: '10-22 09:30'
  }
];

export const MOCK_CHANNELS: Channel[] = [
  {
    id: 'ch1',
    name: '在线分析仪展会',
    members: 567,
    resources: 2394,
    description: '该频道由中国仪表协会主办，主要为推动国...',
    cover: 'https://picsum.photos/id/1060/300/500',
    ownerId: 'u_admin',
    announcements: ['欢迎新成员！', '本周五有线上讲座。']
  },
  {
    id: 'ch2',
    name: '聚仪堂一群',
    members: 1567,
    resources: 2394,
    description: '仪聚信息技术支持圈，解决APP各类问题...',
    cover: 'https://picsum.photos/id/1061/300/500',
    ownerId: 'u_admin',
    announcements: ['请勿发布广告。']
  },
  {
    id: 'ch3',
    name: '何刺刺的后花园',
    members: 20,
    resources: 5,
    description: '记录生活，分享快乐。',
    cover: 'https://picsum.photos/id/1062/300/500',
    ownerId: 'me', // Owned by current user
    announcements: ['这是我的个人频道。']
  }
];

export const CONTACT_GROUPS = [
  { title: '新的朋友', icon: 'UserPlus', color: 'bg-orange-500' },
  { title: '群聊', icon: 'MessageCircle', color: 'bg-green-500' },
  { title: '频道', icon: 'Hash', color: 'bg-blue-500' },
];

export const MY_CHANNELS = [
  { name: '在线分析仪展会', icon: 'https://picsum.photos/id/1013/50/50' },
  { name: '聚仪堂技术服务一号群', icon: 'https://picsum.photos/id/1014/50/50' }
];

export const FOLLOWED_FRIENDS: User[] = [
  { 
    id: 'f1', 
    name: '会飞的猪', 
    avatar: 'https://picsum.photos/id/1011/50/50',
    bio: '一只特立独行的猪',
    location: '浙江·杭州',
    stats: {
      likes: 124,
      mutuals: 5,
      following: 45,
      followers: 321,
      coins: 10
    }
  },
  { 
    id: 'f2', 
    name: '李老师', 
    avatar: 'https://picsum.photos/id/1005/50/50',
    bio: '专注仪表教学20年',
    location: '北京',
    isVip: true,
    stats: {
      likes: 3341,
      mutuals: 50,
      following: 102,
      followers: 8842,
      coins: 500
    }
  }
];
