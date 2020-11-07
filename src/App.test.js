import { render, screen } from '@testing-library/react';

import Header from './components/Header'

test('renders the header correctly', async () => {
  render(<Header showInfo={false} />);
  const linkElement = screen.getByText(/polyrhythm generator/i);
  expect(linkElement).toBeInTheDocument();
});
