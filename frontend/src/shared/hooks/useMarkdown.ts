import { useEffect, useState } from "react";

import { fetchMarkdown } from "@/shared/utils";

type MdError = string | null;

interface IUseMarkdownReturn {
	mdContent: string;
	mdLoading: boolean;
	mdError: MdError;
}

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
