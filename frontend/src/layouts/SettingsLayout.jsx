import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./SettingsLayout.module.css";

const SettingsLayout = () => {

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
