import React from 'react';
import { supabase } from '@/lib/supabaseClient';

interface DeleteMenuItemProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  onItemDeleted: () => void;
}

const DeleteMenuItemComponent: React.FC<DeleteMenuItemProps> = ({ isOpen, onClose, itemId, onItemDeleted }) => {
  const handleDelete = async () => {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error deleting menu item:', error);
    } else {
      onItemDeleted();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">メニューアイテムを削除</h2>
        <p className="mb-4">このアイテムを削除してもよろしいですか？この操作は元に戻せません。</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            キャンセル
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenuItemComponent;