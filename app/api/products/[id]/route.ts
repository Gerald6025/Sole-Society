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

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const items = readProducts();
  const item = items.find((p) => p.id === ctx.params.id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!(session?.user && (session.user as any).role === "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const items = readProducts();
  const idx = items.findIndex((p) => p.id === ctx.params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = {
    ...items[idx],
    ...(body || {}),
  };
  items[idx] = updated;
  writeProducts(items);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!(session?.user && (session.user as any).role === "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = readProducts();
  const idx = items.findIndex((p) => p.id === ctx.params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [removed] = items.splice(idx, 1);
  writeProducts(items);
  return NextResponse.json(removed);
}
