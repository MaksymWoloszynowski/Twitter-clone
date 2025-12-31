import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext.jsx";

const useAuth = () => {
    const context = useContext(AuthContext);

    useDebugValue(
        context?.auth,
        auth => auth ? "Logged In" : "Logged Out"
    );

    return context;
};

export default useAuth;