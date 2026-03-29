import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const data = await response.text();

    return new Response(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return new Response("Error fetching URL", { status: 500 });
  }
});