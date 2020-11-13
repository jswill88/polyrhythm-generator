import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header'

function TestComponent() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Header showInfo={showInfo} setShowInfo={setShowInfo} />
  );
}


describe('header tests', () => {
  
  render(<TestComponent/>);
  const heading = screen.getByText(/polyrhythm generator/i);
  const image = screen.getByAltText('Logo')
  const button = screen.getByRole('button');

  it('renders the header correctly', async () => {
    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })
});
