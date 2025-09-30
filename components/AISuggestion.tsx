async function AIAzureSuggestion({ term }: { term: string }) {
  const fetchSuggestion = async () => {
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestion");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      return { content: "Unable to fetch suggestion at this time." };
    }
  };

  const suggestion = await fetchSuggestion();

  return (
    <div className="flex space-x-5 mt-32 xl:mt-42 p-10 pb-0">
      <div className="animate-pulse rounded-full bg-gradient-to-t from-purple-400 h-10 w-10 border-2 flex-shrink-0 border-white" />

      <div>
        <p className="text-sm text-purple-400">
          Azure Open AI Assistant Suggests:{" "}
        </p>
        <p className="italic text-xl">{suggestion.content}</p>
      </div>
    </div>
  );
}

export default AIAzureSuggestion;