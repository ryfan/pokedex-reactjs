import { apiFetch } from '../utils/mainapifetch';
import { endpoints } from './api';

export async function readData(endpoint, queries) {
 const fetchOptions = {
  method: 'GET',
  headers: {
   'Content-type': 'application/json'
  }
 };
 return await apiFetch(endpoint, queries, fetchOptions);
}

export async function readListPokemon(queries) {
 return await readData(endpoints.LIST_POKEMON, queries);
}

export async function readDetailPokemon(params) {
 return await readData(`${endpoints.DETAIL_POKEMON}/${params}`);
}

export async function readEvolutionPokemon(params) {
 return await readData(`${endpoints.EVOLUTION_POKEMON}/${params}`);
}
