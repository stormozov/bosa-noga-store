import { NavLink } from "react-router";
import "./NavList.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link NavHeader}.
 */
interface INavListProps {
	links: Record<string, string>;
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
					<NavLink to={link} className="nav-link">
						{links[link]}
					</NavLink>
				</li>
			))}
		</ul>
	);
}
