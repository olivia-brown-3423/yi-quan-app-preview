
import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, ShieldCheck, Check } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

export const ShoppingCartPage = () => {
    const { popScreen } = useNav();
    const [isEditing, setIsEditing] = useState(false);
    const [showToast, setShowToast] = useState<{ visible: boolean, message: string }>({ visible: false, message: '' });
    
    // Mock Cart Data - Flat list, treating each item as from an individual seller
    const [cartItems, setCartItems] = useState([
        { id: 'c1', product: MOCK_PRODUCTS[0], quantity: 1, selected: true },
        { id: 'c2', product: MOCK_PRODUCTS[1], quantity: 1, selected: false },
        { id: 'c3', product: { ...MOCK_PRODUCTS[0], id: 'p_diff', title: '高精度工业温度传感器', seller: { ...MOCK_PRODUCTS[0].seller, name: '仪表张工', avatar: 'https://picsum.photos/id/1012/50/50' } }, quantity: 2, selected: true },
    ]);

    const toggleSelect = (cartId: string) => {
        setCartItems(prev => prev.map(item => item.id === cartId ? { ...item, selected: !item.selected } : item));
    };

    const toggleSelectAll = () => {
        const allSelected = cartItems.length > 0 && cartItems.every(i => i.selected);
        setCartItems(prev => prev.map(item => ({ ...item, selected: !allSelected })));
    };

    const updateQuantity = (cartId: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === cartId) {
                const newQ = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQ };
            }
            return item;
        }));
    };

    const handleBulkDelete = () => {
        const selectedCount = cartItems.filter(i => i.selected).length;
        if (selectedCount === 0) return;
        setCartItems(prev => prev.filter(i => !i.selected));
        showToastMsg(`已删除 ${selectedCount} 个商品`);
    };

    const handleBulkFavorite = () => {
        const selectedCount = cartItems.filter(i => i.selected).length;
        if (selectedCount === 0) return;
        // Logic to move to favorites would go here
        setCartItems(prev => prev.filter(i => !i.selected)); // Simulating move out of cart
        showToastMsg(`已将 ${selectedCount} 个商品移入收藏`);
    };

    const showToastMsg = (msg: string) => {
        setShowToast({ visible: true, message: msg });
        setTimeout(() => setShowToast({ visible: false, message: '' }), 2000);
    };

    const totalAmount = cartItems.filter(i => i.selected).reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const selectedCount = cartItems.filter(i => i.selected).length;
    const allSelected = cartItems.length > 0 && cartItems.every(i => i.selected);

    return (
        <div className="flex flex-col h-full bg-gray-50 relative animate-in slide-in-from-right duration-300">
            {/* Toast */}
            {showToast.visible && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-xl z-[60] flex items-center space-x-2 animate-in zoom-in fade-in duration-200 shadow-2xl">
                    <Check size={20} className="text-green-400" />
                    <span className="font-medium">{showToast.message}</span>
                </div>
            )}

            {/* Header */}
            <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
                <button onClick={popScreen} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
                <span className="font-bold text-lg">购物车 ({cartItems.length})</span>
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`text-sm font-medium px-2 py-1 rounded transition-colors ${isEditing ? 'text-blue-600' : 'text-gray-900'}`}
                >
                    {isEditing ? '完成' : '管理'}
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                         <ShoppingBag size={48} className="mb-2 opacity-30" />
                         <span>购物车是空的</span>
                         <button onClick={popScreen} className="mt-4 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">去选购商品</button>
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm relative group">
                            {/* Seller Info Header */}
                            <div className="flex items-center text-xs text-gray-500 mb-3 pb-2 border-b border-gray-50">
                                <img src={item.product.seller.avatar} className="w-5 h-5 rounded-full mr-2 bg-gray-200" alt="avatar"/>
                                <span className="font-medium text-gray-800 mr-2">{item.product.seller.name}</span>
                                <span className="text-[10px] bg-orange-50 text-orange-600 px-1 rounded flex items-center">
                                    <ShieldCheck size={10} className="mr-0.5" /> 平台担保
                                </span>
                            </div>

                            <div className="flex items-center">
                                {/* Checkbox */}
                                <div className="mr-3 cursor-pointer active:scale-90 transition-transform p-1 -ml-1 flex items-center h-full" onClick={() => toggleSelect(item.id)}>
                                    <Checkbox checked={item.selected} />
                                </div>

                                {/* Product Image */}
                                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                    <img src={item.product.image} className="w-full h-full object-cover" alt="product" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 ml-3 min-w-0 flex flex-col justify-between h-24">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1">{item.product.title}</h3>
                                        <div className="inline-block bg-gray-50 text-gray-400 text-[10px] px-1.5 py-0.5 rounded">
                                            {item.product.type === 'file' ? '自动发货' : '极速发货'}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-end justify-between">
                                        <div className="text-red-500 font-bold text-base">
                                            <span className="text-xs font-normal text-red-400 mr-0.5">仪豆</span>
                                            {item.product.price}
                                        </div>
                                        
                                        {/* Stepper */}
                                        <div className={`flex items-center bg-gray-50 rounded-lg text-sm border border-gray-100 h-7 ${isEditing ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)} 
                                                className="w-7 h-full flex items-center justify-center text-gray-500 active:bg-gray-200 rounded-l-lg"
                                            >-</button>
                                            <span className="w-8 text-center font-medium text-gray-900 text-xs">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)} 
                                                className="w-7 h-full flex items-center justify-center text-gray-500 active:bg-gray-200 rounded-r-lg"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-4 py-2 pb-safe z-20 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center space-x-2 cursor-pointer p-2 -ml-2" onClick={toggleSelectAll}>
                    <Checkbox checked={allSelected && cartItems.length > 0} />
                    <span className="text-sm text-gray-600 ml-1">全选</span>
                </div>
                
                {isEditing ? (
                    <div className="flex items-center space-x-3">
                         <button 
                            onClick={handleBulkFavorite}
                            disabled={selectedCount === 0}
                            className={`px-4 py-2 rounded-full font-bold text-sm border transition-colors ${selectedCount > 0 ? 'border-orange-500 text-orange-500 active:bg-orange-50' : 'border-gray-200 text-gray-300'}`}
                        >
                            移入收藏
                        </button>
                        <button 
                            onClick={handleBulkDelete}
                            disabled={selectedCount === 0}
                            className={`px-6 py-2 rounded-full font-bold text-sm border transition-colors ${selectedCount > 0 ? 'border-red-500 text-red-500 active:bg-red-50' : 'border-gray-200 text-gray-300'}`}
                        >
                            删除 {selectedCount > 0 ? `(${selectedCount})` : ''}
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <div className="text-sm font-bold text-gray-900">
                                合计: <span className="text-red-500 text-lg">{totalAmount}</span> <span className="text-xs text-red-500">仪豆</span>
                            </div>
                            <div className="text-[10px] text-gray-400">无额外手续费</div>
                        </div>
                        <button 
                            disabled={selectedCount === 0}
                            className={`px-8 py-2.5 rounded-full font-bold text-sm shadow-lg transition-transform ${selectedCount > 0 ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            结算 ({selectedCount})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Checkbox = ({ checked }: { checked: boolean }) => (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${checked ? 'bg-red-500 border-red-500' : 'bg-transparent border-2 border-gray-300'}`}>
        {checked && <Check size={14} className="text-white" strokeWidth={3} />}
    </div>
);
