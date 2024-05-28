import { ChangeEvent } from "react";
import "./styles.css";

type SearchProps = {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Search = ({ searchTerm, handleSearch }: SearchProps) => {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search for baked items..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};
