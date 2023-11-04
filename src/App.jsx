import { useRef, useState, useEffect } from "react";
import { data } from "./Data/Data";
import Login from "./Components/Login";

const App = () => {
	const [imageItems, setImageItems] = useState(data);
	const [newImage, setNewImage] = useState(null);
	const dragItem = useRef(null);
	const dragOverItem = useRef(null);

	const handleSort = () => {
		const _imageItems = [...imageItems];
		//intiali change drag image
		const draggedImage = _imageItems.splice(dragItem.current, 1)[0];
		_imageItems.splice(dragOverItem.current, 0, draggedImage);
		dragItem.current = null;
		dragOverItem.current = null;
		setImageItems(_imageItems);
	};
	//file upload
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
	//image selection
	const toggleSelection = (index) => {
		const updatedItems = [...imageItems];
		updatedItems[index].selected = !updatedItems[index].selected;
		setImageItems(updatedItems);
		console.log(imageItems);
	};

	const deleteSelectedItems = () => {
		const updatedItems = imageItems.filter((item) => !item.selected);
		setImageItems(updatedItems);
	};
	//ontaime image  change useeffect when new image update
	useEffect(() => {
		if (newImage) {
			setImageItems([...imageItems, { image: newImage, selected: false }]);
			setNewImage(null);
		}
	}, [newImage, imageItems]);
	const count = imageItems.filter((item) => item.selected).length;
	return (
		<div className="mx-auto max-w-screen-xl">
			<header className="flex justify-between items-center">
				{count > 0 ? (
					<>
						<div className="flex items-center">
							<input type="checkbox" checked={true} />
							<span className="font-medium text-lg">
								{count} Files Selected
							</span>
						</div>
						<button
							className="hover:underline text-red-500 text-xl font-medium "
							onClick={deleteSelectedItems}
						>
							Delete
						</button>
					</>
				) : (
					<>
						<h1 className="font-medium text-lg">Gallery</h1>
						<Login />
					</>
				)}
			</header>
			<div className="divider"></div>

			<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{imageItems.map((item, index) => (
					// drag and drop
					<div
						key={index}
						className={`${item.selected ? "selected" : ""}
            ${
							index === 0 ? "grid col-span-2 row-span-2" : ""
						} relative transition duration-300 ease-in-out card  hover:bg-slate-900  border-2  `}
						draggable
						onDragStart={() => (dragItem.current = index)}
						onDragEnter={() => (dragOverItem.current = index)}
						onDragEnd={handleSort}
						onDragOver={(e) => e.preventDefault()}
					>
						{/* //select  */}
						<input
							type="checkbox"
							checked={item.selected}
							onChange={() => toggleSelection(index)}
							className="absolute top-2 left-2 z-10"
						/>

						<img
							src={item.image}
							className="  object-contain hover:opacity-50"
							alt={`Image ${index}`}
						/>
					</div>
				))}
				{/* //add image */}

				<div className=" card border-2 flex flex-col items-center justify-center  w-40 h-40">
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
		</div>
	);
};

export default App;
