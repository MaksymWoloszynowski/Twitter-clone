import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { Home, Bell, Mail, User, Ellipsis, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import useLogout from "../hooks/useLogout";

const Sidebar = () => {
  const { auth } = useAuth();
  const socket = useSocket();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const logout = useLogout()

  useEffect(() => {
    const handleUnread = (data) => setUnreadMessagesCount(data.count);

    socket.on("update-unread", handleUnread);
    socket.emit("get-unread");

    return () => socket.off("update-unread", handleUnread);
  }, [socket]);

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
          {unreadMessagesCount > 0 && (
            <span className={styles.unread}>{unreadMessagesCount}</span>
          )}
        </NavLink>

        <NavLink
          to={`/profile/${auth.username}`}
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <User />
          <span>Profile</span>
        </NavLink>

        <div
          className={styles.bottom}
          onClick={() => setLogoutVisible((prev) => !prev)}
        >
          <div className={styles.profileImage}></div>
          <div>
            <div>{auth.username}</div>
            <div className={styles.handle}>@{auth.username}</div>
          </div>
          <Ellipsis />
        </div>

        {logoutVisible && (
          <div className={styles.actionBox} onClick={() => logout()}>
            <LogOut />
            <p>Logout</p>
          </div>
        )}
      </nav>
    </section>
  );
};

export default Sidebar;
