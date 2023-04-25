import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../../utils/meta';
import Base from '../../../component/layout/base';
import { useNavigate, useParams } from 'react-router-dom';
import {
 readDetailPokemon,
 readEvolutionPokemon
} from '../../../services/fetch';
import {
 Card,
 DotLoading,
 Grid,
 Image,
 ResultPage,
 Space,
 Steps,
 Tabs,
 Tag
} from 'antd-mobile';
import { background } from '../../../utils/variable';
import { capitalize } from '../../../utils/string';
import { map } from 'lodash';
import styles from './detail.module.scss';

const { Step } = Steps;
export default function Detail() {
 const [dataPokemon, setdataPokemon] = useState(null);
 const [dataEvolution, setdataEvolution] = useState([]);
 const [Loading, setLoading] = useState(true);
 const { id } = useParams();

 useEffect(() => {
  async function fetchData() {
   await onDetailPokemon(id);
  }
  fetchData();
 }, [id]);

 const onDetailPokemon = async (id) => {
  try {
   setLoading(true);
   const getDetailData = await readDetailPokemon(id);
   if (getDetailData) {
    setdataPokemon(getDetailData);
    const getEvolution = await readEvolutionPokemon(getDetailData.id);

    const evolutionData = [];
    let response = getEvolution.chain;

    do {
     const evolutionDetails = response['evolution_details'][0];
     evolutionData.push({
      species_name: response.species.name,
      min_level: !evolutionDetails ? 1 : evolutionDetails.min_level,
      trigger_name: !evolutionDetails ? null : evolutionDetails.trigger.name,
      item: !evolutionDetails ? null : evolutionDetails.item
     });

     response = response['evolves_to'][0];
    } while (!!response && response.hasOwnProperty('evolves_to'));
    setdataEvolution(evolutionData);
   }
  } catch (error) {
   console.log(error);
  }
 };

 const [listPokemonEvolution, setlistPokemonEvolution] = useState([]);
 const onDetailsEvolution = async (dataEvolution) => {
  try {
   const listDetailPokemon = [];
   map(dataEvolution, async (dE) => {
    const getDetailData = await readDetailPokemon(dE.species_name);
    listDetailPokemon.push(getDetailData);
   });
   setlistPokemonEvolution(listDetailPokemon);
   setTimeout(() => {
    setLoading(false);
   }, 1000);
  } catch (error) {
   console.log(error);
  }
 };

 useEffect(() => {
  async function fetchData() {
   await onDetailsEvolution(dataEvolution);
  }
  fetchData();
 }, [dataEvolution]);

 const navigate = useNavigate();
 return (
  <Base>
   {Loading ? (
    <DotLoading />
   ) : (
    <Fragment>
     <Meta title={capitalize(dataPokemon.name)} />
     <div className={styles.pokedex__detail}>
      <ResultPage
       style={{
        '--background-color': background[dataPokemon.types[0].type.name]
       }}
       title={
        <span
         style={{
          textTransform: 'capitalize',
          fontSize: 30,
          fontWeight: 'bold'
         }}
        >
         <div style={{ width: 350 }}>
          <div style={{ position: 'relative', marginLeft: 20 }}>
           <p>{dataPokemon.name}</p>
          </div>
          <div
           style={{
            position: 'relative',
            fontSize: 20,
            color: 'rgba(240, 240, 240, 0.5)'
           }}
          >
           <p>#{String(dataPokemon.id).padStart(3, '0')}</p>
          </div>
         </div>
        </span>
       }
       description={
        <Fragment>
         <Space>
          {map(dataPokemon.types, (item, idx) => (
           <Tag
            key={idx}
            color="white"
            fill="outline"
            round
            className={styles.pokedex__detail__tag__name}
           >
            {item.type.name}
           </Tag>
          ))}
         </Space>
        </Fragment>
       }
      >
       <Grid columns={1} gap={8}>
        <Grid.Item>
         <div
          style={{
           marginTop: -15,
           zIndex: 2,
           display: 'flex'
          }}
         >
          <Image
           src={dataPokemon.sprites.other.dream_world.front_default}
           alt={dataPokemon.name}
           width="100%"
           height="150px"
          />
         </div>
        </Grid.Item>
        <Grid.Item>
         <Card className={styles.pokedex__detail__card}>
          <Tabs defaultActiveKey="1">
           <Tabs.Tab title="About" key="1">
            <table width="100%">
             <tbody>
              <tr>
               <th align="left">Species</th>
               <th>{dataPokemon.species.name}</th>
              </tr>
              <tr>
               <th>Species</th>
               <th>{dataPokemon.species.name}</th>
              </tr>
              <tr>
               <th>Species</th>
               <th>{dataPokemon.species.name}</th>
              </tr>
              <tr>
               <th>Species</th>
               <th>{dataPokemon.species.name}</th>
              </tr>
             </tbody>
            </table>
           </Tabs.Tab>
           <Tabs.Tab title="Statistics" key="2">
            2
           </Tabs.Tab>
           <Tabs.Tab title="Evolution" key="3">
            <Steps current={1} direction="vertical">
             {map(listPokemonEvolution, (lPE, idx) => (
              <Step
               title={<h3>{capitalize(lPE.name)}</h3>}
               description={
                <Image
                 src={lPE.sprites.other.dream_world.front_default}
                 alt={lPE.name}
                 width="100%"
                 height="150px"
                 onClick={() => navigate(`/pokemon/${lPE.name}`)}
                />
               }
               key={idx}
               status="finish"
              />
             ))}
            </Steps>
           </Tabs.Tab>
           <Tabs.Tab title="Moves" key="4">
            4
           </Tabs.Tab>
          </Tabs>
         </Card>
        </Grid.Item>
       </Grid>
      </ResultPage>
     </div>
    </Fragment>
   )}
  </Base>
 );
}
