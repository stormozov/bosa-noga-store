import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";

const root = document.getElementById("root");

createRoot(root ? root : document.body).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
