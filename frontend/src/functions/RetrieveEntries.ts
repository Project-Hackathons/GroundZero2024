export async function RetrieveEntries() {
  const url = "https://mood-hjvk7pksba-uc.a.run.app/fetch-entries";
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  console.log(data);
  return data;
}
