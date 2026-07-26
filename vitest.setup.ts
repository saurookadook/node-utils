import { vi } from 'vitest';

const originalWindow = typeof window !== 'undefined' ? window : {};
const originalLocation =
  typeof global.window !== 'undefined' ? global.window.location : {};

const mockLocation = {
  ...originalLocation,
  assign: vi.fn(),
  origin: 'http://localhost:9999',
};

vi.stubGlobal('window', {
  ...originalWindow,
  location: mockLocation,
});
