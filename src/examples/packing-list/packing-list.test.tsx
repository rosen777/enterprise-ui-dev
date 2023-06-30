import { Provider } from 'react-redux';
import { render as _render, screen, waitFor } from 'test/utilities';
import PackingList from '.';
import { createStore } from './store';
import { PropsWithChildren } from 'react';

const render: typeof _render = (Component, options) => {
  const store = createStore();
  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return _render(Component, { ...options, wrapper: Wrapper });
};

it('_renders the Packing List application', () => {
  render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', {
    name: 'Add New Item',
  });

  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it.todo(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
    const { user } = render(<PackingList />);
    const newItemInput = screen.getByLabelText('New Item Name');
    const addNewItemButton = screen.getByRole('button', {
      name: 'Add New Item',
    });
    await user.type(newItemInput, 'MacBook Pro');

    expect(addNewItemButton).toBeEnabled();
  },
);

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', {
    name: 'Add New Item',
  });
  await user.type(newItemInput, 'MacBook Pro');
  await user.click(addNewItemButton);

  expect(screen.getByLabelText('MacBook Pro')).not.toBeChecked();
});

it('Remove an item', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', {
    name: 'Add New Item',
  });
  await user.type(newItemInput, 'iPad Pro');
  await user.click(addNewItemButton);

  const removeItem = screen.getAllByLabelText(/remove/i);

  await user.click(removeItem[1]);

  await waitFor(() => expect(removeItem[1]).not.toBeInTheDocument());
});
