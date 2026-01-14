import classNames from "classnames";
import { isValidUrl } from "@/shared/utils";
import type { IPaySystemProps } from "./types";

/**
 * Интерфейс, описывающий свойства компонента {@link PaySystemItem}.
 */
interface IPaySystemItemProps {
	system: IPaySystemProps;
}

/**
 * Компонент отображения логотипа платежной системы.
 *
 * Отображает элемент платежной системы либо как ссылку (если указана внешняя 
 * ссылка), либо как статичный элемент. Используется в блоке списка 
 * поддерживаемых платежных систем. Стилизация применяется на основе имени 
 * системы, преобразованного в нижний регистр.
 *
 * @example
 * // Отобразит Visa как ссылку (тег `a`)
 * <PaySystemItem system={{ displayName: "Visa", link: "https://visa.com" }} />
 *
 * @example
 * // Отобразит Mir как статичный элемент (тег `div`)
 * <PaySystemItem system={{ displayName: "Mir", link: "" }} />
 */
export function PaySystemItem({ system }: IPaySystemItemProps) {
	const className = classNames(
		"pay-systems__item",
		system.displayName.toLowerCase(),
	);

	const ariaLabel = `Платежная система ${system.displayName}`;

	if (isValidUrl(system.link)) {
		return (
			<a
				className={className}
				href={system.link}
				target="_blank"
				rel="noopener noreferrer"
				title={ariaLabel}
				aria-label={ariaLabel}
			>
				<span className="sr-only">{ariaLabel}</span>
			</a>
		);
	}

	return (
		<div
			className={className}
			role="img"
			title={ariaLabel}
			aria-label={ariaLabel}
		/>
	);
}

