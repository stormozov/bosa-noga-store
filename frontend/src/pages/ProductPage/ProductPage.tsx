import { useState } from "react";
import { useParams } from "react-router";

import { useApiGet } from "@/api";
import bannersConfig from "@/configs/banners.json";
import { ContentPreloader, type IProduct, ProductSizesList } from "@/features";
import { MainBanner, TwoColumnTable } from "@/shared/ui";

import "./ProductPage.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductPage() {
	const [activeSize, setActiveSize] = useState<string | null>(null);
	const { id } = useParams();

	const { data, loading } = useApiGet<IProduct>(
		`${API_BASE_URL}/api/items/${id}`,
	);

	console.log(activeSize);

	const prepareProductDetails = (product: IProduct) => {
		return {
			Артикул: product.sku,
			Производитель: product.manufacturer,
			Цвет: product.color,
			Материалы: product.material,
			Сезон: product.season,
			Повод: product.reason,
		};
	};

	return (
		<>
			<MainBanner banners={bannersConfig.main} />
			<section className="product-page pt-4rem">
				{loading && <ContentPreloader />}
				{!loading && data && (
					<>
						<h2 className="text-center">{data.title}</h2>
						<div className="row">
							<div className="col-5">
								<img
									src={data.images[0]}
									alt={data.title}
									className="img-fluid"
								/>
							</div>
							<div className="col-7">
								<TwoColumnTable data={prepareProductDetails(data)} />
								<ProductSizesList sizes={data?.sizes || []} activeSize={activeSize} onClick={setActiveSize} />
							</div>
						</div>
					</>
				)}
			</section>
		</>
	);
}
