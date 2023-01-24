import classNames from 'classnames/bind';

import type { FC } from 'react';

import styles from './press-release-layout.module.css';

const cx = classNames.bind(styles);

export const PressReleaseLayout: FC = (props) => {
  const { children } = props;

  return (
    <div className={cx('root')}>
      {children}
    </div>
  );
};
