import api from "../api/api";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth(null);
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
