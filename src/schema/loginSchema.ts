import { z } from "zod"

export const loginSchema = z.object({
  email: z.string({ required_error: 'El correo es requerido', invalid_type_error: 'Formato de correo incorrecto' }).email({ message: 'Tipo de correo invalido.' }),
  password: z.string({ required_error: 'La contraseña es requerida' }).min(8, 'La contraseña debe tener al menos 8 caracteres').max(32, 'La contraseña debe tener menos de 32 caracteres')
})

export type LoginSchemaType = z.infer<typeof loginSchema>