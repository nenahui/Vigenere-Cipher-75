import React from 'react';
import styles from './Container.module.css';

interface Props extends React.PropsWithChildren {
  maxWidth?: string | number;
}

export const Container: React.FC<Props> = ({ maxWidth = 350, children }) => {
  return (
    <div className={styles.container} style={{ maxWidth }}>
      {children}
    </div>
  );
};
