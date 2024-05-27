

const url = "https://api.megaport.com/v2/locations";

export const getLocations = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error in fetching the data");
      }
      return res.json();
    } catch (error) {
      console.error("Fetch error", error);
      throw error;
    }
}