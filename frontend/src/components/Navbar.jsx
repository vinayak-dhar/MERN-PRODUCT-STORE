import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { PlusIcon } from "@heroicons/react/24/outline"; // Heroicons for icons

const Navbar = () => {
	const [darkMode, setDarkMode] = useState(
		localStorage.getItem("theme") === "dark"
	);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		localStorage.setItem("theme", darkMode ? "light" : "dark");
		document.documentElement.classList.toggle("dark");
	};

	return (
		<div className="container mx-auto px-4">
			<nav className="flex flex-col sm:flex-row items-center justify-between h-16 py-4">
				{/* Logo */}
				<h1 className="text-2xl sm:text-3xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">
					<Link to="/">Product Store 🛒</Link>
				</h1>

				{/* Buttons */}
				<div className="flex items-center space-x-2">
					<Link to="/create">
						<button className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
							<PlusIcon className="w-5 h-5" />
						</button>
					</Link>
					<button
						onClick={toggleDarkMode}
						className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
					>
						{darkMode ? <LuSun size={20} /> : <IoMoon size={20} />}
					</button>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
