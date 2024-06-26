"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const SignupForm = () => (
    <Card className="w-[350px] mx-auto">
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">サインアップ</CardTitle>
        </CardHeader>
        <CardContent>
            <form className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">ユーザー名</label>
                <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input id="name" type="text" placeholder="ユーザー名" className="pl-10" />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">メールアドレス</label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input id="email" type="email" placeholder="your@email.com" className="pl-10" />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">パスワード</label>
                <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                </div>
            </div>
            <Button className="w-full">サインアップ</Button>
            </form>
        </CardContent>
        <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
            アカウントをお持ちの方は
            <Link href="/auth/Signin" className="text-blue-600 hover:underline ml-1">
                こちら
            </Link>
            </p>
        </CardFooter>
    </Card>
  );

export default SignupForm;