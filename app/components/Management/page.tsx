import './../../reset.min.css'
import { Database } from '@/lib/database.types';
import SupabaseListener from './supabase_listener';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthFooter from '../layout/AuthFooter/page';
import InstructionPage from '../layout/InsMng/page';
import AuthForms from '../Signin-or-Signup/page';

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
            <div className="min-h-[750px] bg-gray-100 flex items-center justify-center p-4">
                {session ?
                <div>
                    <InstructionPage />
                </div> :
                <div className='grid'>
                    <AuthForms />
                </div>}
            </div>
            <AuthFooter />
        </div>
    );
}

export default Manager;