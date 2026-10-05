import { Link, Outlet } from "react-router-dom";
import TitleTop from "../../components/TitleTop";
import styles from "./Settings.module.css";
import { ArrowRight } from "lucide-react";

const Settings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <TitleTop title="Settings" />
        <nav className={styles.nav}>
          <Link to="/settings/account" className={styles.item}>
            <span>Your account</span>
            <ArrowRight className={styles.icon} />
          </Link>
        </nav>
      </div>

      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
};

export default Settings;
