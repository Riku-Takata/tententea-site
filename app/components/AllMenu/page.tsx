"use client"

import Link from "next/link";
import ComHeader from "../layout/ComHeader/page";
import { useEffect, useState } from "react";
import Footer from "../layout/Footer/page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

interface MenuItemGroup {
  type: string;
  type2: string;
  items: MenuItem[];
}

interface MenuItems {
  [key: string]: MenuItemGroup[];
}

export default function AllMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Drink');
  const [menuItems, setMenuItems] = useState<MenuItems>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const public_url = "https://isffsgzshcbuvdkggfwf.supabase.co/storage/v1/object/public/menu-images/images-folder/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchMenuItems(), fetchCategories()]);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
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

      const groupedMenuItems: MenuItems = {};
      formattedData.forEach(item => {
        if (!groupedMenuItems[item.category]) {
          groupedMenuItems[item.category] = [];
        }
        
        let group = groupedMenuItems[item.category].find(g => g.type === item.type1 && g.type2 === item.type2);
        if (!group) {
          group = { type: item.type1, type2: item.type2 || '', items: [] };
          groupedMenuItems[item.category].push(group);
        }
        
        group.items.push(item);
      });

      setMenuItems(groupedMenuItems);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category && categories.map(c => c.name).includes(category)) {
      setSelectedCategory(category);
    }
  }, [categories]);

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
    <main className="flex-1">
      <ComHeader />
      <div className="w-full py-8 md:py-8 lg:py-14">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="pb-4 text-3xl font-bold tracking-tighter sm:text-5xl">
                Menu
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                フードは店内またはテラス席でお楽しみいただけます。<br />
                ドリンクは店内またはお持ち帰りでお楽しみいただけます。
              </p>
            </div>
          </div>
          <div className="container mx-auto py-8">
            {/* カテゴリタブ */}
            <div className="flex justify-center space-x-14 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`py-2 px-10 rounded ${selectedCategory === cat.name ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {/* メニューアイテム */}
            <div className="space-y-8">
              {menuItems[selectedCategory]?.map((group, index) => (
                <div key={index}>
                  <h2 className="p-2 text-xl font-bold mb-4">{group.type}</h2>
                  <h5 className="p-5 mb-4 text-gray-800">{group.type2}</h5>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 m-3">
                        {item.image_url && (
                          <img
                            src={`${public_url}${item.image_url}`}
                            alt="Menu Image"
                            width={300}
                            height={200}
                            className="rounded-lg mb-4 object-cover"
                          />
                        )}
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <h5 className="font-bold text-lg mt-4">¥ {item.price.toLocaleString()}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 text-right mx-auto max-w-5xl pt-5 lg:gap-12 hover:text-blue-600">
            <Link href="/">
              <p>トップページへ戻る →</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}