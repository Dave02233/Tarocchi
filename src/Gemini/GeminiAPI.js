export default async function questionAPI(inputValue, newCards) {
  const res = await fetch("https://expresstest-gkdq.onrender.com/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputValue, newCards }),
  });
  const responseText = await res.text();
  //console.log('Response status:', res.status);
  //console.log('Response text:', responseText);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  // Since the response is HTML, return it directly
  return responseText;
}