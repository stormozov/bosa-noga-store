import { Outlet } from "react-router";
import "./PageMain.scss";

/**
 * Компонент основного содержимого страницы.
 *
 * Представляет собой контейнер для основного контента страницы. Используется 
 * как корневой элемент для размещения динамического контента, подгружаемого 
 * через маршрутизацию (React Router).
 */
export default function PageMain() {
	return (
		<main className="page-main">
			<div className="container">
				<Outlet />
			</div>
		</main>
	);
}
