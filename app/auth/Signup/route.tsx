import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import type { Database } from '@/lib/database.types'
import SignupForm from '@/app/components/Signin-or-Signup/signup'

// サインアップページ
const SignupPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // セッションの取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    // 認証している場合、リダイレクト
    if (session) {
        redirect('/')
    }

    return <SignupForm />
}

export default SignupPage