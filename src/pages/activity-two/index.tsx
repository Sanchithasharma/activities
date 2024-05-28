import { useState } from "react";
import "./styles.css";
import { getProperty } from "./getProperty";

const OBJ = {
  name: "Megaport",
  address: {
    office: {
      unit: "Level 3",
      street: "825 Ann Street",
      suburb: "Fortitude Valley",
      city: "Brisbane",
      state: "Queensland",
      postcode: 4006,
    },
  },
  industry: { type: "Internet and telecommunications", asxListed: true },
};

export const ActivityTwo = () => {
  const [path, setPath] = useState("address.office.state");
  const [obj, setObj] = useState(JSON.stringify(OBJ));

  const handleSubmit = () => {
    const property = getProperty(path, JSON.parse(obj));
    alert(property);
  };

  return (
    <>
      <h2>Activity Two</h2>

      <div>
        <form className="activity-two-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your path here"
            value={path}
            onChange={(event) => {
              setPath(event.target.value);
            }}
          />

          <textarea
            rows={5}
            placeholder="Enter your object here"
            value={JSON.stringify(obj)}
            onChange={(event) => {
              setObj(event.target.value);
            }}
          />

          <div>
            <button type="submit">Click here to see the result</button>
          </div>
        </form>
      </div>
    </>
  );
};
