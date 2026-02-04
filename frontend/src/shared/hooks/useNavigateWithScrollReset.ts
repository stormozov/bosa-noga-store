import { useCallback } from "react";
import { type NavigateOptions, useNavigate } from "react-router";

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
