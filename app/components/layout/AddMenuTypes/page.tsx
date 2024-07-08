import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface AddTypeProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
}

const AddTypeComponent: React.FC<AddTypeProps> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory === null) return;

    const { error } = await supabase
      .from('types')
      .insert([{ 
        category_id: selectedCategory, 
        type1, 
        type2: type2 || null 
      }]);
    if (error) {
      console.error('Error adding type:', error);
    } else {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setType1('');
    setType2('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">新しいタイプを追加</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedCategory || ''}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setType1('');
              setType2('');
            }}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">カテゴリーを選択</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <>
              <input
                type="text"
                value={type1}
                onChange={(e) => setType1(e.target.value)}
                placeholder="タイプ1"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={type2}
                onChange={(e) => setType2(e.target.value)}
                placeholder="タイプ2 (オプション)"
                className="w-full p-2 border rounded"
              />
            </>
          )}
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => { resetForm(); onClose(); }}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-500 rounded"
              disabled={!selectedCategory || !type1}
            >
              追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTypeComponent;