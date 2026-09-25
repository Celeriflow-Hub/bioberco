export function isAdminAuthorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const sent =
    req.headers.get("x-admin-token") ??
    new URL(req.url).searchParams.get("token");
  return sent === token;
}
