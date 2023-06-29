// @vitest-environment happy-dom

import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  fireEvent.click(incrementButton);
  expect(currentCount).toHaveTextContent('1');
});
