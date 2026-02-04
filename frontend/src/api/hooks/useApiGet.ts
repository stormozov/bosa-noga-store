import { useCallback, useEffect, useRef, useState } from "react";

import { get } from "../core";
import type { IApiOptions, IUseGetReturns } from "../types";

export const useApiGet = <T>(
	url: string | null,
	options?: IApiOptions,
): IUseGetReturns<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const isMounted = useRef(true);

	const fetchData = useCallback(async () => {
		if (!url) {
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const result = await get<T>(url, options);
			if (isMounted.current) {
				setData(result);
				setError(null);
			}
		} catch (err) {
			if (isMounted.current) {
				setError(err instanceof Error ? err : new Error("Неизвестная ошибка"));
			}
		} finally {
			if (isMounted.current) setLoading(false);
		}
	}, [url, options]);

	useEffect(() => {
		isMounted.current = true;
		fetchData();

		return () => {
			isMounted.current = false;
		};
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
};
