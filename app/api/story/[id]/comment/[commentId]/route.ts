import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../../../../../lib/auth";
import { prisma } from "../../../../../../lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storyId: string; commentId: string } }
) {
  try {
    const { commentId } = await params;
    // ✅ Wrap auth check separately so you can return a proper 401
    let userId = verifyUser(req);

    if (!commentId) {
      return NextResponse.json(
        { message: "Missing Comment id" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Optional: Validate that the comment belongs to this story and user
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
      include: {
        story: true,
      },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const isCommentOwner = comment.authorId === userId;
    const isStoryAuthor = comment.story.authorId === userId;
    // Optional: Allow delete only if owner
    if (!isCommentOwner && !isStoryAuthor) {
      return NextResponse.json(
        {
          message:
            "You can only delete your own comment or comments on your story.",
        },
        { status: 403 }
      );
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: Number(commentId) },
    });

    return NextResponse.json({ message: "Comment Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
