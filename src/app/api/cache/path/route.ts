import { env } from "app/config/env";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { path, token } = await request.json();

  if (!path || !token) {
    return Response.json({ error: "Missing path or token" }, { status: 400 });
  }

  if (token !== env.CACHE_TOKEN) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  revalidatePath(path);
  return Response.json({ success: true });
}
