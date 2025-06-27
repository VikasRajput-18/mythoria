import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyUser } from "../../../../lib/auth";
import jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let currentUserId: number | null = null;

  try {
    // 1. Extract ID from params
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing story id" },
        { status: 400 }
      );
    }

    // 2. Decode token to get userId (if available)
    const token = req.cookies.get("token")?.value;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          userId: number;
        };
        currentUserId = decoded.userId;
      } catch (err) {
        // Invalid or expired token → treat as anonymous
        currentUserId = null;
      }
    }

    // 3. Increment story views
    await prisma.story.update({
      where: { id: Number(id) },
      data: { views: { increment: 1 } },
    });

    // 4. Fetch story with optional like info
    const story = await prisma.story.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: {
              select: {
                image: true,
                bio: true,
              },
            },
          },
        },
        pages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: {
          select: { like: true, comments: true },
        },
        like: currentUserId
          ? {
              where: { userId: currentUserId },
              select: { id: true },
            }
          : false,
      },
    });

    if (!story) {
      return NextResponse.json({ message: "No Story Found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...story,
        likeCount: story._count.like,
        commentCount: story._count.comments,
        likedByMe: story.like ? story.like.length > 0 : false,
        tags: story.tags.map((t) => ({ id: t.tag.id, name: t.tag.name })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /story/:id", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing story id" },
        { status: 400 }
      );
    }

    const userId = verifyUser(req);

    const story = await prisma.story.findUnique({
      where: { id: Number(id) },
    });

    if (!story) {
      return NextResponse.json({ message: "No Story Found" }, { status: 404 });
    }

    if (story.authorId !== userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    await prisma.story.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "Story Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const {
      title,
      description,
      genre,
      content,
      thumbnail,
      type,
      audience,
      status,
      tags,
      pages,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Missing story id" },
        { status: 400 }
      );
    }

    const userId = verifyUser(req);

    const story = await prisma.story.findUnique({
      where: { id: Number(id) },
      include: { pages: true },
    });

    if (!story) {
      return NextResponse.json({ message: "No Story Found" }, { status: 404 });
    }

    if (story.authorId !== userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    // ✅ 1. Update story base fields & tags
    await prisma.story.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        genre,
        content,
        coverImage: thumbnail,
        type: type?.toUpperCase(),
        audience: audience?.toUpperCase(),
        published: status === "publish",
        tags: {
          deleteMany: {}, // remove all old
          create: tags.map((tag: { name: string }) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag.name },
                create: { name: tag.name },
              },
            },
          })),
        },
      },
    });

    // ✅ 2. Sync pages

    const existingPageIds = story.pages.map((p) => p.id);
    const incomingPageIds = pages
      .filter((p: any) => p.id && Number.isInteger(Number(p.id)))
      .map((p: any) => Number(p.id));

    // a) Delete pages removed on frontend
    const pagesToDelete = existingPageIds.filter(
      (pid) => !incomingPageIds.includes(pid)
    );
    if (pagesToDelete.length > 0) {
      await prisma.page.deleteMany({
        where: { id: { in: pagesToDelete } },
      });
    }

    // b) Upsert pages: update if valid ID, else create new
    for (const [index, page] of pages.entries()) {
      const parsedId = Number(page.id);
      const isValidDbId =
        Number.isInteger(parsedId) && parsedId > 0 && parsedId < 2147483647;

      if (isValidDbId && existingPageIds.includes(parsedId)) {
        await prisma.page.update({
          where: { id: parsedId },
          data: {
            content: page.content,
            pageNumber: index,
          },
        });
      } else {
        await prisma.page.create({
          data: {
            content: page.content,
            pageNumber: index,
            story: { connect: { id: Number(id) } },
          },
        });
      }
    }

    return NextResponse.json({ message: "Story Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
