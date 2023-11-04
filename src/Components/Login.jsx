import Swal from "sweetalert2";
import useAuthHook from "../Hook/useAuthHook";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
	const { user, googleSignIn, logOut, loading } = useAuthHook();

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
			{loading ? (
				<p>Loading...</p>
			) : user ? (
				<div className="flex justify-center items-center flex-col">
					<div className="avatar online">
						<div className="w-12 rounded-full">
							<img src={user.photoURL} alt="User Avatar" />
						</div>
					</div>
					<button
						className="btn btn-sm btn-error btn-outline"
						onClick={handleGoogle}
					>
						Logout
					</button>
				</div>
			) : (
				<div>
					<button
						onClick={handleGoogle}
						className="btn btn-square btn-success btn-outline  text-xs flex items-center justify-center"
					>
						<FcGoogle className="text-4xl" />
					</button>
				</div>
			)}
		</div>
	);
};

export default Login;
