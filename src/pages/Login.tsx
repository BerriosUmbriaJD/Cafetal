import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee } from "lucide-react"
import { LoginForm } from "@/components/app/LoginForm"

export const Login = () => {
  return (
    <main className="max-w-full min-h-screen bg-[#f8f3e9] flex items-center justify-center">
      <Card className="w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center">
            <Coffee className="h-12 w-12 text-[#7d5a50]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#7d5a50]">Coffee Cafetal</CardTitle>
          <CardDescription className="text-[#7d5a50]">Inicia sesión con tus credenciales</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )  
}