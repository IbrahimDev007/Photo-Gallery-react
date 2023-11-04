import Swal from "sweetalert2";
import useAuthHook from "../Hook/useAuthHook";

const Login = () => {
	const { user, googleSignIn, logOut } = useAuthHook();

	const handleGoogle = () => {
		if (user) {
			// User is logged in, perform logout
			logOut()
				.then(() => {
					Swal.fire("Logout Successful");
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			// User is not logged in, perform login
			googleSignIn()
				.then((result) => {
					Swal.fire({
						title: `${result.user.displayName} Login Successful`,
						showClass: {
							popup: "animate__animated animate__fadeInDown",
						},
						hideClass: {
							popup: "animate__animated animate__fadeOutUp",
						},
					});
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<div>
			{user ? (
				<div>
					<img
						src={user.photoURL || "default-avatar-image.jpg"} // Use a default image if user's photoURL is not available
						alt="User Avatar"
						className="rounded-full w-16 h-16"
					/>
					<button className="btn " onClick={handleGoogle}>
						Logout
					</button>
				</div>
			) : (
				<button onClick={handleGoogle}>Login with Google</button>
			)}
		</div>
	);
};

export default Login;
