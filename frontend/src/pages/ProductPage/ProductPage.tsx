import { useParams } from "react-router";

import { useApiGet } from "@/api";
import bannersConfig from "@/configs/banners.json";
import { ContentPreloader, type IProduct } from "@/features";
import { MainBanner } from "@/shared/ui";

import "./ProductPage.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductPage() {
	const { id } = useParams();

	const { data, loading } = useApiGet<IProduct>(
		`${API_BASE_URL}/api/items/${id}`,
	);

	const { title, images } = data || {};

	return (
		<>
			<MainBanner banners={bannersConfig.main} />
			<section className="product-page pt-4rem">
				{loading && <ContentPreloader />}
				{!loading && data && (
					<>
						<h2 className="text-center">{title}</h2>
						<div className="row">
							<div className="col-5">
								<img src={images?.[0]} alt={title} className="img-fluid" />
							</div>
							<div className="col-7"></div>
						</div>
					</>
				)}
			</section>
		</>
	);
}
