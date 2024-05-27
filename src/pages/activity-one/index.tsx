import "./styles.css";
import BAKED_GOODS from "../../assets/baked-goods.json";
import { useState, ChangeEvent, FormEvent } from "react";

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
      ...prevDonuts,
      { ...newDonut, id: getId(newDonut.name) },
    ]);
    setNewDonut({ id: "", type: "", name: "", topping: "" });
  };

  const getId = (name: string) => {
    const lName = name.toLowerCase().trim();

    if (lName === "cake") {
      return 1;
    } else if (lName === "raised") return 2;
    else if (lName === "oldfashioned") return 3;
    else if (lName === "bar") return 4;
    else if (lName === "twist") return 5;
    else if (lName === "filled") return 6;
    else return bakedGoods.length + 1;
  };

  return (
    <div>
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

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <button className="header-btn" onClick={() => handleSort("id")}>
                  ID{" "}
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "ascending" ? "🔼" : "🔽")}
                </button>
              </th>
              <th>
                <button
                  className="header-btn"
                  onClick={() => handleSort("type")}
                >
                  Type{" "}
                  {sortConfig.key === "type" &&
                    (sortConfig.direction === "ascending" ? "🔼" : "🔽")}
                </button>
              </th>
              <th>
                <button
                  className="header-btn"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? "🔼" : "🔽")}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort("topping")}>
                  Topping{" "}
                  {sortConfig.key === "topping" &&
                    (sortConfig.direction === "ascending" ? "🔼" : "🔽")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDonuts.map((donut, index) => (
              <tr key={index}>
                <td>{donut.id}</td>
                <td>{donut.type}</td>
                <td>{donut.name}</td>
                <td>{donut.topping}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="number-of-rows">Number of items: {bakedGoods.length}</div>
    </div>
  );
};
