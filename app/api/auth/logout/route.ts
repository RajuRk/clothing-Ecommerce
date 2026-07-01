import { NextResponse } from "next/server";

export async function POST() {
  // Simulate database logout delay (200ms)
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}
