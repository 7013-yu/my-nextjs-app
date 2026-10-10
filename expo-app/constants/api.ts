// ⚠️ 已改成 Vercel 部署網址,不再需要區域網路 IP,任何網路都能連
export const API_BASE_URL = "https://my-nextjs-app-coral-zeta.vercel.app";

// 送出 JSON 請求,10 秒沒回應就中斷,避免畫面卡在載入中
async function requestJson<T>(
  method: "GET" | "POST" | "PUT",
  path: string,
  body?: unknown,
  timeoutMs = 10000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function getJson<T = any>(path: string, timeoutMs?: number) {
  return requestJson<T>("GET", path, undefined, timeoutMs);
}

export function postJson<T = any>(path: string, body: unknown, timeoutMs?: number) {
  return requestJson<T>("POST", path, body, timeoutMs);
}

export function putJson<T = any>(path: string, body: unknown, timeoutMs?: number) {
  return requestJson<T>("PUT", path, body, timeoutMs);
}

export function describeNetworkError(err: unknown): string {
  if (err instanceof Error && err.name === "AbortError") {
    return "連線逾時,請確認網路後再試一次";
  }
  return "無法連線到伺服器,請確認網路後再試一次";
}