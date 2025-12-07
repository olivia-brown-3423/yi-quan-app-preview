
import React, { useState } from 'react';
import { ChevronLeft, Search, MessageCircle, MoreHorizontal, User, AlertCircle, Check } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

// Simplified C2C statuses: Paid -> Shipping -> Shipped -> Completed
type OrderStatus = 'shipping' | 'shipped' | 'completed';

export const OrderListPage = () => {
    const { popScreen, pushScreen } = useNav();
    const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');
    const [showToast, setShowToast] = useState(false);

    // Mock Order Data (C2C Model) - Flattened structure: 1 Order = 1 Product
    const [orders, setOrders] = useState([
        {
            id: 'ord_1002',
            status: 'shipping' as OrderStatus,
            seller: { name: '工控资料库', id: 'u_10', avatar: 'https://picsum.photos/id/1012/50/50' },
            product: { ...MOCK_PRODUCTS[1], quantity: 1 },
            total: 55,
            date: '2024-03-10 14:20'
        },
        {
            id: 'ord_1003',
            status: 'shipped' as OrderStatus,
            seller: { name: '自动化小王子', id: 'u_11', avatar: 'https://picsum.photos/id/1013/50/50' },
            product: { ...MOCK_PRODUCTS[0], quantity: 1 },
            total: 3300,
            date: '2024-03-09 09:15'
        },
        {
            id: 'ord_1004',
            status: 'completed' as OrderStatus,
            seller: { name: '仪表张工', id: 'u_12', avatar: 'https://picsum.photos/id/1014/50/50' },
            product: { title: '西门子 S7-200 SMART 编程实例源码', price: 88, image: 'https://picsum.photos/id/1014/300/300', quantity: 1, type: 'virtual', id: 'p_virtual' },
            total: 88,
            date: '2024-03-01 18:30'
        },
        // Original ord_1005 split into two entries
        {
            id: 'ord_1005_1',
            status: 'completed' as OrderStatus,
            seller: { name: '老李工控回收', id: 'u_15', avatar: 'https://picsum.photos/id/1025/50/50' },
            product: { 
                title: '二手横河 EJA 变送器 (已下架)', 
                price: 450, 
                image: 'https://picsum.photos/id/1060/300/300', 
                quantity: 2, 
                type: 'product', 
                id: 'p_del_1',
                isDeleted: true // Marked as deleted
            },
            total: 900,
            date: '2024-02-28 10:12'
        },
        {
            id: 'ord_1005_2',
            status: 'completed' as OrderStatus,
            seller: { name: '老李工控回收', id: 'u_15', avatar: 'https://picsum.photos/id/1025/50/50' },
            product: { 
                title: '变送器安装支架', 
                price: 20, 
                image: 'https://picsum.photos/id/1070/300/300', 
                quantity: 5, 
                type: 'product', 
                id: 'p_normal_1' 
            },
            total: 100,
            date: '2024-02-28 10:12'
        }
    ]);

    const getStatusLabel = (status: OrderStatus) => {
        switch (status) {
            case 'shipping': return '待发货'; // Paid, waiting for seller
            case 'shipped': return '待收货'; // Seller sent
            case 'completed': return '已完成';
            default: return '';
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'shipping': return 'text-orange-500';
            case 'shipped': return 'text-blue-500';
            case 'completed': return 'text-gray-500';
            default: return 'text-gray-400';
        }
    };

    const handleProductClick = (item: any) => {
        if (item.isDeleted) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } else {
            pushScreen({ name: 'product_detail', params: { productId: item.id } });
        }
    };

    const handleDeleteOrder = (orderId: string) => {
        if (window.confirm('确认要删除该订单吗？删除后无法恢复。')) {
            setOrders(prev => prev.filter(o => o.id !== orderId));
        }
    };

    const filteredOrders = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab);

    return (
        <div className="flex flex-col h-full bg-gray-50 relative">
             {/* Toast */}
             {showToast && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg z-[60] flex items-center space-x-2 animate-in zoom-in fade-in duration-200 shadow-xl text-sm">
                    <AlertCircle size={16} className="text-gray-300" />
                    <span>该商品已失效，无法查看详情</span>
                </div>
            )}

            {/* Header */}
            <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
                <button onClick={popScreen} className="p-2 -ml-2 text-gray-700"><ChevronLeft size={24} /></button>
                <span className="font-bold text-lg text-gray-900">全部订单</span>
                <button className="p-2 -mr-2 text-gray-700"><Search size={22} /></button>
            </div>

            {/* Tabs */}
            <div className="bg-white flex items-center justify-around px-2 shadow-sm sticky top-14 z-10">
                {[
                    { id: 'all', label: '全部' },
                    { id: 'shipping', label: '待发货' },
                    { id: 'shipped', label: '待收货' },
                    { id: 'completed', label: '已完成' },
                ].map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 text-center py-3 text-sm font-medium cursor-pointer relative
                            ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-600'}`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MoreHorizontal size={32} className="opacity-30" />
                        </div>
                        <span>暂无相关订单</span>
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                            {/* Card Header: Seller Info */}
                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-50">
                                <div 
                                    className="flex items-center space-x-2 cursor-pointer active:opacity-70"
                                    onClick={() => pushScreen({ name: 'user_profile', params: { id: order.seller.id } })}
                                >
                                    <img src={order.seller.avatar} className="w-5 h-5 rounded-full bg-gray-200" alt="avatar" />
                                    <span className="font-bold text-gray-900 text-sm">{order.seller.name}</span>
                                    <ChevronLeft size={12} className="rotate-180 text-gray-300" />
                                </div>
                                <span className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {getStatusLabel(order.status)}
                                </span>
                            </div>

                            {/* Single Item */}
                            <div className="mb-3">
                                <div 
                                    className={`flex items-start space-x-3 cursor-pointer ${order.product.isDeleted ? 'opacity-70' : ''}`}
                                    onClick={() => handleProductClick(order.product)}
                                >
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100 relative">
                                        <img src={order.product.image} className={`w-full h-full object-cover ${order.product.isDeleted ? 'grayscale' : ''}`} alt="product" />
                                        {order.product.isDeleted && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span className="text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded">已失效</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                                        <div>
                                            <h3 className={`text-sm font-bold line-clamp-2 leading-snug ${order.product.isDeleted ? 'text-gray-400' : 'text-gray-900'}`}>
                                                {order.product.title}
                                            </h3>
                                            <div className="mt-1 text-xs text-gray-400 bg-gray-50 inline-block px-1.5 py-0.5 rounded">
                                                {order.product.type === 'virtual' ? '虚拟商品' : '实物商品'}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className={`font-medium text-sm ${order.product.isDeleted ? 'text-gray-400' : 'text-gray-900'}`}>
                                                <span className="text-xs mr-0.5">仪豆</span>{order.product.price}
                                            </div>
                                            <div className="text-gray-400 text-xs">x{order.product.quantity}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Stats (Per Order/Product) */}
                            <div className="flex justify-end items-center mb-4 space-x-2">
                                <span className="text-xs text-gray-500">共 {order.product.quantity} 件商品</span>
                                <span className="text-sm text-gray-900 font-medium">实付:</span>
                                <span className="text-base font-bold text-gray-900">{order.total}</span>
                                <span className="text-xs text-gray-900">仪豆</span>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end space-x-3 pt-2 border-t border-gray-50">
                                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50" onClick={() => pushScreen({ name: 'chat_detail', params: { title: order.seller.name } })}>
                                   <MessageCircle size={12} />
                                   <span>联系卖家</span>
                                </button>
                                
                                {order.status === 'shipping' && (
                                    <>
                                        <ActionButton label="提醒发货" secondary />
                                    </>
                                )}
                                {order.status === 'shipped' && (
                                    <>
                                        <ActionButton label="确认收货" primary />
                                    </>
                                )}
                                {order.status === 'completed' && (
                                    <>
                                        <ActionButton label="删除订单" secondary onClick={() => handleDeleteOrder(order.id)} />
                                        {!order.product.isDeleted && (
                                            <ActionButton 
                                                label="再次购买" 
                                                primary 
                                                onClick={() => pushScreen({ name: 'product_detail', params: { productId: order.product.id } })}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
                
                <div className="h-4 text-center text-xs text-gray-300 mt-4">
                    — 仅显示最近半年的订单 —
                </div>
            </div>
        </div>
    );
};

const ActionButton = ({ label, primary, secondary, onClick }: { label: string, primary?: boolean, secondary?: boolean, onClick?: () => void }) => (
    <button 
        onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
        }}
        className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-transform active:scale-95
        ${primary ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : ''}
        ${secondary ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50' : ''}
    `}>
        {label}
    </button>
);
