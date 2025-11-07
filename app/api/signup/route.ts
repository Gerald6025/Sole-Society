import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/db";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    await connect();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    return NextResponse.json({ id: user._id.toString(), email: user.email });
  } catch (e) {
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
