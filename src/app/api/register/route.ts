import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { name, email, password } = await req.json();
  console.log(name,email,password)
  //DB CON
  return new NextResponse("user created",{
    status:201
  })
};
