import {
	clearAllBodyScrollLocks,
	disableBodyScroll,
	enableBodyScroll,
} from "body-scroll-lock";
import { useEffect } from "react";

/**
 * Кастомный хук для блокировки прокрутки целевого элемента (или всего документа).
 *
 * Использует библиотеку `body-scroll-lock` для управления прокруткой.
 *
 * @param lock - Флаг активации блокировки прокрутки. При `true` — прокрутка
 * блокируется, при `false` — разблокируется.
 * @param targetRef - Опциональная ссылка на DOM-элемент, прокрутку которого
 * нужно заблокировать. Если не указана, блокируется прокрутка `document.body`.
 *
 * @remarks
 * - Автоматически очищает блокировку при размонтировании компонента или
 * изменении зависимостей.
 * - Сохраняет ширину полосы прокрутки предотвращая сдвиг макета.
 *
 * @example
 * ```tsx
 * // Блокировка прокрутки body при открытии модалки
 * const Modal = ({ isOpen }) => {
 *   useLockBodyScroll(isOpen);
 *   return isOpen ? <div className="modal">...</div> : null;
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Блокировка прокрутки конкретного элемента
 * const ScrollablePanel = () => {
 *   const panelRef = useRef<HTMLDivElement>(null);
 *   useLockBodyScroll(true, panelRef);
 *   return <div ref={panelRef} style={{ overflow: 'auto' }}>...</div>;
 * };
 * ```
 *
 * @dependency Требует установленную библиотеку `body-scroll-lock`.
 * @see {@link https://github.com/willmcpo/body-scroll-lock} - Документация
 * body-scroll-lock
 * @effect Вызывает побочные эффекты: изменяет стили целевого элемента и body.
 */
export const useLockBodyScroll = (
	lock: boolean,
	targetRef?: React.RefObject<HTMLElement>,
) => {
	useEffect(() => {
		if (!lock) return;

		const target = targetRef?.current || document.body;
		disableBodyScroll(target, { reserveScrollBarGap: true });

		return () => {
			enableBodyScroll(target);
			clearAllBodyScrollLocks();
		};
	}, [lock, targetRef]);
};
