import Cookies, { type CookieAttributes } from 'js-cookie'

export const getCookie = (
  key?: string
): string | undefined | Record<string, string> => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  return key || typeof key === 'string' ? Cookies.get(key) : Cookies.get()
}

export const setCookie = (
  key: string,
  value: string,
  options?: CookieAttributes
): string | undefined => {
  return Cookies.set(key, value, options)
}

export const removeCookie = (key: string, options?: CookieAttributes): void => {
  Cookies.remove(key, options)
}
