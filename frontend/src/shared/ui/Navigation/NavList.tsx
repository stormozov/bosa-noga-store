import classNames from "classnames";
import { NavLink } from "react-router";

import "./NavList.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link NavHeader}.
 */
interface INavListProps {
	/** Ссылки навигации, которые нужно отобразить */
	links: Record<string, string>;

	/** Дополнительные классы */
	classes?: string;
}

/**
 * Компонент навигации в шапке страницы.
 */
export function NavList({ links, classes }: INavListProps) {
	return (
		<ul className={classes}>
			{Object.keys(links).map((link) => (
				<li key={link} className="nav-item">
					<NavLink
						to={link}
						className={({ isActive }) =>
							classNames("nav-link", {
								active: isActive,
								disabled: isActive,
							})
						}
					>
						{links[link]}
					</NavLink>
				</li>
			))}
		</ul>
	);
}
