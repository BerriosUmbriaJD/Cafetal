import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db/db";
import { Link } from "react-router";

export const InventorySummary = () => {
  const coffeeInventory = db.getCoffeeInventory();

  return (
    <Card className="col-span-1 border-[#d4c9b7] shadow-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-[#7d5a50] text-xl">Inventario Reciente</CardTitle>
        <Link className="text-[#7d5a50] hover:underline font-semibold text-sm" to="/admin/inventory">
          Ver Inventario Completo
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Fecha de Cosecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coffeeInventory.slice(-5).map((batch) => (
              <TableRow key={batch.id}>
                <TableCell>{batch.type}</TableCell>
                <TableCell>{batch.quantity} kg</TableCell>
                <TableCell>{batch.origin || "N/A"}</TableCell>
                <TableCell>{batch.harvestDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};