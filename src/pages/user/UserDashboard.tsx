import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";
import { db } from "@/db/db";
import { useAuthStore } from "@/stores/AuthStore";
import { useNavigate } from "react-router";
import { UserNav } from "./UserNav";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  const [orders, setOrders] = useState(
    db.getOrders().filter((order) => order.userId === currentUser?.id)
  );
  const [coffeeType, setCoffeeType] = useState("");
  const [quantity, setQuantity] = useState(0);

  const coffeeInventory = db.getCoffeeInventory();

  if (!currentUser || currentUser.role !== "customer") {
    alert("Debes iniciar sesión como cliente para acceder a esta página.");
    navigate("/login");
    return null;
  }

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coffeeType || quantity <= 0) {
      alert("Por favor, selecciona un tipo de café y una cantidad válida.");
      return;
    }

    const newOrder = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      coffeeType,
      quantity,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    db.addOrder(newOrder);
    setOrders(
      db.getOrders().filter((order) => order.userId === currentUser.id)
    );
    alert("Orden realizada correctamente.");
    setCoffeeType("");
    setQuantity(0);
  };

  const handleCancelOrder = (id: string) => {
    db.updateOrderStatus(id, "cancelled");
    setOrders(
      db.getOrders().filter((order) => order.userId === currentUser.id)
    );
    alert("Orden cancelada correctamente.");
  };

  const handleModifyOrder = (id: string) => {
    const updatedQuantity = prompt("Ingresa la nueva cantidad:");
    if (!updatedQuantity || Number(updatedQuantity) <= 0) {
      alert("La cantidad debe ser un número válido mayor que cero.");
      return;
    }

    db.updateOrder({
      id: id as `${string}-${string}-${string}-${string}-${string}`,
      quantity: Number(updatedQuantity),
    });

    setOrders(
      db.getOrders().filter((order) => order.userId === currentUser.id)
    );
    alert("Orden modificada correctamente.");
  };

  return (
    <>
      <UserNav />
      <section className="max-w-full h-auto p-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-[#7d5a50] text-xl">
            Cafés Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Precio por Kg</TableHead>
                <TableHead>Cantidad Disponible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coffeeInventory.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>{batch.type}</TableCell>
                  <TableCell>${batch.price} USD</TableCell>
                  <TableCell>{batch.quantity} kg</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-[#7d5a50] text-xl">
            Realizar Orden
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePlaceOrder}>
            <div className="grid gap-4 py-4">
              <select
                value={coffeeType}
                onChange={(e) => setCoffeeType(e.target.value)}
                className="border p-2 rounded"
                required
              >
                <option value="">Selecciona un tipo de café</option>
                {coffeeInventory.map((batch) => (
                  <option key={batch.id} value={batch.type}>
                    {batch.type}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="Cantidad (kg)"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7d5a50] hover:bg-[#927967] text-white"
            >
              Realizar Orden
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#7d5a50] text-xl">Mis Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Café</TableHead>
                <TableHead>Cantidad (kg)</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.coffeeType}</TableCell>
                  <TableCell>{order.quantity} kg</TableCell>
                  <TableCell
                    className={`font-medium ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status === "pending"
                      ? "Pendiente"
                      : order.status === "completed"
                      ? "Completada"
                      : "Cancelada"}
                  </TableCell>
                  <TableCell>
                    {order.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleModifyOrder(order.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
    </>
  )
}
