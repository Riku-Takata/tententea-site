"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './login';


const AuthForms = () => {
    const [activeTab, setActiveTab] = useState('login');

    const SignupForm = () => (
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
            <Button className="w-full bg-gray-300">サインアップ</Button>
        </form>
    );

    return (
        <Card className="w-[350px] mx-auto">
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">ようこそ</CardTitle>
            </CardHeader>
            <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className='data-[state=active]:bg-white'>ログイン</TabsTrigger>
                <TabsTrigger value="signup" className='data-[state=active]:bg-white'>サインアップ</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                <SignupForm />
                </TabsContent>
            </Tabs>
            </CardContent>
        </Card>
    );
};

export default AuthForms;