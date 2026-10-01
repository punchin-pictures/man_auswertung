import { DATA } from './auswertung-data.mjs';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  const expected = Netlify.env.get('PASSCODE') || '';
  if (!expected) return json({ error: 'Kein PASSCODE in den Netlify-Umgebungsvariablen gesetzt.' }, 500);
  let code = '';
  try { code = String((await req.json()).code || ''); } catch { /* leer */ }
  if (code.trim() !== expected.trim()) {
    await new Promise((r) => setTimeout(r, 600));
    return json({ error: 'wrong' }, 401);
  }
  return json({ data: DATA });
};

export const config = { path: '/api/data' };
