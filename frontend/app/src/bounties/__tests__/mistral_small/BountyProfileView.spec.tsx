import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BountyProfileView } from './BountyProfileView';
import { Provider } from 'mobx-react';
import { MainStore } from '../store';

const mainStore = new MainStore();

const renderComponent = (props: Partial<BountiesProfileProps> = {}) => {
  const defaultProps: BountiesProfileProps = {
    assignee: {
      owner_alias: 'Test Alias',
      owner_pubkey: 'test-pubkey',
      img: 'test-image-url',
    },
    status: 'Active',
    isNameClickable: true,
    canViewProfile: true,
  };

  return render(
    <Provider mainStore={mainStore}>
      <BountyProfileView {...defaultProps} {...props} />
    </Provider>
  );
};

describe('BountyProfileView', () => {
  test('renders the component with default props', () => {
    renderComponent();
    expect(screen.getByText('Test Alias')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByAltText('assigned_person')).toHaveAttribute(
      'src',
      'test-image-url'
    );
  });

  test('renders the component with custom UserProfileContainerStyle', () => {
    renderComponent({
      UserProfileContainerStyle: {
        backgroundColor: 'red',
      },
    });
    expect(screen.getByTestId('user-profile-container')).toHaveStyle('background-color: red;');
  });

  test('renders the component without ViewProfileButton when canViewProfile is false', () => {
    renderComponent({
      canViewProfile: false,
    });
    expect(screen.queryByText('View Profile')).not.toBeInTheDocument();
  });

  test('opens a new tab when NameContainer is clicked', () => {
    const mockOpen = jest.spyOn(window, 'open');
    renderComponent();
    fireEvent.click(screen.getByText('Test Alias'));
    expect(mockOpen).toHaveBeenCalledWith(
      '/p/test-pubkey?widget=wanted',
      '_blank'
    );
  });

  test('opens a new tab when ViewProfileButton is clicked', () => {
    const mockOpen = jest.spyOn(window, 'open');
    renderComponent();
    fireEvent.click(screen.getByText('View Profile'));
    expect(mockOpen).toHaveBeenCalledWith(
      '/p/test-pubkey?widget=wanted',
      '_blank'
    );
  });
});
