import classNames from "classnames";
import { NavLink } from "react-router";

import "./NavList.scss";

interface INavListProps {
	links: Record<string, string>;
	classes?: string;
}

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
