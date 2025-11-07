import { comments } from "./data";

export async function GET() {
    return await Response.json(comments);
}

export async function POST(req: Request) {
    const comment = await req.json();
    comments.push(comment);
    return new Response(JSON.stringify(comments), {
        headers: { "Content-type": "application/json" },
        status: 201
    }
    );
}