import React, { useState, useMemo } from 'react';
import { ChevronDown, Edit2, Trash2, Check, X, Plus } from 'lucide-react';

const CafeMenuUI = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const [editingItem, setEditingItem] = useState(null);

    const categories = ['All', 'Drink', 'Food', 'Gelato'];
    const types = {
        Drink: {
        type1: ['Special', 'Regular', 'Seasonal'],
        type2: ['Hot', 'Iced', 'Hot/Iced'],
        },
        Food: {
        type1: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        type2: ['Vegetarian', 'Vegan', 'Gluten-free', '-'],
        },
        Gelato: {
        type1: ['Classic', 'Seasonal', 'Special'],
        type2: ['Cup', 'Cone', '-'],
        },
    };

    const [allMenuItems, setAllMenuItems] = useState([
        { id: 1, name: 'Espresso', category: 'Drink', type1: 'Special', type2: 'Hot', price: '300', image: '/api/placeholder/80/80' },
        { id: 2, name: 'Cappuccino', category: 'Drink', type1: 'Regular', type2: 'Hot/Iced', price: '400', image: '/api/placeholder/80/80' },
        { id: 3, name: 'Sandwich', category: 'Food', type1: 'Lunch', type2: 'Vegetarian', price: '500', image: '/api/placeholder/80/80' },
        { id: 4, name: 'Chocolate Gelato', category: 'Gelato', type1: 'Classic', type2: 'Cup', price: '350', image: '/api/placeholder/80/80' },
        { id: 5, name: 'Green Tea', category: 'Drink', type1: 'Regular', type2: 'Hot/Iced', price: '350', image: '/api/placeholder/80/80' },
        { id: 6, name: 'Caesar Salad', category: 'Food', type1: 'Lunch', type2: '-', price: '600', image: '/api/placeholder/80/80' },
    ]);

    const filteredMenuItems = useMemo(() => {
        return selectedCategory === 'All'
        ? allMenuItems
        : allMenuItems.filter(item => item.category === selectedCategory);
    }, [selectedCategory, allMenuItems]);

    const handleEdit = (id) => {
        const itemToEdit = allMenuItems.find(item => item.id === id);
        setEditingId(id);
        setEditingItem({ ...itemToEdit });
    };

    const handleSave = () => {
        setAllMenuItems(allMenuItems.map(item => 
        item.id === editingId ? editingItem : item
        ));
        setEditingId(null);
        setEditingItem(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingItem(null);
    };

    const handleChange = (field, value) => {
        setEditingItem(prev => {
        const updated = { ...prev, [field]: value };
        if (field === 'category') {
            updated.type1 = types[value].type1[0];
            updated.type2 = types[value].type2[0];
        }
        return updated;
        });
    };

    const EditableCell = ({ item, field, type }) => {
        if (editingId !== item.id) {
        return <td className="py-4 px-6">{item[field]}</td>;
        }

        const editingValue = editingItem[field];

        switch (type) {
        case 'text':
            return (
            <td className="py-4 px-6">
                <input
                type="text"
                value={editingValue}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </td>
            );
        case 'select':
            let options;
            if (field === 'category') {
            options = categories.filter(c => c !== 'All');
            } else if (field === 'type1' || field === 'type2') {
            options = types[editingItem.category][field];
            }
            return (
            <td className="py-4 px-6">
                <select
                value={editingValue}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
                </select>
            </td>
            );
        case 'file':
            return (
            <td className="py-4 px-6">
                <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        handleChange(field, reader.result);
                    };
                    reader.readAsDataURL(file);
                    }
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </td>
            );
        default:
            return <td className="py-4 px-6">{editingValue}</td>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">メニュー管理</h1>
            
            <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                <select
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={20} />
                </div>
                </div>
                <div className="flex space-x-2">
                <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus size={18} className="mr-2" />
                    メニュー追加
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Plus size={18} className="mr-2" />
                    タイプ追加
                </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                    <th scope="col" className="py-3 px-6">Name</th>
                    <th scope="col" className="py-3 px-6">Category</th>
                    <th scope="col" className="py-3 px-6">Type 1</th>
                    <th scope="col" className="py-3 px-6">Type 2</th>
                    <th scope="col" className="py-3 px-6">Price</th>
                    <th scope="col" className="py-3 px-6">Image</th>
                    <th scope="col" className="py-3 px-6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMenuItems.map((item) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                        <EditableCell item={item} field="name" type="text" />
                        <EditableCell item={item} field="category" type="select" />
                        <EditableCell item={item} field="type1" type="select" />
                        <EditableCell item={item} field="type2" type="select" />
                        <EditableCell item={item} field="price" type="text" />
                        <td className="py-4 px-6">
                        {editingId === item.id ? (
                            <EditableCell item={item} field="image" type="file" />
                        ) : (
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        )}
                        </td>
                        <td className="py-4 px-6">
                        {editingId === item.id ? (
                            <div className="flex space-x-2">
                            <button onClick={handleSave} className="text-green-600 hover:text-green-900" title="Save changes">
                                <Check size={20} />
                            </button>
                            <button onClick={handleCancel} className="text-red-600 hover:text-red-900" title="Discard changes">
                                <X size={20} />
                            </button>
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                            <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-900" title="Edit item">
                                <Edit2 size={20} />
                            </button>
                            <button className="text-red-600 hover:text-red-900" title="Delete item">
                                <Trash2 size={20} />
                            </button>
                            </div>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CafeMenuUI;