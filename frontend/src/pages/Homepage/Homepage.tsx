import bannersConfig from "@/configs/banners.json";
import { CatalogSection, HitsSection } from "@/features";
import { MainBanner } from "@/shared/ui";

import "./Homepage.scss";

/**
 * Компонент главной страницы
 */
export default function Homepage() {
	return (
		<>
			<MainBanner banners={bannersConfig.main} />
			<HitsSection />
			<CatalogSection />
		</>
	);
}
