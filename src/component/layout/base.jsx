import { Grid, SearchBar } from 'antd-mobile';
import React from 'react';
import Header from './header';
import Footer from './footer';
import styles from './base.module.scss';

export default function Base({ children }) {
 return (
  <div className={styles.pokedex__layout}>
   <Header />
   <div className={styles.pokedex__layout__content}>
    <Grid columns={1} gap={18}>
     <Grid.Item>
      <SearchBar
       placeholder="Search your pokemon"
       showCancelButton
       cancelText="Clear"
       style={{ '--height': '40px' }}
      />
     </Grid.Item>
     <Grid.Item>{children}</Grid.Item>
    </Grid>
   </div>
   <Footer />
  </div>
 );
}
