import type { Nullable } from '@/types/main';

interface Opts {
  min?: number;
  roundFunc?: (value: number) => number;
  step?: number;
}

/**
 * @description Rounds a given number to the nearest multiple of a specified `step` value,
 * ensuring that the result is not less than a specified `min` value.
 *
 * @param num The number to be rounded.
 * @param opts An optional object containing the rounding options.
 * @param opts.min The minimum allowable value (default is `5`).
 * @param opts.roundFunc The rounding function to use (default is `Math.round`).
 * @param opts.step The step size to which to round (default is `5`).
 *
 * @returns The rounded number, not less than the specified `min` value.
 */
export function roundToNearestStepWithMin(
  num: number,
  opts: Nullable<Opts> = null,
): number {
  const min = opts?.min ?? 5;
  const roundFunc = opts?.roundFunc ?? Math.round;
  const step = opts?.step ?? 5;

  if (!Number.isFinite(step) || step <= 0) {
    throw new RangeError(
      "[roundToNearestStepWithMin] : Invalid 'step' value. It must be a positive finite number.",
    );
  }

  return Math.max(min, roundFunc(num / step) * step);
}
