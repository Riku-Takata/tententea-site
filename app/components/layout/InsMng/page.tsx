"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Edit, Trash } from 'lucide-react';

const InstructionPage = () => (
    <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">メニュー操作ガイド</h1>
        <Card className="mb-6">
            <CardHeader>
            <CardTitle className="flex items-center">
                <Menu className="mr-2" />
                メニュー追加
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p>1. 「新規メニュー」ボタンをクリック</p>
            <p>2. メニュー名、価格、説明を入力</p>
            <p>3. 「保存」をクリックして追加完了</p>
            </CardContent>
        </Card>
        <Card className="mb-6">
            <CardHeader>
            <CardTitle className="flex items-center">
                <Edit className="mr-2" />
                メニュー編集
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p>1. 編集したいメニューの「編集」ボタンをクリック</p>
            <p>2. 情報を更新</p>
            <p>3. 「保存」をクリックして変更を確定</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center">
                <Trash className="mr-2" />
                メニュー削除
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p>1. 削除したいメニューの「削除」ボタンをクリック</p>
            <p>2. 確認ダイアログで「はい」を選択</p>
            <p>3. メニューが削除されます</p>
            </CardContent>
        </Card>
    </div>
);

// SVG icons as components
const PlusCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

type Category = 'Drink' | 'Food' | 'Gelato';

interface Type {
    type: string;
    type2: string;
}

interface MenuItem {
    name: string;
    price: string;
    image: string;
}

interface MenuItemGroup {
    type: string;
    type2: string;
    items: MenuItem[];
}

type MenuItems = {
    [K in Category]: MenuItemGroup[];
}

type Types = {
    [K in Category]: Type[];
}

interface TypeManagerProps {
    category: Category;
    types: Type[];
    onAddType: (category: Category, newType: Type) => void;
    onEditType: (category: Category, index: number) => void;
    onDeleteType: (category: Category, index: number) => void;
}

// TypeManager Component
const TypeManager: React.FC<TypeManagerProps> = ({ category, types, onAddType, onEditType, onDeleteType }) => {
    const [newType, setNewType] = useState<Type>({ type: '', type2: '' });

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">{category} Types</h3>
        <div className="flex mb-2">
            <input
            value={newType.type}
            onChange={(e) => setNewType({ ...newType, type: e.target.value })}
            placeholder="Type"
            className="mr-2 p-2 border rounded"
            />
            <input
            value={newType.type2}
            onChange={(e) => setNewType({ ...newType, type2: e.target.value })}
            placeholder="Type2"
            className="mr-2 p-2 border rounded"
            />
            <button
            onClick={() => {
                onAddType(category, newType);
                setNewType({ type: '', type2: '' });
            }}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
            Add Type
            </button>
        </div>
        {types.map((type, index) => (
            <div key={index} className="flex items-center mb-2">
            <span className="mr-2">{type.type} - {type.type2}</span>
            <button
                onClick={() => onEditType(category, index)}
                className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                <EditIcon />
            </button>
            <button
                onClick={() => onDeleteType(category, index)}
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
                <TrashIcon />
            </button>
            </div>
        ))}
        </div>
    );
};

