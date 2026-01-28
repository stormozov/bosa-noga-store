import { NavLink } from "react-router";

import "./HeaderLogo.scss";

const basename = import.meta.env.VITE_BASENAME;

export default function HeaderLogo() {
	return (
		<NavLink to="/" className="header-logo">
			<img src={`${basename}img/header/header-logo.png`} alt="Bosa Noga" />
		</NavLink>
	);
}
