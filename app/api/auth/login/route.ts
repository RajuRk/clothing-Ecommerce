import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await new Promise((resolve) => setInterval(resolve, 500));

    const isAdmin = email.toLowerCase() === "admin@fashionhub.com";

    const mockUser = {
      id: isAdmin ? "admin-1" : "user-1",
      name: isAdmin ? "Head Admin" : name || "Valued Customer",
      email: email,
      role: isAdmin ? "admin" : "user",
      avatar: isAdmin
        ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150"
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
    };

    return NextResponse.json({ success: true, user: mockUser });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
