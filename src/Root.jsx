import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import Header from "./Components/Header";
import { deleteSelected, selectImage } from "./components/ImageController";
import useAuthHook from "./Hook/useAuthHook";

const App = () => {
	const { imageItems, setImageItems } = useAuthHook();
	const [newImage, setNewImage] = useState(null);
	const toggleSelection = (index) => {
		const updatedItems = selectImage(imageItems, index);
		setImageItems(updatedItems);
	};

	const deleteSelectedItems = () => {
		const updatedItems = deleteSelected(imageItems);
		setImageItems(updatedItems);
	};

	const handleImage = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setNewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	useEffect(() => {
		if (newImage) {
			setImageItems([...imageItems, { image: newImage, selected: false }]);
			setNewImage(null);
		}
	}, [newImage, imageItems, setImageItems]);
	const count = imageItems.filter((item) => item.selected).length;

	return (
		<div className="mx-auto max-w-screen-xl">
			<Header count={count} deleteSelectedItems={deleteSelectedItems} />
			<div className="divider"></div>
			<ImageGallery
				toggleSelection={toggleSelection}
				handleImage={handleImage}
			/>
			<div className="divider"></div>
		</div>
	);
};

export default App;
