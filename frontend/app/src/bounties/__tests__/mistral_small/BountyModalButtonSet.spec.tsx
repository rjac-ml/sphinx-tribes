import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@elastic/eui/dist/eui_theme_light.css';
import ButtonSet from './ButtonSet';
import { colors } from '../config/colors';

describe('ButtonSet', () => {
  const defaultProps = {
    ButtonSetContainerStyle: {},
    showGithubBtn: true,
    githubShareAction: jest.fn(),
    replitLink: ['https://replit.com'],
    tribeFunction: jest.fn(),
    tribe: 'Test Tribe',
    copyURLAction: jest.fn(),
    copyStatus: 'Copied!',
    twitterAction: jest.fn(),
  };

  it('renders the component with all buttons', () => {
    const { getByText, getByRole } = render(<ButtonSet {...defaultProps} />);
    expect(getByText('Github Ticket')).toBeInTheDocument();
    expect(getByText('Replit')).toBeInTheDocument();
    expect(getByText('Test Tribe')).toBeInTheDocument();
    expect(getByText('Copied!')).toBeInTheDocument();
    expect(getByText('Share to Twitter')).toBeInTheDocument();

    expect(getByRole('button', { name: 'Github Ticket' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Replit' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Test Tribe' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Copied!' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Share to Twitter' })).toBeInTheDocument();
  });

  it('renders the component with disabled tribe button when tribe is None', () => {
    const { getByText } = render(
      <ButtonSet
        {...defaultProps}
        tribe={'None'}
        tribeFunction={jest.fn()}
      />
    );

    expect(getByText('No Tribe')).toHaveStyle(`opacity: 0.5`);
  });

  it('calls githubShareAction on Github Ticket button click', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText('Github Ticket'));
    expect(defaultProps.githubShareAction).toHaveBeenCalledTimes(1);
  });

  it('calls replitLink on Replit button click', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    const replitButton = getByText('Replit');
    fireEvent.click(replitButton);
    expect(defaultProps.replitLink[0]).toHaveBeenCalledWith(
      defaultProps.replitLink[0]
    );
  });

  it('calls tribeFunction on Tribe button click', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText('Test Tribe'));
    expect(defaultProps.tribeFunction).toHaveBeenCalledTimes(1);
  });

  it('calls copyURLAction on Copied! button click', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText('Copied!'));
    expect(defaultProps.copyURLAction).toHaveBeenCalledTimes(1);
  });

  it('calls twitterAction on Share to Twitter button click', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText('Share to Twitter'));
    expect(defaultProps.twitterAction).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const { container } = render(<ButtonSet {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
