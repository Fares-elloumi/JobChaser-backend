import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db"; 
import dotenv from "dotenv";
import { User } from "@prisma/client";

dotenv.config();

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET as string;

// Skapa en JWT
const createJWT = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  );
};

// SIGN-UP
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
       res.status(409).json({ message: "User already exists" });
       return;
    }

    // Kryptera lösenordet
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Skapa användaren
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    res.status(201).json({ message: `User created ${user.id} ${user.email}` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// SIGN-IN
export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
       res.status(404).json({ message: "Username does not exist" });
       return
    }

    // Kolla lösenord
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
       res.status(401).json({ message: "Invalid credentials" });
       return
    }

    // Skapa JWT-token
    const token = createJWT(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Hämta alla användare
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Hämta en specifik användare
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Uppdatera en användare
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUNDS) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email: email || existingUser.email,
        password: hashedPassword || existingUser.password,
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Ta bort en användare
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// SKYDDAD ROUTE
export const dashboard = (req: Request, res: Response) => {
  res.send("This is a protected route, but you are authorized!");
};
