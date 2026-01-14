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
				element: <div>About</div>,
			},
			{
				path: "/catalog",
				element: <div>Catalog</div>,
			},
			{
				path: "/contacts",
				element: <div>Contacts</div>,
			},
      {
        path: "/cart",
        element: <div>Cart</div>,
      },
		],
	},
]);

export default router;
