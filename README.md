<img width="1710" alt="スクリーンショット 2025-02-10 15 01 00" src="https://github.com/user-attachments/assets/fbbdb034-6a53-47fa-9fd8-73b9c848af34" />

# Overview

[制作物]：TenTenTea-Site（メニュー管理Webアプリケーション）

[背景・目的]：アルバイト先の個人経営のカフェ「点点茶」が2024年春にリニューアルオープンし、フードのメニュー追加とお客様へのご案内方法が変わったことをお客さんにわかりやすく伝えるために、 「カフェのWebサイトの作成」と「メニュー追加、編集、削除を行えるようなWebアプリ」を兼ねたサービスの開発を行いました。

[製作期間]：2週間

[チーム人数]：個人開発

[使用技術]：React、TeilwindCSS、JavaScript、TypeScript、Supabase(データベース、認証機能)、GitHub、Vercel

<img width="1907" alt="2" src="https://github.com/user-attachments/assets/c993ded1-c41e-49e6-9b6a-153c0e0ab154" />

# What I did

### トップページの作成

トップページはどの年齢層の方でも分かりやすいようなデザインにこだわって作成した。また、画面の大きさによって、ヘッダー部分のナビゲーションメニューがハンバーガーメニューになるようなレスポンシブデザインの実装も行なった。以下に実装でこだわった点についてまとめる。

- **クロスコンポーネントスクロール実装**
    
    ナビゲーションメニューは画面遷移が多くなるとユーザーが閲覧しづらくなることも考え、ナビゲーションメニューから画面遷移することなくトップページの特定のコンポーネントにスクロールされ、トップページのみで完結するようなUIを実装した。主に以下の3つのコンポーネントで構成されている：
    
    1. 親コンポーネント（app/page.tsx）
    2. ヘッダーコンポーネント（Header）
    3. セクションコンポーネント（Concept, Menu, Operation）
    - データフローについて
        1. セクションコンポーネントが自身のDOM参照を作成し、親コンポーネントに渡す。
            - 詳細実装（例：Concept）
                
                ```tsx
                import React, { useRef, useEffect } from 'react';
                
                interface ConceptProps {
                  setRef: (ref: HTMLElement | null) => void;
                }
                
                const Concept: React.FC<ConceptProps> = ({ setRef }) => {
                  const conceptRef = useRef<HTMLElement>(null);
                
                  useEffect(() => {
                    setRef(conceptRef.current);
                  }, [setRef]);
                
                  return (
                    <section ref={conceptRef}>
                      {/* セクションの内容 */}
                    </section>
                  );
                };
                
                export default Concept;
                ```
                
                - `useRef` を使用して、セクションのDOM要素への参照を作成する。
                - `useEffect` を使用して、コンポーネントのマウント時に親コンポーネントに参照を渡す。
        2. 親コンポーネントがこれらの参照を状態として保持する。
            - 詳細実装
                
                ```tsx
                type SectionName = 'concept' | 'menu' | 'operation';
                
                export default function Home() {
                  const [sectionRefs, setSectionRefs] = useState<Record<SectionName, HTMLElement | null>>({
                    concept: null,
                    menu: null,
                    operation: null
                  });
                
                  const setRef = (sectionName: SectionName) => (ref: HTMLElement | null) => {
                    setSectionRefs(prev => ({ ...prev, [sectionName]: ref }));
                  };
                
                  return (
                    <>
                      <main className="flex-1 animate-fadeIn">
                          <Concept setRef={(node) => setSectionRefs(prev => ({ ...prev, concept: node }))}/>
                          <Menu setRef={(node) => setSectionRefs(prev => ({ ...prev, menu: node }))}/>
                          <Operation setRef={(node) => setSectionRefs(prev => ({ ...prev, operation: node }))}/>
                      </main>
                    </>
                  );
                };
                ```
                
                - `useState` を使用して `sectionRefs` オブジェクトを管理し、各セクションのDOM参照を保持する。
                - `setRef` 関数を各セクションコンポーネントに渡し、DOM参照を取得する。
        3. ユーザーがヘッダーコンポーネント内のナビゲーション要素をクリックします。
        4. ヘッダーコンポーネントが親コンポーネントにスクロールアクションを通知します。
            - 詳細実装
                
                ```tsx
                type SectionName = 'concept' | 'menu' | 'operation';
                
                interface HeaderProps {
                  onScrollToSection: (sectionName: SectionName) => void;
                }
                
                const Header: React.FC<HeaderProps> = ({ onScrollToSection }) => {
                  return (
                    <nav>
                      <ul>
                	      <li>
                	        <button onClick={() => onScrollToSection('concept')}>Concept</button>
                	      </li>
                	      <li>
                	        <button onClick={() => onScrollToSection('menu')}>Menu</button>
                        </li>
                        <li>
                	        <button onClick={() => onScrollToSection('operation')}>Operation</button>
                	      </li>
                      </ul>
                    </nav>
                  );
                };
                
                export default Header;
                ```
                
                - `onScrollToSection` プロップを受け取り、各ナビゲーションボタンのクリックイベントで呼び出す。
                - 型安全性を確保するため、`SectionName` 型を使用する。
        5. 親コンポーネントが適切なセクションの参照を使用してスクロールを実行します。
            - 詳細実装
                
                ```tsx
                type SectionName = 'concept' | 'menu' | 'operation';
                
                export default function Home() {
                  const [sectionRefs, setSectionRefs] = useState<Record<SectionName, HTMLElement | null>>({
                    concept: null,
                    menu: null,
                    operation: null
                  });
                
                  const handleScrollToSection = (sectionName: SectionName) => {
                    if (sectionRefs[sectionName]) {
                      sectionRefs[sectionName]?.scrollIntoView({ behavior: 'smooth' });
                    }
                  };
                
                  return (
                    <>
                      <main className="flex-1 animate-fadeIn">
                          <Header onScrollToSection={handleScrollToSection}/>
                      </main>
                    </>
                  );
                };
                ```
                
                - `handleScrollToSection` 関数で、指定されたセクションへのスムーズなスクロールを実行する。
