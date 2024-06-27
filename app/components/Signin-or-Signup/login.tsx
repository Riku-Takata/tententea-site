"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, LoginFormType } from '@/lib/actions';
import Loading from '@/app/loading';
import Link from 'next/link';


const LoginForm = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // 初期値
        defaultValues: { email: '', password: '' },
        // 入力値の検証
        resolver: zodResolver(LoginFormSchema),
    })

    // 送信
    const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
        setLoading(true)

        try {
        // ログイン
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        // エラーチェック
        if (error) {
            setMessage('エラーが発生しました。' + error.message)
            return
        }

        // トップページに遷移
        router.push('/components/Management')
        } catch (error) {
        setMessage('エラーが発生しました。' + error)
        return
        } finally {
        setLoading(false)
        setTimeout(() => {
            router.refresh()
        }, 3000);
        }
    }

    return(
        <div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* メールアドレス */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">メールアドレス</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
                </div>
                {/* パスワード */}
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">パスワード</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...register('password', { required: true })}
                        />
                        <div className="my-3 text-center text-sm text-red-500">{errors.password?.message}</div>
                    </div>
                </div>
                <p className="text-xs text-right">
                    パスワードを忘れた方は
                    <Link href="/components/ResetPassword" className="text-blue-500 hover:text-blue-300">
                        こちら
                    </Link>
                </p>
                {/* ログインボタン */}
                <div className="mb-5">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button
                            type='submit'
                            className="w-full bg-gray-300"
                        >
                            ログイン
                        </Button>
                    )}
                </div>
            </form>

            {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}
        </div>
    );
};

export default LoginForm;