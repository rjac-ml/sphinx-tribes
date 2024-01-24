import { render, screen } from '@testing-library/react';
import BountyPrice from './BountyPrice';
import { colors } from '../config/colors';

describe('BountyPrice', () => {
  it('should render the bounty price component', () => {
    const props = {
      price: 1000000,
      priceMin: 500000,
      sessionLength: 'Less than 1 hour',
    };
    render(<BountyPrice {...props} />);
    const priceContainer = screen.getByTestId('price-container');
    expect(priceContainer).toBeInTheDocument();
  });

  it('should render the price in dollars and cents', () => {
    const props = {
      price: 1000000,
      priceMin: 500000,
      sessionLength: 'Less than 1 hour',
    };
    render(<BountyPrice {...props} />);
    const usdPrice = screen.getByText('100,000 USD');
    expect(usdPrice).toBeInTheDocument();
  });

  it('should render the price in SAT', () => {
    const props = {
      price: 1000000,
      priceMin: 500000,
      sessionLength: 'Less than 1 hour',
    };
    render(<BountyPrice {...props} />);
    const satPrice = screen.getByText('SAT');
    expect(satPrice).toBeInTheDocument();
  });

  it('should render the session length', () => {
    const props = {
      price: 1000000,
      priceMin: 500000,
      sessionLength: 'Less than 1 hour',
    };
    render(<BountyPrice {...props} />);
    const sessionLength = screen.getByText('Est: < 1 hrs');
    expect(sessionLength).toBeInTheDocument();
  });

  it('should render the price in the correct color', () => {
    const props = {
      price: 1000000,
      priceMin: 500000,
      sessionLength: 'Less than 1 hour',
      style: {
        color: colors.primaryColor.P300,
      },
    };
    render(<BountyPrice {...props} />);
    const priceContainer = screen.getByTestId('price-container');
    expect(priceContainer).toHaveStyle('color: #007bff');
  });
});
