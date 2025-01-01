export const fetchPokemons = async (options?: RequestInit): Promise<Pokemon[]> => {
  const { search = '' } = (options?.body && JSON.parse(options.body as string))

  const queryBody = JSON.stringify({
    query: `
      query getPokemons($limit: Int, $search: String) {
        pokemon_v2_pokemon(limit: $limit, where: {name: {_iregex: $search}}) {
          name
          weight
          height
        }
      }
    `,
    variables: {
      search: search,
      limit: 50,
    },
  });

  const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: queryBody,
  });

  const data = await response.json();

  return data.data['pokemon_v2_pokemon'];
};

export type QueryFnType = typeof fetchPokemons;
export type QueryFnResponseType = Awaited<ReturnType<QueryFnType>>;