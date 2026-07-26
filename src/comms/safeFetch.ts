import type { Nullish } from '@/types/main';

export type ErrorCallback = ({
  error,
  response,
}: {
  error: Error;
  response: Nullish<Response>;
}) => any;

export async function resolveResponseData(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const dataAsText = await response.text();

  try {
    return JSON.parse(dataAsText);
  } catch {
    return dataAsText;
  }
}

export const DEFAULT_FETCH_OPTS: RequestInit = {
  // TODO: dynamically add these for requests with a body?
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  method: 'GET',
};

export async function safeFetch({
  baseURL,
  fetchOpts = DEFAULT_FETCH_OPTS,
  onErrorCallback,
  requestPathname,
}: {
  baseURL?: string;
  fetchOpts?: RequestInit;
  onErrorCallback?: ErrorCallback;
  requestPathname: string;
}) {
  const logPrefix = `safeFetch: ${fetchOpts.method} '${requestPathname}'`;

  let responseData, response;

  try {
    const requestURL = new URL(requestPathname, baseURL ?? window.location.origin);

    response = await fetch(requestURL, fetchOpts);

    if (!response.ok || response.status >= 400) {
      throw new Error(
        `[${logPrefix} ERROR ${response.status}] Failed to complete request.\n` +
          `Response status: ${response.status}\n` +
          `Response status text: ${response.statusText}\n`,
      );
    }

    responseData = await resolveResponseData(response);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(`Unknown error: ${e}`);

    if (onErrorCallback != null && typeof onErrorCallback === 'function') {
      return Promise.resolve(onErrorCallback({ error, response }));
    }

    console.error(error);
    throw new Error(`[${logPrefix}] ${error.message}`, { cause: e });
  }

  return responseData;
}
