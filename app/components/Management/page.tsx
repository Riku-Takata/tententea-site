import './../../reset.min.css'
import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import InstructionPage from '../layout/InsMng/page';
import AuthForms from '../Signin-or-Signup/page';
import SupabaseListener_H from '@/app/supabase_listener_H';
import SupabaseListener_F from '@/app/supabase_listener_F';

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
            <SupabaseListener_H />
            <div className="min-h-[750px] bg-gray-100 flex items-center justify-center p-4">
                {session ?
                <div>
                    <InstructionPage />
                </div> :
                <div className='grid'>
                    <AuthForms />
                </div>}
            </div>
            <SupabaseListener_F />
        </div>
    );
}

export default Manager;