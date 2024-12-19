import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { adminAuth } from "@/app/lib/firebase-admin";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create a custom token using the user's email as the UID
    const customToken = await adminAuth.createCustomToken(session.user.email, {
      email: session.user.email,
      isValid: true,
      userId: session.user.id,
    });

    return NextResponse.json({ token: customToken });
  } catch (error) {
    console.error("Error creating custom token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
