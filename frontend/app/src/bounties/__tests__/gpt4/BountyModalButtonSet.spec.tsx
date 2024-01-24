import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonSet from './ButtonSet';

describe('ButtonSet', () => {
  const mockGithubShareAction = jest.fn();
  const mockTribeFunction = jest.fn();
  const mockCopyURLAction = jest.fn();
  const mockTwitterAction = jest.fn();

  const defaultProps = {
    githubShareAction: mockGithubShareAction,
    tribeFunction: mockTribeFunction,
    copyURLAction: mockCopyURLAction,
    twitterAction: mockTwitterAction,
    tribe: 'Test Tribe',
    replitLink: ['https://replit.com'],
    copyStatus: 'Copy Status',
    showGithubBtn: true,
    ButtonSetContainerStyle: { backgroundColor: 'red' },
  };

  it('renders without crashing', () => {
    const { container } = render(<ButtonSet {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('renders Github button when showGithubBtn is true', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    expect(getByText('Github Ticket')).toBeInTheDocument();
  });

  it('does not render Github button when showGithubBtn is false', () => {
    const { queryByText } = render(<ButtonSet {...{ ...defaultProps, showGithubBtn: false }} />);
    expect(queryByText('Github Ticket')).toBeNull();
  });

  it('calls githubShareAction when Github button is clicked', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText('Github Ticket'));
    expect(mockGithubShareAction).toHaveBeenCalled();
  });

  it('calls tribeFunction when tribe button is clicked', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText(defaultProps.tribe.slice(0, 14)));
    expect(mockTribeFunction).toHaveBeenCalled();
  });

  it('calls copyURLAction when copy button is clicked', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText(defaultProps.copyStatus));
    expect(mockCopyURLAction).toHaveBeenCalled();
  });

  it('calls twitterAction when twitter button is clicked', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    fireEvent.click(getByText('Share to Twitter'));
    expect(mockTwitterAction).toHaveBeenCalled();
  });

  it('opens replit link when replit button is clicked', () => {
    const { getByText } = render(<ButtonSet {...defaultProps} />);
    const openSpy = jest.spyOn(window, 'open').mockImplementation();
    fireEvent.click(getByText('Replit'));
    expect(openSpy).toHaveBeenCalledWith(defaultProps.replitLink[0]);
  });
});
