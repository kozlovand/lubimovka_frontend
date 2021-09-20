import { FC } from 'react';
import styles from './blog-card.module.css';

interface BlogCardProps {
  image: string;
  author: string;
  heading: string;
  description: string;
}

export const BlogCard: FC<BlogCardProps> = (props) => {
  const { image, author, heading, description } = props;

  return (
    <li className={styles.card}>
      <div className={styles.img_container}>
        <img className={styles.img} src={image} alt="изображение пьесы" />
      </div>
      <div className={styles.content}>
        <p className={styles.author}>{author}</p>
        <h6 className={styles.heading}>{heading}</h6>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  );
};

