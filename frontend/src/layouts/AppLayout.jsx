import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import SearchInput from "../components/SearchInput";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  const location = useLocation();
  const notAllowed = ["/chat", "/explore", "/settings"];

  const hideSearch = notAllowed.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <section className={styles.container}>
        {!hideSearch && <SearchInput />}
      </section>
    </div>
  );
};

export default AppLayout;
