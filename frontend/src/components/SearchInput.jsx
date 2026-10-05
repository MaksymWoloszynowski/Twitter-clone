import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "./SearchInput.module.css";

const SearchInput = ({ defaultValue = "" }) => {
  const [input, setInput] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    navigate(`/explore?q=${encodeURIComponent(query)}&f=tweets`);
  };

  return (
      <form onSubmit={handleSubmit} className={styles.searchBox}>
        <Search />
        <input
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
  );
};

export default SearchInput;