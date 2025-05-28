import { z } from 'zod';
import { ParamListBase } from '@react-navigation/native';

export const loginSchema = z.object({
  email: z.string({
    required_error: 'auth.login.error.emailRequired',
  }).email('auth.login.error.emailInvalid'),
  password: z.string({
    required_error: 'auth.login.error.passwordRequired',
  }).min(8, 'auth.login.error.passwordLength'),
});

export const signupSchema = z.object({
  name: z.string({
    required_error: 'auth.signup.error.nameRequired',
  }).min(2, 'auth.signup.error.nameLength'),
  email: z.string({
    required_error: 'auth.signup.error.emailRequired',
  }).email('auth.signup.error.emailInvalid'),
  password: z.string({
    required_error: 'auth.signup.error.passwordRequired',
  }).min(8, 'auth.signup.error.passwordLength'),
  confirmPassword: z.string({
    required_error: 'auth.signup.error.passwordRequired',
  }).min(8, 'auth.signup.error.passwordLength'),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: 'auth.signup.error.passwordsDoNotMatch',
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

export interface AuthStackParamList extends ParamListBase {
  Login: undefined;
  Signup: undefined;
  [key: string]: undefined | object;
} 