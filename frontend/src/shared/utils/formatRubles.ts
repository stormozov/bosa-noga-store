/**
 * Форматирует число в строку с пробелами в качестве разделителей тысяч
 * и суффиксом "руб."
 *
 * @param value - число для форматирования
 * @returns отформатированная строка, например: "15 000 руб."
 */
export const formatRubles = (value: number): string => {
	if (!Number.isFinite(value)) {
		throw new Error("Переданное значение должно быть конечным числом");
	}

	const formattedNumber = value.toLocaleString("ru-RU", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return `${formattedNumber} руб.`;
};
