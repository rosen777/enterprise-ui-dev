import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'test/utilities';
import TimeZone from '.';

const date = new Date(2023, 1, 1);

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(date);
});

afterEach(() => {
  vi.useRealTimers();
});

test('it should render successfully', () => {
  render(<TimeZone />);
});

test('should match the snapshot', async () => {
  const { container } = render(<TimeZone />);
  expect(container).toMatchSnapshot();
});
