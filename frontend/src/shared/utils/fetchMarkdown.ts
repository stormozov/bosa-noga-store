/**
 * Асинхронная функция для загрузки Markdown-файла по указанному пути.
 *
 * Выполняет HTTP-запрос к заданному URL и возвращает содержимое файла в виде
 * строки. Если ответ сервера неуспешен (статус не в диапазоне 200-299),
 * выбрасывает ошибку с детализацией статуса и пути.
 *
 * @param {string} path - Путь или URL к Markdown-файлу
 * (например, `/content/about.md`).
 * @returns {Promise<string>} Промис, который разрешается в текстовое содержимое
 * Markdown-файла.
 * @throws {Error} Выбрасывает ошибку, если запрос завершился неудачно.
 *
 * @example
 * try {
 *   const mdText = await fetchMarkdown("/docs/instructions.md");
 *   console.log(mdText);
 * } catch (error) {
 *   console.error("Ошибка загрузки:", error.message);
 * }
 */
export const fetchMarkdown = async (path: string): Promise<string> => {
	const response = await fetch(path);
	const { ok, status, statusText } = response;

	if (ok) return response.text();

	throw new Error(
		`Failed to load markdown from ${path}: ${status} ${statusText}`,
	);
};
