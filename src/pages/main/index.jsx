import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../utils/meta';
import Base from '../../component/layout/base';
import CardComponent from '../../component/main/card';
import { AutoCenter, Button, Card, DotLoading, Grid } from 'antd-mobile';
import { readDetailPokemon, readListPokemon } from '../../services/fetch';
import { map, orderBy } from 'lodash';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.scss';

export default function Main() {
 const [listPokemon, setlistPokemon] = useState([]);
 const [Loading, setLoading] = useState(true);
 const navigate = useNavigate();

 const fetchlistPokemon = async () => {
  try {
   const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
   };
   setLoading(true);
   const params = {
    limit: 20,
    offset: randomNumber(0, 500)
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

 const onClickPokemon = (id) => {
  navigate(`/pokemon/${id}`);
 };

 useEffect(() => {
  async function fetchData() {
   await fetchlistPokemon();
  }
  fetchData();
 }, []);

 const onClickRefresh = async () => {
  await fetchlistPokemon();
 };

 return (
  <Fragment>
   <Meta title="Home" />
   <Base>
    <div className={styles.pokedex__main}>
     <Grid columns={1} gap={12}>
      <Grid.Item>
       <Card title="Here's your Pokémon" className={styles.pokedex__main__card}>
        {Loading ? (
         <Grid columns={1}>
          <Grid.Item>
           <AutoCenter>
            <span>Loading</span>
            <DotLoading />
           </AutoCenter>
          </Grid.Item>
         </Grid>
        ) : listPokemon.length > 0 ? (
         <Grid columns={2} gap={12}>
          {map(orderBy(listPokemon, ['id'], ['asc']), (lP, idx) => (
           <Grid.Item key={idx}>
            <CardComponent
             id={String(lP.id).padStart(3, '0')}
             name={lP.name}
             types={lP.types}
             image={lP.sprites.other.dream_world.front_default}
             onclick={onClickPokemon}
            />
           </Grid.Item>
          ))}
         </Grid>
        ) : (
         <Grid columns={1} gap={8}>
          <Grid.Item>
           <AutoCenter>
            <span>Sorry, we failed to retrieve pokemon data.</span>
           </AutoCenter>
          </Grid.Item>
          <Grid.Item>
           <AutoCenter>
            <Button
             color="primary"
             fill="outline"
             size="mini"
             onClick={onClickRefresh}
            >
             Refresh 🫶
            </Button>
           </AutoCenter>
          </Grid.Item>
         </Grid>
        )}
       </Card>
      </Grid.Item>
     </Grid>
    </div>
   </Base>
  </Fragment>
 );
}
