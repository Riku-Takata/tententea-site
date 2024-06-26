"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Edit, Trash } from 'lucide-react';

const InstructionPage = () => (
    <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">メニュー操作ガイド</h1>
        <Card className="mb-6">
            <CardHeader>
            <CardTitle className="flex items-center">
                <Menu className="mr-2" />
                メニュー追加
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p>1. 「新規メニュー」ボタンをクリック</p>
            <p>2. メニュー名、価格、説明を入力</p>
            <p>3. 「保存」をクリックして追加完了</p>
            </CardContent>
        </Card>
        <Card className="mb-6">
            <CardHeader>
            <CardTitle className="flex items-center">
                <Edit className="mr-2" />
                メニュー編集
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p>1. 編集したいメニューの「編集」ボタンをクリック</p>
            <p>2. 情報を更新</p>
            <p>3. 「保存」をクリックして変更を確定</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center">
                <Trash className="mr-2" />
                メニュー削除
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p>1. 削除したいメニューの「削除」ボタンをクリック</p>
            <p>2. 確認ダイアログで「はい」を選択</p>
            <p>3. メニューが削除されます</p>
            </CardContent>
        </Card>
    </div>
);

export default InstructionPage;