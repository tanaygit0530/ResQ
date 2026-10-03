/**
 * RESQ API Client Configuration
 * Uses VITE_API_URL environment variable with fallback to http://localhost:8000
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // In Phase 2, this will send requests to FastAPI.
  // For now, service modules resolve with realistic mock data.
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`Falling back to local mock data for ${endpoint}:`, error);
    throw error;
  }
}
