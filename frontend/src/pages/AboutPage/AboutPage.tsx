import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import bannersConfig from "@/configs/banners.json";
import { ContentPreloader } from "@/features";
import { useMarkdown } from "@/shared/hooks";
import { MainBanner } from "@/shared/ui";

import "./AboutPage.scss";

/**
 * Компонент страницы «О магазине».
 */
export default function AboutPage() {
	const { mdContent, mdLoading, mdError } = useMarkdown("./md/about.md");

	if (mdLoading) return <ContentPreloader />;
	if (mdError) return <p>{mdError}</p>;

	return (
		<>
			<MainBanner banners={bannersConfig.main} />

			<section className="about-section pt-4rem pb-2rem">
				<h2 className="text-center">О магазине</h2>

				<div className="about-section__content">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{mdContent}</ReactMarkdown>
				</div>
			</section>
		</>
	);
}
