async function AISuggestion({ term }: { term: string }) {
  const fetchSuggestion = async () => {
    try {
      // Cambiar a GET y pasar el término en la URL
      const response = await fetch(`/api/suggestions?term=${encodeURIComponent(term)}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestion");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      return { message: "Unable to fetch suggestion at this time." };
    }
  };

  const suggestion = await fetchSuggestion();

  return (
    <div className="flex space-x-5 mt-32 xl:mt-42 p-10 pb-0">
      <div className="animate-pulse rounded-full bg-gradient-to-t from-purple-400 h-10 w-10 border-2 flex-shrink-0 border-white" />

      <div>
        <p className="text-sm text-purple-400">
          AI Assistant Suggests:{" "}
        </p>
        <p className="italic text-xl">{suggestion.message}</p>
      </div>
    </div>
  );
}

export default AISuggestion;