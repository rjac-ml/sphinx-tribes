import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BountyPrice from './BountyPrice';

afterEach(cleanup);

describe('BountyPrice', () => {
  const props = {
    price: 100,
    priceMin: 50,
    sessionLength: 'Less than 1 hour',
    style: { color: 'red' },
  };

  it('renders without crashing', () => {
    const { container } = render(<BountyPrice {...props} />);
    expect(container).toBeTruthy();
  });

  it('displays the correct price', () => {
    const { getByText } = render(<BountyPrice {...props} />);
    expect(getByText('$50')).toBeInTheDocument();
  });

  it('displays the correct session length', () => {
    const { getByText } = render(<BountyPrice {...props} />);
    expect(getByText('< 1 hrs')).toBeInTheDocument();
  });

  it('displays the correct USD price', () => {
    const { getByText } = render(<BountyPrice {...props} />);
    expect(getByText('50 USD')).toBeInTheDocument();
  });

  it('displays the correct session length when not sure', () => {
    const newProps = { ...props, sessionLength: 'Not sure yet' };
    const { getByText } = render(<BountyPrice {...newProps} />);
    expect(getByText('Not Sure')).toBeInTheDocument();
  });

  it('displays the correct price when priceMin is not provided', () => {
    const newProps = { ...props, priceMin: undefined };
    const { getByText } = render(<BountyPrice {...newProps} />);
    expect(getByText('$100')).toBeInTheDocument();
  });

  it('displays the correct USD price when priceMin is not provided', () => {
    const newProps = { ...props, priceMin: undefined };
    const { getByText } = render(<BountyPrice {...newProps} />);
    expect(getByText('100 USD')).toBeInTheDocument();
  });
});
