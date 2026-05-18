// ──────────────────────────────────────────────────────────────
//  /api/auth — krok 1 OAuth flow
//  Decap CMS sem přesměruje klienta když klikne "Login with GitHub".
//  My ho přesměrujeme na GitHub OAuth s našimi credentials.
// ──────────────────────────────────────────────────────────────

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('GITHUB_CLIENT_ID není nastaven v env variables');
  }

  // GitHub potřebuje znát zpáteční URL (callback), kam pošle authorization code.
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const redirectUri = `${protocol}://${host}/api/callback`;

  // Náhodný state token pro CSRF ochranu
  const state = Math.random().toString(36).substring(2, 15);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',           // potřebujeme repo write access
    state: state,
  });

  // Set state v cookie pro pozdější ověření
  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  res.redirect(302, `https://github.com/login/oauth/authorize?${params.toString()}`);
}
