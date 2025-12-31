import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import api from "../api/api";

const PersistLogin = () => {
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setAuth(res.data.user);
      } catch (error) {
        console.log(error);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Outlet />;
};

export default PersistLogin;