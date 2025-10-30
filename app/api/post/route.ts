import { NextResponse } from "next/server";
import connect from "@/db";
import Post from "@/models/post";     

export const GET = async () => {
  try {
    await connect();
    const posts = await Post.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Database Error: ${message}` }, { status: 500 });
  }     

};