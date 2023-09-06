// // Importa los módulos necesarios
// import { NextApiRequest, NextApiResponse } from "next";
// import { signUpUser } from "@/api/userController"; // Asumiendo que tienes un controlador para registrar usuarios

// // Definición de las rutas del usuario
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     // Ruta para registrar un nuevo usuario
//     try {
//       const userData = req.body; // Debes enviar los datos del usuario desde el cliente
//       const newUser = await signUpUser(userData); // Llama a una función para registrar usuarios (debes implementarla)
//       res.status(201).json(newUser);
//     } catch (error) {
//       console.error("Error al registrar usuario:", error);
//       res.status(500).json({ message: "Error al registrar usuario" });
//     }
//   } else {
//     // Manejar otros métodos HTTP si es necesario
//     res.status(405).json({ message: "Método no permitido" });
//   }
// }
