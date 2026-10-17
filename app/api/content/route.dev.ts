import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Backs the /edit page. Only works under `npm run dev`; on the deployed site it 404s.
const file = path.join(process.cwd(), "content", "site.json");
const dev = process.env.NODE_ENV === "development";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!dev) return new Response("Not found", { status: 404 });
  return new Response(await readFile(file, "utf8"), { headers: { "content-type": "application/json" } });
}

export async function POST(req: Request) {
  if (!dev) return new Response("Not found", { status: 404 });
  const data = await req.json();
  if (!data || typeof data !== "object" || !data.hero || !data.work || !data.story) {
    return new Response("That doesn't look like the site content", { status: 400 });
  }
  await writeFile(file, JSON.stringify(data, null, 2) + "\n");
  return Response.json({ ok: true });
}
