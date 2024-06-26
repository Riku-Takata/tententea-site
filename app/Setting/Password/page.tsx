import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import type { Database } from '@/lib/database.types'
import Password from '@/app/components/ResetPassword_Signin/page'


// パスワード変更ページ
const PasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/Signin')
  }

  return <Password />
}

export default PasswordPage