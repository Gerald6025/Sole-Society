import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

function readProducts() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw) as any[];
  } catch {
    return [];
  }
}

function writeProducts(items: any[]) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf8");
}

export async function GET() {
  const items = readProducts();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!(session?.user && (session.user as any).role === "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body?.name || !body?.model || !body?.brand || typeof body?.price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const items = readProducts();
  const id = body.id || `p_${Date.now()}`;
  const product = {
    id,
    name: body.name,
    model: body.model,
    brand: body.brand,
    price: body.price,
    image: body.image || "/Nike.jpeg",
    sizes: Array.isArray(body.sizes) ? body.sizes : [7, 8, 9, 10],
  };
  items.push(product);
  writeProducts(items);
  return NextResponse.json(product, { status: 201 });
}
