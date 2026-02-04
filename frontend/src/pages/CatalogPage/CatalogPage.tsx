import bannersConfig from "@/configs/banners.json";
import { CatalogSection } from "@/features";
import { MainBanner } from "@/shared/ui";

import "./CatalogPage.scss";

export default function CatalogPage() {
	return (
		<>
			<MainBanner banners={bannersConfig.main} />
			<CatalogSection />
		</>
	);
}
