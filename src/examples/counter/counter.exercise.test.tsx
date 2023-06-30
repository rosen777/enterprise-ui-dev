import { screen } from '@testing-library/react';
import { render } from './test/utilities';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={50} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('50');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={65} />);
  const currentCount = screen.getByTestId('current-count');
  const resetButton = screen.getByRole('button', {
    name: /reset/i,
  });
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  await user.click(incrementButton);
  await user.click(incrementButton);
  await user.click(resetButton);
  expect(currentCount).toHaveTextContent('0');
});
