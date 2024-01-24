import { render, screen } from '@testing-library/react';
import ButtonSet from './ButtonSet';
import { EuiText } from '@elastic/eui';
import { ButtonContainer } from 'components/common';

describe('ButtonSet', () => {
  it('should render the Github button', () => {
    render(<ButtonSet showGithubBtn={true} />);
    const githubButton = screen.getByText('Github Ticket');
    expect(githubButton).toBeInTheDocument();
  });

  it('should render the Replit button', () => {
    render(<ButtonSet replitLink={['https://replit.com/join/1234567890']} />);
    const replitButton = screen.getByText('Replit');
    expect(replitButton).toBeInTheDocument();
  });

  it('should render the Tribe button', () => {
    render(<ButtonSet tribe={'My Tribe'} tribeFunction={() => {}} />);
    const tribeButton = screen.getByText('My Tribe');
    expect(tribeButton).toBeInTheDocument();
  });

  it('should render the Copy URL button', () => {
    render(<ButtonSet copyURLAction={() => {}} copyStatus={'Copied!'} />);
    const copyURLButton = screen.getByText('Copied!');
    expect(copyURLButton).toBeInTheDocument();
  });

  it('should render the Twitter button', () => {
    render(<ButtonSet twitterAction={() => {}} />);
    const twitterButton = screen.getByText('Share to Twitter');
    expect(twitterButton).toBeInTheDocument();
  });

  it('should render the custom styles for the ButtonSetContainer', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<ButtonSet ButtonSetContainerStyle={customStyle} />);
    const buttonSetContainer = screen.getByTestId('button-set-container');
    expect(buttonSetContainer).toHaveStyle('background-color: red');
  });

  it('should render the custom styles for the ButtonContainer', () => {
    const customStyle = { color: 'blue' };
    render(<ButtonSet twitterAction={() => {}} ButtonContainerStyle={customStyle} />);
    const twitterButton = screen.getByText('Share to Twitter');
    expect(twitterButton).toHaveStyle('color: blue');
  });

  it('should render the custom styles for the EuiText', () => {
    const customStyle = { fontSize: '20px' };
    render(<ButtonSet twitterAction={() => {}} EuiTextStyle={customStyle} />);
    const twitterButton = screen.getByText('Share to Twitter');
    expect(twitterButton).toHaveStyle('font-size: 20px');
  });

  it('should render the custom styles for the ImageContainer', () => {
    const customStyle = { display: 'none' };
    render(<ButtonSet twitterAction={() => {}} ImageContainerStyle={customStyle} />);
    const twitterButton = screen.getByText('Share to Twitter');
    expect(twitterButton).not.toHaveStyle('display: none');
  });

  it('should render the custom styles for the LeadingImageContainer', () => {
    const customStyle = { marginLeft: '10px' };
    render(<ButtonSet twitterAction={() => {}} LeadingImageContainerStyle={customStyle} />);
    const twitterButton = screen.getByText('Share to Twitter');
    expect(twitterButton).toHaveStyle('margin-left: 10px');
  });

  it('should render the custom styles for the ButtonText', () => {
    const customStyle = { color: 'green' };
    render(<ButtonSet twitterAction={() => {}} ButtonTextStyle={customStyle} />);
    const twitterButton = screen.getByText('Share to Twitter');
    expect(twitterButton).toHaveStyle('color: green');
  });

  it('should render the custom styles for the buttonImage', () => {
    const customStyle = { height: '30px' };
    render(<ButtonSet twitterAction={() => {}} buttonImageStyle={customStyle} />);
    const twitterButton = screen.getByText('Share to Twitter');
    expect(twitterButton).toHaveStyle('height: 30px');
  });
});
