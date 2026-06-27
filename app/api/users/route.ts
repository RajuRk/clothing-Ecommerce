import { error } from "console";
import { NextResponse } from "next/server";

const mockUserList = [
  {
    id: "u1",
    name: "Amit Sharma",
    email: "amit@gmail.com",
    role: "user",
    joinDate: "2026-01-15",
  },
  {
    id: "u2",
    name: "Priya Patel",
    email: "priya@yahoo.com",
    role: "user",
    joinDate: "2026-03-22",
  },
  {
    id: "u3",
    name: "Rohit Verma",
    email: "rohit@outlook.com",
    role: "user",
    joinDate: "2026-05-10",
  },
  {
    id: "admin-1",
    name: "Head Admin",
    email: "admin@fashionhub.com",
    role: "admin",
    joinDate: "2025-12-01",
  },
];

export async function GET(request: Request) {
  const authHeader = await request.headers.get("Authorization");

  if (!authHeader || !authHeader.includes("admin")) {
    return NextResponse.json(
      {
        error: "Unauthorized. Admin access required.",
      },
      {
        status: 403,
      },
    );
  }

  return NextResponse.json(mockUserList);
}
