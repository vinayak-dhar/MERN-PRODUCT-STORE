import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const navigate = useNavigate(); // Hook to navigate back
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		alert(success ? "Product added successfully" : message);
		setNewProduct({ name: "", price: "", image: "" });

		// Navigate back to home after adding product
		if (success) navigate("/");
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
			{/* Back Button */}
			<button
				onClick={() => navigate(-1)}
				className="mb-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
			>
				🔙 Go Back
			</button>

			<h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
				Create New Product
			</h1>

			<div className="space-y-4">
				<input
					type="text"
					placeholder="Product Name"
					value={newProduct.name}
					onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
					className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
				/>

				<input
					type="number"
					placeholder="Price"
					value={newProduct.price}
					onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
					className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
				/>

				<input
					type="text"
					placeholder="Image URL"
					value={newProduct.image}
					onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
					className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
				/>

				<button
					onClick={handleAddProduct}
					className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
				>
					Add Product
				</button>
			</div>
		</div>
	);
};

export default CreatePage;
