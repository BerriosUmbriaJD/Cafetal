import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/schema/loginSchema"
import { LoginSchemaType } from "@/schema/loginSchema"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useAuthStore } from "@/stores/AuthStore"


export const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async (values: LoginSchemaType) => {
    try {
      await login(values.email, values.password)
      const user = useAuthStore.getState().user
      if(user?.role === 'customer') {
        navigate('/user')
      } else if (user?.role === 'owner' || user?.role === 'barista') {
        navigate('/admin')
        console.log("Current User ID:", localStorage.getItem("currentUserId"));
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField 
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#7d5a50]">Email</FormLabel>
            <FormControl>
              <Input className="border-[#d4c9bd] focus-visible:ring-[#a98467]" placeholder="your@email.com" {...field} autoComplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField 
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#7d5a50]">Password</FormLabel>
            <FormControl>
              <Input className="border-[#d4c9bd] focus-visible:ring-[#a98467]" placeholder="Ingrese su contraseña" {...field} autoComplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="w-full bg-[#7d5a50] hover:bg-[#6c4a40] text-white cursor-pointer" type="submit">Ingresar</Button>
    </form>
  </Form>
  )
}