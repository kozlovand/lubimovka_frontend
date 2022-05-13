//@ts-nocheck
import { Fragment, useMemo } from 'react';
import classNames from 'classnames/bind';

import { PhotoGallery } from 'components/photo-gallery';
import { BasicPlayCardList } from 'components/ui/basic-play-card-list';
import { BasicPlayCard } from 'components/ui/basic-play-card';
import { PerformanceSection } from 'components/performance-section';
import { AnnouncedPlayCard } from 'components/ui/announced-play-card';
import { PersonCard } from 'components/ui/person-card';
import { PersonCardList } from 'components/person-card-list';
import { Video } from 'components/video';
import { VideoList } from 'components/video-list';
import { HTMLMarkup } from 'components/html-markup';
import { format } from 'shared/helpers/format-date';
import { ConstructorContentSection } from './section';
import { ConstructorBlockType } from './constructor-content.const';
import { ConstructorContentContextProvider } from './constructor-content.context';

import type { FC } from 'react';
import { ConstructorBlock } from './constructor-content.types';

import projectStyles from './variant/project.module.css';

interface ConstructorContentProps {
  variant: 'project'
  blocks: ConstructorBlock[]
}

const variants = {
  project: projectStyles,
};

export const ConstructorContent: FC<ConstructorContentProps> = (props) => {
  const {
    variant = 'project',
    blocks,
  } = props;
  const cx = useMemo(() => classNames.bind(variants[variant]), [variant]);

  return (
    <ConstructorContentContextProvider
      value={{
        styles: variants[variant],
      }}
    >
      <div className={cx('root')}>
        {blocks.map(({ content_type, content_item }, index) => (
          <Fragment key={index}>
            {/* Обычные текстовые блоки без разметки являются legacy и будут удалены */}
            {content_type === ConstructorBlockType.PlainText && (
              <ConstructorContentSection type="plain-text">
                <HTMLMarkup
                  markup={content_item.text}
                />
              </ConstructorContentSection>
            )}
            {content_type === ConstructorBlockType.HtmlMarkup && (
              <ConstructorContentSection type="html-markup">
                <HTMLMarkup
                  markup={content_item.rich_text}
                />
              </ConstructorContentSection>
            )}
            {content_type === ConstructorBlockType.Images && (
              <ConstructorContentSection
                type="images"
                title={content_item.title}
              >
                <PhotoGallery
                  photos={content_item.items.map(({ image, title }) => ({
                    url: image,
                    description: title,
                  }))}
                />
              </ConstructorContentSection>
            )}
            {content_type === ConstructorBlockType.Plays && (
              <ConstructorContentSection
                type="plays"
                title={content_item.title}
              >
                <BasicPlayCardList>
                  {content_item.items.map(({ id, name, city, year, authors }) => (
                    <BasicPlayCard
                      key={id}
                      play={{
                        title: name,
                        city,
                        year,
                        authors: authors,
                      }}
                    />
                  ))}
                </BasicPlayCardList>
              </ConstructorContentSection>
            )}
            {content_type === ConstructorBlockType.Events && (
              <PerformanceSection
                className={cx('events')}
                title={content_item.title}
              >
                {content_item.items.map(({
                  id,
                  date_time,
                  event_body: {
                    name,
                    team,
                    image,
                    project_title,
                  },
                  url,
                }) => (
                  <AnnouncedPlayCard
                    key={id}
                    isPerformance
                    id={id}
                    formattedDate={format('d MMMM', new Date(date_time))}
                    formattedTime={format('H:mm', new Date(date_time))}
                    title={name}
                    team={team}
                    buttonLink={url}
                    imageUrl={image}
                    project={project_title}
                    paid
                  />
                ))}
              </PerformanceSection>
            )}
            {content_type === ConstructorBlockType.Persons && (
              <ConstructorContentSection
                type="persons"
                title={content_item.title}
              >
                <PersonCardList>
                  {content_item.items.map(({ id, first_name, last_name, image, roles }) => (
                    <PersonCard
                      key={id}
                      name={`${first_name} ${last_name}`}
                      image={image}
                      participant
                      about={roles.map(role => role.name).join(', ')}
                    />
                  ))}
                </PersonCardList>
              </ConstructorContentSection>
            )}
            {content_type === ConstructorBlockType.Videos && (
              <ConstructorContentSection
                type="videos"
                title={content_item.title}
              >
                <VideoList>
                  {content_item.items.map(({ url }) => (
                    <Video
                      key={url}
                      src={url}
                    />
                  ))}
                </VideoList>
              </ConstructorContentSection>
            )}
          </Fragment>
        ))}
      </div>
    </ConstructorContentContextProvider>
  );
};
