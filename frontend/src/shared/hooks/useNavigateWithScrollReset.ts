import { useCallback } from "react";
import { type NavigateOptions, useNavigate } from "react-router";

/**
 * Кастомный хук для навигации с автоматическим сбросом позиции скролла.
 *
 * Оборачивает стандартный `useNavigate` из React Router, добавляя
 * плавную прокрутку к верху страницы перед выполнением навигации.
 *
 * @returns Функция навигации с сигнатурой, идентичной `navigate` 
 * из React Router, но с автоматическим сбросом скролла.
 *
 * @example
 * ```tsx
 * import { useNavigateWithScrollReset } from '@/hooks';
 *
 * const MyComponent = () => {
 *   const navigate = useNavigateWithScrollReset();
 *
 *   const handleClick = () => {
 *     navigate('/about', { replace: false });
 *   };
 *
 *   return <button onClick={handleClick}>Перейти</button>;
 * };
 * ```
 *
 * @see {@link https://reactrouter.com/en/main/hooks/use-navigate React Router useNavigate}
 */
export const useNavigateWithScrollReset = () => {
	const navigate = useNavigate();

	return useCallback(
		(to: string, options?: NavigateOptions) => {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			navigate(to, options);
		},
		[navigate],
	);
};
