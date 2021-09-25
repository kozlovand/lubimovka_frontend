import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProjectCard } from './project-card';

export default {
  title: 'UI/project-card',
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => <ProjectCard {...args} />;

export const LubimovkaMore = Template.bind({});
LubimovkaMore.args = {  
  data: {
    imgUrl: 'http://rtcam.ru/images/lubimovka/projects/more.jpg',
    imgAlt: 'Люди в зрительном зале',
    title: 'Любимовка.Ещё',
    text: 'Межсезонные читки и обсуждение пьес из списка отмеченных отборщиками Любимовки. Можно слушать, обсуждать и даже участвовать',
  },
};
