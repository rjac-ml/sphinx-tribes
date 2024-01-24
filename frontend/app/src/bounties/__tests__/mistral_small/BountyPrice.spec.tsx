import React from 'react';
import { render, screen } from '@testing-library/react';
import '@elastic/eui/dist/eui_theme_light.css';
import { BountyPrice } from './BountyPrice';
import { DollarConverter, satToUsd } from '../helpers';
import { colors } from '../config/colors';

describe('BountyPrice', () => {
  const mockPrice = 1000000;
  const mockPriceMin = 500000;
  const mockSessionLength = 'Less than 1 hour';
  const mockSession = {
    label: 'Less than 1 hour',
    value: '< 1 hrs'
  };

  beforeEach(() => {
    jest.spyOn(global, 'satToUsd').mockImplementation(() => 1);
    jest.spyOn(global, 'DollarConverter').mockImplementation((amount: number) => `$${amount}`);
  });

  afterEach(() => {
    global.satToUsd.mockRestore();
    global.DollarConverter.mockRestore();
  });

  test('renders correctly with price and session length', () => {
    render(
      <BountyPrice
        price={mockPrice}
        priceMin={mockPriceMin}
        sessionLength={mockSessionLength}
      />
    );

    const priceText = screen.getByText('$1');
    const satText = screen.getByText('SAT');
    const usdText = screen.getByText('1 USD');
    const sessionText = screen.getByText('Est: < 1 hrs');

    expect(priceText).toBeInTheDocument();
    expect(satText).toBeInTheDocument();
    expect(usdText).toBeInTheDocument();
    expect(sessionText).toBeInTheDocument();
  });

  test('renders correctly with price and no session length', () => {
    render(<BountyPrice price={mockPrice} />);

    const priceText = screen.getByText('$1');
    const satText = screen.getByText('SAT');
    const usdText = screen.getByText('1 USD');

    expect(priceText).toBeInTheDocument();
    expect(satText).toBeInTheDocument();
    expect(usdText).toBeInTheDocument();
  });

  test('renders correctly with priceMin and session length', () => {
    render(
      <BountyPrice priceMin={mockPriceMin} sessionLength={mockSessionLength} />
    );

    const priceText = screen.getByText('$0.5');
    const satText = screen.getByText('SAT');
    const usdText = screen.getByText('0.5 USD');
    const sessionText = screen.getByText('Est: < 1 hrs');

    expect(priceText).toBeInTheDocument();
    expect(satText).toBeInTheDocument();
    expect(usdText).toBeInTheDocument();
    expect(sessionText).toBeInTheDocument();
  });

  test('renders correctly with priceMin and no session length', () => {
    render(<BountyPrice priceMin={mockPriceMin} />);

    const priceText = screen.getByText('$0.5');
    const satText = screen.getByText('SAT');
    const usdText = screen.getByText('0.5 USD');

    expect(priceText).toBeInTheDocument();
    expect(satText).toBeInTheDocument();
    expect(usdText).toBeInTheDocument();
  });

  test('displays the correct session value', () => {
    render(<BountyPrice sessionLength={mockSessionLength} />);

    const sessionText = screen.getByText('Est: < 1 hrs');

    expect(sessionText).toBeInTheDocument();
  });

  test('displays the correct session value when session length is not sure', () => {
    const notSureSession = {
      label: 'Not sure yet',
      value: 'Not Sure'
    };

    render(<BountyPrice sessionLength={notSureSession.label} />);

    const sessionText = screen.getByText('Est: Not Sure');

    expect(sessionText).toBeInTheDocument();
  });
});
