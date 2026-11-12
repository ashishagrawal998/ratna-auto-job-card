// Cloudflare Pages "advanced mode" worker.
// jobcardbook.com (and www) show the product landing page from /site/.
// Every other host (ratnaauto.jobcardbook.com, *.pages.dev) gets the app exactly as before.
const LANDING_HOSTS = new Set(["jobcardbook.com", "www.jobcardbook.com"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!LANDING_HOSTS.has(url.hostname)) return env.ASSETS.fetch(request);

    if (url.hostname === "www.jobcardbook.com") {
      url.hostname = "jobcardbook.com";
      return Response.redirect(url.toString(), 301);
    }
    // Only the landing page lives on the root domain.
    if (url.pathname === "/" || url.pathname === "/index.html") {
      url.pathname = "/site/";
      const res = await env.ASSETS.fetch(new Request(url.toString(), request));
      const h = new Headers(res.headers);
      h.set("X-Content-Type-Options", "nosniff");
      h.set("Referrer-Policy", "strict-origin-when-cross-origin");
      return new Response(res.body, { status: res.status, headers: h });
    }
    if (url.pathname.startsWith("/site/")) return env.ASSETS.fetch(request);
    // Public demo (sample data) is also available on the product domain.
    if (url.pathname === "/demo" ) { url.pathname = "/demo/"; return Response.redirect(url.toString(), 301); }
    if (url.pathname.startsWith("/demo/")) return env.ASSETS.fetch(request);
    return Response.redirect("https://jobcardbook.com/", 302);
  },
};
