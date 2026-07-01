import { NextResponse } from "next/server";
import { usersDatabase, UserRecord } from "@/data/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 600));

    const exists = usersDatabase.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (exists) {
      return NextResponse.json(
        { error: "This email is already registered. Please login instead." },
        { status: 409 },
      );
    }

    const newUser: UserRecord = {
      id: `user-${usersDatabase.length + 1}`,
      name,
      email,
      password,
      role: "user", // Default role is user
      joinDate: new Date().toISOString().split("T")[0],
    };

    // 3. Save inside our mutable list
    usersDatabase.push(newUser);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 },
    );
  }
}
