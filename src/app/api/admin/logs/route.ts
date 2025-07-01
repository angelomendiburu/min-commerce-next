import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.userActionLog.findMany({
      orderBy: { timestamp: "desc" },
      include: {
        user: {
          select: { email: true, name: true }
        }
      }
    });
    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener logs" }, { status: 500 });
  }
}
