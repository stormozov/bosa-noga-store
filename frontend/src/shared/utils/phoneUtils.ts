/**
 * Проверяет корректность российского номера телефона
 */
export function isValidRussianPhoneNumber(phone: string): boolean {
	// Удаляем все символы кроме цифр
	const cleaned = phone.replace(/\D/g, "");

	// Проверяем длину номера
	if (cleaned.length !== 11) return false;

	// Проверяем первую цифру
	const firstDigit = cleaned[0];
	return firstDigit === "7" || firstDigit === "8";
}

/**
 * Форматирует номер телефона в стандартный российский формат
 *
 * Пример выходного значения: "+7 (123) 456-78-90"
 */
export function formatRussianPhoneNumber(phone: string): string {
	// Удаляем все символы кроме цифр
	let cleaned = phone.replace(/\D/g, "");

	// Обрабатываем случаи с разной длиной номера
	if (cleaned.length > 11) {
		cleaned = cleaned.slice(-11);
	} else if (cleaned.length < 11) {
		return phone;
	}

	// Нормализуем первую цифру
	if (cleaned[0] === "8") {
		cleaned = `7${cleaned.slice(1)}`;
	} else if (cleaned[0] !== "7") {
		cleaned = `7${cleaned.slice(1, 11)}`;
	}

	// Форматируем номер
	const firstPart = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}`;
	const secondPart = `-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
	return `${firstPart}${secondPart}`;
}
