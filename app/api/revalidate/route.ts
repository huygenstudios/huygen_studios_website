import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { encodeBlogSlug } from "@/lib/blog/normalize";
import { isValidRevalidationPath } from "../../../lib/blog/cover-image";

function authenticate(req: NextRequest): boolean {
  const secretCandidates = [
    process.env.HUYGEN_REVALIDATE_SECRET,
    process.env.REVALIDATE_SECRET,
    process.env.MARBLE_REVALIDATE_SECRET
  ].filter(Boolean);

  if (secretCandidates.length === 0) return false;

  const { searchParams } = new URL(req.url);
  const paramSecret = searchParams.get("secret");
  const headerSecret = req.headers.get("x-revalidate-secret");

  return secretCandidates.some(secret => paramSecret === secret || headerSecret === secret);
}

function hasConfiguredSecret(): boolean {
  return Boolean(
    process.env.HUYGEN_REVALIDATE_SECRET ||
    process.env.REVALIDATE_SECRET ||
    process.env.MARBLE_REVALIDATE_SECRET
  );
}



function applyBlogRevalidation(slug: string | null, customPaths: string[] | null) {
  const paths = ["/blog", "/sitemap.xml"];
  const tags = ["marble-posts"];

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  // External CMS webhooks require immediate expiry. The "max" profile serves
  // stale data once more, which is why the sitemap could lag behind publishing.
  revalidateTag("marble-posts", { expire: 0 });

  if (slug) {
    const postPath = `/blog/${encodeBlogSlug(slug)}`;
    revalidatePath(postPath);
    revalidateTag(`marble-post:${slug}`, { expire: 0 });
    paths.push(postPath);
    tags.push(`marble-post:${slug}`);
  }

  // Also support additional dynamic custom paths if passed
  if (customPaths && customPaths.length > 0) {
    for (const path of customPaths) {
      if (isValidRevalidationPath(path) && !paths.includes(path)) {
        revalidatePath(path);
        paths.push(path);
      }
    }
  }

  return { slug: slug || null, paths, tags };
}

async function readRevalidationParams(req: NextRequest): Promise<{ slug: string | null; paths: string[] | null }> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  
  let paths: string[] | null = null;
  const queryPaths = searchParams.get("paths");
  if (queryPaths) {
    try {
      const parsed = JSON.parse(queryPaths);
      if (Array.isArray(parsed)) paths = parsed.map(String);
    } catch {}
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      return {
        slug: slug || body?.slug || body?.post?.slug || body?.data?.slug || body?.entry?.slug || null,
        paths: paths || (Array.isArray(body?.paths) ? body.paths.map(String) : null)
      };
    } catch {}
  }

  return { slug, paths };
}

function missingSecretResponse() {
  return NextResponse.json(
    { error: "Revalidation secret is not configured on the server" },
    { status: 500 }
  );
}

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Unauthorized access: Invalid revalidation secret" },
    { status: 401 }
  );
}

export async function POST(req: NextRequest) {
  try {
    if (!hasConfiguredSecret()) return missingSecretResponse();
    if (!authenticate(req)) return unauthorizedResponse();

    const { slug, paths } = await readRevalidationParams(req);
    const result = applyBlogRevalidation(slug, paths);

    return NextResponse.json({
      ok: true,
      revalidated: result.paths,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error during manual cache revalidation:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during cache refresh" },
      { status: 500 }
    );
  }
}

// Support GET requests for easy browser-based testing/integration checks
export async function GET(req: NextRequest) {
  try {
    if (!hasConfiguredSecret()) return missingSecretResponse();
    if (!authenticate(req)) return unauthorizedResponse();

    const { slug, paths } = await readRevalidationParams(req);
    const result = applyBlogRevalidation(slug, paths);

    return NextResponse.json({
      ok: true,
      revalidated: result.paths,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error during GET cache revalidation:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during cache refresh" },
      { status: 500 }
    );
  }
}
