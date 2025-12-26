export async function translateText(text: string): Promise<string> {
  if (!text) return '';
  
  try {
    // 1. Tenta Google Translate via Proxy (mais confiável e sem limites estritos)
    // Usando corsproxy.io para evitar CORS no navegador
    // Limitando a 2000 caracteres para evitar erro de URL muito longa (URI Too Long)
    const googleText = text.length > 2000 ? text.substring(0, 2000) + '...' : text;
    const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(googleText)}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(googleUrl)}`;
    
    const response = await fetch(proxyUrl);
    
    if (response.ok) {
      const data = await response.json();
      // O formato retornado é [[["Traducao", "Original", ...], ...], ...]
      if (data && Array.isArray(data[0])) {
        return data[0].map((item: any) => item[0]).join('');
      }
    }
    
    throw new Error('Google Translate failed');
  } catch (googleError) {
    console.warn('Google Translate failed, trying MyMemory fallback...', googleError);
    
    try {
      // 2. Fallback: MyMemory Translation API (Gratuita para uso moderado)
      // Limita o tamanho do texto para evitar erros (máx ~500 chars por request na free tier é seguro)
      const textToTranslate = text.length > 500 ? text.substring(0, 500) + '...' : text;
      
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|pt-br`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      }
      
      console.warn('MyMemory API returned status:', data.responseStatus);
      return text;
    } catch (error) {
      console.error('All translation services failed:', error);
      return text;
    }
  }
}
