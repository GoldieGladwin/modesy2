/**
 * Computes an isolated storage scope for multi-tenant / multi-role state.
 * - Guest routes (/guest/*) or unauthenticated users -> "guest"
 * - Authenticated users -> `${role}_${id}` (e.g. "admin_00000000-0000-0000-0000-000000000001")
 */
export function getStorageScope(
  user?: { role?: string; id?: string; email?: string } | null,
  pathname?: string | null
): string {
  if (pathname?.startsWith("/guest")) {
    return "guest";
  }
  if (!user) {
    return "guest";
  }
  return `${user.role || "user"}_${user.id || user.email || "default"}`;
}
