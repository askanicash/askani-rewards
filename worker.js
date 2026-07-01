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
      "https://www.effectivecpmnetwork.com/yuutn7rnk5?key=77bd2f31eab1d0564f04e1a6704aeee2",
      302
    );
  }
}
