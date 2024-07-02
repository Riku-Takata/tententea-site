import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface AddTypeProps {
    onAdd: () => void;
}

const AddTypeComponent: React.FC<AddTypeProps> = ({ onAdd }) => {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [formData, setFormData] = useState({
        categoryId: '',
        type1: '',
        type2: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data, error } = await supabase.from('categories').select('id, name');
        if (error) console.error('Error fetching categories:', error);
        else setCategories(data || []);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.from('types').insert([
        { 
            category_id: formData.categoryId,
            type1: formData.type1,
            type2: formData.type2 || null,
        }
        ]);

        if (error) {
        console.error('Error adding type:', error);
        } else {
        console.log('Type added:', data);
        onAdd();
        setFormData({
            categoryId: '',
            type1: '',
            type2: '',
        });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Type
        </button>
        </form>
    );
};

export default AddTypeComponent;