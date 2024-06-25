import './../../reset.min.css'
import { Database } from '@/lib/database.types';
import SupabaseListener from './supabase_listener';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const Manager = async() =>{
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // セッションの取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <div className="flex-1">
            <SupabaseListener/>
            <div className="text-center text-xl">
                {session ?
                <div>
                    ログイン済
                </div> :
                <div>
                    未ログイン
                </div>}
            </div>
        </div>
    );
}

export default Manager;