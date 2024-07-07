"use client"

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  type1: string;
  type2: string | null;
  price: number;
  image_url: string;
}

const CafeMenuUI: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
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
      const uniqueCategories = Array.from(new Set(formattedData.map(item => item.category)));
      setCategories(['All', ...uniqueCategories]);
    }
    setLoading(false);
  };

  const filteredMenuItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">メニュー管理</h1>
      <div className="mb-4 flex justify-between items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ メニュー追加</button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">NAME</th>
            <th className="border p-2">CATEGORY</th>
            <th className="border p-2">TYPE 1</th>
            <th className="border p-2">TYPE 2</th>
            <th className="border p-2">PRICE</th>
            <th className="border p-2">IMAGE</th>
            <th className="border p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredMenuItems.map(item => (
            <tr key={item.id} className="border">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.type1}</td>
              <td className="border p-2">{item.type2 || '-'}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2">
                <img src={item.image_url} alt={item.name} width={50} height={50} />
              </td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2">✏️</button>
                <button className="text-red-500">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CafeMenuUI;