- **カテゴリー別のメニュー表示**
    
    トップページに表示されるメインのメニューセクションからのユーザーアクションによって選択されたカテゴリーの詳細なメニュー項目を表示する。主に以下の3つのコンポーネントで構成されている：
    
    1. 親コンポーネント（メインのメニューコンポーネント）
    2. 子コンポーネント（メニュー詳細表示コンポーネント）
    - データフローについて
        
        `useState`と`useEffect`を使用することで、関数コンポーネント内で状態管理を行う。
        
        ```tsx
        const [selectedCategory, setSelectedCategory] = useState<string>('Drink');
        const [menuItems, setMenuItems] = useState<MenuItems>({});
        const [categories, setCategories] = useState<Category[]>([]);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
          fetchData();
        }, []);
        
        useEffect(() => {
          const params = new URLSearchParams(window.location.search);
          const category = params.get('category');
          if (category && categories.map(c => c.name).includes(category)) {
            setSelectedCategory(category);
          }
        }, [categories]);
        
        const fetchData = async () => {
          setLoading(true);
          await Promise.all([fetchMenuItems(), fetchCategories()]);
          setLoading(false);
        };
        ```
        
        - **状態管理（useState）**:
            - `selectedCategory`: 現在選択されているカテゴリーを追跡する。
            - `menuItems`: 取得したメニュー項目のデータを保持する。
            - `categories`: 利用可能なカテゴリーのリストを保持する。
            - `loading`: データ取得中のローディング状態を管理する。
        - **副作用の制御（useEffect）**:
            - 初回レンダリング時のデータ取得: 
            コンポーネントがマウントされた時に`fetchData`関数を呼び出し、必要なデータを取得する。
            - URLパラメータに基づくカテゴリー選択: 
            URLのクエリパラメータを監視し、適切なカテゴリーを選択する。これにより、直接リンクからの訪問時でも正しいカテゴリーが表示される。
        - **非同期処理の管理**:
            - `fetchData`関数内で`Promise.all`を使用し、複数のデータ取得処理を並行して行う。これにより、全てのデータが取得されるまでローディング状態を維持する。
        - **状態更新の最適化**:
            - データ取得の開始時と完了時に`loading`状態を更新することで、ユーザーに適切なフィードバックを提供する。
    
    その他の主な実装として、Supabaseを使用したデータ取得とデータ処理が挙げられる。
    
    - データフローについて
        
        ```tsx
        import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
        
        const supabase = createClientComponentClient();
        
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
            return;
          }
        
          if (data) {
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
        ```
        
        - **Supabaseクライアントの初期化**:
         `createClientComponentClient`を使用して、Supabaseクライアントを初期化する。
        - **データ取得**:
         `supabase.from('menu_items').select()`を使用して、メニュー項目のデータを取得する。関連テーブル（categories, types）からのデータも同時に取得する。
        - **エラーハンドリング**: 
        データ取得時のエラーを適切に処理し、コンソールにログを出力する。
        - **データ整形**: 
        取得したデータを、アプリケーションで使いやすい形式に整形する。これには、必要なプロパティの抽出や、関連データの統合が含まれる。
        - **データのグループ化**: 
        整形されたデータを、カテゴリーやタイプに基づいてグループ化する。これにより、UIでの表示が容易にする。
        - **状態更新**: 
        処理されたデータを`setMenuItems`関数を使用してコンポーネントの状態に保存する。

