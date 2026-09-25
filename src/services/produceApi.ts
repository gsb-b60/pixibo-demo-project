const API_URL = "https://scenesku.com/api/v1/public-packs/womens-fashion";

export async function getFashionProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch fashion products");
  }

  return response.json();
}
