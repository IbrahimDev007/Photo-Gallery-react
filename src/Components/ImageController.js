// imageController.js
export const sortImages = (imageItems, dragItem, dragOverItem) => {
	const _imageItems = [...imageItems];
	const draggedImage = _imageItems.splice(dragItem, 1)[0];
	_imageItems.splice(dragOverItem, 0, draggedImage);
	return _imageItems;
};

export const selectImage = (imageItems, index) => {
	const updatedItems = [...imageItems];
	updatedItems[index].selected = !updatedItems[index].selected;
	return updatedItems;
};

export const deleteSelected = (imageItems) => {
	return imageItems.filter((item) => !item.selected);
};
