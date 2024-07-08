import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";

interface EditMenuItemProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  onItemUpdated: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  category_id: string;
  type_id: string;
  price: number;
  image_url: string;
}

interface Category {
  id: string;
  name: string;
}

interface Type {
  id: string;
  category_id: string;
  type1: string;
  type2: string | null;
}

const EditMenuItemComponent: React.FC<EditMenuItemProps> = ({ isOpen, onClose, item, onItemUpdated }) => {
  const supabase = createClientComponentClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedParams, setSelectedParams] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: item.name,
    category_id: item.category_id,
    type_id: item.type_id,
    price: item.price.toString(),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchTypes(item.category_id);
    }
  }, [isOpen, item]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
      setError('カテゴリーの取得に失敗しました。');
    } else {
      setCategories(data || []);
    }
  };

  const fetchTypes = async (categoryId: string) => {
    const { data, error } = await supabase
      .from('types')
      .select('*')
      .eq('category_id', categoryId);
    if (error) {
      console.error('Error fetching types:', error);
      setError('タイプの取得に失敗しました。');
    } else {
      setTypes(data || []);
    }
  };

  const handleParamChange = (param: string) => {
    setSelectedParams(prev => 
      prev.includes(param) ? prev.filter(p => p !== param) : [...prev, param]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'category_id') {
      fetchTypes(value);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      let updatedData: Partial<MenuItem> = {};
      let newImageUrl = item.image_url;

      if (selectedParams.includes('name')) updatedData.name = formData.name;
      if (selectedParams.includes('category_id')) updatedData.category_id = formData.category_id;
      if (selectedParams.includes('type_id')) updatedData.type_id = formData.type_id;
      if (selectedParams.includes('price')) updatedData.price = parseInt(formData.price);

      if (selectedParams.includes('image_url') && imageFile) {
        // 古い画像の削除
        if (item.image_url) {
          const { error: deleteError } = await supabase.storage
            .from('menu-images')
            .remove([`images-folder/${item.image_url}`]);

          if (deleteError) {
            console.error('Error deleting old image:', deleteError);
          }
        }

        // 新しい画像のアップロード
        new Compressor(imageFile, {
          quality: 0.5,
          async success(result) {
            const fileExtension = imageFile.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            const { error: uploadError } = await supabase.storage
              .from('menu-images')
              .upload(`images-folder/${fileName}`, result);

            if (uploadError) {
              throw new Error('画像のアップロードに失敗しました：' + uploadError.message);
            }

            newImageUrl = fileName;
            updatedData.image_url = newImageUrl;

            // データベースの更新
            await updateMenuItem(updatedData);
          },
          error(err) {
            throw new Error('画像の圧縮に失敗しました：' + err.message);
          },
        });
      } else {
        // 画像以外のデータのみ更新
        await updateMenuItem(updatedData);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : '不明なエラーが発生しました。');
    }
  };

  const updateMenuItem = async (updatedData: Partial<MenuItem>) => {
    const { error: updateError } = await supabase
      .from('menu_items')
      .update(updatedData)
      .eq('id', item.id);

    if (updateError) {
      throw new Error('メニューアイテムの更新に失敗しました：' + updateError.message);
    }

    alert('メニューアイテムが正常に更新されました。');
    onItemUpdated();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">メニューアイテムを編集</h2>
        <div className="mb-4">
          <p className="font-bold mb-2">編集するパラメータを選択:</p>
          {['name', 'category_id', 'type_id', 'price', 'image_url'].map(param => (
            <label key={param} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedParams.includes(param)}
                onChange={() => handleParamChange(param)}
                className="mr-2"
              />
              {param}
            </label>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedParams.includes('name') && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="メニュー名"
              className="w-full p-2 border rounded"
            />
          )}
          {selectedParams.includes('category_id') && (
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          )}
          {selectedParams.includes('type_id') && (
            <select
              name="type_id"
              value={formData.type_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>{type.type1}</option>
              ))}
            </select>
          )}
          {selectedParams.includes('price') && (
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="価格"
              className="w-full p-2 border rounded"
            />
          )}
          {selectedParams.includes('image_url') && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          )}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded" />
          )}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuItemComponent;