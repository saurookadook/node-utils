function kebabifyReplacer(
  _match: string,
  p1?: string | any,
  p2?: string | any,
  p3?: string | any,
  p4?: string | any,
) {
  if (p1 != null) return '-';
  if (p2 != null) return `${p2[0]}-${p2[1]}`.toLowerCase();
  if (p3 != null) {
    return p3.length > 1 ? `-${p3[1].toLowerCase()}` : '-';
  }
  if (p4 != null) return p4.toLowerCase();
}

export function kebabify(str: string): string {
  return str.replace(/(_)|([a-z][A-Z])|([ ][A-Z]?)|(^[A-Z])/gm, kebabifyReplacer);
}

export function camelToSnake(str: string): string {
  let transformed = str.replace(/(^[A-Z])|([A-Z])/gm, (_match, p1, p2) => {
    if (p1 != null) return p1.toLowerCase();
    if (p2 != null) return `_${p2.toLowerCase()}`;
    return '';
  });

  if (transformed.length > 0) {
    transformed = transformed[0].toLowerCase() + transformed.slice(1);
  }

  return transformed;
}

export function snakeToCamel(str: string): string {
  return str.replace(/^[_]+|_+([A-Za-z0-9]+)|([_]+$)/gm, (_match, p1, p2) => {
    if (p1 == null || p2 != null) return '';
    return capitalizeFirstLetter(p1);
  });
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @description Converts a 'camelCase' string to a 'Title Case' string.
 *
 * @example
 * ```js
 * const camelCaseStr = 'thisIsCamelCase';
 *
 * console.log(camelToTitle(camelCaseStr));
 * //=> 'This Is Camel Case'
 * ```
 */
export function camelToTitle(str: string): string {
  const separateWords = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return capitalizeFirstLetter(separateWords);
}

/**
 * @description Converts a 'snake_case' string to a 'Title Case' string.
 * However if the provided string begins with an underscore _(such as `_id`)_,
 * then the provided string will be returned as-is.
 *
 * @example
 * ```js
 * const snakeCaseStr = 'this_is_snake_case';
 *
 * console.log(snakeToTitle(snakeCaseStr));
 * //=> 'This Is Snake Case'
 * ```
 */
export function snakeToTitle(str: string): string {
  if (str.charAt(0) === '_') {
    return str;
  }

  return str.split('_').map(capitalizeFirstLetter).join(' ').trim();
}
