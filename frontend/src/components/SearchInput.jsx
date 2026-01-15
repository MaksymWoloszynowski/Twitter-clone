import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "./SearchInput.module.css";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    navigate(`/explore?q=${encodeURIComponent(query)}&f=tweets`);
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchBox}>
        <Search />
        <input
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </section>
  );
};

export default SearchInput;
