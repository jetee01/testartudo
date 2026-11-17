const INDEX_URL = 'https://raw.githubusercontent.com/jetee01/testartudo/main/index.html';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' }
      });
    }

    if (url.pathname !== '/' && url.pathname !== '/index.html') {
      return new Response('Not found', { status: 404 });
    }

    try {
      const page = await fetch(INDEX_URL, {
        headers: { Accept: 'text/html' },
        cf: { cacheTtl: 300, cacheEverything: true }
      });

      if (!page.ok) {
        return new Response('Could not load index.html from GitHub.', { status: 502 });
      }

      const headers = new Headers(page.headers);
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=300');
      headers.set('X-Content-Type-Options', 'nosniff');

      return new Response(request.method === 'HEAD' ? null : page.body, {
        status: 200,
        headers
      });
    } catch (error) {
      return new Response('Error loading the site page.', { status: 502 });
    }
  }
};
