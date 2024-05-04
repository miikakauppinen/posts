import React from 'react';
import { render, screen } from '@testing-library/react';
import Posts from './components/posts/Posts';
import { Provider } from 'react-redux';
import { store } from './store';

test('renders add post button', () => {
  render(<Provider store={store}><Posts /></Provider>);
  const addPostButton = screen.queryByText(/add post/i);
  expect(addPostButton).toBeInTheDocument();
});
