import bannersConfig from "@/configs/banners.json";
import { MainBanner } from "@/shared/ui";

import "./PageNotFound.scss";

/**
 * Компонент страницы 404.
 */
export default function PageNotFound() {
	return (
		<>
			<MainBanner banners={bannersConfig.main} />

			<section className="page-not-found-section min-height-300 pt-4rem pb-2rem text-center">
				<h1>Страница не найдена</h1>
				<p>Извините, такая страница не найдена!</p>
			</section>
		</>
	);
}
