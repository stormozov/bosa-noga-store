import { AnimatePresence, motion, type Variants } from "framer-motion";

import type { ProductCardType } from "@/features/product/types";
import { ProductCard } from "../ProductCard";

import "./AnimatedProductList.scss";

/**
 * Объект анимационных вариантов для карточек товаров, используемый 
 * с Framer Motion.
 *
 * Определяет состояния "скрыто", "видимо" и "выход" с плавными переходами.
 * Поддерживает последовательную анимацию появления элементов с задержкой.
 *
 * @example
 * const cardVariants: Variants = {
 *   hidden: { opacity: 0, y: 20, scale: 0.95 },
 *   visible: (index: number) => ({ ... }),
 *   exit: { ... },
 * };
 * 
 * <motion.div
 *   custom={index}
 *   variants={cardVariants}
 *   initial="hidden"
 *   animate="visible"
 *   exit="exit"
 * />
 */
const cardVariants: Variants = {
	/**
	 * Состояние, в котором карточка скрыта (начальное или при удалении).
	 * Элемент прозрачен и смещен вниз с уменьшением масштаба.
	 */
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},

	/**
	 * Состояние, в котором карточка отображается.
	 * 
	 * Анимация зависит от индекса элемента для эффекта последовательного 
	 * появления.
	 */
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			delay: index * 0.05,
			duration: 0.3,
			ease: "easeOut",
		},
	}),

	/**
	 * Состояние анимации при удалении карточки из DOM.
	 * Элемент плавно исчезает и смещается вверх.
	 */
	exit: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.2,
		},
	},
};

/**
 * Интерфейс пропсов для компонента {@link AnimatedProductList}.
 *
 * Определяет входные данные, необходимые для отображения списка товаров
 * с плавной анимацией при подгрузке новых элементов.
 */
interface IAnimatedProductListProps {
	/**
	 * Массив объектов товаров, которые необходимо отобразить.
	 *
	 * Каждый товар должен соответствовать типу {@link ProductCardType}.
	 */
	products: ProductCardType[];
}

/**
 * Анимированный список товаров с плавным появлением новых карточек.
 *
 * @remarks
 * - Новые карточки появляются с плавной анимацией
 * - Последовательное появление элементов (stagger effect)
 * - Поддержка удаления элементов с анимацией
 * - Адаптивное поведение при загрузке дополнительных товаров
 * 
 * @see {@link IAnimatedProductListProps}
 */
export const AnimatedProductList = ({
	products,
}: IAnimatedProductListProps) => {
	return (
		<AnimatePresence>
			<motion.div
				className="animated-product-list"
				layout
				transition={{ duration: 0.2 }}
			>
				<div className="row">
					{products.map((product, index) => (
						<div key={product.id} className="col-4">
							<motion.div
								custom={index}
								variants={cardVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								layout
								className="animated-product-list__item h-100"
							>
								<ProductCard product={product} />
							</motion.div>
						</div>
					))}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};
