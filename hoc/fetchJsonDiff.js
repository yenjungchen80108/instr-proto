export const fetchJsonDiff = async (fileName, initialETag, latestETag) => {
  try {
    const response = await fetch("/api/get-prev-latest-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, initialETag, latestETag }),
    });

    if (!response.ok) throw new Error("Failed to fetch JSON diff");

    const { initialJson, latestJson } = await response.json();
    return { initialJson, latestJson };
  } catch (error) {
    console.error("Error fetching JSON diff:", error);
  }
};
