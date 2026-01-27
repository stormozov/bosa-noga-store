import classNames from "classnames";

import { isValidUrl } from "@/shared/utils";

import "./SocialsList.scss";

/**
 * Интерфейс, описывающий свойства одной социальной сети.
 */
interface ISocialItem {
	/** Название социальной сети */
	displayName: string;

	/** Ссылка на социальную сеть */
	link: string;

	/** Видимость социальной сети */
	visible: boolean;
}

/**
 * Интерфейс, описывающий свойства компонента {@link SocialsList}.
 */
interface ISocialsListProps {
	/** Список социальных сетей */
	socials: ISocialItem[];
}

/**
 * Компонент списка социальных сетей.
 *
 * Отображает список иконок социальных сетей. Каждая иконка ведёт на внешнюю
 * ссылку, если она валидна; в противном случае отображается как статичный
 * элемент.
 *
 * @example
 * <SocialsList socials={[
 *   { displayName: "Telegram", link: "https://t.me/example" },
 *   { displayName: "VK", link: "" }
 * ]} />
 */
export function SocialsList({ socials }: ISocialsListProps) {
	return (
		<ul className="socials-list d-flex justify-content-end">
			{socials.map(({ displayName, link, visible }) => {
				if (!visible) return null;

				const iconClass = classNames(
					"socials-list__icon",
					displayName.toLowerCase(),
				);

				return (
					<li key={displayName} className="socials-list__item">
						{isValidUrl(link) ? (
							<a
								href={link}
								className="socials-list__link"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className={iconClass} />
							</a>
						) : (
							<div className={iconClass} />
						)}
					</li>
				);
			})}
		</ul>
	);
}
