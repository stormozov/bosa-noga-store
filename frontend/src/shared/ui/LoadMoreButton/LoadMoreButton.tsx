import classNames from "classnames";

import { ButtonLoading } from "@/features/Preloader";

import "./LoadMoreButton.scss";

/**
 * Интерфейс, описывающий конфигурацию кнопки "Загрузить ещё".
 */
interface ILoadMoreButtonConfig {
	isLoading: boolean;
	hasMore: boolean;
	disabled?: boolean;
	label?: string;

	onClick: () => void;
}

/**
 * Интерфейс, описывающий свойства компонента {@link LoadMoreButton}.
 */
interface ILoadMoreButtonProps {
	config: ILoadMoreButtonConfig;
	className?: string;
}

/**
 * Компонент кнопки "Загрузить ещё" для постраничной подгрузки контента.
 *
 * Отображает кнопку, которая позволяет загрузить следующую порцию данных.
 * Скрывается, если больше нет элементов для загрузки (`hasMore === false`).
 */
export function LoadMoreButton({
	config: {
		isLoading,
		hasMore,
		disabled = false,
		label = "Загрузить ещё",
		onClick,
	},
	className = "",
}: ILoadMoreButtonProps) {
	if (!hasMore) return null;

	return (
		<button
			type="button"
			className={classNames("btn btn-ghost", className)}
			disabled={disabled || isLoading}
			aria-busy={isLoading}
			onClick={onClick}
		>
			{isLoading ? <ButtonLoading /> : label}
		</button>
	);
}
