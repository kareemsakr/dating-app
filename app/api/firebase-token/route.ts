import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { adminAuth } from "@/app/lib/firebase-admin";
import { getActiveMatch } from "@/app/lib/actions";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const match = await getActiveMatch(session.user.sub);
    if (!match) {
      return NextResponse.json(
        { error: "Match not found or inactive" },
        { status: 404 }
      );
    }
    const matchedUserId =
      session.user.sub === match.user1 ? match.user2 : match.user1;
    // Create a custom token using the user's email as the UID
    const customToken = await adminAuth.createCustomToken(session.user.sub, {
      matchId: match.id,
      userId: session.user.sub,
      otherUserId: matchedUserId,
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
