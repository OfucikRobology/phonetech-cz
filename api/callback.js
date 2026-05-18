// ──────────────────────────────────────────────────────────────
//  /api/callback — krok 2 OAuth flow
//  GitHub sem pošle authorization code po úspěšném loginu.
//  My ho vyměníme za access token a pošleme zpět do Decap okna.
// ──────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).send('Chybí GITHUB_CLIENT_ID nebo GITHUB_CLIENT_SECRET v env variables');
  }

  const { code, state } = req.query;
  if (!code) {
    return res.status(400).send('Chybí authorization code');
  }

  // Ověřit CSRF state z cookie
  const cookies = parseCookies(req.headers.cookie || '');
  if (!state || state !== cookies.oauth_state) {
    return res.status(400).send('Neplatný OAuth state token (CSRF ochrana)');
  }

  // Výměna code → access_token
  let tokenData;
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });
    tokenData = await response.json();
  } catch (err) {
    return res.status(500).send('Chyba při komunikaci s GitHub: ' + err.message);
  }

  if (tokenData.error || !tokenData.access_token) {
    return res.status(400).send('GitHub odmítl token: ' + (tokenData.error_description || 'unknown'));
  }

  // Decap CMS očekává postMessage v určitém formátu z window.opener.
  // Posíláme zpět HTML, který v prohlížeči zavolá window.opener.postMessage(...)
  const payload = {
    token: tokenData.access_token,
    provider: 'github',
  };

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Authorizing…</title></head>
<body>
<p>Přihlašování…</p>
<script>
  (function() {
    function receiveMessage(e) {
      // Pošli token zpět rodičovskému oknu (Decap CMS)
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify(payload).replace(/'/g, "\\'")}',
        e.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    // Říct Decap CMS že jsme připraveni
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body>
</html>`;

  // Vymaž state cookie
  res.setHeader('Set-Cookie', 'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}

function parseCookies(cookieHeader) {
  return cookieHeader.split(';').reduce((acc, pair) => {
    const [key, ...val] = pair.trim().split('=');
    if (key) acc[key] = val.join('=');
    return acc;
  }, {});
}
