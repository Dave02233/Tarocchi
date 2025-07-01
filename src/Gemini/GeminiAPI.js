
export default async function questionAPI(prompt) {
  const res = await fetch("https://expresstest-70ap.onrender.com/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  return data.text;
}