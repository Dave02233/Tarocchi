
export default async function questionAPI(prompt) {
  const res = await fetch("http://52.41.36.82:3001/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  return data.text;
}