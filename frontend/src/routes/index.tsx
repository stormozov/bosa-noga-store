import { createBrowserRouter } from "react-router";
import { lazyWithSuspense } from "./utils";

/**
 * Маршрутизация приложения.
 */
const router = createBrowserRouter([
	{
		path: "/",
		element: lazyWithSuspense(() => import("@/layouts/PageLayout/PageLayout")),
		children: [
			{
				index: true,
				element: lazyWithSuspense(() => import("@/pages/Homepage/Homepage")),
			},
			{
				path: "/about",
				element: lazyWithSuspense(() => import("@/pages/AboutPage/AboutPage")),
			},
			{
				path: "/catalog",
				element: lazyWithSuspense(
					() => import("@/pages/CatalogPage/CatalogPage"),
				),
			},
			{
				path: "/catalog/:id",
				element: lazyWithSuspense(
					() => import("@/pages/ProductPage/ProductPage"),
				),
			},
			{
				path: "/contacts",
				element: lazyWithSuspense(
					() => import("@/pages/ContactsPage/ContactsPage"),
				),
			},
			{
				path: "/cart",
				element: lazyWithSuspense(() => import("@/pages/CartPage/CartPage")),
			},
			{
				path: "*",
				element: lazyWithSuspense(
					() => import("@/pages/PageNotFound/PageNotFound"),
				),
			},
		],
	},
]);

export default router;
