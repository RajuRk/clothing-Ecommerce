import { NextResponse } from "next/server";
import { usersDatabase } from "@/data/users";

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

  // Return live users database list (hiding passwords for security)
  const safeUsersList = usersDatabase.map(({ password, ...user }) => user);

  return NextResponse.json(safeUsersList);
}
