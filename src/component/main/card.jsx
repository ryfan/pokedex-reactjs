import { Image, Card, Grid, Tag } from 'antd-mobile';
import React from 'react';
import { background } from '../../utils/variable';
import { map } from 'lodash';

export default function CardComponent({ id, name, types, image }) {
 return (
  <Card
   style={{
    height: 150,
    width: '100%',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 0px 12px 2px',
    background: background[types[0].type.name],
    cursor: 'pointer'
   }}
  >
   <Grid columns={1}>
    <Grid.Item>
     <div
      style={{
       position: 'relative',
       color: 'rgba(240, 240, 240, 0.5)',
       marginTop: -10,
       marginRight: -5,
       fontWeight: 'bold',
       padding: 5,
       float: 'right'
      }}
     >
      <span style={{ fontSize: 15 }}>#</span>
      <span style={{ fontSize: 16 }}>{id}</span>
     </div>
     <div
      style={{
       position: 'relative',
       color: 'rgba(240, 240, 240, 1)',
       marginTop: -10,
       marginLeft: -5,
       fontWeight: 'bold',
       padding: 5,
       float: 'left',
       textTransform: 'Capitalize'
      }}
     >
      <span style={{ fontSize: 16 }}>{name}</span>
     </div>
    </Grid.Item>
    <Grid.Item>
     <Grid columns={2}>
      <Grid.Item>
       <Image src={image} width="100%" height="100px" />
      </Grid.Item>
      <Grid.Item>
       <div style={{ marginTop: 20 }}>
        <Grid columns={1} gap={8}>
         {map(types, (item, idx) => (
          <Grid.Item key={idx}>
           <div style={{ marginLeft: 15 }}>
            <Tag
             color="white"
             fill="outline"
             round
             style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: 12,
              padding: 5
             }}
            >
             {item.type.name}
            </Tag>
           </div>
          </Grid.Item>
         ))}
        </Grid>
       </div>
      </Grid.Item>
     </Grid>
    </Grid.Item>
   </Grid>
  </Card>
 );
}
