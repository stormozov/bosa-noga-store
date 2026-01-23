import { Link } from "react-router";

import bannersConfig from "@/configs/banners.json";
import { CartTable, useCart } from "@/features/cart";
import { MainBanner } from "@/shared/ui";

import "./CartPage.scss";

const TABLE_HEADERS = [
	"#",
	"Название",
	"Размер",
	"Кол-во",
	"Стоимость",
	"Итого",
	"Действия",
];

/**
 * Компонент страницы корзины.
 */
export default function CartPage() {
	const {
		states: { items, isEmpty },
	} = useCart();

	return (
		<>
			<MainBanner banners={bannersConfig.main} />

			<section className="cart-section pt-4rem pb-2rem">
				<h2 className="text-center">{isEmpty ? "Корзина пуста" : "Корзина"}</h2>

				{isEmpty && (
					<Link
						to="/catalog"
						className="btn btn-ghost d-flex justify-content-center"
					>
						Вернуться в каталог
					</Link>
				)}

				{!isEmpty && <CartTable headers={TABLE_HEADERS} items={items} />}
			</section>
		</>
	);
}
