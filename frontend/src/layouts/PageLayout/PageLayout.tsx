import { PageFooter, PageHeader, PageMain } from "@/layouts";
import "./PageLayout.scss";

/**
 * Основной компонент структуры страницы.
 *
 * Формирует каркас приложения, включающий шапку, основное содержимое и подвал.
 * Является корневым компонентом для отображения общей структуры интерфейса.
 * Внутри использует {@link PageHeader}, {@link PageMain} и {@link PageFooter}
 * для построения макета.
 */
export default function PageLayout() {
	return (
		<div className="page-layout">
			<PageHeader />
			<PageMain />
			<PageFooter />
		</div>
	);
}
