import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePage />} />
			</Routes>
		</div>
	);
}

export default App;
