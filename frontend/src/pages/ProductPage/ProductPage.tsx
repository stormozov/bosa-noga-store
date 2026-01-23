import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useApiGet } from "@/api";
import bannersConfig from "@/configs/banners.json";
import { useCart } from "@/features/cart";
import { ContentPreloader } from "@/features/Preloader";
import {
	type IProduct,
	ProductCountSelector,
	ProductSizesList,
} from "@/features/product";
import { MainBanner, TwoColumnTable } from "@/shared/ui";

import "./ProductPage.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Компонент страницы товара.
 */
export default function ProductPage() {
	const [activeSize, setActiveSize] = useState<string | null>(null);
	const [productCount, setProductCount] = useState(1);

	const navigate = useNavigate();
	const {
		actions: { addToCart },
	} = useCart();
	const { id } = useParams();

	const { data, loading } = useApiGet<IProduct>(
		`${API_BASE_URL}/api/items/${id}`,
	);

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

	const handleCountChange = (newCount: number) => setProductCount(newCount);

	const handleAddToCart = () => {
		if (!activeSize) return;

		addToCart({
			id: Number(id),
			title: data?.title || "",
			size: activeSize,
			price: data?.price || 0,
			count: productCount,
		});

		navigate("/cart");
	};

	return (
		<>
			<MainBanner banners={bannersConfig.main} />
			<section className="product-page pt-4rem pb-2rem">
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
								<div className="product-page__details">
									<TwoColumnTable data={prepareProductDetails(data)} />

									<ProductSizesList
										sizes={data?.sizes || []}
										activeSize={activeSize}
										onClick={setActiveSize}
									/>

									{activeSize && (
										<>
											<ProductCountSelector
												currentCount={productCount}
												handleCountChange={handleCountChange}
											/>
											<button
												type="button"
												className="btn btn-danger btn-block btn-lg"
												onClick={handleAddToCart}
											>
												В корзину
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					</>
				)}
			</section>
		</>
	);
}
