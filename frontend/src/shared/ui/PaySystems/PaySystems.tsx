import { PaySystemItem } from "./PaySystemItem";
import type { IPaySystemProps } from "./types";

import "./PaySystems.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link PaySystems}.
 */
interface IPaySystemsProps {
	systems: IPaySystemProps[];
}

/**
 * Компонент списка платежных систем.
 *
 * Отображает коллекцию доступных платежных систем, фильтруя только видимые
 * элементы (у которых `visible === true`). Каждая система рендерится через
 * компонент {@link PaySystemItem}.
 *
 * @example
 * const systems: IPaySystemProps[] = [
 *   { displayName: "Visa", link: "https://visa.com", visible: true },
 *   { displayName: "Qiwi", link: "", visible: false }
 * ]
 *
 * <PaySystems systems={systems} /> // отобразит только Visa, т.к. Qiwi скрыт
 */
export function PaySystems({ systems }: IPaySystemsProps) {
	const visibleSystems = systems.filter((system) => system.visible);

	return (
		<div className="pay-systems">
			{visibleSystems.map((system) => (
				<PaySystemItem key={system.displayName} system={system} />
			))}
		</div>
	);
}
