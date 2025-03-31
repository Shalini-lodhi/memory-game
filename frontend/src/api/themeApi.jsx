export const getThemes = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/themes"); //http://localhost:5000/api/themes
    if (!response.ok) throw new Error("Failed to fetch themes");

    const data = await response.json();

    if (data.success && data.themes && Array.isArray(data.themes.themes)) {
      return data.themes.themes; // Extract the correct array
    } else {
      console.error("Invalid theme API response:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching themes:", error);
    return { success: false, themes: [] };
  }
};
