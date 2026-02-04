import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import "./ScrollToTopButton.scss";

const SCROLL_THRESHOLD = 300;
const BUTTON_LABEL = "Прокрутить страницу наверх";

const ANIMATION_VARIANTS = {
	initial: { opacity: 0, scale: 0 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0 },
};

const ANIMATION_TRANSITION: Transition = {
	duration: 0.25,
	ease: "linear",
};

/**
 * Интерфейс, описывающий свойства компонента {@link ScrollToTopButton}.
 */
interface IScrollToTopButtonProps {
	/**
	 * Пороговое значение прокрутки (в пикселях), при превышении которого
	 * кнопка становится видимой.
	 */
	threshold?: number;

	/** Текст для атрибута aria-label кнопки (доступность). */
	buttonLabel?: string;
}

/**
 * Компонент кнопки «Наверх».
 *
 * Отображает кнопку, которая появляется при прокрутке страницы ниже заданного
 * порога. При клике плавно прокручивает страницу к верху и убирает кнопку.
 *
 * @remark
 * Использует {@link [framer-motion](https://www.npmjs.com/package/framer-motion)}
 * для анимации появления/скрытия;
 */
export function ScrollToTopButton({
	threshold = SCROLL_THRESHOLD,
	buttonLabel = BUTTON_LABEL,
}: IScrollToTopButtonProps) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = useCallback(() => {
		const isScrolled = window.scrollY > threshold;
		if (isScrolled !== isVisible) setIsVisible(isScrolled);
	}, [isVisible, threshold]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, [toggleVisibility]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					key="scroll-to-top"
					type="button"
					className="scroll-to-top-button"
					tabIndex={0}
					aria-label={buttonLabel}
					onClick={scrollToTop}
					// Атрибуты для анимации framer-motion
					{...ANIMATION_VARIANTS}
					transition={ANIMATION_TRANSITION}
				>
					↑
				</motion.button>
			)}
		</AnimatePresence>
	);
}