### 管理者ページの作成

Supabaseとの連携によって、(i) 管理者のEmail認証、(ii) メニューのデータ管理を行うページとして作成した。メニューのカテゴリーやタイプを別々のテーブルで管理し、それらを紐付けたメニューのアイテムをさらに別のテーブルで管理するということを想定していたため、複雑なテーブルの操作を行えることと認証機能操作を併せ持つSupabaseを利用することとした。

- **(i) 管理者のEmail認証**
    
    主な機能は、ユーザー登録、ログイン機能、ログアウト機能、パスワードリセット機能を提供することである。システムは以下の主要技術を活用している：
    
    - **Supabase Auth**: セキュアな認証基盤として使用
    - **React Hook Form**: 効率的なフォーム状態管理のために採用
    - **Zod**: 厳密な型チェックとバリデーションを実現
    - 主要コンポーネント
        
        ### 1. LoginForm Component
        
        このコンポーネントはユーザーログイン機能を担当する。
        
        ```tsx
        const LoginForm = () => {
            const router = useRouter();
            const supabase = createClientComponentClient<Database>();
            const [loading, setLoading] = useState(false);
            const [message, setMessage] = useState('');
        
            const { register, handleSubmit, formState: { errors } } = useForm({
                resolver: zodResolver(LoginFormSchema),
            });
        
            const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
                setLoading(true);
                try {
                    const { error } = await supabase.auth.signInWithPassword({
                        email: data.email,
                        password: data.password,
                    });
                    if (error) throw error;
                    router.push('/components/Management');
                } catch (error) {
                    setMessage('ログインエラー: ' + error.message);
                } finally {
                    setLoading(false);
                }
            };
        
            return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* フォームフィールドとエラー表示 */}
                </form>
            );
        };
        
        ```
        
        **主な特徴:**
        
        - React Hook Formを使用したフォーム管理
        - Zodによる入力バリデーション
        - Supabase Authを使用したログイン処理
        - エラーハンドリングとユーザーフィードバック
        
        ### 2. SignupForm Component
        
        このコンポーネントは新規ユーザー登録機能を担当する。
        
        ```jsx
        const SignupForm = () => {
            const router = useRouter();
            const supabase = createClientComponentClient<Database>();
            const [loading, setLoading] = useState(false);
            const [message, setMessage] = useState('');
        
            const { register, handleSubmit, formState: { errors } } = useForm({
                resolver: zodResolver(SignUpFormSchema),
            });
        
            const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
                setLoading(true);
                try {
                    const { error } = await supabase.auth.signUp({
                        email: data.email,
                        password: data.password,
                        options: {
                            data: { name: data.name },
                            emailRedirectTo: `${location.origin}/auth/Callback`,
                        },
                    });
                    if (error) throw error;
                    setMessage('登録確認メールを送信しました。');
                } catch (error) {
                    setMessage('登録エラー: ' + error.message);
                } finally {
                    setLoading(false);
                }
            };
        
            return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* フォームフィールドとエラー表示 */}
                </form>
            );
        };
        
        ```
        
        **主な特徴:**
        
        - React Hook Formを使用したフォーム管理
        - Zodによる厳密な入力バリデーション
        - Supabase Authを使用したユーザー登録処理
        - 登録成功時の確認メール送信
        
        ### 3. バリデーションスキーマ (actions.ts)
        
        このモジュールは、Zodを使用して定義されたバリデーションスキーマを提供する。
        
        ```tsx
        import { z } from 'zod'
        
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])$/;
        
        export const SignUpFormSchema = z
          .object({
            name: z
             .string({
                required_error: "必須項目です。",
              })
              .min(1, { message: '名前を入力してください。' })
              .max(50, { message: '50字以内で入力してください' }),
            email: z
              .string({
                required_error: "必須項目です。",
              })
              .email({ message: 'メールアドレスの形式で入力して下さい。' })
              .min(1, { message: 'メールアドレスを入力してください。' })
              .max(50, { message: '50字以内で入力してください' }),
            password: z
              .string({
                required_error: "必須項目です。",
              })
              .min(8, { message: '8文字以上で入力してください。' })
              .max(50, { message: '50文字以内で入力して下さい。' }),
            confirmPassword: z
              .string({
                required_error: "必須項目です。",
              })
              .min(1, { message: 'パスワードを再入力して下さい。' })
              .max(50, { message: '50文字以内で入力して下さい。' })
          })
          .superRefine((data, ctx) => {
            if (regex.test(data.password)) {
                ctx.addIssue({
                  message: '半角英数字かつ少なくとも1つの大文字を含めてください。',
                  path: ['password'],
                  code: z.ZodIssueCode.custom
                })
            }
            if (data.password !== data.confirmPassword) {
              ctx.addIssue({
                message: 'パスワードが異なります。',
                path: ['confirmPassword'],
                code: z.ZodIssueCode.custom
              })
            }
          })
        
        export const LoginFormSchema = z
          .object({
            email: z
              .string({
                required_error: "必須項目です。",
              })
              .email({ message: 'メールアドレスの形式で入力して下さい。' })
              .min(1, { message: 'メールアドレスを入力してください。' })
              .max(50, { message: '50字以内で入力してください' }),
            password: z
              .string({
                required_error: "必須項目です。",
              })
              .min(8, { message: '8文字以上で入力してください。' })
              .max(50, { message: '50文字以内で入力して下さい。' }),
          })
        
        export type SignUpFormType = z.infer<typeof SignUpFormSchema>
        export type LoginFormType = z.infer<typeof LoginFormSchema>
        
        ```
        
        **主な特徴：**
        
        1. **正規表現によるパスワード検証**:
            - `regex`変数を使用して、パスワードが英数字を含むことを確認します。
        2. **詳細なエラーメッセージ**:
            - 各フィールドに対して、具体的で分かりやすいエラーメッセージを定義しています。
        3. **カスタムバリデーション**:
            - `superRefine`メソッドを使用して、パスワードの複雑性とパスワード確認のカスタムバリデーションを実装しています。
        4. **柔軟なエラーハンドリング**:
            - Zodの`addIssue`メソッドを使用して、カスタムエラーメッセージを特定のフィールドに関連付けています。
        5. **型安全性**:
            - `z.infer`を使用して、スキーマから直接TypeScriptの型を生成しています。
    - データフロー
        1. **ユーザー入力**:
            - ユーザーがログインまたはサインアップフォームに情報を入力する。
        2. **フロントエンドバリデーション**:
            - React Hook FormとZodを使用して、入力データをクライアントサイドでバリデーションする。
            - バリデーションエラーがある場合、ユーザーに即時フィードバックを提供する。
        3. **Supabase Auth API呼び出し**:
            - バリデーションが成功すると、LoginFormまたはSignupFormコンポーネントが適切なSupabase Auth APIを呼び出す。
                - ログインの場合: `supabase.auth.signInWithPassword`
                - サインアップの場合: `supabase.auth.signUp`
        4. **Supabaseでの処理**:
            - Supabaseは受け取ったデータを処理し、認証または登録を行う。
                - ログインの場合、ユーザーの認証情報を検証する。
                - サインアップの場合、新しいユーザーアカウントを作成し、確認メールを送信する。
        5. **レスポンス処理**:
            - Supabaseからのレスポンスをフロントエンドで処理する。
            - 成功の場合、ユーザーを適切なページにリダイレクトするか、成功メッセージを表示する。
            - エラーの場合、エラーメッセージをユーザーに表示する。
        6. **状態更新**:
            - 認証状態が変更された場合（ログイン成功など）、Supabaseは自動的にクライアントサイドの認証状態を更新する。
            - この更新された状態は、アプリケーション全体で利用可能になる。
        7. **セッション管理**:
            - ログイン成功後、Supabaseは自動的にセッショントークンを管理する。
            - これにより、ユーザーは再認証なしで保護されたリソースにアクセスできる。
