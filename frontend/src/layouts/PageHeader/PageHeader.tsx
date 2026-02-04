import navConfigs from "@/configs/nav.json";
import { CartWidget } from "@/features/cart";
import { SearchWidget } from "@/features/search";
import { HeaderLogo, NavList } from "@/shared/ui";

import "./PageHeader.scss";

export default function PageHeader() {
	const { links: navLinks, visible: navVisible } = navConfigs.header;

	return (
		<header className="header container">
			<div className="row">
				<div className="col">
					<nav className="navbar navbar-expand-sm navbar-light bg-light">
						<div className="navbar-brand">
							<HeaderLogo />
						</div>

						<div className="collapse navbar-collapse" id="navbarMain">
							{navVisible && Object.keys(navLinks).length > 0 && (
								<NavList links={navLinks} classes="navbar-nav mr-auto" />
							)}

							<div className="header-controls">
								<div className="header-controls__widgets">
									<SearchWidget classes="header-controls__widget" />
									<CartWidget classes="header-controls__widget" />
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
