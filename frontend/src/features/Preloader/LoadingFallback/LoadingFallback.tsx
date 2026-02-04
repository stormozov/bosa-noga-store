import classNames from "classnames";

import "./LoadingFallback.scss";

/**
 * Допустимые размеры индикатора загрузки.
 */
type LoadingSize = "small" | "medium" | "large";

interface ILoadingFallbackProps {
	message?: string;
	size?: LoadingSize;
}

/**
 * Компонент-заглушка, отображающий индикатор загрузки и опциональное сообщение.
 * ```
 */
export const LoadingFallback = ({
	message = "Загрузка...",
	size = "medium",
}: ILoadingFallbackProps) => {
	return (
		<div className="loading-fallback d-flex flex-column align-items-center justify-content-center">
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
