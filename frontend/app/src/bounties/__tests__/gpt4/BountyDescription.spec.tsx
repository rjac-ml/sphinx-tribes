import React from 'react';
import { shallow } from 'enzyme';
import BountyDescription from './BountyDescription';

describe('BountyDescription', () => {
  let props;
  beforeEach(() => {
    props = {
      description: 'https://test.com/image.png',
      codingLanguage: ['Python', 'JavaScript'],
      style: {},
      owner_pubkey: 'test_pubkey',
      img: 'test_img',
      id: 'test_id',
      widget: 'test_widget',
      owner_alias: 'test_alias',
      isPaid: true,
      org_img: 'test_org_img',
      name: 'test_name',
      uuid: 'test_uuid',
      title: 'test_title',
    };
  });

  it('renders without crashing', () => {
    shallow(<BountyDescription {...props} />);
  });

  it('sets the correct initial state', () => {
    const wrapper = shallow(<BountyDescription {...props} />);
    expect(wrapper.state().dataValue).toEqual([]);
    expect(wrapper.state().replitLink).toEqual('');
    expect(wrapper.state().descriptionImage).toEqual('');
  });

  it('updates state correctly when props change', () => {
    const wrapper = shallow(<BountyDescription {...props} />);
    wrapper.setProps({ description: 'https://test.com/new_image.png' });
    expect(wrapper.state().descriptionImage).toEqual('https://test.com/new_image.png');
  });

  it('renders the correct number of CodingLabels', () => {
    const wrapper = shallow(<BountyDescription {...props} />);
    expect(wrapper.find('CodingLabels').length).toEqual(props.codingLanguage.length);
  });

  it('renders the correct title', () => {
    const wrapper = shallow(<BountyDescription {...props} />);
    expect(wrapper.find('.DescriptionTitle').text()).toEqual(props.title);
  });

  it('renders the correct org name', () => {
    const wrapper = shallow(<BountyDescription {...props} />);
    expect(wrapper.find('OrganizationText').text()).toEqual(props.name);
  });

  it('renders the correct org image', () => {
    const wrapper = shallow(<BountyDescription {...props} />);
    expect(wrapper.find('Img').prop('src')).toEqual(props.org_img);
  });
});
