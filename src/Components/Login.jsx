import useAuthHook from "../Hook/useAuthHook";

const Login = () => {
	const { user, googleSignIn, logOut } = useAuthHook();
	return <div></div>;
};

export default Login;
