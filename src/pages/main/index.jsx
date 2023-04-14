import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../utils/meta';
import { Card, DotLoading, Grid } from 'antd-mobile';
import Base from '../../component/layout/base';
import { readDetailPokemon, readListPokemon } from '../../services/fetch';
import { map, orderBy } from 'lodash';
import CardComponent from '../../component/main/card';

export default function Main() {
 const [listPokemon, setlistPokemon] = useState([]);
 const [Loading, setLoading] = useState(false);
 const fetchlistPokemon = async () => {
  try {
   setLoading(true);
   const params = {
    limit: 20,
    offset: 0
   };
   const getListData = await readListPokemon(params);
   const listDetailPokemon = [];
   map(getListData.results, async (lP) => {
    const getDetailData = await readDetailPokemon(lP.name);
    listDetailPokemon.push(getDetailData);
   });
   setlistPokemon(listDetailPokemon);
   setTimeout(() => {
    setLoading(false);
   }, 1000);
  } catch (error) {
   console.log(error);
  }
 };

 useEffect(() => {
  async function fetchData() {
   await fetchlistPokemon();
  }
  fetchData();
 }, []);

 return (
  <Fragment>
   <Meta title="Home" />
   <Base>
    <Card
     title="Here's your pokemon"
     style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 0px 12px 2px' }}
    >
     {Loading ? (
      <Grid columns={1}>
       <Grid.Item>
        <DotLoading />
       </Grid.Item>
      </Grid>
     ) : (
      <Grid columns={2} gap={8}>
       {map(orderBy(listPokemon, ['id'], ['asc']), (lP, idx) => (
        <Grid.Item key={idx}>
         <CardComponent
          id={lP.id}
          name={lP.name}
          types={lP.types}
          image={lP.sprites.other.dream_world.front_default}
         />
        </Grid.Item>
       ))}
      </Grid>
     )}
    </Card>
   </Base>
  </Fragment>
 );
}
