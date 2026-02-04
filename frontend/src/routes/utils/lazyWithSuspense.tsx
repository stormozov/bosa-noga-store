import { lazy, Suspense } from "react";

import { LoadingFallback } from "@/features/Preloader";

interface ILoaderPromise {
	default: React.ComponentType;
}

type LoaderType = () => Promise<ILoaderPromise>;

export const lazyWithSuspense = (loader: LoaderType) => {
	const LazyComponent = lazy(loader);
	return (
		<Suspense fallback={<LoadingFallback size="large" />}>
			<LazyComponent />
		</Suspense>
	);
};
