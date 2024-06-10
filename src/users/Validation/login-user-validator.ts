import { z } from 'zod';

export const loginUserValidatorObject = z.object({
  email: z.string().email({ message: 'Email must be a valid one' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/u, 'Password must follow the pattern')
});

export type LoginUserType = z.infer<typeof loginUserValidatorObject>;