import { useCallback, useState } from "react";
import { Link } from "react-router";

import bannersConfig from "@/configs/banners.json";
import { CartOrderForm, CartTable, useCart } from "@/features/cart";
import { useNavigateWithScrollReset } from "@/shared/hooks";
import { MainBanner, Modal } from "@/shared/ui";

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

const getRandomOrderNumber = () => Math.floor(Math.random() * 1000);

/**
 * Компонент страницы корзины.
 */
export default function CartPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigateWithScrollReset();

	const {
		states: { items, isEmpty },
	} = useCart();

	const handleSubmit = useCallback(() => setIsModalOpen(true), []);

	const handleModalClose = useCallback(() => {
		setIsModalOpen(false);
		navigate("/");
	}, [navigate]);

	return (
		<>
			<MainBanner banners={bannersConfig.main} />

			<section className="cart-section pt-4rem">
				<h2 className="text-center">{isEmpty ? "Корзина пуста" : "Корзина"}</h2>

				{isEmpty && (
					<Link
						to="/catalog"
						className="btn btn-ghost mb-5 d-flex justify-content-center"
					>
						Вернуться в каталог
					</Link>
				)}

				{!isEmpty && <CartTable headers={TABLE_HEADERS} items={items} />}
			</section>

			{!isEmpty && (
				<section className="cart-order-section pt-4rem pb-2rem">
					<h2 className="text-center">Оформить заказ</h2>
					<CartOrderForm handleSubmit={handleSubmit} />
				</section>
			)}

			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleModalClose}>
					<p>Заказ (#{getRandomOrderNumber()}) оформлен. Спасибо за покупку!</p>
				</Modal>
			)}
		</>
	);
}
