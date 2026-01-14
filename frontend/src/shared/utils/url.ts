/**
 * Проверяет, является ли переданная строка валидным URL-адресом.
 *
 * @description
 * Использует нативный конструктор `URL` для валидации строки. Возвращает `true`,
 * если строка представляет собой корректный URL (с соблюдением синтаксиса 
 * и протокола), иначе — `false`. Также возвращает `false` для пустых или 
 * нестроковых значений.
 *
 * @param {string} str - Строка для проверки на валидность URL.
 * @returns {boolean} `true`, если строка — валидный URL; иначе — `false`.
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
