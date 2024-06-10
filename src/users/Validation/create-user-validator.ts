import { z } from 'zod';

export const createUserValidatorObject = z.object({
  name: z.string().min(5, { message: 'Name must be at least 5 characters long' }).trim(),
  username: z.string().min(5, { message: 'Username must be at least 5 characters long' }).trim(),
  email: z.string().email({ message: 'Email must be a valid one' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/u, 'Password must follow the pattern'),
  confirmPassword: z.string().min(6, { message: 'confirmPassword must be at least 6 characters long' }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/u, 'Password must follow the pattern')
})
  .refine((data) =>
    data.password === data.confirmPassword, {
    message: 'Passwords don\'t match',
    path: ['confirmPassword']
  }
  );

export type CreateUserType = z.infer<typeof createUserValidatorObject>;