- **(ii) メニューのデータ管理**
    1. データベース関連の技術選定
        
        Supabaseを主要なデータベースソリューションとして選択した。
        
        Supabase選択の理由:
        
        - **PostgreSQLベース:** 
        強力なリレーショナルデータベースを基盤としているため、複雑なクエリや関係性の管理が容易であること
        - **リアルタイム機能:** 
        WebSocketsを使用したリアルタイムリスナーにより、データの即時反映が可能であること
        - **認証機能の統合:** 
        データベースと密接に連携した認証システムにより、セキュアなデータアクセス制御が実現できること
        - **ストレージソリューション:** 
        データベースと同じプラットフォーム上でファイルストレージも管理できるため、画像の管理が簡単であること
        
        比較対象:
        
        - **Firebase Realtime Database:** 
        NoSQLデータベースであり、複雑な関係性の管理が難しい場合があった。
        - **MongoDB:** 
        スケーラビリティに優れていますが、リアルタイム機能やストレージソリューションが標準で統合されていなかった。
    2. コンポーネントの説明とデータフロー
        1. CafeMenuUI (メインコンポーネント):
            
            このコンポーネントはアプリケーションの中心的な役割を果たし、他のすべてのコンポーネントを統括する。
            
            主要なコード:
            
            ```tsx
            const CafeMenuUI: React.FC = () => {
              const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
              const [categories, setCategories] = useState<Category[]>([]);
            
              useEffect(() => {
                fetchData();
              }, []);
            
              const fetchData = async () => {
                await Promise.all([fetchMenuItems(), fetchCategories()]);
              };
            
              const fetchMenuItems = async () => {
                const { data, error } = await supabase
                  .from('menu_items')
                  .select(`
                    *,
                    categories(name),
                    types:type_id(type1, type2)
                  `);
                // データの処理とsetMenuItems
              };
            
              // その他のメソッドと表示用JSX
            };
            
            ```
            
            データフロー:
            
            - Supabaseクライアントを使用してメニューアイテム、カテゴリー、タイプを取得する。
            - 取得したデータは状態（state）として保持され、子コンポーネントに渡される。
            - 各操作（追加、編集、削除）後に`fetchData`メソッドを呼び出し、データを再取得して表示を更新する。
        2.  AddMenuItemComponent:
            
            新しいメニューアイテムを追加するためのコンポーネントである。
            
            主要なコード:
            
            ```tsx
            const AddMenuItemComponent: React.FC<AddMenuItemProps> = ({ isOpen, onClose }) => {
              const [formData, setFormData] = useState({
                name: '',
                price: '',
                // その他のフィールド
              });
            
              const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                // 画像のアップロードと圧縮処理
                const { data, error } = await supabase
                  .from('menu_items')
                  .insert({
                    name: formData.name,
                    price: parseInt(formData.price),
                    // その他のフィールド
                  });
                // エラー処理と成功時の処理
              };
            
              // フォーム表示用JSX
            };
            
            ```
            
            データフロー:
            
            - CafeMenuUIから渡されたカテゴリーとタイプのデータを使用してフォームを構築する。
            - フォーム送信時に、Supabaseクライアントを使用して新しいメニューアイテムをデータベースに挿入する。
            - 画像はSupabaseのストレージにアップロードされ、そのURLがデータベースに保存される。
            
            [My Movie 7.mov](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4d83ce-503d-4767-90b5-e7e89af6ae69/f8758e82-6c2a-4da4-b85c-2a934dbddec1/My_Movie_7.mov)
            
        3. AddTypeComponent:
            
            新しいメニュータイプを追加するためのコンポーネントです。
            
            主要なコード:
            
            ```tsx
            const AddTypeComponent: React.FC<AddTypeProps> = ({ isOpen, onClose }) => {
              const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
              const [type1, setType1] = useState('');
              const [type2, setType2] = useState('');
            
              const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                const { error } = await supabase
                  .from('types')
                  .insert([{
                    category_id: selectedCategory,
                    type1,
                    type2: type2 || null
                  }]);
                // エラー処理と成功時の処理
              };
            
              // フォーム表示用JSX
            };
            
            ```
            
            データフロー:
            
            - CafeMenuUIからカテゴリーリストを受け取り、ユーザーが適切なカテゴリーを選択できるようにする。
            - フォーム送信時に、Supabaseクライアントを使用して新しいタイプをデータベースに挿入する。
            - 新しいタイプの追加後、CafeMenuUIのタイプリストが更新される。
            
            [My Movie 8.mov](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4d83ce-503d-4767-90b5-e7e89af6ae69/b9ab9e19-6c75-40d9-b9fc-dfe53aa60455/My_Movie_8.mov)
            
        4. EditMenuItemComponent:
            
            既存のメニューアイテムを編集するためのコンポーネントである。
            
            主要なコード:
            
            ```tsx
            const EditMenuItemComponent: React.FC<EditMenuItemProps> = ({ isOpen, onClose, item, onItemUpdated }) => {
              const [formData, setFormData] = useState({
                name: item.name,
                price: item.price.toString(),
                // その他のフィールド
              });
            
              const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                const { error } = await supabase
                  .from('menu_items')
                  .update({
                    name: formData.name,
                    price: parseInt(formData.price),
                    // その他のフィールド
                  })
                  .eq('id', item.id);
                // エラー処理と成功時の処理
              };
            
              // フォーム表示用JSX
            };
            
            ```
            
            データフロー:
            
            - CafeMenuUIから渡された現在のアイテムデータを使用して初期状態を設定する。
            - フォーム送信時に、Supabaseクライアントを使用して既存のメニューアイテムを更新する。
            - 画像が変更された場合、古い画像を削除し、新しい画像をアップロードする。
            
            [My Movie 9.mov](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4d83ce-503d-4767-90b5-e7e89af6ae69/b68c9cdb-cd93-4bcc-86ed-2b4341143168/My_Movie_9.mov)
            
        5. DeleteMenuItemComponent:
            
            メニューアイテムを削除するためのコンポーネントである。
            
            主要なコード:
            
            ```tsx
            const DeleteMenuItemComponent: React.FC<DeleteMenuItemProps> = ({ isOpen, onClose, itemId, onItemDeleted }) => {
              const handleDelete = async () => {
                const { error } = await supabase
                  .from('menu_items')
                  .delete()
                  .eq('id', itemId);
                // エラー処理と成功時の処理
              };
            
              // 確認ダイアログ表示用JSX
            };
            
            ```
            
            データフロー:
            
            - CafeMenuUIから渡されたアイテムIDを使用して、確認後にSupabaseで削除を実行する。
            - 削除成功後、CafeMenuUIの`onItemDeleted`コールバックを呼び出してデータを再取得する。

