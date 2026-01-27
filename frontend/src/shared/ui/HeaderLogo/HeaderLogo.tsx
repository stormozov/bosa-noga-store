import { NavLink } from "react-router";

import "./HeaderLogo.scss";

export default function HeaderLogo() {
	return (
		<NavLink to="/" className="header-logo">
			<img src="/img/header/header-logo.png" alt="Bosa Noga" />
		</NavLink>
	);
}
