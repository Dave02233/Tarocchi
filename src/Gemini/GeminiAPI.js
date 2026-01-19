export default async function questionAPI(inputValue, newCards) {
  try {
    const res = await fetch("https://expresstest-gkdq.onrender.com/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputValue, newCards }),
      signal: AbortSignal.timeout(60000), 
    });
    const responseText = await res.text();
    //console.log('Response status:', res.status);
    //console.log('Response text:', responseText);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    // Since the response is HTML, return it directly
    return responseText;
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error('La richiesta è scaduta per timeout');
    }
    throw error; // Rilancia altri errori
  }
}