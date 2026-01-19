import classNames from "classnames";

import { ButtonLoading } from "@/features/Preloader";

import "./LoadMoreButton.scss";

/**
 * Интерфейс, описывающий конфигурацию кнопки "Загрузить ещё".
 */
interface ILoadMoreButtonConfig {
	/**
	 * Флаг, указывающий, находится ли кнопка в состоянии загрузки.
	 */
	isLoading: boolean;

	/**
	 * Флаг, определяющий, есть ли ещё данные для загрузки.
	 * Если `false`, кнопка не отображается.
	 */
	hasMore: boolean;

	/**
	 * Флаг, блокирующий кнопку. Необязательный параметр.
	 * Может использоваться для предотвращения повторных кликов.
	 *
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Текст кнопки, отображаемый при отсутствии загрузки. Необязательный параметр.
	 *
	 * @default "Загрузить ещё"
	 */
	label?: string;

	/**
	 * Обработчик события клика по кнопке.
	 * Вызывается, когда пользователь нажимает на кнопку (если она не заблокирована).
	 */
	onClick: () => void;
}

/**
 * Интерфейс, описывающий свойства компонента {@link LoadMoreButton}.
 */
interface ILoadMoreButtonProps {
	/**
	 * Объект конфигурации, определяющий поведение и состояние кнопки.
	 *
	 * @see {@link ILoadMoreButtonConfig}
	 */
	config: ILoadMoreButtonConfig;

	/**
	 * Дополнительный CSS-класс, применяемый к кнопке для кастомизации стиля.
	 * Необязательный параметр.
	 */
	className?: string;
}

/**
 * Компонент кнопки "Загрузить ещё" для постраничной подгрузки контента.
 *
 * Отображает кнопку, которая позволяет загрузить следующую порцию данных.
 * Скрывается, если больше нет элементов для загрузки (`hasMore === false`).
 *
 * @example
 * <LoadMoreButton
 *   config={{
 *     isLoading: false,
 *     hasMore: true,
 *     onClick: handleLoadMore,
 *   }}
 *   className="custom-class"
 * />
 *
 * @remarks
 * - Использует `aria-busy` для доступности: указывает скринридерам,
 *   что кнопка занята.
 * - При загрузке отображается компонент `ButtonLoading` вместо текста.
 * - Если `hasMore` равно `false`, компонент ничего не возвращает.
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
