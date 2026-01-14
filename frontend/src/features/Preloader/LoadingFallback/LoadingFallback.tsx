import classNames from "classnames";
import "./LoadingFallback.scss";

/**
 * Допустимые размеры индикатора загрузки.
 */
type LoadingSize = "small" | "medium" | "large";

/**
 * Интерфейс, описывающий свойства компонента `LoadingFallback`.
 */
interface ILoadingFallbackProps {
	message?: string;
	size?: LoadingSize;
}

/**
 * Компонент-заглушка, отображающий индикатор загрузки и опциональное сообщение.
 *
 * Используется в качестве `fallback` в `React.Suspense` или при ожидании данных.
 *
 * @example
 * ```tsx
 * <LoadingFallback message="Загружаем данные..." size="large" />
 * ```
 */
export const LoadingFallback = ({
	message = "Загрузка...",
	size = "medium",
}: ILoadingFallbackProps) => {
	return (
		<div className="loading-fallback">
			<div
				className={classNames(
					"loading-fallback__spinner",
					`loading-fallback__spinner--${size}`,
				)}
			></div>
			{message && <p className="loading-fallback__message">{message}</p>}
		</div>
	);
};
