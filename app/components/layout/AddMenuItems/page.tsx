import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface AddMenuItemProps {
    onAdd: () => void;
}

const AddMenuItemComponent: React.FC<AddMenuItemProps> = ({ onAdd }) => {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [types, setTypes] = useState<{ id: string; type1: string; type2: string | null }[]>([]);
    const [formData, setFormData] = useState({
        categoryName: '',
        type1: '',
        type2: '',
        name: '',
        price: '',
        imageUrl: '',
    });

    useEffect(() => {
        fetchCategories();
        fetchTypes();
    }, []);

    const fetchCategories = async () => {
        const { data, error } = await supabase.from('categories').select('id, name');
        if (error) console.error('Error fetching categories:', error);
        else setCategories(data || []);
    };

    const fetchTypes = async () => {
        const { data, error } = await supabase.from('types').select('id, type1, type2');
        if (error) console.error('Error fetching types:', error);
        else setTypes(data || []);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.rpc('add_menu_item', {
        p_category_name: formData.categoryName,
        p_type1: formData.type1,
        p_type2: formData.type2 || null,
        p_name: formData.name,
        p_price: parseInt(formData.price),
        p_image_url: formData.imageUrl,
        });

        if (error) {
        console.error('Error adding menu item:', error);
        } else {
        console.log('Menu item added:', data);
        onAdd();
        setFormData({
            categoryName: '',
            type1: '',
            type2: '',
            name: '',
            price: '',
            imageUrl: '',
        });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <select name="categoryName" value={formData.categoryName} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
        </select>
        <input 
            type="text" 
            name="type1" 
            value={formData.type1} 
            onChange={handleInputChange} 
            placeholder="Type 1" 
            required 
        />
        <input 
            type="text" 
            name="type2" 
            value={formData.type2} 
            onChange={handleInputChange} 
            placeholder="Type 2 (optional)" 
        />
        <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Menu Item Name" 
            required 
        />
        <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleInputChange} 
            placeholder="Price" 
            required 
        />
        <input 
            type="text" 
            name="imageUrl" 
            value={formData.imageUrl} 
            onChange={handleInputChange} 
            placeholder="Image URL" 
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Menu Item
        </button>
        </form>
    );
};

export default AddMenuItemComponent;