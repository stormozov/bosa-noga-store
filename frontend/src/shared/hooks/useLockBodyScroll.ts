import {
	clearAllBodyScrollLocks,
	disableBodyScroll,
	enableBodyScroll,
} from "body-scroll-lock";
import { useEffect } from "react";

/**
 * Кастомный хук для блокировки прокрутки целевого элемента.
 *
 * @dependency Требует установленную библиотеку `body-scroll-lock`.
 * @see {@link https://github.com/willmcpo/body-scroll-lock} - Документация
 * body-scroll-lock
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
