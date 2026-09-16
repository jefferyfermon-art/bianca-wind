/**
 * Active-route matching shared by the desktop and mobile navigation.
 * `/` matches only itself; every other route also matches its sub-paths.
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
