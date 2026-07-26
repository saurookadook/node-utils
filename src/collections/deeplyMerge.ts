import type { KeyedObject } from '../types/main';

/**
 * @description Recursively merge source objects into target object.
 *
 * @param target The target object of the merge operation.
 * @param sources One or more source objects to merge into target object.
 * @returns The original target object with all sources recursively merged into it.
 */
export function deeplyMerge<
  T extends KeyedObject = KeyedObject,
  S extends KeyedObject = KeyedObject,
>(target: T, ...sources: S[]): T {
  if (!isObject(target)) {
    throw new TypeError("[deeplyMerge] : argument 'target' must be an object!");
  }

  const sourceObjects = sources.reduce((acc, cur) => {
    if (!isObject(cur)) {
      console.warn(
        `[deeplyMerge] : argument '${cur}' excluded as it is not an \`Object\``,
      );
    } else {
      acc.push(cur);
    }

    return acc;
  }, [] as S[]);

  if (sourceObjects.length === 0) {
    console.warn(
      '[deeplyMerge] : no valid source objects provided. Returning original target object.',
    );
    return target;
  }

  for (const sourceObj of sourceObjects) {
    for (const [sourceKey, sourceValue] of Object.entries(sourceObj)) {
      // @ts-expect-error: The argument will definitely be indexable
      target[sourceKey] = handleAssignment({
        assignmentTarget: target[sourceKey],
        targetValue: sourceValue,
      });
    }
  }

  return target;
}

function handleAssignment({
  assignmentTarget,
  targetValue,
}: {
  assignmentTarget: unknown;
  targetValue: unknown;
}) {
  if (isMergeableObject(targetValue)) {
    const base = isMergeableObject(assignmentTarget) ? assignmentTarget : {};
    return deeplyMerge(base, targetValue);
  }

  if (Array.isArray(targetValue)) {
    return Array.isArray(assignmentTarget)
      ? [...assignmentTarget, ...targetValue]
      : [...targetValue];
  }

  return targetValue;
}

function isObject(val: unknown): val is KeyedObject {
  return typeof val === 'object' && val != null && !Array.isArray(val);
}

function isMergeableObject(val: unknown): val is KeyedObject {
  return isObject(val) && !(val instanceof Date) && !(val instanceof RegExp);
}
