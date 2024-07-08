"use client"

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChevronDown, Pencil, Plus, Trash2 } from 'lucide-react';
import AddMenuItemComponent from '../AddMenuItems/page';
import AddTypeComponent from '../AddMenuTypes/page';
import EditMenuItemComponent from '../EditMenuItems/page';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  category_id: string;
  type1: string;
  type2: string | null;
  type_id: string;
  price: number;
  image_url: string;
}

interface Category {
  id: string;
  name: string;
}

const CafeMenuUI: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isAddTypeOpen, setIsAddTypeOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  const supabase = createClientComponentClient();
  const public_url =
    "https://isffsgzshcbuvdkggfwf.supabase.co/storage/v1/object/public/menu-images/images-folder/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchMenuItems(), fetchCategories()]);
    setLoading(false);
  };

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        categories(name),
        types:type_id(type1, type2)
      `);

    if (error) {
      console.error('Error fetching menu items:', error);
    } else if (data) {
      const formattedData: MenuItem[] = data.map(item => ({
        id: item.id,
        name: item.name,
        category: item.categories.name,
        category_id: item.category_id,
        type1: item.types.type1,
        type2: item.types.type2,
        type_id: item.type_id,
        price: item.price,
        image_url: item.image_url
      }));
      setMenuItems(formattedData);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsEditMenuOpen(true);
  };

  const handleDeleteClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsDeleteMenuOpen(true);
  };

  const handleItemUpdated = () => {
    fetchMenuItems();
    setIsEditMenuOpen(false);
  };

  const handleItemDeleted = () => {
    fetchMenuItems();
    setIsDeleteMenuOpen(false);
  };

  const filteredMenuItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
        <div className="fixed inset-0 bg-gradient-to-r from-amber-50 to-yellow-100 flex flex-col items-center justify-center">
            <div className="text-4xl font-serif text-amber-800 mb-8">Ten Ten Tea</div>
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-amber-300 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-amber-500 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border-4 border-amber-700 rounded-full animate-spin-slower"></div>
            </div>
            <div className="mt-8 text-lg text-amber-800">Loading our delightful menu...</div>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">メニュー管理</h1>
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-auto">
            <select 
              className="w-full sm:w-auto appearance-none border border-blue-500 rounded px-4 py-2 pr-8 focus:outline-none focus:border-blue-700 text-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button onClick={() => setIsAddMenuOpen(true)} className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center transition duration-200">
              <Plus size={20} className="mr-1" /> メニュー追加
            </button>
            <button onClick={() => setIsAddTypeOpen(true)} className="flex-1 sm:flex-none bg-blue-100 hover:bg-blue-200 text-blue-500 px-4 py-2 rounded flex items-center justify-center transition duration-200">
              <Plus size={20} className="mr-1" /> タイプ追加
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
            {filteredMenuItems.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex space-x-6">
                    <div className="w-45 h-32 flex-shrink-0">
                    <img
                        src={`${public_url}${item.image_url}`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    </div>
                    <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex space-x-2">
                            <button 
                                onClick={() => handleEditClick(item)}
                                className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
                            >
                                <Pencil size={18} />
                            </button>
                            <button 
                                onClick={() => handleDeleteClick(item)}
                                className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <h5><span className="font-medium text-gray-700">Type 1:</span> {item.type1}</h5>
                        <h5><span className="font-medium text-gray-700">Type 2:</span> {item.type2 || '-'}</h5>
                        <h5 className="col-span-2"><span className="font-medium text-gray-700">Price:</span> ¥{item.price.toLocaleString()}</h5>
                    </div>
                    </div>
                </div>
                </div>
            ))}
        </div>
      </div>

      {isAddMenuOpen && (
        <AddMenuItemComponent
          isOpen={isAddMenuOpen}
          onClose={() => setIsAddMenuOpen(false)}
        />
      )}

      {isAddTypeOpen && (
        <AddTypeComponent
          isOpen={isAddTypeOpen}
          onClose={() => setIsAddTypeOpen(false)}
        />
      )}

    {isEditMenuOpen && selectedMenuItem && (
        <EditMenuItemComponent
          isOpen={isEditMenuOpen}
          onClose={() => setIsEditMenuOpen(false)}
          item={selectedMenuItem}
          onItemUpdated={handleItemUpdated}
        />
      )}

      {/* {isDeleteMenuOpen && selectedMenuItem && (
        <DeleteMenuItemComponent
          isOpen={isDeleteMenuOpen}
          onClose={() => setIsDeleteMenuOpen(false)}
          itemId={selectedMenuItem.id}
          onItemDeleted={handleItemDeleted}
        />
      )} */}
    </div>
  );
};

export default CafeMenuUI;