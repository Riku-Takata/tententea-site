"use client"

import { useState } from 'react';
import { AuthError } from '@supabase/supabase-js';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from 'next/link';
import { LogoView } from '@/app/LogoView';
import Image from 'next/image';

/**
 * パスワードリセット前のメール送信用画面
 */
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const supabase = createClientComponentClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/components/ResetPassword_Signout/InputPassword`,
      });
      if (error) {
        setError(error);
        throw error;
      }
      setIsSend(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <div>
        <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
            <div>
                <Link href="/">
                    <LogoView />
                </Link>
            </div>
            <div>
              <Link href="/components/Management">
                  <img
                      height={40}
                      width={40}
                      src="/user_icon.png"
                  />
              </Link>
            </div>
        </nav>
        <div className="flex items-center justify-center min-h-[700px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-18 text-center lg:pt-32">
            <p>エラーが発生しました</p>
          </div>
        </div>
        <div className='absolute bottom-0 bg-[#7d6f49] text-white'>
            <div className='flex'>
                <div className='flex-1 w-screen'>
                    <div className='flex px-7 py-5 items-center justify-between'>
                        <div>
                            <Link href="/components/Management">
                                <LogoView />
                            </Link>
                            <p className="pt-2">お問い合わせ</p>
                            <p>点点茶　ebitanikana@hotmail.com</p>
                        </div>
                        <div className='font-bold flex-grow'>
                            <div className='flex justify-end flex-1 text-left text-sm min-w-full'>
                                <a href="https://www.instagram.com/ten.ten.tea?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                    <Image
                                        alt="instagram_logo"
                                        src="/instagram_logo.png"
                                        className="p-2 pt-8"
                                        width={50}
                                        height={50}
                                    />
                                </a>
                                <p className='justify-end pt-10 text-left text-sm'>
                                    @KANSUI TERRACE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }

  if (isSend) {
    return (
      <div>
        <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
          <div>
              <Link href="/">
                  <LogoView />
              </Link>
          </div>
          <div>
            <Link href="/components/Management">
                <img
                    height={40}
                    width={40}
                    src="/user_icon.png"
                />
            </Link>
          </div>
      </nav>
        <div className="flex items-center justify-center min-h-[700px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-18 text-center lg:pt-32">
            <p>メールを送信しました</p>
          </div>
        </div>
        <div className='absolute bottom-0 bg-[#7d6f49] text-white'>
            <div className='flex'>
                <div className='flex-1 w-screen'>
                    <div className='flex px-7 py-5 items-center justify-between'>
                        <div>
                            <Link href="/components/Management">
                                <LogoView />
                            </Link>
                            <p className="pt-2">お問い合わせ</p>
                            <p>点点茶　ebitanikana@hotmail.com</p>
                        </div>
                        <div className='font-bold flex-grow'>
                            <div className='flex justify-end flex-1 text-left text-sm min-w-full'>
                                <a href="https://www.instagram.com/ten.ten.tea?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                    <Image
                                        alt="instagram_logo"
                                        src="/instagram_logo.png"
                                        className="p-2 pt-8"
                                        width={50}
                                        height={50}
                                    />
                                </a>
                                <p className='justify-end pt-10 text-left text-sm'>
                                    @KANSUI TERRACE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
          <div>
              <Link href="/">
                  <LogoView />
              </Link>
          </div>
          <div>
            <Link href="/components/Management">
                <img
                    height={40}
                    width={40}
                    src="/user_icon.png"
                />
            </Link>
          </div>
      </nav>
      <div className="flex items-center justify-center min-h-[700px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-18 text-center lg:pt-32">
          <p>アカウントに結びついているメールアドレスを入力してください</p>
          <form className="pt-10" onSubmit={onSubmit}>
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 md:w-2/3 lg:w-1/2 p-2.5" 
              value={email} 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="メールアドレス" 
            />
            <button 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center" 
              type="submit"
            >
              送信
            </button>
          </form>
        </div>
      </div>
      <div className='absolute bottom-0 bg-[#7d6f49] text-white'>
                    <div className='flex'>
                        <div className='flex-1 w-screen'>
                            <div className='flex px-7 py-5 items-center justify-between'>
                                <div>
                                    <Link href="/components/Management">
                                        <LogoView />
                                    </Link>
                                    <p className="pt-2">お問い合わせ</p>
                                    <p>点点茶　ebitanikana@hotmail.com</p>
                                </div>
                                <div className='font-bold flex-grow'>
                                    <div className='flex justify-end flex-1 text-left text-sm min-w-full'>
                                        <a href="https://www.instagram.com/ten.ten.tea?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                            <Image
                                                alt="instagram_logo"
                                                src="/instagram_logo.png"
                                                className="p-2 pt-8"
                                                width={50}
                                                height={50}
                                            />
                                        </a>
                                        <p className='justify-end pt-10 text-left text-sm'>
                                            @KANSUI TERRACE
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  );
};

export default ResetPassword;