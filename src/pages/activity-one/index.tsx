import "./styles.css";
import BAKED_GOODS from "../../assets/baked-goods.json";
import { useState, ChangeEvent, FormEvent } from "react";
import { Table } from "./table";

export const ActivityOne = () => {
  const [bakedGoods, setBakedGoods] = useState(BAKED_GOODS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [newDonut, setNewDonut] = useState({
    id: "",
    type: "",
    name: "",
    topping: "",
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedDonuts = [...bakedGoods].sort((a, b) => {
    if (sortConfig.key) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const filteredDonuts = sortedDonuts.filter(
    (donut) =>
      donut.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donut.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donut.topping.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDonut((prevDonut) => ({
      ...prevDonut,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBakedGoods((prevDonuts) => [
      { ...newDonut, id: getId(newDonut.name) },
      ...prevDonuts,
    ]);
    setNewDonut({ id: "", type: "", name: "", topping: "" });
  };

  const getId = (name: string) => {
    const lName = name.toLowerCase().trim();
    switch (lName) {
      case "cake":
        return 1;
      case "raised":
        return 2;
      case "oldfashioned":
        return 3;
      case "bar":
        return 4;
      case "twist":
        return 5;
      case "filled":
        return 6;
      default:
        return bakedGoods.length + 1;
    }
  };

  return (
    <>
      <h1>Baked Items</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          Create new Baked item:
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={newDonut.type}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newDonut.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="topping"
            placeholder="Topping"
            value={newDonut.topping}
            onChange={handleChange}
            required
          />
          <button type="submit">Add item</button>
        </form>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search for baked items..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <Table
        data={filteredDonuts}
        sortConfig={sortConfig}
        handleSort={handleSort}
      />

      <div className="number-of-rows">Number of items: {bakedGoods.length}</div>
    </>
  );
};
