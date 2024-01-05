export interface IErrorResponse {
  status: string;
  message: string;
}

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${input}`,
    init
  );

  const result = await response.json();

  return result as T;
}
