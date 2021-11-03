import { ComponentStory, ComponentMeta } from '@storybook/react';

import PersonCard from './person-card';

export default {
  title: 'UI/PersonCard',
  component: PersonCard,

} as ComponentMeta<typeof PersonCard>;

const exampleHandler = () => {
  console.log('Click!');
};

const Template: ComponentStory<typeof PersonCard> = (args) => <PersonCard {...args} />;

export const Volunteer = Template.bind({});
Volunteer.args = {
  name: 'Тереза Шимчак',
  link: 'https://images.unsplash.com/photo-1630255732364-a69ade0f0543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  response: 'Очень интересный фестиваль',
  handleClick: exampleHandler
};

export const Participant = Template.bind({});
Participant.args = {
  name: 'Тереза Шимчак',
  link: 'https://images.unsplash.com/photo-1630255732364-a69ade0f0543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  about: 'Драматург, сценарист, преподаватель',
  participant: true,
};
