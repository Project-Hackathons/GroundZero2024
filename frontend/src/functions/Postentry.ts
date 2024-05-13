export async function PostEntry(journalEntry: string) {
  const url = "https://mood-hjvk7pksba-uc.a.run.app/push-entry";
  const formData = new FormData();
  formData.append("entry", journalEntry);

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
