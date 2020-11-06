import { render, screen } from '@testing-library/react';

import Header from './components/Header'

test('renders the header correctly', () => {
  const { container } = render(<Header />);
  const linkElement = screen.getByText(/polyrhythm generator/i);
  expect(linkElement).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
