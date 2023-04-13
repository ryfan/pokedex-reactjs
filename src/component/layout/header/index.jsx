import { AutoCenter, Image, NavBar } from 'antd-mobile';
import React from 'react';
import styles from './header.module.scss';

export default function Header() {
 return (
  <NavBar backArrow={false} className={styles.pokedex__header}>
   <div className={styles.pokedex__header__image}>
    <AutoCenter>
     <Image src="/logo.svg" width={110} />
    </AutoCenter>
   </div>
  </NavBar>
 );
}
