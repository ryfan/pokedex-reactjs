import React from 'react';
import { Image, Card, Grid, Tag, Space } from 'antd-mobile';
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
   <Grid columns={2}>
    <Grid.Item>
     <div className={styles.pokedex__card__right__id}>
      <span className={styles.pokedex__card__right__id__hastag}>#</span>
      <span className={styles.pokedex__card__right__id__number}>{id}</span>
     </div>
     <div style={{ marginLeft: 20 }}>
      <Image src={image} width="100%" height="120px" lazy={true} />
     </div>
    </Grid.Item>
    <Grid.Item>
     <Grid columns={1}>
      <Grid.Item>
       <div className={styles.pokedex__card__right}>
        <span className={styles.pokedex__card__right__name}>{name}</span>
       </div>
      </Grid.Item>
      <Grid.Item>
       <div className={styles.pokedex__card__tag}>
        <Space wrap>
         {map(types, (item, idx) => (
          <Tag
           color="white"
           fill="outline"
           round
           className={styles.pokedex__card__tag__name}
           key={idx}
          >
           {item.type.name}
          </Tag>
         ))}
        </Space>
       </div>
      </Grid.Item>
     </Grid>
    </Grid.Item>
   </Grid>
  </Card>
 );
}
