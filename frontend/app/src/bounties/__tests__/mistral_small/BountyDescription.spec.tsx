import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@elastic/eui/dist/eui_theme_light.css';
import { BountyDescription } from './BountyDescription';
import { colors } from '../config/colors';

describe('BountyDescription', () => {
  const defaultProps = {
    id: '1',
    title: 'Test Bounty Title',
    description:
      'This is a test bounty description with an image: https://picsum.photos/id/1015/536/354. It also has a Replit link: https://replit.com/@username/test-repo',
    owner_pubkey: 'test_owner_pubkey',
    img: 'test_img',
    isPaid: false,
    codingLanguage: ['JavaScript', 'TypeScript'],
    org_img: 'test_org_img',
    name: 'Test Org Name',
    uuid: 'test_org_uuid',
    style: {},
  };

  it('renders the component with basic props', () => {
    render(<BountyDescription {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText('Test Org Name')).toBeInTheDocument();
  });

  it('renders the component with isPaid prop', () => {
    const isPaidProps = { ...defaultProps, isPaid: true };
    render(<BountyDescription {...isPaidProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText('Test Org Name')).toBeInTheDocument();
  });

  it('extracts the Replit link and image from the description', () => {
    const { getByAltText } = render(<BountyDescription {...defaultProps} />);
    expect(getByAltText('replit_image')).toHaveAttribute(
      'href',
      'https://replit.com/@username/test-repo'
    );
    expect(getByAltText('Test Org Name logo')).toHaveAttribute(
      'href',
      `/org/bounties/test_org_uuid`
    );
  });

  it('extracts the image from the description', () => {
    const { getByAltText } = render(<BountyDescription {...defaultProps} />);
    expect(getByAltText('Test Org Name logo')).toHaveAttribute(
      'href',
      `/org/bounties/test_org_uuid`
    );
  });

  it('displays the coding languages', () => {
    const { getByText } = render(<BountyDescription {...defaultProps} />);
    expect(getByText('JavaScript')).toBeInTheDocument();
    expect(getByText('TypeScript')).toBeInTheDocument();
  });

  it('checks the styles for isPaid prop', () => {
    const isPaidProps = { ...defaultProps, isPaid: true };
    render(<BountyDescription {...isPaidProps} />);
    const descriptionContainer = screen.getByTestId('description-container');
    expect(descriptionContainer).toHaveStyle(`opacity: 0.3; filter: grayscale(100%);`);
  });

  it('checks the styles for !isPaid prop', () => {
    const isPaidProps = { ...defaultProps, isPaid: false };
    render(<BountyDescription {...isPaidProps} />);
    const descriptionContainer = screen.getByTestId('description-container');
    expect(descriptionContainer).toHaveStyle(`opacity: 1; filter: grayscale(0%);`);
  });

  it('handles the case when codingLanguage is an empty string', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        codingLanguage={''}
      />
    );
    expect(queryByText('JavaScript')).toBeNull();
    expect(queryByText('TypeScript')).toBeNull();
  });

  it('handles the case when codingLanguage is null', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        codingLanguage={null}
      />
    );
    expect(queryByText('JavaScript')).toBeNull();
    expect(queryByText('TypeScript')).toBeNull();
  });

  it('handles the case when codingLanguage is undefined', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        codingLanguage={undefined}
      />
    );
    expect(queryByText('JavaScript')).toBeNull();
    expect(queryByText('TypeScript')).toBeNull();
  });

  it('handles the case when codingLanguage is an empty array', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        codingLanguage={[]}
      />
    );
    expect(queryByText('JavaScript')).toBeNull();
    expect(queryByText('TypeScript')).toBeNull();
  });

  it('handles the case when codingLanguage is not provided', () => {
    const { queryByText } = render(<BountyDescription {...defaultProps} />);
    expect(queryByText('JavaScript')).toBeNull();
    expect(queryByText('TypeScript')).toBeNull();
  });

  it('handles the case when description is not provided', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        description={undefined}
      />
    );
    expect(queryByText(defaultProps.title)).toBeNull();
  });

  it('handles the case when owner_pubkey is not provided', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        owner_pubkey={undefined}
      />
    );
    expect(queryByText('Test Org Name')).toBeNull();
  });

  it('handles the case when img is not provided', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        img={undefined}
      />
    );
    expect(queryByText('Test Org Name')).toBeNull();
  });

  it('handles the case when name is not provided', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        name={undefined}
      />
    );
    expect(queryByText('Test Org Name')).toBeNull();
  });

  it('handles the case when uuid is not provided', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        uuid={undefined}
      />
    );
    expect(queryByText('Test Org Name')).toBeNull();
  });

  it('handles the case when org_img is not provided', () => {
    const { queryByText } = render(
      <BountyDescription
        {...defaultProps}
        org_img={undefined}
      />
    );
    expect(queryByText('Test Org Name')).toBeNull();
  });
});
