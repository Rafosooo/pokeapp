export async function translateText(text: string): Promise<string> {
  if (!text) return '';
  
  try {
    // Usando MyMemory Translation API (Gratuita para uso moderado)
    // Limita o tamanho do texto para evitar erros (máx ~500 chars por request na free tier é seguro)
    const textToTranslate = text.length > 500 ? text.substring(0, 500) + '...' : text;
    
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|pt-br`
    );
    
    const data = await response.json();
    
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    }
    
    // Fallback se a API falhar ou limitar
    console.warn('Translation API returned status:', data.responseStatus);
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}
