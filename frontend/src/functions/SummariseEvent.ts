export async function SummariseEvent() {
  const url = "https://mood-hjvk7pksba-uc.a.run.app/summarise-events";
  const formData = new FormData();
  formData.append("query", "");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

// https://mood-hjvk7pksba-uc.a.run.app/summarise-events
// http://127.0.0.1:8000/summarise-events
