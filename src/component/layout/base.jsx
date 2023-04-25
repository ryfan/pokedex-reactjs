import React from 'react';
import Header from './header';
import Footer from './footer';
import styles from './base.module.scss';

export default function Base({ children, baseColor }) {
 return (
  <div className={styles.pokedex__layout}>
   <Header />
   <div className={styles.pokedex__layout__content}>{children}</div>
   <Footer baseColor={baseColor} />
  </div>
 );
}
