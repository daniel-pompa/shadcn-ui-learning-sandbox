import { z } from 'zod';
import { differenceInYears } from 'date-fns';

export const formSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string().min(8),
  phone: z
    .string()
    .regex(/^[0-9+\s]+$/, { message: 'Only numbers and spaces allowed' })
    .optional()
    .or(z.literal('')),
  gender: z.enum(['male', 'female'], { message: 'You must select a gender' }),
  role: z.enum(['developer', 'designer', 'manager'], {
    message: 'You must select a role',
  }),
  dateOfBirth: z
    .date({ message: 'Required' })
    .refine(date => differenceInYears(new Date(), date) >= 18, {
      message: 'Must be 18+',
    }),
  bio: z.string().max(160).optional(),
  terms: z.boolean().refine(val => val === true),
});

export type RegistrationFormValues = z.infer<typeof formSchema>;
