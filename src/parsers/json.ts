/**
 * @returns Parsed JSON value, or `null` if parsing fails.
 *    (**NOTE**: JSON text `"null"` parses to `null`.)
 */
export function safeParseJSON<T = any>(
  maybeStringifiedObject: unknown, // force formatting
): T | null {
  try {
    return JSON.parse(String(maybeStringifiedObject));
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error(
      `[safeParseJSON] : Failed to parse '${maybeStringifiedObject}' (type '${typeof maybeStringifiedObject}') ` +
        `Returning \`null\`.\n`,
      error,
    );
    return null;
  }
}

/**
 * @description Attempts to stringify the passed value `val`.
 *    If an error is encountered during stringification,
 *    returns `null`.
 */
export function safeStringifyJSON(val: unknown): string | null {
  try {
    return JSON.stringify(val) ?? null;
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error(
      `[safeStringifyJSON] : Failed to stringify value. Returning \`null\`.\n`,
      { value: val, type: typeof val },
      error,
    );
    return null;
  }
}
