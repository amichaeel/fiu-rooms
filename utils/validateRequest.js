export function validateRequest(req) {
  const referer = req.headers.referer || req.headers.origin;
  const allowedDomains = [
    'https://fiu-rooms.vercel.app',
    'http://localhost:3000'
  ];

  return allowedDomains.some(domain => referer?.startsWith(domain));
}