import { useRef } from "react";
import { sortImages } from "./ImageController";
import useAuthHook from "../Hook/useAuthHook";

const ImageGallery = ({ toggleSelection, handleImage }) => {
	const { imageItems, setImageItems } = useAuthHook();
	const dragItem = useRef(null);
	const dragOverItem = useRef(null);
	const handleSort = () => {
		const updatedImages = sortImages(
			imageItems,
			dragItem.current,
			dragOverItem.current
		);
		dragItem.current = null;
		dragOverItem.current = null;
		setImageItems(updatedImages);
	};

	return (
		<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{imageItems.map((item, index) => (
				<div
					key={index}
					className={`${item.selected ? "selected" : ""}
            ${index === 0 ? "grid col-span-2 row-span-2" : ""}
            relative transition duration-300 ease-in-out card hover:bg-slate-900 border-2`}
					draggable
					onDragStart={() => (dragItem.current = index)}
					onDragEnter={() => (dragOverItem.current = index)}
					onDragEnd={handleSort}
					onDragOver={(e) => e.preventDefault()}
				>
					<input
						type="checkbox"
						checked={item.selected}
						onChange={() => toggleSelection(index)}
						className="absolute top-2 left-2 z-10"
					/>

					<img
						src={item.image}
						className="object-contain hover:opacity-50"
						alt={`Image ${index}`}
					/>
				</div>
			))}

			<div className="card border-2 flex flex-col items-center justify-center w-40 h-40">
				<label htmlFor="imageInput">
					<img
						src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?size=626&ext=jpg"
						alt="image"
						className="object-cover"
					/>
					<input
						id="imageInput"
						className="hidden"
						type="file"
						onChange={handleImage}
					/>
				</label>
				Add Image
			</div>
		</div>
	);
};

export default ImageGallery;
