"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './login';
import SignupForm from './signup';


const AuthForms = () => {
    const [activeTab, setActiveTab] = useState('login');

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