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
      "https://www.effectivecpmnetwork.com/f4cccgmr?key=54925ac81f906f93aec474fef159a338",
      302
    );
  }
}
