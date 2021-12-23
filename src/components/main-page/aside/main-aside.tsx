import { FC } from 'react';
import cn from 'classnames/bind';

import { Button } from 'components/ui/button';
import { BlogCard } from 'components/ui/blog-card';

import styles from './main-aside.module.css';
import data from '../assets/mock-data.json';

const cx = cn.bind(styles);

export const MainAside: FC = () => {
  const { title, buttonText, buttonLink, blogData } = data.aside;
  return (
    <section className={cx('container')}>
      <aside className={cx('aside')}>
        <div className={cx('heading')}>
          <h2 className={cx('title')}>{title}</h2>
          <div className={cx('buttonContainer')}>
            <Button
              label={buttonText}
              isLink
              href={buttonLink}
              width="100%"
              border="bottomLeft"
              iconPlace="left"
              icon="arrow-right"
              align="start"
              gap="9px"
              size="s"
              className={cx('button')}
            />
          </div>
        </div>

        <ul className={cx('list')}>
          {blogData &&
          blogData.map((blogCard, i) => (
            <li key={i} className={cx('item')}>
              <BlogCard
                image={blogCard.image}
                author={blogCard.author}
                heading={blogCard.heading}
                description={blogCard.description}
                id={blogCard.id}
              />
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};
