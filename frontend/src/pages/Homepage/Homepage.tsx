import bannersConfig from "@/configs/banners.json";
import { ContentPreloader } from "@/features/Preloader";
import { MainBanner } from "@/shared/ui";

import "./Homepage.scss";

/**
 * Компонент главной страницы
 */
export default function Homepage() {
	return (
		<>
			<MainBanner banners={bannersConfig.main} />

			<section className="top-sales-section min-height-300 pt-4rem">
				<h2 className="text-center">Хиты продаж!</h2>
				<ContentPreloader />
			</section>

			<section className="catalog-section min-height-300 pt-4rem">
				<h2 className="text-center">Каталог</h2>
				<ContentPreloader />
			</section>
		</>
	);
}
