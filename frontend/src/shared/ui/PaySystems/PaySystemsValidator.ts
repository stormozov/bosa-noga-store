import type { IPaySystemProps, IPaySystemsVariants } from "./types";

const VALID_SYSTEMS = new Set<IPaySystemsVariants>([
	"PayPal",
	"Visa",
	"MasterCard",
	"Yandex",
	"WebMoney",
	"Qiwi",
]);

/**
 * Проверяет, является ли переданная строка допустимым значением платежной
 * системы.
 * ```
 */
export const isValidPaySystemVariant = (
	str: string,
): str is IPaySystemsVariants => {
	return VALID_SYSTEMS.has(str as IPaySystemsVariants);
};

/**
 * Преобразует переданные данные в массив объектов типа {@link IPaySystemProps}.
 *
 * Выполняет строгую валидацию структуры и значений:
 * - Проверяет, что входные данные — это массив.
 * - Каждый элемент должен быть объектом с полями:
 *   - `displayName` (строка, входящая в {@link IPaySystemsVariants}),
 *   - `link` (строка),
 *   - `visible` (булево значение).
 * ```
 */
export const parsePaySystems = (data: unknown): IPaySystemProps[] => {
	if (!Array.isArray(data)) throw new Error("Expected an array");

	return data.map((item) => {
		if (
			typeof item !== "object" ||
			item === null ||
			typeof item.displayName !== "string" ||
			typeof item.link !== "string" ||
			typeof item.visible !== "boolean"
		) {
			throw new Error("Invalid pay system item structure");
		}

		if (!isValidPaySystemVariant(item.displayName)) {
			throw new Error(`Invalid displayName: ${item.displayName}`);
		}

		return {
			displayName: item.displayName,
			link: item.link,
			visible: item.visible,
		};
	});
};
