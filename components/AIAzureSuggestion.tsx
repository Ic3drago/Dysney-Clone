import {
  OpenAIClient,
  AzureKeyCredential,
  ChatResponseMessage,
} from "@azure/openai";

async function AIAzureSuggestion({ term }: { term: string }) {
  // Función para generar sugerencia de respaldo con IA conversacional
  const getFallbackSuggestion = (searchTerm: string): string => {
    const term = searchTerm.toLowerCase();
    
    // Sugerencias específicas por categoría
    if (term.includes('comedy') || term.includes('comedia')) {
      return "¡Las comedias son perfectas para relajarse! Te recomendaría explorar clásicos como 'The Office', 'Parks and Recreation' o 'Brooklyn Nine-Nine'. ¿Prefieres humor británico seco o comedia americana más directa?";
    }
    if (term.includes('action') || term.includes('acción')) {
      return "Si buscas acción pura, hay películas épicas que te dejarán sin aliento. Desde la saga 'John Wick' hasta 'Mad Max: Fury Road', o las clásicas de Marvel. ¿Te gustan más las explosiones o las artes marciales?";
    }
    if (term.includes('drama')) {
      return "Los dramas tienen historias que te hacen reflexionar días después. 'Breaking Bad', 'The Crown' o películas como 'Parasite' son obras maestras. ¿Prefieres algo intenso o más contemplativo?";
    }
    if (term.includes('horror') || term.includes('terror')) {
      return "¿Fan del terror? Puedes ir desde suspenso psicológico como 'The Haunting of Hill House' hasta horror visceral como 'Hereditary'. ¿Qué tan valiente te sientes hoy? 😈";
    }
    if (term.includes('sci-fi') || term.includes('ciencia ficción') || term.includes('science fiction')) {
      return "La ciencia ficción nos hace imaginar el futuro y cuestionar la realidad. 'Blade Runner 2049', 'Interstellar', 'The Expanse'... hay un universo por explorar. ¿Prefieres space opera o distopías?";
    }
    if (term.includes('romance') || term.includes('romántica')) {
      return "Las historias románticas nunca pasan de moda. Desde 'Pride and Prejudice' hasta 'Normal People'. ¿Buscas algo tierno y nostálgico o prefieres romance con comedia?";
    }
    if (term.includes('documentary') || term.includes('documental')) {
      return "Los documentales nos enseñan algo nuevo siempre. Desde naturaleza épica ('Planet Earth') hasta crímenes reales ('Making a Murderer'). ¿Qué te intriga más?";
    }
    if (term.includes('thriller')) {
      return "Los thrillers mantienen el suspenso hasta el final. 'Mindhunter', 'Gone Girl', 'Prisoners'... historias que te mantienen al borde del asiento. ¿Te gustan los giros inesperados?";
    }
    if (term.includes('animation') || term.includes('animación') || term.includes('anime')) {
      return "¡La animación es arte puro! Desde Pixar y Studio Ghibli hasta anime como 'Attack on Titan' o 'Demon Slayer'. ¿Buscas algo familiar o más adulto?";
    }
    if (term.includes('fantasy') || term.includes('fantasía')) {
      return "La fantasía nos transporta a mundos mágicos. 'The Lord of the Rings', 'Game of Thrones', 'The Witcher'... ¿Prefieres alta fantasía épica o algo más urbano?";
    }
    
    // Sugerencias generales conversacionales
    const generalSuggestions = [
      `He visto que te interesa "${searchTerm}". Déjame decirte que hay contenido increíble en esa categoría. Basándome en eso, te recomendaría explorar títulos que combinen ese estilo con elementos sorprendentes. ¿Qué tipo de historia te atrapa más?`,
      `Interesante elección con "${searchTerm}". Hay tanto por descubrir aquí, desde clásicos inolvidables hasta gemas ocultas recientes. ¿Prefieres algo que todos conocen o buscas sorpresas?`,
      `"${searchTerm}" tiene opciones fantásticas para todos los gustos. Podría recomendarte desde obras maestras galardonadas hasta placeres culposos. ¿En qué mood estás hoy?`,
      `Ah, "${searchTerm}"... excelente tema para explorar. Hay desde películas icónicas hasta series adictivas. ¿Buscas algo para maratonear o prefieres películas independientes?`,
      `Me gusta tu búsqueda de "${searchTerm}". Tengo algunas joyas en mente que podrían sorprenderte. ¿Te abres a explorar subgéneros o prefieres quedarte en tu zona de confort?`
    ];
    
    const index = searchTerm.length % generalSuggestions.length;
    return generalSuggestions[index];
  };

  const fetchChatCompletion = async () => {
    const completions: (ChatResponseMessage | undefined)[] = [];

    const endpoint = process.env.ENDPOINT;
    const azureApiKey = process.env.AZURE_API_KEY;

    if (!endpoint) throw new Error("Missing endpoint");
    if (!azureApiKey) throw new Error("Missing Azure API Key");

    console.log(
      `Using endpoint: ${endpoint} and Azure API Key: ${azureApiKey}`
    );

    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey)
    );

    const deploymentId = "disney-clone-youtube-35";

    const result = await client.getChatCompletions(
      deploymentId,
      [
        {
          role: "system",
          content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`,
        },
        {
          role: "user",
          content: `I like: ${term}`,
        },
      ],
      { maxTokens: 128 }
    );

    for (const choice of result.choices) {
      console.log(choice.message);
      completions.push(choice.message);
    }

    return completions[0];
  };

  // Intentar obtener la respuesta de Azure OpenAI
  let content = getFallbackSuggestion(term);
  
  try {
    const completion = await fetchChatCompletion();
    
    // Si Azure responde correctamente, usar su contenido
    if (completion?.content && completion.content.trim() !== "") {
      content = completion.content;
    }
  } catch (error) {
    console.error("Error fetching Azure OpenAI suggestion:", error);
    // Mantener el fallback inteligente que ya establecimos
  }

  return (
    <div className="flex space-x-5 mt-32 xl:mt-42 p-10 pb-0">
      <div className="animate-pulse rounded-full bg-gradient-to-t from-purple-400 h-10 w-10 border-2 flex-shrink-0 border-white" />

      <div>
        <p className="text-sm text-purple-400">
          Azure Open AI Assistant Suggests:{" "}
        </p>
        <p className="italic text-xl">{content}</p>
      </div>
    </div>
  );
}

export default AIAzureSuggestion;