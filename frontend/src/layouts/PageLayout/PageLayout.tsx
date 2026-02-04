import { PageFooter, PageHeader, PageMain } from "@/layouts";
import { ScrollToTopButton } from "@/shared/ui";

import "./PageLayout.scss";

export default function PageLayout() {
	return (
		<div className="page-layout">
			<PageHeader />
			<PageMain />
			<PageFooter />
			<ScrollToTopButton />
		</div>
	);
}
