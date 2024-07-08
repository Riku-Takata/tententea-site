"use client"

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChevronDown, Pencil, Plus, Trash2 } from 'lucide-react';
import AddMenuItemComponent from '../AddMenuItems/page';
import AddTypeComponent from '../AddMenuTypes/page';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  type1: string;
  type2: string | null;
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
        type1: item.types.type1,
        type2: item.types.type2,
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

  const filteredMenuItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
        <div className="grid grid-cols-1 gap-4">
            {filteredMenuItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 flex space-x-4">
                    <div className="w-40 h-30 flex-shrink-0">
                    <img
                        src={`${public_url}${item.image_url}`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                    />
                    </div>
                    <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-600 p-1">
                            <Pencil size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-600 p-1">
                            <Trash2 size={18} />
                        </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><span className="font-medium">Type 1:</span> {item.type1}</p>
                        <p><span className="font-medium">Type 2:</span> {item.type2 || '-'}</p>
                        <p className="col-span-2"><span className="font-medium">Price:</span> ¥{item.price}</p>
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
    </div>
  );
};

export default CafeMenuUI;