---

- **実装の苦労点**
    
    クロスコンポーネントスクロールの実装とメニューのデータ管理に苦労した。
    Next.jsのHooksを用いて、ページ遷移を実装することが最も実装として容易であったが、コンポーネントの数が少なかったため、各コンポーネントをトップページに表示させる方がUIとしてスッキリしたものになると考えた。useRefによるDOM操作は初めて実装したためコンポーネント間でのクエリの受け渡しのようなプロセスとはまた違うデータ参照と取得の操作について理解することに苦労した。
    メニューのデータ管理はまずメニューに必要な情報は何かを掴むためにフロントエンド側で配列を作成し、メニューのカテゴリー、タイプ、メニューの詳細情報の3つのデータテーブルが必要であると考えた。(コード1参照)また、メニューの情報を構成するためには3つのテーブルのデータ情報をリンクさせる必要があると考えた。このリンクの仕様を考えることと実装することが非常に難しかった。メニューアイテムのテーブルでインサートするカテゴリーやタイプの情報を別のテーブルのデータとリンクさせる設定をし、メニューアイテムのテーブルにデータをインサートするカテゴリーやタイプの値をカテゴリーやタイプのデータテーブルにあるデータのuuidを参照して選択させることでメニューデータを管理した。この実装が一番難しかった。
    
    - コード1. 作成した配列
        
        ```tsx
        interface Items{
            name: string;
            image: string;
            price: string;
        }
        interface MenuItemGroup {
            type: string;
            type2: string;
            items: Items[];
        }
        
        interface MenuItems {
          [key: string]: MenuItemGroup[];
        }
        
        const [selectedCategory, setSelectedCategory] = useState<string>('Drink');
        const categories = ['Drink', 'Food', 'Gelato'];
        const menuItems: MenuItems = {
            Drink: [
                {   type: 'Special Tea',
                    type2: 'ICE / HOT',
                    items: [
                        {name: 'ベリー抹茶ティー', price: '¥ 648', image:''},
                        {name: 'カラメルほうじティー', price: '¥ 660', image:''},
                        {name: 'オレンジアッサムティー', price: '¥ 648', image:''},
                    ]
                },
        													            ・
        													            ・
        													            ・
            ],
            Food: [
                {   type: 'Foods',
                    type2: 'Hot Sandwiches',
                    items: [
                        {name: '立山ホークのトマト煮', price: '¥ 1580', image:''},
                        {name: '色々きのこのクリームソース煮', price: '¥ 1480', image:''},
                        {name: 'シュリンプフリットと自家製タルタル', price: '¥ 1380', image:''},
                        {name: 'スモークサーモンとクリームチーズ', price: '¥ 1479', image:''},
                        ]
                },
        													            ・
        													            ・
        													            ・
            ],
            Gelato: [
            {   type: '',
                type2: '',
                items: [
                    {name: 'シングルジェラート（カップ / コーン）', price: '¥ 432', image:''},
                    {name: 'ダブルジェラート（カップ / コーン）', price: '¥ 540', image:''},
                    ]
            },
            ・
        													            ・
        													            ・
        													            ・
            ],
        };
        ```
