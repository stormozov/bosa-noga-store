import { useEffect, useState } from "react";
import { fetchMarkdown } from "@/shared/utils";

/**
 * Тип, описывающий возможные значения ошибки загрузки контента.
 */
type MdError = string | null;

/**
 * Интерфейс, описывающий возвращаемые значения хука {@link useMarkdown}.
 */
interface IUseMarkdownReturn {
	/**
	 * Строка с загруженным Markdown-контентом (или пустая строка).
	 */
	mdContent: string;

	/**
	 * Флаг, указывающий на состояние загрузки.
	 */
	mdLoading: boolean;

	/**
	 * Сообщение об ошибке, если загрузка не удалась, иначе `null`.
	 */
	mdError: MdError;
}

/**
 * Хук для асинхронной загрузки и обработки Markdown-контента.
 *
 * Загружает Markdown-файл по указанному URL, устанавливает состояние загрузки,
 * обрабатывает ошибки и обеспечивает безопасное обновление состояния
 * даже при размонтировании компонента (через флаг `isMounted`).
 *
 * @param {string} url - URL Markdown-файла, который необходимо загрузить.
 *        Должен вести к доступному `.md` файлу.
 *
 * @returns {IUseMarkdownReturn} Объект с тремя значениями:
 * - `mdContent`: строка с загруженным Markdown-контентом (или пустая строка).
 * - `mdLoading`: флаг, указывающий на состояние загрузки.
 * - `mdError`: сообщение об ошибке, если загрузка не удалась, иначе `null`.
 *
 * @example
 * const { mdContent, mdLoading, mdError } = useMarkdown("/content/information.md");
 *
 * if (mdLoading) return <ContentPreloader />;
 * if (mdError) return <ErrorMessage message={mdError} />;
 * return <ReactMarkdown>{mdContent}</ReactMarkdown>;
 */
export const useMarkdown = (url: string): IUseMarkdownReturn => {
	const [mdContent, setMdContent] = useState<string>("");
	const [mdLoading, setMdLoading] = useState<boolean>(true);
	const [mdError, setMdError] = useState<MdError>(null);

	useEffect(() => {
		let isMounted = true;

		const load = async () => {
			try {
				const md = await fetchMarkdown(url);
				if (isMounted) {
					setMdContent(md);
					setMdError(null);
				}
			} catch (err) {
				if (isMounted) {
					setMdError("Ошибка загрузки контента.");
					console.error(err);
				}
			} finally {
				if (isMounted) setMdLoading(false);
			}
		};

		load();

		return () => {
			isMounted = false;
		};
	}, [url]);

	return { mdContent, mdLoading, mdError };
};
