import { RouterProvider } from "react-router";
import router from "./routes";

/**
 * Основной компонент приложения, точка входа
 */
function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
