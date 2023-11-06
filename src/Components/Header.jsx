import Login from "./Login";

const Header = ({ count, deleteSelectedItems }) => {
	return (
		<header className="flex justify-between items-center">
			{count > 0 ? (
				<>
					<div className="flex items-center">
						<input type="checkbox" checked={true} />
						<span className="font-medium text-lg">{count} Files Selected</span>
					</div>
					<button
						className="hover:underline text-red-500 text-xl font-medium"
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
	);
};

export default Header;
