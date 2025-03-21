/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db/db";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, PlusCircle } from "lucide-react";

export const InventoryPage = () => {
  const [inventory, setInventory] = useState(db.getCoffeeInventory());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<any>(null);

  const storageConditions = db.getStorageConditions();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const batch = {
      id: currentBatch?.id || crypto.randomUUID(),
      type: formData.get("type") as string,
      quantity: Number(formData.get("quantity")),
      origin: formData.get("origin") as string,
      harvestDate: formData.get("harvestDate") as string,
      description: formData.get("description") as string,
    };

    if (currentBatch) {
      db.updateCoffeeBatch(batch.id, batch);
    } else {
      db.addCoffeeBatch(batch);
    }

    setInventory(db.getCoffeeInventory());
    setIsModalOpen(false);
    setCurrentBatch(null);
  };

  const handleDelete = (id: string) => {
    db.deleteCoffeeBatch(id);
    setInventory(db.getCoffeeInventory());
  };

  return (
    <section className="max-w-full h-auto p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#7d5a50] text-xl">
              Condiciones Ambientales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-gray-500">Temperatura</p>
                <p className="text-lg font-medium">{storageConditions.temperature}°C</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Humedad</p>
                <p className="text-lg font-medium">{storageConditions.humidity}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#7d5a50] text-xl">
              Estado General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <p
                  className={`text-lg font-medium ${
                    storageConditions.status === "optimal"
                      ? "text-green-500"
                      : storageConditions.status === "risk"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {storageConditions.status === "optimal"
                    ? "Óptimo"
                    : storageConditions.status === "risk"
                    ? "Riesgo"
                    : "Crítico"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between w-full">
          <CardTitle className="text-[#7d5a50] text-xl">
            Inventario Completo
          </CardTitle>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#7d5a50] hover:bg-[#927967] text-white flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Lote
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentBatch ? "Editar Lote" : "Agregar Lote"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <Input
                    name="type"
                    placeholder="Tipo de Café"
                    defaultValue={currentBatch?.type || ""}
                    required
                  />
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Cantidad"
                    defaultValue={currentBatch?.quantity || ""}
                    required
                  />
                  <Input
                    name="origin"
                    placeholder="Origen"
                    defaultValue={currentBatch?.origin || ""}
                  />
                  <Input
                    name="harvestDate"
                    type="date"
                    defaultValue={currentBatch?.harvestDate || ""}
                    required
                  />
                  <Input
                    name="description"
                    placeholder="Descripción"
                    defaultValue={currentBatch?.description || ""}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#7d5a50] hover:bg-[#927967] text-white"
                >
                  Guardar
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Fecha de Cosecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>{batch.type}</TableCell>
                  <TableCell>{batch.quantity} kg</TableCell>
                  <TableCell>{batch.origin || "N/A"}</TableCell>
                  <TableCell>{batch.harvestDate}</TableCell>
                  <TableCell>{batch.description || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setCurrentBatch(batch);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(batch.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};