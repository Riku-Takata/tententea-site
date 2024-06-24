import { z } from 'zod'

const regex = /^(?=.*[A-Z])[0-9a-zA-Z]*$/;
export const SignUpFormSchema = z
  .object({
    email: z
      .string({
        required_error: "必須項目です。",
      })
      .email({ message: 'メールアドレスの形式で入力して下さい。' })
      .min(1, { message: 'メールアドレスを入力してください。' })
      .max(50, { message: '50字以内で入力してください' }),
    password: z
      .string({
        required_error: "必須項目です。",
      })
      .min(8, { message: '8文字以上で入力してください。' })
      .max(50, { message: '50文字以内で入力して下さい。' }),
    confirmPassword: z
      .string({
        required_error: "必須項目です。",
      })
      .min(1, { message: 'パスワードを再入力して下さい。' })
      .max(50, { message: '50文字以内で入力して下さい。' })
  })
  .superRefine((data, ctx) => {
    if (regex.test(data.password)) {
        ctx.addIssue({
          message: '半角英数字かつ少なくとも1つの大文字を含めてください。',
          path: ['password'],
          code: z.ZodIssueCode.custom
        })
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: 'パスワードが異なります。',
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom
      })
    }
  })

export type SignUpFormType = z.infer<typeof SignUpFormSchema>

