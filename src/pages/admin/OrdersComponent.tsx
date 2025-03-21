import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAdminStore } from "@/stores/AdminStore"
import { RefreshCcw, CheckCircle, XCircle, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { db } from "@/db/db"

export const OrdersComponent = () => {

  const { orders, updateOrderStatus, deleteOrder } = useAdminStore(); 
  const users = db.getUsers(); 

  const getUserName = (userId: string): string => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username || user.email : "Usuario desconocido";
  };

  const getStatusColor = (status: string): { color: string; text: string } => {
    switch (status) {
      case "pending":
        return { color: "text-yellow-500", text: "Pendiente" };
      case "completed":
        return { color: "text-green-500", text: "Completado" };
      case "cancelled":
        return { color: "text-red-500", text: "Cancelado" };
      default:
        return { color: "text-gray-500", text: "Desconocido" };
    }
  };

  return (
    <Card className="col-span-1 border-[#d4c9b7] shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#7d5a50] text-xl font-bold">Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista de pedidos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Café</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              const { color, text } = getStatusColor(order.status);
              return (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{getUserName(order.userId)}</TableCell>
                  <TableCell>{order.coffeeType}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className={color}>{text}</TableCell>
                  <TableCell>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                          Cambiar Estado
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => updateOrderStatus(order.id, "pending")}
                        >
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Pendiente
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => updateOrderStatus(order.id, "completed")}
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Completado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                        >
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          Cancelado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 cursor-pointer"
                      onClick={() => deleteOrder(order.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}