const CafeMenuManagement: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('Drink');
    const categories: Category[] = ['Drink', 'Food', 'Gelato'];
    const [menuItems, setMenuItems] = useState<MenuItems>({
        Drink: [],
        Food: [],
        Gelato: [],
    });
    const [types, setTypes] = useState<Types>({
        Drink: [],
        Food: [],
        Gelato: [],
    });
    const [editingItem, setEditingItem] = useState<(MenuItem & { category: Category; typeIndex: number; itemIndex: number }) | null>(null);
    const [newItem, setNewItem] = useState<MenuItem & { type: string; type2: string }>({ name: '', price: '', image: '', type: '', type2: '' });

    useEffect(() => {
        // ここでAPIからデータを取得するなどの初期化処理を行う
        // 仮のデータをセット
        setMenuItems({
        Drink: [
            {
            type: 'Special Tea',
            type2: 'ICE / HOT',
            items: [
                {name: 'ベリー抹茶ティー', price: '¥ 648', image:'/sample.png'},
                {name: 'カラメルほうじティー', price: '¥ 660', image:'/sample.png'},
                {name: 'オレンジアッサムティー', price: '¥ 648', image:'/sample.png'},
            ]
            },
            // ... other drink types
        ],
        Food: [
            // ... food types
        ],
        Gelato: [
            // ... gelato types
        ],
        });
        setTypes({
        Drink: [
            { type: 'Special Tea', type2: 'ICE / HOT' },
            { type: 'Standard Tea', type2: 'ICE / HOT' },
            // ... other drink types
        ],
        Food: [
            { type: 'Hot Sandwiches', type2: '' },
            { type: 'Others', type2: '' },
            // ... other food types
        ],
        Gelato: [
            { type: 'Gelato', type2: '' },
            // ... other gelato types
        ],
        });
    }, []);

    const handleAddType = (category: Category, newType: Type) => {
        setTypes(prevTypes => ({
        ...prevTypes,
        [category]: [...prevTypes[category], newType]
        }));
    };

    const handleEditType = (category: Category, index: number) => {
        // Edit type logic here
    };

    const handleDeleteType = (category: Category, index: number) => {
        setTypes(prevTypes => ({
        ...prevTypes,
        [category]: prevTypes[category].filter((_, i) => i !== index)
        }));
    };

    const handleAddItem = () => {
        if (newItem.name && newItem.price) {
        setMenuItems(prevItems => ({
            ...prevItems,
            [selectedCategory]: [
            ...prevItems[selectedCategory],
            {
                type: newItem.type,
                type2: newItem.type2,
                items: [{ name: newItem.name, price: newItem.price, image: newItem.image || '/sample.png' }]
            }
            ]
        }));
        setNewItem({ name: '', price: '', image: '', type: '', type2: '' });
        }
    };

    const handleEditItem = (category: Category, typeIndex: number, itemIndex: number) => {
        const item = menuItems[category][typeIndex].items[itemIndex];
        setEditingItem({ ...item, category, typeIndex, itemIndex });
    };

    const handleUpdateItem = () => {
        if (editingItem) {
        const { category, typeIndex, itemIndex, ...updatedItem } = editingItem;
        setMenuItems(prevItems => ({
            ...prevItems,
            [category]: prevItems[category].map((typeGroup, tIndex) => 
            tIndex === typeIndex
                ? {
                    ...typeGroup,
                    items: typeGroup.items.map((item, iIndex) => 
                    iIndex === itemIndex ? updatedItem : item
                    )
                }
                : typeGroup
            )
        }));
        setEditingItem(null);
        }
    };

    const handleDeleteItem = (category: Category, typeIndex: number, itemIndex: number) => {
        setMenuItems(prevItems => ({
        ...prevItems,
        [category]: prevItems[category].map((typeGroup, tIndex) => 
            tIndex === typeIndex
            ? {
                ...typeGroup,
                items: typeGroup.items.filter((_, iIndex) => iIndex !== itemIndex)
                }
            : typeGroup
        ).filter(group => group.items.length > 0)
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <InstructionPage />
        <h1 className="text-3xl font-bold mb-6">カフェメニュー管理</h1>

        {/* Menu Item Management */}
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Menu Item Management</h2>
            <div className="flex mb-4">
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`mr-2 px-4 py-2 rounded ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                {cat}
                </button>
            ))}
            </div>

            {/* Add New Item Form */}
            <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-semibold mb-2">Add New Item</h3>
            <div className="grid grid-cols-2 gap-2">
                <input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Item Name"
                className="p-2 border rounded"
                />
                <input
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                placeholder="Price"
                className="p-2 border rounded"
                />
                <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                className="p-2 border rounded"
                >
                <option value="">Select Type</option>
                {types[selectedCategory].map((type, index) => (
                    <option key={index} value={type.type}>{type.type}</option>
                ))}
                </select>
                <input
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                placeholder="Image URL"
                className="p-2 border rounded"
                />
            </div>
            <button
                onClick={handleAddItem}
                className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
                Add Item
            </button>
            </div>

            {/* Display Menu Items */}
            <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Current Menu Items</h3>
            {menuItems[selectedCategory].map((group, typeIndex) => (
                <div key={typeIndex} className="mb-4">
                <h4 className="font-semibold">{group.type} - {group.type2}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border rounded p-2">
                        {item.image && (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded mb-2"
                        />
                        )}
                        <h5>{item.name}</h5>
                        <h5>{item.price}</h5>
                        <div className="mt-2">
                        <button
                            onClick={() => handleEditItem(selectedCategory, typeIndex, itemIndex)}
                            className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <button
                            onClick={() => handleDeleteItem(selectedCategory, typeIndex, itemIndex)}
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            <TrashIcon />
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Edit Item Modal */}
        {editingItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Edit Item</h3>
                <input
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="mb-2 p-2 border rounded block w-full"
                />
                <input
                value={editingItem.price}
                onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                className="mb-2 p-2 border rounded block w-full"
                />
                <input
                value={editingItem.image}
                onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                className="mb-2 p-2 border rounded block w-full"
                placeholder="Image URL"
                />
                <div>
                <button
                    onClick={handleUpdateItem}
                    className="mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update
                </button>
                <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
                </div>
            </div>
            </div>
        )}

        {/* Type Management */}
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Type Management</h2>
            {categories.map(category => (
            <TypeManager
                key={category}
                category={category}
                types={types[category]}
                onAddType={handleAddType}
                onEditType={handleEditType}
                onDeleteType={handleDeleteType}
            />
            ))}
        </div>
        </div>
    );
};

export default CafeMenuManagement;