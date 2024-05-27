import { useEffect } from "react";

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
  const getProperty = (path: string, obj: any) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  useEffect(() => {
    const property = getProperty("address.office.state", OBJ);
    alert(property);
  }, []);

  return (
    <>
      <div>Activity Two</div>

      <div></div>
    </>
  );
};
