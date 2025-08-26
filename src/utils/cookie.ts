
/**
 * Lấy giá trị cookie dựa trên tên
 * @param name Tên cookie cần lấy
 * @returns Giá trị cookie hoặc null nếu không tồn tại
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
 * Đặt cookie mới
 * @param name Tên cookie
 * @param value Giá trị cookie
 * @param days Số ngày tồn tại (mặc định 1 ngày)
 * @param path Đường dẫn cookie (mặc định '/')
 * @param secure Bảo mật cookie (chỉ HTTPS)
 * @param sameSite Chính sách Same-Site
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
 * Xóa cookie
 * @param name Tên cookie cần xóa
 * @param path Đường dẫn cookie (mặc định '/')
 */
export function deleteCookie(name: string, path: string = '/'): void {
  setCookie(name, '', -1, path);
}

/**
 * Kiểm tra xem cookie có tồn tại không
 * @param name Tên cookie cần kiểm tra
 * @returns True nếu cookie tồn tại, ngược lại false
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * Xóa tất cả cookie
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