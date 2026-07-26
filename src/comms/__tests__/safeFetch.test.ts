import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { DEFAULT_FETCH_OPTS, resolveResponseData, safeFetch } from '@/comms';

describe('resolveResponseData', () => {
  it('parses text as JSON when status is 202', async () => {
    const responseBody = {
      foo: 'bar',
      favorites: ['cinnamon rolls', 'donuts', 'french fries'],
    };
    const mockResponse = new Response(
      JSON.stringify(responseBody), // force formatting
      { status: 202 },
    );

    const result = await resolveResponseData(mockResponse);
    expect(result).toEqual(responseBody);
  });

  it('returns raw text when status is 202 and text is not valid JSON', async () => {
    const responseBody = 'not-json';
    const mockResponse = new Response(
      responseBody, // force formatting
      { status: 202 },
    );

    const result = await resolveResponseData(mockResponse);
    expect(result).toEqual(responseBody);
  });

  it("calls 'response.json()' for non-202 status", async () => {
    const responseBody = {
      data: 'value',
    };
    const mockResponse = new Response(
      JSON.stringify(responseBody), // force formatting
      { status: 200 },
    );
    const mockResponseTextSpy = vi.spyOn(mockResponse, 'text');

    const result = await resolveResponseData(mockResponse);
    expect(mockResponseTextSpy).toHaveBeenCalled();
    expect(result).toEqual(responseBody);
  });
});

describe('safeFetch', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const baseFetchArgs = {
    baseURL: 'https://example.com',
  };

  it('makes a GET request with default options', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue(JSON.stringify({ success: true })),
    });

    await safeFetch({
      ...baseFetchArgs,
      requestPathname: '/api/data',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      new URL('/api/data', baseFetchArgs.baseURL),
      DEFAULT_FETCH_OPTS,
    );
  });

  it('uses custom fetch options when provided', async () => {
    const customFetchOpts: RequestInit = {
      body: JSON.stringify({ foo: 'bar' }),
      method: 'POST',
    };

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue('{}'),
    });

    await safeFetch({
      ...baseFetchArgs,
      fetchOpts: customFetchOpts,
      requestPathname: '/api/submit',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      new URL('/api/submit', baseFetchArgs.baseURL),
      customFetchOpts,
    );
  });

  it('returns parsed response data on success', async () => {
    const responseData = { items: [1, 2, 3] };
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue(JSON.stringify(responseData)),
    });

    const result = await safeFetch({
      ...baseFetchArgs,
      requestPathname: '/api/items',
    });

    expect(result).toEqual(responseData);
  });

  it("uses 'window.location.origin' when no 'baseURL' is provided", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue('{}'),
    });

    await safeFetch({ requestPathname: '/api/local' });

    expect(fetchMock).toHaveBeenCalledWith(
      new URL('/api/local', window.location.origin),
      DEFAULT_FETCH_OPTS,
    );
  });

  it('throws an error when response is not ok', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(
      safeFetch({
        ...baseFetchArgs,
        requestPathname: '/api/fail',
      }),
    ).rejects.toThrow(/Failed to complete request/);
  });

  it('throws an error when status is >= 400', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(
      safeFetch({
        ...baseFetchArgs,
        requestPathname: '/api/missing',
      }),
    ).rejects.toThrow(/Failed to complete request/);
  });

  it("calls 'onErrorCallback' and returns its value when request fails", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
    });

    const onErrorCallbackReturn = { message: 'Encountered an error' };
    const onErrorCallback = vi.fn().mockReturnValue(onErrorCallbackReturn);

    const result = await safeFetch({
      ...baseFetchArgs,
      onErrorCallback,
      requestPathname: '/api/network-error',
    });

    expect(onErrorCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Error),
        response: expect.objectContaining({
          status: 503,
        }),
      }),
    );
    expect(result).toEqual(onErrorCallbackReturn);
  });

  it("calls 'onErrorCallback' when 'fetch' itself throws", async () => {
    fetchMock.mockRejectedValue(new Error('Network failure'));

    const onErrorCallbackReturn = { message: 'Encountered an error' };
    const onErrorCallback = vi.fn().mockReturnValue(onErrorCallbackReturn);

    const result = await safeFetch({
      ...baseFetchArgs,
      onErrorCallback,
      requestPathname: '/api/network-error',
    });

    expect(onErrorCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Error),
        response: undefined,
      }),
    );
    expect(result).toEqual(onErrorCallbackReturn);
  });

  it("throws when 'fetch' fails and no 'onErrorCallback' is provided", async () => {
    vi.spyOn(console, 'error').mockImplementation(vi.fn());
    fetchMock.mockRejectedValue(new Error('Network failure'));

    await expect(
      safeFetch({
        ...baseFetchArgs,
        requestPathname: '/api/network-error',
      }),
    ).rejects.toThrow(/Network failure/);
  });
});
