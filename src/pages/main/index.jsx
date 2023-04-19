import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../utils/meta';
import Base from '../../component/layout/base';
import CardComponent from '../../component/main/card';
import { AutoCenter, Card, DotLoading, Grid, SearchBar } from 'antd-mobile';
import { readDetailPokemon, readListPokemon } from '../../services/fetch';
import { map, orderBy } from 'lodash';
import styles from './main.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Main() {
 const [listPokemon, setlistPokemon] = useState([]);
 const [Loading, setLoading] = useState(false);
 const navigate = useNavigate();
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

 const onClickPokemon = (id) => {
  navigate(`/pokemon/${id}`);
 };

 return (
  <Fragment>
   <Meta title="Home" />
   <Base>
    <div className={styles.pokedex__main}>
     <Grid columns={1} gap={12}>
      <Grid.Item>
       <SearchBar
        placeholder="Search your Pokémon"
        showCancelButton
        cancelText="Clear"
        style={{ '--height': '40px' }}
       />
      </Grid.Item>
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
        ) : (
         <Grid columns={2} gap={12}>
          {map(orderBy(listPokemon, ['id'], ['asc']), (lP, idx) => (
           <Grid.Item key={idx}>
            <CardComponent
             id={lP.id}
             name={lP.name}
             types={lP.types}
             image={lP.sprites.other.dream_world.front_default}
             onclick={onClickPokemon}
            />
           </Grid.Item>
          ))}
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
