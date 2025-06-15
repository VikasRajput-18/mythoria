import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyUser } from "../../../../lib/auth";
import { create } from "domain";

export async function GET(
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
          },
        },
      },
    });

    if (!story) {
      return NextResponse.json({ message: "No Story Found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...story,
        tags: story.tags.map((t) => ({ id: t.tag.id, name: t.tag.name })),
      },
      { status: 200 }
    );
  } catch (error) {
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
    const { id } = await params;
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
    });

    if (!story) {
      return NextResponse.json({ message: "No Story Found" }, { status: 404 });
    }

    if (story.authorId !== userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    await prisma.story.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        genre,
        content,
        coverImage: thumbnail,
        type: type.toUpperCase(),
        audience: audience.toUpperCase(),
        published: status === "publish",
        tags: {
          deleteMany: {}, // clear old
          create: tags.map((tag: { name: string }) => ({
            tag: {
              connectOrCreate: {
                where: {
                  name: tag.name,
                },
                create: {
                  name: tag.name,
                },
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({ message: "Story Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
