import { render, screen } from '@testing-library/react';
import BountyDescription from './BountyDescription';
import { LanguageObject } from '../people/utils/languageLabelStyle';
import { colors } from '../config/colors';

describe('BountyDescription', () => {
  const color = colors['light'];
  const props = {
    title: 'This is a test bounty description',
    codingLanguage: ['Python', 'JavaScript'],
    owner_pubkey: 'test_pubkey',
    img: '/static/person_placeholder.png',
    id: 'test_id',
    widget: false,
    owner_alias: 'test_alias',
    isPaid: false,
    org_img: '/static/org_placeholder.png',
    org_name: 'Test Org',
    org_uuid: 'test_uuid',
    style: {},
    description: 'This is a test description with an image: https://example.com/image.png and a Replit link: https://replit.com/@test_user/test_project',
  };

  beforeEach(() => {
    render(<BountyDescription {...props} />);
  });

  it('should render the bounty description title', () => {
    expect(screen.getByText('This is a test bounty description')).toBeInTheDocument();
  });

  it('should render the coding language labels', () => {
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('should render the owner name and image', () => {
    expect(screen.getByText('test_alias')).toBeInTheDocument();
    expect(screen.getByAltText('test_alias')).toBeInTheDocument();
  });

  it('should render the organization name and image', () => {
    expect(screen.getByText('Test Org')).toBeInTheDocument();
    expect(screen.getByAltText('Test Org logo')).toBeInTheDocument();
  });

  it('should render the Replit link', () => {
    expect(screen.getByText('Replit')).toBeInTheDocument();
  });

  it('should render the description image', () => {
    expect(screen.getByAltText('description image')).toBeInTheDocument();
  });

  it('should render the bounty description with the correct colors when isPaid is true', () => {
    render(<BountyDescription {...props} isPaid={true} />);
    expect(screen.getByText('This is a test bounty description')).toHaveStyle({
      color: color.grayish.G50,
    });
    expect(screen.getByText('Python')).toHaveStyle({
      color: color.grayish.G300,
      borderColor: color.grayish.G06,
      backgroundColor: color.pureWhite,
    });
    expect(screen.getByText('JavaScript')).toHaveStyle({
      color: color.grayish.G300,
      borderColor: color.grayish.G06,
      backgroundColor: color.pureWhite,
    });
    expect(screen.getByAltText('description image')).toHaveStyle({
      opacity: 0.3,
      filter: 'grayscale(100%)',
    });
  });
});
