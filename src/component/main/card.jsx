import React from 'react';
import { Image, Card, Grid, Tag } from 'antd-mobile';
import { background } from '../../utils/variable';
import { map } from 'lodash';
import styles from './card.module.scss';

export default function CardComponent({ id, name, types, image, onclick }) {
 return (
  <Card
   style={{ background: background[types[0].type.name] }}
   className={styles.pokedex__card}
   onClick={() => onclick(name)}
  >
   <Grid columns={1}>
    <Grid.Item>
     <div className={styles.pokedex__card__body__right}>
      <span className={styles.pokedex__card__body__right__hastag}>#</span>
      <span className={styles.pokedex__card__body__right__number}>{id}</span>
     </div>
     <div className={styles.pokedex__card__body__left}>
      <p className={styles.pokedex__card__body__left__name}>{name}</p>
     </div>
    </Grid.Item>
    <Grid.Item>
     <Grid columns={2}>
      <Grid.Item>
       <Image src={image} width="100%" height="100px" lazy={true} />
      </Grid.Item>
      <Grid.Item>
       <Grid columns={1} gap={8}>
        <div className={styles.pokedex__card__tag}>
         {map(types, (item, idx) => (
          <Grid.Item key={idx}>
           <Tag
            color="white"
            fill="outline"
            round
            className={styles.pokedex__card__tag__name}
           >
            {item.type.name}
           </Tag>
          </Grid.Item>
         ))}
        </div>
       </Grid>
      </Grid.Item>
     </Grid>
    </Grid.Item>
   </Grid>
  </Card>
 );
}
