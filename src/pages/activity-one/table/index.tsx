import { IBakedGoods } from "../../../types/activity-one";
import './styles.css';

type TableProps = {
  filteredDonuts: IBakedGoods[];
  sortConfig: { key: string; direction: string };
  handleSort: (key: string) => void;
};

export const Table = ({
  filteredDonuts,
  sortConfig,
  handleSort,
}: TableProps) => {
  return (
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
              <button className="header-btn" onClick={() => handleSort("type")}>
                Type{" "}
                {sortConfig.key === "type" &&
                  (sortConfig.direction === "ascending" ? "🔼" : "🔽")}
              </button>
            </th>
            <th>
              <button className="header-btn" onClick={() => handleSort("name")}>
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
          {filteredDonuts.map((donut: IBakedGoods, index: number) => (
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
  );
};
