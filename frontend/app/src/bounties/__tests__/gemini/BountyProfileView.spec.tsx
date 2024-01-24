import { render, screen } from '@testing-library/react';
import BountyProfileView from './BountyProfileView';
import { EuiText } from '@elastic/eui';
import MaterialIcon from '@material/react-material-icon';
import { LazyImg } from '../components/common';
import { colors } from '../config/colors';
import { BountiesProfileProps } from './interfaces';

const mockProps: BountiesProfileProps = {
  assignee: {
    img: 'https://example.com/image.png',
    owner_alias: 'John Doe',
    owner_pubkey: '0x1234567890abcdef',
  },
  canViewProfile: true,
  isNameClickable: true,
  status: 'Active',
};

describe('BountyProfileView', () => {
  it('should render the bounty profile view', () => {
    render(<BountyProfileView {...mockProps} />);

    // Assert that the user image is rendered
    const userImage = screen.getByTestId('user-image');
    expect(userImage).toBeInTheDocument();

    // Assert that the lazy image is rendered
    const lazyImg = screen.getByTestId('lazy-img');
    expect(lazyImg).toBeInTheDocument();

    // Assert that the user info is rendered
    const userInfo = screen.getByTestId('user-info');
    expect(userInfo).toBeInTheDocument();

    // Assert that the status is rendered
    const status = screen.getByTestId('status');
    expect(status).toBeInTheDocument();

    // Assert that the status text is rendered
    const statusText = screen.getByText('Active');
    expect(statusText).toBeInTheDocument();

    // Assert that the name container is rendered
    const nameContainer = screen.getByTestId('name-container');
    expect(nameContainer).toBeInTheDocument();

    // Assert that the name text is rendered
    const nameText = screen.getByText('John Doe');
    expect(nameText).toBeInTheDocument();

    // Assert that the view profile button is rendered
    const viewProfileButton = screen.getByTestId('view-profile-button');
    expect(viewProfileButton).toBeInTheDocument();

    // Assert that the view profile text is rendered
    const viewProfileText = screen.getByText('View Profile');
    expect(viewProfileText).toBeInTheDocument();

    // Assert that the material icon is rendered
    const materialIcon = screen.getByTestId('material-icon');
    expect(materialIcon).toBeInTheDocument();
  });

  it('should open the user profile page when the name is clicked', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<BountyProfileView {...mockProps} />);

    // Click on the name container
    const nameContainer = screen.getByTestId('name-container');
    nameContainer.click();

    // Assert that the user profile page was opened
    expect(mockOpen).toHaveBeenCalledWith(
      `/p/${mockProps.assignee.owner_pubkey}?widget=wanted`,
      '_blank'
    );
  });

  it('should open the user profile page when the view profile button is clicked', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<BountyProfileView {...mockProps} />);

    // Click on the view profile button
    const viewProfileButton = screen.getByTestId('view-profile-button');
    viewProfileButton.click();

    // Assert that the user profile page was opened
    expect(mockOpen).toHaveBeenCalledWith(
      `/p/${mockProps.assignee.owner_pubkey}?widget=wanted`,
      '_blank'
    );
  });

  it('should not open the user profile page when the name is not clickable', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<BountyProfileView {...mockProps} isNameClickable={false} />);

    // Click on the name container
    const nameContainer = screen.getByTestId('name-container');
    nameContainer.click();

    // Assert that the user profile page was not opened
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('should not open the user profile page when the view profile button is not clickable', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<BountyProfileView {...mockProps} canViewProfile={false} />);

    // Click on the view profile button
    const viewProfileButton = screen.getByTestId('view-profile-button');
    viewProfileButton.click();

    // Assert that the user profile page was not opened
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('should render the bounty profile view with custom styles', () => {
    const customStyles = {
      UserProfileContainer: {
        backgroundColor: 'red',
      },
      UserImage: {
        border: '1px solid black',
      },
      UserInfo: {
        marginLeft: '50px',
      },
      Status: {
        backgroundColor: 'green',
      },
      NameContainer: {
        color: 'blue',
      },
      ViewProfileButton: {
        color: 'orange',
      },
    };

    render(<BountyProfileView {...mockProps} {...customStyles} />);

    // Assert that the user profile container has the custom style
    const userProfileContainer = screen.getByTestId('user-profile-container');
    expect(userProfileContainer).toHaveStyle('background-color: red');

    // Assert that the user image has the custom style
    const userImage = screen.getByTestId('user-image');
    expect(userImage).toHaveStyle('border: 1px solid black');

    // Assert that the user info has the custom style
    const userInfo = screen.getByTestId('user-info');
    expect(userInfo).toHaveStyle('margin-left: 50px');

    // Assert that the status has the custom style
    const status = screen.getByTestId('status');
    expect(status).toHaveStyle('background-color: green');

    // Assert that the name container has the custom style
    const nameContainer = screen.getByTestId('name-container');
    expect(nameContainer).toHaveStyle('color: blue');

    // Assert that the view profile button has the custom style
    const viewProfileButton = screen.getByTestId('view-profile-button');
    expect(viewProfileButton).toHaveStyle('color: orange');
  });
});
