"use client"

import { LoadingLogoView } from '@/app/LoadingLogoView';
import { useEffect } from 'react';

interface LoadingIndicatorProps {
    setLoading: (loading: boolean) => void;
}

export default function LoadingIndicator({ setLoading }: LoadingIndicatorProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 2000); // アニメーションの継続時間を設定

        return () => clearTimeout(timer);
    }, [setLoading]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#7d6f49] text-white z-50">
            <div className="flex items-center animate-slideIn">
                <LoadingLogoView />
                <h1 className="text-8xl font-bold ml-4">Ten Ten Tea</h1>
            </div>
        </div>
    );
}



