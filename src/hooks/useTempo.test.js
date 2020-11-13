import { render, screen} from '@testing-library/react';

import useTempo from './useTempo';

function TestComponent() {
  const [tempo, setTempo] = useTempo();
  return (
    <>
      <h1 data-testid={1}>{tempo}</h1>
      {setTempo}
    </>
  );
}

const { container } = render(<TestComponent />);
let slider = container.querySelector('.MuiSlider-root')
let renderedTempo = screen.getByTestId('1')

describe('useTempo tests', () => {
  it('has the correct initial state', () => {
    expect(renderedTempo).toHaveTextContent(100);
    expect(slider).toBeInTheDocument();
  })
})

