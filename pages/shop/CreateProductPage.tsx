
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Camera, CreditCard, UploadCloud, FileText, Video, Trash2, Plus, Film, Bold, Italic, Underline, AlignLeft, AlignCenter, List, Image as ImageIcon } from 'lucide-react';
import { useNav } from '../../context/NavContext';
import { MOCK_PRODUCTS } from '../../types';

// Simple Rich Text Editor Component
const RichTextEditor = ({ initialValue, onChange }: { initialValue: string, onChange: (val: string) => void }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (editorRef.current && initialValue && !isMounted) {
            editorRef.current.innerHTML = initialValue;
            setIsMounted(true);
        }
    }, [initialValue, isMounted]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const exec = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        handleInput();
        editorRef.current?.focus();
    };

    const ToolBtn = ({ icon: Icon, onClick, active }: any) => (
        <button 
            type="button"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`p-1.5 rounded transition-colors ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            <Icon size={16} />
        </button>
    );

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col h-80">
            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-100 shrink-0">
                <ToolBtn icon={Bold} onClick={() => exec('bold')} />
                <ToolBtn icon={Italic} onClick={() => exec('italic')} />
                <ToolBtn icon={Underline} onClick={() => exec('underline')} />
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <ToolBtn icon={AlignLeft} onClick={() => exec('justifyLeft')} />
                <ToolBtn icon={AlignCenter} onClick={() => exec('justifyCenter')} />
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <ToolBtn icon={List} onClick={() => exec('insertUnorderedList')} />
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <ToolBtn icon={ImageIcon} onClick={() => {
                    const url = prompt("请输入图片链接:", "https://picsum.photos/300/200");
                    if (url) exec('insertImage', url);
                }} />
            </div>
            
            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                className="flex-1 p-4 focus:outline-none text-sm leading-relaxed overflow-y-auto [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:mb-2 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                onInput={handleInput}
                data-placeholder="详细描述你的商品内容、用途、注意事项等..."
                style={{ minHeight: '150px' }}
            />
        </div>
    );
};

export const CreateProductPage = ({ params }: { params?: { productId: string } }) => {
   const { popScreen } = useNav();
   const isEdit = !!params?.productId;
   
   const existingProduct = isEdit ? MOCK_PRODUCTS.find(p => p.id === params?.productId) : null;

   const [sellerPrice, setSellerPrice] = useState<number | ''>(existingProduct ? (existingProduct.originalPrice || 0) : '');
   const [type, setType] = useState(existingProduct?.type || 'virtual');
   const [title, setTitle] = useState(existingProduct?.title || '');
   const [desc, setDesc] = useState(existingProduct?.description || '');

   // State for File Uploads
   const [fileList, setFileList] = useState<any[]>([]);
   const [videoList, setVideoList] = useState<any[]>([]);

   // Mock Initialization for Edit Mode
   useEffect(() => {
      if (isEdit) {
         if (existingProduct?.type === 'file') {
            setFileList([
               { id: 1, name: '西门子PLC编程手册_v2.0.pdf', size: '12.5 MB' },
               { id: 2, name: '附赠源码包.zip', size: '2.1 MB' }
            ]);
         } else if (existingProduct?.type === 'video_collection') {
            setVideoList([
               { id: 1, name: '第一章：硬件组态基础', duration: '12:30', cover: 'https://picsum.photos/id/10/200/200' },
               { id: 2, name: '第二章：LAD语言入门', duration: '45:20', cover: 'https://picsum.photos/id/11/200/200' }
            ]);
         }
      }
   }, [isEdit, existingProduct]);

   const displayPrice = sellerPrice ? Math.floor(sellerPrice * 1.1) : 0;
   const fee = sellerPrice ? displayPrice - sellerPrice : 0;

   // Handlers
   const handleAddFile = () => {
      const newFile = {
          id: Date.now(),
          name: `新增资料_${fileList.length + 1}_说明书.pdf`,
          size: '5.2 MB'
      };
      setFileList([...fileList, newFile]);
   };

   const handleAddVideo = () => {
      const newVideo = {
          id: Date.now(),
          name: `新增课程_${videoList.length + 1}_实操演示.mp4`,
          duration: '15:00',
          cover: `https://picsum.photos/seed/${Date.now()}/200/200`
      };
      setVideoList([...videoList, newVideo]);
   };

   const removeFile = (id: number) => setFileList(fileList.filter(f => f.id !== id));
   const removeVideo = (id: number) => setVideoList(videoList.filter(v => v.id !== id));

   return (
      <div className="flex flex-col h-full bg-gray-50">
         <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-20">
            <button onClick={popScreen}><ChevronLeft /></button>
            <span className="font-bold text-lg">{isEdit ? '编辑商品' : '上架商品'}</span>
            <span className="text-sm text-gray-400 w-6"></span>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
            {/* Cover Image Upload */}
            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 h-40 relative overflow-hidden group cursor-pointer hover:border-blue-400 transition-colors">
               {existingProduct ? (
                  <img src={existingProduct.image} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" alt="upload" />
               ) : null}
               <div className="relative z-10 flex flex-col items-center bg-white/60 p-2 rounded-lg backdrop-blur-sm">
                  <Camera className="text-gray-600 mb-1" size={28} />
                  <span className="text-gray-700 text-xs font-medium">添加商品主图</span>
               </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl p-4 space-y-4 shadow-sm">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">商品类型</label>
                  <div className="flex space-x-2">
                     {[
                        { id: 'virtual', label: '虚拟商品', icon: CreditCard },
                        { id: 'file', label: '资料文件', icon: FileText },
                        { id: 'video_collection', label: '视频课程', icon: Film }
                     ].map(t => (
                        <button 
                           key={t.id}
                           onClick={() => setType(t.id as any)}
                           className={`flex-1 py-2.5 text-xs font-medium rounded-lg border flex flex-col items-center justify-center space-y-1 transition-all
                              ${type === t.id ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm' : 'border-gray-100 text-gray-500 bg-gray-50'}`}
                        >
                           <t.icon size={18} />
                           <span>{t.label}</span>
                        </button>
                     ))}
                  </div>
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品标题 <span className="text-red-500">*</span></label>
                  <input 
                     type="text" 
                     value={title}
                     onChange={e => setTitle(e.target.value)}
                     placeholder="请输入商品标题" 
                     className="w-full bg-gray-50 p-3 rounded-lg border border-gray-100 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm" 
                  />
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品详情</label>
                  <RichTextEditor 
                     initialValue={desc} 
                     onChange={setDesc}
                  />
               </div>
            </div>

            {/* Dynamic Content Upload Section */}
            {type === 'file' && (
               <div className="bg-white rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                   <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2">
                           <FileText className="text-blue-500" size={18} />
                           <h3 className="font-bold text-gray-900 text-sm">附件管理 ({fileList.length})</h3>
                        </div>
                        <span className="text-[10px] text-gray-400">支持 PDF, Zip, Doc</span>
                   </div>
                   
                   <div className="space-y-3">
                       {fileList.map(f => (
                           <div key={f.id} className="flex items-center p-3 border border-gray-100 rounded-lg bg-gray-50 hover:border-blue-200 transition-colors">
                               <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 mr-3 shrink-0">
                                   <FileText size={20}/>
                               </div>
                               <div className="flex-1 min-w-0">
                                   <div className="text-sm font-bold text-gray-800 truncate mb-0.5">{f.name}</div>
                                   <div className="text-xs text-gray-400">{f.size} · 上传成功</div>
                               </div>
                               <button 
                                   onClick={() => removeFile(f.id)} 
                                   className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                               >
                                   <Trash2 size={18}/>
                               </button>
                           </div>
                       ))}
                       
                       <button 
                           onClick={handleAddFile} 
                           className="w-full border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-lg py-3 flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-[0.99] transition-all"
                       >
                           <UploadCloud size={20} className="mr-2" />
                           <span className="text-sm font-bold">点击上传文件</span>
                       </button>
                   </div>
               </div>
            )}

            {type === 'video_collection' && (
               <div className="bg-white rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                   <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2">
                           <Video className="text-purple-500" size={18} />
                           <h3 className="font-bold text-gray-900 text-sm">课程视频 ({videoList.length})</h3>
                        </div>
                        <span className="text-[10px] text-gray-400">支持 MP4, MOV</span>
                   </div>
                   
                   <div className="space-y-3">
                        {videoList.map((v, idx) => (
                           <div key={v.id} className="flex items-start p-2 border border-gray-100 rounded-lg bg-gray-50 hover:border-purple-200 transition-colors">
                               <div className="relative w-24 h-16 shrink-0 rounded overflow-hidden bg-black">
                                   <img src={v.cover} className="w-full h-full object-cover opacity-80" />
                                   <div className="absolute inset-0 flex items-center justify-center">
                                       <Video size={16} className="text-white/80" />
                                   </div>
                                   <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded">
                                       {v.duration}
                                   </div>
                               </div>
                               
                               <div className="flex-1 min-w-0 ml-3 pt-0.5">
                                   <div className="text-xs text-gray-400 mb-0.5">第 {idx + 1} 节</div>
                                   <div className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">{v.name}</div>
                               </div>
                               
                               <button 
                                   onClick={() => removeVideo(v.id)} 
                                   className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors self-center"
                               >
                                   <Trash2 size={18}/>
                               </button>
                           </div>
                       ))}
                        
                        <button 
                           onClick={handleAddVideo} 
                           className="w-full border-2 border-dashed border-purple-200 bg-purple-50/50 rounded-lg py-3 flex items-center justify-center text-purple-600 hover:bg-purple-50 active:scale-[0.99] transition-all"
                        >
                           <Plus size={20} className="mr-2" />
                           <span className="text-sm font-bold">添加视频章节</span>
                        </button>
                   </div>
               </div>
            )}

            {/* Price Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
               <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-orange-100 p-1.5 rounded-lg">
                     <CreditCard className="text-orange-500" size={18} />
                  </div>
                  <span className="font-bold text-gray-900 text-sm">价格设置 (仪豆)</span>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>你的预期收入 (定价)</span>
                        <span className="text-gray-400 text-xs">扣除手续费后到账</span>
                     </label>
                     <div className="relative">
                        <input 
                           type="number" 
                           value={sellerPrice}
                           onChange={(e) => setSellerPrice(Number(e.target.value))}
                           placeholder="0.00"
                           className="w-full bg-gray-50 p-3 rounded-lg text-xl font-bold text-gray-900 border border-gray-100 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors" 
                        />
                        <span className="absolute right-4 top-4 text-gray-500 text-xs font-bold">仪豆</span>
                     </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 space-y-2 border border-blue-100">
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">橱窗售价 (消费者支付)</span>
                        <span className="text-base font-bold text-red-500">{displayPrice} 仪豆</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span>交易管理费 (10%)</span>
                        <span>{fee} 仪豆</span>
                     </div>
                  </div>
               </div>
            </div>

            {isEdit && (
               <button className="w-full bg-white text-red-500 py-3.5 rounded-xl font-bold border border-gray-200 text-sm hover:bg-red-50 transition-colors">
                  删除商品
               </button>
            )}
         </div>

         <div className="bg-white p-4 border-t pb-safe sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-full font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-transform">
               {isEdit ? '保存修改' : '立即上架'}
            </button>
         </div>
      </div>
   );
};
