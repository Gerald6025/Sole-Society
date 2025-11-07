import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connect from "@/db";
import User from "@/models/user";

type MeDoc = {
  name?: string | null;
  email: string;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connect();
  const doc = await User.findOne({ email: session.user.email })
    .select("name email image createdAt updatedAt")
    .lean<MeDoc>()
    .exec();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    name: doc.name,
    email: doc.email,
    image: doc.image,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}
