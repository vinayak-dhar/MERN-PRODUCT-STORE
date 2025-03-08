import { useState } from "react";
import { useProductStore } from "../store/product";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const { deleteProduct, updateProduct } = useProductStore();
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		alert(success ? "Product deleted successfully" : message);
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		closeModal();
		alert(success ? "Product updated successfully" : message);
	};

	return (
		<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
			<img
				src={product.image}
				alt={product.name}
				className="h-48 w-full object-cover"
			/>

			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
					{product.name}
				</h3>

				<p className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-4">
					${product.price}
				</p>

				<div className="flex space-x-2">
					<button
						onClick={openModal}
						className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
					>
						<IoMdCreate size={20} />
					</button>

					<button
						onClick={() => handleDeleteProduct(product._id)}
						className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
					>
						<IoMdTrash size={20} />
					</button>
				</div>
			</div>

			{/* Update Modal */}
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-50" />
					</Transition.Child>

					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
								<Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
									Update Product
								</Dialog.Title>

								<div className="mt-4 space-y-3">
									<input
										type="text"
										placeholder="Product Name"
										value={updatedProduct.name}
										onChange={(e) =>
											setUpdatedProduct({ ...updatedProduct, name: e.target.value })
										}
										className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
									/>

									<input
										type="number"
										placeholder="Price"
										value={updatedProduct.price}
										onChange={(e) =>
											setUpdatedProduct({ ...updatedProduct, price: e.target.value })
										}
										className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
									/>

									<input
										type="text"
										placeholder="Image URL"
										value={updatedProduct.image}
										onChange={(e) =>
											setUpdatedProduct({ ...updatedProduct, image: e.target.value })
										}
										className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
									/>
								</div>

								<div className="mt-6 flex justify-end space-x-2">
									<button
										onClick={() => handleUpdateProduct(product._id, updatedProduct)}
										className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
									>
										Update
									</button>
									<button
										onClick={closeModal}
										className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default ProductCard;
