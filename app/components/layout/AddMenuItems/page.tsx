import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";

interface AddMenuItemProps {
  isOpen: boolean;
  onClose: () => void;
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

const AddMenuItemComponent: React.FC<AddMenuItemProps> = ({ isOpen, onClose }) => {
  const public_url =
    "https://{isffsgzshcbuvdkggfwf}.supabase.co/storage/v1/object/public/menu-images/images-folder/";
  const supabase = createClientComponentClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType1, setSelectedType1] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedCategory) {
      fetchTypes(selectedCategory);
    }
  }, [selectedCategory]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
  
    if (!selectedCategory || !selectedType1 || !imageFile) {
      setError('すべての必須フィールドを入力してください。');
      return;
    }
  
    try {
      if (imageFile.type.match('image.*')) {
        new Compressor(imageFile as File, {
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
  
            const imageUrl = `${public_url}${fileName}`;
  
            // menu_items テーブルへのデータ挿入
            const selectedType = types.find(t => t.type1 === selectedType1);
            const { data, error: insertError } = await supabase
              .from('menu_items')
              .insert({
                name: formData.name,
                price: parseInt(formData.price),
                image_url: imageUrl,
                category_id: selectedCategory,
                type_id: selectedType?.id,
              });
  
            if (insertError) {
              throw new Error('メニューアイテムの追加に失敗しました：' + insertError.message);
            }
  
            alert('メニューアイテムが正常に追加されました。');
            resetForm();
            onClose();
          },
          error(err) {
            throw new Error('画像の圧縮に失敗しました：' + err.message);
          },
        });
      } else {
        throw new Error('画像ファイル以外はアップロード出来ません。');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : '不明なエラーが発生しました。');
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setSelectedType1(null);
    setFormData({
      name: '',
      price: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">新しいメニュー項目を追加</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="メニュー名"
            required
            className="w-full p-2 border rounded"
          />

          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            <select
              value={selectedType1 || ''}
              onChange={(e) => setSelectedType1(e.target.value)}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">タイプ1を選択</option>
              {Array.from(new Set(types.map(t => t.type1))).map((type1) => (
                <option key={type1} value={type1}>
                  {type1}
                </option>
              ))}
            </select>
          )}

          {selectedType1 && (
            <div className="text-sm text-gray-600">
              タイプ2: {types.find(t => t.type1 === selectedType1)?.type2 || 'なし'}
            </div>
          )}

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="価格"
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-2 border rounded"
          />

          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded" />
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
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!selectedCategory || !selectedType1 || !imageFile}
            >
              追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItemComponent;