import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EuiText } from '@elastic/eui';
import MaterialIcon from '@material/react-material-icon';
import { observer } from 'mobx-react-lite';
import { useStores } from '../store';
import BountyProfileView from './BountyProfileView';

jest.mock('@elastic/eui', () => ({
  EuiText: jest.fn(() => <div>EuiText</div>),
}));

jest.mock('@material/react-material-icon', () => jest.fn(() => <div>MaterialIcon</div>));

jest.mock('../store', () => ({
  useStores: jest.fn(() => ({
    main: {
      getUserAvatarPlaceholder: jest.fn(),
    },
  })),
}));

jest.mock('mobx-react-lite', () => ({
  observer: (component) => component,
}));

describe('BountyProfileView', () => {
  const mockProps = {
    assignee: {
      img: 'testImg',
      owner_pubkey: 'testPubkey',
      owner_alias: 'testAlias',
    },
    status: 'testStatus',
    isNameClickable: true,
    canViewProfile: true,
  };

  it('renders correctly', () => {
    const { getByText } = render(<BountyProfileView {...mockProps} />);
    expect(getByText('EuiText')).toBeInTheDocument();
    expect(getByText('MaterialIcon')).toBeInTheDocument();
  });

  it('opens a new tab when name is clicked', () => {
    window.open = jest.fn();
    const { getByText } = render(<BountyProfileView {...mockProps} />);
    fireEvent.click(getByText('EuiText'));
    expect(window.open).toHaveBeenCalledWith('/p/testPubkey?widget=wanted', '_blank');
  });

  it('opens a new tab when view profile is clicked', () => {
    window.open = jest.fn();
    const { getByText } = render(<BountyProfileView {...mockProps} />);
    fireEvent.click(getByText('View Profile'));
    expect(window.open).toHaveBeenCalledWith('/p/testPubkey?widget=wanted', '_blank');
  });
});
