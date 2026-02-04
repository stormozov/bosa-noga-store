import { Outlet } from "react-router";

import "./PageMain.scss";

export default function PageMain() {
	return (
		<main className="page-main">
			<div className="container">
				<Outlet />
			</div>
		</main>
	);
}
