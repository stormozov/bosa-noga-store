/**
 * Проверяет, является ли переданная строка валидным URL-адресом.
 *
 * @example
 * isValidUrl("https://example.com"); // true
 *
 * @example
 * isValidUrl("not-a-url"); // false
 *
 * @example
 * isValidUrl(""); // false
 */
export const isValidUrl = (str: string): boolean => {
	if (!str || typeof str !== "string") return false;
	try {
		new URL(str);
		return true;
	} catch {
		return false;
	}
};
