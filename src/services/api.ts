// src/services/api.ts

export async function fetchAnalysisFromApi(endpoint: string): Promise<string> {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // 解析 JSON
    if (typeof data.text !== 'string') {
      throw new Error('API response missing "text" property');
    }
    return data.text;
  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw error;
  }
}