'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import AuthFooter from './components/layout/AuthFooter/page'


// 認証状態の監視
const SupabaseListener_F = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AuthFooter session={session} />
}

export default SupabaseListener_F