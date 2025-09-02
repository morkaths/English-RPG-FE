/**
 * Get the value of a cookie by name
 * @param name The name of the cookie
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

/**
 * Set a new cookie
 * @param name Cookie name
 * @param value Cookie value
 * @param days Number of days to keep (default 1 day)
 * @param path Cookie path (default '/')
 * @param secure Secure cookie (HTTPS only)
 * @param sameSite SameSite policy
 */
export function setCookie(
  name: string,
  value: string,
  days: number = 1,
  path: string = '/',
  secure: boolean = true,
  sameSite: 'strict' | 'lax' | 'none' = 'strict'
): void {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

  let cookie = `${name}=${value}; expires=${date.toUTCString()}; path=${path}`;

  if (secure) {
    cookie += '; secure';
  }

  cookie += `; samesite=${sameSite}`;

  document.cookie = cookie;
}

/**
 * Delete a cookie
 * @param name Cookie name to delete
 * @param path Cookie path (default '/')
 */
export function deleteCookie(name: string, path: string = '/'): void {
  setCookie(name, '', -1, path);
}

/**
 * Check if a cookie exists
 * @param name Cookie name to check
 * @returns True if the cookie exists, otherwise false
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * Clear all cookies
 */
export function clearAllCookies(): void {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    deleteCookie(name);
  }
}