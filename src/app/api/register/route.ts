import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import { connectDB } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export const POST = async (req: any) => {
  const { name, email, password } = await req.json();
  console.log(name, email, password);
  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name,
    password: hashedPassword,
    email,
  };
  try {
    await createUser(newUser);
  } catch (error) {
    return new NextResponse("Error while creating user", {
      status: 500,
    });
  }
  return new NextResponse("User created", {
    status: 201,
  });
};
