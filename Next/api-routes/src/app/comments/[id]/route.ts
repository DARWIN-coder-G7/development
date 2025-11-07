import { comments } from "../data";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const comment = comments.find(el => el.id === id);
    return await Response.json(comment);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();

    const { commentMessage } = body;

    const index = comments.findIndex((comment) => comment.id == id);
    comments[index].commentMessage = commentMessage;
    comments[index].commentedTime = JSON.stringify(Date.now());
    return Response.json(comments);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // to delete specific index on an Array
    const index = comments.findIndex(comment => comment.id == id);
    if (index === -1) {
        return Response.json({ error: "Comment not found" }, { status: 404 });
    }

    comments.splice(index, 1);
    return Response.json(comments);
}