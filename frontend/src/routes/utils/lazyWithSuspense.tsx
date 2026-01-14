import { lazy, Suspense } from "react";
import { LoadingFallback } from "@/features/Preloader";

/**
 * Интерфейс, описывающий загружаемый компонент.
 */
interface ILoaderPromise {
	default: React.ComponentType;
}

/**
 * Тип загрузки компонента.
 */
type LoaderType = () => Promise<ILoaderPromise>;

/**
 * Динамическая загрузка компонента с использованием Suspense и lazy.
 */
export const lazyWithSuspense = (loader: LoaderType) => {
	const LazyComponent = lazy(loader);
	return (
		<Suspense fallback={<LoadingFallback size="large" />}>
			<LazyComponent />
		</Suspense>
	);
};
