const API_BASE_URL = "/api/themes";

export const getThemes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
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
