import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";
import { db } from "@/db/db";
import { useNavigate } from "react-router"; // Para redirigir al usuario

export const SettingsPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const users = db.getUsers();
  const currentUser = db.getCurrentUser(); // Obtener el usuario actual

  // Redirigir al usuario si no está autenticado
  const navigate = useNavigate();
  if (!currentUser) {
    alert("Debes iniciar sesión para acceder a esta página.");
    navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
    return null; // Detener la renderización del componente
  }

  // Función para actualizar el correo del usuario actual
  const handleUpdateEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return alert("El correo no puede estar vacío.");
    db.updateUser(currentUser.id, { email });
    alert("Correo actualizado correctamente.");
    setEmail("");
  };

  // Función para actualizar la contraseña del usuario actual
  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) return alert("La contraseña no puede estar vacía.");
    db.updateUser(currentUser.id, { password });
    alert("Contraseña actualizada correctamente.");
    setPassword("");
  };

  // Función para eliminar un usuario
  const handleDeleteUser = (id: string) => {
    db.deleteUser(id);
    alert("Usuario eliminado correctamente.");
  };

  return (
    <section className="max-w-full h-auto p-12">
      {/* Gestión de la Cuenta del Usuario Actual */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-[#7d5a50] text-xl">Mi Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateEmail} className="mb-4">
            <div className="grid gap-4 py-4">
              <Input
                type="email"
                placeholder="Nuevo Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7d5a50] hover:bg-[#927967] text-white"
            >
              Actualizar Correo
            </Button>
          </form>

          <form onSubmit={handleUpdatePassword}>
            <div className="grid gap-4 py-4">
              <Input
                type="password"
                placeholder="Nueva Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7d5a50] hover:bg-[#927967] text-white"
            >
              Actualizar Contraseña
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Gestión de Otros Usuarios (solo para administradores) */}
      {currentUser.role === "owner" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#7d5a50] text-xl">Gestión de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre de Usuario</TableHead>
                  <TableHead>Correo Electrónico</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => alert(`Editar usuario ${user.username}`)} // Implementar edición
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
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
      )}
    </section>
  );
};