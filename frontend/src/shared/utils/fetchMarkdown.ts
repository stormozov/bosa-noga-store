/**
 * Асинхронная функция для загрузки Markdown-файла по указанному пути.
 */
export const fetchMarkdown = async (path: string): Promise<string> => {
	const response = await fetch(path);
	const { ok, status, statusText } = response;

	if (ok) return response.text();

	throw new Error(
		`Failed to load markdown from ${path}: ${status} ${statusText}`,
	);
};
