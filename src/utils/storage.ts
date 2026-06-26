export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}

export function shouldSimulateError(): boolean {
  const params = new URLSearchParams(window.location.search);
  if (params.get('simulateError') === 'true') return true;
  return localStorage.getItem('rn_simulate_error') === 'true';
}
