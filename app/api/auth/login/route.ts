import { NextResponse } from "next/server";
import { usersDatabase } from "../../../../data/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    await new Promise((resolve) => setInterval(resolve, 500));

    // 1. Find user by email in database
    const user = usersDatabase.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    // 2. Validate user existence and password
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password. Please try again or register." },
        { status: 401 },
      );
    }

    // 3. Return user details (without password for security)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar:
          user.role === "admin"
            ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150"
            : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
