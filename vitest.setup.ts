import { vi } from 'vitest';

const originalLocation = typeof window !== 'undefined' ? window.location : {};

const mockLocation = {
  ...originalLocation,
  assign: vi.fn(),
};

vi.stubGlobal('location', mockLocation);
