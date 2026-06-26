export default {
  async fetch(request) {

    const ua = request.headers.get("user-agent") || "";

    const botWords = [
      "bot",
      "crawler",
      "spider",
      "curl",
      "wget",
      "python",
      "headless"
    ];

    for (const word of botWords) {
      if (ua.toLowerCase().includes(word)) {
        return new Response("Access Denied", { status: 403 });
      }
    }

    // Apna Monetag Direct Link yahan daalein
    return Response.redirect(
      "https://YOUR_MONETAG_DIRECT_LINK",
      302
    );
  }
}
