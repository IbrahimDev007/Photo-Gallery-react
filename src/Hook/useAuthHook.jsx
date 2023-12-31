import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuthHook = () => {
	const auth = useContext(AuthContext);

	console.log("Auth:", auth);

	return auth;
};

export default useAuthHook;
