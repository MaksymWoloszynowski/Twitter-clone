import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { Home, Bell, Mail, User } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
    const { auth } = useAuth();

  return (
    <section className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <Home />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <Bell />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <Mail />
          <span>Chat</span>
        </NavLink>

        <NavLink
          to={`/profile/${auth.username}`}
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <User />
          <span>Profile</span>
        </NavLink>
      </nav>
    </section>
  );
};

export default Sidebar;
