"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormSchema, SignUpFormType } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';

const SignupForm = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        // 初期値
        defaultValues: { name: '', email: '', password: '' , confirmPassword: '',},
        // 入力値の検証
        resolver: zodResolver(SignUpFormSchema),
    })

    // 送信
    const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
        setLoading(true)

        try {
        // サインアップ
        const { error: errorSignup } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
            emailRedirectTo: `${location.origin}/auth/Callback`,
            },
        })

        // エラーチェック
        if (errorSignup) {
            setMessage('エラーが発生しました。' + errorSignup.message)
            return
        }

        // プロフィールの名前を更新
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ name: data.name })
            .eq('email', data.email)

        // エラーチェック
        if (updateError) {
            setMessage('エラーが発生しました。' + updateError.message)
            return
        }

        // 入力フォームクリア
        reset()
        setShowAlert(true)
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
            {showAlert && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
                <p className="font-bold">ご登録ありがとうございます</p>
                <p>本登録用のURLを記載したメールをお送りしました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。</p>
                <button
                    onClick={() => setShowAlert(false)}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                    閉じる
                </button>
                </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">ユーザー名</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            id="name"
                            type="text"
                            placeholder="ユーザー名"
                            className="pl-10"
                            {...register('name', { required: true })}
                        />
                    </div>
                    <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
                </div>
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
                    </div>
                    <div className="my-3 text-center text-sm text-red-500">{errors.password?.message}</div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">パスワード(確認)</label>
                    <div className="relative">
                        <Input
                            id="password"
                            type="password"
                            placeholder="パスワードをもう一度入力してください"
                            className=""
                            {...register('confirmPassword', { required: true })}
                        />
                    </div>
                    <div className="my-3 text-center text-sm text-red-500">{errors.confirmPassword?.message}</div>
                </div>
                {/* サインアップボタン */}
                <div className="mb-5">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button
                            type="submit"
                            className="w-full bg-gray-300"
                        >
                            サインアップ
                        </Button>
                    )}
                </div>
            </form>
            {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}
        </div>
    );
};

export default SignupForm;