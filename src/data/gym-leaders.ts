
export interface CounterSuggestion {
  id: number;
  name: string;
  description: string;
}

export interface RecommendedPokemon {
  id: number;
  name: string;
  level: number;
  types: string[];
  location: string;
  notes: string;
  keyMoves: string[];
}

export interface StarterBasedTeam {
  starterId: number;
  starterName: string;
  description: string;
  team: RecommendedPokemon[];
}

export interface PokemonTeamMember {
  id: number;
  name: string;
  level: number;
  types: string[];
  imageUrl?: string;
  counters?: CounterSuggestion[];
}

export interface GymLeader {
  id: string;
  name: string;
  specialty: string;
  badge: string;
  location: string;
  description: string;
  acePokemonId?: number;
  team: PokemonTeamMember[];
  recommendedTeams?: StarterBasedTeam[];
}

export interface GameStarter {
  id: number;
  name: string;
  color: string;
}

export interface GameGyms {
  id: string;
  game: string;
  region: string;
  image?: string;
  starters: GameStarter[];
  leaders: GymLeader[];
}

export const GYM_DATA: GameGyms[] = [
  {
    id: 'rb-kanto',
    game: 'Red / Blue / Yellow / FireRed / LeafGreen',
    region: 'Kanto',
    image: 'https://img.pokemondb.net/boxes/red.jpg',
    starters: [
      { id: 1, name: 'Bulbasaur', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 4, name: 'Charmander', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 7, name: 'Squirtle', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'brock',
        name: 'Brock',
        specialty: 'rock',
        badge: 'Boulder Badge',
        location: 'Pewter City',
        description: 'O Líder de Ginásio duro como pedra.',
        acePokemonId: 95,
        team: [
          { 
            id: 74, 
            name: 'Geodude', 
            level: 12, 
            types: ['rock', 'ground'],
            counters: [
              { id: 56, name: 'Mankey', description: 'Aprende Low Kick cedo (Rota 22)' },
              { id: 1, name: 'Bulbasaur', description: 'Vine Whip é 4x efetivo' },
              { id: 7, name: 'Squirtle', description: 'Bubble é 4x efetivo' }
            ]
          },
          { 
            id: 95, 
            name: 'Onix', 
            level: 14, 
            types: ['rock', 'ground'],
            counters: [
              { id: 12, name: 'Butterfree', description: 'Confusion causa muito dano pela baixa defesa especial' },
              { id: 1, name: 'Bulbasaur', description: 'Vine Whip (Lvl 13) destrói' },
              { id: 7, name: 'Squirtle', description: 'Bubble/Water Gun é vitória certa' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Vantagem total.',
            team: [
              { id: 1, name: 'Bulbasaur', level: 13, types: ['grass', 'poison'], location: 'Inicial', notes: 'Vine Whip destrói o ginásio inteiro.', keyMoves: ['Vine Whip'] },
              { id: 56, name: 'Mankey', level: 10, types: ['fighting'], location: 'Rota 22', notes: 'Low Kick para garantir.', keyMoves: ['Low Kick'] },
              { id: 12, name: 'Butterfree', level: 12, types: ['bug', 'flying'], location: 'Viridian Forest', notes: 'Confusion bate na defesa especial baixa.', keyMoves: ['Confusion'] },
              { id: 32, name: 'Nidoran♂', level: 12, types: ['poison'], location: 'Rota 22', notes: 'Aprende Double Kick no nível 12 (Yellow).', keyMoves: ['Double Kick'] },
              { id: 16, name: 'Pidgey', level: 10, types: ['normal', 'flying'], location: 'Rota 1', notes: 'Sand Attack para diminuir precisão.', keyMoves: ['Sand Attack'] },
              { id: 19, name: 'Rattata', level: 10, types: ['normal'], location: 'Rota 1', notes: 'Ataque rápido e Hyper Fang.', keyMoves: ['Quick Attack'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Desvantagem. Precisa de suporte.',
            team: [
              { id: 4, name: 'Charmander', level: 12, types: ['fire'], location: 'Inicial', notes: 'Resistido por pedra. Use Ember só se necessário.', keyMoves: ['Ember', 'Scratch'] },
              { id: 56, name: 'Mankey', level: 10, types: ['fighting'], location: 'Rota 22', notes: 'Essencial. Low Kick é super efetivo.', keyMoves: ['Low Kick'] },
              { id: 12, name: 'Butterfree', level: 12, types: ['bug', 'flying'], location: 'Viridian Forest', notes: 'Confusion causa dano neutro alto.', keyMoves: ['Confusion'] },
              { id: 32, name: 'Nidoran♂', level: 12, types: ['poison'], location: 'Rota 22', notes: 'Double Kick salva o dia.', keyMoves: ['Double Kick'] },
              { id: 21, name: 'Spearow', level: 10, types: ['normal', 'flying'], location: 'Rota 22', notes: 'Mais forte que Pidgey.', keyMoves: ['Peck'] },
              { id: 25, name: 'Pikachu', level: 10, types: ['electric'], location: 'Viridian Forest', notes: 'Dano neutro e rápido.', keyMoves: ['Thundershock'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Vantagem total.',
            team: [
              { id: 7, name: 'Squirtle', level: 13, types: ['water'], location: 'Inicial', notes: 'Bubble destrói o ginásio inteiro.', keyMoves: ['Bubble'] },
              { id: 12, name: 'Butterfree', level: 12, types: ['bug', 'flying'], location: 'Viridian Forest', notes: 'Ótimo backup com Confusion.', keyMoves: ['Confusion'] },
              { id: 19, name: 'Rattata', level: 12, types: ['normal'], location: 'Rota 1', notes: 'Hyper Fang causa muito dano.', keyMoves: ['Hyper Fang'] },
              { id: 16, name: 'Pidgey', level: 10, types: ['normal', 'flying'], location: 'Rota 1', notes: 'Cobertura.', keyMoves: ['Gust'] },
              { id: 10, name: 'Caterpie', level: 5, types: ['bug'], location: 'Viridian Forest', notes: 'Evolua para Butterfree. String Shot útil.', keyMoves: ['String Shot'] },
              { id: 25, name: 'Pikachu', level: 10, types: ['electric'], location: 'Viridian Forest', notes: 'Raro mas útil.', keyMoves: ['Thundershock'] }
            ]
          }
        ]
      },
      {
        id: 'misty',
        name: 'Misty',
        specialty: 'water',
        badge: 'Cascade Badge',
        location: 'Cerulean City',
        description: 'A sereia tomboy.',
        acePokemonId: 121,
        team: [
          { 
            id: 120, 
            name: 'Staryu', 
            level: 18, 
            types: ['water'],
            counters: [
              { id: 25, name: 'Pikachu', description: 'Encontrado na Floresta de Viridian' },
              { id: 43, name: 'Oddish', description: 'Rota 24/25 (Red/Blue)' },
              { id: 69, name: 'Bellsprout', description: 'Rota 24/25 (Blue)' }
            ]
          },
          { 
            id: 121, 
            name: 'Starmie', 
            level: 21, 
            types: ['water', 'psychic'],
            counters: [
              { id: 1, name: 'Ivysaur', description: 'Resiste a água e bate forte com planta' },
              { id: 26, name: 'Raichu', description: 'Evolua Pikachu com Pedra Trovão' },
              { id: 15, name: 'Beedrill', description: 'Twineedle é super efetivo contra Psíquico' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Ivysaur resiste a água.',
            team: [
              { id: 2, name: 'Ivysaur', level: 18, types: ['grass', 'poison'], location: 'Evolução', notes: 'Vine Whip/Razor Leaf. Resiste a Bubblebeam.', keyMoves: ['Vine Whip'] },
              { id: 25, name: 'Pikachu', level: 18, types: ['electric'], location: 'Viridian Forest', notes: 'Super efetivo, mas cuidado com defesa baixa.', keyMoves: ['Thundershock', 'Thunder Wave'] },
              { id: 43, name: 'Oddish', level: 16, types: ['grass', 'poison'], location: 'Rota 24', notes: 'Absorb recupera vida.', keyMoves: ['Absorb'] },
              { id: 39, name: 'Jigglypuff', level: 16, types: ['normal', 'fairy'], location: 'Rota 3', notes: 'Alto HP e Sing para dormir Starmie.', keyMoves: ['Sing', 'Pound'] },
              { id: 17, name: 'Pidgeotto', level: 18, types: ['normal', 'flying'], location: 'Evolução', notes: 'Dano físico neutro.', keyMoves: ['Gust', 'Quick Attack'] },
              { id: 63, name: 'Abra', level: 10, types: ['psychic'], location: 'Rota 24', notes: 'Se conseguir evoluir para Kadabra, é OP.', keyMoves: ['Teleport'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Desvantagem extrema.',
            team: [
              { id: 5, name: 'Charmeleon', level: 18, types: ['fire'], location: 'Evolução', notes: 'Fraco contra água. Evite usar.', keyMoves: ['Ember'] },
              { id: 43, name: 'Oddish', level: 18, types: ['grass', 'poison'], location: 'Rota 24', notes: 'Essencial. Absorve golpes de água.', keyMoves: ['Absorb', 'Sleep Powder'] },
              { id: 25, name: 'Pikachu', level: 18, types: ['electric'], location: 'Viridian Forest', notes: 'Sua melhor arma ofensiva.', keyMoves: ['Thundershock', 'Thunder Wave'] },
              { id: 15, name: 'Beedrill', level: 20, types: ['bug', 'poison'], location: 'Evolução', notes: 'Twineedle é super efetivo contra Starmie (Psychic).', keyMoves: ['Twineedle'] },
              { id: 39, name: 'Jigglypuff', level: 16, types: ['normal', 'fairy'], location: 'Rota 3', notes: 'Use Sing para parar Starmie.', keyMoves: ['Sing'] },
              { id: 46, name: 'Paras', level: 16, types: ['bug', 'grass'], location: 'Mt. Moon', notes: 'Resiste água. Spore/Stun Spore.', keyMoves: ['Stun Spore'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Batalha neutra.',
            team: [
              { id: 8, name: 'Wartortle', level: 18, types: ['water'], location: 'Evolução', notes: 'Resiste a água. Use Bite (se tiver) ou Mega Punch.', keyMoves: ['Bite', 'Water Gun'] },
              { id: 69, name: 'Bellsprout', level: 18, types: ['grass', 'poison'], location: 'Rota 24', notes: 'Cobertura de planta.', keyMoves: ['Vine Whip'] },
              { id: 25, name: 'Pikachu', level: 18, types: ['electric'], location: 'Viridian Forest', notes: 'Dano principal.', keyMoves: ['Thundershock'] },
              { id: 17, name: 'Pidgeotto', level: 18, types: ['normal', 'flying'], location: 'Evolução', notes: 'Sand Attack ajuda muito.', keyMoves: ['Sand Attack'] },
              { id: 20, name: 'Raticate', level: 20, types: ['normal'], location: 'Evolução', notes: 'Hyper Fang causa dano massivo.', keyMoves: ['Hyper Fang'] },
              { id: 64, name: 'Kadabra', level: 16, types: ['psychic'], location: 'Evolução', notes: 'Confusion bate forte.', keyMoves: ['Confusion'] }
            ]
          }
        ]
      },
      {
        id: 'ltsurge',
        name: 'Lt. Surge',
        specialty: 'electric',
        badge: 'Thunder Badge',
        location: 'Vermilion City',
        description: 'O Americano relâmpago.',
        acePokemonId: 26,
        team: [
          { 
            id: 100, 
            name: 'Voltorb', 
            level: 21, 
            types: ['electric'],
            counters: [
              { id: 50, name: 'Diglett', description: 'Diglett\'s Cave está ao lado (Imune a elétrico)' },
              { id: 74, name: 'Geodude', description: 'Imune a elétrico e resiste a explosão' }
            ]
          },
          { 
            id: 25, 
            name: 'Pikachu', 
            level: 18, 
            types: ['electric'],
            counters: [
              { id: 50, name: 'Diglett', description: 'Use Dig (Cavar) para OHKO' },
              { id: 27, name: 'Sandshrew', description: 'Imune a elétrico (Blue/Green)' }
            ]
          },
          { 
            id: 26, 
            name: 'Raichu', 
            level: 24, 
            types: ['electric'],
            counters: [
              { id: 51, name: 'Dugtrio', description: 'Se tiver evoluído, é vitória garantida' },
              { id: 75, name: 'Graveler', description: 'Tanque físico excelente contra ele' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Ivysaur resiste a elétrico.',
            team: [
              { id: 2, name: 'Ivysaur', level: 24, types: ['grass', 'poison'], location: 'Evolução', notes: 'Resiste a elétrico. Razor Leaf bate forte.', keyMoves: ['Razor Leaf'] },
              { id: 50, name: 'Diglett', level: 20, types: ['ground'], location: 'Diglett\'s Cave', notes: 'Obrigatório. Imune e rápido.', keyMoves: ['Dig'] },
              { id: 74, name: 'Geodude', level: 22, types: ['rock', 'ground'], location: 'Mt. Moon', notes: 'Tanque imune a elétrico.', keyMoves: ['Magnitude'] },
              { id: 27, name: 'Sandshrew', level: 20, types: ['ground'], location: 'Rota 4', notes: 'Outra opção imune.', keyMoves: ['Dig'] },
              { id: 47, name: 'Parasect', level: 24, types: ['bug', 'grass'], location: 'Evolução', notes: 'Resiste a elétrico. Spore coloca pra dormir.', keyMoves: ['Spore'] },
              { id: 96, name: 'Drowzee', level: 20, types: ['psychic'], location: 'Rota 11', notes: 'Boa defesa especial.', keyMoves: ['Confusion'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Neutro. Use Ground.',
            team: [
              { id: 5, name: 'Charmeleon', level: 24, types: ['fire'], location: 'Evolução', notes: 'Dano neutro. Ember/Mega Punch.', keyMoves: ['Ember'] },
              { id: 50, name: 'Diglett', level: 20, types: ['ground'], location: 'Diglett\'s Cave', notes: 'MVP. Pegue um nível alto.', keyMoves: ['Dig'] },
              { id: 27, name: 'Sandshrew', level: 20, types: ['ground'], location: 'Rota 4', notes: 'Alternativa se não gostar de Diglett.', keyMoves: ['Dig'] },
              { id: 75, name: 'Graveler', level: 25, types: ['rock', 'ground'], location: 'Evolução', notes: 'Tanque físico imune.', keyMoves: ['Magnitude'] },
              { id: 44, name: 'Gloom', level: 22, types: ['grass', 'poison'], location: 'Evolução', notes: 'Resiste a elétrico. Status powder.', keyMoves: ['Sleep Powder'] },
              { id: 33, name: 'Nidorino', level: 22, types: ['poison'], location: 'Evolução', notes: 'Horn Attack causa bom dano.', keyMoves: ['Horn Attack'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Desvantagem. Wartortle é fraco aqui.',
            team: [
              { id: 8, name: 'Wartortle', level: 24, types: ['water'], location: 'Evolução', notes: 'Fraco a elétrico. NÃO USE.', keyMoves: ['Bite'] },
              { id: 50, name: 'Diglett', level: 22, types: ['ground'], location: 'Diglett\'s Cave', notes: 'Você precisa dele para vencer.', keyMoves: ['Dig'] },
              { id: 75, name: 'Graveler', level: 25, types: ['rock', 'ground'], location: 'Evolução', notes: 'Tanque físico. Auto-destruct se precisar.', keyMoves: ['Magnitude', 'Rock Throw'] },
              { id: 28, name: 'Sandslash', level: 24, types: ['ground'], location: 'Evolução', notes: 'Slash é crítico frequente. Imune.', keyMoves: ['Slash', 'Dig'] },
              { id: 45, name: 'Vileplume', level: 25, types: ['grass', 'poison'], location: 'Evolução', notes: 'Resistência chave.', keyMoves: ['Absorb'] },
              { id: 97, name: 'Hypno', level: 26, types: ['psychic'], location: 'Evolução', notes: 'Aguenta choques especiais.', keyMoves: ['Headbutt'] }
            ]
          }
        ]
      },
      {
        id: 'erika',
        name: 'Erika',
        specialty: 'grass',
        badge: 'Rainbow Badge',
        location: 'Celadon City',
        description: 'A princesa amante da natureza.',
        acePokemonId: 45,
        team: [
          { 
            id: 71, 
            name: 'Victreebel', 
            level: 29, 
            types: ['grass', 'poison'],
            counters: [
              { id: 64, name: 'Kadabra', description: 'Golpes psíquicos são super efetivos (Rota 8)' },
              { id: 58, name: 'Growlithe', description: 'Fogo é super efetivo (Rota 8/7)' },
              { id: 16, name: 'Pidgeotto', description: 'Voador causa muito dano' }
            ]
          },
          { 
            id: 114, 
            name: 'Tangela', 
            level: 24, 
            types: ['grass'],
            counters: [
              { id: 37, name: 'Vulpix', description: 'Lança-chamas (Rota 8/7)' },
              { id: 21, name: 'Spearow', description: 'Peck/Drill Peck' },
              { id: 12, name: 'Butterfree', description: 'Golpes voadores ou psíquicos' }
            ]
          },
          { 
            id: 45, 
            name: 'Vileplume', 
            level: 29, 
            types: ['grass', 'poison'],
            counters: [
              { id: 6, name: 'Charizard', description: 'Se escolheu Charmander, use Flamethrower' },
              { id: 96, name: 'Drowzee', description: 'Rota 11, golpes psíquicos' },
              { id: 136, name: 'Flareon', description: 'Evolua Eevee de Celadon' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Venusaur resiste a Planta.',
            team: [
              { id: 3, name: 'Venusaur', level: 32, types: ['grass', 'poison'], location: 'Evolução', notes: 'Imune a Poison Powder. Use Body Slam.', keyMoves: ['Body Slam'] },
              { id: 58, name: 'Growlithe', level: 28, types: ['fire'], location: 'Rota 8', notes: 'Fogo é super efetivo. Ember.', keyMoves: ['Ember', 'Take Down'] },
              { id: 17, name: 'Pidgeotto', level: 28, types: ['normal', 'flying'], location: 'Evolução', notes: 'Wing Attack/Gust.', keyMoves: ['Wing Attack'] },
              { id: 136, name: 'Flareon', level: 25, types: ['fire'], location: 'Celadon (Eevee)', notes: 'Ataque absurdo. Fire Spin/Ember.', keyMoves: ['Ember'] },
              { id: 85, name: 'Dodrio', level: 31, types: ['normal', 'flying'], location: 'Rota 16', notes: 'Tri Attack e Drill Peck.', keyMoves: ['Drill Peck'] },
              { id: 64, name: 'Kadabra', level: 30, types: ['psychic'], location: 'Rota 8', notes: 'Destrói os tipos veneno de Erika.', keyMoves: ['Psybeam'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Vantagem Absoluta.',
            team: [
              { id: 6, name: 'Charizard', level: 36, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flamethrower/Wing Attack destrói tudo.', keyMoves: ['Flamethrower', 'Wing Attack'] },
              { id: 143, name: 'Snorlax', level: 30, types: ['normal'], location: 'Rota 12', notes: 'Tanque com Headbutt.', keyMoves: ['Headbutt'] },
              { id: 64, name: 'Kadabra', level: 30, types: ['psychic'], location: 'Rota 8', notes: 'Para os tipo veneno.', keyMoves: ['Psybeam'] },
              { id: 22, name: 'Fearow', level: 30, types: ['normal', 'flying'], location: 'Evolução', notes: 'Drill Peck é um dos melhores golpes voadores.', keyMoves: ['Drill Peck'] },
              { id: 37, name: 'Vulpix', level: 28, types: ['fire'], location: 'Rota 8', notes: 'Backup de fogo.', keyMoves: ['Ember'] },
              { id: 135, name: 'Jolteon', level: 25, types: ['electric'], location: 'Celadon (Eevee)', notes: 'Pin Missile é super efetivo em Planta/Psíquico.', keyMoves: ['Pin Missile'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Neutro/Desvantagem.',
            team: [
              { id: 9, name: 'Blastoise', level: 36, types: ['water'], location: 'Evolução', notes: 'Resistido por planta. Use Ice Beam (se tiver).', keyMoves: ['Ice Beam', 'Bite'] },
              { id: 37, name: 'Vulpix', level: 28, types: ['fire'], location: 'Rota 8', notes: 'Essencial para cobrir planta.', keyMoves: ['Ember'] },
              { id: 85, name: 'Dodrio', level: 31, types: ['normal', 'flying'], location: 'Rota 16', notes: 'Drill Peck é devastador.', keyMoves: ['Drill Peck'] },
              { id: 18, name: 'Pidgeot', level: 36, types: ['normal', 'flying'], location: 'Evolução', notes: 'Wing Attack é confiável.', keyMoves: ['Wing Attack'] },
              { id: 89, name: 'Muk', level: 38, types: ['poison'], location: 'Mansão Pokemon', notes: 'Resiste a planta. Sludge.', keyMoves: ['Sludge'] },
              { id: 93, name: 'Haunter', level: 30, types: ['ghost', 'poison'], location: 'Pokemon Tower', notes: 'Imune a normal, resiste a planta.', keyMoves: ['Night Shade'] }
            ]
          }
        ]
      },
      {
        id: 'koga',
        name: 'Koga',
        specialty: 'poison',
        badge: 'Soul Badge',
        location: 'Fuchsia City',
        description: 'O mestre ninja venenoso.',
        acePokemonId: 110,
        team: [
          { 
            id: 109, 
            name: 'Koffing', 
            level: 37, 
            types: ['poison'],
            counters: [
              { id: 65, name: 'Alakazam', description: 'Psíquico é a melhor arma aqui' },
              { id: 97, name: 'Hypno', description: 'Psíquico resistente' },
              { id: 111, name: 'Rhyhorn', description: 'Resiste a Sludge, use Earthquake' }
            ]
          },
          { 
            id: 89, 
            name: 'Muk', 
            level: 39, 
            types: ['poison'],
            counters: [
              { id: 51, name: 'Dugtrio', description: 'Earthquake (Terremoto) é essencial' },
              { id: 105, name: 'Marowak', description: 'Bonemerang bate duas vezes' }
            ]
          },
          { 
            id: 109, 
            name: 'Koffing', 
            level: 37, 
            types: ['poison'],
            counters: [
              { id: 124, name: 'Jynx', description: 'Troca em Cerulean (Psychic)' },
              { id: 122, name: 'Mr. Mime', description: 'Troca na Rota 2 (Psychic)' }
            ]
          },
          { 
            id: 110, 
            name: 'Weezing', 
            level: 43, 
            types: ['poison'],
            counters: [
              { id: 150, name: 'Mewtwo', description: 'Brincadeira... Use Alakazam/Hypno' },
              { id: 34, name: 'Nidoking', description: 'Earthquake STAB' },
              { id: 76, name: 'Golem', description: 'Explosion se tudo der errado' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Imune a Toxic. Vantagem.',
            team: [
              { id: 3, name: 'Venusaur', level: 38, types: ['grass', 'poison'], location: 'Evolução', notes: 'Imune a Toxic. Razor Leaf é ok.', keyMoves: ['Razor Leaf', 'Body Slam'] },
              { id: 97, name: 'Hypno', level: 38, types: ['psychic'], location: 'Rota 11 (Drowzee)', notes: 'Psíquico é a chave. Psychic.', keyMoves: ['Psychic'] },
              { id: 51, name: 'Dugtrio', level: 38, types: ['ground'], location: 'Diglett\'s Cave', notes: 'Earthquake destrói Muk e Weezing.', keyMoves: ['Earthquake'] },
              { id: 34, name: 'Nidoking', level: 38, types: ['poison', 'ground'], location: 'Evolução', notes: 'Earthquake STAB e imune a Toxic.', keyMoves: ['Earthquake'] },
              { id: 65, name: 'Alakazam', level: 38, types: ['psychic'], location: 'Evolução', notes: 'Psychic OHKO na maioria.', keyMoves: ['Psychic'] },
              { id: 76, name: 'Golem', level: 36, types: ['rock', 'ground'], location: 'Evolução', notes: 'Tanque físico com Earthquake.', keyMoves: ['Earthquake'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Neutro. Use Ground/Psychic.',
            team: [
              { id: 6, name: 'Charizard', level: 40, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flamethrower bate forte.', keyMoves: ['Flamethrower', 'Fly'] },
              { id: 111, name: 'Rhyhorn', level: 35, types: ['ground', 'rock'], location: 'Safari Zone', notes: 'Resiste a veneno. Earthquake.', keyMoves: ['Earthquake'] },
              { id: 65, name: 'Alakazam', level: 38, types: ['psychic'], location: 'Evolução', notes: 'Rápido e letal com Psychic.', keyMoves: ['Psychic'] },
              { id: 105, name: 'Marowak', level: 36, types: ['ground'], location: 'Pokemon Tower', notes: 'Bonemerang.', keyMoves: ['Bonemerang'] },
              { id: 82, name: 'Magneton', level: 35, types: ['electric', 'steel'], location: 'Power Plant', notes: 'Imune a veneno (Gen 2+)... Em Gen 1 só resiste.', keyMoves: ['Thunderbolt'] },
              { id: 143, name: 'Snorlax', level: 35, types: ['normal'], location: 'Rota 12', notes: 'Pode aprender Earthquake via TM.', keyMoves: ['Body Slam', 'Earthquake'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Neutro.',
            team: [
              { id: 9, name: 'Blastoise', level: 40, types: ['water'], location: 'Evolução', notes: 'Surf causa bom dano.', keyMoves: ['Surf'] },
              { id: 105, name: 'Marowak', level: 35, types: ['ground'], location: 'Pokemon Tower', notes: 'Bonemerang bate duas vezes.', keyMoves: ['Bonemerang'] },
              { id: 124, name: 'Jynx', level: 35, types: ['ice', 'psychic'], location: 'Cerulean (Troca)', notes: 'Psychic ajuda muito.', keyMoves: ['Psychic'] },
              { id: 28, name: 'Sandslash', level: 36, types: ['ground'], location: 'Evolução', notes: 'Dig/Earthquake.', keyMoves: ['Earthquake'] },
              { id: 122, name: 'Mr. Mime', level: 35, types: ['psychic'], location: 'Rota 2 (Troca)', notes: 'Ótimo Special.', keyMoves: ['Psychic'] },
              { id: 49, name: 'Venomoth', level: 38, types: ['bug', 'poison'], location: 'Safari Zone', notes: 'Psybeam.', keyMoves: ['Psybeam'] }
            ]
          }
        ]
      },
      {
        id: 'sabrina',
        name: 'Sabrina',
        specialty: 'psychic',
        badge: 'Marsh Badge',
        location: 'Saffron City',
        description: 'A mestra dos pokémons psíquicos.',
        acePokemonId: 65,
        team: [
          { 
            id: 64, 
            name: 'Kadabra', 
            level: 38, 
            types: ['psychic'],
            counters: [
              { id: 143, name: 'Snorlax', description: 'Amnesia + Body Slam (Alta Sp. Def)' },
              { id: 127, name: 'Pinsir', description: 'Golpes inseto (X-Scissor se tiver)' },
              { id: 135, name: 'Jolteon', description: 'Pin Missile é super efetivo' }
            ]
          },
          { 
            id: 122, 
            name: 'Mr. Mime', 
            level: 37, 
            types: ['psychic'],
            counters: [
              { id: 28, name: 'Sandslash', description: 'Ataque físico alto (Defesa dele é baixa)' },
              { id: 19, name: 'Rattata', description: 'Super Fang (Corta HP pela metade)' },
              { id: 94, name: 'Gengar', description: 'Lick/Night Shade (Se for rápido)' }
            ]
          },
          { 
            id: 49, 
            name: 'Venomoth', 
            level: 38, 
            types: ['bug', 'poison'],
            counters: [
              { id: 6, name: 'Charizard', description: 'Fogo/Voador é 4x efetivo' },
              { id: 76, name: 'Golem', description: 'Rock Slide destrói' },
              { id: 136, name: 'Flareon', description: 'Flamethrower' }
            ]
          },
          { 
            id: 65, 
            name: 'Alakazam', 
            level: 43, 
            types: ['psychic'],
            counters: [
              { id: 143, name: 'Snorlax', description: 'Hyper Beam físico é a chave' },
              { id: 115, name: 'Kangaskhan', description: 'Outro normal forte fisicamente' },
              { id: 130, name: 'Gyarados', description: 'Bite (Mordida) causa bom dano' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Venusaur morre rápido. Use Physical.',
            team: [
              { id: 3, name: 'Venusaur', level: 40, types: ['grass', 'poison'], location: 'Evolução', notes: 'Fraco a psíquico. Use só para Sleep Powder.', keyMoves: ['Sleep Powder'] },
              { id: 143, name: 'Snorlax', level: 38, types: ['normal'], location: 'Rota 12', notes: 'Melhor counter. Body Slam.', keyMoves: ['Body Slam'] },
              { id: 135, name: 'Jolteon', level: 38, types: ['electric'], location: 'Celadon', notes: 'Pin Missile é super efetivo (Bug).', keyMoves: ['Pin Missile'] },
              { id: 85, name: 'Dodrio', level: 38, types: ['normal', 'flying'], location: 'Evolução', notes: 'Drill Peck bate na defesa baixa de Alakazam.', keyMoves: ['Drill Peck'] },
              { id: 121, name: 'Starmie', level: 40, types: ['water', 'psychic'], location: 'Evolução', notes: 'Resiste a psíquico.', keyMoves: ['Surf'] },
              { id: 127, name: 'Pinsir', level: 35, types: ['bug'], location: 'Game Corner', notes: 'Golpes inseto.', keyMoves: ['Vice Grip'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Neutro. Force o ataque físico.',
            team: [
              { id: 6, name: 'Charizard', level: 42, types: ['fire', 'flying'], location: 'Evolução', notes: 'Slash tem chance alta de crítico.', keyMoves: ['Slash'] },
              { id: 143, name: 'Snorlax', level: 40, types: ['normal'], location: 'Rota 12', notes: 'Tanque especial. Hyper Beam.', keyMoves: ['Hyper Beam'] },
              { id: 130, name: 'Gyarados', level: 38, types: ['water', 'flying'], location: 'Evolução', notes: 'Bite e Hydro Pump.', keyMoves: ['Bite', 'Hydro Pump'] },
              { id: 135, name: 'Jolteon', level: 38, types: ['electric'], location: 'Celadon', notes: 'Pin Missile.', keyMoves: ['Pin Missile'] },
              { id: 53, name: 'Persian', level: 38, types: ['normal'], location: 'Evolução', notes: 'Rápido e Slash crítico.', keyMoves: ['Slash'] },
              { id: 128, name: 'Tauros', level: 35, types: ['normal'], location: 'Safari Zone', notes: 'Rei do Gen 1. Body Slam.', keyMoves: ['Body Slam'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Blastoise aguenta bem.',
            team: [
              { id: 9, name: 'Blastoise', level: 42, types: ['water'], location: 'Evolução', notes: 'Bite pode dar flinch. Surf.', keyMoves: ['Bite', 'Surf'] },
              { id: 135, name: 'Jolteon', level: 40, types: ['electric'], location: 'Celadon', notes: 'Pin Missile para Alakazam.', keyMoves: ['Pin Missile'] },
              { id: 143, name: 'Snorlax', level: 40, types: ['normal'], location: 'Rota 12', notes: 'Sempre útil.', keyMoves: ['Body Slam'] },
              { id: 128, name: 'Tauros', level: 38, types: ['normal'], location: 'Safari Zone', notes: 'Rápido e forte.', keyMoves: ['Body Slam'] },
              { id: 145, name: 'Zapdos', level: 50, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Drill Peck lendário.', keyMoves: ['Drill Peck'] },
              { id: 144, name: 'Articuno', level: 50, types: ['ice', 'flying'], location: 'Seafoam Islands', notes: 'Status lendário.', keyMoves: ['Ice Beam'] }
            ]
          }
        ]
      },
      {
        id: 'blaine',
        name: 'Blaine',
        specialty: 'fire',
        badge: 'Volcano Badge',
        location: 'Cinnabar Island',
        description: 'O quiz master de fogo.',
        acePokemonId: 59,
        team: [
          { 
            id: 58, 
            name: 'Growlithe', 
            level: 42, 
            types: ['fire'],
            counters: [
              { id: 138, name: 'Omanyte', description: 'Resiste 4x a fogo' },
              { id: 140, name: 'Kabuto', description: 'Resiste 4x a fogo' },
              { id: 76, name: 'Golem', description: 'Earthquake/Rock Slide' }
            ]
          },
          { 
            id: 77, 
            name: 'Ponyta', 
            level: 40, 
            types: ['fire'],
            counters: [
              { id: 131, name: 'Lapras', description: 'Surf é vitória' },
              { id: 134, name: 'Vaporeon', description: 'Alto HP e Surf' }
            ]
          },
          { 
            id: 78, 
            name: 'Rapidash', 
            level: 42, 
            types: ['fire'],
            counters: [
              { id: 134, name: 'Vaporeon', description: 'Alto HP e Surf' },
              { id: 139, name: 'Omastar', description: 'Resistência 4x a fogo e Hydro Pump' },
              { id: 112, name: 'Rhydon', description: 'Earthquake e resistência a fogo' }
            ]
          },
          { 
            id: 59, 
            name: 'Arcanine', 
            level: 47, 
            types: ['fire'],
            counters: [
              { id: 142, name: 'Aerodactyl', description: 'Rápido e resistente a fogo' },
              { id: 130, name: 'Gyarados', description: 'Hydro Pump' },
              { id: 140, name: 'Kabutops', description: 'Slash/Surf' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Venusaur morre. Use Água/Pedra.',
            team: [
              { id: 3, name: 'Venusaur', level: 45, types: ['grass', 'poison'], location: 'Evolução', notes: 'Fraco a fogo. Evite.', keyMoves: ['Sleep Powder'] },
              { id: 138, name: 'Omastar', level: 42, types: ['rock', 'water'], location: 'Cinnabar', notes: 'Duplamente resistente a fogo. Hydro Pump.', keyMoves: ['Hydro Pump', 'Surf'] },
              { id: 76, name: 'Golem', level: 40, types: ['rock', 'ground'], location: 'Evolução', notes: 'Earthquake destrói Arcanine.', keyMoves: ['Earthquake'] },
              { id: 130, name: 'Gyarados', level: 42, types: ['water', 'flying'], location: 'Evolução', notes: 'Hydro Pump.', keyMoves: ['Hydro Pump'] },
              { id: 73, name: 'Tentacruel', level: 40, types: ['water', 'poison'], location: 'Surf', notes: 'Alta Special Defense.', keyMoves: ['Surf'] },
              { id: 112, name: 'Rhydon', level: 42, types: ['ground', 'rock'], location: 'Evolução', notes: 'Tanque físico. Earthquake.', keyMoves: ['Earthquake'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Neutro. Traga Água.',
            team: [
              { id: 6, name: 'Charizard', level: 45, types: ['fire', 'flying'], location: 'Evolução', notes: 'Resiste a fogo, mas não causa muito dano.', keyMoves: ['Slash', 'Fly'] },
              { id: 134, name: 'Vaporeon', level: 42, types: ['water'], location: 'Celadon', notes: 'Surf é a melhor arma.', keyMoves: ['Surf'] },
              { id: 142, name: 'Aerodactyl', level: 40, types: ['rock', 'flying'], location: 'Cinnabar', notes: 'Rápido e resistente.', keyMoves: ['Rock Slide'] },
              { id: 139, name: 'Omastar', level: 42, types: ['rock', 'water'], location: 'Evolução', notes: 'Resiste 4x.', keyMoves: ['Surf'] },
              { id: 76, name: 'Golem', level: 42, types: ['rock', 'ground'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 80, name: 'Slowbro', level: 40, types: ['water', 'psychic'], location: 'Evolução', notes: 'Surf e Amnesia.', keyMoves: ['Surf'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Vantagem Absoluta.',
            team: [
              { id: 9, name: 'Blastoise', level: 45, types: ['water'], location: 'Evolução', notes: 'Surf varre o ginásio inteiro.', keyMoves: ['Surf'] },
              { id: 131, name: 'Lapras', level: 40, types: ['water', 'ice'], location: 'Silph Co.', notes: 'Backup de água.', keyMoves: ['Surf'] },
              { id: 76, name: 'Golem', level: 40, types: ['rock', 'ground'], location: 'Evolução', notes: 'Earthquake para garantir.', keyMoves: ['Earthquake'] },
              { id: 121, name: 'Starmie', level: 42, types: ['water', 'psychic'], location: 'Evolução', notes: 'Rápido e forte.', keyMoves: ['Surf'] },
              { id: 134, name: 'Vaporeon', level: 42, types: ['water'], location: 'Celadon', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 149, name: 'Dragonite', level: 55, types: ['dragon', 'flying'], location: 'Evolução (Dratini)', notes: 'Resiste a fogo. (Se tiver paciência).', keyMoves: ['Wrap'] }
            ]
          }
        ]
      },
      {
        id: 'giovanni',
        name: 'Giovanni',
        specialty: 'ground',
        badge: 'Earth Badge',
        location: 'Viridian City',
        description: 'O líder da Equipe Rocket.',
        acePokemonId: 112,
        team: [
          { 
            id: 111, 
            name: 'Rhyhorn', 
            level: 45, 
            types: ['ground', 'rock'],
            counters: [
              { id: 103, name: 'Exeggutor', description: 'Mega Drain/Solar Beam (4x efetivo)' },
              { id: 134, name: 'Vaporeon', description: 'Surf (4x efetivo)' }
            ]
          },
          { 
            id: 51, 
            name: 'Dugtrio', 
            level: 42, 
            types: ['ground'],
            counters: [
              { id: 142, name: 'Aerodactyl', description: 'Imune a terra, use Fly' },
              { id: 18, name: 'Pidgeot', description: 'Fly/Wing Attack' }
            ]
          },
          { 
            id: 31, 
            name: 'Nidoqueen', 
            level: 44, 
            types: ['poison', 'ground'],
            counters: [
              { id: 124, name: 'Jynx', description: 'Blizzard/Ice Punch (Super efetivo)' },
              { id: 65, name: 'Alakazam', description: 'Psychic destrói veneno' }
            ]
          },
          { 
            id: 34, 
            name: 'Nidoking', 
            level: 45, 
            types: ['poison', 'ground'],
            counters: [
              { id: 121, name: 'Starmie', description: 'Surf/Psychic (Ambos super efetivos)' },
              { id: 131, name: 'Lapras', description: 'Blizzard/Surf' }
            ]
          },
          { 
            id: 112, 
            name: 'Rhydon', 
            level: 50, 
            types: ['ground', 'rock'],
            counters: [
              { id: 3, name: 'Venusaur', description: 'Razor Leaf é crítico quase sempre' },
              { id: 130, name: 'Gyarados', description: 'Surf/Hydro Pump' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Vantagem Absoluta.',
            team: [
              { id: 3, name: 'Venusaur', level: 50, types: ['grass', 'poison'], location: 'Evolução', notes: 'Razor Leaf/Solar Beam destrói Ground/Rock.', keyMoves: ['Solar Beam'] },
              { id: 134, name: 'Vaporeon', level: 45, types: ['water'], location: 'Celadon', notes: 'Surf é excelente backup.', keyMoves: ['Surf'] },
              { id: 144, name: 'Articuno', level: 50, types: ['ice', 'flying'], location: 'Seafoam Islands', notes: 'Ice Beam vs Ground é 4x.', keyMoves: ['Ice Beam'] },
              { id: 103, name: 'Exeggutor', level: 48, types: ['grass', 'psychic'], location: 'Safari Zone', notes: 'Solar Beam.', keyMoves: ['Solar Beam'] },
              { id: 131, name: 'Lapras', level: 45, types: ['water', 'ice'], location: 'Silph Co.', notes: 'Surf e Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 130, name: 'Gyarados', level: 48, types: ['water', 'flying'], location: 'Evolução', notes: 'Imune a terra. Hydro Pump.', keyMoves: ['Hydro Pump'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Desvantagem. Charizard sofre com Rock.',
            team: [
              { id: 6, name: 'Charizard', level: 50, types: ['fire', 'flying'], location: 'Evolução', notes: 'Cuidado com Rock Slide (4x). Use Solar Beam se tiver.', keyMoves: ['Flamethrower'] },
              { id: 103, name: 'Exeggutor', level: 45, types: ['grass', 'psychic'], location: 'Safari Zone', notes: 'Melhor arma de planta. Mega Drain.', keyMoves: ['Mega Drain', 'Psychic'] },
              { id: 131, name: 'Lapras', level: 45, types: ['water', 'ice'], location: 'Silph Co.', notes: 'Surf/Ice Beam destrói tudo.', keyMoves: ['Surf', 'Ice Beam'] },
              { id: 68, name: 'Machamp', level: 45, types: ['fighting'], location: 'Troca', notes: 'Submission para Rhydon.', keyMoves: ['Submission'] },
              { id: 91, name: 'Cloyster', level: 45, types: ['water', 'ice'], location: 'Evolução', notes: 'Defesa física altíssima.', keyMoves: ['Ice Beam'] },
              { id: 121, name: 'Starmie', level: 48, types: ['water', 'psychic'], location: 'Evolução', notes: 'Surf rápido.', keyMoves: ['Surf'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Vantagem Absoluta.',
            team: [
              { id: 9, name: 'Blastoise', level: 50, types: ['water'], location: 'Evolução', notes: 'Surf destrói o time inteiro de Giovanni.', keyMoves: ['Surf', 'Hydro Pump'] },
              { id: 103, name: 'Exeggutor', level: 45, types: ['grass', 'psychic'], location: 'Safari Zone', notes: 'Solar Beam para cobertura.', keyMoves: ['Solar Beam'] },
              { id: 124, name: 'Jynx', level: 45, types: ['ice', 'psychic'], location: 'Cerulean', notes: 'Ice Punch vs Ground.', keyMoves: ['Ice Punch'] },
              { id: 87, name: 'Dewgong', level: 45, types: ['water', 'ice'], location: 'Seafoam Islands', notes: 'Aurora Beam.', keyMoves: ['Aurora Beam'] },
              { id: 62, name: 'Poliwrath', level: 45, types: ['water', 'fighting'], location: 'Evolução', notes: 'Surf e Submission.', keyMoves: ['Surf'] },
              { id: 80, name: 'Slowbro', level: 45, types: ['water', 'psychic'], location: 'Evolução', notes: 'Surf.', keyMoves: ['Surf'] }
            ]
          }
        ]
      },
      {
        id: 'lorelei',
        name: 'Elite Four Lorelei',
        specialty: 'ice',
        badge: 'Elite Four #1',
        location: 'Indigo Plateau',
        description: 'A mestra do gelo. Cuidado com congelamentos.',
        acePokemonId: 131,
        team: [
          { 
            id: 87, 
            name: 'Dewgong', 
            level: 54, 
            types: ['water', 'ice'],
            counters: [
              { id: 135, name: 'Jolteon', description: 'Thunderbolt é super efetivo' },
              { id: 68, name: 'Machamp', description: 'Submission causa dano massivo' },
              { id: 145, name: 'Zapdos', description: 'Lendário elétrico domina' }
            ]
          },
          { 
            id: 91, 
            name: 'Cloyster', 
            level: 53, 
            types: ['water', 'ice'],
            counters: [
              { id: 145, name: 'Zapdos', description: 'Ataque especial ignora a defesa alta dele' },
              { id: 135, name: 'Jolteon', description: 'Thunderbolt resolve rápido' },
              { id: 106, name: 'Hitmonlee', description: 'Chutes lutadores furam a casca' }
            ]
          },
          { 
            id: 80, 
            name: 'Slowbro', 
            level: 54, 
            types: ['water', 'psychic'],
            counters: [
              { id: 145, name: 'Zapdos', description: 'Elétrico é a melhor opção' },
              { id: 3, name: 'Venusaur', description: 'Razor Leaf bate forte' },
              { id: 123, name: 'Scyther', description: 'Golpes inseto são efetivos' }
            ]
          },
          { 
            id: 124, 
            name: 'Jynx', 
            level: 56, 
            types: ['ice', 'psychic'],
            counters: [
              { id: 6, name: 'Charizard', description: 'Fogo derrete gelo' },
              { id: 143, name: 'Snorlax', description: 'Body Slam aproveita a defesa baixa dela' },
              { id: 59, name: 'Arcanine', description: 'Flamethrower é fatal' }
            ]
          },
          { 
            id: 131, 
            name: 'Lapras', 
            level: 56, 
            types: ['water', 'ice'],
            counters: [
              { id: 68, name: 'Machamp', description: 'Melhor counter com Submission' },
              { id: 145, name: 'Zapdos', description: 'Thunderbolt é essencial' },
              { id: 125, name: 'Electabuzz', description: 'Opção elétrica sólida' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Venusaur sofre. Use Elétrico/Lutador.',
            team: [
              { id: 145, name: 'Zapdos', level: 55, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Thunderbolt destrói quase tudo.', keyMoves: ['Thunderbolt'] },
              { id: 135, name: 'Jolteon', level: 54, types: ['electric'], location: 'Celadon', notes: 'Rápido e letal.', keyMoves: ['Thunderbolt'] },
              { id: 68, name: 'Machamp', level: 54, types: ['fighting'], location: 'Troca', notes: 'Submission para Lapras/Dewgong.', keyMoves: ['Submission'] },
              { id: 143, name: 'Snorlax', level: 50, types: ['normal'], location: 'Rota 12', notes: 'Tanque especial.', keyMoves: ['Body Slam'] },
              { id: 106, name: 'Hitmonlee', level: 50, types: ['fighting'], location: 'Saffron', notes: 'High Jump Kick.', keyMoves: ['High Jump Kick'] },
              { id: 3, name: 'Venusaur', level: 55, types: ['grass', 'poison'], location: 'Evolução', notes: 'Cuidado com gelo. Use Razor Leaf em Slowbro.', keyMoves: ['Razor Leaf'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Charizard é arriscado. Use Elétrico.',
            team: [
              { id: 145, name: 'Zapdos', level: 55, types: ['electric', 'flying'], location: 'Power Plant', notes: 'MVP da luta.', keyMoves: ['Thunderbolt'] },
              { id: 6, name: 'Charizard', level: 55, types: ['fire', 'flying'], location: 'Evolução', notes: 'Só use em Jynx. Gelo é perigoso.', keyMoves: ['Flamethrower'] },
              { id: 68, name: 'Machamp', level: 54, types: ['fighting'], location: 'Troca', notes: 'Quebra gelo.', keyMoves: ['Submission'] },
              { id: 130, name: 'Gyarados', level: 52, types: ['water', 'flying'], location: 'Evolução', notes: 'Thunderbolt (TM) ou força bruta.', keyMoves: ['Hydro Pump'] },
              { id: 143, name: 'Snorlax', level: 50, types: ['normal'], location: 'Rota 12', notes: 'Tanque.', keyMoves: ['Body Slam'] },
              { id: 125, name: 'Electabuzz', level: 50, types: ['electric'], location: 'Power Plant', notes: 'Thunder Punch.', keyMoves: ['Thunder Punch'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Neutro. Elétrico é a chave.',
            team: [
              { id: 145, name: 'Zapdos', level: 55, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Destrói águas.', keyMoves: ['Thunderbolt'] },
              { id: 106, name: 'Hitmonlee', level: 50, types: ['fighting'], location: 'Saffron', notes: 'Chute nos gelos.', keyMoves: ['High Jump Kick'] },
              { id: 9, name: 'Blastoise', level: 55, types: ['water'], location: 'Evolução', notes: 'Resiste a gelo. Use Earthquake (TM).', keyMoves: ['Surf', 'Earthquake'] },
              { id: 59, name: 'Arcanine', level: 52, types: ['fire'], location: 'Evolução', notes: 'Bom para Jynx.', keyMoves: ['Flamethrower'] },
              { id: 143, name: 'Snorlax', level: 50, types: ['normal'], location: 'Rota 12', notes: 'Tanque.', keyMoves: ['Body Slam'] },
              { id: 135, name: 'Jolteon', level: 54, types: ['electric'], location: 'Celadon', notes: 'Pin Missile em Jynx/Slowbro.', keyMoves: ['Thunderbolt'] }
            ]
          }
        ]
      },
      {
        id: 'bruno',
        name: 'Elite Four Bruno',
        specialty: 'fighting',
        badge: 'Elite Four #2',
        location: 'Indigo Plateau',
        description: 'Força bruta e pedras.',
        acePokemonId: 68,
        team: [
          { 
            id: 95, 
            name: 'Onix', 
            level: 53, 
            types: ['rock', 'ground'],
            counters: [
              { id: 9, name: 'Blastoise', description: 'Surf é 4x efetivo' },
              { id: 3, name: 'Venusaur', description: 'Razor Leaf é 4x efetivo' },
              { id: 103, name: 'Exeggutor', description: 'Mega Drain recupera vida' }
            ]
          },
          { 
            id: 107, 
            name: 'Hitmonchan', 
            level: 55, 
            types: ['fighting'],
            counters: [
              { id: 65, name: 'Alakazam', description: 'Psychic é OHKO (Um golpe nocaute)' },
              { id: 85, name: 'Dodrio', description: 'Drill Peck é devastador' },
              { id: 97, name: 'Hypno', description: 'Tanque psíquico' }
            ]
          },
          { 
            id: 106, 
            name: 'Hitmonlee', 
            level: 55, 
            types: ['fighting'],
            counters: [
              { id: 65, name: 'Alakazam', description: 'Psychic vence facilmente' },
              { id: 22, name: 'Fearow', description: 'Drill Peck é super efetivo' },
              { id: 121, name: 'Starmie', description: 'Rápida e com Psychic' }
            ]
          },
          { 
            id: 95, 
            name: 'Onix', 
            level: 56, 
            types: ['rock', 'ground'],
            counters: [
              { id: 134, name: 'Vaporeon', description: 'Surf é 4x efetivo' },
              { id: 45, name: 'Vileplume', description: 'Petal Dance destrói' },
              { id: 130, name: 'Gyarados', description: 'Hydro Pump/Surf' }
            ]
          },
          { 
            id: 68, 
            name: 'Machamp', 
            level: 58, 
            types: ['fighting'],
            counters: [
              { id: 65, name: 'Alakazam', description: 'Psychic é a melhor resposta' },
              { id: 145, name: 'Zapdos', description: 'Drill Peck (se tiver) ou Thunderbolt' },
              { id: 103, name: 'Exeggutor', description: 'Psychic resiste bem' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Venusaur destrói Onix. Pássaros no resto.',
            team: [
              { id: 3, name: 'Venusaur', level: 56, types: ['grass', 'poison'], location: 'Evolução', notes: 'Razor Leaf mata Onix em 1 hit.', keyMoves: ['Razor Leaf'] },
              { id: 85, name: 'Dodrio', level: 52, types: ['normal', 'flying'], location: 'Rota 17', notes: 'Drill Peck destrói lutadores.', keyMoves: ['Drill Peck'] },
              { id: 65, name: 'Alakazam', level: 55, types: ['psychic'], location: 'Evolução', notes: 'Psychic OHKO em lutadores.', keyMoves: ['Psychic'] },
              { id: 103, name: 'Exeggutor', level: 52, types: ['grass', 'psychic'], location: 'Safari Zone', notes: 'Psychic e Mega Drain.', keyMoves: ['Psychic'] },
              { id: 121, name: 'Starmie', level: 52, types: ['water', 'psychic'], location: 'Evolução', notes: 'Surf e Psychic.', keyMoves: ['Psychic'] },
              { id: 18, name: 'Pidgeot', level: 50, types: ['normal', 'flying'], location: 'Evolução', notes: 'Wing Attack.', keyMoves: ['Wing Attack'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Charizard + Psíquico.',
            team: [
              { id: 6, name: 'Charizard', level: 56, types: ['fire', 'flying'], location: 'Evolução', notes: 'Fly/Wing Attack acaba com Bruno.', keyMoves: ['Fly', 'Flamethrower'] },
              { id: 65, name: 'Alakazam', level: 55, types: ['psychic'], location: 'Evolução', notes: 'Psychic neles.', keyMoves: ['Psychic'] },
              { id: 130, name: 'Gyarados', level: 54, types: ['water', 'flying'], location: 'Evolução', notes: 'Surf nos Onix.', keyMoves: ['Surf'] },
              { id: 103, name: 'Exeggutor', level: 52, types: ['grass', 'psychic'], location: 'Safari Zone', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 144, name: 'Articuno', level: 52, types: ['ice', 'flying'], location: 'Seafoam', notes: 'Peck/Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 80, name: 'Slowbro', level: 52, types: ['water', 'psychic'], location: 'Evolução', notes: 'Tanque psíquico.', keyMoves: ['Psychic'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Blastoise nos Onix. Pássaros no resto.',
            team: [
              { id: 9, name: 'Blastoise', level: 56, types: ['water'], location: 'Evolução', notes: 'Surf elimina Onix.', keyMoves: ['Surf'] },
              { id: 85, name: 'Dodrio', level: 52, types: ['normal', 'flying'], location: 'Rota 17', notes: 'Drill Peck é rei.', keyMoves: ['Drill Peck'] },
              { id: 97, name: 'Hypno', level: 52, types: ['psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 145, name: 'Zapdos', level: 55, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Drill Peck.', keyMoves: ['Drill Peck'] },
              { id: 124, name: 'Jynx', level: 50, types: ['ice', 'psychic'], location: 'Cerulean', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 22, name: 'Fearow', level: 50, types: ['normal', 'flying'], location: 'Evolução', notes: 'Drill Peck.', keyMoves: ['Drill Peck'] }
            ]
          }
        ]
      },
      {
        id: 'agatha',
        name: 'Elite Four Agatha',
        specialty: 'ghost',
        badge: 'Elite Four #3',
        location: 'Indigo Plateau',
        description: 'Fantasmas e venenos.',
        acePokemonId: 94,
        team: [
          { id: 94, name: 'Gengar', level: 56, types: ['ghost', 'poison'] },
          { id: 42, name: 'Golbat', level: 56, types: ['poison', 'flying'] },
          { id: 93, name: 'Haunter', level: 55, types: ['ghost', 'poison'] },
          { id: 24, name: 'Arbok', level: 58, types: ['poison'] },
          { id: 94, name: 'Gengar', level: 60, types: ['ghost', 'poison'] }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Venusaur sofre. Use Psíquico/Terra.',
            team: [
              { id: 65, name: 'Alakazam', level: 58, types: ['psychic'], location: 'Evolução', notes: 'Psychic destrói venenos (Gengar é veneno).', keyMoves: ['Psychic'] },
              { id: 51, name: 'Dugtrio', level: 55, types: ['ground'], location: 'Diglett\'s Cave', notes: 'Earthquake é super efetivo (Gen 1).', keyMoves: ['Earthquake'] },
              { id: 112, name: 'Rhydon', level: 55, types: ['ground', 'rock'], location: 'Evolução', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 97, name: 'Hypno', level: 55, types: ['psychic'], location: 'Evolução', notes: 'Backup psíquico.', keyMoves: ['Psychic'] },
              { id: 3, name: 'Venusaur', level: 56, types: ['grass', 'poison'], location: 'Evolução', notes: 'Só use Leech Seed. Arriscado.', keyMoves: ['Leech Seed'] },
              { id: 143, name: 'Snorlax', level: 52, types: ['normal'], location: 'Rota 12', notes: 'Imune a Ghost (Lick/Night Shade afeta em Gen 1?).', keyMoves: ['Earthquake'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Charizard é neutro. Psíquico domina.',
            team: [
              { id: 65, name: 'Alakazam', level: 58, types: ['psychic'], location: 'Evolução', notes: 'Vence sozinha.', keyMoves: ['Psychic'] },
              { id: 6, name: 'Charizard', level: 57, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flamethrower/Earthquake (TM).', keyMoves: ['Earthquake', 'Flamethrower'] },
              { id: 105, name: 'Marowak', level: 54, types: ['ground'], location: 'Pokemon Tower', notes: 'Bonemerang.', keyMoves: ['Bonemerang'] },
              { id: 103, name: 'Exeggutor', level: 54, types: ['grass', 'psychic'], location: 'Safari Zone', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 111, name: 'Rhyhorn', level: 50, types: ['ground', 'rock'], location: 'Safari', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 122, name: 'Mr. Mime', level: 52, types: ['psychic'], location: 'Troca', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Use Terra e Psíquico.',
            team: [
              { id: 65, name: 'Alakazam', level: 58, types: ['psychic'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Psychic'] },
              { id: 28, name: 'Sandslash', level: 55, types: ['ground'], location: 'Evolução', notes: 'Earthquake STAB.', keyMoves: ['Earthquake'] },
              { id: 9, name: 'Blastoise', level: 57, types: ['water'], location: 'Evolução', notes: 'Earthquake (TM) ajuda muito.', keyMoves: ['Earthquake', 'Surf'] },
              { id: 124, name: 'Jynx', level: 54, types: ['ice', 'psychic'], location: 'Cerulean', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 76, name: 'Golem', level: 55, types: ['rock', 'ground'], location: 'Evolução', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 96, name: 'Drowzee', level: 50, types: ['psychic'], location: 'Rota 11', notes: 'Evolua para Hypno.', keyMoves: ['Psychic'] }
            ]
          }
        ]
      },
      {
        id: 'lance',
        name: 'Elite Four Lance',
        specialty: 'dragon',
        badge: 'Elite Four #4',
        location: 'Indigo Plateau',
        description: 'Mestre dos dragões. Use Gelo.',
        acePokemonId: 149,
        team: [
          { 
            id: 130, 
            name: 'Gyarados', 
            level: 58, 
            types: ['water', 'flying'],
            counters: [
              { id: 145, name: 'Zapdos', description: 'Thunderbolt (4x efetivo)' },
              { id: 135, name: 'Jolteon', description: 'Thunderbolt' },
              { id: 26, name: 'Raichu', description: 'Thunder/Thunderbolt' }
            ]
          },
          { 
            id: 148, 
            name: 'Dragonair', 
            level: 56, 
            types: ['dragon'],
            counters: [
              { id: 144, name: 'Articuno', description: 'Blizzard/Ice Beam' },
              { id: 131, name: 'Lapras', description: 'Ice Beam' },
              { id: 124, name: 'Jynx', description: 'Blizzard/Ice Punch' }
            ]
          },
          { 
            id: 148, 
            name: 'Dragonair', 
            level: 56, 
            types: ['dragon'],
            counters: [
              { id: 91, name: 'Cloyster', description: 'Blizzard/Ice Beam (Alta defesa)' },
              { id: 87, name: 'Dewgong', description: 'Aurora Beam' },
              { id: 131, name: 'Lapras', description: 'Ice Beam' }
            ]
          },
          { 
            id: 142, 
            name: 'Aerodactyl', 
            level: 60, 
            types: ['rock', 'flying'],
            counters: [
              { id: 131, name: 'Lapras', description: 'Surf ou Ice Beam' },
              { id: 9, name: 'Blastoise', description: 'Surf/Hydro Pump' },
              { id: 145, name: 'Zapdos', description: 'Thunderbolt' }
            ]
          },
          { 
            id: 149, 
            name: 'Dragonite', 
            level: 62, 
            types: ['dragon', 'flying'],
            counters: [
              { id: 144, name: 'Articuno', description: 'Blizzard/Ice Beam é 4x efetivo (OHKO)' },
              { id: 131, name: 'Lapras', description: 'Ice Beam derruba fácil' },
              { id: 91, name: 'Cloyster', description: 'Blizzard destrói' },
              { id: 124, name: 'Jynx', description: 'Lovely Kiss + Blizzard' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Venusaur inútil. Articuno/Lapras salvam.',
            team: [
              { id: 144, name: 'Articuno', level: 55, types: ['ice', 'flying'], location: 'Seafoam', notes: 'Blizzard/Ice Beam OHKO em dragões.', keyMoves: ['Ice Beam'] },
              { id: 131, name: 'Lapras', level: 55, types: ['water', 'ice'], location: 'Silph Co.', notes: 'Tanque de gelo perfeito.', keyMoves: ['Ice Beam'] },
              { id: 145, name: 'Zapdos', level: 55, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Thunderbolt para Gyarados/Aerodactyl.', keyMoves: ['Thunderbolt'] },
              { id: 76, name: 'Golem', level: 55, types: ['rock', 'ground'], location: 'Evolução', notes: 'Rock Slide para pássaros.', keyMoves: ['Rock Slide'] },
              { id: 135, name: 'Jolteon', level: 55, types: ['electric'], location: 'Celadon', notes: 'Elétrico rápido.', keyMoves: ['Thunderbolt'] },
              { id: 3, name: 'Venusaur', level: 58, types: ['grass', 'poison'], location: 'Evolução', notes: 'Toxic/Leech Seed. Só suporte.', keyMoves: ['Toxic'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Charizard vs Dragões é perigoso. Use Gelo.',
            team: [
              { id: 131, name: 'Lapras', level: 55, types: ['water', 'ice'], location: 'Silph Co.', notes: 'Essencial. Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 145, name: 'Zapdos', level: 55, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Para Gyarados.', keyMoves: ['Thunderbolt'] },
              { id: 144, name: 'Articuno', level: 55, types: ['ice', 'flying'], location: 'Seafoam', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 6, name: 'Charizard', level: 58, types: ['fire', 'flying'], location: 'Evolução', notes: 'Slash/Dragon Rage.', keyMoves: ['Slash'] },
              { id: 139, name: 'Omastar', level: 55, types: ['rock', 'water'], location: 'Cinnabar', notes: 'Blizzard/Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 26, name: 'Raichu', level: 55, types: ['electric'], location: 'Evolução', notes: 'Thunder.', keyMoves: ['Thunder'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Blastoise com Ice Beam + Zapdos.',
            team: [
              { id: 9, name: 'Blastoise', level: 58, types: ['water'], location: 'Evolução', notes: 'Ice Beam (TM) é obrigatório.', keyMoves: ['Ice Beam'] },
              { id: 145, name: 'Zapdos', level: 55, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
              { id: 124, name: 'Jynx', level: 55, types: ['ice', 'psychic'], location: 'Cerulean', notes: 'Ice Punch/Blizzard.', keyMoves: ['Blizzard'] },
              { id: 87, name: 'Dewgong', level: 55, types: ['water', 'ice'], location: 'Seafoam', notes: 'Aurora Beam.', keyMoves: ['Aurora Beam'] },
              { id: 142, name: 'Aerodactyl', level: 55, types: ['rock', 'flying'], location: 'Cinnabar', notes: 'Rápido.', keyMoves: ['Rock Slide'] },
              { id: 135, name: 'Jolteon', level: 55, types: ['electric'], location: 'Celadon', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
            ]
          }
        ]
      },
      {
        id: 'blue',
        name: 'Champion Blue',
        specialty: 'mixed',
        badge: 'Champion',
        location: 'Indigo Plateau',
        description: 'A Batalha Final pelo título de Mestre.',
        acePokemonId: 18,
        team: [
          { 
            id: 18, 
            name: 'Pidgeot', 
            level: 61, 
            types: ['normal', 'flying'],
            counters: [
              { id: 145, name: 'Zapdos', description: 'Thunderbolt' },
              { id: 76, name: 'Golem', description: 'Rock Slide e resistência' },
              { id: 144, name: 'Articuno', description: 'Ice Beam' }
            ]
          },
          { 
            id: 65, 
            name: 'Alakazam', 
            level: 59, 
            types: ['psychic'],
            counters: [
              { id: 143, name: 'Snorlax', description: 'Tanque físico com Body Slam' },
              { id: 127, name: 'Pinsir', description: 'Golpes inseto' },
              { id: 130, name: 'Gyarados', description: 'Hyper Beam (Físico)' }
            ]
          },
          { 
            id: 112, 
            name: 'Rhydon', 
            level: 61, 
            types: ['ground', 'rock'],
            counters: [
              { id: 9, name: 'Blastoise', description: 'Surf é 4x efetivo' },
              { id: 3, name: 'Venusaur', description: 'Razor Leaf é 4x efetivo' },
              { id: 134, name: 'Vaporeon', description: 'Surf/Hydro Pump' }
            ]
          },
          { 
            id: 103, 
            name: 'Exeggutor', 
            level: 61, 
            types: ['grass', 'psychic'],
            counters: [
              { id: 6, name: 'Charizard', description: 'Flamethrower' },
              { id: 127, name: 'Pinsir', description: 'X-Scissor/Bug é 4x efetivo' },
              { id: 144, name: 'Articuno', description: 'Ice Beam' }
            ]
          },
          { 
            id: 130, 
            name: 'Gyarados', 
            level: 63, 
            types: ['water', 'flying'],
            counters: [
              { id: 145, name: 'Zapdos', description: 'Thunderbolt é 4x efetivo' },
              { id: 135, name: 'Jolteon', description: 'Thunderbolt' },
              { id: 100, name: 'Voltorb', description: 'Qualquer elétrico forte serve' }
            ]
          },
          { 
            id: 6, 
            name: 'Charizard', 
            level: 65, 
            types: ['fire', 'flying'],
            counters: [
              { id: 76, name: 'Golem', description: 'Rock Slide é 4x efetivo' },
              { id: 9, name: 'Blastoise', description: 'Surf apaga o fogo' },
              { id: 131, name: 'Lapras', description: 'Surf/Hydro Pump' }
            ]
          }
        ],
        recommendedTeams: [
          {
            starterId: 1, starterName: 'Bulbasaur', description: 'Ele tem Charizard. Prepare Água/Pedra.',
            team: [
              { id: 135, name: 'Jolteon', level: 60, types: ['electric'], location: 'Celadon', notes: 'Countera Pidgeot, Gyarados e Charizard (se tiver Thunder).', keyMoves: ['Thunderbolt'] },
              { id: 131, name: 'Lapras', level: 58, types: ['water', 'ice'], location: 'Silph Co.', notes: 'Countera Rhydon, Exeggutor e Charizard.', keyMoves: ['Surf', 'Ice Beam'] },
              { id: 143, name: 'Snorlax', level: 58, types: ['normal'], location: 'Rota 12', notes: 'Tanque para Alakazam.', keyMoves: ['Body Slam', 'Hyper Beam'] },
              { id: 144, name: 'Articuno', level: 58, types: ['ice', 'flying'], location: 'Seafoam', notes: 'Ice Beam em Exeggutor/Rhydon/Pidgeot.', keyMoves: ['Ice Beam'] },
              { id: 3, name: 'Venusaur', level: 60, types: ['grass', 'poison'], location: 'Evolução', notes: 'Bom contra Rhydon. Cuidado com Alakazam/Charizard.', keyMoves: ['Razor Leaf', 'Sleep Powder'] },
              { id: 76, name: 'Golem', level: 58, types: ['rock', 'ground'], location: 'Evolução', notes: 'Explosion ou Rock Slide em Charizard.', keyMoves: ['Rock Slide'] }
            ]
          },
          {
            starterId: 4, starterName: 'Charmander', description: 'Ele tem Blastoise. Prepare Elétrico/Planta.',
            team: [
              { id: 145, name: 'Zapdos', level: 60, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Destrói Blastoise, Pidgeot, Gyarados.', keyMoves: ['Thunderbolt'] },
              { id: 103, name: 'Exeggutor', level: 58, types: ['grass', 'psychic'], location: 'Safari', notes: 'Solar Beam em Rhydon/Blastoise.', keyMoves: ['Solar Beam'] },
              { id: 6, name: 'Charizard', level: 62, types: ['fire', 'flying'], location: 'Evolução', notes: 'Para Exeggutor.', keyMoves: ['Flamethrower'] },
              { id: 143, name: 'Snorlax', level: 58, types: ['normal'], location: 'Rota 12', notes: 'Tanque.', keyMoves: ['Body Slam'] },
              { id: 131, name: 'Lapras', level: 58, types: ['water', 'ice'], location: 'Silph Co.', notes: 'Gelo para Rhydon/Exeggutor.', keyMoves: ['Ice Beam'] },
              { id: 68, name: 'Machamp', level: 58, types: ['fighting'], location: 'Troca', notes: 'Força bruta contra Alakazam (físico).', keyMoves: ['Submission'] }
            ]
          },
          {
            starterId: 7, starterName: 'Squirtle', description: 'Ele tem Venusaur. Prepare Fogo/Gelo.',
            team: [
              { id: 9, name: 'Blastoise', level: 62, types: ['water'], location: 'Evolução', notes: 'Ice Beam em Venusaur/Exeggutor. Surf em Rhydon/Arcanine.', keyMoves: ['Ice Beam', 'Surf'] },
              { id: 146, name: 'Moltres', level: 55, types: ['fire', 'flying'], location: 'Victory Road', notes: 'Fire Blast em Venusaur/Exeggutor.', keyMoves: ['Fire Blast'] },
              { id: 145, name: 'Zapdos', level: 60, types: ['electric', 'flying'], location: 'Power Plant', notes: 'Thunderbolt em Pidgeot/Gyarados.', keyMoves: ['Thunderbolt'] },
              { id: 65, name: 'Alakazam', level: 60, types: ['psychic'], location: 'Evolução', notes: 'Psychic em Venusaur.', keyMoves: ['Psychic'] },
              { id: 143, name: 'Snorlax', level: 58, types: ['normal'], location: 'Rota 12', notes: 'Sempre bom.', keyMoves: ['Body Slam'] },
              { id: 112, name: 'Rhydon', level: 58, types: ['ground', 'rock'], location: 'Evolução', notes: 'Earthquake em Arcanine.', keyMoves: ['Earthquake'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'gs-johto',
    game: 'Gold / Silver / Crystal / HeartGold / SoulSilver',
    region: 'Johto',
    image: 'https://img.pokemondb.net/boxes/gold.jpg',
    starters: [
      { id: 152, name: 'Chikorita', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 155, name: 'Cyndaquil', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 158, name: 'Totodile', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'falkner',
        name: 'Falkner',
        specialty: 'flying',
        badge: 'Zephyr Badge',
        location: 'Violet City',
        description: 'O Líder de Ginásio que voa alto.',
        acePokemonId: 17,
        team: [
          { 
            id: 16, name: 'Pidgey', level: 7, types: ['normal', 'flying'],
            counters: [
              { id: 74, name: 'Geodude', description: 'Resiste a Normal/Voador' },
              { id: 179, name: 'Mareep', description: 'Thundershock é super efetivo' }
            ]
          },
          { 
            id: 17, name: 'Pidgeotto', level: 9, types: ['normal', 'flying'],
            counters: [
              { id: 74, name: 'Geodude', description: 'Rock Throw destrói' },
              { id: 179, name: 'Mareep', description: 'Thundershock é super efetivo' }
            ]
          }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Desvantagem. Use suporte.',
            team: [
                { id: 152, name: 'Chikorita', level: 12, types: ['grass'], location: 'Inicial', notes: 'Fraco a voador. Use apenas para suporte.', keyMoves: ['Razor Leaf'] },
                { id: 74, name: 'Geodude', level: 10, types: ['rock', 'ground'], location: 'Rota 46', notes: 'MVP. Resiste a tudo e bate forte.', keyMoves: ['Rock Throw'] },
                { id: 179, name: 'Mareep', level: 10, types: ['electric'], location: 'Rota 32', notes: 'Choque neles.', keyMoves: ['Thundershock'] },
                { id: 95, name: 'Onix', level: 10, types: ['rock', 'ground'], location: 'Violet City (Troca)', notes: 'Troque por Bellsprout. Resiste a Normal/Voador.', keyMoves: ['Screech', 'Tackle'] },
                { id: 163, name: 'Hoothoot', level: 8, types: ['normal', 'flying'], location: 'Rota 29 (Noite)', notes: 'Hypnosis pode salvar.', keyMoves: ['Hypnosis', 'Peck'] },
                { id: 19, name: 'Rattata', level: 8, types: ['normal'], location: 'Rota 29', notes: 'Ataque rápido.', keyMoves: ['Quick Attack'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Neutro.',
            team: [
                { id: 155, name: 'Cyndaquil', level: 12, types: ['fire'], location: 'Inicial', notes: 'Ember queima.', keyMoves: ['Ember'] },
                { id: 74, name: 'Geodude', level: 10, types: ['rock', 'ground'], location: 'Rota 46', notes: 'MVP.', keyMoves: ['Rock Throw'] },
                { id: 179, name: 'Mareep', level: 10, types: ['electric'], location: 'Rota 32', notes: 'Elétrico > Voador.', keyMoves: ['Thundershock'] },
                { id: 95, name: 'Onix', level: 10, types: ['rock', 'ground'], location: 'Violet City (Troca)', notes: 'Excelente tanque físico.', keyMoves: ['Tackle'] },
                { id: 16, name: 'Pidgey', level: 10, types: ['normal', 'flying'], location: 'Rota 29', notes: 'Sand Attack ajuda muito.', keyMoves: ['Sand Attack'] },
                { id: 161, name: 'Sentret', level: 8, types: ['normal'], location: 'Rota 29', notes: 'Suporte inicial.', keyMoves: ['Scratch'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Neutro.',
            team: [
                { id: 158, name: 'Totodile', level: 12, types: ['water'], location: 'Inicial', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                { id: 74, name: 'Geodude', level: 10, types: ['rock', 'ground'], location: 'Rota 46', notes: 'MVP.', keyMoves: ['Rock Throw'] },
                { id: 179, name: 'Mareep', level: 10, types: ['electric'], location: 'Rota 32', notes: 'Elétrico > Voador.', keyMoves: ['Thundershock'] },
                { id: 95, name: 'Onix', level: 10, types: ['rock', 'ground'], location: 'Violet City (Troca)', notes: 'Tanque.', keyMoves: ['Bind', 'Tackle'] },
                { id: 21, name: 'Spearow', level: 8, types: ['normal', 'flying'], location: 'Rota 46', notes: 'Bate mais forte que Pidgey.', keyMoves: ['Peck'] },
                { id: 165, name: 'Ledyba', level: 8, types: ['bug', 'flying'], location: 'Rota 30 (Manhã)', notes: 'Reflect/Light Screen.', keyMoves: ['Comet Punch'] }
            ]
           }
        ]
      },
      {
        id: 'bugsy',
        name: 'Bugsy',
        specialty: 'bug',
        badge: 'Hive Badge',
        location: 'Azalea Town',
        description: 'O mestre dos insetos.',
        acePokemonId: 123,
        team: [
          { id: 11, name: 'Metapod', level: 14, types: ['bug'], counters: [{ id: 155, name: 'Cyndaquil', description: 'Fogo queima' }, { id: 16, name: 'Pidgey', description: 'Voador é efetivo' }] },
          { id: 14, name: 'Kakuna', level: 14, types: ['bug', 'poison'], counters: [{ id: 155, name: 'Cyndaquil', description: 'Fogo' }, { id: 74, name: 'Geodude', description: 'Pedra' }] },
          { id: 123, name: 'Scyther', level: 16, types: ['bug', 'flying'], counters: [{ id: 74, name: 'Geodude', description: 'Pedra é 4x efetivo (Rock Throw)' }, { id: 155, name: 'Cyndaquil', description: 'Fogo' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Desvantagem. Use Pidgey ou Geodude.',
            team: [
                { id: 152, name: 'Bayleef', level: 16, types: ['grass'], location: 'Evolução', notes: 'Fraco a inseto. Evite.', keyMoves: ['Poison Powder'] },
                { id: 74, name: 'Geodude', level: 15, types: ['rock', 'ground'], location: 'Rota 46', notes: 'Rock Throw destrói Scyther (4x).', keyMoves: ['Rock Throw'] },
                { id: 17, name: 'Pidgeotto', level: 18, types: ['normal', 'flying'], location: 'Rota 29 (Evolução)', notes: 'Gust causa bom dano.', keyMoves: ['Gust'] },
                { id: 95, name: 'Onix', level: 14, types: ['rock', 'ground'], location: 'Union Cave', notes: 'Resiste a golpes normais e voadores.', keyMoves: ['Rock Throw', 'Bind'] },
                { id: 41, name: 'Zubat', level: 14, types: ['poison', 'flying'], location: 'Union Cave', notes: 'Resiste a inseto 4x.', keyMoves: ['Leech Life'] },
                { id: 79, name: 'Slowpoke', level: 14, types: ['water', 'psychic'], location: 'Slowpoke Well', notes: 'Tanque com Confusion.', keyMoves: ['Confusion'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Vantagem total.',
            team: [
                { id: 156, name: 'Quilava', level: 16, types: ['fire'], location: 'Evolução', notes: 'Ember queima tudo.', keyMoves: ['Ember'] },
                { id: 74, name: 'Geodude', level: 14, types: ['rock', 'ground'], location: 'Rota 46', notes: 'Backup para Scyther.', keyMoves: ['Rock Throw'] },
                { id: 179, name: 'Mareep', level: 14, types: ['electric'], location: 'Rota 32', notes: 'Thunder Wave para paralisar.', keyMoves: ['Thunder Wave'] },
                { id: 41, name: 'Zubat', level: 14, types: ['poison', 'flying'], location: 'Union Cave', notes: 'Resiste muito a inseto.', keyMoves: ['Leech Life'] },
                { id: 95, name: 'Onix', level: 14, types: ['rock', 'ground'], location: 'Union Cave', notes: 'Rock Throw.', keyMoves: ['Rock Throw'] },
                { id: 21, name: 'Spearow', level: 14, types: ['normal', 'flying'], location: 'Rota 33', notes: 'Peck é efetivo.', keyMoves: ['Peck'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Neutro.',
            team: [
                { id: 159, name: 'Croconaw', level: 18, types: ['water'], location: 'Evolução', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                { id: 74, name: 'Geodude', level: 15, types: ['rock', 'ground'], location: 'Rota 46', notes: 'MVP contra Scyther.', keyMoves: ['Rock Throw'] },
                { id: 19, name: 'Rattata', level: 14, types: ['normal'], location: 'Rota 29', notes: 'Hyper Fang bate forte.', keyMoves: ['Hyper Fang'] },
                { id: 41, name: 'Zubat', level: 14, types: ['poison', 'flying'], location: 'Union Cave', notes: 'Ótima resistência.', keyMoves: ['Supersonic'] },
                { id: 95, name: 'Onix', level: 14, types: ['rock', 'ground'], location: 'Union Cave', notes: 'Tanque.', keyMoves: ['Rock Throw'] },
                { id: 21, name: 'Spearow', level: 14, types: ['normal', 'flying'], location: 'Rota 33', notes: 'Voador é efetivo.', keyMoves: ['Peck'] }
            ]
           }
        ]
      },
      {
        id: 'whitney',
        name: 'Whitney',
        specialty: 'normal',
        badge: 'Plain Badge',
        location: 'Goldenrod City',
        description: 'A infame Miltank e seu Rollout.',
        acePokemonId: 241,
        team: [
          { id: 35, name: 'Clefairy', level: 18, types: ['normal', 'fairy'], counters: [{ id: 66, name: 'Machop', description: 'Lutador (Troca no Dept Store)' }] },
          { id: 241, name: 'Miltank', level: 20, types: ['normal'], counters: [{ id: 66, name: 'Machop', description: 'Low Kick/Karate Chop' }, { id: 92, name: 'Gastly', description: 'Imune a Normal (Curse)' }, { id: 74, name: 'Geodude', description: 'Resiste a Normal' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Reflect ajuda muito.',
            team: [
                { id: 153, name: 'Bayleef', level: 20, types: ['grass'], location: 'Evolução', notes: 'Reflect reduz dano do Rollout.', keyMoves: ['Reflect', 'Poison Powder'] },
                { id: 66, name: 'Machop', level: 20, types: ['fighting'], location: 'Troca Dept. Store', notes: 'MVP. Low Kick destrói Miltank.', keyMoves: ['Low Kick'] },
                { id: 74, name: 'Geodude', level: 18, types: ['rock', 'ground'], location: 'Rota 46', notes: 'Resiste a Normal/Rollout.', keyMoves: ['Rock Throw'] },
                { id: 96, name: 'Drowzee', level: 18, types: ['psychic'], location: 'Rota 34', notes: 'Hypnosis para parar Miltank.', keyMoves: ['Hypnosis', 'Disable'] },
                { id: 95, name: 'Onix', level: 18, types: ['rock', 'ground'], location: 'Union Cave', notes: 'Alta defesa contra Rollout.', keyMoves: ['Screech', 'Rock Throw'] },
                { id: 214, name: 'Heracross', level: 18, types: ['bug', 'fighting'], location: 'Azalea (Headbutt)', notes: 'Se tiver sorte de achar, é GG.', keyMoves: ['Brick Break'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Dano bruto.',
            team: [
                { id: 156, name: 'Quilava', level: 20, types: ['fire'], location: 'Evolução', notes: 'Smokescreen pode salvar.', keyMoves: ['Smokescreen', 'Ember'] },
                { id: 66, name: 'Machop', level: 20, types: ['fighting'], location: 'Troca Dept. Store', notes: 'MVP.', keyMoves: ['Low Kick'] },
                { id: 92, name: 'Gastly', level: 18, types: ['ghost', 'poison'], location: 'Sprout Tower', notes: 'Imune a Normal (Cuidado c/ Rollout pois acerta)', keyMoves: ['Curse'] },
                { id: 75, name: 'Graveler', level: 22, types: ['rock', 'ground'], location: 'Evolução', notes: 'Tanque físico.', keyMoves: ['Rock Throw'] },
                { id: 96, name: 'Drowzee', level: 18, types: ['psychic'], location: 'Rota 34', notes: 'Hypnosis/Disable.', keyMoves: ['Hypnosis'] },
                { id: 214, name: 'Heracross', level: 18, types: ['bug', 'fighting'], location: 'Azalea (Headbutt)', notes: 'Destrói normal.', keyMoves: ['Horn Attack'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Rage pode ser útil.',
            team: [
                { id: 159, name: 'Croconaw', level: 21, types: ['water'], location: 'Evolução', notes: 'Rage aumenta ataque se apanhar.', keyMoves: ['Water Gun', 'Rage'] },
                { id: 66, name: 'Machop', level: 20, types: ['fighting'], location: 'Troca Dept. Store', notes: 'Essencial.', keyMoves: ['Low Kick'] },
                { id: 75, name: 'Graveler', level: 25, types: ['rock', 'ground'], location: 'Evolução', notes: 'Tanque físico.', keyMoves: ['Rock Throw'] },
                { id: 92, name: 'Gastly', level: 18, types: ['ghost', 'poison'], location: 'Sprout Tower', notes: 'Curse é arriscado mas funciona.', keyMoves: ['Curse'] },
                { id: 96, name: 'Drowzee', level: 18, types: ['psychic'], location: 'Rota 34', notes: 'Controle de grupo.', keyMoves: ['Hypnosis'] },
                { id: 32, name: 'Nidoran♂', level: 18, types: ['poison'], location: 'Rota 35', notes: 'Double Kick.', keyMoves: ['Double Kick'] }
            ]
           }
        ]
      },
      {
        id: 'morty',
        name: 'Morty',
        specialty: 'ghost',
        badge: 'Fog Badge',
        location: 'Ecruteak City',
        description: 'O mestre fantasma místico.',
        acePokemonId: 94,
        team: [
          { id: 92, name: 'Gastly', level: 21, types: ['ghost', 'poison'], counters: [{ id: 63, name: 'Abra', description: 'Psíquico' }, { id: 163, name: 'Hoothoot', description: 'Foresight + Normal' }] },
          { id: 93, name: 'Haunter', level: 21, types: ['ghost', 'poison'], counters: [{ id: 196, name: 'Espeon', description: 'Psíquico' }] },
          { id: 94, name: 'Gengar', level: 25, types: ['ghost', 'poison'], counters: [{ id: 64, name: 'Kadabra', description: 'Psybeam' }, { id: 50, name: 'Diglett', description: 'Magnitude/Dig' }] },
          { id: 93, name: 'Haunter', level: 23, types: ['ghost', 'poison'], counters: [{ id: 196, name: 'Espeon', description: 'Psíquico' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Suporte.',
            team: [
                { id: 153, name: 'Bayleef', level: 25, types: ['grass'], location: 'Evolução', notes: 'Dano neutro.', keyMoves: ['Razor Leaf'] },
                { id: 164, name: 'Noctowl', level: 24, types: ['normal', 'flying'], location: 'Rota 29 (Noite)', notes: 'Foresight permite acertar fantasmas com Normal.', keyMoves: ['Foresight', 'Peck'] },
                { id: 64, name: 'Kadabra', level: 24, types: ['psychic'], location: 'Rota 34/Troca', notes: 'Destrói veneno. Cuidado com defesa baixa.', keyMoves: ['Psybeam'] },
                { id: 203, name: 'Girafarig', level: 24, types: ['normal', 'psychic'], location: 'Rota 43', notes: 'Imune a Fantasma e bate com Psíquico.', keyMoves: ['Psybeam', 'Stomp'] },
                { id: 20, name: 'Raticate', level: 24, types: ['normal'], location: 'Rota 38', notes: 'Pursuit/Crunch (se breeding) ou mordidas.', keyMoves: ['Hyper Fang'] },
                { id: 197, name: 'Umbreon', level: 25, types: ['dark'], location: 'Evolução (Eevee)', notes: 'Se tiver evoluído, é vitória garantida.', keyMoves: ['Pursuit'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Dano neutro.',
            team: [
                { id: 156, name: 'Quilava', level: 25, types: ['fire'], location: 'Evolução', notes: 'Flame Wheel.', keyMoves: ['Flame Wheel'] },
                { id: 20, name: 'Raticate', level: 24, types: ['normal'], location: 'Rota 29', notes: 'Imune a Shadow Ball. Mordida (Dark) se tiver.', keyMoves: ['Hyper Fang'] },
                { id: 63, name: 'Abra', level: 15, types: ['psychic'], location: 'Rota 34', notes: 'Compre Elemental Punches em Goldenrod.', keyMoves: ['Thunder Punch'] },
                { id: 164, name: 'Noctowl', level: 24, types: ['normal', 'flying'], location: 'Evolução', notes: 'Foresight + Normal moves.', keyMoves: ['Foresight'] },
                { id: 234, name: 'Stantler', level: 24, types: ['normal'], location: 'Rota 37', notes: 'Hypnosis/Stomp. Imune a fantasma.', keyMoves: ['Hypnosis'] },
                { id: 203, name: 'Girafarig', level: 24, types: ['normal', 'psychic'], location: 'Rota 43', notes: 'Imune a Fantasma.', keyMoves: ['Psybeam'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Vantagem com Bite.',
            team: [
                { id: 159, name: 'Croconaw', level: 30, types: ['water'], location: 'Evolução', notes: 'Bite (Dark) é super efetivo em fantasmas.', keyMoves: ['Bite'] },
                { id: 164, name: 'Noctowl', level: 24, types: ['normal', 'flying'], location: 'Evolução', notes: 'Imune a Fantasma.', keyMoves: ['Hypnosis'] },
                { id: 179, name: 'Mareep', level: 25, types: ['electric'], location: 'Rota 32', notes: 'Paralisia ajuda.', keyMoves: ['Thunder Wave'] },
                { id: 64, name: 'Kadabra', level: 24, types: ['psychic'], location: 'Troca', notes: 'Psybeam mata Gastly/Haunter.', keyMoves: ['Psybeam'] },
                { id: 20, name: 'Raticate', level: 24, types: ['normal'], location: 'Rota 38', notes: 'Pursuit/Hyper Fang.', keyMoves: ['Pursuit'] },
                { id: 203, name: 'Girafarig', level: 24, types: ['normal', 'psychic'], location: 'Rota 43', notes: 'Counter perfeito.', keyMoves: ['Psybeam'] }
            ]
           }
        ]
      },
      {
        id: 'chuck',
        name: 'Chuck',
        specialty: 'fighting',
        badge: 'Storm Badge',
        location: 'Cianwood City',
        description: 'Seus punhos falam.',
        acePokemonId: 62,
        team: [
          { id: 57, name: 'Primeape', level: 27, types: ['fighting'], counters: [{ id: 178, name: 'Xatu', description: 'Voador/Psíquico' }, { id: 64, name: 'Kadabra', description: 'Psíquico' }] },
          { id: 62, name: 'Poliwrath', level: 30, types: ['water', 'fighting'], counters: [{ id: 152, name: 'Chikorita', description: 'Planta' }, { id: 179, name: 'Mareep', description: 'Elétrico' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Vantagem contra Poliwrath.',
            team: [
                { id: 153, name: 'Bayleef', level: 30, types: ['grass'], location: 'Evolução', notes: 'Destrói Poliwrath. Cuidado com Primeape.', keyMoves: ['Razor Leaf'] },
                { id: 178, name: 'Xatu', level: 28, types: ['psychic', 'flying'], location: 'Evolução (Natu)', notes: 'Resiste a lutador e bate super efetivo.', keyMoves: ['Peck', 'Psychic'] },
                { id: 96, name: 'Drowzee', level: 28, types: ['psychic'], location: 'Rota 34', notes: 'Psíquico é muito forte aqui.', keyMoves: ['Confusion'] },
                { id: 22, name: 'Fearow', level: 28, types: ['normal', 'flying'], location: 'Rota 42', notes: 'Fly/Drill Peck.', keyMoves: ['Fly'] },
                { id: 80, name: 'Slowpoke', level: 28, types: ['water', 'psychic'], location: 'Slowpoke Well', notes: 'Resiste a lutador.', keyMoves: ['Confusion'] },
                { id: 71, name: 'Victreebel', level: 30, types: ['grass', 'poison'], location: 'Evolução', notes: 'Resiste a lutador. Sleep Powder.', keyMoves: ['Sleep Powder'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Neutro.',
            team: [
                { id: 156, name: 'Quilava', level: 30, types: ['fire'], location: 'Evolução', notes: 'Dano neutro.', keyMoves: ['Flame Wheel'] },
                { id: 22, name: 'Fearow', level: 28, types: ['normal', 'flying'], location: 'Rota 42', notes: 'Peck/Drill Peck destrói lutadores.', keyMoves: ['Fly'] },
                { id: 64, name: 'Kadabra', level: 28, types: ['psychic'], location: 'Evolução', notes: 'Glass cannon.', keyMoves: ['Psybeam'] },
                { id: 178, name: 'Xatu', level: 28, types: ['psychic', 'flying'], location: 'Evolução', notes: 'Excelente resistência.', keyMoves: ['Psychic'] },
                { id: 80, name: 'Slowpoke', level: 28, types: ['water', 'psychic'], location: 'Slowpoke Well', notes: 'Resistência chave.', keyMoves: ['Confusion'] },
                { id: 110, name: 'Weezing', level: 30, types: ['poison'], location: 'Evolução', notes: 'Alta defesa física. Resiste lutador.', keyMoves: ['Sludge'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Neutro.',
            team: [
                { id: 159, name: 'Croconaw', level: 30, types: ['water'], location: 'Evolução', notes: 'Neutro.', keyMoves: ['Surf'] },
                { id: 178, name: 'Xatu', level: 28, types: ['psychic', 'flying'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Psychic'] },
                { id: 180, name: 'Flaaffy', level: 28, types: ['electric'], location: 'Evolução', notes: 'Bom contra Poliwrath.', keyMoves: ['Thunder Punch'] },
                { id: 22, name: 'Fearow', level: 28, types: ['normal', 'flying'], location: 'Rota 42', notes: 'Fly ajuda muito.', keyMoves: ['Fly'] },
                { id: 64, name: 'Kadabra', level: 28, types: ['psychic'], location: 'Evolução', notes: 'Psybeam.', keyMoves: ['Psybeam'] },
                { id: 73, name: 'Tentacruel', level: 30, types: ['water', 'poison'], location: 'Evolução', notes: 'Resiste a lutador. Barrier aumenta defesa.', keyMoves: ['Surf'] }
            ]
           }
        ]
      },
      {
        id: 'jasmine',
        name: 'Jasmine',
        specialty: 'steel',
        badge: 'Mineral Badge',
        location: 'Olivine City',
        description: 'A garota de aço.',
        acePokemonId: 208,
        team: [
          { id: 81, name: 'Magnemite', level: 30, types: ['electric', 'steel'], counters: [{ id: 155, name: 'Cyndaquil', description: 'Fogo' }, { id: 50, name: 'Diglett', description: 'Terra é 4x efetivo' }] },
          { id: 81, name: 'Magnemite', level: 30, types: ['electric', 'steel'], counters: [{ id: 155, name: 'Cyndaquil', description: 'Fogo' }, { id: 95, name: 'Onix', description: 'Terra' }] },
          { id: 208, name: 'Steelix', level: 35, types: ['steel', 'ground'], counters: [{ id: 158, name: 'Totodile', description: 'Água' }, { id: 155, name: 'Cyndaquil', description: 'Fogo' }] }
        ],
        recommendedTeams: [
          {
            starterId: 152, starterName: 'Chikorita', description: 'Desvantagem total.',
            team: [
                { id: 154, name: 'Meganium', level: 32, types: ['grass'], location: 'Evolução', notes: 'Inútil contra aço. Use suporte.', keyMoves: ['Reflect'] },
                { id: 58, name: 'Growlithe', level: 30, types: ['fire'], location: 'Rota 36', notes: 'Fogo derrete aço.', keyMoves: ['Ember', 'Flame Wheel'] },
                { id: 75, name: 'Graveler', level: 30, types: ['rock', 'ground'], location: 'Evolução', notes: 'Magnitude mata Magnemites em 1 hit.', keyMoves: ['Magnitude'] },
                { id: 67, name: 'Machoke', level: 30, types: ['fighting'], location: 'Mt Mortar', notes: 'Karate Chop vence Magnemites.', keyMoves: ['Karate Chop'] },
                { id: 195, name: 'Quagsire', level: 30, types: ['water', 'ground'], location: 'Rota 32', notes: 'Imune a elétrico, bate com terra.', keyMoves: ['Surf', 'Mud Shot'] },
                { id: 214, name: 'Heracross', level: 29, types: ['bug', 'fighting'], location: 'Headbutt Trees', notes: 'Lutador forte.', keyMoves: ['Counter', 'Horn Attack'] }
            ]
          },
          {
            starterId: 155, starterName: 'Cyndaquil', description: 'Vantagem Absoluta.',
            team: [
                { id: 157, name: 'Typhlosion', level: 36, types: ['fire'], location: 'Evolução', notes: 'Flame Wheel queima tudo.', keyMoves: ['Flame Wheel'] },
                { id: 195, name: 'Quagsire', level: 30, types: ['water', 'ground'], location: 'Rota 32', notes: 'Imune a elétrico e bate com terra.', keyMoves: ['Surf', 'Earthquake'] },
                { id: 67, name: 'Machoke', level: 30, types: ['fighting'], location: 'Evolução', notes: 'Lutador vence Aço.', keyMoves: ['Karate Chop'] },
                { id: 75, name: 'Graveler', level: 30, types: ['rock', 'ground'], location: 'Evolução', notes: 'Magnitude.', keyMoves: ['Magnitude'] },
                { id: 181, name: 'Ampharos', level: 30, types: ['electric'], location: 'Evolução', notes: 'Dano neutro forte.', keyMoves: ['Thunder Punch'] },
                { id: 178, name: 'Xatu', level: 28, types: ['psychic', 'flying'], location: 'Evolução', notes: 'Resiste a terra (se Steelix usar).', keyMoves: ['Psychic'] }
            ]
          },
          {
            starterId: 158, starterName: 'Totodile', description: 'Vantagem contra Steelix.',
            team: [
                { id: 160, name: 'Feraligatr', level: 32, types: ['water'], location: 'Evolução', notes: 'Surf mata Steelix.', keyMoves: ['Surf'] },
                { id: 75, name: 'Graveler', level: 30, types: ['rock', 'ground'], location: 'Evolução', notes: 'MVP contra Magnemites.', keyMoves: ['Magnitude'] },
                { id: 37, name: 'Vulpix', level: 28, types: ['fire'], location: 'Rota 36', notes: 'Ajuda contra Magnemites.', keyMoves: ['Ember'] },
                { id: 67, name: 'Machoke', level: 30, types: ['fighting'], location: 'Mt Mortar', notes: 'Lutador.', keyMoves: ['Karate Chop'] },
                { id: 179, name: 'Flaaffy', level: 28, types: ['electric'], location: 'Evolução', notes: 'Dano elétrico neutro.', keyMoves: ['Thunder Punch'] },
                { id: 185, name: 'Sudowoodo', level: 25, types: ['rock'], location: 'Rota 36', notes: 'Rock Throw.', keyMoves: ['Rock Throw'] }
            ]
          }
        ]
      },
      {
        id: 'pryce',
        name: 'Pryce',
        specialty: 'ice',
        badge: 'Glacier Badge',
        location: 'Mahogany Town',
        description: 'O professor do inverno.',
        acePokemonId: 221,
        team: [
          { id: 86, name: 'Seel', level: 27, types: ['water'], counters: [{ id: 179, name: 'Mareep', description: 'Elétrico' }, { id: 152, name: 'Chikorita', description: 'Planta' }] },
          { id: 87, name: 'Dewgong', level: 29, types: ['water', 'ice'], counters: [{ id: 66, name: 'Machop', description: 'Lutador' }, { id: 81, name: 'Magnemite', description: 'Elétrico' }] },
          { id: 221, name: 'Piloswine', level: 31, types: ['ice', 'ground'], counters: [{ id: 158, name: 'Totodile', description: 'Água' }, { id: 155, name: 'Cyndaquil', description: 'Fogo' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Arriscado.',
            team: [
                { id: 154, name: 'Meganium', level: 34, types: ['grass'], location: 'Evolução', notes: 'Bom contra Seel/Dewgong, mas cuidado com Ice Beam.', keyMoves: ['Razor Leaf'] },
                { id: 82, name: 'Magneton', level: 32, types: ['electric', 'steel'], location: 'Rota 38', notes: 'Resiste a Gelo e bate em Água.', keyMoves: ['Thunderbolt'] },
                { id: 67, name: 'Machoke', level: 32, types: ['fighting'], location: 'Mt Mortar', notes: 'Lutador quebra Gelo.', keyMoves: ['Vital Throw'] },
                { id: 171, name: 'Lanturn', level: 32, types: ['water', 'electric'], location: 'Pesca (Chinchou)', notes: 'Resiste a Gelo e Água.', keyMoves: ['Spark', 'Surf'] },
                { id: 131, name: 'Lapras', level: 30, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Resiste a Gelo. Surf.', keyMoves: ['Surf'] },
                { id: 126, name: 'Magmar', level: 30, types: ['fire'], location: 'Burnt Tower', notes: 'Fogo contra Piloswine.', keyMoves: ['Fire Punch'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Vantagem ofensiva.',
            team: [
                { id: 157, name: 'Typhlosion', level: 36, types: ['fire'], location: 'Evolução', notes: 'Fogo derrete Gelo. Cuidado com tipos Água.', keyMoves: ['Flame Wheel'] },
                { id: 181, name: 'Ampharos', level: 32, types: ['electric'], location: 'Evolução', notes: 'Cuida dos tipos Água.', keyMoves: ['Thunder Punch'] },
                { id: 131, name: 'Lapras', level: 30, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Resiste a Gelo.', keyMoves: ['Surf'] },
                { id: 67, name: 'Machoke', level: 32, types: ['fighting'], location: 'Mt Mortar', notes: 'Lutador forte.', keyMoves: ['Vital Throw'] },
                { id: 82, name: 'Magneton', level: 32, types: ['electric', 'steel'], location: 'Rota 38', notes: 'Resiste a Gelo.', keyMoves: ['Thunderbolt'] },
                { id: 195, name: 'Quagsire', level: 32, types: ['water', 'ground'], location: 'Rota 32', notes: 'Terremoto em Piloswine.', keyMoves: ['Earthquake'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Neutro.',
            team: [
                { id: 160, name: 'Feraligatr', level: 34, types: ['water'], location: 'Evolução', notes: 'Surf bate forte.', keyMoves: ['Surf'] },
                { id: 82, name: 'Magneton', level: 32, types: ['electric', 'steel'], location: 'Rota 38', notes: 'MVP. Resiste a tudo.', keyMoves: ['Thunderbolt'] },
                { id: 126, name: 'Magmar', level: 30, types: ['fire'], location: 'Burnt Tower', notes: 'Fogo para Piloswine.', keyMoves: ['Fire Punch'] },
                { id: 67, name: 'Machoke', level: 32, types: ['fighting'], location: 'Mt Mortar', notes: 'Lutador.', keyMoves: ['Vital Throw'] },
                { id: 171, name: 'Lanturn', level: 32, types: ['water', 'electric'], location: 'Pesca (Chinchou)', notes: 'Elétrico.', keyMoves: ['Spark'] },
                { id: 221, name: 'Piloswine', level: 33, types: ['ice', 'ground'], location: 'Ice Path', notes: 'Imune a elétrico.', keyMoves: ['Icy Wind'] }
            ]
           }
        ]
      },
      {
        id: 'clair',
        name: 'Clair',
        specialty: 'dragon',
        badge: 'Rising Badge',
        location: 'Blackthorn City',
        description: 'A domadora de dragões.',
        acePokemonId: 230,
        team: [
          { id: 148, name: 'Dragonair', level: 37, types: ['dragon'], counters: [{ id: 124, name: 'Jynx', description: 'Ice Punch' }, { id: 131, name: 'Lapras', description: 'Ice Beam' }] },
          { id: 148, name: 'Dragonair', level: 37, types: ['dragon'], counters: [{ id: 221, name: 'Piloswine', description: 'Icy Wind' }] },
          { id: 148, name: 'Dragonair', level: 37, types: ['dragon'], counters: [{ id: 130, name: 'Gyarados', description: 'Dragon Rage' }] },
          { id: 230, name: 'Kingdra', level: 40, types: ['water', 'dragon'], counters: [{ id: 148, name: 'Dragonair', description: 'Dragon Rage' }, { id: 124, name: 'Jynx', description: 'Apenas dano neutro forte' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Muito difícil.',
            team: [
                { id: 154, name: 'Meganium', level: 40, types: ['grass'], location: 'Evolução', notes: 'Apenas suporte (Reflect/Light Screen).', keyMoves: ['Reflect'] },
                { id: 124, name: 'Jynx', level: 38, types: ['ice', 'psychic'], location: 'Ice Path', notes: 'MVP. Ice Punch mata Dragonairs.', keyMoves: ['Ice Punch', 'Lovely Kiss'] },
                { id: 221, name: 'Piloswine', level: 38, types: ['ice', 'ground'], location: 'Ice Path', notes: 'Tanque de Gelo.', keyMoves: ['Icy Wind'] },
                { id: 130, name: 'Gyarados', level: 38, types: ['water', 'flying'], location: 'Lake of Rage', notes: 'Dragon Rage tira 40 fixo.', keyMoves: ['Dragon Rage'] },
                { id: 131, name: 'Lapras', level: 38, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
                { id: 82, name: 'Magneton', level: 38, types: ['electric', 'steel'], location: 'Rota 38', notes: 'Resiste a tudo.', keyMoves: ['Thunderbolt'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Neutro.',
            team: [
                { id: 157, name: 'Typhlosion', level: 40, types: ['fire'], location: 'Evolução', notes: 'Dano bruto em Kingdra.', keyMoves: ['Flame Wheel'] },
                { id: 131, name: 'Lapras', level: 38, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Ice Beam é essencial.', keyMoves: ['Ice Beam'] },
                { id: 148, name: 'Dragonair', level: 35, types: ['dragon'], location: 'Dragon\'s Den', notes: 'Resiste a água/fogo.', keyMoves: ['Dragon Rage'] },
                { id: 124, name: 'Jynx', level: 38, types: ['ice', 'psychic'], location: 'Ice Path', notes: 'Ice Punch.', keyMoves: ['Ice Punch'] },
                { id: 221, name: 'Piloswine', level: 38, types: ['ice', 'ground'], location: 'Ice Path', notes: 'Tanque.', keyMoves: ['Icy Wind'] },
                { id: 203, name: 'Girafarig', level: 35, types: ['normal', 'psychic'], location: 'Rota 43', notes: 'Baton Pass.', keyMoves: ['Psychic'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Neutro.',
            team: [
                { id: 160, name: 'Feraligatr', level: 40, types: ['water'], location: 'Evolução', notes: 'Ice Punch (TM) ajuda muito.', keyMoves: ['Ice Punch', 'Surf'] },
                { id: 124, name: 'Jynx', level: 38, types: ['ice', 'psychic'], location: 'Ice Path', notes: 'MVP.', keyMoves: ['Ice Punch'] },
                { id: 130, name: 'Gyarados', level: 38, types: ['water', 'flying'], location: 'Lake of Rage', notes: 'Dragon Rage tira 40 fixo.', keyMoves: ['Dragon Rage'] },
                { id: 221, name: 'Piloswine', level: 38, types: ['ice', 'ground'], location: 'Ice Path', notes: 'Tanque de Gelo.', keyMoves: ['Icy Wind'] },
                { id: 148, name: 'Dragonair', level: 35, types: ['dragon'], location: 'Dragon\'s Den', notes: 'Resiste a água.', keyMoves: ['Dragon Rage'] },
                { id: 131, name: 'Lapras', level: 38, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] }
            ]
           }
        ]
      },
      {
        id: 'will',
        name: 'Will',
        specialty: 'psychic',
        badge: 'Elite Four',
        location: 'Indigo Plateau',
        description: 'Elite Four - Psíquico.',
        acePokemonId: 178,
        team: [
          { id: 178, name: 'Xatu', level: 40, types: ['psychic', 'flying'], counters: [{ id: 179, name: 'Ampharos', description: 'Elétrico' }, { id: 248, name: 'Tyranitar', description: 'Crunch' }] },
          { id: 124, name: 'Jynx', level: 41, types: ['ice', 'psychic'], counters: [{ id: 155, name: 'Typhlosion', description: 'Fogo' }, { id: 248, name: 'Tyranitar', description: 'Rock Slide' }] },
          { id: 103, name: 'Exeggutor', level: 41, types: ['grass', 'psychic'], counters: [{ id: 214, name: 'Heracross', description: 'Megahorn (4x)' }, { id: 155, name: 'Typhlosion', description: 'Fogo' }] },
          { id: 80, name: 'Slowbro', level: 41, types: ['water', 'psychic'], counters: [{ id: 179, name: 'Ampharos', description: 'Elétrico' }, { id: 197, name: 'Umbreon', description: 'Dark' }] },
          { id: 178, name: 'Xatu', level: 42, types: ['psychic', 'flying'], counters: [{ id: 145, name: 'Zapdos', description: 'Elétrico' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Suporte.',
            team: [
                { id: 154, name: 'Meganium', level: 42, types: ['grass'], location: 'Evolução', notes: 'Fraco a Gelo/Voador/Psíquico. Cuidado.', keyMoves: ['Reflect'] },
                { id: 197, name: 'Umbreon', level: 40, types: ['dark'], location: 'Evolução (Eevee)', notes: 'Imune a Psíquico. MVP.', keyMoves: ['Faint Attack'] },
                { id: 181, name: 'Ampharos', level: 40, types: ['electric'], location: 'Evolução', notes: 'Para Xatu e Slowbro.', keyMoves: ['Thunder Punch'] },
                { id: 123, name: 'Scyther', level: 38, types: ['bug', 'flying'], location: 'Bug Catching Contest', notes: 'Fury Cutter detona Psíquicos.', keyMoves: ['Fury Cutter'] },
                { id: 131, name: 'Lapras', level: 38, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Gelo para Xatu/Exeggutor.', keyMoves: ['Ice Beam'] },
                { id: 94, name: 'Gengar', level: 38, types: ['ghost', 'poison'], location: 'Troca (Haunter)', notes: 'Shadow Ball. Cuidado com Psychic.', keyMoves: ['Shadow Ball'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Bom contra Jynx/Exeggutor.',
            team: [
                { id: 157, name: 'Typhlosion', level: 42, types: ['fire'], location: 'Evolução', notes: 'Flame Wheel em Jynx/Exeggutor.', keyMoves: ['Flame Wheel'] },
                { id: 229, name: 'Houndoom', level: 40, types: ['dark', 'fire'], location: 'Rota 7 (Kanto) ou Safari', notes: 'Se tiver acesso (Kanto), é MVP. Se não, use Umbreon.', keyMoves: ['Crunch'] },
                { id: 181, name: 'Ampharos', level: 40, types: ['electric'], location: 'Evolução', notes: 'Essencial.', keyMoves: ['Thunder Punch'] },
                { id: 123, name: 'Scyther', level: 38, types: ['bug', 'flying'], location: 'Bug Catching Contest', notes: 'Inseto bate em Psíquico.', keyMoves: ['Fury Cutter'] },
                { id: 131, name: 'Lapras', level: 38, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
                { id: 197, name: 'Umbreon', level: 40, types: ['dark'], location: 'Evolução (Eevee)', notes: 'Backup Dark.', keyMoves: ['Faint Attack'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Feraligatr tem Crunch/Bite.',
            team: [
                { id: 160, name: 'Feraligatr', level: 42, types: ['water'], location: 'Evolução', notes: 'Bite/Crunch destrói Psíquicos.', keyMoves: ['Crunch'] },
                { id: 214, name: 'Heracross', level: 40, types: ['bug', 'fighting'], location: 'Headbutt Trees', notes: 'Megahorn (Lvl 54) ou Fury Cutter. Resiste a Terra.', keyMoves: ['Megahorn'] },
                { id: 181, name: 'Ampharos', level: 40, types: ['electric'], location: 'Evolução', notes: 'Essencial.', keyMoves: ['Thunder Punch'] },
                { id: 197, name: 'Umbreon', level: 40, types: ['dark'], location: 'Evolução (Eevee)', notes: 'Imune a Psíquico.', keyMoves: ['Faint Attack'] },
                { id: 131, name: 'Lapras', level: 38, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
                { id: 229, name: 'Houndoom', level: 40, types: ['dark', 'fire'], location: 'Kanto', notes: 'Se disponível.', keyMoves: ['Crunch'] }
            ]
           }
        ]
      },
      {
        id: 'koga-gsc',
        name: 'Koga',
        specialty: 'poison',
        badge: 'Elite Four',
        location: 'Indigo Plateau',
        description: 'Elite Four - Veneno.',
        acePokemonId: 169,
        team: [
          { id: 168, name: 'Ariados', level: 40, types: ['bug', 'poison'], counters: [{ id: 155, name: 'Typhlosion', description: 'Fogo' }, { id: 64, name: 'Kadabra', description: 'Psíquico' }] },
          { id: 49, name: 'Venomoth', level: 41, types: ['bug', 'poison'], counters: [{ id: 155, name: 'Typhlosion', description: 'Fogo' }, { id: 178, name: 'Xatu', description: 'Voador/Psíquico' }] },
          { id: 205, name: 'Forretress', level: 43, types: ['bug', 'steel'], counters: [{ id: 155, name: 'Typhlosion', description: 'Fogo é 4x efetivo' }] },
          { id: 89, name: 'Muk', level: 42, types: ['poison'], counters: [{ id: 208, name: 'Steelix', description: 'Earthquake' }, { id: 65, name: 'Alakazam', description: 'Psíquico' }] },
          { id: 169, name: 'Crobat', level: 44, types: ['poison', 'flying'], counters: [{ id: 179, name: 'Ampharos', description: 'Elétrico' }, { id: 124, name: 'Jynx', description: 'Gelo' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Desvantagem total.',
            team: [
                { id: 154, name: 'Meganium', level: 42, types: ['grass'], location: 'Evolução', notes: 'Não use. Veneno resiste e bate super efetivo.', keyMoves: ['Body Slam'] },
                { id: 65, name: 'Alakazam', level: 42, types: ['psychic'], location: 'Troca', notes: 'MVP. Psychic destrói Veneno.', keyMoves: ['Psychic'] },
                { id: 76, name: 'Golem', level: 40, types: ['rock', 'ground'], location: 'Troca', notes: 'Earthquake mata Muk. Rock Slide mata Crobat.', keyMoves: ['Earthquake', 'Rock Slide'] },
                { id: 126, name: 'Magmar', level: 40, types: ['fire'], location: 'Burnt Tower', notes: 'Fire Punch para Forretress (4x).', keyMoves: ['Fire Punch'] },
                { id: 196, name: 'Espeon', level: 40, types: ['psychic'], location: 'Evolução (Eevee)', notes: 'Backup Psíquico.', keyMoves: ['Psychic'] },
                { id: 181, name: 'Ampharos', level: 40, types: ['electric'], location: 'Evolução', notes: 'Para Crobat.', keyMoves: ['Thunder Punch'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Vantagem contra Insetos.',
            team: [
                { id: 157, name: 'Typhlosion', level: 43, types: ['fire'], location: 'Evolução', notes: 'Flame Wheel mata Forretress/Ariados/Venomoth.', keyMoves: ['Flame Wheel'] },
                { id: 196, name: 'Espeon', level: 42, types: ['psychic'], location: 'Evolução (Eevee)', notes: 'MVP secundário.', keyMoves: ['Psychic'] },
                { id: 95, name: 'Onix', level: 40, types: ['rock', 'ground'], location: 'Troca Bellsprout', notes: 'Resiste a veneno.', keyMoves: ['Earthquake'] },
                { id: 181, name: 'Ampharos', level: 40, types: ['electric'], location: 'Evolução', notes: 'Para Crobat.', keyMoves: ['Thunder Punch'] },
                { id: 64, name: 'Kadabra', level: 40, types: ['psychic'], location: 'Evolução', notes: 'Psychic neles.', keyMoves: ['Psychic'] },
                { id: 203, name: 'Girafarig', level: 38, types: ['normal', 'psychic'], location: 'Rota 43', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Neutro.',
            team: [
                { id: 160, name: 'Feraligatr', level: 43, types: ['water'], location: 'Evolução', notes: 'Earthquake (TM) ajuda muito.', keyMoves: ['Earthquake', 'Surf'] },
                { id: 64, name: 'Kadabra', level: 40, types: ['psychic'], location: 'Evolução', notes: 'Psychic neles.', keyMoves: ['Psychic'] },
                { id: 181, name: 'Ampharos', level: 40, types: ['electric'], location: 'Evolução', notes: 'Para o Crobat.', keyMoves: ['Thunder Punch'] },
                { id: 76, name: 'Golem', level: 40, types: ['rock', 'ground'], location: 'Troca', notes: 'Earthquake/Rock Slide.', keyMoves: ['Earthquake'] },
                { id: 126, name: 'Magmar', level: 40, types: ['fire'], location: 'Burnt Tower', notes: 'Para Forretress.', keyMoves: ['Fire Punch'] },
                { id: 196, name: 'Espeon', level: 40, types: ['psychic'], location: 'Evolução (Eevee)', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
           }
        ]
      },
      {
        id: 'bruno-gsc',
        name: 'Bruno',
        specialty: 'fighting',
        badge: 'Elite Four',
        location: 'Indigo Plateau',
        description: 'Elite Four - Lutador.',
        acePokemonId: 68,
        team: [
          { id: 237, name: 'Hitmontop', level: 42, types: ['fighting'], counters: [{ id: 178, name: 'Xatu', description: 'Psychic/Fly' }, { id: 65, name: 'Alakazam', description: 'Psychic' }] },
          { id: 106, name: 'Hitmonlee', level: 42, types: ['fighting'], counters: [{ id: 178, name: 'Xatu', description: 'Psychic' }] },
          { id: 107, name: 'Hitmonchan', level: 42, types: ['fighting'], counters: [{ id: 178, name: 'Xatu', description: 'Psychic' }] },
          { id: 95, name: 'Onix', level: 43, types: ['rock', 'ground'], counters: [{ id: 158, name: 'Feraligatr', description: 'Surf/Waterfall' }, { id: 152, name: 'Meganium', description: 'Planta' }] },
          { id: 68, name: 'Machamp', level: 46, types: ['fighting'], counters: [{ id: 178, name: 'Xatu', description: 'Psychic' }, { id: 196, name: 'Espeon', description: 'Psychic' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Bom contra Onix.',
            team: [
                { id: 154, name: 'Meganium', level: 44, types: ['grass'], location: 'Evolução', notes: 'Mata Onix. Use Reflect para os lutadores.', keyMoves: ['Razor Leaf', 'Reflect'] },
                { id: 178, name: 'Xatu', level: 42, types: ['psychic', 'flying'], location: 'Evolução', notes: 'MVP. Imune a terra, resiste a lutador.', keyMoves: ['Psychic', 'Fly'] },
                { id: 196, name: 'Espeon', level: 42, types: ['psychic'], location: 'Evolução (Eevee)', notes: 'Destrói lutadores.', keyMoves: ['Psychic'] },
                { id: 123, name: 'Scyther', level: 40, types: ['bug', 'flying'], location: 'Bug Catching Contest', notes: 'Resiste a lutador e bate com Wing Attack.', keyMoves: ['Wing Attack'] },
                { id: 94, name: 'Gengar', level: 40, types: ['ghost', 'poison'], location: 'Troca (Haunter)', notes: 'Imune a lutador (cuidado com Rock Slide).', keyMoves: ['Shadow Ball'] },
                { id: 80, name: 'Slowbro', level: 40, types: ['water', 'psychic'], location: 'Slowpoke Well', notes: 'Tanque físico. Resiste a lutador.', keyMoves: ['Psychic'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Neutro.',
            team: [
                { id: 157, name: 'Typhlosion', level: 44, types: ['fire'], location: 'Evolução', notes: 'Dano neutro.', keyMoves: ['Flame Wheel'] },
                { id: 65, name: 'Alakazam', level: 42, types: ['psychic'], location: 'Troca', notes: 'MVP. Cuidado com defesa física.', keyMoves: ['Psychic'] },
                { id: 22, name: 'Fearow', level: 40, types: ['normal', 'flying'], location: 'Rota 42', notes: 'Drill Peck é excelente.', keyMoves: ['Drill Peck'] },
                { id: 169, name: 'Crobat', level: 42, types: ['poison', 'flying'], location: 'Evolução', notes: '4x resistência a lutador.', keyMoves: ['Wing Attack'] },
                { id: 103, name: 'Exeggutor', level: 40, types: ['grass', 'psychic'], location: 'Floresta Ilex (Headbutt)', notes: 'Resiste a lutador e bate com Psychic.', keyMoves: ['Psychic'] },
                { id: 178, name: 'Xatu', level: 40, types: ['psychic', 'flying'], location: 'Evolução', notes: 'Resiste a lutador.', keyMoves: ['Psychic'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Vantagem contra Onix.',
            team: [
                { id: 160, name: 'Feraligatr', level: 44, types: ['water'], location: 'Evolução', notes: 'Surf mata Onix e Hitmons (neutro).', keyMoves: ['Surf'] },
                { id: 164, name: 'Noctowl', level: 40, types: ['normal', 'flying'], location: 'Evolução', notes: 'Tanque voador.', keyMoves: ['Fly', 'Hypnosis'] },
                { id: 196, name: 'Espeon', level: 42, types: ['psychic'], location: 'Evolução (Eevee)', notes: 'MVP.', keyMoves: ['Psychic'] },
                { id: 64, name: 'Kadabra', level: 40, types: ['psychic'], location: 'Troca', notes: 'Psychic neles.', keyMoves: ['Psychic'] },
                { id: 73, name: 'Tentacruel', level: 40, types: ['water', 'poison'], location: 'Surf', notes: 'Resiste a lutador.', keyMoves: ['Surf', 'Sludge Bomb'] },
                { id: 214, name: 'Heracross', level: 40, types: ['bug', 'fighting'], location: 'Headbutt', notes: 'Resiste a lutador.', keyMoves: ['Reversal'] }
            ]
           }
        ]
      },
      {
        id: 'karen',
        name: 'Karen',
        specialty: 'dark',
        badge: 'Elite Four',
        location: 'Indigo Plateau',
        description: 'Elite Four - Noturno.',
        acePokemonId: 229,
        team: [
          { id: 197, name: 'Umbreon', level: 42, types: ['dark'], counters: [{ id: 214, name: 'Heracross', description: 'Megahorn' }, { id: 68, name: 'Machamp', description: 'Lutador' }] },
          { id: 45, name: 'Vileplume', level: 42, types: ['grass', 'poison'], counters: [{ id: 155, name: 'Typhlosion', description: 'Fogo' }, { id: 124, name: 'Jynx', description: 'Gelo' }] },
          { id: 94, name: 'Gengar', level: 45, types: ['ghost', 'poison'], counters: [{ id: 65, name: 'Alakazam', description: 'Psychic' }, { id: 50, name: 'Dugtrio', description: 'Earthquake' }] },
          { id: 198, name: 'Murkrow', level: 44, types: ['dark', 'flying'], counters: [{ id: 179, name: 'Ampharos', description: 'Elétrico' }, { id: 124, name: 'Jynx', description: 'Gelo' }] },
          { id: 229, name: 'Houndoom', level: 47, types: ['dark', 'fire'], counters: [{ id: 158, name: 'Feraligatr', description: 'Água' }, { id: 68, name: 'Machamp', description: 'Lutador' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Neutro/Desvantagem.',
            team: [
                { id: 154, name: 'Meganium', level: 46, types: ['grass'], location: 'Evolução', notes: 'Útil apenas para suporte. Fraco contra Houndoom/Murkrow/Vileplume.', keyMoves: ['Reflect'] },
                { id: 214, name: 'Heracross', level: 44, types: ['bug', 'fighting'], location: 'Headbutt', notes: 'MVP. Megahorn destrói Umbreon/Vileplume. Lutador mata Houndoom.', keyMoves: ['Megahorn', 'Reversal'] },
                { id: 181, name: 'Ampharos', level: 44, types: ['electric'], location: 'Evolução', notes: 'Para Murkrow.', keyMoves: ['Thunder Punch'] },
                { id: 68, name: 'Machamp', level: 44, types: ['fighting'], location: 'Troca', notes: 'Força bruta contra Dark.', keyMoves: ['Cross Chop'] },
                { id: 229, name: 'Houndoom', level: 44, types: ['dark', 'fire'], location: 'Kanto/Safari', notes: 'Countera Gengar e Vileplume.', keyMoves: ['Flamethrower', 'Crunch'] },
                { id: 135, name: 'Jolteon', level: 44, types: ['electric'], location: 'Celadon (Eevee)', notes: 'Rápido contra Murkrow.', keyMoves: ['Thunderbolt'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Bom contra Vileplume.',
            team: [
                { id: 157, name: 'Typhlosion', level: 46, types: ['fire'], location: 'Evolução', notes: 'Mata Vileplume.', keyMoves: ['Flame Wheel'] },
                { id: 68, name: 'Machamp', level: 44, types: ['fighting'], location: 'Troca', notes: 'MVP contra Dark.', keyMoves: ['Cross Chop'] },
                { id: 181, name: 'Ampharos', level: 44, types: ['electric'], location: 'Evolução', notes: 'Para Murkrow.', keyMoves: ['Thunder Punch'] },
                { id: 214, name: 'Heracross', level: 44, types: ['bug', 'fighting'], location: 'Headbutt', notes: 'Megahorn/Reversal.', keyMoves: ['Megahorn'] },
                { id: 197, name: 'Umbreon', level: 44, types: ['dark'], location: 'Evolução (Eevee)', notes: 'Tanque contra Gengar.', keyMoves: ['Faint Attack'] },
                { id: 124, name: 'Jynx', level: 44, types: ['ice', 'psychic'], location: 'Ice Path', notes: 'Ice Punch para Vileplume/Murkrow.', keyMoves: ['Ice Punch'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Bom contra Houndoom.',
            team: [
                { id: 160, name: 'Feraligatr', level: 46, types: ['water'], location: 'Evolução', notes: 'Surf mata Houndoom.', keyMoves: ['Surf'] },
                { id: 214, name: 'Heracross', level: 44, types: ['bug', 'fighting'], location: 'Headbutt', notes: 'MVP.', keyMoves: ['Megahorn'] },
                { id: 196, name: 'Espeon', level: 44, types: ['psychic'], location: 'Evolução', notes: 'Para Gengar/Vileplume.', keyMoves: ['Psychic'] },
                { id: 181, name: 'Ampharos', level: 44, types: ['electric'], location: 'Evolução', notes: 'Para Murkrow.', keyMoves: ['Thunder Punch'] },
                { id: 68, name: 'Machamp', level: 44, types: ['fighting'], location: 'Troca', notes: 'Lutador forte.', keyMoves: ['Cross Chop'] },
                { id: 229, name: 'Houndoom', level: 44, types: ['dark', 'fire'], location: 'Kanto', notes: 'Fogo/Dark.', keyMoves: ['Flamethrower'] }
            ]
           }
        ]
      },
      {
        id: 'lance-gsc',
        name: 'Champion Lance',
        specialty: 'dragon',
        badge: 'Champion',
        location: 'Indigo Plateau',
        description: 'O Mestre dos Dragões.',
        acePokemonId: 149,
        team: [
          { id: 130, name: 'Gyarados', level: 44, types: ['water', 'flying'], counters: [{ id: 179, name: 'Ampharos', description: 'Elétrico é 4x efetivo' }, { id: 82, name: 'Magneton', description: 'Elétrico' }] },
          { id: 149, name: 'Dragonite', level: 47, types: ['dragon', 'flying'], counters: [{ id: 124, name: 'Jynx', description: 'Ice Beam (4x)' }, { id: 131, name: 'Lapras', description: 'Ice Beam' }] },
          { id: 149, name: 'Dragonite', level: 47, types: ['dragon', 'flying'], counters: [{ id: 131, name: 'Lapras', description: 'Ice Beam' }, { id: 221, name: 'Piloswine', description: 'Ice' }] },
          { id: 142, name: 'Aerodactyl', level: 46, types: ['rock', 'flying'], counters: [{ id: 158, name: 'Feraligatr', description: 'Surf' }, { id: 179, name: 'Ampharos', description: 'Thunderbolt' }] },
          { id: 6, name: 'Charizard', level: 46, types: ['fire', 'flying'], counters: [{ id: 76, name: 'Golem', description: 'Rock Slide (4x)' }, { id: 158, name: 'Feraligatr', description: 'Surf' }] },
          { id: 149, name: 'Dragonite', level: 50, types: ['dragon', 'flying'], counters: [{ id: 131, name: 'Lapras', description: 'Ice Beam' }, { id: 124, name: 'Jynx', description: 'Blizzard' }] }
        ],
        recommendedTeams: [
           {
            starterId: 152, starterName: 'Chikorita', description: 'Dificuldade Extrema.',
            team: [
                { id: 154, name: 'Meganium', level: 48, types: ['grass'], location: 'Evolução', notes: 'Praticamente inútil ofensivamente. Use para curar/Reflect.', keyMoves: ['Reflect', 'Synthesis'] },
                { id: 131, name: 'Lapras', level: 45, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'MVP ABSOLUTO. Ice Beam destrói Dragonites. Surf mata Charizard/Aerodactyl.', keyMoves: ['Ice Beam', 'Surf'] },
                { id: 181, name: 'Ampharos', level: 45, types: ['electric'], location: 'Evolução', notes: 'Thunder Punch mata Gyarados em 1 hit.', keyMoves: ['Thunder Punch'] },
                { id: 76, name: 'Golem', level: 45, types: ['rock', 'ground'], location: 'Troca', notes: 'Rock Slide destrói Charizard/Aerodactyl/Gyarados.', keyMoves: ['Rock Slide'] },
                { id: 124, name: 'Jynx', level: 45, types: ['ice', 'psychic'], location: 'Ice Path', notes: 'Backup de Gelo. Ice Punch.', keyMoves: ['Ice Punch'] },
                { id: 87, name: 'Dewgong', level: 45, types: ['water', 'ice'], location: 'Seafoam', notes: 'Mais gelo é sempre bom.', keyMoves: ['Aurora Beam'] }
            ]
           },
           {
            starterId: 155, starterName: 'Cyndaquil', description: 'Neutro.',
            team: [
                { id: 157, name: 'Typhlosion', level: 48, types: ['fire'], location: 'Evolução', notes: 'Thunder Punch (TM) ajuda muito.', keyMoves: ['Flame Wheel', 'Thunder Punch'] },
                { id: 124, name: 'Jynx', level: 45, types: ['ice', 'psychic'], location: 'Ice Path', notes: 'MVP. Ice Punch mata Dragonites (4x). Cuidado com defesa física.', keyMoves: ['Ice Punch', 'Lovely Kiss'] },
                { id: 181, name: 'Ampharos', level: 45, types: ['electric'], location: 'Evolução', notes: 'Para Gyarados/Aerodactyl/Charizard.', keyMoves: ['Thunder Punch'] },
                { id: 131, name: 'Lapras', level: 45, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Essencial.', keyMoves: ['Ice Beam'] },
                { id: 76, name: 'Golem', level: 45, types: ['rock', 'ground'], location: 'Troca', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
                { id: 171, name: 'Lanturn', level: 45, types: ['water', 'electric'], location: 'Pesca', notes: 'Thunderbolt/Ice Beam.', keyMoves: ['Ice Beam'] }
            ]
           },
           {
            starterId: 158, starterName: 'Totodile', description: 'Vantagem Ofensiva.',
            team: [
                { id: 160, name: 'Feraligatr', level: 48, types: ['water'], location: 'Evolução', notes: 'Surf mata Charizard/Aerodactyl. Ice Punch (TM) mata Dragonites.', keyMoves: ['Surf', 'Ice Punch'] },
                { id: 181, name: 'Ampharos', level: 45, types: ['electric'], location: 'Evolução', notes: 'Para Gyarados.', keyMoves: ['Thunder Punch'] },
                { id: 221, name: 'Piloswine', level: 45, types: ['ice', 'ground'], location: 'Ice Path', notes: 'Tanque de Gelo. Icy Wind.', keyMoves: ['Icy Wind'] },
                { id: 131, name: 'Lapras', level: 45, types: ['water', 'ice'], location: 'Union Cave (Sexta)', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
                { id: 76, name: 'Golem', level: 45, types: ['rock', 'ground'], location: 'Troca', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
                { id: 124, name: 'Jynx', level: 45, types: ['ice', 'psychic'], location: 'Ice Path', notes: 'Glass cannon.', keyMoves: ['Ice Punch'] }
            ]
           }
        ]
      }
    ]
  },
  {
    id: 'rse-hoenn',
    game: 'Ruby / Sapphire / Emerald / Omega Ruby / Alpha Sapphire',
    region: 'Hoenn',
    image: 'https://img.pokemondb.net/boxes/ruby.jpg',
    starters: [
      { id: 252, name: 'Treecko', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 255, name: 'Torchic', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 258, name: 'Mudkip', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'roxanne',
        name: 'Roxanne',
        specialty: 'rock',
        badge: 'Stone Badge',
        location: 'Rustboro City',
        description: 'A aluna aplicada que se tornou Líder.',
        acePokemonId: 299,
        team: [
          { id: 74, name: 'Geodude', level: 12, types: ['rock', 'ground'], counters: [{ id: 252, name: 'Treecko', description: 'Absorb (4x)' }, { id: 258, name: 'Mudkip', description: 'Water Gun (4x)' }] },
          { id: 74, name: 'Geodude', level: 12, types: ['rock', 'ground'], counters: [{ id: 252, name: 'Treecko', description: 'Absorb (4x)' }, { id: 270, name: 'Lotad', description: 'Absorb (4x)' }] },
          { id: 299, name: 'Nosepass', level: 15, types: ['rock'], counters: [{ id: 252, name: 'Treecko', description: 'Absorb' }, { id: 258, name: 'Mudkip', description: 'Water Gun' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Vantagem absoluta.',
                team: [
                    { id: 252, name: 'Treecko', level: 14, types: ['grass'], location: 'Inicial', notes: 'Absorb vence sozinho.', keyMoves: ['Absorb'] },
                    { id: 279, name: 'Pelipper', level: 12, types: ['water', 'flying'], location: 'Rota 104 (Wingull)', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                    { id: 285, name: 'Shroomish', level: 10, types: ['grass'], location: 'Petalburg Woods', notes: 'Absorb.', keyMoves: ['Absorb'] },
                    { id: 270, name: 'Lotad', level: 10, types: ['water', 'grass'], location: 'Rota 102', notes: 'Absorb (4x).', keyMoves: ['Absorb'] },
                    { id: 183, name: 'Marill', level: 10, types: ['water', 'fairy'], location: 'Rota 104', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                    { id: 290, name: 'Nincada', level: 10, types: ['bug', 'ground'], location: 'Rota 116', notes: 'Absorb (se tiver).', keyMoves: ['Absorb'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Evolua para Combusken.',
                team: [
                    { id: 256, name: 'Combusken', level: 16, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Double Kick destrói pedras.', keyMoves: ['Double Kick'] },
                    { id: 270, name: 'Lotad', level: 12, types: ['water', 'grass'], location: 'Rota 102', notes: 'Absorb é essencial.', keyMoves: ['Absorb'] },
                    { id: 279, name: 'Wingull', level: 12, types: ['water', 'flying'], location: 'Rota 104', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                    { id: 285, name: 'Shroomish', level: 12, types: ['grass'], location: 'Petalburg Woods', notes: 'Absorb.', keyMoves: ['Absorb'] },
                    { id: 183, name: 'Marill', level: 12, types: ['water', 'fairy'], location: 'Rota 104', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                    { id: 280, name: 'Ralts', level: 10, types: ['psychic', 'fairy'], location: 'Rota 102', notes: 'Confusion (dano neutro).', keyMoves: ['Confusion'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Vantagem absoluta.',
                team: [
                    { id: 258, name: 'Mudkip', level: 14, types: ['water'], location: 'Inicial', notes: 'Water Gun vence todos.', keyMoves: ['Water Gun'] },
                    { id: 270, name: 'Lotad', level: 10, types: ['water', 'grass'], location: 'Rota 102', notes: 'Absorb.', keyMoves: ['Absorb'] },
                    { id: 285, name: 'Shroomish', level: 10, types: ['grass'], location: 'Petalburg Woods', notes: 'Absorb.', keyMoves: ['Absorb'] },
                    { id: 279, name: 'Wingull', level: 12, types: ['water', 'flying'], location: 'Rota 104', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                    { id: 261, name: 'Poochyena', level: 10, types: ['dark'], location: 'Rota 102', notes: 'Backup.', keyMoves: ['Bite'] },
                    { id: 263, name: 'Zigzagoon', level: 10, types: ['normal'], location: 'Rota 102', notes: 'Pickup (Items).', keyMoves: ['Tackle'] }
                ]
            }
        ]
      },
      {
        id: 'brawly',
        name: 'Brawly',
        specialty: 'fighting',
        badge: 'Knuckle Badge',
        location: 'Dewford Town',
        description: 'Uma grande onda de luta.',
        acePokemonId: 296,
        team: [
          { id: 66, name: 'Machop', level: 16, types: ['fighting'], counters: [{ id: 276, name: 'Taillow', description: 'Voador' }, { id: 63, name: 'Abra', description: 'Psíquico' }] },
          { id: 307, name: 'Meditite', level: 16, types: ['fighting', 'psychic'], counters: [{ id: 276, name: 'Taillow', description: 'Voador' }, { id: 302, name: 'Sableye', description: 'Fantasma' }] },
          { id: 296, name: 'Makuhita', level: 19, types: ['fighting'], counters: [{ id: 276, name: 'Taillow', description: 'Wing Attack' }, { id: 302, name: 'Sableye', description: 'Imune a luta' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Use Voador/Psíquico.',
                team: [
                    { id: 253, name: 'Grovyle', level: 18, types: ['grass'], location: 'Evolução', notes: 'Resiste a golpes elétricos (se houver) e luta.', keyMoves: ['Absorb'] },
                    { id: 276, name: 'Taillow', level: 18, types: ['normal', 'flying'], location: 'Rota 104', notes: 'MVP. Wing Attack destrói lutadores.', keyMoves: ['Wing Attack'] },
                    { id: 267, name: 'Beautifly', level: 15, types: ['bug', 'flying'], location: 'Evolução (Wurmple)', notes: 'Gust (4x em Meditite/Machop).', keyMoves: ['Gust'] },
                    { id: 269, name: 'Dustox', level: 15, types: ['bug', 'poison'], location: 'Evolução (Wurmple)', notes: 'Confusion (4x em Machop).', keyMoves: ['Confusion'] },
                    { id: 63, name: 'Abra', level: 16, types: ['psychic'], location: 'Granite Cave', notes: 'Confusion (Se evoluir para Kadabra, melhor).', keyMoves: ['Confusion'] },
                    { id: 302, name: 'Sableye', level: 18, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Imune a Fighting. Vitória grátis.', keyMoves: ['Night Shade'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Peck ajuda muito.',
                team: [
                    { id: 256, name: 'Combusken', level: 19, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Peck é super efetivo.', keyMoves: ['Peck'] },
                    { id: 276, name: 'Taillow', level: 18, types: ['normal', 'flying'], location: 'Rota 104', notes: 'Wing Attack é MVP.', keyMoves: ['Wing Attack'] },
                    { id: 302, name: 'Sableye', level: 18, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Imune a Fighting.', keyMoves: ['Night Shade'] },
                    { id: 63, name: 'Abra', level: 16, types: ['psychic'], location: 'Granite Cave', notes: 'Confusion.', keyMoves: ['Confusion'] },
                    { id: 267, name: 'Beautifly', level: 15, types: ['bug', 'flying'], location: 'Petalburg Woods', notes: 'Gust.', keyMoves: ['Gust'] },
                    { id: 41, name: 'Zubat', level: 15, types: ['poison', 'flying'], location: 'Granite Cave', notes: 'Resiste a luta (4x). Wing Attack.', keyMoves: ['Wing Attack'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Use aliados.',
                team: [
                    { id: 259, name: 'Marshtomp', level: 18, types: ['water', 'ground'], location: 'Evolução', notes: 'Mud Shot.', keyMoves: ['Mud Shot'] },
                    { id: 276, name: 'Taillow', level: 18, types: ['normal', 'flying'], location: 'Rota 104', notes: 'MVP.', keyMoves: ['Wing Attack'] },
                    { id: 269, name: 'Dustox', level: 15, types: ['bug', 'poison'], location: 'Petalburg Woods', notes: 'Confusion.', keyMoves: ['Confusion'] },
                    { id: 302, name: 'Sableye', level: 18, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Vitória grátis.', keyMoves: ['Night Shade'] },
                    { id: 63, name: 'Abra', level: 16, types: ['psychic'], location: 'Granite Cave', notes: 'Confusion.', keyMoves: ['Confusion'] },
                    { id: 41, name: 'Zubat', level: 15, types: ['poison', 'flying'], location: 'Granite Cave', notes: 'Wing Attack.', keyMoves: ['Wing Attack'] }
                ]
            }
        ]
      },
      {
        id: 'wattson',
        name: 'Wattson',
        specialty: 'electric',
        badge: 'Dynamo Badge',
        location: 'Mauville City',
        description: 'O homem elétrico alegre.',
        acePokemonId: 310,
        team: [
          { id: 100, name: 'Voltorb', level: 20, types: ['electric'], counters: [{ id: 259, name: 'Marshtomp', description: 'Terra' }, { id: 74, name: 'Geodude', description: 'Terra' }] },
          { id: 309, name: 'Electrike', level: 20, types: ['electric'], counters: [{ id: 74, name: 'Geodude', description: 'Terra' }] },
          { id: 82, name: 'Magneton', level: 22, types: ['electric', 'steel'], counters: [{ id: 256, name: 'Combusken', description: 'Double Kick' }, { id: 259, name: 'Marshtomp', description: 'Mud Shot (4x)' }] },
          { id: 310, name: 'Manectric', level: 24, types: ['electric'], counters: [{ id: 259, name: 'Marshtomp', description: 'Imune a elétrico' }, { id: 74, name: 'Geodude', description: 'Imune' }] }
        ],
        recommendedTeams: [
            {
                starterId: 258, starterName: 'Mudkip', description: 'Marshtomp vence sozinho.',
                team: [
                    { id: 259, name: 'Marshtomp', level: 24, types: ['water', 'ground'], location: 'Evolução', notes: 'Imune a elétrico. Mud Shot destrói tudo.', keyMoves: ['Mud Shot'] },
                    { id: 74, name: 'Geodude', level: 22, types: ['rock', 'ground'], location: 'Granite Cave', notes: 'Backup de terra.', keyMoves: ['Magnitude'] },
                    { id: 286, name: 'Breloom', level: 23, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch em Magneton.', keyMoves: ['Mach Punch'] },
                    { id: 296, name: 'Makuhita', level: 22, types: ['fighting'], location: 'Granite Cave', notes: 'Fighting moves.', keyMoves: ['Vital Throw'] },
                    { id: 304, name: 'Aron', level: 22, types: ['steel', 'rock'], location: 'Granite Cave', notes: 'Resiste a Normal/Sonicboom.', keyMoves: ['Mud-Slap'] },
                    { id: 322, name: 'Numel', level: 22, types: ['fire', 'ground'], location: 'Rota 112', notes: 'Imune a elétrico. Ember em Magneton.', keyMoves: ['Ember', 'Magnitude'] }
                ]
            },
            {
                starterId: 252, starterName: 'Treecko', description: 'Resiste a elétrico, mas cuidado com Magneton.',
                team: [
                    { id: 253, name: 'Grovyle', level: 24, types: ['grass'], location: 'Evolução', notes: 'Resiste. Cuidado com Sonic Boom.', keyMoves: ['Leaf Blade'] },
                    { id: 296, name: 'Makuhita', level: 22, types: ['fighting'], location: 'Granite Cave', notes: 'Vital Throw/Karate Chop para Magneton.', keyMoves: ['Vital Throw'] },
                    { id: 74, name: 'Geodude', level: 22, types: ['rock', 'ground'], location: 'Granite Cave', notes: 'Imune a elétrico. Magnitude.', keyMoves: ['Magnitude'] },
                    { id: 322, name: 'Numel', level: 22, types: ['fire', 'ground'], location: 'Rota 112', notes: 'Imune a elétrico. Ember em Magneton.', keyMoves: ['Ember'] },
                    { id: 286, name: 'Breloom', level: 23, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch.', keyMoves: ['Mach Punch'] },
                    { id: 75, name: 'Graveler', level: 25, types: ['rock', 'ground'], location: 'Evolução', notes: 'Magnitude.', keyMoves: ['Magnitude'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Combusken destrói Magneton.',
                team: [
                    { id: 256, name: 'Combusken', level: 24, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Double Kick em Magneton. Ember nos outros.', keyMoves: ['Double Kick', 'Ember'] },
                    { id: 74, name: 'Geodude', level: 22, types: ['rock', 'ground'], location: 'Granite Cave', notes: 'MVP defensivo.', keyMoves: ['Magnitude'] },
                    { id: 286, name: 'Breloom', level: 23, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch.', keyMoves: ['Mach Punch'] },
                    { id: 296, name: 'Makuhita', level: 22, types: ['fighting'], location: 'Granite Cave', notes: 'Vital Throw.', keyMoves: ['Vital Throw'] },
                    { id: 304, name: 'Aron', level: 22, types: ['steel', 'rock'], location: 'Granite Cave', notes: 'Resiste a normal.', keyMoves: ['Mud-Slap'] },
                    { id: 274, name: 'Nuzleaf', level: 22, types: ['grass', 'dark'], location: 'Rota 114', notes: 'Resiste a elétrico.', keyMoves: ['Bullet Seed'] }
                ]
            }
        ]
      },
      {
        id: 'flannery',
        name: 'Flannery',
        specialty: 'fire',
        badge: 'Heat Badge',
        location: 'Lavaridge Town',
        description: 'Uma paixão que queima!',
        acePokemonId: 324,
        team: [
          { id: 322, name: 'Numel', level: 24, types: ['fire', 'ground'], counters: [{ id: 279, name: 'Pelipper', description: 'Água (4x)' }, { id: 130, name: 'Gyarados', description: 'Água (4x)' }] },
          { id: 218, name: 'Slugma', level: 24, types: ['fire'], counters: [{ id: 74, name: 'Geodude', description: 'Pedra/Terra' }] },
          { id: 323, name: 'Camerupt', level: 26, types: ['fire', 'ground'], counters: [{ id: 279, name: 'Pelipper', description: 'Água (4x)' }, { id: 184, name: 'Azumarill', description: 'Água (4x)' }] },
          { id: 324, name: 'Torkoal', level: 29, types: ['fire'], counters: [{ id: 184, name: 'Azumarill', description: 'Thick Fat + Water' }, { id: 259, name: 'Marshtomp', description: 'Water/Ground' }] }
        ],
        recommendedTeams: [
             {
                starterId: 258, starterName: 'Mudkip', description: 'Vantagem total.',
                team: [
                    { id: 259, name: 'Marshtomp', level: 29, types: ['water', 'ground'], location: 'Evolução', notes: 'Water Gun/Mud Shot destrói tudo.', keyMoves: ['Water Gun'] },
                    { id: 130, name: 'Gyarados', level: 25, types: ['water', 'flying'], location: 'Evolução Magikarp', notes: 'Intimidate + Resistência.', keyMoves: ['Dragon Rage'] },
                    { id: 279, name: 'Pelipper', level: 28, types: ['water', 'flying'], location: 'Evolução', notes: 'Water Gun em Camerupt (4x).', keyMoves: ['Water Gun'] },
                    { id: 184, name: 'Azumarill', level: 25, types: ['water', 'fairy'], location: 'Rota 117', notes: 'Thick Fat resiste a fogo. Bubblebeam.', keyMoves: ['Bubblebeam'] },
                    { id: 73, name: 'Tentacruel', level: 28, types: ['water', 'poison'], location: 'Surf', notes: 'Resiste a fogo.', keyMoves: ['Bubblebeam'] },
                    { id: 75, name: 'Graveler', level: 28, types: ['rock', 'ground'], location: 'Evolução', notes: 'Rock Throw/Magnitude.', keyMoves: ['Magnitude'] }
                ]
            },
            {
                starterId: 252, starterName: 'Treecko', description: 'Desvantagem. Use Água/Pedra.',
                team: [
                    { id: 253, name: 'Grovyle', level: 29, types: ['grass'], location: 'Evolução', notes: 'Evite usar.', keyMoves: ['Quick Attack'] },
                    { id: 184, name: 'Azumarill', level: 28, types: ['water', 'fairy'], location: 'Rota 117', notes: 'MVP. Thick Fat.', keyMoves: ['Bubblebeam'] },
                    { id: 279, name: 'Pelipper', level: 28, types: ['water', 'flying'], location: 'Evolução', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                    { id: 130, name: 'Gyarados', level: 25, types: ['water', 'flying'], location: 'Evolução', notes: 'Intimidate.', keyMoves: ['Dragon Rage'] },
                    { id: 75, name: 'Graveler', level: 28, types: ['rock', 'ground'], location: 'Evolução', notes: 'Magnitude em Torkoal.', keyMoves: ['Magnitude'] },
                    { id: 73, name: 'Tentacool', level: 25, types: ['water', 'poison'], location: 'Pesca', notes: 'Resistência.', keyMoves: ['Bubblebeam'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Neutro. Use Água.',
                team: [
                    { id: 256, name: 'Combusken', level: 29, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Double Kick em Torkoal.', keyMoves: ['Double Kick'] },
                    { id: 184, name: 'Azumarill', level: 28, types: ['water', 'fairy'], location: 'Rota 117', notes: 'Essencial.', keyMoves: ['Bubblebeam'] },
                    { id: 279, name: 'Pelipper', level: 28, types: ['water', 'flying'], location: 'Evolução', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
                    { id: 130, name: 'Gyarados', level: 25, types: ['water', 'flying'], location: 'Evolução', notes: 'Intimidate.', keyMoves: ['Dragon Rage'] },
                    { id: 329, name: 'Vibrava', level: 35, types: ['ground', 'dragon'], location: 'Rota 111 (Trapinch)', notes: 'Se evoluir, Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 75, name: 'Graveler', level: 28, types: ['rock', 'ground'], location: 'Evolução', notes: 'Magnitude.', keyMoves: ['Magnitude'] }
                ]
            }
        ]
      },
      {
        id: 'norman',
        name: 'Norman',
        specialty: 'normal',
        badge: 'Balance Badge',
        location: 'Petalburg City',
        description: 'Um homem que vive pelo poder.',
        acePokemonId: 289,
        team: [
          { id: 327, name: 'Spinda', level: 27, types: ['normal'], counters: [{ id: 256, name: 'Combusken', description: 'Lutador' }] },
          { id: 288, name: 'Vigoroth', level: 27, types: ['normal'], counters: [{ id: 286, name: 'Breloom', description: 'Mach Punch' }] },
          { id: 264, name: 'Linoone', level: 29, types: ['normal'], counters: [{ id: 297, name: 'Hariyama', description: 'Vital Throw' }] },
          { id: 289, name: 'Slaking', level: 31, types: ['normal'], counters: [{ id: 324, name: 'Torkoal', description: 'Protect (Anula turnos)' }, { id: 286, name: 'Breloom', description: 'Mach Punch' }] }
        ],
        recommendedTeams: [
            {
                starterId: 255, starterName: 'Torchic', description: 'Lutador é a chave.',
                team: [
                    { id: 256, name: 'Combusken', level: 30, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Double Kick.', keyMoves: ['Double Kick'] },
                    { id: 286, name: 'Breloom', level: 30, types: ['grass', 'fighting'], location: 'Petalburg Woods (Shroomish)', notes: 'Mach Punch e Stun Spore.', keyMoves: ['Mach Punch'] },
                    { id: 324, name: 'Torkoal', level: 28, types: ['fire'], location: 'Fiery Path', notes: 'Protect (TM) para travar Slaking no turno de ataque (Truant).', keyMoves: ['Protect'] },
                    { id: 297, name: 'Hariyama', level: 30, types: ['fighting'], location: 'Granite Cave', notes: 'Vital Throw.', keyMoves: ['Vital Throw'] },
                    { id: 302, name: 'Sableye', level: 28, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Imune a Normal (Facade/Slash).', keyMoves: ['Night Shade'] },
                    { id: 305, name: 'Lairon', level: 32, types: ['steel', 'rock'], location: 'Evolução', notes: 'Resiste muito a normal.', keyMoves: ['Iron Tail'] }
                ]
            },
            {
                starterId: 252, starterName: 'Treecko', description: 'Use Proteção e Lutadores.',
                team: [
                    { id: 254, name: 'Sceptile', level: 36, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade.', keyMoves: ['Leaf Blade'] },
                    { id: 297, name: 'Hariyama', level: 30, types: ['fighting'], location: 'Granite Cave', notes: 'Vital Throw.', keyMoves: ['Vital Throw'] },
                    { id: 286, name: 'Breloom', level: 30, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch.', keyMoves: ['Mach Punch'] },
                    { id: 279, name: 'Pelipper', level: 30, types: ['water', 'flying'], location: 'Evolução', notes: 'Protect (aprendido por nível) para Slaking.', keyMoves: ['Protect'] },
                    { id: 324, name: 'Torkoal', level: 28, types: ['fire'], location: 'Fiery Path', notes: 'Protect (TM).', keyMoves: ['Protect'] },
                    { id: 305, name: 'Lairon', level: 32, types: ['steel', 'rock'], location: 'Evolução', notes: 'Tanque físico.', keyMoves: ['Iron Tail'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Protect é o segredo.',
                team: [
                    { id: 260, name: 'Swampert', level: 36, types: ['water', 'ground'], location: 'Evolução', notes: 'Mud Shot/Surf.', keyMoves: ['Surf'] },
                    { id: 286, name: 'Breloom', level: 30, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch.', keyMoves: ['Mach Punch'] },
                    { id: 297, name: 'Hariyama', level: 30, types: ['fighting'], location: 'Granite Cave', notes: 'Vital Throw.', keyMoves: ['Vital Throw'] },
                    { id: 279, name: 'Pelipper', level: 30, types: ['water', 'flying'], location: 'Evolução', notes: 'Protect contra Slaking.', keyMoves: ['Protect'] },
                    { id: 302, name: 'Sableye', level: 28, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Imune.', keyMoves: ['Night Shade'] },
                    { id: 67, name: 'Machoke', level: 30, types: ['fighting'], location: 'Rota 112', notes: 'Low Kick/Karate Chop.', keyMoves: ['Low Kick'] }
                ]
            }
        ]
      },
      {
        id: 'winona',
        name: 'Winona',
        specialty: 'flying',
        badge: 'Feather Badge',
        location: 'Fortree City',
        description: 'A usuária de pássaros que voa pelo mundo.',
        acePokemonId: 334,
        team: [
          { id: 333, name: 'Swablu', level: 29, types: ['normal', 'flying'], counters: [{ id: 310, name: 'Manectric', description: 'Elétrico' }] },
          { id: 357, name: 'Tropius', level: 29, types: ['grass', 'flying'], counters: [{ id: 364, name: 'Sealeo', description: 'Ice Beam (4x)' }, { id: 256, name: 'Combusken', description: 'Fogo' }] },
          { id: 279, name: 'Pelipper', level: 30, types: ['water', 'flying'], counters: [{ id: 310, name: 'Manectric', description: 'Elétrico (4x)' }] },
          { id: 227, name: 'Skarmory', level: 31, types: ['steel', 'flying'], counters: [{ id: 310, name: 'Manectric', description: 'Elétrico' }, { id: 256, name: 'Combusken', description: 'Fogo' }] },
          { id: 334, name: 'Altaria', level: 33, types: ['dragon', 'flying'], counters: [{ id: 364, name: 'Sealeo', description: 'Ice Beam (4x)' }, { id: 310, name: 'Manectric', description: 'Electric' }] }
        ],
        recommendedTeams: [
            {
                starterId: 258, starterName: 'Mudkip', description: 'Ice Beam é necessário para Altaria.',
                team: [
                    { id: 260, name: 'Swampert', level: 36, types: ['water', 'ground'], location: 'Evolução', notes: 'Ice Beam (TM) destrói Altaria/Tropius.', keyMoves: ['Ice Beam'] },
                    { id: 310, name: 'Manectric', level: 33, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt/Spark para Skarmory e Pelipper.', keyMoves: ['Thunderbolt'] },
                    { id: 82, name: 'Magneton', level: 33, types: ['electric', 'steel'], location: 'New Mauville', notes: 'Resiste a tudo. Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 351, name: 'Castform', level: 30, types: ['normal'], location: 'Weather Institute', notes: 'Hail/Powder Snow.', keyMoves: ['Powder Snow'] },
                    { id: 364, name: 'Sealeo', level: 32, types: ['ice', 'water'], location: 'Shoal Cave', notes: 'Ice Beam/Aurora Beam.', keyMoves: ['Aurora Beam'] },
                    { id: 101, name: 'Electrode', level: 33, types: ['electric'], location: 'New Mauville', notes: 'Rápido.', keyMoves: ['Spark'] }
                ]
            },
            {
                starterId: 252, starterName: 'Treecko', description: 'Use Elétrico/Gelo.',
                team: [
                    { id: 254, name: 'Sceptile', level: 36, types: ['grass'], location: 'Evolução', notes: 'Neutro. Cuidado com golpes voadores.', keyMoves: ['Leaf Blade'] },
                    { id: 310, name: 'Manectric', level: 33, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 82, name: 'Magneton', level: 33, types: ['electric', 'steel'], location: 'New Mauville', notes: 'Resiste a Voador.', keyMoves: ['Thunderbolt'] },
                    { id: 364, name: 'Sealeo', level: 32, types: ['ice', 'water'], location: 'Shoal Cave', notes: 'Aurora Beam para Altaria/Tropius.', keyMoves: ['Aurora Beam'] },
                    { id: 101, name: 'Electrode', level: 33, types: ['electric'], location: 'New Mauville', notes: 'Rápido.', keyMoves: ['Spark'] },
                    { id: 299, name: 'Nosepass', level: 30, types: ['rock'], location: 'Granite Cave', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Blaziken vence Skarmory/Tropius.',
                team: [
                    { id: 257, name: 'Blaziken', level: 36, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Blaze Kick em Skarmory/Tropius.', keyMoves: ['Blaze Kick'] },
                    { id: 310, name: 'Manectric', level: 33, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 82, name: 'Magneton', level: 33, types: ['electric', 'steel'], location: 'New Mauville', notes: 'MVP defensivo.', keyMoves: ['Thunderbolt'] },
                    { id: 364, name: 'Sealeo', level: 32, types: ['ice', 'water'], location: 'Shoal Cave', notes: 'Para Altaria.', keyMoves: ['Aurora Beam'] },
                    { id: 351, name: 'Castform', level: 30, types: ['normal'], location: 'Weather Institute', notes: 'Ice Beam (TM).', keyMoves: ['Ice Beam'] },
                    { id: 184, name: 'Azumarill', level: 30, types: ['water', 'fairy'], location: 'Rota 117', notes: 'Rollout (Ice Beam se puder).', keyMoves: ['Rollout'] }
                ]
            }
        ]
      },
      {
        id: 'tate-liza',
        name: 'Tate & Liza',
        specialty: 'psychic',
        badge: 'Mind Badge',
        location: 'Mossdeep City',
        description: 'A combinação mística.',
        acePokemonId: 338,
        team: [
          { id: 344, name: 'Claydol', level: 41, types: ['ground', 'psychic'], counters: [{ id: 260, name: 'Swampert', description: 'Surf' }, { id: 319, name: 'Sharpedo', description: 'Crunch' }] },
          { id: 178, name: 'Xatu', level: 41, types: ['psychic', 'flying'], counters: [{ id: 310, name: 'Manectric', description: 'Thunderbolt' }, { id: 319, name: 'Sharpedo', description: 'Crunch' }] },
          { id: 337, name: 'Lunatone', level: 42, types: ['rock', 'psychic'], counters: [{ id: 260, name: 'Swampert', description: 'Surf' }, { id: 305, name: 'Lairon', description: 'Iron Tail' }] },
          { id: 338, name: 'Solrock', level: 42, types: ['rock', 'psychic'], counters: [{ id: 260, name: 'Swampert', description: 'Surf' }, { id: 319, name: 'Sharpedo', description: 'Crunch' }] }
        ],
        recommendedTeams: [
            {
                starterId: 258, starterName: 'Mudkip', description: 'Surf atinge os dois inimigos.',
                team: [
                    { id: 260, name: 'Swampert', level: 42, types: ['water', 'ground'], location: 'Evolução', notes: 'Surf é a melhor arma. Bate em ambos.', keyMoves: ['Surf'] },
                    { id: 319, name: 'Sharpedo', level: 40, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch é super efetivo e STAB.', keyMoves: ['Crunch'] },
                    { id: 359, name: 'Absol', level: 40, types: ['dark'], location: 'Rota 120', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 342, name: 'Crawdaunt', level: 40, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 354, name: 'Banette', level: 40, types: ['ghost'], location: 'Mt Pyre', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 302, name: 'Sableye', level: 38, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Imune a psíquico.', keyMoves: ['Shadow Ball'] }
                ]
            },
            {
                starterId: 252, starterName: 'Treecko', description: 'Use Dark/Ghost.',
                team: [
                    { id: 254, name: 'Sceptile', level: 42, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade em Solrock/Lunatone/Claydol.', keyMoves: ['Leaf Blade'] },
                    { id: 319, name: 'Sharpedo', level: 40, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 359, name: 'Absol', level: 40, types: ['dark'], location: 'Rota 120', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 342, name: 'Crawdaunt', level: 40, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 354, name: 'Banette', level: 40, types: ['ghost'], location: 'Mt Pyre', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 356, name: 'Dusclops', level: 40, types: ['ghost'], location: 'Mt Pyre', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Cuidado com Solrock/Lunatone.',
                team: [
                    { id: 257, name: 'Blaziken', level: 42, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Fraco a psíquico. Use com cautela.', keyMoves: ['Blaze Kick'] },
                    { id: 319, name: 'Sharpedo', level: 40, types: ['water', 'dark'], location: 'Pesca', notes: 'MVP.', keyMoves: ['Crunch'] },
                    { id: 342, name: 'Crawdaunt', level: 40, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 359, name: 'Absol', level: 40, types: ['dark'], location: 'Rota 120', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 305, name: 'Lairon', level: 40, types: ['steel', 'rock'], location: 'Evolução', notes: 'Iron Tail em Solrock/Lunatone.', keyMoves: ['Iron Tail'] },
                    { id: 334, name: 'Altaria', level: 40, types: ['dragon', 'flying'], location: 'Evolução', notes: 'Dragon Breath.', keyMoves: ['Dragon Breath'] }
                ]
            }
        ]
      },
      {
        id: 'juan',
        name: 'Juan',
        specialty: 'water',
        badge: 'Rain Badge',
        location: 'Sootopolis City',
        description: 'O mentor de Wallace. Elegância aquática.',
        acePokemonId: 230,
        team: [
          { id: 370, name: 'Luvdisc', level: 41, types: ['water'], counters: [{ id: 310, name: 'Manectric', description: 'Elétrico' }] },
          { id: 340, name: 'Whiscash', level: 41, types: ['water', 'ground'], counters: [{ id: 254, name: 'Sceptile', description: 'Planta (4x)' }, { id: 272, name: 'Ludicolo', description: 'Giga Drain (4x)' }] },
          { id: 364, name: 'Sealeo', level: 43, types: ['ice', 'water'], counters: [{ id: 310, name: 'Manectric', description: 'Thunderbolt' }, { id: 67, name: 'Machamp', description: 'Fighting' }] },
          { id: 342, name: 'Crawdaunt', level: 43, types: ['water', 'dark'], counters: [{ id: 286, name: 'Breloom', description: 'Mach Punch' }, { id: 256, name: 'Combusken', description: 'Double Kick' }] },
          { id: 230, name: 'Kingdra', level: 46, types: ['water', 'dragon'], counters: [{ id: 272, name: 'Ludicolo', description: 'Resiste a água' }, { id: 334, name: 'Altaria', description: 'Dragon Breath' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Sceptile varre o time, exceto Kingdra.',
                team: [
                    { id: 254, name: 'Sceptile', level: 45, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade vence 4/5.', keyMoves: ['Leaf Blade'] },
                    { id: 310, name: 'Manectric', level: 44, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 272, name: 'Ludicolo', level: 44, types: ['water', 'grass'], location: 'Rota 102', notes: 'Resiste a água e Kingdra.', keyMoves: ['Giga Drain'] },
                    { id: 171, name: 'Lanturn', level: 42, types: ['water', 'electric'], location: 'Pesca', notes: 'Resiste a Gelo e Água.', keyMoves: ['Thunderbolt'] },
                    { id: 286, name: 'Breloom', level: 42, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch em Crawdaunt.', keyMoves: ['Mach Punch'] },
                    { id: 350, name: 'Milotic', level: 44, types: ['water'], location: 'Feebas (Raro)', notes: 'Toxic/Recover.', keyMoves: ['Toxic'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Use Elétrico/Planta.',
                team: [
                    { id: 257, name: 'Blaziken', level: 45, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Double Kick em Crawdaunt/Sealeo.', keyMoves: ['Double Kick'] },
                    { id: 310, name: 'Manectric', level: 44, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 272, name: 'Ludicolo', level: 44, types: ['water', 'grass'], location: 'Rota 102', notes: 'MVP defensivo.', keyMoves: ['Giga Drain'] },
                    { id: 171, name: 'Lanturn', level: 42, types: ['water', 'electric'], location: 'Pesca', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 286, name: 'Breloom', level: 42, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch.', keyMoves: ['Mach Punch'] },
                    { id: 82, name: 'Magneton', level: 42, types: ['electric', 'steel'], location: 'New Mauville', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Swampert não leva dano elétrico (se houvesse).',
                team: [
                    { id: 260, name: 'Swampert', level: 46, types: ['water', 'ground'], location: 'Evolução', notes: 'Earthquake em quem não voa.', keyMoves: ['Earthquake'] },
                    { id: 310, name: 'Manectric', level: 44, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 272, name: 'Ludicolo', level: 44, types: ['water', 'grass'], location: 'Rota 102', notes: 'Giga Drain.', keyMoves: ['Giga Drain'] },
                    { id: 286, name: 'Breloom', level: 42, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Giga Drain/Mach Punch.', keyMoves: ['Mach Punch'] },
                    { id: 171, name: 'Lanturn', level: 42, types: ['water', 'electric'], location: 'Pesca', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 279, name: 'Pelipper', level: 40, types: ['water', 'flying'], location: 'Evolução', notes: 'Resiste a Kingdra.', keyMoves: ['Fly'] }
                ]
            }
        ]
      },
      {
        id: 'sidney',
        name: 'Sidney',
        specialty: 'dark',
        badge: 'Elite Four',
        location: 'Ever Grande City',
        description: 'Elite Four - Noturno.',
        acePokemonId: 359,
        team: [
          { id: 262, name: 'Mightyena', level: 46, types: ['dark'], counters: [{ id: 257, name: 'Blaziken', description: 'Double Kick' }, { id: 286, name: 'Breloom', description: 'Mach Punch' }] },
          { id: 275, name: 'Shiftry', level: 48, types: ['grass', 'dark'], counters: [{ id: 257, name: 'Blaziken', description: 'Flamethrower' }, { id: 277, name: 'Swellow', description: 'Aerial Ace' }] },
          { id: 332, name: 'Cacturne', level: 46, types: ['grass', 'dark'], counters: [{ id: 257, name: 'Blaziken', description: 'Flamethrower' }, { id: 214, name: 'Heracross', description: 'Megahorn' }] },
          { id: 342, name: 'Crawdaunt', level: 48, types: ['water', 'dark'], counters: [{ id: 254, name: 'Sceptile', description: 'Leaf Blade' }, { id: 310, name: 'Manectric', description: 'Thunderbolt' }] },
          { id: 359, name: 'Absol', level: 49, types: ['dark'], counters: [{ id: 257, name: 'Blaziken', description: 'Double Kick' }, { id: 286, name: 'Breloom', description: 'Mach Punch' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Sceptile cuida de Crawdaunt.',
                team: [
                    { id: 254, name: 'Sceptile', level: 50, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade em Crawdaunt.', keyMoves: ['Leaf Blade'] },
                    { id: 286, name: 'Breloom', level: 48, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch/Sky Uppercut destrói Dark.', keyMoves: ['Sky Uppercut'] },
                    { id: 277, name: 'Swellow', level: 48, types: ['normal', 'flying'], location: 'Evolução', notes: 'Aerial Ace em Shiftry/Cacturne (4x).', keyMoves: ['Aerial Ace'] },
                    { id: 297, name: 'Hariyama', level: 48, types: ['fighting'], location: 'Granite Cave', notes: 'Vital Throw.', keyMoves: ['Vital Throw'] },
                    { id: 310, name: 'Manectric', level: 48, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 214, name: 'Heracross', level: 48, types: ['bug', 'fighting'], location: 'Safari Zone', notes: 'Megahorn/Brick Break.', keyMoves: ['Megahorn'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Blaziken domina.',
                team: [
                    { id: 257, name: 'Blaziken', level: 50, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Double Kick/Flamethrower varre o time.', keyMoves: ['Double Kick'] },
                    { id: 272, name: 'Ludicolo', level: 48, types: ['water', 'grass'], location: 'Rota 102', notes: 'Giga Drain em Crawdaunt.', keyMoves: ['Giga Drain'] },
                    { id: 277, name: 'Swellow', level: 48, types: ['normal', 'flying'], location: 'Evolução', notes: 'Aerial Ace em Shiftry/Cacturne.', keyMoves: ['Aerial Ace'] },
                    { id: 282, name: 'Gardevoir', level: 48, types: ['psychic', 'fairy'], location: 'Rota 102', notes: 'Moonblast (Fairy) se disponível ou Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 310, name: 'Manectric', level: 48, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 184, name: 'Azumarill', level: 45, types: ['water', 'fairy'], location: 'Rota 102', notes: 'Play Rough se disponível.', keyMoves: ['Surf'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Swampert ajuda com tank.',
                team: [
                    { id: 260, name: 'Swampert', level: 50, types: ['water', 'ground'], location: 'Evolução', notes: 'Hammer Arm/Brick Break.', keyMoves: ['Surf'] },
                    { id: 286, name: 'Breloom', level: 48, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch essencial.', keyMoves: ['Mach Punch'] },
                    { id: 214, name: 'Heracross', level: 48, types: ['bug', 'fighting'], location: 'Safari Zone', notes: 'Megahorn destruidor.', keyMoves: ['Megahorn'] },
                    { id: 277, name: 'Swellow', level: 48, types: ['normal', 'flying'], location: 'Evolução', notes: 'Aerial Ace.', keyMoves: ['Aerial Ace'] },
                    { id: 297, name: 'Hariyama', level: 48, types: ['fighting'], location: 'Granite Cave', notes: 'Vital Throw.', keyMoves: ['Vital Throw'] },
                    { id: 306, name: 'Aggron', level: 48, types: ['steel', 'rock'], location: 'Granite Cave', notes: 'Resiste a Normal/Dark.', keyMoves: ['Iron Tail'] }
                ]
            }
        ]
      },
      {
        id: 'phoebe',
        name: 'Phoebe',
        specialty: 'ghost',
        badge: 'Elite Four',
        location: 'Ever Grande City',
        description: 'Elite Four - Fantasma.',
        acePokemonId: 356,
        team: [
          { id: 356, name: 'Dusclops', level: 48, types: ['ghost'], counters: [{ id: 359, name: 'Absol', description: 'Shadow Ball' }, { id: 302, name: 'Sableye', description: 'Shadow Ball' }] },
          { id: 354, name: 'Banette', level: 49, types: ['ghost'], counters: [{ id: 359, name: 'Absol', description: 'Shadow Ball' }, { id: 319, name: 'Sharpedo', description: 'Crunch' }] },
          { id: 302, name: 'Sableye', level: 50, types: ['dark', 'ghost'], counters: [{ id: 282, name: 'Gardevoir', description: 'Dazzling Gleam' }, { id: 257, name: 'Blaziken', description: 'Neutro forte' }] },
          { id: 354, name: 'Banette', level: 49, types: ['ghost'], counters: [{ id: 359, name: 'Absol', description: 'Shadow Ball' }] },
          { id: 356, name: 'Dusclops', level: 51, types: ['ghost'], counters: [{ id: 359, name: 'Absol', description: 'Shadow Ball' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Use Dark types.',
                team: [
                    { id: 254, name: 'Sceptile', level: 52, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade (dano neutro alto).', keyMoves: ['Leaf Blade'] },
                    { id: 359, name: 'Absol', level: 50, types: ['dark'], location: 'Rota 120', notes: 'Shadow Ball/Crunch mata fantasmas.', keyMoves: ['Shadow Ball'] },
                    { id: 319, name: 'Sharpedo', level: 48, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 302, name: 'Sableye', level: 48, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Shadow Ball (Imune a Normal/Luta).', keyMoves: ['Shadow Ball'] },
                    { id: 342, name: 'Crawdaunt', level: 48, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 262, name: 'Mightyena', level: 48, types: ['dark'], location: 'Rota 102', notes: 'Crunch.', keyMoves: ['Crunch'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Blaziken bate forte.',
                team: [
                    { id: 257, name: 'Blaziken', level: 52, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Blaze Kick. Cuidado com golpes psíquicos.', keyMoves: ['Blaze Kick'] },
                    { id: 359, name: 'Absol', level: 50, types: ['dark'], location: 'Rota 120', notes: 'MVP.', keyMoves: ['Shadow Ball'] },
                    { id: 319, name: 'Sharpedo', level: 48, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 302, name: 'Sableye', level: 48, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 310, name: 'Manectric', level: 48, types: ['electric'], location: 'Rota 110', notes: 'Bite/Crunch (se tiver).', keyMoves: ['Thunderbolt'] },
                    { id: 262, name: 'Mightyena', level: 48, types: ['dark'], location: 'Rota 102', notes: 'Crunch.', keyMoves: ['Crunch'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Swampert resiste.',
                team: [
                    { id: 260, name: 'Swampert', level: 52, types: ['water', 'ground'], location: 'Evolução', notes: 'Surf.', keyMoves: ['Surf'] },
                    { id: 359, name: 'Absol', level: 50, types: ['dark'], location: 'Rota 120', notes: 'MVP.', keyMoves: ['Shadow Ball'] },
                    { id: 319, name: 'Sharpedo', level: 48, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 302, name: 'Sableye', level: 48, types: ['dark', 'ghost'], location: 'Granite Cave', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 342, name: 'Crawdaunt', level: 48, types: ['water', 'dark'], location: 'Pesca', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 356, name: 'Dusclops', level: 48, types: ['ghost'], location: 'Mt Pyre', notes: 'Shadow Ball vs Shadow Ball.', keyMoves: ['Shadow Ball'] }
                ]
            }
        ]
      },
      {
        id: 'glacia',
        name: 'Glacia',
        specialty: 'ice',
        badge: 'Elite Four',
        location: 'Ever Grande City',
        description: 'Elite Four - Gelo.',
        acePokemonId: 365,
        team: [
          { id: 362, name: 'Glalie', level: 50, types: ['ice'], counters: [{ id: 257, name: 'Blaziken', description: 'Flamethrower' }, { id: 297, name: 'Hariyama', description: 'Brick Break' }] },
          { id: 364, name: 'Sealeo', level: 50, types: ['ice', 'water'], counters: [{ id: 310, name: 'Manectric', description: 'Thunderbolt' }, { id: 254, name: 'Sceptile', description: 'Leaf Blade' }] },
          { id: 362, name: 'Glalie', level: 52, types: ['ice'], counters: [{ id: 257, name: 'Blaziken', description: 'Flamethrower' }] },
          { id: 364, name: 'Sealeo', level: 52, types: ['ice', 'water'], counters: [{ id: 310, name: 'Manectric', description: 'Thunderbolt' }] },
          { id: 365, name: 'Walrein', level: 53, types: ['ice', 'water'], counters: [{ id: 310, name: 'Manectric', description: 'Thunder' }, { id: 297, name: 'Hariyama', description: 'Brick Break' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Leaf Blade para Sealeo/Walrein.',
                team: [
                    { id: 254, name: 'Sceptile', level: 54, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade destrói os tipos Água/Gelo.', keyMoves: ['Leaf Blade'] },
                    { id: 297, name: 'Hariyama', level: 50, types: ['fighting'], location: 'Granite Cave', notes: 'Thick Fat resiste a Gelo. Brick Break.', keyMoves: ['Brick Break'] },
                    { id: 310, name: 'Manectric', level: 50, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt em Walrein.', keyMoves: ['Thunderbolt'] },
                    { id: 82, name: 'Magneton', level: 50, types: ['electric', 'steel'], location: 'New Mauville', notes: 'Resiste a gelo. Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 257, name: 'Blaziken', level: 50, types: ['fire', 'fighting'], location: 'Troca', notes: 'Flamethrower/Sky Uppercut.', keyMoves: ['Sky Uppercut'] },
                    { id: 306, name: 'Aggron', level: 50, types: ['steel', 'rock'], location: 'Granite Cave', notes: 'Iron Tail.', keyMoves: ['Iron Tail'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Blaziken domina.',
                team: [
                    { id: 257, name: 'Blaziken', level: 54, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Sky Uppercut/Flamethrower vence todos.', keyMoves: ['Sky Uppercut'] },
                    { id: 310, name: 'Manectric', level: 50, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 297, name: 'Hariyama', level: 50, types: ['fighting'], location: 'Granite Cave', notes: 'Thick Fat. Brick Break.', keyMoves: ['Brick Break'] },
                    { id: 82, name: 'Magneton', level: 50, types: ['electric', 'steel'], location: 'New Mauville', notes: 'Resiste a gelo.', keyMoves: ['Thunderbolt'] },
                    { id: 272, name: 'Ludicolo', level: 50, types: ['water', 'grass'], location: 'Rota 102', notes: 'Giga Drain em Walrein.', keyMoves: ['Giga Drain'] },
                    { id: 171, name: 'Lanturn', level: 48, types: ['water', 'electric'], location: 'Pesca', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Swampert com Rock Slide/Brick Break.',
                team: [
                    { id: 260, name: 'Swampert', level: 54, types: ['water', 'ground'], location: 'Evolução', notes: 'Brick Break (TM). Cuidado com Sheer Cold.', keyMoves: ['Brick Break'] },
                    { id: 297, name: 'Hariyama', level: 50, types: ['fighting'], location: 'Granite Cave', notes: 'MVP. Brick Break.', keyMoves: ['Brick Break'] },
                    { id: 310, name: 'Manectric', level: 50, types: ['electric'], location: 'Rota 110', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 82, name: 'Magneton', level: 50, types: ['electric', 'steel'], location: 'New Mauville', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 286, name: 'Breloom', level: 50, types: ['grass', 'fighting'], location: 'Petalburg Woods', notes: 'Mach Punch.', keyMoves: ['Mach Punch'] },
                    { id: 306, name: 'Aggron', level: 50, types: ['steel', 'rock'], location: 'Granite Cave', notes: 'Iron Tail.', keyMoves: ['Iron Tail'] }
                ]
            }
        ]
      },
      {
        id: 'drake',
        name: 'Drake',
        specialty: 'dragon',
        badge: 'Elite Four',
        location: 'Ever Grande City',
        description: 'Elite Four - Dragão.',
        acePokemonId: 373,
        team: [
          { id: 372, name: 'Shelgon', level: 52, types: ['dragon'], counters: [{ id: 364, name: 'Sealeo', description: 'Ice Beam' }, { id: 334, name: 'Altaria', description: 'Dragon Breath' }] },
          { id: 334, name: 'Altaria', level: 54, types: ['dragon', 'flying'], counters: [{ id: 364, name: 'Sealeo', description: 'Ice Beam (4x)' }] },
          { id: 230, name: 'Kingdra', level: 53, types: ['water', 'dragon'], counters: [{ id: 334, name: 'Altaria', description: 'Dragon Breath' }] },
          { id: 330, name: 'Flygon', level: 53, types: ['ground', 'dragon'], counters: [{ id: 364, name: 'Sealeo', description: 'Ice Beam (4x)' }] },
          { id: 373, name: 'Salamence', level: 55, types: ['dragon', 'flying'], counters: [{ id: 364, name: 'Sealeo', description: 'Ice Beam (4x)' }, { id: 373, name: 'Salamence', description: 'Dragon Claw' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Gelo é necessário.',
                team: [
                    { id: 254, name: 'Sceptile', level: 56, types: ['grass'], location: 'Evolução', notes: 'Dragon Claw (TM) se possível.', keyMoves: ['Dragon Claw'] },
                    { id: 365, name: 'Walrein', level: 54, types: ['ice', 'water'], location: 'Shoal Cave', notes: 'Ice Beam varre o time (4x em 3/5).', keyMoves: ['Ice Beam'] },
                    { id: 334, name: 'Altaria', level: 54, types: ['dragon', 'flying'], location: 'Evolução', notes: 'Dragon Breath.', keyMoves: ['Dragon Breath'] },
                    { id: 373, name: 'Salamence', level: 55, types: ['dragon', 'flying'], location: 'Meteor Falls', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
                    { id: 330, name: 'Flygon', level: 53, types: ['ground', 'dragon'], location: 'Deserto', notes: 'Dragon Breath.', keyMoves: ['Dragon Breath'] },
                    { id: 306, name: 'Aggron', level: 52, types: ['steel', 'rock'], location: 'Granite Cave', notes: 'Resiste a Normal/Voador.', keyMoves: ['Iron Tail'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Use Gelo.',
                team: [
                    { id: 257, name: 'Blaziken', level: 56, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Neutro. Sky Uppercut.', keyMoves: ['Sky Uppercut'] },
                    { id: 365, name: 'Walrein', level: 54, types: ['ice', 'water'], location: 'Shoal Cave', notes: 'MVP. Ice Beam.', keyMoves: ['Ice Beam'] },
                    { id: 351, name: 'Castform', level: 50, types: ['normal'], location: 'Weather Institute', notes: 'Hail/Ice Beam.', keyMoves: ['Ice Beam'] },
                    { id: 334, name: 'Altaria', level: 54, types: ['dragon', 'flying'], location: 'Evolução', notes: 'Dragon Breath.', keyMoves: ['Dragon Breath'] },
                    { id: 282, name: 'Gardevoir', level: 52, types: ['psychic', 'fairy'], location: 'Rota 102', notes: 'Moonblast (se disponível).', keyMoves: ['Psychic'] },
                    { id: 130, name: 'Gyarados', level: 52, types: ['water', 'flying'], location: 'Pesca', notes: 'Ice Beam (TM) ou Dragon Dance.', keyMoves: ['Ice Beam'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Swampert usa Ice Beam.',
                team: [
                    { id: 260, name: 'Swampert', level: 56, types: ['water', 'ground'], location: 'Evolução', notes: 'Ice Beam (TM) destrói Drake.', keyMoves: ['Ice Beam'] },
                    { id: 365, name: 'Walrein', level: 54, types: ['ice', 'water'], location: 'Shoal Cave', notes: 'Reserva de gelo.', keyMoves: ['Ice Beam'] },
                    { id: 334, name: 'Altaria', level: 54, types: ['dragon', 'flying'], location: 'Evolução', notes: 'Dragon Breath.', keyMoves: ['Dragon Breath'] },
                    { id: 306, name: 'Aggron', level: 52, types: ['steel', 'rock'], location: 'Granite Cave', notes: 'Resiste a tudo menos Ground/Fighting.', keyMoves: ['Iron Tail'] },
                    { id: 330, name: 'Flygon', level: 53, types: ['ground', 'dragon'], location: 'Deserto', notes: 'Dragon Breath.', keyMoves: ['Dragon Breath'] },
                    { id: 350, name: 'Milotic', level: 54, types: ['water'], location: 'Feebas', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] }
                ]
            }
        ]
      },
      {
        id: 'wallace',
        name: 'Champion Wallace',
        specialty: 'water',
        badge: 'Champion',
        location: 'Ever Grande City',
        description: 'O Mestre da Água e Campeão de Hoenn.',
        acePokemonId: 350,
        team: [
          { id: 321, name: 'Wailord', level: 57, types: ['water'], counters: [{ id: 310, name: 'Manectric', description: 'Thunder' }, { id: 254, name: 'Sceptile', description: 'Leaf Blade' }] },
          { id: 73, name: 'Tentacruel', level: 55, types: ['water', 'poison'], counters: [{ id: 310, name: 'Manectric', description: 'Thunder' }, { id: 260, name: 'Swampert', description: 'Earthquake' }] },
          { id: 272, name: 'Ludicolo', level: 56, types: ['water', 'grass'], counters: [{ id: 276, name: 'Swellow', description: 'Aerial Ace' }, { id: 169, name: 'Crobat', description: 'Sludge Bomb' }] },
          { id: 340, name: 'Whiscash', level: 56, types: ['water', 'ground'], counters: [{ id: 254, name: 'Sceptile', description: 'Leaf Blade (4x)' }, { id: 272, name: 'Ludicolo', description: 'Giga Drain (4x)' }] },
          { id: 130, name: 'Gyarados', level: 56, types: ['water', 'flying'], counters: [{ id: 310, name: 'Manectric', description: 'Thunder (4x)' }, { id: 82, name: 'Magneton', description: 'Thunderbolt (4x)' }] },
          { id: 350, name: 'Milotic', level: 58, types: ['water'], counters: [{ id: 254, name: 'Sceptile', description: 'Leaf Blade' }, { id: 310, name: 'Manectric', description: 'Thunder' }] }
        ],
        recommendedTeams: [
            {
                starterId: 252, starterName: 'Treecko', description: 'Sceptile é o rei aqui.',
                team: [
                    { id: 254, name: 'Sceptile', level: 60, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade destrói a maioria. Cuidado com Ice Beam.', keyMoves: ['Leaf Blade'] },
                    { id: 310, name: 'Manectric', level: 58, types: ['electric'], location: 'Rota 110', notes: 'Thunder/Thunderbolt para Gyarados/Tentacruel/Wailord.', keyMoves: ['Thunder'] },
                    { id: 376, name: 'Metagross', level: 58, types: ['steel', 'psychic'], location: 'Beldum (Gift)', notes: 'Tanque geral. Meteor Mash.', keyMoves: ['Meteor Mash'] },
                    { id: 350, name: 'Milotic', level: 55, types: ['water'], location: 'Feebas', notes: 'Toxic/Recover para stallear Milotic inimigo.', keyMoves: ['Toxic'] },
                    { id: 277, name: 'Swellow', level: 55, types: ['normal', 'flying'], location: 'Evolução', notes: 'Aerial Ace em Ludicolo.', keyMoves: ['Aerial Ace'] },
                    { id: 359, name: 'Absol', level: 55, types: ['dark'], location: 'Rota 120', notes: 'Swords Dance + Slash.', keyMoves: ['Slash'] }
                ]
            },
            {
                starterId: 255, starterName: 'Torchic', description: 'Blaziken precisa de ajuda.',
                team: [
                    { id: 257, name: 'Blaziken', level: 60, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Sky Uppercut em quem não resiste.', keyMoves: ['Sky Uppercut'] },
                    { id: 310, name: 'Manectric', level: 58, types: ['electric'], location: 'Rota 110', notes: 'MVP. Thunder.', keyMoves: ['Thunder'] },
                    { id: 272, name: 'Ludicolo', level: 56, types: ['water', 'grass'], location: 'Rota 102', notes: 'Giga Drain em Whiscash.', keyMoves: ['Giga Drain'] },
                    { id: 373, name: 'Salamence', level: 55, types: ['dragon', 'flying'], location: 'Meteor Falls', notes: 'Dragon Claw/Fly.', keyMoves: ['Dragon Claw'] },
                    { id: 277, name: 'Swellow', level: 55, types: ['normal', 'flying'], location: 'Evolução', notes: 'Aerial Ace em Ludicolo.', keyMoves: ['Aerial Ace'] },
                    { id: 82, name: 'Magneton', level: 55, types: ['electric', 'steel'], location: 'New Mauville', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
                ]
            },
            {
                starterId: 258, starterName: 'Mudkip', description: 'Swampert é sólido.',
                team: [
                    { id: 260, name: 'Swampert', level: 60, types: ['water', 'ground'], location: 'Evolução', notes: 'Earthquake destrói Tentacruel/Magneton. Sludge Bomb para Ludicolo.', keyMoves: ['Earthquake'] },
                    { id: 310, name: 'Manectric', level: 58, types: ['electric'], location: 'Rota 110', notes: 'Thunder.', keyMoves: ['Thunder'] },
                    { id: 272, name: 'Ludicolo', level: 56, types: ['water', 'grass'], location: 'Rota 102', notes: 'Giga Drain.', keyMoves: ['Giga Drain'] },
                    { id: 376, name: 'Metagross', level: 58, types: ['steel', 'psychic'], location: 'Beldum (Gift)', notes: 'Meteor Mash.', keyMoves: ['Meteor Mash'] },
                    { id: 373, name: 'Salamence', level: 55, types: ['dragon', 'flying'], location: 'Meteor Falls', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
                    { id: 306, name: 'Aggron', level: 55, types: ['steel', 'rock'], location: 'Evolução', notes: 'Double-Edge (Rock Head).', keyMoves: ['Double-Edge'] }
                ]
            }
        ]
      }
    ]
  },
  {
    id: 'dp-sinnoh',
    game: 'Diamond / Pearl / Platinum / Brilliant Diamond / Shining Pearl',
    region: 'Sinnoh',
    image: 'https://img.pokemondb.net/boxes/brilliant-diamond.jpg',
    starters: [
      { id: 387, name: 'Turtwig', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 390, name: 'Chimchar', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 393, name: 'Piplup', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'roark',
        name: 'Roark',
        specialty: 'rock',
        badge: 'Coal Badge',
        location: 'Oreburgh City',
        description: 'Líder jovem e determinado.',
        acePokemonId: 408,
        team: [
          { id: 74, name: 'Geodude', level: 12, types: ['rock', 'ground'], counters: [{ id: 387, name: 'Turtwig', description: 'Absorb (4x)' }, { id: 393, name: 'Piplup', description: 'Bubble (4x)' }] },
          { id: 95, name: 'Onix', level: 12, types: ['rock', 'ground'], counters: [{ id: 387, name: 'Turtwig', description: 'Absorb (4x)' }, { id: 393, name: 'Piplup', description: 'Bubble (4x)' }] },
          { id: 408, name: 'Cranidos', level: 14, types: ['rock'], counters: [{ id: 66, name: 'Machop', description: 'Low Kick' }, { id: 393, name: 'Piplup', description: 'Bubble' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Vantagem Absoluta.',
                team: [
                    { id: 387, name: 'Turtwig', level: 14, types: ['grass'], location: 'Inicial', notes: 'Razor Leaf vence sozinho.', keyMoves: ['Razor Leaf'] },
                    { id: 66, name: 'Machop', level: 12, types: ['fighting'], location: 'Rota 207', notes: 'Low Kick.', keyMoves: ['Low Kick'] },
                    { id: 406, name: 'Budew', level: 12, types: ['grass', 'poison'], location: 'Rota 204', notes: 'Absorb.', keyMoves: ['Absorb'] },
                    { id: 74, name: 'Geodude', level: 12, types: ['rock', 'ground'], location: 'Oreburgh Gate', notes: 'Resiste a Normal/Pedra.', keyMoves: ['Rock Throw'] },
                    { id: 399, name: 'Bidoof', level: 12, types: ['normal'], location: 'Rota 201', notes: 'HM Slave / Defesa.', keyMoves: ['Tackle'] },
                    { id: 41, name: 'Zubat', level: 10, types: ['poison', 'flying'], location: 'Ravaged Path', notes: 'Resistência a lutador (Cranidos tem Pursuit).', keyMoves: ['Supersonic'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Evolua para Monferno.',
                team: [
                    { id: 391, name: 'Monferno', level: 14, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Mach Punch destrói o ginásio.', keyMoves: ['Mach Punch'] },
                    { id: 406, name: 'Budew', level: 12, types: ['grass', 'poison'], location: 'Rota 204', notes: 'Absorb/Mega Drain.', keyMoves: ['Absorb'] },
                    { id: 66, name: 'Machop', level: 12, types: ['fighting'], location: 'Rota 207', notes: 'Low Kick.', keyMoves: ['Low Kick'] },
                    { id: 74, name: 'Geodude', level: 12, types: ['rock', 'ground'], location: 'Oreburgh Gate', notes: 'Rock Throw.', keyMoves: ['Rock Throw'] },
                    { id: 396, name: 'Stararly', level: 12, types: ['normal', 'flying'], location: 'Rota 201', notes: 'Growl para baixar ataque.', keyMoves: ['Quick Attack'] },
                    { id: 403, name: 'Shinx', level: 12, types: ['electric'], location: 'Rota 202', notes: 'Intimidate ajuda muito.', keyMoves: ['Spark'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Vantagem Absoluta.',
                team: [
                    { id: 393, name: 'Piplup', level: 14, types: ['water'], location: 'Inicial', notes: 'Bubble vence sozinho.', keyMoves: ['Bubble'] },
                    { id: 66, name: 'Machop', level: 12, types: ['fighting'], location: 'Rota 207', notes: 'Backup.', keyMoves: ['Low Kick'] },
                    { id: 406, name: 'Budew', level: 12, types: ['grass', 'poison'], location: 'Rota 204', notes: 'Absorb.', keyMoves: ['Absorb'] },
                    { id: 74, name: 'Geodude', level: 12, types: ['rock', 'ground'], location: 'Oreburgh Gate', notes: 'Rock Throw.', keyMoves: ['Rock Throw'] },
                    { id: 396, name: 'Stararly', level: 12, types: ['normal', 'flying'], location: 'Rota 201', notes: 'Intimidate se evoluir.', keyMoves: ['Quick Attack'] },
                    { id: 403, name: 'Shinx', level: 12, types: ['electric'], location: 'Rota 202', notes: 'Intimidate.', keyMoves: ['Spark'] }
                ]
            }
        ]
      },
      {
        id: 'gardenia',
        name: 'Gardenia',
        specialty: 'grass',
        badge: 'Forest Badge',
        location: 'Eterna City',
        description: 'Mestra das plantas de Eterna.',
        acePokemonId: 407,
        team: [
          { id: 387, name: 'Turtwig', level: 20, types: ['grass'], counters: [{ id: 396, name: 'Staravia', description: 'Wing Attack' }, { id: 391, name: 'Monferno', description: 'Flame Wheel' }] },
          { id: 421, name: 'Cherrim', level: 20, types: ['grass'], counters: [{ id: 396, name: 'Staravia', description: 'Wing Attack' }, { id: 402, name: 'Kricketune', description: 'Fury Cutter' }] },
          { id: 407, name: 'Roserade', level: 22, types: ['grass', 'poison'], counters: [{ id: 396, name: 'Staravia', description: 'Wing Attack' }, { id: 390, name: 'Chimchar', description: 'Flame Wheel' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Neutro. Use Voador.',
                team: [
                    { id: 396, name: 'Staravia', level: 21, types: ['normal', 'flying'], location: 'Rota 205', notes: 'Wing Attack é essencial.', keyMoves: ['Wing Attack'] },
                    { id: 402, name: 'Kricketune', level: 20, types: ['bug'], location: 'Rota 202', notes: 'Fury Cutter (Bug) é efetivo.', keyMoves: ['Fury Cutter'] },
                    { id: 41, name: 'Zubat', level: 18, types: ['poison', 'flying'], location: 'Ravaged Path', notes: 'Resiste a planta 4x. Wing Attack.', keyMoves: ['Wing Attack'] },
                    { id: 388, name: 'Grotle', level: 20, types: ['grass'], location: 'Evolução', notes: 'Resiste a planta. Curse + Tackle.', keyMoves: ['Tackle'] },
                    { id: 418, name: 'Buizel', level: 18, types: ['water'], location: 'Valley Windworks', notes: 'Evite usar (fraco).', keyMoves: ['Quick Attack'] },
                    { id: 92, name: 'Gastly', level: 18, types: ['ghost', 'poison'], location: 'Old Chateau', notes: 'Imune a normal/luta. Resiste a planta.', keyMoves: ['Lick'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Vantagem Total.',
                team: [
                    { id: 391, name: 'Monferno', level: 22, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Flame Wheel queima tudo.', keyMoves: ['Flame Wheel'] },
                    { id: 396, name: 'Staravia', level: 20, types: ['normal', 'flying'], location: 'Rota 205', notes: 'Wing Attack.', keyMoves: ['Wing Attack'] },
                    { id: 41, name: 'Zubat', level: 18, types: ['poison', 'flying'], location: 'Ravaged Path', notes: 'Resistência chave.', keyMoves: ['Wing Attack'] },
                    { id: 402, name: 'Kricketune', level: 20, types: ['bug'], location: 'Rota 202', notes: 'Fury Cutter.', keyMoves: ['Fury Cutter'] },
                    { id: 404, name: 'Luxio', level: 20, types: ['electric'], location: 'Evolução', notes: 'Bite/Spark.', keyMoves: ['Spark'] },
                    { id: 425, name: 'Drifloon', level: 22, types: ['ghost', 'flying'], location: 'Valley Windworks (Sexta)', notes: 'Gust.', keyMoves: ['Gust'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Desvantagem. Prinplup tem Peck.',
                team: [
                    { id: 394, name: 'Prinplup', level: 22, types: ['water'], location: 'Evolução', notes: 'Use Peck. Cuidado com golpes de planta.', keyMoves: ['Peck'] },
                    { id: 396, name: 'Staravia', level: 22, types: ['normal', 'flying'], location: 'Rota 205', notes: 'MVP. Wing Attack.', keyMoves: ['Wing Attack'] },
                    { id: 402, name: 'Kricketune', level: 20, types: ['bug'], location: 'Rota 202', notes: 'Bug bite.', keyMoves: ['Fury Cutter'] },
                    { id: 41, name: 'Zubat', level: 20, types: ['poison', 'flying'], location: 'Ravaged Path', notes: 'Wing Attack.', keyMoves: ['Wing Attack'] },
                    { id: 77, name: 'Ponyta', level: 20, types: ['fire'], location: 'Rota 207', notes: 'Ember/Flame Wheel.', keyMoves: ['Flame Wheel'] },
                    { id: 425, name: 'Drifloon', level: 22, types: ['ghost', 'flying'], location: 'Valley Windworks', notes: 'Resiste a planta.', keyMoves: ['Gust'] }
                ]
            }
        ]
      },
      {
        id: 'fantina',
        name: 'Fantina',
        specialty: 'ghost',
        badge: 'Relic Badge',
        location: 'Hearthome City',
        description: 'A dançarina fantasma.',
        acePokemonId: 429,
        team: [
          { id: 355, name: 'Duskull', level: 24, types: ['ghost'], counters: [{ id: 418, name: 'Floatzel', description: 'Crunch' }, { id: 92, name: 'Gastly', description: 'Lick' }] },
          { id: 93, name: 'Haunter', level: 24, types: ['ghost', 'poison'], counters: [{ id: 404, name: 'Luxio', description: 'Bite' }, { id: 64, name: 'Kadabra', description: 'Psybeam' }] },
          { id: 429, name: 'Mismagius', level: 26, types: ['ghost'], counters: [{ id: 418, name: 'Floatzel', description: 'Crunch' }, { id: 130, name: 'Gyarados', description: 'Bite' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Neutro. Use Dark.',
                team: [
                    { id: 388, name: 'Grotle', level: 26, types: ['grass'], location: 'Evolução', notes: 'Bite.', keyMoves: ['Bite'] },
                    { id: 404, name: 'Luxio', level: 25, types: ['electric'], location: 'Rota 202', notes: 'Bite é super efetivo.', keyMoves: ['Bite'] },
                    { id: 130, name: 'Gyarados', level: 22, types: ['water', 'flying'], location: 'Pesca (Magikarp)', notes: 'Bite destrói fantasmas.', keyMoves: ['Bite'] },
                    { id: 418, name: 'Floatzel', level: 26, types: ['water'], location: 'Evolução (Buizel)', notes: 'Crunch (Lvl 26) é OHKO.', keyMoves: ['Crunch'] },
                    { id: 396, name: 'Staravia', level: 26, types: ['normal', 'flying'], location: 'Evolução', notes: 'Imune a Ghost.', keyMoves: ['Wing Attack'] },
                    { id: 442, name: 'Spiritomb', level: 25, types: ['ghost', 'dark'], location: 'Odd Keystone', notes: 'Sem fraquezas (Gen 4).', keyMoves: ['Faint Attack'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Neutro.',
                team: [
                    { id: 391, name: 'Monferno', level: 26, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Flame Wheel.', keyMoves: ['Flame Wheel'] },
                    { id: 404, name: 'Luxio', level: 25, types: ['electric'], location: 'Rota 202', notes: 'Bite.', keyMoves: ['Bite'] },
                    { id: 418, name: 'Floatzel', level: 26, types: ['water'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 130, name: 'Gyarados', level: 24, types: ['water', 'flying'], location: 'Pesca', notes: 'Bite.', keyMoves: ['Bite'] },
                    { id: 396, name: 'Staravia', level: 25, types: ['normal', 'flying'], location: 'Evolução', notes: 'Imune a Ghost.', keyMoves: ['Aerial Ace'] },
                    { id: 434, name: 'Stunky', level: 24, types: ['poison', 'dark'], location: 'Rota 206', notes: 'Bite/Night Slash.', keyMoves: ['Bite'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Neutro.',
                team: [
                    { id: 394, name: 'Prinplup', level: 26, types: ['water'], location: 'Evolução', notes: 'Bubblebeam.', keyMoves: ['Bubblebeam'] },
                    { id: 404, name: 'Luxio', level: 25, types: ['electric'], location: 'Rota 202', notes: 'Bite.', keyMoves: ['Bite'] },
                    { id: 92, name: 'Gastly', level: 20, types: ['ghost', 'poison'], location: 'Old Chateau', notes: 'Ghost vs Ghost.', keyMoves: ['Lick', 'Night Shade'] },
                    { id: 418, name: 'Floatzel', level: 26, types: ['water'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
                    { id: 130, name: 'Gyarados', level: 24, types: ['water', 'flying'], location: 'Pesca', notes: 'Bite.', keyMoves: ['Bite'] },
                    { id: 425, name: 'Drifloon', level: 24, types: ['ghost', 'flying'], location: 'Valley Windworks', notes: 'Payback.', keyMoves: ['Payback'] }
                ]
            }
        ]
      },
      {
        id: 'maylene',
        name: 'Maylene',
        specialty: 'fighting',
        badge: 'Cobble Badge',
        location: 'Veilstone City',
        description: 'Lutadora descalça.',
        acePokemonId: 448,
        team: [
          { id: 307, name: 'Meditite', level: 28, types: ['fighting', 'psychic'], counters: [{ id: 396, name: 'Staravia', description: 'Aerial Ace' }, { id: 425, name: 'Drifloon', description: 'Ghost/Flying' }] },
          { id: 67, name: 'Machoke', level: 29, types: ['fighting'], counters: [{ id: 396, name: 'Staravia', description: 'Aerial Ace' }, { id: 64, name: 'Kadabra', description: 'Psychic' }] },
          { id: 448, name: 'Lucario', level: 32, types: ['fighting', 'steel'], counters: [{ id: 391, name: 'Monferno', description: 'Flame Wheel' }, { id: 397, name: 'Staravia', description: 'Close Combat (neutro)' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Desvantagem contra Lucario (Metal).',
                team: [
                    { id: 388, name: 'Grotle', level: 30, types: ['grass'], location: 'Evolução', notes: 'Resiste a terra, mas cuidado com Lucario.', keyMoves: ['Razor Leaf'] },
                    { id: 397, name: 'Staravia', level: 30, types: ['normal', 'flying'], location: 'Evolução', notes: 'Intimidate + Aerial Ace/Wing Attack.', keyMoves: ['Aerial Ace'] },
                    { id: 94, name: 'Gengar', level: 30, types: ['ghost', 'poison'], location: 'Troca', notes: 'Imune a lutador.', keyMoves: ['Shadow Ball'] },
                    { id: 425, name: 'Drifblim', level: 28, types: ['ghost', 'flying'], location: 'Evolução', notes: 'Imune a lutador.', keyMoves: ['Gust'] },
                    { id: 130, name: 'Gyarados', level: 28, types: ['water', 'flying'], location: 'Pesca', notes: 'Intimidate.', keyMoves: ['Dragon Rage'] },
                    { id: 64, name: 'Kadabra', level: 28, types: ['psychic'], location: 'Troca', notes: 'Psychic em Machoke.', keyMoves: ['Psychic'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Monferno destrói Lucario.',
                team: [
                    { id: 391, name: 'Monferno', level: 32, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Flame Wheel é super efetivo em Lucario.', keyMoves: ['Flame Wheel'] },
                    { id: 397, name: 'Staravia', level: 30, types: ['normal', 'flying'], location: 'Evolução', notes: 'Voador para os outros.', keyMoves: ['Aerial Ace'] },
                    { id: 64, name: 'Kadabra', level: 30, types: ['psychic'], location: 'Troca', notes: 'Psychic em Machoke.', keyMoves: ['Psychic'] },
                    { id: 94, name: 'Gengar', level: 30, types: ['ghost', 'poison'], location: 'Troca', notes: 'Imune a lutador.', keyMoves: ['Shadow Ball'] },
                    { id: 130, name: 'Gyarados', level: 28, types: ['water', 'flying'], location: 'Pesca', notes: 'Intimidate.', keyMoves: ['Dragon Rage'] },
                    { id: 41, name: 'Zubat', level: 28, types: ['poison', 'flying'], location: 'Ravaged Path', notes: 'Resiste 4x a lutador.', keyMoves: ['Wing Attack'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Neutro.',
                team: [
                    { id: 394, name: 'Prinplup', level: 32, types: ['water'], location: 'Evolução', notes: 'Bubblebeam.', keyMoves: ['Bubblebeam'] },
                    { id: 397, name: 'Staravia', level: 30, types: ['normal', 'flying'], location: 'Evolução', notes: 'Essencial.', keyMoves: ['Aerial Ace'] },
                    { id: 407, name: 'Roserade', level: 30, types: ['grass', 'poison'], location: 'Evolução', notes: 'Resiste a lutador.', keyMoves: ['Giga Drain'] },
                    { id: 92, name: 'Haunter', level: 28, types: ['ghost', 'poison'], location: 'Old Chateau', notes: 'Imune a lutador.', keyMoves: ['Shadow Ball'] },
                    { id: 425, name: 'Drifblim', level: 28, types: ['ghost', 'flying'], location: 'Evolução', notes: 'Imune a lutador.', keyMoves: ['Gust'] },
                    { id: 130, name: 'Gyarados', level: 28, types: ['water', 'flying'], location: 'Pesca', notes: 'Intimidate.', keyMoves: ['Dragon Rage'] }
                ]
            }
        ]
      },

      {
        id: 'wake',
        name: 'Crasher Wake',
        specialty: 'water',
        badge: 'Fen Badge',
        location: 'Pastoria City',
        description: 'O lutador da água.',
        acePokemonId: 418,
        team: [
          { id: 130, name: 'Gyarados', level: 33, types: ['water', 'flying'], counters: [{ id: 405, name: 'Luxray', description: 'Spark (4x)' }, { id: 462, name: 'Magnezone', description: 'Thunderbolt' }] },
          { id: 195, name: 'Quagsire', level: 34, types: ['water', 'ground'], counters: [{ id: 389, name: 'Torterra', description: 'Razor Leaf (4x)' }, { id: 407, name: 'Roserade', description: 'Giga Drain (4x)' }] },
          { id: 418, name: 'Floatzel', level: 37, types: ['water'], counters: [{ id: 405, name: 'Luxray', description: 'Spark' }, { id: 407, name: 'Roserade', description: 'Giga Drain' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Torterra destrói Quagsire.',
                team: [
                    { id: 389, name: 'Torterra', level: 36, types: ['grass', 'ground'], location: 'Evolução', notes: 'Razor Leaf mata Quagsire (4x).', keyMoves: ['Razor Leaf'] },
                    { id: 405, name: 'Luxray', level: 35, types: ['electric'], location: 'Evolução', notes: 'Spark em Gyarados (4x) e Floatzel.', keyMoves: ['Spark'] },
                    { id: 407, name: 'Roserade', level: 35, types: ['grass', 'poison'], location: 'Evolução', notes: 'Magical Leaf/Giga Drain.', keyMoves: ['Giga Drain'] },
                    { id: 396, name: 'Staravia', level: 34, types: ['normal', 'flying'], location: 'Evolução', notes: 'Intimidate ajuda na defesa.', keyMoves: ['Wing Attack'] },
                    { id: 418, name: 'Floatzel', level: 34, types: ['water'], location: 'Evolução', notes: 'Resiste a água.', keyMoves: ['Crunch'] },
                    { id: 94, name: 'Gengar', level: 34, types: ['ghost', 'poison'], location: 'Troca', notes: 'Thunderbolt (TM).', keyMoves: ['Thunderbolt'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Desvantagem. Use Elétrico/Planta.',
                team: [
                    { id: 392, name: 'Infernape', level: 36, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Grass Knot (TM) mata Quagsire.', keyMoves: ['Grass Knot'] },
                    { id: 405, name: 'Luxray', level: 35, types: ['electric'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Spark'] },
                    { id: 407, name: 'Roserade', level: 35, types: ['grass', 'poison'], location: 'Evolução', notes: 'Giga Drain.', keyMoves: ['Giga Drain'] },
                    { id: 130, name: 'Gyarados', level: 34, types: ['water', 'flying'], location: 'Pesca', notes: 'Intimidate + Resistência.', keyMoves: ['Bite'] },
                    { id: 418, name: 'Floatzel', level: 34, types: ['water'], location: 'Evolução', notes: 'Swift Swim.', keyMoves: ['Crunch'] },
                    { id: 396, name: 'Staravia', level: 34, types: ['normal', 'flying'], location: 'Evolução', notes: 'Neutro.', keyMoves: ['Wing Attack'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Neutro. Empoleon resiste a água.',
                team: [
                    { id: 395, name: 'Empoleon', level: 36, types: ['water', 'steel'], location: 'Evolução', notes: 'Grass Knot (TM) para Quagsire.', keyMoves: ['Grass Knot'] },
                    { id: 405, name: 'Luxray', level: 35, types: ['electric'], location: 'Evolução', notes: 'Destrói Gyarados.', keyMoves: ['Spark'] },
                    { id: 465, name: 'Tangrowth', level: 35, types: ['grass'], location: 'Great Marsh', notes: 'Tanque de planta.', keyMoves: ['Vine Whip'] },
                    { id: 407, name: 'Roserade', level: 35, types: ['grass', 'poison'], location: 'Evolução', notes: 'Giga Drain.', keyMoves: ['Giga Drain'] },
                    { id: 453, name: 'Croagunk', level: 34, types: ['poison', 'fighting'], location: 'Great Marsh', notes: 'Dry Skin absorve água.', keyMoves: ['Revenge'] },
                    { id: 396, name: 'Staravia', level: 34, types: ['normal', 'flying'], location: 'Evolução', notes: 'Intimidate.', keyMoves: ['Wing Attack'] }
                ]
            }
        ]
      },
      {
        id: 'byron',
        name: 'Byron',
        specialty: 'steel',
        badge: 'Mine Badge',
        location: 'Canalave City',
        description: 'O homem com corpo de aço.',
        acePokemonId: 411,
        team: [
          { id: 82, name: 'Magneton', level: 37, types: ['electric', 'steel'], counters: [{ id: 389, name: 'Torterra', description: 'Earthquake (4x)' }, { id: 392, name: 'Infernape', description: 'Close Combat' }] },
          { id: 208, name: 'Steelix', level: 38, types: ['steel', 'ground'], counters: [{ id: 395, name: 'Empoleon', description: 'Surf' }, { id: 392, name: 'Infernape', description: 'Flamethrower' }] },
          { id: 411, name: 'Bastiodon', level: 41, types: ['rock', 'steel'], counters: [{ id: 392, name: 'Infernape', description: 'Close Combat' }, { id: 389, name: 'Torterra', description: 'Earthquake' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Torterra Earthquake destrói tudo.',
                team: [
                    { id: 389, name: 'Torterra', level: 40, types: ['grass', 'ground'], location: 'Evolução', notes: 'Earthquake é super efetivo em todos.', keyMoves: ['Earthquake'] },
                    { id: 392, name: 'Infernape', level: 40, types: ['fire', 'fighting'], location: 'Troca/Evolução', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 423, name: 'Gastrodon', level: 38, types: ['water', 'ground'], location: 'Rota 218', notes: 'Earthquake/Mud Bomb.', keyMoves: ['Earthquake'] },
                    { id: 398, name: 'Staraptor', level: 38, types: ['normal', 'flying'], location: 'Evolução', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 448, name: 'Lucario', level: 38, types: ['fighting', 'steel'], location: 'Iron Island', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
                    { id: 405, name: 'Luxray', level: 38, types: ['electric'], location: 'Evolução', notes: 'Neutro.', keyMoves: ['Thunder Fang'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Vantagem Absoluta.',
                team: [
                    { id: 392, name: 'Infernape', level: 40, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Close Combat/Flamethrower. Vitória fácil.', keyMoves: ['Close Combat'] },
                    { id: 445, name: 'Garchomp', level: 48, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Se já tiver (Gible), Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 448, name: 'Lucario', level: 35, types: ['fighting', 'steel'], location: 'Iron Island (Egg)', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
                    { id: 423, name: 'Gastrodon', level: 38, types: ['water', 'ground'], location: 'Rota 218', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 398, name: 'Staraptor', level: 38, types: ['normal', 'flying'], location: 'Evolução', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 407, name: 'Roserade', level: 38, types: ['grass', 'poison'], location: 'Evolução', notes: 'Stun Spore.', keyMoves: ['Stun Spore'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Empoleon resiste a metal.',
                team: [
                    { id: 395, name: 'Empoleon', level: 40, types: ['water', 'steel'], location: 'Evolução', notes: 'Surf mata Steelix/Bastiodon.', keyMoves: ['Surf'] },
                    { id: 448, name: 'Lucario', level: 35, types: ['fighting', 'steel'], location: 'Iron Island', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
                    { id: 450, name: 'Hippowdon', level: 40, types: ['ground'], location: 'Rota 214', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 392, name: 'Infernape', level: 40, types: ['fire', 'fighting'], location: 'Troca', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 398, name: 'Staraptor', level: 38, types: ['normal', 'flying'], location: 'Evolução', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 453, name: 'Toxicroak', level: 38, types: ['poison', 'fighting'], location: 'Great Marsh', notes: 'Brick Break.', keyMoves: ['Brick Break'] }
                ]
            }
        ]
      },
      {
        id: 'candice',
        name: 'Candice',
        specialty: 'ice',
        badge: 'Icicle Badge',
        location: 'Snowpoint City',
        description: 'A garota pó de diamante.',
        acePokemonId: 478,
        team: [
          { id: 215, name: 'Sneasel', level: 40, types: ['dark', 'ice'], counters: [{ id: 448, name: 'Lucario', description: 'Aura Sphere (4x)' }, { id: 392, name: 'Infernape', description: 'Close Combat (4x)' }] },
          { id: 221, name: 'Piloswine', level: 40, types: ['ice', 'ground'], counters: [{ id: 395, name: 'Empoleon', description: 'Surf' }, { id: 389, name: 'Torterra', description: 'Wood Hammer' }] },
          { id: 460, name: 'Abomasnow', level: 42, types: ['grass', 'ice'], counters: [{ id: 392, name: 'Infernape', description: 'Flamethrower (4x)' }, { id: 398, name: 'Staraptor', description: 'Brave Bird' }] },
          { id: 478, name: 'Froslass', level: 44, types: ['ice', 'ghost'], counters: [{ id: 392, name: 'Infernape', description: 'Flamethrower' }, { id: 395, name: 'Empoleon', description: 'Flash Cannon' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Desvantagem Extrema (4x).',
                team: [
                    { id: 389, name: 'Torterra', level: 44, types: ['grass', 'ground'], location: 'Evolução', notes: 'EVITE. Gelo é 4x efetivo.', keyMoves: ['Rock Slide'] },
                    { id: 392, name: 'Infernape', level: 44, types: ['fire', 'fighting'], location: 'Troca/Evolução', notes: 'Flamethrower/Close Combat destrói o ginásio.', keyMoves: ['Flamethrower'] },
                    { id: 448, name: 'Lucario', level: 42, types: ['fighting', 'steel'], location: 'Iron Island', notes: 'Aura Sphere/Flash Cannon.', keyMoves: ['Aura Sphere'] },
                    { id: 78, name: 'Rapidash', level: 42, types: ['fire'], location: 'Rota 216', notes: 'Fogo.', keyMoves: ['Flamethrower'] },
                    { id: 398, name: 'Staraptor', level: 42, types: ['normal', 'flying'], location: 'Evolução', notes: 'Close Combat em Abomasnow.', keyMoves: ['Close Combat'] },
                    { id: 437, name: 'Bronzong', level: 42, types: ['steel', 'psychic'], location: 'Mt. Coronet', notes: 'Resiste a Gelo (Levitate).', keyMoves: ['Flash Cannon'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Vantagem Total.',
                team: [
                    { id: 392, name: 'Infernape', level: 44, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Varre o ginásio inteiro.', keyMoves: ['Flamethrower', 'Close Combat'] },
                    { id: 398, name: 'Staraptor', level: 42, types: ['normal', 'flying'], location: 'Evolução', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 405, name: 'Luxray', level: 42, types: ['electric'], location: 'Evolução', notes: 'Fire Fang (Move Relearner).', keyMoves: ['Fire Fang'] },
                    { id: 448, name: 'Lucario', level: 42, types: ['fighting', 'steel'], location: 'Iron Island', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
                    { id: 419, name: 'Floatzel', level: 42, types: ['water'], location: 'Evolução', notes: 'Resiste a Gelo.', keyMoves: ['Waterfall'] },
                    { id: 437, name: 'Bronzong', level: 42, types: ['steel', 'psychic'], location: 'Mt. Coronet', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Empoleon resiste a Gelo.',
                team: [
                    { id: 395, name: 'Empoleon', level: 44, types: ['water', 'steel'], location: 'Evolução', notes: 'Flash Cannon mata gelo. Resiste 4x a gelo.', keyMoves: ['Flash Cannon'] },
                    { id: 448, name: 'Lucario', level: 42, types: ['fighting', 'steel'], location: 'Iron Island', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
                    { id: 78, name: 'Rapidash', level: 42, types: ['fire'], location: 'Rota 216', notes: 'Fogo.', keyMoves: ['Flamethrower'] },
                    { id: 398, name: 'Staraptor', level: 42, types: ['normal', 'flying'], location: 'Evolução', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 437, name: 'Bronzong', level: 42, types: ['steel', 'psychic'], location: 'Mt. Coronet', notes: 'Giro Ball.', keyMoves: ['Giro Ball'] },
                    { id: 229, name: 'Houndoom', level: 42, types: ['dark', 'fire'], location: 'Rota 214', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] }
                ]
            }
        ]
      },
      {
        id: 'volkner',
        name: 'Volkner',
        specialty: 'electric',
        badge: 'Beacon Badge',
        location: 'Sunyshore City',
        description: 'O Líder eletrizante.',
        acePokemonId: 466,
        team: [
          { id: 135, name: 'Jolteon', level: 46, types: ['electric'], counters: [{ id: 450, name: 'Hippowdon', description: 'Earthquake' }, { id: 445, name: 'Garchomp', description: 'Earthquake' }] },
          { id: 26, name: 'Raichu', level: 46, types: ['electric'], counters: [{ id: 389, name: 'Torterra', description: 'Earthquake' }, { id: 464, name: 'Rhyperior', description: 'Earthquake' }] },
          { id: 405, name: 'Luxray', level: 48, types: ['electric'], counters: [{ id: 450, name: 'Hippowdon', description: 'Earthquake' }, { id: 472, name: 'Gliscor', description: 'Earthquake' }] },
          { id: 466, name: 'Electivire', level: 50, types: ['electric'], counters: [{ id: 450, name: 'Hippowdon', description: 'Earthquake' }, { id: 389, name: 'Torterra', description: 'Earthquake' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Torterra é imune a elétrico.',
                team: [
                    { id: 389, name: 'Torterra', level: 50, types: ['grass', 'ground'], location: 'Evolução', notes: 'Imune a elétrico. Earthquake vence tudo.', keyMoves: ['Earthquake'] },
                    { id: 450, name: 'Hippowdon', level: 48, types: ['ground'], location: 'Rota 214', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 445, name: 'Garchomp', level: 48, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 423, name: 'Gastrodon', level: 48, types: ['water', 'ground'], location: 'Rota 218', notes: 'Imune a elétrico.', keyMoves: ['Earthquake'] },
                    { id: 464, name: 'Rhyperior', level: 48, types: ['ground', 'rock'], location: 'Evolução', notes: 'Lightning Rod.', keyMoves: ['Earthquake'] },
                    { id: 472, name: 'Gliscor', level: 48, types: ['ground', 'flying'], location: 'Evolução', notes: 'Imune.', keyMoves: ['Earthquake'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Neutro. Use Ground.',
                team: [
                    { id: 392, name: 'Infernape', level: 50, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Earthquake (TM) ou Close Combat.', keyMoves: ['Close Combat'] },
                    { id: 445, name: 'Garchomp', level: 48, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'MVP.', keyMoves: ['Earthquake'] },
                    { id: 464, name: 'Rhyperior', level: 48, types: ['ground', 'rock'], location: 'Evolução', notes: 'Tanque imune.', keyMoves: ['Earthquake'] },
                    { id: 450, name: 'Hippowdon', level: 48, types: ['ground'], location: 'Rota 214', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 472, name: 'Gliscor', level: 48, types: ['ground', 'flying'], location: 'Evolução', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 407, name: 'Roserade', level: 48, types: ['grass', 'poison'], location: 'Evolução', notes: 'Resiste a elétrico.', keyMoves: ['Sludge Bomb'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Desvantagem. Empoleon toma dano elétrico.',
                team: [
                    { id: 395, name: 'Empoleon', level: 50, types: ['water', 'steel'], location: 'Evolução', notes: 'Evite. Use seus tipo terra.', keyMoves: ['Surf'] },
                    { id: 445, name: 'Garchomp', level: 48, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Salva o dia.', keyMoves: ['Earthquake'] },
                    { id: 472, name: 'Gliscor', level: 48, types: ['ground', 'flying'], location: 'Evolução', notes: 'Imune.', keyMoves: ['Earthquake'] },
                    { id: 450, name: 'Hippowdon', level: 48, types: ['ground'], location: 'Rota 214', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 464, name: 'Rhyperior', level: 48, types: ['ground', 'rock'], location: 'Evolução', notes: 'Imune.', keyMoves: ['Earthquake'] },
                    { id: 423, name: 'Gastrodon', level: 48, types: ['water', 'ground'], location: 'Rota 218', notes: 'Imune.', keyMoves: ['Earthquake'] }
                ]
            }
        ]
      },
      {
        id: 'aaron',
        name: 'Aaron',
        specialty: 'bug',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Inseto.',
        acePokemonId: 452,
        team: [
          { id: 469, name: 'Yanmega', level: 49, types: ['bug', 'flying'], counters: [{ id: 464, name: 'Rhyperior', description: 'Rock Wrecker (4x)' }, { id: 405, name: 'Luxray', description: 'Thunderbolt' }] },
          { id: 212, name: 'Scizor', level: 49, types: ['bug', 'steel'], counters: [{ id: 392, name: 'Infernape', description: 'Flamethrower (4x)' }, { id: 78, name: 'Rapidash', description: 'Flamethrower (4x)' }] },
          { id: 416, name: 'Vespiquen', level: 50, types: ['bug', 'flying'], counters: [{ id: 464, name: 'Rhyperior', description: 'Rock Wrecker (4x)' }, { id: 462, name: 'Magnezone', description: 'Thunderbolt' }] },
          { id: 214, name: 'Heracross', level: 51, types: ['bug', 'fighting'], counters: [{ id: 398, name: 'Staraptor', description: 'Brave Bird (4x)' }, { id: 425, name: 'Drifblim', description: 'Flying' }] },
          { id: 452, name: 'Drapion', level: 53, types: ['poison', 'dark'], counters: [{ id: 450, name: 'Hippowdon', description: 'Earthquake' }, { id: 445, name: 'Garchomp', description: 'Earthquake' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Neutro.',
                team: [
                    { id: 398, name: 'Staraptor', level: 52, types: ['normal', 'flying'], location: 'Evolução', notes: 'Brave Bird destrói insetos.', keyMoves: ['Brave Bird'] },
                    { id: 392, name: 'Infernape', level: 52, types: ['fire', 'fighting'], location: 'Troca', notes: 'Fogo em Scizor/Vespiquen.', keyMoves: ['Flamethrower'] },
                    { id: 464, name: 'Rhyperior', level: 52, types: ['ground', 'rock'], location: 'Evolução', notes: 'Rock Wrecker.', keyMoves: ['Rock Wrecker'] },
                    { id: 462, name: 'Magnezone', level: 52, types: ['electric', 'steel'], location: 'Mt. Coronet', notes: 'Resiste a inseto.', keyMoves: ['Thunderbolt'] },
                    { id: 445, name: 'Garchomp', level: 52, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Earthquake em Drapion.', keyMoves: ['Earthquake'] },
                    { id: 425, name: 'Drifblim', level: 50, types: ['ghost', 'flying'], location: 'Evolução', notes: 'Imune a lutador (Heracross).', keyMoves: ['Fly'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Vantagem.',
                team: [
                    { id: 392, name: 'Infernape', level: 54, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Flamethrower queima tudo.', keyMoves: ['Flamethrower'] },
                    { id: 398, name: 'Staraptor', level: 52, types: ['normal', 'flying'], location: 'Evolução', notes: 'Brave Bird.', keyMoves: ['Brave Bird'] },
                    { id: 445, name: 'Garchomp', level: 52, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Earthquake em Drapion.', keyMoves: ['Earthquake'] },
                    { id: 464, name: 'Rhyperior', level: 52, types: ['ground', 'rock'], location: 'Evolução', notes: 'Rock Wrecker.', keyMoves: ['Rock Wrecker'] },
                    { id: 468, name: 'Togekiss', level: 52, types: ['fairy', 'flying'], location: 'Evolução', notes: 'Air Slash.', keyMoves: ['Air Slash'] },
                    { id: 472, name: 'Gliscor', level: 52, types: ['ground', 'flying'], location: 'Evolução', notes: 'Aerial Ace.', keyMoves: ['Aerial Ace'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Neutro.',
                team: [
                    { id: 395, name: 'Empoleon', level: 54, types: ['water', 'steel'], location: 'Evolução', notes: 'Drill Peck ajuda.', keyMoves: ['Drill Peck'] },
                    { id: 398, name: 'Staraptor', level: 52, types: ['normal', 'flying'], location: 'Evolução', notes: 'Essencial.', keyMoves: ['Brave Bird'] },
                    { id: 78, name: 'Rapidash', level: 52, types: ['fire'], location: 'Rota 216', notes: 'Para Scizor.', keyMoves: ['Flamethrower'] },
                    { id: 445, name: 'Garchomp', level: 52, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 462, name: 'Magnezone', level: 52, types: ['electric', 'steel'], location: 'Mt. Coronet', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
                    { id: 472, name: 'Gliscor', level: 52, types: ['ground', 'flying'], location: 'Evolução', notes: 'Aerial Ace.', keyMoves: ['Aerial Ace'] }
                ]
            }
        ]
      },
      {
        id: 'bertha',
        name: 'Bertha',
        specialty: 'ground',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Terra.',
        acePokemonId: 464,
        team: [
          { id: 340, name: 'Whiscash', level: 50, types: ['water', 'ground'], counters: [{ id: 407, name: 'Roserade', description: 'Giga Drain (4x)' }, { id: 389, name: 'Torterra', description: 'Wood Hammer (4x)' }] },
          { id: 472, name: 'Gliscor', level: 53, types: ['ground', 'flying'], counters: [{ id: 461, name: 'Weavile', description: 'Ice Punch (4x)' }, { id: 473, name: 'Mamoswine', description: 'Ice Shard (4x)' }] },
          { id: 450, name: 'Hippowdon', level: 52, types: ['ground'], counters: [{ id: 395, name: 'Empoleon', description: 'Surf' }, { id: 407, name: 'Roserade', description: 'Giga Drain' }] },
          { id: 76, name: 'Golem', level: 52, types: ['rock', 'ground'], counters: [{ id: 395, name: 'Empoleon', description: 'Surf (4x)' }, { id: 389, name: 'Torterra', description: 'Wood Hammer (4x)' }] },
          { id: 464, name: 'Rhyperior', level: 55, types: ['ground', 'rock'], counters: [{ id: 389, name: 'Torterra', description: 'Wood Hammer' }, { id: 395, name: 'Empoleon', description: 'Surf' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Vantagem Absoluta.',
                team: [
                    { id: 389, name: 'Torterra', level: 55, types: ['grass', 'ground'], location: 'Evolução', notes: 'Wood Hammer/Razor Leaf destrói todos.', keyMoves: ['Wood Hammer'] },
                    { id: 473, name: 'Mamoswine', level: 53, types: ['ice', 'ground'], location: 'Evolução', notes: 'Ice Shard em Gliscor (4x).', keyMoves: ['Ice Shard'] },
                    { id: 395, name: 'Empoleon', level: 52, types: ['water', 'steel'], location: 'Troca', notes: 'Surf.', keyMoves: ['Surf'] },
                    { id: 461, name: 'Weavile', level: 52, types: ['dark', 'ice'], location: 'Evolução', notes: 'Ice Punch.', keyMoves: ['Ice Punch'] },
                    { id: 407, name: 'Roserade', level: 52, types: ['grass', 'poison'], location: 'Evolução', notes: 'Giga Drain.', keyMoves: ['Giga Drain'] },
                    { id: 130, name: 'Gyarados', level: 52, types: ['water', 'flying'], location: 'Pesca', notes: 'Imune a terra + Waterfall.', keyMoves: ['Waterfall'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Desvantagem.',
                team: [
                    { id: 407, name: 'Roserade', level: 53, types: ['grass', 'poison'], location: 'Evolução', notes: 'Energy Ball/Giga Drain essencial.', keyMoves: ['Energy Ball'] },
                    { id: 419, name: 'Floatzel', level: 52, types: ['water'], location: 'Evolução', notes: 'Waterfall.', keyMoves: ['Waterfall'] },
                    { id: 461, name: 'Weavile', level: 52, types: ['dark', 'ice'], location: 'Evolução', notes: 'Ice Punch em Gliscor.', keyMoves: ['Ice Punch'] },
                    { id: 473, name: 'Mamoswine', level: 52, types: ['ice', 'ground'], location: 'Evolução', notes: 'Ice Shard.', keyMoves: ['Ice Shard'] },
                    { id: 395, name: 'Empoleon', level: 52, types: ['water', 'steel'], location: 'Troca', notes: 'Surf.', keyMoves: ['Surf'] },
                    { id: 465, name: 'Tangrowth', level: 52, types: ['grass'], location: 'Great Marsh', notes: 'Power Whip.', keyMoves: ['Power Whip'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Vantagem.',
                team: [
                    { id: 395, name: 'Empoleon', level: 55, types: ['water', 'steel'], location: 'Evolução', notes: 'Surf varre o time (cuidado com Whiscash).', keyMoves: ['Surf'] },
                    { id: 407, name: 'Roserade', level: 53, types: ['grass', 'poison'], location: 'Evolução', notes: 'Mata Whiscash (4x).', keyMoves: ['Giga Drain'] },
                    { id: 461, name: 'Weavile', level: 52, types: ['dark', 'ice'], location: 'Evolução', notes: 'Ice Punch em Gliscor.', keyMoves: ['Ice Punch'] },
                    { id: 473, name: 'Mamoswine', level: 52, types: ['ice', 'ground'], location: 'Evolução', notes: 'Ice Shard.', keyMoves: ['Ice Shard'] },
                    { id: 130, name: 'Gyarados', level: 52, types: ['water', 'flying'], location: 'Pesca', notes: 'Waterfall.', keyMoves: ['Waterfall'] },
                    { id: 460, name: 'Abomasnow', level: 52, types: ['grass', 'ice'], location: 'Mt. Coronet', notes: 'Wood Hammer/Blizzard.', keyMoves: ['Wood Hammer'] }
                ]
            }
        ]
      },
      {
        id: 'flint',
        name: 'Flint',
        specialty: 'fire',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Fogo.',
        acePokemonId: 467,
        team: [
          { id: 229, name: 'Houndoom', level: 52, types: ['dark', 'fire'], counters: [{ id: 445, name: 'Garchomp', description: 'Earthquake' }, { id: 392, name: 'Infernape', description: 'Close Combat' }] },
          { id: 136, name: 'Flareon', level: 55, types: ['fire'], counters: [{ id: 464, name: 'Rhyperior', description: 'Earthquake' }, { id: 395, name: 'Empoleon', description: 'Surf' }] },
          { id: 78, name: 'Rapidash', level: 53, types: ['fire'], counters: [{ id: 445, name: 'Garchomp', description: 'Earthquake' }, { id: 450, name: 'Hippowdon', description: 'Earthquake' }] },
          { id: 392, name: 'Infernape', level: 55, types: ['fire', 'fighting'], counters: [{ id: 398, name: 'Staraptor', description: 'Brave Bird' }, { id: 445, name: 'Garchomp', description: 'Earthquake' }] },
          { id: 467, name: 'Magmortar', level: 57, types: ['fire'], counters: [{ id: 445, name: 'Garchomp', description: 'Earthquake' }, { id: 395, name: 'Empoleon', description: 'Surf' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Desvantagem.',
                team: [
                    { id: 445, name: 'Garchomp', level: 55, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'MVP. Earthquake mata todos.', keyMoves: ['Earthquake'] },
                    { id: 418, name: 'Floatzel', level: 54, types: ['water'], location: 'Evolução', notes: 'Waterfall rápido.', keyMoves: ['Waterfall'] },
                    { id: 464, name: 'Rhyperior', level: 54, types: ['ground', 'rock'], location: 'Evolução', notes: 'Rock Wrecker/Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 130, name: 'Gyarados', level: 54, types: ['water', 'flying'], location: 'Pesca', notes: 'Waterfall.', keyMoves: ['Waterfall'] },
                    { id: 450, name: 'Hippowdon', level: 54, types: ['ground'], location: 'Rota 214', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 398, name: 'Staraptor', level: 54, types: ['normal', 'flying'], location: 'Evolução', notes: 'Brave Bird em Infernape.', keyMoves: ['Brave Bird'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Neutro.',
                team: [
                    { id: 445, name: 'Garchomp', level: 55, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'MVP. Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 395, name: 'Empoleon', level: 54, types: ['water', 'steel'], location: 'Troca', notes: 'Surf.', keyMoves: ['Surf'] },
                    { id: 450, name: 'Hippowdon', level: 54, types: ['ground'], location: 'Rota 214', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 464, name: 'Rhyperior', level: 54, types: ['ground', 'rock'], location: 'Evolução', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 419, name: 'Floatzel', level: 54, types: ['water'], location: 'Evolução', notes: 'Waterfall.', keyMoves: ['Waterfall'] },
                    { id: 392, name: 'Infernape', level: 55, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Close Combat em Houndoom.', keyMoves: ['Close Combat'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Vantagem.',
                team: [
                    { id: 395, name: 'Empoleon', level: 56, types: ['water', 'steel'], location: 'Evolução', notes: 'Surf/Hydro Pump.', keyMoves: ['Surf'] },
                    { id: 445, name: 'Garchomp', level: 55, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 472, name: 'Gliscor', level: 54, types: ['ground', 'flying'], location: 'Evolução', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
                    { id: 464, name: 'Rhyperior', level: 54, types: ['ground', 'rock'], location: 'Evolução', notes: 'Rock Wrecker.', keyMoves: ['Rock Wrecker'] },
                    { id: 130, name: 'Gyarados', level: 54, types: ['water', 'flying'], location: 'Pesca', notes: 'Waterfall.', keyMoves: ['Waterfall'] },
                    { id: 423, name: 'Gastrodon', level: 54, types: ['water', 'ground'], location: 'Rota 218', notes: 'Earthquake.', keyMoves: ['Earthquake'] }
                ]
            }
        ]
      },
      {
        id: 'lucian',
        name: 'Lucian',
        specialty: 'psychic',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Psíquico.',
        acePokemonId: 475,
        team: [
          { id: 122, name: 'Mr. Mime', level: 53, types: ['psychic', 'fairy'], counters: [{ id: 461, name: 'Weavile', description: 'Night Slash' }, { id: 442, name: 'Spiritomb', description: 'Shadow Ball' }] },
          { id: 196, name: 'Espeon', level: 55, types: ['psychic'], counters: [{ id: 461, name: 'Weavile', description: 'Night Slash' }, { id: 430, name: 'Honchkrow', description: 'Night Slash' }] },
          { id: 437, name: 'Bronzong', level: 54, types: ['steel', 'psychic'], counters: [{ id: 392, name: 'Infernape', description: 'Flamethrower' }, { id: 78, name: 'Rapidash', description: 'Flamethrower' }] },
          { id: 65, name: 'Alakazam', level: 56, types: ['psychic'], counters: [{ id: 442, name: 'Spiritomb', description: 'Sucker Punch' }, { id: 461, name: 'Weavile', description: 'Night Slash' }] },
          { id: 475, name: 'Gallade', level: 59, types: ['psychic', 'fighting'], counters: [{ id: 398, name: 'Staraptor', description: 'Brave Bird' }, { id: 94, name: 'Gengar', description: 'Shadow Ball' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Neutro.',
                team: [
                    { id: 392, name: 'Infernape', level: 55, types: ['fire', 'fighting'], location: 'Troca', notes: 'Fogo em Bronzong/Mr. Mime.', keyMoves: ['Flamethrower'] },
                    { id: 94, name: 'Gengar', level: 55, types: ['ghost', 'poison'], location: 'Troca', notes: 'Shadow Ball destrói Psíquicos.', keyMoves: ['Shadow Ball'] },
                    { id: 461, name: 'Weavile', level: 54, types: ['dark', 'ice'], location: 'Evolução', notes: 'Night Slash é super efetivo.', keyMoves: ['Night Slash'] },
                    { id: 442, name: 'Spiritomb', level: 54, types: ['ghost', 'dark'], location: 'Hallowed Tower', notes: 'Imune a Psíquico.', keyMoves: ['Dark Pulse'] },
                    { id: 430, name: 'Honchkrow', level: 54, types: ['dark', 'flying'], location: 'Evolução', notes: 'Night Slash.', keyMoves: ['Night Slash'] },
                    { id: 452, name: 'Drapion', level: 54, types: ['poison', 'dark'], location: 'Great Marsh', notes: 'Imune a Psíquico.', keyMoves: ['Crunch'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Neutro.',
                team: [
                    { id: 392, name: 'Infernape', level: 56, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Flamethrower em Bronzong.', keyMoves: ['Flamethrower'] },
                    { id: 461, name: 'Weavile', level: 54, types: ['dark', 'ice'], location: 'Evolução', notes: 'Night Slash.', keyMoves: ['Night Slash'] },
                    { id: 442, name: 'Spiritomb', level: 54, types: ['ghost', 'dark'], location: 'Hallowed Tower', notes: 'Imune a Psíquico.', keyMoves: ['Dark Pulse'] },
                    { id: 452, name: 'Drapion', level: 54, types: ['poison', 'dark'], location: 'Great Marsh', notes: 'Imune a Psíquico.', keyMoves: ['Crunch'] },
                    { id: 94, name: 'Gengar', level: 54, types: ['ghost', 'poison'], location: 'Troca', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 430, name: 'Honchkrow', level: 54, types: ['dark', 'flying'], location: 'Evolução', notes: 'Night Slash.', keyMoves: ['Night Slash'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Neutro.',
                team: [
                    { id: 395, name: 'Empoleon', level: 56, types: ['water', 'steel'], location: 'Evolução', notes: 'Resiste a Psíquico. Surf.', keyMoves: ['Surf'] },
                    { id: 461, name: 'Weavile', level: 54, types: ['dark', 'ice'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Night Slash'] },
                    { id: 452, name: 'Drapion', level: 54, types: ['poison', 'dark'], location: 'Great Marsh', notes: 'Imune a Psíquico.', keyMoves: ['Crunch'] },
                    { id: 442, name: 'Spiritomb', level: 54, types: ['ghost', 'dark'], location: 'Hallowed Tower', notes: 'Imune.', keyMoves: ['Dark Pulse'] },
                    { id: 94, name: 'Gengar', level: 54, types: ['ghost', 'poison'], location: 'Troca', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
                    { id: 398, name: 'Staraptor', level: 54, types: ['normal', 'flying'], location: 'Evolução', notes: 'Brave Bird em Gallade.', keyMoves: ['Brave Bird'] }
                ]
            }
        ]
      },
      {
        id: 'cynthia',
        name: 'Champion Cynthia',
        specialty: 'mixed',
        badge: 'Champion',
        location: 'Pokemon League',
        description: 'A Campeã de Sinnoh. Enfrente o terror de Garchomp.',
        acePokemonId: 445,
        team: [
          { id: 442, name: 'Spiritomb', level: 58, types: ['ghost', 'dark'], counters: [{ id: 468, name: 'Togekiss', description: 'Fairy (se gen 6+), senão neutro forte' }] },
          { id: 407, name: 'Roserade', level: 58, types: ['grass', 'poison'], counters: [{ id: 392, name: 'Infernape', description: 'Flamethrower' }] },
          { id: 468, name: 'Togekiss', level: 60, types: ['fairy', 'flying'], counters: [{ id: 461, name: 'Weavile', description: 'Ice Punch' }, { id: 405, name: 'Luxray', description: 'Thunderbolt' }] },
          { id: 448, name: 'Lucario', level: 60, types: ['fighting', 'steel'], counters: [{ id: 392, name: 'Infernape', description: 'Close Combat' }] },
          { id: 350, name: 'Milotic', level: 58, types: ['water'], counters: [{ id: 407, name: 'Roserade', description: 'Giga Drain' }, { id: 462, name: 'Magnezone', description: 'Thunderbolt' }] },
          { id: 445, name: 'Garchomp', level: 62, types: ['dragon', 'ground'], counters: [{ id: 461, name: 'Weavile', description: 'Ice Shard/Ice Punch (4x)' }, { id: 473, name: 'Mamoswine', description: 'Ice Shard' }] }
        ],
        recommendedTeams: [
            {
                starterId: 387, starterName: 'Turtwig', description: 'Prepare-se para o Garchomp.',
                team: [
                    { id: 389, name: 'Torterra', level: 60, types: ['grass', 'ground'], location: 'Evolução', notes: 'Wood Hammer em Milotic.', keyMoves: ['Wood Hammer'] },
                    { id: 461, name: 'Weavile', level: 58, types: ['dark', 'ice'], location: 'Evolução', notes: 'OBRIGATÓRIO. Ice Shard mata Garchomp antes dele atacar.', keyMoves: ['Ice Shard', 'Night Slash'] },
                    { id: 392, name: 'Infernape', level: 58, types: ['fire', 'fighting'], location: 'Troca', notes: 'Para Lucario/Roserade.', keyMoves: ['Flamethrower', 'Close Combat'] },
                    { id: 395, name: 'Empoleon', level: 58, types: ['water', 'steel'], location: 'Troca', notes: 'Resiste a Spiritomb/Togekiss.', keyMoves: ['Surf', 'Ice Beam'] },
                    { id: 468, name: 'Togekiss', level: 58, types: ['fairy', 'flying'], location: 'Evolução', notes: 'Air Slash flinch.', keyMoves: ['Air Slash'] },
                    { id: 445, name: 'Garchomp', level: 60, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Garchomp vs Garchomp.', keyMoves: ['Dragon Claw'] }
                ]
            },
            {
                starterId: 390, starterName: 'Chimchar', description: 'Infernape cuida de metade do time dela.',
                team: [
                    { id: 392, name: 'Infernape', level: 62, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Mata Roserade, Lucario e Weavile(se tivesse).', keyMoves: ['Close Combat', 'Flamethrower'] },
                    { id: 461, name: 'Weavile', level: 58, types: ['dark', 'ice'], location: 'Evolução', notes: 'Ice Shard em Garchomp/Togekiss.', keyMoves: ['Ice Shard'] },
                    { id: 407, name: 'Roserade', level: 58, types: ['grass', 'poison'], location: 'Evolução', notes: 'Para Milotic.', keyMoves: ['Giga Drain'] },
                    { id: 445, name: 'Garchomp', level: 60, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Outrage.', keyMoves: ['Outrage'] },
                    { id: 130, name: 'Gyarados', level: 58, types: ['water', 'flying'], location: 'Pesca', notes: 'Intimidate em Garchomp. Ice Fang.', keyMoves: ['Ice Fang', 'Waterfall'] },
                    { id: 442, name: 'Spiritomb', level: 58, types: ['ghost', 'dark'], location: 'Hallowed Tower', notes: 'Sem fraquezas.', keyMoves: ['Dark Pulse'] }
                ]
            },
            {
                starterId: 393, starterName: 'Piplup', description: 'Empoleon com Ice Beam.',
                team: [
                    { id: 395, name: 'Empoleon', level: 62, types: ['water', 'steel'], location: 'Evolução', notes: 'Ice Beam em Garchomp (se sobreviver ao Earthquake).', keyMoves: ['Ice Beam', 'Surf'] },
                    { id: 461, name: 'Weavile', level: 58, types: ['dark', 'ice'], location: 'Evolução', notes: 'Ice Shard em Garchomp.', keyMoves: ['Ice Shard'] },
                    { id: 392, name: 'Infernape', level: 58, types: ['fire', 'fighting'], location: 'Troca', notes: 'Para Lucario.', keyMoves: ['Close Combat'] },
                    { id: 407, name: 'Roserade', level: 58, types: ['grass', 'poison'], location: 'Evolução', notes: 'Para Milotic.', keyMoves: ['Giga Drain'] },
                    { id: 445, name: 'Garchomp', level: 60, types: ['dragon', 'ground'], location: 'Wayward Cave', notes: 'Outrage.', keyMoves: ['Outrage'] },
                    { id: 468, name: 'Togekiss', level: 58, types: ['fairy', 'flying'], location: 'Evolução', notes: 'Para Spiritomb.', keyMoves: ['Air Slash'] }
                ]
            }
        ]
      }
    ]
  },
  {
    id: 'bw-unova',
    game: 'Black / White',
    region: 'Unova',
    image: 'https://img.pokemondb.net/boxes/black.jpg',
    starters: [
      { id: 495, name: 'Snivy', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 498, name: 'Tepig', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 501, name: 'Oshawott', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'striaton-trio',
        name: 'Cilan / Chili / Cress',
        specialty: 'mixed',
        badge: 'Trio Badge',
        location: 'Striaton City',
        description: 'Os irmãos que usam macacos elementais.',
        acePokemonId: 511,
        team: [
          { id: 506, name: 'Lillipup', level: 12, types: ['normal'], counters: [{ id: 501, name: 'Oshawott', description: 'Water Gun' }, { id: 498, name: 'Tepig', description: 'Ember' }] },
          { id: 511, name: 'Pansage', level: 14, types: ['grass'], location: 'Se você escolheu Tepig', counters: [{ id: 498, name: 'Tepig', description: 'Ember' }, { id: 513, name: 'Pansear', description: 'Incinerate' }] },
          { id: 513, name: 'Pansear', level: 14, types: ['fire'], location: 'Se você escolheu Oshawott', counters: [{ id: 501, name: 'Oshawott', description: 'Water Gun' }, { id: 515, name: 'Panpour', description: 'Water Gun' }] },
          { id: 515, name: 'Panpour', level: 14, types: ['water'], location: 'Se você escolheu Snivy', counters: [{ id: 495, name: 'Snivy', description: 'Vine Whip' }, { id: 511, name: 'Pansage', description: 'Vine Whip' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Você enfrentará Chili (Fogo). Pegue o Panpour.',
            team: [
              { id: 515, name: 'Panpour', level: 12, types: ['water'], location: 'Dreamyard (Gift)', notes: 'Essencial contra Chili.', keyMoves: ['Water Gun'] },
              { id: 495, name: 'Snivy', level: 14, types: ['grass'], location: 'Inicial', notes: 'Fraco contra Fogo. Use como suporte.', keyMoves: ['Vine Whip'] },
              { id: 506, name: 'Lillipup', level: 12, types: ['normal'], location: 'Rota 2', notes: 'Pickup / Ataque neutro.', keyMoves: ['Tackle'] },
              { id: 504, name: 'Patrat', level: 11, types: ['normal'], location: 'Rota 1', notes: 'Apoio.', keyMoves: ['Bite'] },
              { id: 509, name: 'Purrloin', level: 11, types: ['dark'], location: 'Rota 2', notes: 'Sand Attack ajuda.', keyMoves: ['Scratch'] },
              { id: 531, name: 'Audino', level: 11, types: ['normal'], location: 'Rota 2 (Grama movendo)', notes: 'Tanque HP.', keyMoves: ['Pound'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Você enfrentará Cress (Água). Pegue o Pansage.',
            team: [
              { id: 511, name: 'Pansage', level: 12, types: ['grass'], location: 'Dreamyard (Gift)', notes: 'Essencial contra Cress.', keyMoves: ['Vine Whip'] },
              { id: 498, name: 'Tepig', level: 14, types: ['fire'], location: 'Inicial', notes: 'Fraco contra Água.', keyMoves: ['Ember'] },
              { id: 506, name: 'Lillipup', level: 12, types: ['normal'], location: 'Rota 2', notes: 'Dano neutro.', keyMoves: ['Tackle'] },
              { id: 504, name: 'Patrat', level: 11, types: ['normal'], location: 'Rota 1', notes: 'Apoio.', keyMoves: ['Bite'] },
              { id: 509, name: 'Purrloin', level: 11, types: ['dark'], location: 'Rota 2', notes: 'Assist.', keyMoves: ['Scratch'] },
              { id: 531, name: 'Audino', level: 11, types: ['normal'], location: 'Rota 2', notes: 'Tanque.', keyMoves: ['Doubleslap'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Você enfrentará Cilan (Planta). Pegue o Pansear.',
            team: [
              { id: 513, name: 'Pansear', level: 12, types: ['fire'], location: 'Dreamyard (Gift)', notes: 'Essencial contra Cilan.', keyMoves: ['Incinerate'] },
              { id: 501, name: 'Oshawott', level: 14, types: ['water'], location: 'Inicial', notes: 'Fraco contra Planta.', keyMoves: ['Water Gun'] },
              { id: 506, name: 'Lillipup', level: 12, types: ['normal'], location: 'Rota 2', notes: 'Neutro.', keyMoves: ['Tackle'] },
              { id: 504, name: 'Patrat', level: 11, types: ['normal'], location: 'Rota 1', notes: 'Neutro.', keyMoves: ['Bite'] },
              { id: 509, name: 'Purrloin', level: 11, types: ['dark'], location: 'Rota 2', notes: 'Neutro.', keyMoves: ['Scratch'] },
              { id: 531, name: 'Audino', level: 11, types: ['normal'], location: 'Rota 2', notes: 'Regenerator.', keyMoves: ['Pound'] }
            ]
          }
        ]
      },
      {
        id: 'lenora',
        name: 'Lenora',
        specialty: 'normal',
        badge: 'Basic Badge',
        location: 'Nacrene City',
        description: 'A arqueóloga de Nacrene.',
        acePokemonId: 505,
        team: [
          { id: 507, name: 'Herdier', level: 18, types: ['normal'], counters: [{ id: 532, name: 'Timburr', description: 'Low Kick' }, { id: 538, name: 'Throh', description: 'Vital Throw' }] },
          { id: 505, name: 'Watchog', level: 20, types: ['normal'], counters: [{ id: 539, name: 'Sawk', description: 'Double Kick' }, { id: 532, name: 'Timburr', description: 'Low Kick' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Lutadores de Pinwheel Forest.',
            team: [
              { id: 532, name: 'Timburr', level: 18, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Super efetivo em Normal.', keyMoves: ['Low Kick'] },
              { id: 539, name: 'Sawk', level: 18, types: ['fighting'], location: 'Pinwheel Forest (Rustling Grass)', notes: 'Double Kick destrói Lenora.', keyMoves: ['Double Kick'] },
              { id: 496, name: 'Servine', level: 18, types: ['grass'], location: 'Evolução', notes: 'Leech Seed + Growth.', keyMoves: ['Mega Drain'] },
              { id: 507, name: 'Herdier', level: 18, types: ['normal'], location: 'Evolução', notes: 'Intimidate ajuda muito.', keyMoves: ['Take Down'] },
              { id: 524, name: 'Roggenrola', level: 18, types: ['rock'], location: 'Wellspring Cave', notes: 'Resiste a Normal.', keyMoves: ['Headbutt'] },
              { id: 535, name: 'Tympole', level: 16, types: ['water'], location: 'Pinwheel Forest', notes: 'Neutro.', keyMoves: ['Round'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Pignite tem vantagem de tipo.',
            team: [
              { id: 499, name: 'Pignite', level: 19, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Arm Thrust destrói o ginásio.', keyMoves: ['Arm Thrust'] },
              { id: 532, name: 'Timburr', level: 18, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Backup lutador.', keyMoves: ['Low Kick'] },
              { id: 524, name: 'Roggenrola', level: 18, types: ['rock'], location: 'Wellspring Cave', notes: 'Resiste a golpes normais.', keyMoves: ['Headbutt'] },
              { id: 536, name: 'Palpitoad', level: 18, types: ['water', 'ground'], location: 'Pinwheel Forest (Evolução)', notes: 'Bom HP.', keyMoves: ['Mud Shot'] },
              { id: 511, name: 'Pansage', level: 18, types: ['grass'], location: 'Dreamyard', notes: 'Seed Bomb.', keyMoves: ['Seed Bomb'] },
              { id: 519, name: 'Pidove', level: 18, types: ['normal', 'flying'], location: 'Rota 3', notes: 'Neutro.', keyMoves: ['Air Cutter'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Use Lutadores.',
            team: [
              { id: 538, name: 'Throh', level: 18, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Muito resistente. Vital Throw.', keyMoves: ['Vital Throw'] },
              { id: 502, name: 'Dewott', level: 19, types: ['water'], location: 'Evolução', notes: 'Razor Shell.', keyMoves: ['Razor Shell'] },
              { id: 532, name: 'Timburr', level: 18, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Low Kick.', keyMoves: ['Low Kick'] },
              { id: 524, name: 'Roggenrola', level: 18, types: ['rock'], location: 'Wellspring Cave', notes: 'Resiste a Normal.', keyMoves: ['Headbutt'] },
              { id: 513, name: 'Pansear', level: 18, types: ['fire'], location: 'Dreamyard', notes: 'Neutro.', keyMoves: ['Flame Burst'] },
              { id: 529, name: 'Drilbur', level: 18, types: ['ground'], location: 'Wellspring Cave (Dust)', notes: 'Dig/Metal Claw.', keyMoves: ['Dig'] }
            ]
          }
        ]
      },
      {
        id: 'burgh',
        name: 'Burgh',
        specialty: 'bug',
        badge: 'Insect Badge',
        location: 'Castelia City',
        description: 'O artista de insetos.',
        acePokemonId: 542,
        team: [
          { id: 543, name: 'Whirlipede', level: 21, types: ['bug', 'poison'], counters: [{ id: 499, name: 'Pignite', description: 'Flame Charge' }, { id: 554, name: 'Darumaka', description: 'Fire Fang' }] },
          { id: 557, name: 'Dwebble', level: 21, types: ['bug', 'rock'], counters: [{ id: 502, name: 'Dewott', description: 'Razor Shell' }, { id: 532, name: 'Timburr', description: 'Low Kick' }] },
          { id: 542, name: 'Leavanny', level: 23, types: ['bug', 'grass'], counters: [{ id: 519, name: 'Pidove', description: 'Air Cutter (4x)' }, { id: 554, name: 'Darumaka', description: 'Fire Fang (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Desvantagem. Use Fogo/Voador.',
            team: [
              { id: 554, name: 'Darumaka', level: 22, types: ['fire'], location: 'Rota 4', notes: 'MVP. Destrói insetos.', keyMoves: ['Fire Fang'] },
              { id: 520, name: 'Tranquill', level: 22, types: ['normal', 'flying'], location: 'Evolução', notes: 'Air Cutter em Leavanny (4x).', keyMoves: ['Air Cutter'] },
              { id: 515, name: 'Panpour', level: 22, types: ['water'], location: 'Dreamyard', notes: 'Contra Dwebble.', keyMoves: ['Water Gun'] },
              { id: 524, name: 'Roggenrola', level: 22, types: ['rock'], location: 'Wellspring Cave', notes: 'Smack Down em insetos voadores.', keyMoves: ['Smack Down'] },
              { id: 496, name: 'Servine', level: 22, types: ['grass'], location: 'Evolução', notes: 'Resistente a planta.', keyMoves: ['Growth'] },
              { id: 507, name: 'Herdier', level: 22, types: ['normal'], location: 'Evolução', notes: 'Retaliate.', keyMoves: ['Retaliate'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Pignite vence fácil.',
            team: [
              { id: 499, name: 'Pignite', level: 23, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Flame Charge aumenta speed e mata.', keyMoves: ['Flame Charge'] },
              { id: 520, name: 'Tranquill', level: 22, types: ['normal', 'flying'], location: 'Evolução', notes: 'Air Cutter.', keyMoves: ['Air Cutter'] },
              { id: 524, name: 'Roggenrola', level: 22, types: ['rock'], location: 'Wellspring Cave', notes: 'Smack Down.', keyMoves: ['Smack Down'] },
              { id: 511, name: 'Pansage', level: 22, types: ['grass'], location: 'Dreamyard', notes: 'Cuidado com inseto.', keyMoves: ['Seed Bomb'] },
              { id: 532, name: 'Timburr', level: 22, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Rock Throw (TM).', keyMoves: ['Rock Throw'] },
              { id: 509, name: 'Purrloin', level: 20, types: ['dark'], location: 'Rota 2', notes: 'Neutro.', keyMoves: ['Pursuit'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Neutro.',
            team: [
              { id: 554, name: 'Darumaka', level: 22, types: ['fire'], location: 'Rota 4', notes: 'Essencial.', keyMoves: ['Fire Fang'] },
              { id: 520, name: 'Tranquill', level: 22, types: ['normal', 'flying'], location: 'Evolução', notes: 'Voador é super efetivo.', keyMoves: ['Air Cutter'] },
              { id: 502, name: 'Dewott', level: 23, types: ['water'], location: 'Evolução', notes: 'Razor Shell em Dwebble.', keyMoves: ['Razor Shell'] },
              { id: 513, name: 'Pansear', level: 22, types: ['fire'], location: 'Dreamyard', notes: 'Fogo.', keyMoves: ['Flame Burst'] },
              { id: 524, name: 'Roggenrola', level: 22, types: ['rock'], location: 'Wellspring Cave', notes: 'Smack Down.', keyMoves: ['Smack Down'] },
              { id: 532, name: 'Timburr', level: 22, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Rock Throw.', keyMoves: ['Rock Throw'] }
            ]
          }
        ]
      },
      {
        id: 'elesa',
        name: 'Elesa',
        specialty: 'electric',
        badge: 'Bolt Badge',
        location: 'Nimbasa City',
        description: 'A modelo elétrica.',
        acePokemonId: 523,
        team: [
          { id: 587, name: 'Emolga', level: 25, types: ['electric', 'flying'], counters: [{ id: 524, name: 'Roggenrola', description: 'Smack Down' }, { id: 529, name: 'Drilbur', description: 'Rock Slide' }] },
          { id: 587, name: 'Emolga', level: 25, types: ['electric', 'flying'], counters: [{ id: 559, name: 'Scraggy', description: 'Crunch/Headbutt' }, { id: 524, name: 'Roggenrola', description: 'Smack Down' }] },
          { id: 523, name: 'Zebstrika', level: 27, types: ['electric'], counters: [{ id: 551, name: 'Sandile', description: 'Dig (Imune)' }, { id: 530, name: 'Excadrill', description: 'Dig (Imune)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Ground. Snivy resiste a elétrico.',
            team: [
              { id: 551, name: 'Sandile', level: 25, types: ['ground', 'dark'], location: 'Rota 4', notes: 'Imune a elétrico. Dig.', keyMoves: ['Dig'] },
              { id: 524, name: 'Roggenrola', level: 25, types: ['rock'], location: 'Wellspring Cave', notes: 'Smack Down mata Emolga.', keyMoves: ['Smack Down'] },
              { id: 496, name: 'Servine', level: 26, types: ['grass'], location: 'Evolução', notes: 'Resiste a elétrico.', keyMoves: ['Mega Drain'] },
              { id: 529, name: 'Drilbur', level: 25, types: ['ground'], location: 'Wellspring Cave (Dust)', notes: 'Imune.', keyMoves: ['Dig'] },
              { id: 559, name: 'Scraggy', level: 24, types: ['dark', 'fighting'], location: 'Rota 4', notes: 'Bom bulk.', keyMoves: ['Brick Break'] },
              { id: 561, name: 'Sigilyph', level: 24, types: ['psychic', 'flying'], location: 'Desert Resort', notes: 'Psybeam.', keyMoves: ['Psybeam'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Use Ground.',
            team: [
              { id: 551, name: 'Sandile', level: 25, types: ['ground', 'dark'], location: 'Rota 4', notes: 'MVP. Imune.', keyMoves: ['Dig'] },
              { id: 524, name: 'Roggenrola', level: 25, types: ['rock'], location: 'Wellspring Cave', notes: 'Smack Down em Emolga.', keyMoves: ['Smack Down'] },
              { id: 499, name: 'Pignite', level: 26, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Rollout pode funcionar.', keyMoves: ['Rollout'] },
              { id: 529, name: 'Drilbur', level: 25, types: ['ground'], location: 'Wellspring Cave', notes: 'Imune.', keyMoves: ['Dig'] },
              { id: 554, name: 'Darumaka', level: 25, types: ['fire'], location: 'Rota 4', notes: 'Fire Punch.', keyMoves: ['Fire Punch'] },
              { id: 562, name: 'Yamask', level: 24, types: ['ghost'], location: 'Relic Castle', notes: 'Hex.', keyMoves: ['Hex'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Desvantagem. Use Ground.',
            team: [
              { id: 551, name: 'Sandile', level: 25, types: ['ground', 'dark'], location: 'Rota 4', notes: 'Essencial.', keyMoves: ['Dig'] },
              { id: 524, name: 'Roggenrola', level: 25, types: ['rock'], location: 'Wellspring Cave', notes: 'Smack Down.', keyMoves: ['Smack Down'] },
              { id: 529, name: 'Drilbur', level: 25, types: ['ground'], location: 'Wellspring Cave', notes: 'Imune.', keyMoves: ['Dig'] },
              { id: 502, name: 'Dewott', level: 26, types: ['water'], location: 'Evolução', notes: 'Fraco a elétrico. Evite.', keyMoves: ['Razor Shell'] },
              { id: 536, name: 'Palpitoad', level: 25, types: ['water', 'ground'], location: 'Pinwheel Forest', notes: 'IMUNE a elétrico (Ground).', keyMoves: ['Mud Shot'] },
              { id: 554, name: 'Darumaka', level: 25, types: ['fire'], location: 'Rota 4', notes: 'Neutro.', keyMoves: ['Fire Punch'] }
            ]
          }
        ]
      },
      {
        id: 'clay',
        name: 'Clay',
        specialty: 'ground',
        badge: 'Quake Badge',
        location: 'Driftveil City',
        description: 'O magnata do petróleo.',
        acePokemonId: 530,
        team: [
          { id: 552, name: 'Krokorok', level: 29, types: ['ground', 'dark'], counters: [{ id: 497, name: 'Serperior', description: 'Leaf Blade' }, { id: 503, name: 'Samurott', description: 'Surf' }] },
          { id: 536, name: 'Palpitoad', level: 29, types: ['water', 'ground'], counters: [{ id: 497, name: 'Serperior', description: 'Leaf Blade (4x)' }, { id: 542, name: 'Leavanny', description: 'Razor Leaf (4x)' }] },
          { id: 530, name: 'Excadrill', level: 31, types: ['ground', 'steel'], counters: [{ id: 499, name: 'Pignite', description: 'Heat Crash' }, { id: 503, name: 'Samurott', description: 'Surf' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Vantagem Absoluta.',
            team: [
              { id: 497, name: 'Serperior', level: 36, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade destrói todos.', keyMoves: ['Leaf Blade'] },
              { id: 537, name: 'Seismitoad', level: 36, types: ['water', 'ground'], location: 'Evolução', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 542, name: 'Leavanny', level: 30, types: ['bug', 'grass'], location: 'Lostlorn Forest', notes: 'Razor Leaf 4x em Palpitoad.', keyMoves: ['Razor Leaf'] },
              { id: 555, name: 'Darmanitan', level: 35, types: ['fire'], location: 'Evolução', notes: 'Fire Punch em Excadrill.', keyMoves: ['Fire Punch'] },
              { id: 581, name: 'Swanna', level: 35, types: ['water', 'flying'], location: 'Evolução', notes: 'Imune a ground.', keyMoves: ['Scald'] },
              { id: 549, name: 'Lilligant', level: 30, types: ['grass'], location: 'Pinwheel Forest (Sun Stone)', notes: 'Giga Drain.', keyMoves: ['Giga Drain'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Pignite vence Excadrill.',
            team: [
              { id: 500, name: 'Emboar', level: 36, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Heat Crash/Hammer Arm mata Excadrill.', keyMoves: ['Heat Crash'] },
              { id: 542, name: 'Leavanny', level: 32, types: ['bug', 'grass'], location: 'Lostlorn Forest', notes: 'Planta para Palpitoad/Krokorok.', keyMoves: ['Razor Leaf'] },
              { id: 537, name: 'Seismitoad', level: 36, types: ['water', 'ground'], location: 'Evolução', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 581, name: 'Swanna', level: 35, types: ['water', 'flying'], location: 'Drawbridge', notes: 'Scald.', keyMoves: ['Scald'] },
              { id: 560, name: 'Scrafty', level: 39, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Brick Break.', keyMoves: ['Brick Break'] },
              { id: 566, name: 'Archen', level: 25, types: ['rock', 'flying'], location: 'Relic Castle (Fossil)', notes: 'Imune a terra.', keyMoves: ['Acrobatics'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Vantagem Absoluta.',
            team: [
              { id: 503, name: 'Samurott', level: 36, types: ['water'], location: 'Evolução', notes: 'Surf varre o ginásio.', keyMoves: ['Surf'] },
              { id: 542, name: 'Leavanny', level: 32, types: ['bug', 'grass'], location: 'Lostlorn Forest', notes: 'Para Palpitoad.', keyMoves: ['Razor Leaf'] },
              { id: 555, name: 'Darmanitan', level: 35, types: ['fire'], location: 'Evolução', notes: 'Backup.', keyMoves: ['Fire Punch'] },
              { id: 530, name: 'Excadrill', level: 32, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resiste a Rock Slide.', keyMoves: ['Dig'] },
              { id: 561, name: 'Sigilyph', level: 30, types: ['psychic', 'flying'], location: 'Desert Resort', notes: 'Imune a terra.', keyMoves: ['Air Slash'] },
              { id: 570, name: 'Zorua', level: 25, types: ['dark'], location: 'Castelia (Event) / Lostlorn', notes: 'Grass Knot.', keyMoves: ['Grass Knot'] }
            ]
          }
        ]
      },
      {
        id: 'skyla',
        name: 'Skyla',
        specialty: 'flying',
        badge: 'Jet Badge',
        location: 'Mistralton City',
        description: 'A piloto de aviões.',
        acePokemonId: 581,
        team: [
          { id: 528, name: 'Swoobat', level: 33, types: ['psychic', 'flying'], counters: [{ id: 523, name: 'Zebstrika', description: 'Spark' }, { id: 596, name: 'Galvantula', description: 'Electroweb' }] },
          { id: 521, name: 'Unfezant', level: 33, types: ['normal', 'flying'], counters: [{ id: 526, name: 'Gigalith', description: 'Rock Slide' }, { id: 523, name: 'Zebstrika', description: 'Spark' }] },
          { id: 581, name: 'Swanna', level: 35, types: ['water', 'flying'], counters: [{ id: 523, name: 'Zebstrika', description: 'Spark (4x)' }, { id: 596, name: 'Galvantula', description: 'Electro Ball (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Desvantagem. Use Elétrico/Pedra.',
            team: [
              { id: 523, name: 'Zebstrika', level: 35, types: ['electric'], location: 'Rota 3', notes: 'MVP. Spark mata todos.', keyMoves: ['Spark'] },
              { id: 526, name: 'Gigalith', level: 35, types: ['rock'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 596, name: 'Galvantula', level: 36, types: ['bug', 'electric'], location: 'Chargestone Cave', notes: 'Electro Ball (4x em Swanna).', keyMoves: ['Electro Ball'] },
              { id: 497, name: 'Serperior', level: 38, types: ['grass'], location: 'Evolução', notes: 'Fraco a Voador. Evite.', keyMoves: ['Leaf Blade'] },
              { id: 567, name: 'Archeops', level: 37, types: ['rock', 'flying'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 603, name: 'Eelektrik', level: 39, types: ['electric'], location: 'Chargestone Cave', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Rollout ou Elétrico.',
            team: [
              { id: 596, name: 'Galvantula', level: 36, types: ['bug', 'electric'], location: 'Chargestone Cave', notes: 'Destrói Swanna.', keyMoves: ['Electro Ball'] },
              { id: 500, name: 'Emboar', level: 38, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Rollout (TM).', keyMoves: ['Rollout'] },
              { id: 523, name: 'Zebstrika', level: 35, types: ['electric'], location: 'Rota 3', notes: 'Spark.', keyMoves: ['Spark'] },
              { id: 567, name: 'Archeops', level: 37, types: ['rock', 'flying'], location: 'Evolução', notes: 'Acrobatics/Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 526, name: 'Gigalith', level: 35, types: ['rock'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 611, name: 'Fraxure', level: 38, types: ['dragon'], location: 'Mistralton Cave', notes: 'Resiste a água.', keyMoves: ['Dragon Claw'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Neutro. Use Elétrico.',
            team: [
              { id: 523, name: 'Zebstrika', level: 35, types: ['electric'], location: 'Rota 3', notes: 'Essencial.', keyMoves: ['Spark'] },
              { id: 596, name: 'Galvantula', level: 36, types: ['bug', 'electric'], location: 'Chargestone Cave', notes: 'MVP.', keyMoves: ['Electro Ball'] },
              { id: 503, name: 'Samurott', level: 38, types: ['water'], location: 'Evolução', notes: 'Resiste a água.', keyMoves: ['Surf'] },
              { id: 526, name: 'Gigalith', level: 35, types: ['rock'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 603, name: 'Eelektrik', level: 39, types: ['electric'], location: 'Chargestone Cave', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
              { id: 581, name: 'Swanna', level: 35, types: ['water', 'flying'], location: 'Drawbridge', notes: 'Ice Beam em Unfezant.', keyMoves: ['Ice Beam'] }
            ]
          }
        ]
      },
      {
        id: 'brycen',
        name: 'Brycen',
        specialty: 'ice',
        badge: 'Freeze Badge',
        location: 'Icirrus City',
        description: 'O ator de filmes de gelo.',
        acePokemonId: 614,
        team: [
          { id: 583, name: 'Vanillish', level: 37, types: ['ice'], counters: [{ id: 500, name: 'Emboar', description: 'Flamethrower/Heat Crash' }, { id: 534, name: 'Conkeldurr', description: 'Hammer Arm' }] },
          { id: 615, name: 'Cryogonal', level: 37, types: ['ice'], counters: [{ id: 555, name: 'Darmanitan', description: 'Flare Blitz' }, { id: 539, name: 'Sawk', description: 'Close Combat' }] },
          { id: 614, name: 'Beartic', level: 39, types: ['ice'], counters: [{ id: 500, name: 'Emboar', description: 'Heat Crash' }, { id: 609, name: 'Chandelure', description: 'Flamethrower' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Desvantagem. Use Fogo/Luta.',
            team: [
              { id: 555, name: 'Darmanitan', level: 40, types: ['fire'], location: 'Evolução', notes: 'Flare Blitz derrete o gelo.', keyMoves: ['Flare Blitz'] },
              { id: 609, name: 'Chandelure', level: 41, types: ['ghost', 'fire'], location: 'Celestial Tower (Dusk Stone)', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 534, name: 'Conkeldurr', level: 40, types: ['fighting'], location: 'Evolução', notes: 'Hammer Arm.', keyMoves: ['Hammer Arm'] },
              { id: 503, name: 'Samurott', level: 40, types: ['water'], location: 'Troca', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], location: 'Rota 11 (Tarde)', notes: 'Iron Head (Se tiver).', keyMoves: ['Iron Head'] },
              { id: 530, name: 'Excadrill', level: 40, types: ['ground', 'steel'], location: 'Evolução', notes: 'Rock Slide/Iron Head.', keyMoves: ['Iron Head'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Vantagem Absoluta.',
            team: [
              { id: 500, name: 'Emboar', level: 40, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Destrói o ginásio sozinho.', keyMoves: ['Heat Crash', 'Hammer Arm'] },
              { id: 530, name: 'Excadrill', level: 40, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resiste a Gelo.', keyMoves: ['Rock Slide'] },
              { id: 609, name: 'Chandelure', level: 41, types: ['ghost', 'fire'], location: 'Celestial Tower', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 537, name: 'Seismitoad', level: 40, types: ['water', 'ground'], location: 'Evolução', notes: 'Drain Punch.', keyMoves: ['Drain Punch'] },
              { id: 555, name: 'Darmanitan', level: 40, types: ['fire'], location: 'Evolução', notes: 'Flare Blitz.', keyMoves: ['Flare Blitz'] },
              { id: 604, name: 'Eelektross', level: 40, types: ['electric'], location: 'Evolução (Thunderstone)', notes: 'Flamethrower (TM).', keyMoves: ['Flamethrower'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Neutro. Samurott tem golpes lutadores.',
            team: [
              { id: 503, name: 'Samurott', level: 40, types: ['water'], location: 'Evolução', notes: 'Revenge/Surf.', keyMoves: ['Revenge'] },
              { id: 555, name: 'Darmanitan', level: 40, types: ['fire'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Flare Blitz'] },
              { id: 609, name: 'Chandelure', level: 41, types: ['ghost', 'fire'], location: 'Celestial Tower', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 534, name: 'Conkeldurr', level: 40, types: ['fighting'], location: 'Evolução', notes: 'Hammer Arm.', keyMoves: ['Hammer Arm'] },
              { id: 530, name: 'Excadrill', level: 40, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resiste a gelo.', keyMoves: ['Iron Head'] },
              { id: 596, name: 'Galvantula', level: 40, types: ['bug', 'electric'], location: 'Evolução', notes: 'Thunder.', keyMoves: ['Thunder'] }
            ]
          }
        ]
      },
      {
        id: 'drayden',
        name: 'Drayden / Iris',
        specialty: 'dragon',
        badge: 'Legend Badge',
        location: 'Opelucid City',
        description: 'Líderes Dragão (Depende da versão).',
        acePokemonId: 612,
        team: [
          { id: 611, name: 'Fraxure', level: 41, types: ['dragon'], counters: [{ id: 614, name: 'Beartic', description: 'Icicle Crash' }, { id: 621, name: 'Druddigon', description: 'Dragon Claw' }] },
          { id: 621, name: 'Druddigon', level: 41, types: ['dragon'], counters: [{ id: 612, name: 'Haxorus', description: 'Dragon Claw' }, { id: 584, name: 'Vanilluxe', description: 'Ice Beam' }] },
          { id: 612, name: 'Haxorus', level: 43, types: ['dragon'], counters: [{ id: 614, name: 'Beartic', description: 'Icicle Crash' }, { id: 635, name: 'Hydreigon', description: 'Dragon Pulse' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Gelo ou Dragão.',
            team: [
              { id: 614, name: 'Beartic', level: 42, types: ['ice'], location: 'Twist Mountain', notes: 'Icicle Crash mata dragões.', keyMoves: ['Icicle Crash'] },
              { id: 584, name: 'Vanilluxe', level: 47, types: ['ice'], location: 'Evolução', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 621, name: 'Druddigon', level: 42, types: ['dragon'], location: 'Dragonspiral Tower', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
              { id: 609, name: 'Chandelure', level: 43, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Dano neutro alto.', keyMoves: ['Shadow Ball'] },
              { id: 530, name: 'Excadrill', level: 43, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resiste a dragão.', keyMoves: ['Rock Slide'] },
              { id: 604, name: 'Eelektross', level: 43, types: ['electric'], location: 'Evolução', notes: 'Dragon Claw (TM).', keyMoves: ['Dragon Claw'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Neutro. Use Gelo.',
            team: [
              { id: 614, name: 'Beartic', level: 42, types: ['ice'], location: 'Twist Mountain', notes: 'MVP.', keyMoves: ['Icicle Crash'] },
              { id: 584, name: 'Vanilluxe', level: 47, types: ['ice'], location: 'Evolução', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 500, name: 'Emboar', level: 45, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Hammer Arm.', keyMoves: ['Hammer Arm'] },
              { id: 621, name: 'Druddigon', level: 42, types: ['dragon'], location: 'Dragonspiral Tower', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
              { id: 530, name: 'Excadrill', level: 43, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resiste a dragão.', keyMoves: ['Earthquake'] },
              { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], location: 'Rota 11', notes: 'Resiste a dragão.', keyMoves: ['Iron Head'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Samurott aprende Ice Beam.',
            team: [
              { id: 503, name: 'Samurott', level: 45, types: ['water'], location: 'Evolução', notes: 'Ice Beam (TM) é super efetivo.', keyMoves: ['Ice Beam'] },
              { id: 614, name: 'Beartic', level: 42, types: ['ice'], location: 'Twist Mountain', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 584, name: 'Vanilluxe', level: 47, types: ['ice'], location: 'Evolução', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 621, name: 'Druddigon', level: 42, types: ['dragon'], location: 'Dragonspiral Tower', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
              { id: 612, name: 'Haxorus', level: 48, types: ['dragon'], location: 'Evolução', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
              { id: 530, name: 'Excadrill', level: 43, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resistência.', keyMoves: ['Earthquake'] }
            ]
          }
        ]
      },
      {
        id: 'shauntal',
        name: 'Shauntal',
        specialty: 'ghost',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Fantasma.',
        acePokemonId: 609,
        team: [
          { id: 563, name: 'Cofagrigus', level: 48, types: ['ghost'], counters: [{ id: 635, name: 'Hydreigon', description: 'Dark Pulse' }, { id: 609, name: 'Chandelure', description: 'Shadow Ball' }] },
          { id: 593, name: 'Jellicent', level: 48, types: ['water', 'ghost'], counters: [{ id: 497, name: 'Serperior', description: 'Leaf Blade' }, { id: 604, name: 'Eelektross', description: 'Thunderbolt' }] },
          { id: 623, name: 'Golurk', level: 48, types: ['ground', 'ghost'], counters: [{ id: 503, name: 'Samurott', description: 'Surf' }, { id: 584, name: 'Vanilluxe', description: 'Ice Beam' }] },
          { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], counters: [{ id: 503, name: 'Samurott', description: 'Surf' }, { id: 551, name: 'Krookodile', description: 'Crunch' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Dark/Ghost.',
            team: [
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road (Zweilous)', notes: 'Dark Pulse varre o time.', keyMoves: ['Dark Pulse'] },
              { id: 551, name: 'Krookodile', level: 48, types: ['ground', 'dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], location: 'Rota 11', notes: 'Night Slash.', keyMoves: ['Night Slash'] },
              { id: 497, name: 'Serperior', level: 50, types: ['grass'], location: 'Evolução', notes: 'Leaf Blade em Jellicent/Golurk.', keyMoves: ['Leaf Blade'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Use Dark.',
            team: [
              { id: 551, name: 'Krookodile', level: 48, types: ['ground', 'dark'], location: 'Evolução', notes: 'Crunch/Earthquake.', keyMoves: ['Crunch'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 500, name: 'Emboar', level: 50, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Scald (TM) para Golurk.', keyMoves: ['Scald'] },
              { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], location: 'Rota 11', notes: 'Night Slash.', keyMoves: ['Night Slash'] },
              { id: 604, name: 'Eelektross', level: 50, types: ['electric'], location: 'Evolução', notes: 'Crunch/Thunderbolt.', keyMoves: ['Crunch'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Samurott e Dark types.',
            team: [
              { id: 503, name: 'Samurott', level: 50, types: ['water'], location: 'Evolução', notes: 'Surf em Chandelure/Golurk.', keyMoves: ['Surf'] },
              { id: 551, name: 'Krookodile', level: 48, types: ['ground', 'dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], location: 'Rota 11', notes: 'Night Slash.', keyMoves: ['Night Slash'] }
            ]
          }
        ]
      },
      {
        id: 'grimsley',
        name: 'Grimsley',
        specialty: 'dark',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Noturno.',
        acePokemonId: 625,
        team: [
          { id: 560, name: 'Scrafty', level: 48, types: ['dark', 'fighting'], counters: [{ id: 521, name: 'Unfezant', description: 'Fly' }, { id: 534, name: 'Conkeldurr', description: 'Hammer Arm' }] },
          { id: 553, name: 'Krookodile', level: 48, types: ['ground', 'dark'], counters: [{ id: 503, name: 'Samurott', description: 'Surf' }, { id: 539, name: 'Sawk', description: 'Close Combat' }] },
          { id: 510, name: 'Liepard', level: 48, types: ['dark'], counters: [{ id: 534, name: 'Conkeldurr', description: 'Hammer Arm' }, { id: 500, name: 'Emboar', description: 'Hammer Arm' }] },
          { id: 625, name: 'Bisharp', level: 50, types: ['dark', 'steel'], counters: [{ id: 500, name: 'Emboar', description: 'Hammer Arm (4x)' }, { id: 534, name: 'Conkeldurr', description: 'Hammer Arm (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Lutadores.',
            team: [
              { id: 534, name: 'Conkeldurr', level: 50, types: ['fighting'], location: 'Evolução', notes: 'Destrói Dark types. Hammer Arm.', keyMoves: ['Hammer Arm'] },
              { id: 539, name: 'Sawk', level: 50, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
              { id: 637, name: 'Volcarona', level: 70, types: ['bug', 'fire'], location: 'Relic Castle (Post/Late)', notes: 'Bug Buzz mata Dark.', keyMoves: ['Bug Buzz'] },
              { id: 538, name: 'Throh', level: 50, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Superpower.', keyMoves: ['Superpower'] },
              { id: 589, name: 'Escavalier', level: 50, types: ['bug', 'steel'], location: 'Evolução', notes: 'X-Scissor.', keyMoves: ['X-Scissor'] },
              { id: 497, name: 'Serperior', level: 50, types: ['grass'], location: 'Evolução', notes: 'Coil + Leaf Blade.', keyMoves: ['Leaf Blade'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Emboar destrói tudo.',
            team: [
              { id: 500, name: 'Emboar', level: 52, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Hammer Arm em Bisharp (4x) e outros.', keyMoves: ['Hammer Arm'] },
              { id: 534, name: 'Conkeldurr', level: 50, types: ['fighting'], location: 'Evolução', notes: 'Mach Punch/Hammer Arm.', keyMoves: ['Hammer Arm'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Brick Break.', keyMoves: ['Brick Break'] },
              { id: 539, name: 'Sawk', level: 50, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
              { id: 596, name: 'Galvantula', level: 50, types: ['bug', 'electric'], location: 'Evolução', notes: 'Bug Buzz.', keyMoves: ['Bug Buzz'] },
              { id: 612, name: 'Haxorus', level: 50, types: ['dragon'], location: 'Evolução', notes: 'Brick Break (TM).', keyMoves: ['Brick Break'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Samurott e Lutadores.',
            team: [
              { id: 503, name: 'Samurott', level: 50, types: ['water'], location: 'Evolução', notes: 'Megahorn (Bug) para Dark.', keyMoves: ['Megahorn'] },
              { id: 534, name: 'Conkeldurr', level: 50, types: ['fighting'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Hammer Arm'] },
              { id: 539, name: 'Sawk', level: 50, types: ['fighting'], location: 'Pinwheel Forest', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Brick Break.', keyMoves: ['Brick Break'] },
              { id: 589, name: 'Escavalier', level: 50, types: ['bug', 'steel'], location: 'Evolução', notes: 'X-Scissor.', keyMoves: ['X-Scissor'] },
              { id: 542, name: 'Leavanny', level: 50, types: ['bug', 'grass'], location: 'Lostlorn Forest', notes: 'X-Scissor.', keyMoves: ['X-Scissor'] }
            ]
          }
        ]
      },
      {
        id: 'caitlin',
        name: 'Caitlin',
        specialty: 'psychic',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Psíquico.',
        acePokemonId: 576,
        team: [
          { id: 579, name: 'Reuniclus', level: 48, types: ['psychic'], counters: [{ id: 609, name: 'Chandelure', description: 'Shadow Ball' }, { id: 635, name: 'Hydreigon', description: 'Dark Pulse' }] },
          { id: 561, name: 'Sigilyph', level: 48, types: ['psychic', 'flying'], counters: [{ id: 523, name: 'Zebstrika', description: 'Thunderbolt' }, { id: 604, name: 'Eelektross', description: 'Thunderbolt' }] },
          { id: 518, name: 'Musharna', level: 48, types: ['psychic'], counters: [{ id: 560, name: 'Scrafty', description: 'Crunch' }, { id: 635, name: 'Hydreigon', description: 'Dark Pulse' }] },
          { id: 576, name: 'Gothitelle', level: 50, types: ['psychic'], counters: [{ id: 589, name: 'Escavalier', description: 'Megahorn' }, { id: 609, name: 'Chandelure', description: 'Shadow Ball' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Dark/Ghost/Bug.',
            team: [
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Imune a psíquico. Dark Pulse.', keyMoves: ['Dark Pulse'] },
              { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 589, name: 'Escavalier', level: 50, types: ['bug', 'steel'], location: 'Evolução', notes: 'Megahorn (X-Scissor).', keyMoves: ['Megahorn'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Imune a psíquico. Crunch.', keyMoves: ['Crunch'] },
              { id: 551, name: 'Krookodile', level: 50, types: ['ground', 'dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 596, name: 'Galvantula', level: 50, types: ['bug', 'electric'], location: 'Evolução', notes: 'Bug Buzz.', keyMoves: ['Bug Buzz'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Emboar tem fraqueza, use Dark.',
            team: [
              { id: 551, name: 'Krookodile', level: 50, types: ['ground', 'dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Imune a Psíquico. Crunch.', keyMoves: ['Crunch'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] },
              { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 596, name: 'Galvantula', level: 50, types: ['bug', 'electric'], location: 'Evolução', notes: 'Bug Buzz.', keyMoves: ['Bug Buzz'] },
              { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], location: 'Rota 11', notes: 'Night Slash.', keyMoves: ['Night Slash'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Use Bug/Dark.',
            team: [
              { id: 503, name: 'Samurott', level: 50, types: ['water'], location: 'Evolução', notes: 'Megahorn.', keyMoves: ['Megahorn'] },
              { id: 560, name: 'Scrafty', level: 50, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 551, name: 'Krookodile', level: 50, types: ['ground', 'dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 589, name: 'Escavalier', level: 50, types: ['bug', 'steel'], location: 'Evolução', notes: 'Megahorn.', keyMoves: ['Megahorn'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] },
              { id: 542, name: 'Leavanny', level: 50, types: ['bug', 'grass'], location: 'Lostlorn Forest', notes: 'X-Scissor.', keyMoves: ['X-Scissor'] }
            ]
          }
        ]
      },
      {
        id: 'marshal',
        name: 'Marshal',
        specialty: 'fighting',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Lutador.',
        acePokemonId: 534,
        team: [
          { id: 538, name: 'Throh', level: 48, types: ['fighting'], counters: [{ id: 561, name: 'Sigilyph', description: 'Psychic/Air Slash' }, { id: 579, name: 'Reuniclus', description: 'Psychic' }] },
          { id: 539, name: 'Sawk', level: 48, types: ['fighting'], counters: [{ id: 521, name: 'Unfezant', description: 'Fly' }, { id: 623, name: 'Golurk', description: 'Phantom Force' }] },
          { id: 620, name: 'Mienshao', level: 48, types: ['fighting'], counters: [{ id: 609, name: 'Chandelure', description: 'Imune a Jump Kick' }, { id: 528, name: 'Swoobat', description: 'Air Slash' }] },
          { id: 534, name: 'Conkeldurr', level: 50, types: ['fighting'], counters: [{ id: 561, name: 'Sigilyph', description: 'Psychic' }, { id: 579, name: 'Reuniclus', description: 'Psychic' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Voador/Psíquico.',
            team: [
              { id: 561, name: 'Sigilyph', level: 50, types: ['psychic', 'flying'], location: 'Desert Resort', notes: 'Air Slash/Psychic mata todos.', keyMoves: ['Psychic'] },
              { id: 579, name: 'Reuniclus', level: 50, types: ['psychic'], location: 'Rota 5 (White)', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Imune a luta.', keyMoves: ['Shadow Ball'] },
              { id: 623, name: 'Golurk', level: 50, types: ['ground', 'ghost'], location: 'Victory Road', notes: 'Imune a luta. Fly.', keyMoves: ['Fly'] },
              { id: 528, name: 'Swoobat', level: 48, types: ['psychic', 'flying'], location: 'Evolução', notes: 'Air Slash.', keyMoves: ['Air Slash'] },
              { id: 567, name: 'Archeops', level: 50, types: ['rock', 'flying'], location: 'Evolução', notes: 'Acrobatics.', keyMoves: ['Acrobatics'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Desvantagem (parte Luta).',
            team: [
              { id: 561, name: 'Sigilyph', level: 50, types: ['psychic', 'flying'], location: 'Desert Resort', notes: 'MVP.', keyMoves: ['Psychic'] },
              { id: 579, name: 'Reuniclus', level: 50, types: ['psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 521, name: 'Unfezant', level: 48, types: ['normal', 'flying'], location: 'Evolução', notes: 'Fly/Aerial Ace.', keyMoves: ['Fly'] },
              { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Imune.', keyMoves: ['Shadow Ball'] },
              { id: 623, name: 'Golurk', level: 50, types: ['ground', 'ghost'], location: 'Victory Road', notes: 'Imune.', keyMoves: ['Fly'] },
              { id: 567, name: 'Archeops', level: 50, types: ['rock', 'flying'], location: 'Evolução', notes: 'Acrobatics.', keyMoves: ['Acrobatics'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Neutro. Use Voador.',
            team: [
              { id: 528, name: 'Swoobat', level: 50, types: ['psychic', 'flying'], location: 'Evolução', notes: 'Air Slash.', keyMoves: ['Air Slash'] },
              { id: 561, name: 'Sigilyph', level: 50, types: ['psychic', 'flying'], location: 'Desert Resort', notes: 'MVP.', keyMoves: ['Psychic'] },
              { id: 503, name: 'Samurott', level: 50, types: ['water'], location: 'Evolução', notes: 'Aerial Ace (TM).', keyMoves: ['Aerial Ace'] },
              { id: 609, name: 'Chandelure', level: 50, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Imune.', keyMoves: ['Shadow Ball'] },
              { id: 623, name: 'Golurk', level: 50, types: ['ground', 'ghost'], location: 'Victory Road', notes: 'Imune.', keyMoves: ['Fly'] },
              { id: 579, name: 'Reuniclus', level: 50, types: ['psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
          }
        ]
      },
      {
        id: 'ghetsis',
        name: 'Ghetsis (Final Boss)',
        specialty: 'mixed',
        badge: 'Final Boss',
        location: 'N\'s Castle',
        description: 'O líder da Team Plasma. Cuidado com Hydreigon.',
        acePokemonId: 635,
        team: [
          { id: 563, name: 'Cofagrigus', level: 52, types: ['ghost'], counters: [{ id: 635, name: 'Hydreigon', description: 'Dark Pulse' }] },
          { id: 626, name: 'Bouffalant', level: 52, types: ['normal'], counters: [{ id: 534, name: 'Conkeldurr', description: 'Hammer Arm' }, { id: 539, name: 'Sawk', description: 'Close Combat' }] },
          { id: 537, name: 'Seismitoad', level: 52, types: ['water', 'ground'], counters: [{ id: 497, name: 'Serperior', description: 'Leaf Blade (4x)' }, { id: 549, name: 'Lilligant', description: 'Petal Dance (4x)' }] },
          { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], counters: [{ id: 500, name: 'Emboar', description: 'Hammer Arm (4x)' }, { id: 534, name: 'Conkeldurr', description: 'Hammer Arm (4x)' }] },
          { id: 604, name: 'Eelektross', level: 52, types: ['electric'], counters: [{ id: 530, name: 'Excadrill', description: 'Rock Slide (Neutro forte, sem fraquezas)' }] },
          { id: 635, name: 'Hydreigon', level: 54, types: ['dark', 'dragon'], counters: [{ id: 534, name: 'Conkeldurr', description: 'Hammer Arm' }, { id: 539, name: 'Sawk', description: 'Close Combat' }] }
        ],
        recommendedTeams: [
          {
            starterId: 495, starterName: 'Snivy', description: 'Use Lutadores contra Hydreigon.',
            team: [
              { id: 534, name: 'Conkeldurr', level: 54, types: ['fighting'], location: 'Evolução', notes: 'Hammer Arm mata Hydreigon/Bisharp/Bouffalant.', keyMoves: ['Hammer Arm'] },
              { id: 497, name: 'Serperior', level: 54, types: ['grass'], location: 'Evolução', notes: 'Mata Seismitoad (4x).', keyMoves: ['Leaf Blade'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Dragon Pulse.', keyMoves: ['Dragon Pulse'] },
              { id: 530, name: 'Excadrill', level: 54, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resiste a dragão. Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 609, name: 'Chandelure', level: 54, types: ['ghost', 'fire'], location: 'Evolução', notes: 'Para Cofagrigus.', keyMoves: ['Shadow Ball'] },
              { id: 560, name: 'Scrafty', level: 54, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Crunch/Brick Break.', keyMoves: ['Brick Break'] }
            ]
          },
          {
            starterId: 498, starterName: 'Tepig', description: 'Emboar é excelente aqui.',
            team: [
              { id: 500, name: 'Emboar', level: 55, types: ['fire', 'fighting'], location: 'Evolução', notes: 'Hammer Arm destrói Hydreigon/Bisharp.', keyMoves: ['Hammer Arm'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Dragon Pulse.', keyMoves: ['Dragon Pulse'] },
              { id: 549, name: 'Lilligant', level: 54, types: ['grass'], location: 'Pinwheel Forest', notes: 'Mata Seismitoad (4x).', keyMoves: ['Giga Drain'] },
              { id: 534, name: 'Conkeldurr', level: 54, types: ['fighting'], location: 'Evolução', notes: 'Backup para Hydreigon.', keyMoves: ['Hammer Arm'] },
              { id: 530, name: 'Excadrill', level: 54, types: ['ground', 'steel'], location: 'Evolução', notes: 'Resistência.', keyMoves: ['Rock Slide'] },
              { id: 560, name: 'Scrafty', level: 54, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Bulk.', keyMoves: ['High Jump Kick'] }
            ]
          },
          {
            starterId: 501, starterName: 'Oshawott', description: 'Samurott precisa de ajuda Lutadora.',
            team: [
              { id: 534, name: 'Conkeldurr', level: 54, types: ['fighting'], location: 'Evolução', notes: 'Essencial contra Hydreigon.', keyMoves: ['Hammer Arm'] },
              { id: 503, name: 'Samurott', level: 54, types: ['water'], location: 'Evolução', notes: 'Ice Beam em Hydreigon.', keyMoves: ['Ice Beam'] },
              { id: 542, name: 'Leavanny', level: 54, types: ['bug', 'grass'], location: 'Lostlorn Forest', notes: 'Mata Seismitoad (4x).', keyMoves: ['Leaf Blade'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road', notes: 'Dragon Pulse.', keyMoves: ['Dragon Pulse'] },
              { id: 560, name: 'Scrafty', level: 54, types: ['dark', 'fighting'], location: 'Evolução', notes: 'Hi Jump Kick.', keyMoves: ['Hi Jump Kick'] },
              { id: 555, name: 'Darmanitan', level: 54, types: ['fire'], location: 'Desert Resort', notes: 'Flare Blitz.', keyMoves: ['Flare Blitz'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'xy-kalos',
    game: 'X / Y',
    region: 'Kalos',
    image: 'https://img.pokemondb.net/boxes/x.jpg',
    starters: [
      { id: 650, name: 'Chespin', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 653, name: 'Fennekin', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 656, name: 'Froakie', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'viola',
        name: 'Viola',
        specialty: 'bug',
        badge: 'Bug Badge',
        location: 'Santalune City',
        description: 'A fotógrafa de insetos.',
        acePokemonId: 666,
        team: [
          { id: 283, name: 'Surskit', level: 10, types: ['bug', 'water'], counters: [{ id: 653, name: 'Fennekin', description: 'Ember' }, { id: 25, name: 'Pikachu', description: 'Thundershock' }] },
          { id: 666, name: 'Vivillon', level: 12, types: ['bug', 'flying'], counters: [{ id: 661, name: 'Fletchling', description: 'Peck' }, { id: 25, name: 'Pikachu', description: 'Thundershock' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Desvantagem. Capture Fletchling.',
            team: [
              { id: 661, name: 'Fletchling', level: 10, types: ['normal', 'flying'], location: 'Rota 2', notes: 'Peck destrói o ginásio.', keyMoves: ['Peck'] },
              { id: 25, name: 'Pikachu', level: 10, types: ['electric'], location: 'Santalune Forest', notes: 'Thundershock em Surskit/Vivillon.', keyMoves: ['Thundershock'] },
              { id: 650, name: 'Chespin', level: 12, types: ['grass'], location: 'Inicial', notes: 'Fraco a inseto. Evite.', keyMoves: ['Rollout'] },
              { id: 513, name: 'Pansear', level: 10, types: ['fire'], location: 'Santalune Forest', notes: 'Incinerate.', keyMoves: ['Incinerate'] },
              { id: 10, name: 'Caterpie', level: 10, types: ['bug'], location: 'Rota 2', notes: 'Evolua para Butterfree (Gust).', keyMoves: ['Gust'] },
              { id: 298, name: 'Azurill', level: 8, types: ['normal', 'fairy'], location: 'Rota 3', notes: 'Tanque.', keyMoves: ['Bubble'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Vantagem Absoluta.',
            team: [
              { id: 653, name: 'Fennekin', level: 12, types: ['fire'], location: 'Inicial', notes: 'Ember queima tudo.', keyMoves: ['Ember'] },
              { id: 661, name: 'Fletchling', level: 10, types: ['normal', 'flying'], location: 'Rota 2', notes: 'Apoio aéreo.', keyMoves: ['Peck'] },
              { id: 25, name: 'Pikachu', level: 10, types: ['electric'], location: 'Santalune Forest', notes: 'Bom contra Surskit.', keyMoves: ['Thundershock'] },
              { id: 511, name: 'Pansage', level: 10, types: ['grass'], location: 'Santalune Forest', notes: 'Fraco, mas disponível.', keyMoves: ['Vine Whip'] },
              { id: 298, name: 'Azurill', level: 8, types: ['normal', 'fairy'], location: 'Rota 3', notes: 'Tanque.', keyMoves: ['Bubble'] },
              { id: 16, name: 'Pidgey', level: 10, types: ['normal', 'flying'], location: 'Rota 2', notes: 'Gust.', keyMoves: ['Gust'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Neutro.',
            team: [
              { id: 656, name: 'Froakie', level: 12, types: ['water'], location: 'Inicial', notes: 'Bubble.', keyMoves: ['Bubble'] },
              { id: 661, name: 'Fletchling', level: 10, types: ['normal', 'flying'], location: 'Rota 2', notes: 'MVP.', keyMoves: ['Peck'] },
              { id: 25, name: 'Pikachu', level: 10, types: ['electric'], location: 'Santalune Forest', notes: 'Thundershock.', keyMoves: ['Thundershock'] },
              { id: 515, name: 'Panpour', level: 10, types: ['water'], location: 'Santalune Forest', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
              { id: 10, name: 'Caterpie', level: 10, types: ['bug'], location: 'Rota 2', notes: 'Butterfree com Gust.', keyMoves: ['Gust'] },
              { id: 263, name: 'Zigzagoon', level: 8, types: ['normal'], location: 'Rota 2', notes: 'Pickup (Itens).', keyMoves: ['Tackle'] }
            ]
          }
        ]
      },
      {
        id: 'grant',
        name: 'Grant',
        specialty: 'rock',
        badge: 'Cliff Badge',
        location: 'Cyllage City',
        description: 'O escalador de montanhas.',
        acePokemonId: 696,
        team: [
          { id: 698, name: 'Amaura', level: 25, types: ['rock', 'ice'], counters: [{ id: 448, name: 'Lucario', description: 'Force Palm (4x)' }, { id: 696, name: 'Tyrunt', description: 'Rock Tomb' }] },
          { id: 696, name: 'Tyrunt', level: 25, types: ['rock', 'dragon'], counters: [{ id: 448, name: 'Lucario', description: 'Force Palm' }, { id: 700, name: 'Sylveon', description: 'Fairy Wind' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Quilladin tem vantagem.',
            team: [
              { id: 651, name: 'Quilladin', level: 26, types: ['grass'], location: 'Evolução', notes: 'Needle Arm/Bite.', keyMoves: ['Needle Arm'] },
              { id: 448, name: 'Lucario', level: 32, types: ['fighting', 'steel'], location: 'Tower of Mastery (Gift)', notes: 'Force Palm/Power-Up Punch destrói o ginásio.', keyMoves: ['Power-Up Punch'] },
              { id: 8, name: 'Wartortle', level: 25, types: ['water'], location: 'Lumiose City (Gift)', notes: 'Water Pulse.', keyMoves: ['Water Pulse'] },
              { id: 679, name: 'Honedge', level: 22, types: ['steel', 'ghost'], location: 'Rota 6', notes: 'Resiste a tudo.', keyMoves: ['Shadow Sneak'] },
              { id: 696, name: 'Tyrunt', level: 20, types: ['rock', 'dragon'], location: 'Fossil', notes: 'Resiste.', keyMoves: ['Rock Tomb'] },
              { id: 672, name: 'Skiddo', level: 20, types: ['grass'], location: 'Rota 5', notes: 'Razor Leaf.', keyMoves: ['Razor Leaf'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Desvantagem. Use Lucario.',
            team: [
              { id: 448, name: 'Lucario', level: 32, types: ['fighting', 'steel'], location: 'Gift', notes: 'MVP. Power-Up Punch.', keyMoves: ['Power-Up Punch'] },
              { id: 8, name: 'Wartortle', level: 25, types: ['water'], location: 'Lumiose City (Gift)', notes: 'Water Pulse.', keyMoves: ['Water Pulse'] },
              { id: 679, name: 'Honedge', level: 22, types: ['steel', 'ghost'], location: 'Rota 6', notes: 'Imune a normal, resiste a pedra.', keyMoves: ['Aerial Ace'] },
              { id: 654, name: 'Braixen', level: 26, types: ['fire'], location: 'Evolução', notes: 'Fraca a pedra. Evite.', keyMoves: ['Psybeam'] },
              { id: 299, name: 'Nosepass', level: 20, types: ['rock'], location: 'Rota 10', notes: 'Tanque.', keyMoves: ['Rock Throw'] },
              { id: 674, name: 'Pancham', level: 20, types: ['fighting'], location: 'Rota 5', notes: 'Karate Chop.', keyMoves: ['Karate Chop'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Vantagem Absoluta.',
            team: [
              { id: 657, name: 'Frogadier', level: 26, types: ['water'], location: 'Evolução', notes: 'Water Pulse.', keyMoves: ['Water Pulse'] },
              { id: 448, name: 'Lucario', level: 32, types: ['fighting', 'steel'], location: 'Gift', notes: 'Backup de luxo.', keyMoves: ['Power-Up Punch'] },
              { id: 2, name: 'Ivysaur', level: 25, types: ['grass', 'poison'], location: 'Lumiose City (Gift)', notes: 'Razor Leaf.', keyMoves: ['Razor Leaf'] },
              { id: 679, name: 'Honedge', level: 22, types: ['steel', 'ghost'], location: 'Rota 6', notes: 'Resiste.', keyMoves: ['Shadow Sneak'] },
              { id: 698, name: 'Amaura', level: 20, types: ['rock', 'ice'], location: 'Fossil', notes: 'Refrigerate.', keyMoves: ['Take Down'] },
              { id: 694, name: 'Helioptile', level: 20, types: ['electric', 'normal'], location: 'Rota 9', notes: 'Dano neutro.', keyMoves: ['Parabolic Charge'] }
            ]
          }
        ]
      },
      {
        id: 'korrina',
        name: 'Korrina',
        specialty: 'fighting',
        badge: 'Rumble Badge',
        location: 'Shalour City',
        description: 'A herdeira da Mega Evolução.',
        acePokemonId: 701,
        team: [
          { id: 619, name: 'Mienfoo', level: 29, types: ['fighting'], counters: [{ id: 700, name: 'Sylveon', description: 'Draining Kiss' }, { id: 662, name: 'Fletchinder', description: 'Acrobatics' }] },
          { id: 67, name: 'Machoke', level: 28, types: ['fighting'], counters: [{ id: 679, name: 'Honedge', description: 'Imune' }, { id: 700, name: 'Sylveon', description: 'Fairy Wind' }] },
          { id: 701, name: 'Hawlucha', level: 32, types: ['fighting', 'flying'], counters: [{ id: 700, name: 'Sylveon', description: 'Draining Kiss' }, { id: 25, name: 'Pikachu', description: 'Thunderbolt' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Cuidado com Hawlucha.',
            team: [
              { id: 679, name: 'Honedge', level: 30, types: ['steel', 'ghost'], location: 'Rota 6', notes: 'Imune a golpes lutadores. MVP.', keyMoves: ['Shadow Sneak', 'Aerial Ace'] },
              { id: 662, name: 'Fletchinder', level: 30, types: ['fire', 'flying'], location: 'Evolução', notes: 'Acrobatics destrói.', keyMoves: ['Acrobatics'] },
              { id: 700, name: 'Sylveon', level: 29, types: ['fairy'], location: 'Evolução (Eevee Rota 10)', notes: 'Draining Kiss.', keyMoves: ['Draining Kiss'] },
              { id: 184, name: 'Azumarill', level: 30, types: ['water', 'fairy'], location: 'Rota 22', notes: 'Play Rough.', keyMoves: ['Play Rough'] },
              { id: 651, name: 'Quilladin', level: 30, types: ['grass'], location: 'Evolução', notes: 'Fraco a Hawlucha. Evite.', keyMoves: ['Needle Arm'] },
              { id: 64, name: 'Kadabra', level: 28, types: ['psychic'], location: 'Rota 11', notes: 'Psybeam.', keyMoves: ['Psybeam'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Braixen ajuda com Psíquico.',
            team: [
              { id: 654, name: 'Braixen', level: 30, types: ['fire'], location: 'Evolução', notes: 'Psybeam é super efetivo.', keyMoves: ['Psybeam'] },
              { id: 679, name: 'Honedge', level: 30, types: ['steel', 'ghost'], location: 'Rota 6', notes: 'Parede impenetrável.', keyMoves: ['Shadow Sneak'] },
              { id: 662, name: 'Fletchinder', level: 30, types: ['fire', 'flying'], location: 'Evolução', notes: 'Acrobatics.', keyMoves: ['Acrobatics'] },
              { id: 700, name: 'Sylveon', level: 29, types: ['fairy'], location: 'Eevee (Rota 10)', notes: 'Moonblast/Draining Kiss.', keyMoves: ['Draining Kiss'] },
              { id: 196, name: 'Espeon', level: 29, types: ['psychic'], location: 'Eevee (Felicidade Dia)', notes: 'Psybeam.', keyMoves: ['Psybeam'] },
              { id: 169, name: 'Crobat', level: 30, types: ['poison', 'flying'], location: 'Connecting Cave', notes: 'Resiste 4x a luta.', keyMoves: ['Wing Attack'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Use Voador/Fada.',
            team: [
              { id: 662, name: 'Fletchinder', level: 30, types: ['fire', 'flying'], location: 'Rota 2', notes: 'Acrobatics.', keyMoves: ['Acrobatics'] },
              { id: 679, name: 'Honedge', level: 30, types: ['steel', 'ghost'], location: 'Rota 6', notes: 'Imune.', keyMoves: ['Aerial Ace'] },
              { id: 657, name: 'Frogadier', level: 30, types: ['water'], location: 'Evolução', notes: 'Neutro.', keyMoves: ['Water Pulse'] },
              { id: 678, name: 'Meowstic', level: 28, types: ['psychic'], location: 'Rota 6', notes: 'Psybeam.', keyMoves: ['Psybeam'] },
              { id: 700, name: 'Sylveon', level: 29, types: ['fairy'], location: 'Eevee', notes: 'Draining Kiss.', keyMoves: ['Draining Kiss'] },
              { id: 448, name: 'Lucario', level: 32, types: ['fighting', 'steel'], location: 'Gift', notes: 'Bone Rush.', keyMoves: ['Bone Rush'] }
            ]
          }
        ]
      },
      {
        id: 'ramos',
        name: 'Ramos',
        specialty: 'grass',
        badge: 'Plant Badge',
        location: 'Coumarine City',
        description: 'O jardineiro veterano.',
        acePokemonId: 673,
        team: [
          { id: 189, name: 'Jumpluff', level: 30, types: ['grass', 'flying'], counters: [{ id: 615, name: 'Cryogonal', description: 'Ice Beam (4x)' }, { id: 663, name: 'Talonflame', description: 'Flame Charge' }] },
          { id: 70, name: 'Weepinbell', level: 31, types: ['grass', 'poison'], counters: [{ id: 655, name: 'Delphox', description: 'Mystical Fire' }, { id: 663, name: 'Talonflame', description: 'Fly' }] },
          { id: 673, name: 'Gogoat', level: 34, types: ['grass'], counters: [{ id: 663, name: 'Talonflame', description: 'Fly' }, { id: 658, name: 'Greninja', description: 'Ice Beam (Protean)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Fogo/Voador.',
            team: [
              { id: 663, name: 'Talonflame', level: 35, types: ['fire', 'flying'], location: 'Evolução', notes: 'Destrói o ginásio sozinho.', keyMoves: ['Fly', 'Flame Charge'] },
              { id: 6, name: 'Charizard', level: 36, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 131, name: 'Lapras', level: 30, types: ['water', 'ice'], location: 'Rota 12 (Gift)', notes: 'Ice Beam em Jumpluff/Gogoat.', keyMoves: ['Ice Beam'] },
              { id: 652, name: 'Chesnaught', level: 36, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Needle Arm'] },
              { id: 681, name: 'Aegislash', level: 35, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Resiste a tudo.', keyMoves: ['Iron Head'] },
              { id: 699, name: 'Aurorus', level: 39, types: ['rock', 'ice'], location: 'Evolução', notes: 'Freeze-Dry.', keyMoves: ['Freeze-Dry'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Vantagem Absoluta.',
            team: [
              { id: 655, name: 'Delphox', level: 36, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Mystical Fire/Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 663, name: 'Talonflame', level: 35, types: ['fire', 'flying'], location: 'Evolução', notes: 'Acrobatics/Fly.', keyMoves: ['Fly'] },
              { id: 131, name: 'Lapras', level: 30, types: ['water', 'ice'], location: 'Rota 12', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 169, name: 'Crobat', level: 35, types: ['poison', 'flying'], location: 'Evolução', notes: 'Cross Poison em Gogoat.', keyMoves: ['Cross Poison'] },
              { id: 701, name: 'Hawlucha', level: 30, types: ['fighting', 'flying'], location: 'Rota 10', notes: 'Flying Press.', keyMoves: ['Flying Press'] },
              { id: 681, name: 'Aegislash', level: 35, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Imune a Poison Powder.', keyMoves: ['Shadow Claw'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Use Voador/Gelo.',
            team: [
              { id: 663, name: 'Talonflame', level: 35, types: ['fire', 'flying'], location: 'Evolução', notes: 'Essencial.', keyMoves: ['Fly'] },
              { id: 658, name: 'Greninja', level: 36, types: ['water', 'dark'], location: 'Evolução', notes: 'Ice Beam (TM) ajuda muito.', keyMoves: ['Ice Beam'] },
              { id: 131, name: 'Lapras', level: 30, types: ['water', 'ice'], location: 'Rota 12', notes: 'Ice Beam mata Jumpluff (4x).', keyMoves: ['Ice Beam'] },
              { id: 6, name: 'Charizard', level: 36, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 448, name: 'Lucario', level: 35, types: ['fighting', 'steel'], location: 'Gift', notes: 'Imune a Poison.', keyMoves: ['Aura Sphere'] },
              { id: 707, name: 'Klefki', level: 34, types: ['steel', 'fairy'], location: 'Rota 15', notes: 'Imune a veneno.', keyMoves: ['Draining Kiss'] }
            ]
          }
        ]
      },
      {
        id: 'clemont',
        name: 'Clemont',
        specialty: 'electric',
        badge: 'Voltage Badge',
        location: 'Lumiose City',
        description: 'O inventor genial.',
        acePokemonId: 695,
        team: [
          { id: 587, name: 'Emolga', level: 35, types: ['electric', 'flying'], counters: [{ id: 697, name: 'Tyrantrum', description: 'Rock Slide' }, { id: 460, name: 'Abomasnow', description: 'Ice Shard' }] },
          { id: 82, name: 'Magneton', level: 35, types: ['electric', 'steel'], counters: [{ id: 652, name: 'Chesnaught', description: 'Hammer Arm' }, { id: 660, name: 'Diggersby', description: 'Earthquake' }] },
          { id: 695, name: 'Heliolisk', level: 37, types: ['electric', 'normal'], counters: [{ id: 660, name: 'Diggersby', description: 'Earthquake' }, { id: 448, name: 'Lucario', description: 'Aura Sphere' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Chesnaught e Ground types.',
            team: [
              { id: 652, name: 'Chesnaught', level: 38, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Hammer Arm em Magneton/Heliolisk.', keyMoves: ['Hammer Arm'] },
              { id: 660, name: 'Diggersby', level: 36, types: ['normal', 'ground'], location: 'Evolução', notes: 'Imune a elétrico. Earthquake.', keyMoves: ['Earthquake'] },
              { id: 445, name: 'Garchomp', level: 48, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Imune.', keyMoves: ['Dig'] },
              { id: 697, name: 'Tyrantrum', level: 39, types: ['rock', 'dragon'], location: 'Evolução', notes: 'Resiste a normal/elétrico.', keyMoves: ['Ancient Power'] },
              { id: 450, name: 'Hippowdon', level: 36, types: ['ground'], location: 'Rota 9', notes: 'Imune.', keyMoves: ['Earthquake'] },
              { id: 706, name: 'Goodra', level: 50, types: ['dragon'], location: 'Rota 14 (Goomy)', notes: 'Resiste a elétrico.', keyMoves: ['Dragon Pulse'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Use Ground.',
            team: [
              { id: 660, name: 'Diggersby', level: 36, types: ['normal', 'ground'], location: 'Evolução', notes: 'MVP. Imune.', keyMoves: ['Earthquake'] },
              { id: 655, name: 'Delphox', level: 38, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Flamethrower em Magneton.', keyMoves: ['Flamethrower'] },
              { id: 448, name: 'Lucario', level: 38, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere em Magneton/Heliolisk.', keyMoves: ['Aura Sphere'] },
              { id: 444, name: 'Gabite', level: 30, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Imune.', keyMoves: ['Dig'] },
              { id: 208, name: 'Steelix', level: 35, types: ['steel', 'ground'], location: 'Troca (Luvdisc)', notes: 'Imune.', keyMoves: ['Earthquake'] },
              { id: 3, name: 'Venusaur', level: 36, types: ['grass', 'poison'], location: 'Lumiose (Gift)', notes: 'Resiste.', keyMoves: ['Petal Dance'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Desvantagem. Use Ground.',
            team: [
              { id: 660, name: 'Diggersby', level: 36, types: ['normal', 'ground'], location: 'Evolução', notes: 'Essencial. Imune.', keyMoves: ['Earthquake'] },
              { id: 444, name: 'Gabite', level: 30, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Imune.', keyMoves: ['Dig'] },
              { id: 697, name: 'Tyrantrum', level: 39, types: ['rock', 'dragon'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Dragon Claw'] },
              { id: 658, name: 'Greninja', level: 38, types: ['water', 'dark'], location: 'Evolução', notes: 'Fraco. Evite.', keyMoves: ['Extrasensory'] },
              { id: 709, name: 'Trevenant', level: 35, types: ['ghost', 'grass'], location: 'Rota 20', notes: 'Resiste.', keyMoves: ['Shadow Claw'] },
              { id: 31, name: 'Nidoqueen', level: 36, types: ['poison', 'ground'], location: 'Rota 11', notes: 'Imune.', keyMoves: ['Earth Power'] }
            ]
          }
        ]
      },
      {
        id: 'valerie',
        name: 'Valerie',
        specialty: 'fairy',
        badge: 'Fairy Badge',
        location: 'Laverre City',
        description: 'A estilista de fadas.',
        acePokemonId: 700,
        team: [
          { id: 303, name: 'Mawile', level: 38, types: ['steel', 'fairy'], counters: [{ id: 655, name: 'Delphox', description: 'Flamethrower' }, { id: 6, name: 'Charizard', description: 'Flamethrower' }] },
          { id: 122, name: 'Mr. Mime', level: 39, types: ['psychic', 'fairy'], counters: [{ id: 681, name: 'Aegislash', description: 'Shadow Ball/Iron Head' }, { id: 687, name: 'Malamar', description: 'Night Slash' }] },
          { id: 700, name: 'Sylveon', level: 42, types: ['fairy'], counters: [{ id: 681, name: 'Aegislash', description: 'Iron Head' }, { id: 3, name: 'Venusaur', description: 'Sludge Bomb' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Aço/Veneno.',
            team: [
              { id: 681, name: 'Aegislash', level: 40, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head destrói fadas. Resiste a tudo.', keyMoves: ['Iron Head'] },
              { id: 3, name: 'Venusaur', level: 40, types: ['grass', 'poison'], location: 'Lumiose (Gift)', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 652, name: 'Chesnaught', level: 40, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Fraco a Fada. Evite.', keyMoves: ['Seed Bomb'] },
              { id: 448, name: 'Lucario', level: 40, types: ['fighting', 'steel'], location: 'Gift', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] },
              { id: 707, name: 'Klefki', level: 38, types: ['steel', 'fairy'], location: 'Rota 15', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] },
              { id: 663, name: 'Talonflame', level: 40, types: ['fire', 'flying'], location: 'Evolução', notes: 'Mata Mawile.', keyMoves: ['Flare Blitz'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Fogo é bom contra Mawile/Klefki.',
            team: [
              { id: 655, name: 'Delphox', level: 42, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Flamethrower em Mawile.', keyMoves: ['Flamethrower'] },
              { id: 681, name: 'Aegislash', level: 40, types: ['steel', 'ghost'], location: 'Rota 6', notes: 'MVP. Iron Head.', keyMoves: ['Iron Head'] },
              { id: 73, name: 'Tentacruel', level: 40, types: ['water', 'poison'], location: 'Surf', notes: 'Sludge Wave.', keyMoves: ['Sludge Wave'] },
              { id: 591, name: 'Amoonguss', level: 39, types: ['grass', 'poison'], location: 'Rota 15', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 689, name: 'Barbaracle', level: 39, types: ['rock', 'water'], location: 'Evolução', notes: 'Poison Jab (TM).', keyMoves: ['Poison Jab'] },
              { id: 448, name: 'Lucario', level: 40, types: ['fighting', 'steel'], location: 'Gift', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Greninja aprende Gunk Shot.',
            team: [
              { id: 658, name: 'Greninja', level: 42, types: ['water', 'dark'], location: 'Evolução', notes: 'Gunk Shot (Move Tutor/TM) ou Extrasensory.', keyMoves: ['Gunk Shot'] },
              { id: 681, name: 'Aegislash', level: 40, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 6, name: 'Charizard', level: 40, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Flamethrower em Mawile.', keyMoves: ['Flamethrower'] },
              { id: 454, name: 'Toxicroak', level: 37, types: ['poison', 'fighting'], location: 'Evolução', notes: 'Poison Jab.', keyMoves: ['Poison Jab'] },
              { id: 94, name: 'Gengar', level: 40, types: ['ghost', 'poison'], location: 'Troca', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 212, name: 'Scizor', level: 40, types: ['bug', 'steel'], location: 'Troca', notes: 'Bullet Punch.', keyMoves: ['Bullet Punch'] }
            ]
          }
        ]
      },
      {
        id: 'olympia',
        name: 'Olympia',
        specialty: 'psychic',
        badge: 'Psychic Badge',
        location: 'Anistar City',
        description: 'A vidente das estrelas.',
        acePokemonId: 678,
        team: [
          { id: 561, name: 'Sigilyph', level: 44, types: ['psychic', 'flying'], counters: [{ id: 658, name: 'Greninja', description: 'Dark Pulse' }, { id: 681, name: 'Aegislash', description: 'Shadow Ball' }] },
          { id: 199, name: 'Slowking', level: 45, types: ['water', 'psychic'], counters: [{ id: 652, name: 'Chesnaught', description: 'Seed Bomb' }, { id: 681, name: 'Aegislash', description: 'Shadow Ball' }] },
          { id: 678, name: 'Meowstic', level: 48, types: ['psychic'], counters: [{ id: 681, name: 'Aegislash', description: 'Shadow Claw' }, { id: 630, name: 'Mandibuzz', description: 'Foul Play' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Fantasma/Dark.',
            team: [
              { id: 681, name: 'Aegislash', level: 45, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Shadow Claw/Ball destrói o ginásio.', keyMoves: ['Shadow Ball'] },
              { id: 652, name: 'Chesnaught', level: 45, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Seed Bomb em Slowking. Cuidado com Psychic.', keyMoves: ['Seed Bomb'] },
              { id: 687, name: 'Malamar', level: 44, types: ['dark', 'psychic'], location: 'Evolução', notes: 'Imune a Psíquico. Night Slash.', keyMoves: ['Night Slash'] },
              { id: 609, name: 'Chandelure', level: 45, types: ['ghost', 'fire'], location: 'Lost Hotel', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 635, name: 'Hydreigon', level: 64, types: ['dark', 'dragon'], location: 'Victory Road (Late)', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] },
              { id: 359, name: 'Absol', level: 40, types: ['dark'], location: 'Rota 8', notes: 'Night Slash.', keyMoves: ['Night Slash'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Delphox resiste. Use Dark.',
            team: [
              { id: 681, name: 'Aegislash', level: 45, types: ['steel', 'ghost'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Shadow Ball'] },
              { id: 655, name: 'Delphox', level: 46, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Shadow Ball (TM).', keyMoves: ['Shadow Ball'] },
              { id: 687, name: 'Malamar', level: 44, types: ['dark', 'psychic'], location: 'Evolução', notes: 'Imune.', keyMoves: ['Night Slash'] },
              { id: 658, name: 'Greninja', level: 46, types: ['water', 'dark'], location: 'Troca', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] },
              { id: 248, name: 'Tyranitar', level: 55, types: ['rock', 'dark'], location: 'Rota 18', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 625, name: 'Bisharp', level: 52, types: ['dark', 'steel'], location: 'Rota 15', notes: 'Night Slash.', keyMoves: ['Night Slash'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Vantagem Absoluta.',
            team: [
              { id: 658, name: 'Greninja', level: 48, types: ['water', 'dark'], location: 'Evolução', notes: 'Dark Pulse/Night Slash varre o ginásio. Imune a Psíquico.', keyMoves: ['Dark Pulse'] },
              { id: 681, name: 'Aegislash', level: 45, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 687, name: 'Malamar', level: 44, types: ['dark', 'psychic'], location: 'Evolução', notes: 'Imune.', keyMoves: ['Night Slash'] },
              { id: 609, name: 'Chandelure', level: 45, types: ['ghost', 'fire'], location: 'Lost Hotel', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 452, name: 'Drapion', level: 40, types: ['poison', 'dark'], location: 'Rota 19', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 717, name: 'Yveltal', level: 50, types: ['dark', 'flying'], location: 'Team Flare HQ', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] }
            ]
          }
        ]
      },
      {
        id: 'wulfric',
        name: 'Wulfric',
        specialty: 'ice',
        badge: 'Iceberg Badge',
        location: 'Snowbelle City',
        description: 'O iceberg ambulante.',
        acePokemonId: 713,
        team: [
          { id: 460, name: 'Abomasnow', level: 56, types: ['grass', 'ice'], counters: [{ id: 663, name: 'Talonflame', description: 'Flare Blitz (4x)' }, { id: 655, name: 'Delphox', description: 'Flamethrower (4x)' }] },
          { id: 615, name: 'Cryogonal', level: 55, types: ['ice'], counters: [{ id: 448, name: 'Lucario', description: 'Aura Sphere' }, { id: 681, name: 'Aegislash', description: 'Iron Head' }] },
          { id: 713, name: 'Avalugg', level: 59, types: ['ice'], counters: [{ id: 655, name: 'Delphox', description: 'Flamethrower' }, { id: 448, name: 'Lucario', description: 'Aura Sphere' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Fogo/Luta.',
            team: [
              { id: 663, name: 'Talonflame', level: 58, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flare Blitz destrói Abomasnow.', keyMoves: ['Flare Blitz'] },
              { id: 448, name: 'Lucario', level: 55, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere mata Avalugg.', keyMoves: ['Aura Sphere'] },
              { id: 681, name: 'Aegislash', level: 55, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 6, name: 'Charizard', level: 55, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 652, name: 'Chesnaught', level: 58, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Hammer Arm.', keyMoves: ['Hammer Arm'] },
              { id: 668, name: 'Pyroar', level: 50, types: ['fire', 'normal'], location: 'Evolução', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Vantagem Absoluta.',
            team: [
              { id: 655, name: 'Delphox', level: 60, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Flamethrower derrete o ginásio.', keyMoves: ['Flamethrower'] },
              { id: 448, name: 'Lucario', level: 55, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 681, name: 'Aegislash', level: 55, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 663, name: 'Talonflame', level: 58, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flare Blitz.', keyMoves: ['Flare Blitz'] },
              { id: 697, name: 'Tyrantrum', level: 55, types: ['rock', 'dragon'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 689, name: 'Barbaracle', level: 55, types: ['rock', 'water'], location: 'Evolução', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Use Fogo/Aço.',
            team: [
              { id: 663, name: 'Talonflame', level: 58, types: ['fire', 'flying'], location: 'Evolução', notes: 'Essencial.', keyMoves: ['Flare Blitz'] },
              { id: 448, name: 'Lucario', level: 55, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 681, name: 'Aegislash', level: 55, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 6, name: 'Charizard', level: 55, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 658, name: 'Greninja', level: 60, types: ['water', 'dark'], location: 'Evolução', notes: 'Neutro.', keyMoves: ['Dark Pulse'] },
              { id: 539, name: 'Sawk', level: 50, types: ['fighting'], location: 'Rota 11', notes: 'Close Combat.', keyMoves: ['Close Combat'] }
            ]
          }
        ]
      },
      {
        id: 'malva',
        name: 'Malva',
        specialty: 'fire',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Fogo.',
        acePokemonId: 663,
        team: [
          { id: 668, name: 'Pyroar', level: 63, types: ['fire', 'normal'], counters: [{ id: 658, name: 'Greninja', description: 'Surf' }, { id: 445, name: 'Garchomp', description: 'Earthquake' }] },
          { id: 324, name: 'Torkoal', level: 63, types: ['fire'], counters: [{ id: 658, name: 'Greninja', description: 'Surf' }, { id: 689, name: 'Barbaracle', description: 'Razor Shell' }] },
          { id: 609, name: 'Chandelure', level: 63, types: ['ghost', 'fire'], counters: [{ id: 658, name: 'Greninja', description: 'Dark Pulse' }, { id: 681, name: 'Aegislash', description: 'Shadow Ball' }] },
          { id: 663, name: 'Talonflame', level: 65, types: ['fire', 'flying'], counters: [{ id: 689, name: 'Barbaracle', description: 'Stone Edge (4x)' }, { id: 464, name: 'Rhyperior', description: 'Rock Wrecker' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Água/Pedra.',
            team: [
              { id: 689, name: 'Barbaracle', level: 65, types: ['rock', 'water'], location: 'Evolução', notes: 'Stone Edge mata Talonflame (4x).', keyMoves: ['Stone Edge'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 658, name: 'Greninja', level: 65, types: ['water', 'dark'], location: 'Troca', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 131, name: 'Lapras', level: 60, types: ['water', 'ice'], location: 'Rota 12', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 697, name: 'Tyrantrum', level: 65, types: ['rock', 'dragon'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 448, name: 'Lucario', level: 65, types: ['fighting', 'steel'], location: 'Gift', notes: 'Cuidado com fogo.', keyMoves: ['Earthquake'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Use Água/Terra.',
            team: [
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'MVP. Earthquake.', keyMoves: ['Earthquake'] },
              { id: 689, name: 'Barbaracle', level: 65, types: ['rock', 'water'], location: 'Evolução', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] },
              { id: 130, name: 'Gyarados', level: 60, types: ['water', 'flying'], location: 'Rota 22', notes: 'Waterfall.', keyMoves: ['Waterfall'] },
              { id: 697, name: 'Tyrantrum', level: 65, types: ['rock', 'dragon'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 655, name: 'Delphox', level: 66, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Shadow Ball'] },
              { id: 464, name: 'Rhyperior', level: 60, types: ['ground', 'rock'], location: 'Troca', notes: 'Rock Wrecker.', keyMoves: ['Rock Wrecker'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Vantagem Absoluta.',
            team: [
              { id: 658, name: 'Greninja', level: 68, types: ['water', 'dark'], location: 'Evolução', notes: 'Surf apaga o fogo.', keyMoves: ['Surf'] },
              { id: 689, name: 'Barbaracle', level: 65, types: ['rock', 'water'], location: 'Evolução', notes: 'Stone Edge em Talonflame.', keyMoves: ['Stone Edge'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 697, name: 'Tyrantrum', level: 65, types: ['rock', 'dragon'], location: 'Evolução', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 131, name: 'Lapras', level: 60, types: ['water', 'ice'], location: 'Rota 12', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 248, name: 'Tyranitar', level: 60, types: ['rock', 'dark'], location: 'Rota 18', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] }
            ]
          }
        ]
      },
      {
        id: 'siebold',
        name: 'Siebold',
        specialty: 'water',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Água.',
        acePokemonId: 689,
        team: [
          { id: 693, name: 'Clawitzer', level: 63, types: ['water'], counters: [{ id: 652, name: 'Chesnaught', description: 'Hammer Arm' }, { id: 700, name: 'Sylveon', description: 'Moonblast' }] },
          { id: 121, name: 'Starmie', level: 63, types: ['water', 'psychic'], counters: [{ id: 681, name: 'Aegislash', description: 'Shadow Ball' }, { id: 658, name: 'Greninja', description: 'Dark Pulse' }] },
          { id: 130, name: 'Gyarados', level: 63, types: ['water', 'flying'], counters: [{ id: 25, name: 'Pikachu', description: 'Thunderbolt (4x)' }, { id: 695, name: 'Heliolisk', description: 'Thunderbolt (4x)' }] },
          { id: 689, name: 'Barbaracle', level: 65, types: ['rock', 'water'], counters: [{ id: 652, name: 'Chesnaught', description: 'Wood Hammer (4x)' }, { id: 448, name: 'Lucario', description: 'Aura Sphere' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Vantagem Absoluta.',
            team: [
              { id: 652, name: 'Chesnaught', level: 68, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Wood Hammer destrói Barbaracle/Clawitzer.', keyMoves: ['Wood Hammer'] },
              { id: 695, name: 'Heliolisk', level: 60, types: ['electric', 'normal'], location: 'Evolução', notes: 'Thunderbolt em Gyarados (4x).', keyMoves: ['Thunderbolt'] },
              { id: 681, name: 'Aegislash', level: 65, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Shadow Ball em Starmie.', keyMoves: ['Shadow Ball'] },
              { id: 3, name: 'Venusaur', level: 65, types: ['grass', 'poison'], location: 'Lumiose (Gift)', notes: 'Petal Dance.', keyMoves: ['Petal Dance'] },
              { id: 700, name: 'Sylveon', level: 65, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 462, name: 'Magnezone', level: 60, types: ['electric', 'steel'], location: 'Rota 13', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Desvantagem. Use Elétrico/Planta.',
            team: [
              { id: 3, name: 'Venusaur', level: 65, types: ['grass', 'poison'], location: 'Lumiose (Gift)', notes: 'MVP. Petal Dance.', keyMoves: ['Petal Dance'] },
              { id: 695, name: 'Heliolisk', level: 60, types: ['electric', 'normal'], location: 'Evolução', notes: 'Thunderbolt em Gyarados.', keyMoves: ['Thunderbolt'] },
              { id: 681, name: 'Aegislash', level: 65, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 655, name: 'Delphox', level: 66, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Grass Knot (TM).', keyMoves: ['Grass Knot'] },
              { id: 448, name: 'Lucario', level: 65, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere em Barbaracle.', keyMoves: ['Aura Sphere'] },
              { id: 706, name: 'Goodra', level: 60, types: ['dragon'], location: 'Rota 14', notes: 'Thunderbolt (TM).', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Use Elétrico.',
            team: [
              { id: 695, name: 'Heliolisk', level: 60, types: ['electric', 'normal'], location: 'Evolução', notes: 'Essencial contra Gyarados.', keyMoves: ['Thunderbolt'] },
              { id: 658, name: 'Greninja', level: 68, types: ['water', 'dark'], location: 'Evolução', notes: 'Dark Pulse em Starmie.', keyMoves: ['Dark Pulse'] },
              { id: 652, name: 'Chesnaught', level: 60, types: ['grass', 'fighting'], location: 'Troca', notes: 'Wood Hammer.', keyMoves: ['Wood Hammer'] },
              { id: 3, name: 'Venusaur', level: 65, types: ['grass', 'poison'], location: 'Lumiose (Gift)', notes: 'Petal Dance.', keyMoves: ['Petal Dance'] },
              { id: 681, name: 'Aegislash', level: 65, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 448, name: 'Lucario', level: 65, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] }
            ]
          }
        ]
      },
      {
        id: 'wikstrom',
        name: 'Wikstrom',
        specialty: 'steel',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Aço.',
        acePokemonId: 681,
        team: [
          { id: 707, name: 'Klefki', level: 63, types: ['steel', 'fairy'], counters: [{ id: 655, name: 'Delphox', description: 'Flamethrower' }, { id: 663, name: 'Talonflame', description: 'Flare Blitz' }] },
          { id: 476, name: 'Probopass', level: 63, types: ['rock', 'steel'], counters: [{ id: 448, name: 'Lucario', description: 'Aura Sphere (4x)' }, { id: 652, name: 'Chesnaught', description: 'Hammer Arm (4x)' }] },
          { id: 212, name: 'Scizor', level: 63, types: ['bug', 'steel'], counters: [{ id: 655, name: 'Delphox', description: 'Flamethrower (4x)' }, { id: 663, name: 'Talonflame', description: 'Flare Blitz (4x)' }] },
          { id: 681, name: 'Aegislash', level: 65, types: ['steel', 'ghost'], counters: [{ id: 655, name: 'Delphox', description: 'Flamethrower' }, { id: 658, name: 'Greninja', description: 'Dark Pulse' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Fogo/Luta.',
            team: [
              { id: 663, name: 'Talonflame', level: 65, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flare Blitz mata Scizor/Klefki.', keyMoves: ['Flare Blitz'] },
              { id: 652, name: 'Chesnaught', level: 68, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Hammer Arm mata Probopass.', keyMoves: ['Hammer Arm'] },
              { id: 6, name: 'Charizard', level: 65, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 448, name: 'Lucario', level: 65, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 655, name: 'Delphox', level: 60, types: ['fire', 'psychic'], location: 'Troca', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Vantagem Absoluta.',
            team: [
              { id: 655, name: 'Delphox', level: 68, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Derrete o time todo.', keyMoves: ['Flamethrower'] },
              { id: 448, name: 'Lucario', level: 65, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere em Probopass.', keyMoves: ['Aura Sphere'] },
              { id: 663, name: 'Talonflame', level: 65, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flare Blitz.', keyMoves: ['Flare Blitz'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Earthquake em Aegislash.', keyMoves: ['Earthquake'] },
              { id: 6, name: 'Charizard', level: 65, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Backup de fogo.', keyMoves: ['Flamethrower'] },
              { id: 697, name: 'Tyrantrum', level: 65, types: ['rock', 'dragon'], location: 'Evolução', notes: 'Earthquake.', keyMoves: ['Earthquake'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Use Fogo/Luta.',
            team: [
              { id: 6, name: 'Charizard', level: 65, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'MVP. Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 663, name: 'Talonflame', level: 65, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flare Blitz.', keyMoves: ['Flare Blitz'] },
              { id: 448, name: 'Lucario', level: 65, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 658, name: 'Greninja', level: 68, types: ['water', 'dark'], location: 'Evolução', notes: 'Dark Pulse em Aegislash.', keyMoves: ['Dark Pulse'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 609, name: 'Chandelure', level: 60, types: ['ghost', 'fire'], location: 'Lost Hotel', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] }
            ]
          }
        ]
      },
      {
        id: 'drasna',
        name: 'Drasna',
        specialty: 'dragon',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four - Dragão.',
        acePokemonId: 715,
        team: [
          { id: 691, name: 'Dragalge', level: 63, types: ['poison', 'dragon'], counters: [{ id: 445, name: 'Garchomp', description: 'Earthquake' }, { id: 700, name: 'Sylveon', description: 'Moonblast' }] },
          { id: 715, name: 'Noivern', level: 65, types: ['flying', 'dragon'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 131, name: 'Lapras', description: 'Ice Beam (4x)' }] },
          { id: 621, name: 'Druddigon', level: 63, types: ['dragon'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 445, name: 'Garchomp', description: 'Dragon Claw' }] },
          { id: 334, name: 'Altaria', level: 63, types: ['dragon', 'flying'], counters: [{ id: 131, name: 'Lapras', description: 'Ice Beam (4x)' }, { id: 700, name: 'Sylveon', description: 'Moonblast' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Fada/Gelo.',
            team: [
              { id: 700, name: 'Sylveon', level: 65, types: ['fairy'], location: 'Evolução', notes: 'Imune a dragão. Moonblast.', keyMoves: ['Moonblast'] },
              { id: 131, name: 'Lapras', level: 60, types: ['water', 'ice'], location: 'Rota 12', notes: 'Ice Beam mata Noivern/Altaria (4x).', keyMoves: ['Ice Beam'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Dragon Claw. Cuidado.', keyMoves: ['Dragon Claw'] },
              { id: 707, name: 'Klefki', level: 60, types: ['steel', 'fairy'], location: 'Rota 15', notes: 'Imune a dragão. Dazzling Gleam.', keyMoves: ['Dazzling Gleam'] },
              { id: 282, name: 'Gardevoir', level: 60, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 699, name: 'Aurorus', level: 60, types: ['rock', 'ice'], location: 'Evolução', notes: 'Freeze-Dry.', keyMoves: ['Freeze-Dry'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Use Fada/Gelo.',
            team: [
              { id: 700, name: 'Sylveon', level: 65, types: ['fairy'], location: 'Evolução', notes: 'MVP. Moonblast.', keyMoves: ['Moonblast'] },
              { id: 131, name: 'Lapras', level: 60, types: ['water', 'ice'], location: 'Rota 12', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Outrage.', keyMoves: ['Outrage'] },
              { id: 655, name: 'Delphox', level: 68, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Dazzling Gleam (TM).', keyMoves: ['Dazzling Gleam'] },
              { id: 184, name: 'Azumarill', level: 60, types: ['water', 'fairy'], location: 'Rota 22', notes: 'Play Rough.', keyMoves: ['Play Rough'] },
              { id: 706, name: 'Goodra', level: 60, types: ['dragon'], location: 'Rota 14', notes: 'Dragon Pulse.', keyMoves: ['Dragon Pulse'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Greninja aprende Ice Beam.',
            team: [
              { id: 658, name: 'Greninja', level: 68, types: ['water', 'dark'], location: 'Evolução', notes: 'Ice Beam (TM) destrói dragões.', keyMoves: ['Ice Beam'] },
              { id: 700, name: 'Sylveon', level: 65, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 445, name: 'Garchomp', level: 65, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
              { id: 131, name: 'Lapras', level: 60, types: ['water', 'ice'], location: 'Rota 12', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 282, name: 'Gardevoir', level: 60, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 707, name: 'Klefki', level: 60, types: ['steel', 'fairy'], location: 'Rota 15', notes: 'Imune.', keyMoves: ['Play Rough'] }
            ]
          }
        ]
      },
      {
        id: 'diantha',
        name: 'Diantha',
        specialty: 'mixed',
        badge: 'Champion',
        location: 'Pokemon League',
        description: 'A Grande Campeã e Atriz.',
        acePokemonId: 282,
        team: [
          { id: 701, name: 'Hawlucha', level: 64, types: ['fighting', 'flying'], counters: [{ id: 663, name: 'Talonflame', description: 'Acrobatics' }, { id: 700, name: 'Sylveon', description: 'Moonblast' }] },
          { id: 697, name: 'Tyrantrum', level: 65, types: ['rock', 'dragon'], counters: [{ id: 658, name: 'Greninja', description: 'Ice Beam' }, { id: 448, name: 'Lucario', description: 'Aura Sphere' }] },
          { id: 699, name: 'Aurorus', level: 65, types: ['rock', 'ice'], counters: [{ id: 448, name: 'Lucario', description: 'Aura Sphere (4x)' }, { id: 652, name: 'Chesnaught', description: 'Hammer Arm (4x)' }] },
          { id: 711, name: 'Gourgeist', level: 65, types: ['ghost', 'grass'], counters: [{ id: 663, name: 'Talonflame', description: 'Flare Blitz' }, { id: 655, name: 'Delphox', description: 'Flamethrower' }] },
          { id: 706, name: 'Goodra', level: 66, types: ['dragon'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 445, name: 'Garchomp', description: 'Dragon Claw' }] },
          { id: 282, name: 'Gardevoir', level: 68, types: ['psychic', 'fairy'], counters: [{ id: 681, name: 'Aegislash', description: 'Iron Head (Mega)' }, { id: 658, name: 'Greninja', description: 'Gunk Shot' }] }
        ],
        recommendedTeams: [
          {
            starterId: 650, starterName: 'Chespin', description: 'Use Aço/Fogo/Fada.',
            team: [
              { id: 681, name: 'Aegislash', level: 70, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head mata Gardevoir/Aurorus. MVP.', keyMoves: ['Iron Head'] },
              { id: 663, name: 'Talonflame', level: 68, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flare Blitz em Gourgeist/Hawlucha.', keyMoves: ['Flare Blitz'] },
              { id: 448, name: 'Lucario', level: 68, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere em Aurorus/Tyrantrum.', keyMoves: ['Aura Sphere'] },
              { id: 700, name: 'Sylveon', level: 68, types: ['fairy'], location: 'Evolução', notes: 'Moonblast em Goodra/Hawlucha.', keyMoves: ['Moonblast'] },
              { id: 658, name: 'Greninja', level: 68, types: ['water', 'dark'], location: 'Troca', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 652, name: 'Chesnaught', level: 68, types: ['grass', 'fighting'], location: 'Evolução', notes: 'Wood Hammer.', keyMoves: ['Wood Hammer'] }
            ]
          },
          {
            starterId: 653, starterName: 'Fennekin', description: 'Delphox e Aço.',
            team: [
              { id: 681, name: 'Aegislash', level: 70, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head mata Gardevoir. Essencial.', keyMoves: ['Iron Head'] },
              { id: 655, name: 'Delphox', level: 70, types: ['fire', 'psychic'], location: 'Evolução', notes: 'Flamethrower em Gourgeist.', keyMoves: ['Flamethrower'] },
              { id: 448, name: 'Lucario', level: 68, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere em Aurorus.', keyMoves: ['Aura Sphere'] },
              { id: 700, name: 'Sylveon', level: 68, types: ['fairy'], location: 'Evolução', notes: 'Moonblast em Goodra.', keyMoves: ['Moonblast'] },
              { id: 445, name: 'Garchomp', level: 68, types: ['dragon', 'ground'], location: 'Rota 13', notes: 'Earthquake em Tyrantrum.', keyMoves: ['Earthquake'] },
              { id: 131, name: 'Lapras', level: 65, types: ['water', 'ice'], location: 'Rota 12', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] }
            ]
          },
          {
            starterId: 656, starterName: 'Froakie', description: 'Greninja com Protean (se tiver) é rei.',
            team: [
              { id: 658, name: 'Greninja', level: 70, types: ['water', 'dark'], location: 'Evolução', notes: 'Ice Beam em Goodra/Tyrantrum/Gourgeist.', keyMoves: ['Ice Beam'] },
              { id: 681, name: 'Aegislash', level: 70, types: ['steel', 'ghost'], location: 'Evolução', notes: 'Iron Head mata Gardevoir.', keyMoves: ['Iron Head'] },
              { id: 663, name: 'Talonflame', level: 68, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flare Blitz.', keyMoves: ['Flare Blitz'] },
              { id: 448, name: 'Lucario', level: 68, types: ['fighting', 'steel'], location: 'Gift', notes: 'Aura Sphere em Aurorus.', keyMoves: ['Aura Sphere'] },
              { id: 700, name: 'Sylveon', level: 68, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 6, name: 'Charizard', level: 68, types: ['fire', 'flying'], location: 'Lumiose (Gift)', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sm-alola',
    game: 'Sun / Moon',
    region: 'Alola',
    image: 'https://img.pokemondb.net/boxes/sun.jpg',
    starters: [
      { id: 722, name: 'Rowlet', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 725, name: 'Litten', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 728, name: 'Popplio', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'ilima',
        name: 'Ilima',
        specialty: 'normal',
        badge: 'Normalium Z',
        location: 'Verdant Cavern',
        description: 'Trial Captain (Normal).',
        acePokemonId: 735,
        team: [
          { id: 734, name: 'Yungoos', level: 11, types: ['normal'], counters: [{ id: 66, name: 'Machop', description: 'Karate Chop' }, { id: 296, name: 'Makuhita', description: 'Force Palm' }] },
          { id: 735, name: 'Gumshoos-Totem', level: 12, types: ['normal'], counters: [{ id: 66, name: 'Machop', description: 'Karate Chop' }, { id: 722, name: 'Rowlet', description: 'Leafage' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Use Fighting moves.',
            team: [
              { id: 722, name: 'Rowlet', level: 13, types: ['grass', 'flying'], location: 'Inicial', notes: 'Leafage.', keyMoves: ['Leafage'] },
              { id: 296, name: 'Makuhita', level: 11, types: ['fighting'], location: 'Rota 2', notes: 'Super efetivo.', keyMoves: ['Force Palm'] },
              { id: 198, name: 'Murkrow', level: 11, types: ['dark', 'flying'], location: 'Hau\'oli Cemetery', notes: 'Peck.', keyMoves: ['Peck'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Ember queima.',
            team: [
              { id: 725, name: 'Litten', level: 13, types: ['fire'], location: 'Inicial', notes: 'Ember.', keyMoves: ['Ember'] },
              { id: 296, name: 'Makuhita', level: 11, types: ['fighting'], location: 'Rota 2', notes: 'MVP.', keyMoves: ['Force Palm'] },
              { id: 731, name: 'Pikipek', level: 11, types: ['normal', 'flying'], location: 'Rota 1', notes: 'Rock Smash.', keyMoves: ['Rock Smash'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Use Fighting allies.',
            team: [
              { id: 728, name: 'Popplio', level: 13, types: ['water'], location: 'Inicial', notes: 'Water Gun.', keyMoves: ['Water Gun'] },
              { id: 296, name: 'Makuhita', level: 11, types: ['fighting'], location: 'Rota 2', notes: 'MVP.', keyMoves: ['Force Palm'] },
              { id: 81, name: 'Magnemite', level: 11, types: ['electric', 'steel'], location: 'Trainer School', notes: 'Resistente.', keyMoves: ['Thundershock'] }
            ]
          }
        ]
      },
      {
        id: 'hala',
        name: 'Hala',
        specialty: 'fighting',
        badge: 'Fightingium Z',
        location: 'Iki Town',
        description: 'Kahuna de Melemele.',
        acePokemonId: 739,
        team: [
          { id: 56, name: 'Mankey', level: 14, types: ['fighting'], counters: [{ id: 722, name: 'Rowlet', description: 'Peck' }, { id: 63, name: 'Abra', description: 'Confusion' }] },
          { id: 296, name: 'Makuhita', level: 14, types: ['fighting'], counters: [{ id: 728, name: 'Popplio', description: 'Disarming Voice' }, { id: 722, name: 'Rowlet', description: 'Peck' }] },
          { id: 739, name: 'Crabrawler', level: 15, types: ['fighting'], counters: [{ id: 63, name: 'Abra', description: 'Confusion' }, { id: 722, name: 'Rowlet', description: 'Peck' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Vantagem Total.',
            team: [
              { id: 722, name: 'Rowlet', level: 16, types: ['grass', 'flying'], location: 'Inicial', notes: 'Peck é super efetivo.', keyMoves: ['Peck'] },
              { id: 63, name: 'Abra', level: 14, types: ['psychic'], location: 'Hau\'oli City', notes: 'Confusion destrói lutadores.', keyMoves: ['Confusion'] },
              { id: 198, name: 'Murkrow', level: 14, types: ['dark', 'flying'], location: 'Hau\'oli Cemetery', notes: 'Peck/Wing Attack.', keyMoves: ['Wing Attack'] },
              { id: 731, name: 'Pikipek', level: 14, types: ['normal', 'flying'], location: 'Rota 1', notes: 'Peck.', keyMoves: ['Peck'] },
              { id: 12, name: 'Butterfree', level: 14, types: ['bug', 'flying'], location: 'Rota 1 (Caterpie)', notes: 'Confusion/Gust.', keyMoves: ['Confusion'] },
              { id: 88, name: 'Grimer-Alola', level: 14, types: ['poison', 'dark'], location: 'Hau\'oli City', notes: 'Resiste a luta (Dark/Poison é neutro? Não, Dark é fraco. Poison resiste. Neutro).', keyMoves: ['Bite'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Neutro.',
            team: [
              { id: 725, name: 'Litten', level: 16, types: ['fire'], location: 'Inicial', notes: 'Ember.', keyMoves: ['Ember'] },
              { id: 731, name: 'Pikipek', level: 14, types: ['normal', 'flying'], location: 'Rota 1', notes: 'Peck (Essencial).', keyMoves: ['Peck'] },
              { id: 63, name: 'Abra', level: 14, types: ['psychic'], location: 'Hau\'oli City', notes: 'Confusion.', keyMoves: ['Confusion'] },
              { id: 92, name: 'Gastly', level: 14, types: ['ghost', 'poison'], location: 'Hau\'oli Cemetery', notes: 'Imune a luta.', keyMoves: ['Lick'] },
              { id: 12, name: 'Butterfree', level: 14, types: ['bug', 'flying'], location: 'Rota 1', notes: 'Confusion.', keyMoves: ['Confusion'] },
              { id: 734, name: 'Yungoos', level: 14, types: ['normal'], location: 'Rota 1', notes: 'Strong Jaw.', keyMoves: ['Tackle'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Disarming Voice ajuda.',
            team: [
              { id: 728, name: 'Popplio', level: 16, types: ['water'], location: 'Inicial', notes: 'Disarming Voice (Fairy) é super efetivo.', keyMoves: ['Disarming Voice'] },
              { id: 731, name: 'Pikipek', level: 14, types: ['normal', 'flying'], location: 'Rota 1', notes: 'Peck.', keyMoves: ['Peck'] },
              { id: 63, name: 'Abra', level: 14, types: ['psychic'], location: 'Hau\'oli City', notes: 'Confusion.', keyMoves: ['Confusion'] },
              { id: 198, name: 'Murkrow', level: 14, types: ['dark', 'flying'], location: 'Hau\'oli Cemetery', notes: 'Wing Attack.', keyMoves: ['Wing Attack'] },
              { id: 81, name: 'Magnemite', level: 14, types: ['electric', 'steel'], location: 'Trainer School', notes: 'Resiste a luta.', keyMoves: ['Thundershock'] },
              { id: 92, name: 'Gastly', level: 14, types: ['ghost', 'poison'], location: 'Hau\'oli Cemetery', notes: 'Imune.', keyMoves: ['Lick'] }
            ]
          }
        ]
      },
      {
        id: 'lana',
        name: 'Lana',
        specialty: 'water',
        badge: 'Waterium Z',
        location: 'Brooklet Hill',
        description: 'Trial Captain (Water).',
        acePokemonId: 746,
        team: [
          { id: 746, name: 'Wishiwashi-Totem', level: 20, types: ['water'], counters: [{ id: 722, name: 'Dartrix', description: 'Razor Leaf' }, { id: 25, name: 'Pikachu', description: 'Electro Ball' }] },
          { id: 594, name: 'Alomomola', level: 18, types: ['water'], counters: [{ id: 722, name: 'Dartrix', description: 'Razor Leaf' }, { id: 81, name: 'Magnemite', description: 'Thundershock' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Vantagem total.',
            team: [
              { id: 723, name: 'Dartrix', level: 22, types: ['grass', 'flying'], location: 'Evolução', notes: 'Razor Leaf.', keyMoves: ['Razor Leaf'] },
              { id: 25, name: 'Pikachu', level: 20, types: ['electric'], location: 'Rota 1', notes: 'Electro Ball.', keyMoves: ['Electro Ball'] },
              { id: 82, name: 'Magneton', level: 20, types: ['electric', 'steel'], location: 'Evolução', notes: 'Spark.', keyMoves: ['Spark'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Desvantagem. Use Elétrico/Grama.',
            team: [
              { id: 726, name: 'Torracat', level: 22, types: ['fire'], location: 'Evolução', notes: 'Não use.', keyMoves: ['Lick'] },
              { id: 82, name: 'Magneton', level: 20, types: ['electric', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Spark'] },
              { id: 753, name: 'Fomantis', level: 20, types: ['grass'], location: 'Lush Jungle', notes: 'Leafage.', keyMoves: ['Leafage'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Neutro. Use Elétrico.',
            team: [
              { id: 729, name: 'Brionne', level: 22, types: ['water'], location: 'Evolução', notes: 'Disarming Voice.', keyMoves: ['Disarming Voice'] },
              { id: 82, name: 'Magneton', level: 20, types: ['electric', 'steel'], location: 'Evolução', notes: 'Spark.', keyMoves: ['Spark'] },
              { id: 761, name: 'Bounsweet', level: 20, types: ['grass'], location: 'Lush Jungle', notes: 'Razor Leaf.', keyMoves: ['Razor Leaf'] }
            ]
          }
        ]
      },
      {
        id: 'kiawe',
        name: 'Kiawe',
        specialty: 'fire',
        badge: 'Firium Z',
        location: 'Wela Volcano',
        description: 'Trial Captain (Fire).',
        acePokemonId: 758,
        team: [
          { id: 758, name: 'Salazzle-Totem', level: 22, types: ['poison', 'fire'], counters: [{ id: 729, name: 'Brionne', description: 'Bubblebeam' }, { id: 750, name: 'Mudbray', description: 'Bulldoze (4x)' }] },
          { id: 757, name: 'Salandit', level: 20, types: ['poison', 'fire'], counters: [{ id: 750, name: 'Mudbray', description: 'Bulldoze (4x)' }, { id: 66, name: 'Machop', description: 'Karate Chop' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Desvantagem extrema.',
            team: [
              { id: 723, name: 'Dartrix', level: 24, types: ['grass', 'flying'], location: 'Evolução', notes: 'Não use. Salazzle resiste 4x e mata com fogo.', keyMoves: ['Pluck'] },
              { id: 750, name: 'Mudbray', level: 22, types: ['ground'], location: 'Rota 4', notes: 'Bulldoze é 4x em Salazzle. MVP.', keyMoves: ['Bulldoze'] },
              { id: 134, name: 'Vaporeon', level: 22, types: ['water'], location: 'Evolução Eevee', notes: 'Water Pulse.', keyMoves: ['Water Pulse'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Neutro. Use Terra/Água.',
            team: [
              { id: 726, name: 'Torracat', level: 24, types: ['fire'], location: 'Evolução', notes: 'Resiste a fogo.', keyMoves: ['Bite'] },
              { id: 750, name: 'Mudbray', level: 22, types: ['ground'], location: 'Rota 4', notes: 'Bulldoze MVP.', keyMoves: ['Bulldoze'] },
              { id: 66, name: 'Machop', level: 22, types: ['fighting'], location: 'Ten Carat Hill', notes: 'Revenge.', keyMoves: ['Revenge'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Vantagem.',
            team: [
              { id: 729, name: 'Brionne', level: 24, types: ['water'], location: 'Evolução', notes: 'Bubblebeam.', keyMoves: ['Bubblebeam'] },
              { id: 750, name: 'Mudbray', level: 22, types: ['ground'], location: 'Rota 4', notes: 'Bulldoze.', keyMoves: ['Bulldoze'] },
              { id: 278, name: 'Wingull', level: 22, types: ['water', 'flying'], location: 'Rota 1', notes: 'Water Pulse.', keyMoves: ['Water Pulse'] }
            ]
          }
        ]
      },
      {
        id: 'mallow',
        name: 'Mallow',
        specialty: 'grass',
        badge: 'Grassium Z',
        location: 'Lush Jungle',
        description: 'Trial Captain (Grass).',
        acePokemonId: 754,
        team: [
          { id: 754, name: 'Lurantis-Totem', level: 24, types: ['grass'], counters: [{ id: 726, name: 'Torracat', description: 'Fire Fang' }, { id: 723, name: 'Dartrix', description: 'Pluck' }] },
          { id: 351, name: 'Castform', level: 22, types: ['normal', 'fire'], counters: [{ id: 729, name: 'Brionne', description: 'Bubblebeam' }, { id: 299, name: 'Nosepass', description: 'Rock Throw' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Vantagem Aérea.',
            team: [
              { id: 723, name: 'Dartrix', level: 26, types: ['grass', 'flying'], location: 'Evolução', notes: 'Pluck é super efetivo.', keyMoves: ['Pluck'] },
              { id: 757, name: 'Salandit', level: 24, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Flame Burst.', keyMoves: ['Flame Burst'] },
              { id: 41, name: 'Zubat', level: 24, types: ['poison', 'flying'], location: 'Verdant Cavern', notes: 'Wing Attack.', keyMoves: ['Wing Attack'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Vantagem de Fogo.',
            team: [
              { id: 726, name: 'Torracat', level: 26, types: ['fire'], location: 'Evolução', notes: 'Fire Fang.', keyMoves: ['Fire Fang'] },
              { id: 733, name: 'Trumbeak', level: 24, types: ['normal', 'flying'], location: 'Evolução', notes: 'Pluck.', keyMoves: ['Pluck'] },
              { id: 58, name: 'Growlithe', level: 24, types: ['fire'], location: 'Rota 2', notes: 'Flame Wheel.', keyMoves: ['Flame Wheel'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Desvantagem. Use Fogo/Voador.',
            team: [
              { id: 729, name: 'Brionne', level: 26, types: ['water'], location: 'Evolução', notes: 'Não use água. Disarming Voice é neutro.', keyMoves: ['Disarming Voice'] },
              { id: 757, name: 'Salandit', level: 24, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Flame Burst.', keyMoves: ['Flame Burst'] },
              { id: 733, name: 'Trumbeak', level: 24, types: ['normal', 'flying'], location: 'Evolução', notes: 'Pluck.', keyMoves: ['Pluck'] }
            ]
          }
        ]
      },
      {
        id: 'olivia',
        name: 'Olivia',
        specialty: 'rock',
        badge: 'Rockium Z',
        location: 'Konikoni City',
        description: 'Kahuna de Akala.',
        acePokemonId: 745,
        team: [
          { id: 299, name: 'Nosepass', level: 26, types: ['rock'], counters: [{ id: 723, name: 'Dartrix', description: 'Razor Leaf' }, { id: 729, name: 'Brionne', description: 'Bubblebeam' }] },
          { id: 525, name: 'Boldore', level: 26, types: ['rock'], counters: [{ id: 723, name: 'Dartrix', description: 'Razor Leaf' }, { id: 726, name: 'Torracat', description: 'Double Kick' }] },
          { id: 745, name: 'Lycanroc-Mid', level: 27, types: ['rock'], counters: [{ id: 750, name: 'Mudbray', description: 'Bulldoze' }, { id: 67, name: 'Machoke', description: 'Karate Chop' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Dartrix vence fácil.',
            team: [
              { id: 723, name: 'Dartrix', level: 28, types: ['grass', 'flying'], location: 'Evolução', notes: 'Razor Leaf é 4x em alguns. Cuidado com Rock Throw.', keyMoves: ['Razor Leaf'] },
              { id: 750, name: 'Mudbray', level: 26, types: ['ground'], location: 'Rota 4', notes: 'Bulldoze destrói pedras.', keyMoves: ['Bulldoze'] },
              { id: 67, name: 'Machop', level: 25, types: ['fighting'], location: 'Ten Carat Hill', notes: 'Revenge/Karate Chop.', keyMoves: ['Karate Chop'] },
              { id: 757, name: 'Salandit', level: 26, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Dragon Rage (fixo 40dmg).', keyMoves: ['Dragon Rage'] },
              { id: 133, name: 'Eevee', level: 25, types: ['normal'], location: 'Rota 4', notes: 'Evolua para Vaporeon (Water Stone).', keyMoves: ['Water Gun'] },
              { id: 761, name: 'Bounsweet', level: 25, types: ['grass'], location: 'Lush Jungle', notes: 'Razor Leaf.', keyMoves: ['Razor Leaf'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Desvantagem. Use Luta/Terra.',
            team: [
              { id: 726, name: 'Torracat', level: 28, types: ['fire'], location: 'Evolução', notes: 'Não use fogo. Tem Double Kick?', keyMoves: ['Double Kick'] },
              { id: 750, name: 'Mudbray', level: 26, types: ['ground'], location: 'Rota 4', notes: 'Bulldoze (MVP).', keyMoves: ['Bulldoze'] },
              { id: 746, name: 'Wishiwashi', level: 26, types: ['water'], location: 'Brooklet Hill', notes: 'Aqua Gun.', keyMoves: ['Aqua Gun'] },
              { id: 753, name: 'Fomantis', level: 25, types: ['grass'], location: 'Lush Jungle', notes: 'Leafage.', keyMoves: ['Leafage'] },
              { id: 66, name: 'Machop', level: 25, types: ['fighting'], location: 'Ten Carat Hill', notes: 'Karate Chop.', keyMoves: ['Karate Chop'] },
              { id: 134, name: 'Vaporeon', level: 25, types: ['water'], location: 'Evolução Eevee', notes: 'Water Pulse.', keyMoves: ['Water Pulse'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Brionne vence fácil.',
            team: [
              { id: 729, name: 'Brionne', level: 28, types: ['water'], location: 'Evolução', notes: 'Bubblebeam vence tudo.', keyMoves: ['Bubblebeam'] },
              { id: 750, name: 'Mudbray', level: 26, types: ['ground'], location: 'Rota 4', notes: 'Bulldoze.', keyMoves: ['Bulldoze'] },
              { id: 753, name: 'Fomantis', level: 25, types: ['grass'], location: 'Lush Jungle', notes: 'Leafage.', keyMoves: ['Leafage'] },
              { id: 66, name: 'Machop', level: 25, types: ['fighting'], location: 'Ten Carat Hill', notes: 'Karate Chop.', keyMoves: ['Karate Chop'] },
              { id: 757, name: 'Salandit', level: 26, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Dragon Rage.', keyMoves: ['Dragon Rage'] },
              { id: 737, name: 'Charjabug', level: 25, types: ['bug', 'electric'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Spark'] }
            ]
          }
        ]
      },
      {
        id: 'sophocles',
        name: 'Sophocles',
        specialty: 'electric',
        badge: 'Electrium Z',
        location: 'Hokulani Observatory',
        description: 'Trial Captain (Electric).',
        acePokemonId: 738,
        team: [
          { id: 738, name: 'Vikavolt-Totem', level: 29, types: ['bug', 'electric'], counters: [{ id: 745, name: 'Lycanroc', description: 'Rock Slide' }, { id: 758, name: 'Salazzle', description: 'Flame Burst' }] },
          { id: 737, name: 'Charjabug', level: 27, types: ['bug', 'electric'], counters: [{ id: 758, name: 'Salazzle', description: 'Flame Burst' }, { id: 750, name: 'Mudbray', description: 'Bulldoze' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Cuidado com Bug.',
            team: [
              { id: 723, name: 'Dartrix', level: 30, types: ['grass', 'flying'], location: 'Evolução', notes: 'Fraco a Bug/Electric. Evite.', keyMoves: ['Pluck'] },
              { id: 745, name: 'Lycanroc', level: 28, types: ['rock'], location: 'Ten Carat Hill (Rockruff)', notes: 'Rock Slide é 4x em Vikavolt? Não, Bug/Electric não tem fraqueza 4x a Rock. Rock é 2x. Levitate anula Ground.', keyMoves: ['Rock Slide'] },
              { id: 758, name: 'Salazzle', level: 28, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Flame Burst.', keyMoves: ['Flame Burst'] },
              { id: 750, name: 'Muddale', level: 28, types: ['ground'], location: 'Rota 4', notes: 'Imune a Electric, mas Vikavolt tem Levitate. Use Rock Smash ou Heavy Slam.', keyMoves: ['Heavy Slam'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Vantagem de Fogo.',
            team: [
              { id: 726, name: 'Torracat', level: 30, types: ['fire'], location: 'Evolução', notes: 'Fire Fang.', keyMoves: ['Fire Fang'] },
              { id: 745, name: 'Lycanroc', level: 28, types: ['rock'], location: 'Ten Carat Hill', notes: 'Rock Slide.', keyMoves: ['Rock Slide'] },
              { id: 750, name: 'Muddale', level: 28, types: ['ground'], location: 'Rota 4', notes: 'Resiste Electric.', keyMoves: ['High Horsepower'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Desvantagem. Use aliados.',
            team: [
              { id: 729, name: 'Brionne', level: 30, types: ['water'], location: 'Evolução', notes: 'Fraco a Electric. Não use.', keyMoves: ['Disarming Voice'] },
              { id: 758, name: 'Salazzle', level: 28, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'MVP. Flame Burst.', keyMoves: ['Flame Burst'] },
              { id: 105, name: 'Marowak-Alola', level: 28, types: ['fire', 'ghost'], location: 'Wela Volcano (Cubone)', notes: 'Lightning Rod (Imune). Flame Wheel.', keyMoves: ['Flame Wheel'] }
            ]
          }
        ]
      },
      {
        id: 'acerola-captain',
        name: 'Acerola',
        specialty: 'ghost',
        badge: 'Ghostium Z',
        location: 'Thrifty Megamart',
        description: 'Trial Captain (Ghost).',
        acePokemonId: 778,
        team: [
          { id: 778, name: 'Mimikyu-Totem', level: 33, types: ['ghost', 'fairy'], counters: [{ id: 82, name: 'Magnezone', description: 'Flash Cannon' }, { id: 88, name: 'Muk-Alola', description: 'Knock Off' }] },
          { id: 93, name: 'Haunter', level: 27, types: ['ghost', 'poison'], counters: [{ id: 724, name: 'Decidueye', description: 'Shadow Ball' }, { id: 197, name: 'Umbreon', description: 'Faint Attack' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Batalha de Fantasmas.',
            team: [
              { id: 724, name: 'Decidueye', level: 34, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Sinister Arrow Raid (Z-Move). Cuidado com Shadow Claw.', keyMoves: ['Spirit Shackle'] },
              { id: 89, name: 'Muk-Alola', level: 32, types: ['poison', 'dark'], location: 'Evolução Grimer', notes: 'Dark resiste Ghost. Crunch/Knock Off.', keyMoves: ['Crunch'] },
              { id: 462, name: 'Magnezone', level: 32, types: ['electric', 'steel'], location: 'Evolução Magneton', notes: 'Flash Cannon em Mimikyu.', keyMoves: ['Flash Cannon'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Incineroar domina.',
            team: [
              { id: 727, name: 'Incineroar', level: 34, types: ['fire', 'dark'], location: 'Evolução', notes: 'Darkest Lariat vence Mimikyu.', keyMoves: ['Darkest Lariat'] },
              { id: 462, name: 'Magnezone', level: 32, types: ['electric', 'steel'], location: 'Evolução', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] },
              { id: 212, name: 'Scizor', level: 32, types: ['bug', 'steel'], location: 'Evolução Scyther', notes: 'Bullet Punch.', keyMoves: ['Bullet Punch'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Primarina tem Moonblast.',
            team: [
              { id: 730, name: 'Primarina', level: 34, types: ['water', 'fairy'], location: 'Evolução', notes: 'Moonblast é efetivo? Não, Fairy vs Fairy/Ghost. Ghost é neutro. Use Shadow Ball se tiver.', keyMoves: ['Shadow Ball'] },
              { id: 89, name: 'Muk-Alola', level: 32, types: ['poison', 'dark'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Crunch'] },
              { id: 227, name: 'Skarmory', level: 32, types: ['steel', 'flying'], location: 'Rota 10', notes: 'Steel Wing.', keyMoves: ['Steel Wing'] }
            ]
          }
        ]
      },
      {
        id: 'nanu',
        name: 'Nanu',
        specialty: 'dark',
        badge: 'Darkinium Z',
        location: 'Malie City',
        description: 'Kahuna de Ula\'ula.',
        acePokemonId: 53,
        team: [
          { id: 302, name: 'Sableye', level: 38, types: ['dark', 'ghost'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 724, name: 'Decidueye', description: 'Cuidado (Ghost)' }] },
          { id: 552, name: 'Krokorok', level: 38, types: ['ground', 'dark'], counters: [{ id: 730, name: 'Primarina', description: 'Moonblast/Sparkling Aria' }, { id: 763, name: 'Tsareena', description: 'Trop Kick' }] },
          { id: 53, name: 'Persian-Alola', level: 39, types: ['dark'], counters: [{ id: 67, name: 'Machoke', description: 'Cross Chop' }, { id: 727, name: 'Incineroar', description: 'Brick Break' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Decidueye tem desvantagem (Ghost).',
            team: [
              { id: 724, name: 'Decidueye', level: 40, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Fraco a Dark. Use U-turn.', keyMoves: ['U-turn'] },
              { id: 760, name: 'Bewear', level: 38, types: ['normal', 'fighting'], location: 'Rota 10 (Stufful)', notes: 'Hammer Arm destrói Persian/Krokorok.', keyMoves: ['Hammer Arm'] },
              { id: 700, name: 'Sylveon', level: 38, types: ['fairy'], location: 'Evolução', notes: 'Moonblast é super efetivo em tudo.', keyMoves: ['Moonblast'] },
              { id: 763, name: 'Tsareena', level: 38, types: ['grass'], location: 'Evolução', notes: 'Trop Kick em Krokorok.', keyMoves: ['Trop Kick'] },
              { id: 750, name: 'Mudsdale', level: 38, types: ['ground'], location: 'Evolução', notes: 'High Horsepower.', keyMoves: ['High Horsepower'] },
              { id: 30, name: 'Ninetales-Alola', level: 38, types: ['ice', 'fairy'], location: 'Evolução (Vulpix-A)', notes: 'Dazzling Gleam.', keyMoves: ['Dazzling Gleam'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Incineroar resiste.',
            team: [
              { id: 727, name: 'Incineroar', level: 40, types: ['fire', 'dark'], location: 'Evolução', notes: 'Brick Break/Cross Chop.', keyMoves: ['Brick Break'] },
              { id: 760, name: 'Bewear', level: 38, types: ['normal', 'fighting'], location: 'Rota 10', notes: 'MVP.', keyMoves: ['Hammer Arm'] },
              { id: 778, name: 'Mimikyu', level: 38, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Play Rough.', keyMoves: ['Play Rough'] },
              { id: 730, name: 'Primarina', level: 38, types: ['water', 'fairy'], location: 'Troca/GTS', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 67, name: 'Machoke', level: 38, types: ['fighting'], location: 'Vast Poni Canyon', notes: 'Submission.', keyMoves: ['Submission'] },
              { id: 754, name: 'Lurantis', level: 38, types: ['grass'], location: 'Lush Jungle', notes: 'X-Scissor.', keyMoves: ['X-Scissor'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Primarina domina.',
            team: [
              { id: 730, name: 'Primarina', level: 40, types: ['water', 'fairy'], location: 'Evolução', notes: 'Moonblast vence o ginásio inteiro.', keyMoves: ['Moonblast'] },
              { id: 760, name: 'Bewear', level: 38, types: ['normal', 'fighting'], location: 'Rota 10', notes: 'Backup.', keyMoves: ['Hammer Arm'] },
              { id: 26, name: 'Raichu-Alola', level: 38, types: ['electric', 'psychic'], location: 'Evolução', notes: 'Cuidado com Dark.', keyMoves: ['Thunderbolt'] },
              { id: 750, name: 'Mudsdale', level: 38, types: ['ground'], location: 'Rota 12', notes: 'Heavy Slam.', keyMoves: ['Heavy Slam'] },
              { id: 59, name: 'Arcanine', level: 38, types: ['fire'], location: 'Evolução', notes: 'Intimidate.', keyMoves: ['Flamethrower'] },
              { id: 743, name: 'Ribombee', level: 38, types: ['bug', 'fairy'], location: 'Ula\'ula Meadow', notes: 'Dazzling Gleam.', keyMoves: ['Dazzling Gleam'] }
            ]
          }
        ]
      },
      {
        id: 'kommo-o-totem',
        name: 'Totem Kommo-o',
        specialty: 'dragon',
        badge: 'Dragonium Z',
        location: 'Vast Poni Canyon',
        description: 'Dragon Trial (No Captain).',
        acePokemonId: 784,
        team: [
          { id: 784, name: 'Kommo-o-Totem', level: 45, types: ['dragon', 'fighting'], counters: [{ id: 730, name: 'Primarina', description: 'Moonblast (4x)' }, { id: 30, name: 'Ninetales-Alola', description: 'Moonblast (4x)' }] },
          { id: 783, name: 'Hakamo-o', level: 40, types: ['dragon', 'fighting'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast (4x)' }, { id: 743, name: 'Ribombee', description: 'Dazzling Gleam (4x)' }] },
          { id: 212, name: 'Scizor', level: 40, types: ['bug', 'steel'], counters: [{ id: 727, name: 'Incineroar', description: 'Flamethrower (4x)' }, { id: 758, name: 'Salazzle', description: 'Flamethrower (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Precisa de Fada.',
            team: [
              { id: 724, name: 'Decidueye', level: 48, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Não use em Kommo-o. Use em aliados.', keyMoves: ['Spirit Shackle'] },
              { id: 30, name: 'Ninetales-Alola', level: 46, types: ['ice', 'fairy'], location: 'Mount Lanakila', notes: 'Moonblast/Dazzling Gleam é 4x. MVP.', keyMoves: ['Moonblast'] },
              { id: 730, name: 'Primarina', level: 46, types: ['water', 'fairy'], location: 'Troca', notes: 'Moonblast é 4x.', keyMoves: ['Moonblast'] },
              { id: 778, name: 'Mimikyu', level: 46, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Play Rough é 4x.', keyMoves: ['Play Rough'] },
              { id: 758, name: 'Salazzle', level: 46, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Flamethrower em Scizor (4x).', keyMoves: ['Flamethrower'] },
              { id: 700, name: 'Sylveon', level: 46, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Fada e Fogo.',
            team: [
              { id: 727, name: 'Incineroar', level: 48, types: ['fire', 'dark'], location: 'Evolução', notes: 'Flamethrower em Scizor.', keyMoves: ['Flamethrower'] },
              { id: 743, name: 'Ribombee', level: 46, types: ['bug', 'fairy'], location: 'Ula\'ula Meadow', notes: 'Dazzling Gleam é 4x.', keyMoves: ['Dazzling Gleam'] },
              { id: 778, name: 'Mimikyu', level: 46, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Play Rough.', keyMoves: ['Play Rough'] },
              { id: 752, name: 'Araquanid', level: 46, types: ['water', 'bug'], location: 'Brooklet Hill', notes: 'Resiste a Luta.', keyMoves: ['Liquidation'] },
              { id: 30, name: 'Ninetales-Alola', level: 46, types: ['ice', 'fairy'], location: 'Mount Lanakila', notes: 'Moonblast MVP.', keyMoves: ['Moonblast'] },
              { id: 130, name: 'Gyarados', level: 46, types: ['water', 'flying'], location: 'Evolução', notes: 'Intimidate ajuda.', keyMoves: ['Waterfall'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Primarina destrói.',
            team: [
              { id: 730, name: 'Primarina', level: 50, types: ['water', 'fairy'], location: 'Evolução', notes: 'Moonblast é 4x em Kommo-o/Hakamo-o. MVP.', keyMoves: ['Moonblast'] },
              { id: 758, name: 'Salazzle', level: 46, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Flamethrower em Scizor.', keyMoves: ['Flamethrower'] },
              { id: 30, name: 'Ninetales-Alola', level: 46, types: ['ice', 'fairy'], location: 'Mount Lanakila', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 778, name: 'Mimikyu', level: 46, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Play Rough.', keyMoves: ['Play Rough'] },
              { id: 700, name: 'Sylveon', level: 46, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 743, name: 'Ribombee', level: 46, types: ['bug', 'fairy'], location: 'Ula\'ula Meadow', notes: 'Dazzling Gleam.', keyMoves: ['Dazzling Gleam'] }
            ]
          }
        ]
      },
      {
        id: 'hapu',
        name: 'Hapu',
        specialty: 'ground',
        badge: 'Groundium Z',
        location: 'Poni Island',
        description: 'Kahuna de Poni.',
        acePokemonId: 750,
        team: [
          { id: 51, name: 'Dugtrio-Alola', level: 47, types: ['ground', 'steel'], counters: [{ id: 727, name: 'Incineroar', description: 'Flamethrower' }, { id: 730, name: 'Primarina', description: 'Surf' }] },
          { id: 423, name: 'Gastrodon', level: 47, types: ['water', 'ground'], counters: [{ id: 724, name: 'Decidueye', description: 'Leaf Blade (4x)' }, { id: 763, name: 'Tsareena', description: 'Trop Kick (4x)' }] },
          { id: 330, name: 'Flygon', level: 47, types: ['ground', 'dragon'], counters: [{ id: 30, name: 'Ninetales-Alola', description: 'Ice Beam (4x)' }, { id: 730, name: 'Primarina', description: 'Moonblast' }] },
          { id: 750, name: 'Mudsdale', level: 48, types: ['ground'], counters: [{ id: 724, name: 'Decidueye', description: 'Leaf Blade' }, { id: 730, name: 'Primarina', description: 'Surf' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Vantagem Total.',
            team: [
              { id: 724, name: 'Decidueye', level: 50, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Leaf Blade destrói Gastrodon/Mudsdale.', keyMoves: ['Leaf Blade'] },
              { id: 30, name: 'Ninetales-Alola', level: 48, types: ['ice', 'fairy'], location: 'Mount Lanakila', notes: 'Ice Beam em Flygon/Mudsdale.', keyMoves: ['Ice Beam'] },
              { id: 730, name: 'Primarina', level: 48, types: ['water', 'fairy'], location: 'Troca', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 738, name: 'Vikavolt', level: 48, types: ['bug', 'electric'], location: 'Evolução', notes: 'Levitate (Imune a terra). Energy Ball.', keyMoves: ['Energy Ball'] },
              { id: 130, name: 'Gyarados', level: 48, types: ['water', 'flying'], location: 'Evolução', notes: 'Imune a terra. Waterfall.', keyMoves: ['Waterfall'] },
              { id: 763, name: 'Tsareena', level: 48, types: ['grass'], location: 'Evolução', notes: 'Trop Kick.', keyMoves: ['Trop Kick'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Incineroar tem problemas.',
            team: [
              { id: 727, name: 'Incineroar', level: 50, types: ['fire', 'dark'], location: 'Evolução', notes: 'Fraco a terra. Use Darkest Lariat em Dugtrio.', keyMoves: ['Darkest Lariat'] },
              { id: 763, name: 'Tsareena', level: 48, types: ['grass'], location: 'Evolução', notes: 'Trop Kick em Gastrodon (4x).', keyMoves: ['Trop Kick'] },
              { id: 134, name: 'Vaporeon', level: 48, types: ['water'], location: 'Evolução', notes: 'Surf/Hydro Pump.', keyMoves: ['Surf'] },
              { id: 30, name: 'Ninetales-Alola', level: 48, types: ['ice', 'fairy'], location: 'Mount Lanakila', notes: 'Ice Beam em Flygon.', keyMoves: ['Ice Beam'] },
              { id: 227, name: 'Skarmory', level: 48, types: ['steel', 'flying'], location: 'Vast Poni Canyon', notes: 'Imune a terra.', keyMoves: ['Steel Wing'] },
              { id: 752, name: 'Araquanid', level: 48, types: ['water', 'bug'], location: 'Brooklet Hill', notes: 'Liquidation.', keyMoves: ['Liquidation'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Vantagem Total.',
            team: [
              { id: 730, name: 'Primarina', level: 50, types: ['water', 'fairy'], location: 'Evolução', notes: 'Surf/Moonblast vencem tudo.', keyMoves: ['Surf'] },
              { id: 763, name: 'Tsareena', level: 48, types: ['grass'], location: 'Evolução', notes: 'Backup para Gastrodon.', keyMoves: ['Trop Kick'] },
              { id: 30, name: 'Ninetales-Alola', level: 48, types: ['ice', 'fairy'], location: 'Mount Lanakila', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 738, name: 'Vikavolt', level: 48, types: ['bug', 'electric'], location: 'Evolução', notes: 'Levitate.', keyMoves: ['Bug Buzz'] },
              { id: 445, name: 'Garchomp', level: 48, types: ['dragon', 'ground'], location: 'Haina Desert', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 279, name: 'Pelipper', level: 48, types: ['water', 'flying'], location: 'Evolução', notes: 'Imune a terra. Scald.', keyMoves: ['Scald'] }
            ]
          }
        ]
      },
      {
        id: 'mina',
        name: 'Mina',
        specialty: 'fairy',
        badge: 'Fairium Z',
        location: 'Poni Island',
        description: 'Trial Captain (Fairy).',
        acePokemonId: 743,
        team: [
          { id: 707, name: 'Klefki', level: 51, types: ['steel', 'fairy'], counters: [{ id: 727, name: 'Incineroar', description: 'Flamethrower' }, { id: 758, name: 'Salazzle', description: 'Flamethrower' }] },
          { id: 210, name: 'Granbull', level: 51, types: ['fairy'], counters: [{ id: 758, name: 'Salazzle', description: 'Sludge Bomb' }, { id: 376, name: 'Metagross', description: 'Meteor Mash' }] },
          { id: 756, name: 'Shiinotic', level: 51, types: ['grass', 'fairy'], counters: [{ id: 758, name: 'Salazzle', description: 'Sludge Bomb (4x)' }, { id: 733, name: 'Toucannon', description: 'Beak Blast' }] },
          { id: 40, name: 'Wigglytuff', level: 51, types: ['normal', 'fairy'], counters: [{ id: 448, name: 'Lucario', description: 'Flash Cannon' }, { id: 758, name: 'Salazzle', description: 'Sludge Bomb' }] },
          { id: 743, name: 'Ribombee', level: 51, types: ['bug', 'fairy'], counters: [{ id: 758, name: 'Salazzle', description: 'Flamethrower' }, { id: 227, name: 'Skarmory', description: 'Steel Wing' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Use Poison/Steel.',
            team: [
              { id: 724, name: 'Decidueye', level: 52, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Spirit Shackle.', keyMoves: ['Spirit Shackle'] },
              { id: 758, name: 'Salazzle', level: 50, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Sludge Bomb é MVP. 4x em Shiinotic.', keyMoves: ['Sludge Bomb'] },
              { id: 376, name: 'Metagross', level: 50, types: ['steel', 'psychic'], location: 'Mount Hokulani', notes: 'Meteor Mash destrói Fadas.', keyMoves: ['Meteor Mash'] },
              { id: 89, name: 'Muk-Alola', level: 50, types: ['poison', 'dark'], location: 'Evolução', notes: 'Gunk Shot.', keyMoves: ['Gunk Shot'] },
              { id: 448, name: 'Lucario', level: 50, types: ['fighting', 'steel'], location: 'Poni Grove', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] },
              { id: 733, name: 'Toucannon', level: 50, types: ['normal', 'flying'], location: 'Evolução', notes: 'Beak Blast em Shiinotic/Ribombee.', keyMoves: ['Beak Blast'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Fire resiste a Fairy.',
            team: [
              { id: 727, name: 'Incineroar', level: 52, types: ['fire', 'dark'], location: 'Evolução', notes: 'Flare Blitz em Klefki/Shiinotic/Ribombee.', keyMoves: ['Flare Blitz'] },
              { id: 376, name: 'Metagross', level: 50, types: ['steel', 'psychic'], location: 'Mount Hokulani', notes: 'Meteor Mash MVP.', keyMoves: ['Meteor Mash'] },
              { id: 758, name: 'Salazzle', level: 50, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 462, name: 'Magnezone', level: 50, types: ['electric', 'steel'], location: 'Evolução', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] },
              { id: 212, name: 'Scizor', level: 50, types: ['bug', 'steel'], location: 'Evolução', notes: 'Bullet Punch.', keyMoves: ['Bullet Punch'] },
              { id: 89, name: 'Muk-Alola', level: 50, types: ['poison', 'dark'], location: 'Evolução', notes: 'Poison Jab.', keyMoves: ['Poison Jab'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Use aliados Poison/Steel.',
            team: [
              { id: 730, name: 'Primarina', level: 52, types: ['water', 'fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 376, name: 'Metagross', level: 50, types: ['steel', 'psychic'], location: 'Mount Hokulani', notes: 'Meteor Mash.', keyMoves: ['Meteor Mash'] },
              { id: 758, name: 'Salazzle', level: 50, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 89, name: 'Muk-Alola', level: 50, types: ['poison', 'dark'], location: 'Evolução', notes: 'Gunk Shot.', keyMoves: ['Gunk Shot'] },
              { id: 227, name: 'Skarmory', level: 50, types: ['steel', 'flying'], location: 'Vast Poni Canyon', notes: 'Steel Wing.', keyMoves: ['Steel Wing'] },
              { id: 760, name: 'Bewear', level: 50, types: ['normal', 'fighting'], location: 'Rota 10', notes: 'Return.', keyMoves: ['Return'] }
            ]
          }
        ]
      },
      {
        id: 'hala-e4',
        name: 'Hala (E4)',
        specialty: 'fighting',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four Hala.',
        acePokemonId: 740,
        team: [
          { id: 297, name: 'Hariyama', level: 54, types: ['fighting'], counters: [{ id: 722, name: 'Decidueye', description: 'Spirit Shackle' }, { id: 730, name: 'Primarina', description: 'Moonblast' }] },
          { id: 57, name: 'Primeape', level: 54, types: ['fighting'], counters: [{ id: 733, name: 'Toucannon', description: 'Beak Blast' }, { id: 196, name: 'Espeon', description: 'Psychic' }] },
          { id: 760, name: 'Bewear', level: 54, types: ['normal', 'fighting'], counters: [{ id: 722, name: 'Decidueye', description: 'Imune a normal/luta' }, { id: 65, name: 'Alakazam', description: 'Psychic' }] },
          { id: 62, name: 'Poliwrath', level: 54, types: ['water', 'fighting'], counters: [{ id: 722, name: 'Decidueye', description: 'Leaf Blade' }, { id: 26, name: 'Raichu-Alola', description: 'Thunderbolt' }] },
          { id: 740, name: 'Crabominable', level: 55, types: ['fighting', 'ice'], counters: [{ id: 727, name: 'Incineroar', description: 'Flare Blitz' }, { id: 68, name: 'Machamp', description: 'Close Combat' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Decidueye é imune.',
            team: [
              { id: 724, name: 'Decidueye', level: 58, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Imune a Fighting. Spirit Shackle.', keyMoves: ['Spirit Shackle'] },
              { id: 730, name: 'Primarina', level: 58, types: ['water', 'fairy'], location: 'Troca', notes: 'Moonblast é super efetivo.', keyMoves: ['Moonblast'] },
              { id: 700, name: 'Sylveon', level: 56, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 196, name: 'Espeon', level: 56, types: ['psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 733, name: 'Toucannon', level: 56, types: ['normal', 'flying'], location: 'Evolução', notes: 'Beak Blast.', keyMoves: ['Beak Blast'] },
              { id: 778, name: 'Mimikyu', level: 56, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Play Rough.', keyMoves: ['Play Rough'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Cuidado com Luta.',
            team: [
              { id: 727, name: 'Incineroar', level: 58, types: ['fire', 'dark'], location: 'Evolução', notes: 'Fraco a Luta. Use Flare Blitz em Crabominable.', keyMoves: ['Flare Blitz'] },
              { id: 778, name: 'Mimikyu', level: 56, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Imune a Luta. Play Rough.', keyMoves: ['Play Rough'] },
              { id: 26, name: 'Raichu-Alola', level: 56, types: ['electric', 'psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 730, name: 'Primarina', level: 56, types: ['water', 'fairy'], location: 'Troca', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 628, name: 'Braviary', level: 56, types: ['normal', 'flying'], location: 'Vast Poni Canyon', notes: 'Brave Bird.', keyMoves: ['Brave Bird'] },
              { id: 65, name: 'Alakazam', level: 56, types: ['psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Primarina destrói.',
            team: [
              { id: 730, name: 'Primarina', level: 60, types: ['water', 'fairy'], location: 'Evolução', notes: 'Moonblast vence quase todos.', keyMoves: ['Moonblast'] },
              { id: 26, name: 'Raichu-Alola', level: 56, types: ['electric', 'psychic'], location: 'Evolução', notes: 'Thunderbolt em Poliwrath. Psychic nos outros.', keyMoves: ['Psychic'] },
              { id: 760, name: 'Bewear', level: 56, types: ['normal', 'fighting'], location: 'Rota 10', notes: 'Tank.', keyMoves: ['Hammer Arm'] },
              { id: 741, name: 'Oricorio-Sensu', level: 56, types: ['ghost', 'flying'], location: 'Poni Meadow', notes: 'Revelation Dance.', keyMoves: ['Revelation Dance'] },
              { id: 700, name: 'Sylveon', level: 56, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 724, name: 'Decidueye', level: 58, types: ['grass', 'ghost'], location: 'Troca', notes: 'Imune.', keyMoves: ['Spirit Shackle'] }
            ]
          }
        ]
      },
      {
        id: 'olivia-e4',
        name: 'Olivia (E4)',
        specialty: 'rock',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four Olivia.',
        acePokemonId: 745,
        team: [
          { id: 369, name: 'Relicanth', level: 54, types: ['water', 'rock'], counters: [{ id: 722, name: 'Decidueye', description: 'Leaf Blade (4x)' }, { id: 738, name: 'Vikavolt', description: 'Energy Ball' }] },
          { id: 703, name: 'Carbink', level: 54, types: ['rock', 'fairy'], counters: [{ id: 747, name: 'Toxapex', description: 'Venoshock' }, { id: 376, name: 'Metagross', description: 'Meteor Mash (4x)' }] },
          { id: 76, name: 'Golem-Alola', level: 54, types: ['rock', 'electric'], counters: [{ id: 750, name: 'Mudsdale', description: 'Earthquake (4x)' }, { id: 722, name: 'Decidueye', description: 'Leaf Blade' }] },
          { id: 476, name: 'Probopass', level: 54, types: ['rock', 'steel'], counters: [{ id: 727, name: 'Incineroar', description: 'Darkest Lariat' }, { id: 750, name: 'Mudsdale', description: 'Earthquake (4x)' }] },
          { id: 745, name: 'Lycanroc-Mid', level: 55, types: ['rock'], counters: [{ id: 730, name: 'Primarina', description: 'Surf' }, { id: 68, name: 'Machamp', description: 'Cross Chop' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Leaf Blade vence tudo.',
            team: [
              { id: 724, name: 'Decidueye', level: 58, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Leaf Blade é 4x em Relicanth/Golem. MVP.', keyMoves: ['Leaf Blade'] },
              { id: 750, name: 'Mudsdale', level: 56, types: ['ground'], location: 'Evolução', notes: 'Earthquake é 4x em Golem/Probopass.', keyMoves: ['Earthquake'] },
              { id: 448, name: 'Lucario', level: 56, types: ['fighting', 'steel'], location: 'Poni Grove', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 747, name: 'Toxapex', level: 56, types: ['poison', 'water'], location: 'Evolução', notes: 'Surf/Scald.', keyMoves: ['Scald'] },
              { id: 376, name: 'Metagross', level: 56, types: ['steel', 'psychic'], location: 'Mount Hokulani', notes: 'Meteor Mash em Carbink.', keyMoves: ['Meteor Mash'] },
              { id: 68, name: 'Machamp', level: 56, types: ['fighting'], location: 'Vast Poni Canyon', notes: 'Cross Chop.', keyMoves: ['Cross Chop'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Use Ground/Fighting.',
            team: [
              { id: 727, name: 'Incineroar', level: 58, types: ['fire', 'dark'], location: 'Evolução', notes: 'Darkest Lariat em Probopass. Cuidado com Rock.', keyMoves: ['Darkest Lariat'] },
              { id: 750, name: 'Mudsdale', level: 56, types: ['ground'], location: 'Evolução', notes: 'Earthquake MVP.', keyMoves: ['Earthquake'] },
              { id: 730, name: 'Primarina', level: 56, types: ['water', 'fairy'], location: 'Troca', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 763, name: 'Tsareena', level: 56, types: ['grass'], location: 'Evolução', notes: 'Trop Kick.', keyMoves: ['Trop Kick'] },
              { id: 448, name: 'Lucario', level: 56, types: ['fighting', 'steel'], location: 'Poni Grove', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 376, name: 'Metagross', level: 56, types: ['steel', 'psychic'], location: 'Mount Hokulani', notes: 'Meteor Mash.', keyMoves: ['Meteor Mash'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Surf vence fácil.',
            team: [
              { id: 730, name: 'Primarina', level: 60, types: ['water', 'fairy'], location: 'Evolução', notes: 'Surf vence Lycanroc/Golem/Relicanth.', keyMoves: ['Surf'] },
              { id: 750, name: 'Mudsdale', level: 56, types: ['ground'], location: 'Evolução', notes: 'Earthquake em Probopass/Golem.', keyMoves: ['Earthquake'] },
              { id: 763, name: 'Tsareena', level: 56, types: ['grass'], location: 'Evolução', notes: 'Trop Kick.', keyMoves: ['Trop Kick'] },
              { id: 212, name: 'Scizor', level: 56, types: ['bug', 'steel'], location: 'Evolução', notes: 'Bullet Punch em Carbink.', keyMoves: ['Bullet Punch'] },
              { id: 747, name: 'Toxapex', level: 56, types: ['poison', 'water'], location: 'Evolução', notes: 'Tank.', keyMoves: ['Scald'] },
              { id: 445, name: 'Garchomp', level: 56, types: ['dragon', 'ground'], location: 'Haina Desert', notes: 'Earthquake.', keyMoves: ['Earthquake'] }
            ]
          }
        ]
      },
      {
        id: 'acerola',
        name: 'Acerola',
        specialty: 'ghost',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four Acerola.',
        acePokemonId: 770,
        team: [
          { id: 302, name: 'Sableye', level: 54, types: ['dark', 'ghost'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 730, name: 'Primarina', description: 'Moonblast' }] },
          { id: 426, name: 'Drifblim', level: 54, types: ['ghost', 'flying'], counters: [{ id: 26, name: 'Raichu-Alola', description: 'Thunderbolt' }, { id: 745, name: 'Lycanroc', description: 'Stone Edge' }] },
          { id: 781, name: 'Dhelmise', level: 54, types: ['ghost', 'grass'], counters: [{ id: 727, name: 'Incineroar', description: 'Darkest Lariat' }, { id: 733, name: 'Toucannon', description: 'Beak Blast' }] },
          { id: 478, name: 'Froslass', level: 54, types: ['ice', 'ghost'], counters: [{ id: 727, name: 'Incineroar', description: 'Darkest Lariat' }, { id: 748, name: 'Salazzle', description: 'Flamethrower' }] },
          { id: 770, name: 'Palossand', level: 55, types: ['ghost', 'ground'], counters: [{ id: 722, name: 'Decidueye', description: 'Leaf Blade' }, { id: 730, name: 'Primarina', description: 'Surf' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Batalha arriscada.',
            team: [
              { id: 724, name: 'Decidueye', level: 58, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Ghost é super efetivo em Ghost. Quem bater primeiro vence. Sucker Punch ajuda.', keyMoves: ['Sucker Punch'] },
              { id: 727, name: 'Incineroar', level: 58, types: ['fire', 'dark'], location: 'Troca', notes: 'Darkest Lariat é MVP.', keyMoves: ['Darkest Lariat'] },
              { id: 89, name: 'Muk-Alola', level: 56, types: ['poison', 'dark'], location: 'Evolução', notes: 'Crunch/Knock Off.', keyMoves: ['Crunch'] },
              { id: 429, name: 'Mismagius', level: 56, types: ['ghost'], location: 'Hau\'oli Cemetery', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 778, name: 'Mimikyu', level: 56, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Disguise ajuda.', keyMoves: ['Play Rough'] },
              { id: 130, name: 'Gyarados', level: 56, types: ['water', 'flying'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Incineroar destrói.',
            team: [
              { id: 727, name: 'Incineroar', level: 58, types: ['fire', 'dark'], location: 'Evolução', notes: 'Darkest Lariat vence todos. Cuidado com Palossand (Ground).', keyMoves: ['Darkest Lariat'] },
              { id: 730, name: 'Primarina', level: 56, types: ['water', 'fairy'], location: 'Troca', notes: 'Surf em Palossand.', keyMoves: ['Surf'] },
              { id: 212, name: 'Scizor', level: 56, types: ['bug', 'steel'], location: 'Evolução', notes: 'Night Slash (Egg Move) ou X-Scissor.', keyMoves: ['X-Scissor'] },
              { id: 462, name: 'Magnezone', level: 56, types: ['electric', 'steel'], location: 'Evolução', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] },
              { id: 197, name: 'Umbreon', level: 56, types: ['dark'], location: 'Evolução', notes: 'Tank Dark.', keyMoves: ['Feint Attack'] },
              { id: 760, name: 'Bewear', level: 56, types: ['normal', 'fighting'], location: 'Rota 10', notes: 'Shadow Claw.', keyMoves: ['Shadow Claw'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Use aliados Dark.',
            team: [
              { id: 730, name: 'Primarina', level: 60, types: ['water', 'fairy'], location: 'Evolução', notes: 'Surf em Palossand. Shadow Ball se tiver.', keyMoves: ['Surf'] },
              { id: 89, name: 'Muk-Alola', level: 56, types: ['poison', 'dark'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Crunch'] },
              { id: 727, name: 'Incineroar', level: 58, types: ['fire', 'dark'], location: 'Troca', notes: 'Darkest Lariat.', keyMoves: ['Darkest Lariat'] },
              { id: 700, name: 'Sylveon', level: 56, types: ['fairy'], location: 'Evolução', notes: 'Shadow Ball (TM).', keyMoves: ['Shadow Ball'] },
              { id: 778, name: 'Mimikyu', level: 56, types: ['ghost', 'fairy'], location: 'Thrifty Megamart', notes: 'Shadow Claw.', keyMoves: ['Shadow Claw'] },
              { id: 461, name: 'Weavile', level: 56, types: ['dark', 'ice'], location: 'Mount Lanakila', notes: 'Night Slash.', keyMoves: ['Night Slash'] }
            ]
          }
        ]
      },
      {
        id: 'kahili',
        name: 'Kahili',
        specialty: 'flying',
        badge: 'Elite Four',
        location: 'Pokemon League',
        description: 'Elite Four Kahili.',
        acePokemonId: 733,
        team: [
          { id: 227, name: 'Skarmory', level: 54, types: ['steel', 'flying'], counters: [{ id: 727, name: 'Incineroar', description: 'Flamethrower' }, { id: 26, name: 'Raichu-Alola', description: 'Thunderbolt' }] },
          { id: 169, name: 'Crobat', level: 54, types: ['poison', 'flying'], counters: [{ id: 745, name: 'Lycanroc', description: 'Stone Edge' }, { id: 26, name: 'Raichu-Alola', description: 'Psychic' }] },
          { id: 741, name: 'Oricorio-Baile', level: 54, types: ['fire', 'flying'], counters: [{ id: 745, name: 'Lycanroc', description: 'Stone Edge (4x)' }, { id: 730, name: 'Primarina', description: 'Surf' }] },
          { id: 630, name: 'Mandibuzz', level: 54, types: ['dark', 'flying'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 26, name: 'Raichu-Alola', description: 'Thunderbolt' }] },
          { id: 733, name: 'Toucannon', level: 55, types: ['normal', 'flying'], counters: [{ id: 26, name: 'Raichu-Alola', description: 'Thunderbolt' }, { id: 745, name: 'Lycanroc', description: 'Stone Edge' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Desvantagem. Use Rock/Electric.',
            team: [
              { id: 724, name: 'Decidueye', level: 58, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Fraco a Flying. Não use.', keyMoves: ['Sucker Punch'] },
              { id: 745, name: 'Lycanroc', level: 56, types: ['rock'], location: 'Vast Poni Canyon', notes: 'Stone Edge destrói tudo.', keyMoves: ['Stone Edge'] },
              { id: 462, name: 'Magnezone', level: 56, types: ['electric', 'steel'], location: 'Evolução', notes: 'Thunderbolt. Resiste Flying.', keyMoves: ['Thunderbolt'] },
              { id: 76, name: 'Golem-Alola', level: 56, types: ['rock', 'electric'], location: 'Evolução', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] },
              { id: 131, name: 'Lapras', level: 56, types: ['water', 'ice'], location: 'Poni Wilds', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 700, name: 'Sylveon', level: 56, types: ['fairy'], location: 'Evolução', notes: 'Moonblast em Mandibuzz.', keyMoves: ['Moonblast'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Neutro. Use Rock.',
            team: [
              { id: 727, name: 'Incineroar', level: 58, types: ['fire', 'dark'], location: 'Evolução', notes: 'Flare Blitz em Skarmory.', keyMoves: ['Flare Blitz'] },
              { id: 745, name: 'Lycanroc', level: 56, types: ['rock'], location: 'Vast Poni Canyon', notes: 'MVP. Stone Edge.', keyMoves: ['Stone Edge'] },
              { id: 26, name: 'Raichu-Alola', level: 56, types: ['electric', 'psychic'], location: 'Evolução', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
              { id: 134, name: 'Vaporeon', level: 56, types: ['water'], location: 'Evolução', notes: 'Ice Beam (TM).', keyMoves: ['Ice Beam'] },
              { id: 466, name: 'Electivire', level: 56, types: ['electric'], location: 'Troca', notes: 'Thunder Punch.', keyMoves: ['Thunder Punch'] },
              { id: 703, name: 'Carbink', level: 56, types: ['rock', 'fairy'], location: 'Vast Poni Canyon', notes: 'Power Gem.', keyMoves: ['Power Gem'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Ice Beam ajuda.',
            team: [
              { id: 730, name: 'Primarina', level: 60, types: ['water', 'fairy'], location: 'Evolução', notes: 'Ice Beam (TM) ou Moonblast em Mandibuzz.', keyMoves: ['Moonblast'] },
              { id: 745, name: 'Lycanroc', level: 56, types: ['rock'], location: 'Vast Poni Canyon', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] },
              { id: 462, name: 'Magnezone', level: 56, types: ['electric', 'steel'], location: 'Evolução', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
              { id: 299, name: 'Probopass', level: 56, types: ['rock', 'steel'], location: 'Vast Poni Canyon', notes: 'Power Gem.', keyMoves: ['Power Gem'] },
              { id: 30, name: 'Ninetales-Alola', level: 56, types: ['ice', 'fairy'], location: 'Mount Lanakila', notes: 'Ice Beam.', keyMoves: ['Ice Beam'] },
              { id: 777, name: 'Togedemaru', level: 56, types: ['electric', 'steel'], location: 'Mount Hokulani', notes: 'Zing Zap.', keyMoves: ['Zing Zap'] }
            ]
          }
        ]
      },
      {
        id: 'kukui',
        name: 'Kukui',
        specialty: 'mixed',
        badge: 'Champion',
        location: 'Pokemon League',
        description: 'Professor Kukui (Champion).',
        acePokemonId: 727,
        team: [
          { id: 745, name: 'Lycanroc-Mid', level: 57, types: ['rock'], counters: [{ id: 750, name: 'Mudsdale', description: 'Earthquake' }, { id: 730, name: 'Primarina', description: 'Surf' }] },
          { id: 38, name: 'Ninetales-Alola', level: 56, types: ['ice', 'fairy'], counters: [{ id: 376, name: 'Metagross', description: 'Meteor Mash (4x)' }, { id: 727, name: 'Incineroar', description: 'Flare Blitz' }] },
          { id: 628, name: 'Braviary', level: 56, types: ['normal', 'flying'], counters: [{ id: 26, name: 'Raichu-Alola', description: 'Thunderbolt' }, { id: 745, name: 'Lycanroc', description: 'Stone Edge' }] },
          { id: 462, name: 'Magnezone', level: 56, types: ['electric', 'steel'], counters: [{ id: 750, name: 'Mudsdale', description: 'Earthquake (4x)' }, { id: 727, name: 'Incineroar', description: 'Flare Blitz' }] },
          { id: 143, name: 'Snorlax', level: 56, types: ['normal'], counters: [{ id: 760, name: 'Bewear', description: 'Hammer Arm' }, { id: 68, name: 'Machamp', description: 'Close Combat' }] },
          { id: 727, name: 'Incineroar/Decidueye/Primarina', level: 58, types: ['fire', 'dark'], counters: [{ id: 730, name: 'Primarina', description: 'Vantagem de tipo' }, { id: 722, name: 'Decidueye', description: 'Vantagem' }] }
        ],
        recommendedTeams: [
          {
            starterId: 722, starterName: 'Rowlet', description: 'Decidueye vs Incineroar (Final).',
            team: [
              { id: 724, name: 'Decidueye', level: 60, types: ['grass', 'ghost'], location: 'Inicial', notes: 'Leaf Blade em Lycanroc/Snorlax.', keyMoves: ['Leaf Blade'] },
              { id: 730, name: 'Primarina', level: 58, types: ['water', 'fairy'], location: 'Troca', notes: 'Surf em Incineroar.', keyMoves: ['Surf'] },
              { id: 750, name: 'Mudsdale', level: 58, types: ['ground'], location: 'Poni Island', notes: 'Earthquake em Magnezone (4x)/Lycanroc.', keyMoves: ['Earthquake'] },
              { id: 376, name: 'Metagross', level: 58, types: ['steel', 'psychic'], location: 'Mount Hokulani (Beldum)', notes: 'Meteor Mash em Ninetales (4x).', keyMoves: ['Meteor Mash'] },
              { id: 758, name: 'Salazzle', level: 58, types: ['poison', 'fire'], location: 'Wela Volcano', notes: 'Sludge Wave em Ninetales.', keyMoves: ['Sludge Wave'] },
              { id: 466, name: 'Electivire', level: 58, types: ['electric'], location: 'Troca (Elekid)', notes: 'Thunderbolt em Braviary.', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 725, starterName: 'Litten', description: 'Incineroar vs Primarina (Final).',
            team: [
              { id: 727, name: 'Incineroar', level: 60, types: ['fire', 'dark'], location: 'Inicial', notes: 'Flare Blitz em Ninetales/Magnezone.', keyMoves: ['Flare Blitz'] },
              { id: 462, name: 'Magnezone', level: 58, types: ['electric', 'steel'], location: 'Evolução', notes: 'Thunderbolt em Primarina/Braviary.', keyMoves: ['Thunderbolt'] },
              { id: 750, name: 'Mudsdale', level: 58, types: ['ground'], location: 'Poni Island', notes: 'Earthquake em Magnezone/Lycanroc.', keyMoves: ['Earthquake'] },
              { id: 763, name: 'Tsareena', level: 58, types: ['grass'], location: 'Evolução', notes: 'Trop Kick em Primarina/Lycanroc.', keyMoves: ['Trop Kick'] },
              { id: 760, name: 'Bewear', level: 58, types: ['normal', 'fighting'], location: 'Evolução', notes: 'Hammer Arm em Snorlax.', keyMoves: ['Hammer Arm'] },
              { id: 131, name: 'Lapras', level: 56, types: ['water', 'ice'], location: 'Poni Wilds', notes: 'Ice Beam em Braviary.', keyMoves: ['Ice Beam'] }
            ]
          },
          {
            starterId: 728, starterName: 'Popplio', description: 'Primarina vs Decidueye (Final).',
            team: [
              { id: 730, name: 'Primarina', level: 60, types: ['water', 'fairy'], location: 'Inicial', notes: 'Moonblast em Snorlax/Braviary.', keyMoves: ['Moonblast'] },
              { id: 727, name: 'Incineroar', level: 58, types: ['fire', 'dark'], location: 'Troca', notes: 'Darkest Lariat em Decidueye.', keyMoves: ['Darkest Lariat'] },
              { id: 750, name: 'Mudsdale', level: 58, types: ['ground'], location: 'Poni Island', notes: 'Earthquake em Magnezone.', keyMoves: ['Earthquake'] },
              { id: 376, name: 'Metagross', level: 58, types: ['steel', 'psychic'], location: 'Evolução', notes: 'Meteor Mash em Ninetales.', keyMoves: ['Meteor Mash'] },
              { id: 169, name: 'Crobat', level: 58, types: ['poison', 'flying'], location: 'Evolução', notes: 'Acrobatics em Decidueye.', keyMoves: ['Acrobatics'] },
              { id: 462, name: 'Magnezone', level: 58, types: ['electric', 'steel'], location: 'Evolução', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'swsh-galar',
    game: 'Sword / Shield',
    region: 'Galar',
    image: 'https://img.pokemondb.net/boxes/sword.jpg',
    starters: [
      { id: 810, name: 'Grookey', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 813, name: 'Scorbunny', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 816, name: 'Sobble', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'milo',
        name: 'Milo',
        specialty: 'grass',
        badge: 'Grass Badge',
        location: 'Turffield Stadium',
        description: 'Gym Leader (Grass).',
        acePokemonId: 830,
        team: [
          { id: 829, name: 'Gossifleur', level: 19, types: ['grass'], counters: [{ id: 813, name: 'Scorbunny', description: 'Ember' }, { id: 821, name: 'Rookidee', description: 'Peck' }] },
          { id: 830, name: 'Eldegoss', level: 20, types: ['grass'], counters: [{ id: 813, name: 'Scorbunny', description: 'Ember' }, { id: 837, name: 'Rolycoly', description: 'Smack Down' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Desvantagem (Grass vs Grass).',
            team: [
              { id: 811, name: 'Thwackey', level: 20, types: ['grass'], location: 'Evolução', notes: 'Branch Poke.', keyMoves: ['Branch Poke'] },
              { id: 822, name: 'Corvisquire', level: 20, types: ['flying'], location: 'Rota 1 (Rookidee)', notes: 'Peck/Pluck é super efetivo. MVP.', keyMoves: ['Pluck'] },
              { id: 837, name: 'Rolycoly', level: 18, types: ['rock'], location: 'Galar Mine', notes: 'Resiste a Normal. Smack Down.', keyMoves: ['Smack Down'] },
              { id: 12, name: 'Butterfree', level: 18, types: ['bug', 'flying'], location: 'Rota 1 (Caterpie)', notes: 'Sleep Powder + Gust.', keyMoves: ['Gust'] },
              { id: 674, name: 'Pancham', level: 18, types: ['fighting'], location: 'Wild Area', notes: 'Arm Thrust.', keyMoves: ['Arm Thrust'] },
              { id: 263, name: 'Zigzagoon-Galar', level: 18, types: ['dark', 'normal'], location: 'Rota 2', notes: 'Headbutt.', keyMoves: ['Headbutt'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Vantagem Total.',
            team: [
              { id: 814, name: 'Raboot', level: 20, types: ['fire'], location: 'Evolução', notes: 'Ember/Flame Charge destrói.', keyMoves: ['Flame Charge'] },
              { id: 822, name: 'Corvisquire', level: 18, types: ['flying'], location: 'Rota 1', notes: 'Pluck.', keyMoves: ['Pluck'] },
              { id: 831, name: 'Wooloo', level: 18, types: ['normal'], location: 'Rota 1', notes: 'Tank.', keyMoves: ['Tackle'] },
              { id: 12, name: 'Butterfree', level: 18, types: ['bug', 'flying'], location: 'Rota 1', notes: 'Gust.', keyMoves: ['Gust'] },
              { id: 833, name: 'Chewtle', level: 18, types: ['water'], location: 'Rota 2', notes: 'Bite.', keyMoves: ['Bite'] },
              { id: 827, name: 'Nickit', level: 18, types: ['dark'], location: 'Rota 2', notes: 'Snarl.', keyMoves: ['Snarl'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Desvantagem. Use Voador.',
            team: [
              { id: 817, name: 'Drizzile', level: 20, types: ['water'], location: 'Evolução', notes: 'Não use Water Gun. Use Pound ou troque.', keyMoves: ['Pound'] },
              { id: 822, name: 'Corvisquire', level: 20, types: ['flying'], location: 'Rota 1', notes: 'Pluck é MVP.', keyMoves: ['Pluck'] },
              { id: 833, name: 'Chewtle', level: 18, types: ['water'], location: 'Rota 2', notes: 'Bite.', keyMoves: ['Bite'] },
              { id: 12, name: 'Butterfree', level: 18, types: ['bug', 'flying'], location: 'Rota 1', notes: 'Gust.', keyMoves: ['Gust'] },
              { id: 831, name: 'Wooloo', level: 18, types: ['normal'], location: 'Rota 1', notes: 'Tank.', keyMoves: ['Tackle'] },
              { id: 835, name: 'Yamper', level: 18, types: ['electric'], location: 'Rota 2', notes: 'Nuzzle para paralisar.', keyMoves: ['Nuzzle'] }
            ]
          }
        ]
      },
      {
        id: 'nessa',
        name: 'Nessa',
        specialty: 'water',
        badge: 'Water Badge',
        location: 'Hulbury Stadium',
        description: 'Gym Leader (Water).',
        acePokemonId: 834,
        team: [
          { id: 118, name: 'Goldeen', level: 22, types: ['water'], counters: [{ id: 811, name: 'Thwackey', description: 'Razor Leaf' }, { id: 835, name: 'Yamper', description: 'Spark' }] },
          { id: 846, name: 'Arrokuda', level: 23, types: ['water'], counters: [{ id: 811, name: 'Thwackey', description: 'Razor Leaf' }, { id: 25, name: 'Pikachu', description: 'Electro Ball' }] },
          { id: 834, name: 'Drednaw', level: 24, types: ['water', 'rock'], counters: [{ id: 811, name: 'Thwackey', description: 'Razor Leaf (4x)' }, { id: 829, name: 'Gossifleur', description: 'Leafage (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Vantagem Total.',
            team: [
              { id: 811, name: 'Thwackey', level: 25, types: ['grass'], location: 'Evolução', notes: 'Razor Leaf é 4x em Drednaw. MVP.', keyMoves: ['Razor Leaf'] },
              { id: 835, name: 'Yamper', level: 22, types: ['electric'], location: 'Rota 2', notes: 'Spark.', keyMoves: ['Spark'] },
              { id: 829, name: 'Gossifleur', level: 22, types: ['grass'], location: 'Rota 2', notes: 'Leafage.', keyMoves: ['Leafage'] },
              { id: 25, name: 'Pikachu', level: 22, types: ['electric'], location: 'Rota 4', notes: 'Electro Ball.', keyMoves: ['Electro Ball'] },
              { id: 822, name: 'Corvisquire', level: 22, types: ['flying'], location: 'Rota 1', notes: 'Pluck.', keyMoves: ['Pluck'] },
              { id: 831, name: 'Wooloo', level: 22, types: ['normal'], location: 'Rota 1', notes: 'Tank.', keyMoves: ['Tackle'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Desvantagem. Use Elétrico.',
            team: [
              { id: 814, name: 'Raboot', level: 25, types: ['fire'], location: 'Evolução', notes: 'Fraco a Water/Rock. Não use.', keyMoves: ['Double Kick'] },
              { id: 835, name: 'Yamper', level: 23, types: ['electric'], location: 'Rota 2', notes: 'Spark é essencial.', keyMoves: ['Spark'] },
              { id: 829, name: 'Gossifleur', level: 22, types: ['grass'], location: 'Rota 2', notes: 'Leafage 4x em Drednaw.', keyMoves: ['Leafage'] },
              { id: 25, name: 'Pikachu', level: 22, types: ['electric'], location: 'Rota 4', notes: 'Electro Ball.', keyMoves: ['Electro Ball'] },
              { id: 822, name: 'Corvisquire', level: 22, types: ['flying'], location: 'Rota 1', notes: 'Pluck.', keyMoves: ['Pluck'] },
              { id: 831, name: 'Wooloo', level: 22, types: ['normal'], location: 'Rota 1', notes: 'Tank.', keyMoves: ['Tackle'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Neutro. Use Grass/Electric.',
            team: [
              { id: 817, name: 'Drizzile', level: 25, types: ['water'], location: 'Evolução', notes: 'Resiste a Water.', keyMoves: ['Water Pulse'] },
              { id: 835, name: 'Yamper', level: 23, types: ['electric'], location: 'Rota 2', notes: 'Spark MVP.', keyMoves: ['Spark'] },
              { id: 829, name: 'Gossifleur', level: 22, types: ['grass'], location: 'Rota 2', notes: 'Leafage 4x em Drednaw.', keyMoves: ['Leafage'] },
              { id: 25, name: 'Pikachu', level: 22, types: ['electric'], location: 'Rota 4', notes: 'Electro Ball.', keyMoves: ['Electro Ball'] },
              { id: 822, name: 'Corvisquire', level: 22, types: ['flying'], location: 'Rota 1', notes: 'Pluck.', keyMoves: ['Pluck'] },
              { id: 831, name: 'Wooloo', level: 22, types: ['normal'], location: 'Rota 1', notes: 'Tank.', keyMoves: ['Tackle'] }
            ]
          }
        ]
      },
      {
        id: 'kabu',
        name: 'Kabu',
        specialty: 'fire',
        badge: 'Fire Badge',
        location: 'Motostoke Stadium',
        description: 'Gym Leader (Fire).',
        acePokemonId: 851,
        team: [
          { id: 38, name: 'Ninetales', level: 25, types: ['fire'], counters: [{ id: 834, name: 'Drednaw', description: 'Rock Tomb' }, { id: 838, name: 'Carkol', description: 'Smack Down' }] },
          { id: 59, name: 'Arcanine', level: 25, types: ['fire'], counters: [{ id: 817, name: 'Drizzile', description: 'Water Pulse' }, { id: 524, name: 'Roggenrola', description: 'Smack Down' }] },
          { id: 851, name: 'Centiskorch', level: 27, types: ['fire', 'bug'], counters: [{ id: 834, name: 'Drednaw', description: 'Rock Tomb (4x)' }, { id: 838, name: 'Carkol', description: 'Smack Down (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Desvantagem. Use Pedra/Água.',
            team: [
              { id: 811, name: 'Thwackey', level: 28, types: ['grass'], location: 'Evolução', notes: 'Fraco a Fire/Bug. Não use.', keyMoves: ['Branch Poke'] },
              { id: 834, name: 'Drednaw', level: 26, types: ['water', 'rock'], location: 'Evolução Chewtle', notes: 'Rock Tomb é 4x em Centiskorch. MVP.', keyMoves: ['Rock Tomb'] },
              { id: 838, name: 'Carkol', level: 26, types: ['rock', 'fire'], location: 'Evolução Rolycoly', notes: 'Smack Down 4x em Centiskorch.', keyMoves: ['Smack Down'] },
              { id: 846, name: 'Arrokuda', level: 25, types: ['water'], location: 'Rota 2', notes: 'Aqua Jet.', keyMoves: ['Aqua Jet'] },
              { id: 524, name: 'Roggenrola', level: 25, types: ['rock'], location: 'Galar Mine', notes: 'Smack Down.', keyMoves: ['Smack Down'] },
              { id: 50, name: 'Diglett', level: 25, types: ['ground'], location: 'Galar Mine', notes: 'Dig.', keyMoves: ['Dig'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Neutro. Use Pedra.',
            team: [
              { id: 814, name: 'Raboot', level: 28, types: ['fire'], location: 'Evolução', notes: 'Resiste a Fire.', keyMoves: ['Flame Charge'] },
              { id: 834, name: 'Drednaw', level: 26, types: ['water', 'rock'], location: 'Evolução Chewtle', notes: 'MVP.', keyMoves: ['Rock Tomb'] },
              { id: 838, name: 'Carkol', level: 26, types: ['rock', 'fire'], location: 'Evolução', notes: 'Smack Down 4x.', keyMoves: ['Smack Down'] },
              { id: 524, name: 'Roggenrola', level: 25, types: ['rock'], location: 'Galar Mine', notes: 'Smack Down.', keyMoves: ['Smack Down'] },
              { id: 846, name: 'Arrokuda', level: 25, types: ['water'], location: 'Rota 2', notes: 'Aqua Jet.', keyMoves: ['Aqua Jet'] },
              { id: 50, name: 'Diglett', level: 25, types: ['ground'], location: 'Galar Mine', notes: 'Dig.', keyMoves: ['Dig'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Vantagem Total.',
            team: [
              { id: 817, name: 'Drizzile', level: 28, types: ['water'], location: 'Evolução', notes: 'Water Pulse destrói.', keyMoves: ['Water Pulse'] },
              { id: 834, name: 'Drednaw', level: 26, types: ['water', 'rock'], location: 'Evolução', notes: 'Rock Tomb para Centiskorch.', keyMoves: ['Rock Tomb'] },
              { id: 838, name: 'Carkol', level: 26, types: ['rock', 'fire'], location: 'Galar Mine', notes: 'Smack Down.', keyMoves: ['Smack Down'] },
              { id: 524, name: 'Roggenrola', level: 25, types: ['rock'], location: 'Galar Mine', notes: 'Smack Down.', keyMoves: ['Smack Down'] },
              { id: 50, name: 'Diglett', level: 25, types: ['ground'], location: 'Galar Mine', notes: 'Dig.', keyMoves: ['Dig'] },
              { id: 846, name: 'Arrokuda', level: 25, types: ['water'], location: 'Rota 2', notes: 'Aqua Jet.', keyMoves: ['Aqua Jet'] }
            ]
          }
        ]
      },
      {
        id: 'bea',
        name: 'Bea (Sword)',
        specialty: 'fighting',
        badge: 'Fighting Badge',
        location: 'Stow-on-Side',
        description: 'Gym Leader (Fighting) - Sword.',
        acePokemonId: 68,
        team: [
          { id: 237, name: 'Hitmontop', level: 34, types: ['fighting'], counters: [{ id: 823, name: 'Corviknight', description: 'Drill Peck' }, { id: 282, name: 'Gardevoir', description: 'Psychic' }] },
          { id: 675, name: 'Pangoro', level: 34, types: ['fighting', 'dark'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast (4x)' }, { id: 858, name: 'Hatterene', description: 'Dazzling Gleam (4x)' }] },
          { id: 865, name: 'Sirfetch\'d', level: 35, types: ['fighting'], counters: [{ id: 823, name: 'Corviknight', description: 'Pluck' }, { id: 858, name: 'Hatterene', description: 'Psybeam' }] },
          { id: 68, name: 'Machamp-GMax', level: 36, types: ['fighting'], counters: [{ id: 823, name: 'Corviknight', description: 'Drill Peck' }, { id: 760, name: 'Bewear', description: 'Aerial Ace' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Use Voador/Fada.',
            team: [
              { id: 812, name: 'Rillaboom', level: 36, types: ['grass'], location: 'Evolução', notes: 'Drum Beating.', keyMoves: ['Drum Beating'] },
              { id: 823, name: 'Corviknight', level: 38, types: ['flying', 'steel'], location: 'Evolução', notes: 'Drill Peck/Pluck. Resiste Fighting. MVP.', keyMoves: ['Drill Peck'] },
              { id: 858, name: 'Hatterene', level: 35, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Psybeam/Dazzling Gleam.', keyMoves: ['Dazzling Gleam'] },
              { id: 700, name: 'Sylveon', level: 35, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 282, name: 'Gardevoir', level: 35, types: ['psychic', 'fairy'], location: 'Wild Area', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 826, name: 'Orbeetle', level: 35, types: ['bug', 'psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Cinderace tem Pyro Ball.',
            team: [
              { id: 815, name: 'Cinderace', level: 36, types: ['fire'], location: 'Evolução', notes: 'Pyro Ball. Bounce (Flying) é ótimo.', keyMoves: ['Bounce'] },
              { id: 823, name: 'Corviknight', level: 38, types: ['flying', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Drill Peck'] },
              { id: 282, name: 'Gardevoir', level: 35, types: ['psychic', 'fairy'], location: 'Wild Area', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 858, name: 'Hatterene', level: 35, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Dazzling Gleam.', keyMoves: ['Dazzling Gleam'] },
              { id: 700, name: 'Sylveon', level: 35, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 826, name: 'Orbeetle', level: 35, types: ['bug', 'psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Use Voador/Psíquico.',
            team: [
              { id: 818, name: 'Inteleon', level: 36, types: ['water'], location: 'Evolução', notes: 'Snipe Shot.', keyMoves: ['Snipe Shot'] },
              { id: 823, name: 'Corviknight', level: 38, types: ['flying', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Drill Peck'] },
              { id: 858, name: 'Hatterene', level: 35, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Psybeam.', keyMoves: ['Psybeam'] },
              { id: 282, name: 'Gardevoir', level: 35, types: ['psychic', 'fairy'], location: 'Wild Area', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 700, name: 'Sylveon', level: 35, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 826, name: 'Orbeetle', level: 35, types: ['bug', 'psychic'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] }
            ]
          }
        ]
      },
      {
        id: 'allister',
        name: 'Allister (Shield)',
        specialty: 'ghost',
        badge: 'Ghost Badge',
        location: 'Stow-on-Side',
        description: 'Gym Leader (Ghost) - Shield.',
        acePokemonId: 94,
        team: [
          { id: 563, name: 'Yamask-Galar', level: 34, types: ['ground', 'ghost'], counters: [{ id: 812, name: 'Rillaboom', description: 'Drum Beating' }, { id: 818, name: 'Inteleon', description: 'Snipe Shot' }] },
          { id: 778, name: 'Mimikyu', level: 34, types: ['ghost', 'fairy'], counters: [{ id: 823, name: 'Corviknight', description: 'Steel Wing' }, { id: 859, name: 'Impidimp', description: 'Dark Pulse' }] },
          { id: 864, name: 'Cursola', level: 35, types: ['ghost'], counters: [{ id: 862, name: 'Obstagoon', description: 'Night Slash' }, { id: 815, name: 'Cinderace', description: 'Pyro Ball' }] },
          { id: 94, name: 'Gengar-GMax', level: 36, types: ['ghost', 'poison'], counters: [{ id: 862, name: 'Obstagoon', description: 'Night Slash' }, { id: 435, name: 'Skuntank', description: 'Night Slash' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Rillaboom tem Knock Off.',
            team: [
              { id: 812, name: 'Rillaboom', level: 36, types: ['grass'], location: 'Evolução', notes: 'Drum Beating em Yamask. Knock Off em Gengar.', keyMoves: ['Knock Off'] },
              { id: 862, name: 'Obstagoon', level: 35, types: ['dark', 'normal'], location: 'Evolução', notes: 'Imune a Ghost. Night Slash. MVP.', keyMoves: ['Night Slash'] },
              { id: 823, name: 'Corviknight', level: 36, types: ['flying', 'steel'], location: 'Evolução', notes: 'Steel Wing em Mimikyu.', keyMoves: ['Steel Wing'] },
              { id: 828, name: 'Thievul', level: 35, types: ['dark'], location: 'Evolução', notes: 'Snarl.', keyMoves: ['Snarl'] },
              { id: 675, name: 'Pangoro', level: 35, types: ['fighting', 'dark'], location: 'Wild Area', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 426, name: 'Drifblim', level: 35, types: ['ghost', 'flying'], location: 'Wild Area', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Cinderace vence Cursola.',
            team: [
              { id: 815, name: 'Cinderace', level: 36, types: ['fire'], location: 'Evolução', notes: 'Pyro Ball.', keyMoves: ['Pyro Ball'] },
              { id: 862, name: 'Obstagoon', level: 35, types: ['dark', 'normal'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Night Slash'] },
              { id: 435, name: 'Skuntank', level: 35, types: ['poison', 'dark'], location: 'Wild Area', notes: 'Night Slash.', keyMoves: ['Night Slash'] },
              { id: 823, name: 'Corviknight', level: 36, types: ['flying', 'steel'], location: 'Evolução', notes: 'Steel Wing.', keyMoves: ['Steel Wing'] },
              { id: 828, name: 'Thievul', level: 35, types: ['dark'], location: 'Evolução', notes: 'Snarl.', keyMoves: ['Snarl'] },
              { id: 860, name: 'Morgrem', level: 35, types: ['dark', 'fairy'], location: 'Glimwood Tangle', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Inteleon tem Sucker Punch.',
            team: [
              { id: 818, name: 'Inteleon', level: 36, types: ['water'], location: 'Evolução', notes: 'Snipe Shot em Yamask. Sucker Punch ajuda.', keyMoves: ['Sucker Punch'] },
              { id: 862, name: 'Obstagoon', level: 35, types: ['dark', 'normal'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Night Slash'] },
              { id: 828, name: 'Thievul', level: 35, types: ['dark'], location: 'Evolução', notes: 'Snarl.', keyMoves: ['Snarl'] },
              { id: 823, name: 'Corviknight', level: 36, types: ['flying', 'steel'], location: 'Evolução', notes: 'Steel Wing.', keyMoves: ['Steel Wing'] },
              { id: 435, name: 'Skuntank', level: 35, types: ['poison', 'dark'], location: 'Wild Area', notes: 'Night Slash.', keyMoves: ['Night Slash'] },
              { id: 860, name: 'Morgrem', level: 35, types: ['dark', 'fairy'], location: 'Glimwood Tangle', notes: 'Dark Pulse.', keyMoves: ['Dark Pulse'] }
            ]
          }
        ]
      },
      {
        id: 'opal',
        name: 'Opal',
        specialty: 'fairy',
        badge: 'Fairy Badge',
        location: 'Ballonlea Stadium',
        description: 'Gym Leader (Fairy).',
        acePokemonId: 869,
        team: [
          { id: 110, name: 'Weezing-Galar', level: 36, types: ['poison', 'fairy'], counters: [{ id: 823, name: 'Corviknight', description: 'Steel Wing' }, { id: 849, name: 'Toxtricity', description: 'Overdrive' }] },
          { id: 303, name: 'Mawile', level: 36, types: ['steel', 'fairy'], counters: [{ id: 815, name: 'Cinderace', description: 'Pyro Ball' }, { id: 839, name: 'Coalossal', description: 'Heat Crash' }] },
          { id: 468, name: 'Togekiss', level: 37, types: ['fairy', 'flying'], counters: [{ id: 849, name: 'Toxtricity', description: 'Discharge' }, { id: 823, name: 'Corviknight', description: 'Steel Wing' }] },
          { id: 869, name: 'Alcremie-GMax', level: 38, types: ['fairy'], counters: [{ id: 823, name: 'Corviknight', description: 'Steel Wing' }, { id: 849, name: 'Toxtricity', description: 'Sludge Bomb' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Desvantagem. Use Steel/Poison.',
            team: [
              { id: 812, name: 'Rillaboom', level: 38, types: ['grass'], location: 'Evolução', notes: 'Resiste a nada. Evite.', keyMoves: ['Drum Beating'] },
              { id: 823, name: 'Corviknight', level: 38, types: ['flying', 'steel'], location: 'Evolução', notes: 'Imune a Poison. Resiste Fairy. Steel Wing MVP.', keyMoves: ['Steel Wing'] },
              { id: 849, name: 'Toxtricity', level: 38, types: ['electric', 'poison'], location: 'Evolução Toxel', notes: 'Sludge Bomb/Poison Jab é 4x em Alcremie? Não, 2x. 4x não existe aqui.', keyMoves: ['Sludge Bomb'] },
              { id: 858, name: 'Hatterene', level: 38, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Psychic'] },
              { id: 110, name: 'Weezing-Galar', level: 38, types: ['poison', 'fairy'], location: 'Slumbering Weald', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 758, name: 'Salazzle', level: 38, types: ['poison', 'fire'], location: 'Wild Area', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Cinderace vence Mawile/Weezing.',
            team: [
              { id: 815, name: 'Cinderace', level: 38, types: ['fire'], location: 'Evolução', notes: 'Pyro Ball em Mawile/Weezing. Resiste Fairy.', keyMoves: ['Pyro Ball'] },
              { id: 823, name: 'Corviknight', level: 38, types: ['flying', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Steel Wing'] },
              { id: 849, name: 'Toxtricity', level: 38, types: ['electric', 'poison'], location: 'Evolução', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 858, name: 'Hatterene', level: 38, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Dazzling Gleam.', keyMoves: ['Dazzling Gleam'] },
              { id: 110, name: 'Weezing-Galar', level: 38, types: ['poison', 'fairy'], location: 'Slumbering Weald', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 758, name: 'Salazzle', level: 38, types: ['poison', 'fire'], location: 'Wild Area', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Use Steel/Poison.',
            team: [
              { id: 818, name: 'Inteleon', level: 38, types: ['water'], location: 'Evolução', notes: 'Snipe Shot.', keyMoves: ['Snipe Shot'] },
              { id: 823, name: 'Corviknight', level: 38, types: ['flying', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Steel Wing'] },
              { id: 849, name: 'Toxtricity', level: 38, types: ['electric', 'poison'], location: 'Evolução', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 858, name: 'Hatterene', level: 38, types: ['psychic', 'fairy'], location: 'Evolução', notes: 'Psychic.', keyMoves: ['Psychic'] },
              { id: 110, name: 'Weezing-Galar', level: 38, types: ['poison', 'fairy'], location: 'Slumbering Weald', notes: 'Sludge Bomb.', keyMoves: ['Sludge Bomb'] },
              { id: 437, name: 'Bronzong', level: 38, types: ['steel', 'psychic'], location: 'Wild Area', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] }
            ]
          }
        ]
      },
      {
        id: 'gordie',
        name: 'Gordie (Sword)',
        specialty: 'rock',
        badge: 'Rock Badge',
        location: 'Circhester Stadium',
        description: 'Gym Leader (Rock) - Sword.',
        acePokemonId: 839,
        team: [
          { id: 885, name: 'Barbaracle', level: 40, types: ['rock', 'water'], counters: [{ id: 812, name: 'Rillaboom', description: 'Drum Beating (4x)' }, { id: 849, name: 'Toxtricity', description: 'Overdrive (4x)' }] },
          { id: 213, name: 'Shuckle', level: 40, types: ['bug', 'rock'], counters: [{ id: 818, name: 'Inteleon', description: 'Snipe Shot' }, { id: 879, name: 'Copperajah', description: 'Iron Head' }] },
          { id: 874, name: 'Stonjourner', level: 41, types: ['rock'], counters: [{ id: 812, name: 'Rillaboom', description: 'Drum Beating' }, { id: 818, name: 'Inteleon', description: 'Snipe Shot' }] },
          { id: 839, name: 'Coalossal-GMax', level: 42, types: ['rock', 'fire'], counters: [{ id: 818, name: 'Inteleon', description: 'Snipe Shot (4x)' }, { id: 260, name: 'Swampert', description: 'Earthquake (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Vantagem Total.',
            team: [
              { id: 812, name: 'Rillaboom', level: 42, types: ['grass'], location: 'Evolução', notes: 'Drum Beating é 4x em Barbaracle. MVP.', keyMoves: ['Drum Beating'] },
              { id: 818, name: 'Inteleon', level: 42, types: ['water'], location: 'Troca', notes: 'Snipe Shot 4x em Coalossal.', keyMoves: ['Snipe Shot'] },
              { id: 260, name: 'Swampert', level: 40, types: ['water', 'ground'], location: 'Dynamax Adventures', notes: 'Earthquake 4x em Coalossal.', keyMoves: ['Earthquake'] },
              { id: 68, name: 'Machamp', level: 40, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop.', keyMoves: ['Cross Chop'] },
              { id: 530, name: 'Excadrill', level: 40, types: ['ground', 'steel'], location: 'Wild Area', notes: 'Iron Head/Drill Run.', keyMoves: ['Iron Head'] },
              { id: 448, name: 'Lucario', level: 40, types: ['fighting', 'steel'], location: 'Wild Area', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Desvantagem. Use Water/Ground.',
            team: [
              { id: 815, name: 'Cinderace', level: 42, types: ['fire'], location: 'Evolução', notes: 'Não use. Double Kick ajuda, mas arriscado.', keyMoves: ['Double Kick'] },
              { id: 537, name: 'Seismitoad', level: 40, types: ['water', 'ground'], location: 'Wild Area', notes: 'Earthquake/Surf. MVP.', keyMoves: ['Surf'] },
              { id: 812, name: 'Rillaboom', level: 40, types: ['grass'], location: 'Troca', notes: 'Drum Beating.', keyMoves: ['Drum Beating'] },
              { id: 530, name: 'Excadrill', level: 40, types: ['ground', 'steel'], location: 'Wild Area', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 448, name: 'Lucario', level: 40, types: ['fighting', 'steel'], location: 'Wild Area', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 272, name: 'Ludicolo', level: 40, types: ['water', 'grass'], location: 'Evolução Lotad', notes: 'Energy Ball/Surf.', keyMoves: ['Surf'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Vantagem Total.',
            team: [
              { id: 818, name: 'Inteleon', level: 42, types: ['water'], location: 'Evolução', notes: 'Snipe Shot é 4x em Coalossal. MVP.', keyMoves: ['Snipe Shot'] },
              { id: 812, name: 'Rillaboom', level: 40, types: ['grass'], location: 'Troca', notes: 'Drum Beating.', keyMoves: ['Drum Beating'] },
              { id: 68, name: 'Machamp', level: 40, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop.', keyMoves: ['Cross Chop'] },
              { id: 530, name: 'Excadrill', level: 40, types: ['ground', 'steel'], location: 'Wild Area', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 448, name: 'Lucario', level: 40, types: ['fighting', 'steel'], location: 'Wild Area', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 537, name: 'Seismitoad', level: 40, types: ['water', 'ground'], location: 'Wild Area', notes: 'Earthquake.', keyMoves: ['Earthquake'] }
            ]
          }
        ]
      },
      {
        id: 'melony',
        name: 'Melony (Shield)',
        specialty: 'ice',
        badge: 'Ice Badge',
        location: 'Circhester Stadium',
        description: 'Gym Leader (Ice) - Shield.',
        acePokemonId: 131,
        team: [
          { id: 872, name: 'Frosmoth', level: 40, types: ['ice', 'bug'], counters: [{ id: 815, name: 'Cinderace', description: 'Pyro Ball (4x)' }, { id: 839, name: 'Coalossal', description: 'Rock Blast (4x)' }] },
          { id: 875, name: 'Eiscue', level: 40, types: ['ice'], counters: [{ id: 815, name: 'Cinderace', description: 'Pyro Ball' }, { id: 849, name: 'Toxtricity', description: 'Overdrive' }] },
          { id: 555, name: 'Darmanitan-Galar', level: 41, types: ['ice'], counters: [{ id: 815, name: 'Cinderace', description: 'Pyro Ball' }, { id: 68, name: 'Machamp', description: 'Cross Chop' }] },
          { id: 131, name: 'Lapras-GMax', level: 42, types: ['water', 'ice'], counters: [{ id: 849, name: 'Toxtricity', description: 'Discharge' }, { id: 812, name: 'Rillaboom', description: 'Drum Beating' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Desvantagem. Use Fire/Electric.',
            team: [
              { id: 812, name: 'Rillaboom', level: 42, types: ['grass'], location: 'Evolução', notes: 'Fraco a Ice. Drum Beating bom em Lapras.', keyMoves: ['Drum Beating'] },
              { id: 851, name: 'Centiskorch', level: 40, types: ['fire', 'bug'], location: 'Evolução', notes: 'Fire Lash. MVP.', keyMoves: ['Fire Lash'] },
              { id: 839, name: 'Coalossal', level: 40, types: ['rock', 'fire'], location: 'Evolução', notes: 'Heat Crash.', keyMoves: ['Heat Crash'] },
              { id: 849, name: 'Toxtricity', level: 40, types: ['electric', 'poison'], location: 'Evolução', notes: 'Overdrive em Lapras.', keyMoves: ['Overdrive'] },
              { id: 448, name: 'Lucario', level: 40, types: ['fighting', 'steel'], location: 'Wild Area', notes: 'Aura Sphere/Meteor Mash.', keyMoves: ['Aura Sphere'] },
              { id: 675, name: 'Pangoro', level: 40, types: ['fighting', 'dark'], location: 'Wild Area', notes: 'Hammer Arm.', keyMoves: ['Hammer Arm'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Vantagem Total.',
            team: [
              { id: 815, name: 'Cinderace', level: 42, types: ['fire'], location: 'Evolução', notes: 'Pyro Ball é 4x em Frosmoth. MVP.', keyMoves: ['Pyro Ball'] },
              { id: 849, name: 'Toxtricity', level: 40, types: ['electric', 'poison'], location: 'Evolução', notes: 'Overdrive em Lapras.', keyMoves: ['Overdrive'] },
              { id: 823, name: 'Corviknight', level: 40, types: ['flying', 'steel'], location: 'Evolução', notes: 'Steel Wing.', keyMoves: ['Steel Wing'] },
              { id: 851, name: 'Centiskorch', level: 40, types: ['fire', 'bug'], location: 'Evolução', notes: 'Fire Lash.', keyMoves: ['Fire Lash'] },
              { id: 839, name: 'Coalossal', level: 40, types: ['rock', 'fire'], location: 'Evolução', notes: 'Heat Crash.', keyMoves: ['Heat Crash'] },
              { id: 448, name: 'Lucario', level: 40, types: ['fighting', 'steel'], location: 'Wild Area', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Use Fire/Electric/Fighting.',
            team: [
              { id: 818, name: 'Inteleon', level: 42, types: ['water'], location: 'Evolução', notes: 'Snipe Shot.', keyMoves: ['Snipe Shot'] },
              { id: 851, name: 'Centiskorch', level: 40, types: ['fire', 'bug'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Fire Lash'] },
              { id: 68, name: 'Machamp', level: 40, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop.', keyMoves: ['Cross Chop'] },
              { id: 839, name: 'Coalossal', level: 40, types: ['rock', 'fire'], location: 'Evolução', notes: 'Heat Crash.', keyMoves: ['Heat Crash'] },
              { id: 849, name: 'Toxtricity', level: 40, types: ['electric', 'poison'], location: 'Evolução', notes: 'Overdrive.', keyMoves: ['Overdrive'] },
              { id: 823, name: 'Corviknight', level: 40, types: ['flying', 'steel'], location: 'Evolução', notes: 'Steel Wing.', keyMoves: ['Steel Wing'] }
            ]
          }
        ]
      },
      {
        id: 'piers',
        name: 'Piers',
        specialty: 'dark',
        badge: 'Dark Badge',
        location: 'Spikemuth',
        description: 'Gym Leader (Dark).',
        acePokemonId: 862,
        team: [
          { id: 560, name: 'Scrafty', level: 44, types: ['dark', 'fighting'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast (4x)' }, { id: 823, name: 'Corviknight', description: 'Brave Bird' }] },
          { id: 687, name: 'Malamar', level: 44, types: ['dark', 'psychic'], counters: [{ id: 879, name: 'Copperajah', description: 'Play Rough' }, { id: 815, name: 'Cinderace', description: 'U-turn (4x)' }] },
          { id: 435, name: 'Skuntank', level: 45, types: ['poison', 'dark'], counters: [{ id: 260, name: 'Swampert', description: 'Earthquake' }, { id: 839, name: 'Coalossal', description: 'Earth Power' }] },
          { id: 862, name: 'Obstagoon', level: 46, types: ['dark', 'normal'], counters: [{ id: 68, name: 'Machamp', description: 'Cross Chop (4x)' }, { id: 815, name: 'Cinderace', description: 'Double Kick (4x)' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Use Fairy/Fighting.',
            team: [
              { id: 812, name: 'Rillaboom', level: 46, types: ['grass'], location: 'Evolução', notes: 'Drum Beating.', keyMoves: ['Drum Beating'] },
              { id: 700, name: 'Sylveon', level: 45, types: ['fairy'], location: 'Evolução Eevee', notes: 'Moonblast 4x em Scrafty. MVP.', keyMoves: ['Moonblast'] },
              { id: 68, name: 'Machamp', level: 45, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop 4x em Obstagoon.', keyMoves: ['Cross Chop'] },
              { id: 839, name: 'Coalossal', level: 45, types: ['rock', 'fire'], location: 'Evolução', notes: 'Resiste a Normal.', keyMoves: ['Heat Crash'] },
              { id: 861, name: 'Grimmsnarl', level: 45, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Spirit Break.', keyMoves: ['Spirit Break'] },
              { id: 849, name: 'Toxtricity', level: 45, types: ['electric', 'poison'], location: 'Evolução', notes: 'Boomburst.', keyMoves: ['Boomburst'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Cinderace tem Double Kick.',
            team: [
              { id: 815, name: 'Cinderace', level: 46, types: ['fire'], location: 'Evolução', notes: 'Double Kick é 4x em Obstagoon. U-turn 4x em Malamar.', keyMoves: ['Double Kick'] },
              { id: 700, name: 'Sylveon', level: 45, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 861, name: 'Grimmsnarl', level: 45, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Spirit Break.', keyMoves: ['Spirit Break'] },
              { id: 68, name: 'Machamp', level: 45, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop.', keyMoves: ['Cross Chop'] },
              { id: 870, name: 'Falinks', level: 45, types: ['fighting'], location: 'Rota 8', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
              { id: 849, name: 'Toxtricity', level: 45, types: ['electric', 'poison'], location: 'Evolução', notes: 'Boomburst.', keyMoves: ['Boomburst'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Use Fairy/Fighting.',
            team: [
              { id: 818, name: 'Inteleon', level: 46, types: ['water'], location: 'Evolução', notes: 'Snipe Shot.', keyMoves: ['Snipe Shot'] },
              { id: 700, name: 'Sylveon', level: 45, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 870, name: 'Falinks', level: 45, types: ['fighting'], location: 'Rota 8', notes: 'Close Combat.', keyMoves: ['Close Combat'] },
              { id: 861, name: 'Grimmsnarl', level: 45, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Spirit Break.', keyMoves: ['Spirit Break'] },
              { id: 68, name: 'Machamp', level: 45, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop.', keyMoves: ['Cross Chop'] },
              { id: 849, name: 'Toxtricity', level: 45, types: ['electric', 'poison'], location: 'Evolução', notes: 'Boomburst.', keyMoves: ['Boomburst'] }
            ]
          }
        ]
      },
      {
        id: 'raihan',
        name: 'Raihan',
        specialty: 'dragon',
        badge: 'Dragon Badge',
        location: 'Hammerlocke Stadium',
        description: 'Gym Leader (Dragon) - Double Battle.',
        acePokemonId: 884,
        team: [
          { id: 330, name: 'Flygon', level: 47, types: ['ground', 'dragon'], counters: [{ id: 818, name: 'Inteleon', description: 'Ice Beam (4x)' }, { id: 473, name: 'Mamoswine', description: 'Ice Shard (4x)' }] },
          { id: 526, name: 'Gigalith', level: 47, types: ['rock'], counters: [{ id: 812, name: 'Rillaboom', description: 'Drum Beating' }, { id: 818, name: 'Inteleon', description: 'Snipe Shot' }] },
          { id: 844, name: 'Sandaconda', level: 46, types: ['ground'], counters: [{ id: 812, name: 'Rillaboom', description: 'Drum Beating' }, { id: 818, name: 'Inteleon', description: 'Snipe Shot' }] },
          { id: 884, name: 'Duraludon-GMax', level: 48, types: ['steel', 'dragon'], counters: [{ id: 68, name: 'Machamp', description: 'Cross Chop' }, { id: 260, name: 'Swampert', description: 'Earthquake' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Rillaboom vence Ground/Rock.',
            team: [
              { id: 812, name: 'Rillaboom', level: 48, types: ['grass'], location: 'Evolução', notes: 'Drum Beating em Gigalith/Sandaconda. Cuidado com Flygon (Fire Punch?).', keyMoves: ['Drum Beating'] },
              { id: 473, name: 'Mamoswine', level: 47, types: ['ice', 'ground'], location: 'Rota 10', notes: 'Ice Shard/Icicle Crash 4x em Flygon.', keyMoves: ['Ice Shard'] },
              { id: 68, name: 'Machamp', level: 47, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop em Duraludon.', keyMoves: ['Cross Chop'] },
              { id: 700, name: 'Sylveon', level: 47, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 861, name: 'Grimmsnarl', level: 47, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Spirit Break.', keyMoves: ['Spirit Break'] },
              { id: 886, name: 'Drakloak', level: 47, types: ['dragon', 'ghost'], location: 'Lake of Outrage', notes: 'Dragon Pulse.', keyMoves: ['Dragon Pulse'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Use Ice/Ground.',
            team: [
              { id: 815, name: 'Cinderace', level: 48, types: ['fire'], location: 'Evolução', notes: 'Pyro Ball. Double Kick em Duraludon.', keyMoves: ['Pyro Ball'] },
              { id: 473, name: 'Mamoswine', level: 47, types: ['ice', 'ground'], location: 'Rota 10', notes: 'Earthquake em Duraludon. Ice em Flygon.', keyMoves: ['Earthquake'] },
              { id: 812, name: 'Rillaboom', level: 47, types: ['grass'], location: 'Troca', notes: 'Drum Beating.', keyMoves: ['Drum Beating'] },
              { id: 700, name: 'Sylveon', level: 47, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 861, name: 'Grimmsnarl', level: 47, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Spirit Break.', keyMoves: ['Spirit Break'] },
              { id: 68, name: 'Machamp', level: 47, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop.', keyMoves: ['Cross Chop'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Inteleon com Ice Beam.',
            team: [
              { id: 818, name: 'Inteleon', level: 48, types: ['water'], location: 'Evolução', notes: 'Ice Beam (TM) 4x em Flygon. Snipe Shot em Gigalith/Sandaconda.', keyMoves: ['Ice Beam'] },
              { id: 68, name: 'Machamp', level: 47, types: ['fighting'], location: 'Wild Area', notes: 'Cross Chop em Duraludon.', keyMoves: ['Cross Chop'] },
              { id: 260, name: 'Swampert', level: 47, types: ['water', 'ground'], location: 'Dynamax Adventures', notes: 'Earthquake.', keyMoves: ['Earthquake'] },
              { id: 473, name: 'Mamoswine', level: 47, types: ['ice', 'ground'], location: 'Rota 10', notes: 'Ice Shard.', keyMoves: ['Ice Shard'] },
              { id: 700, name: 'Sylveon', level: 47, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 861, name: 'Grimmsnarl', level: 47, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Spirit Break.', keyMoves: ['Spirit Break'] }
            ]
          }
        ]
      },
      {
        id: 'leon',
        name: 'Leon',
        specialty: 'mixed',
        badge: 'Champion',
        location: 'Wyndon Stadium',
        description: 'Champion Leon.',
        acePokemonId: 6,
        team: [
          { id: 681, name: 'Aegislash', level: 62, types: ['steel', 'ghost'], counters: [{ id: 815, name: 'Cinderace', description: 'Pyro Ball' }, { id: 862, name: 'Obstagoon', description: 'Night Slash' }] },
          { id: 887, name: 'Dragapult', level: 62, types: ['dragon', 'ghost'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 861, name: 'Grimmsnarl', description: 'Play Rough' }] },
          { id: 612, name: 'Haxorus', level: 63, types: ['dragon'], counters: [{ id: 700, name: 'Sylveon', description: 'Moonblast' }, { id: 473, name: 'Mamoswine', description: 'Ice Shard' }] },
          { id: 866, name: 'Mr. Rime', level: 64, types: ['ice', 'psychic'], counters: [{ id: 815, name: 'Cinderace', description: 'Pyro Ball' }, { id: 862, name: 'Obstagoon', description: 'Night Slash' }] },
          { id: 812, name: 'Inteleon/Rillaboom/Cinderace', level: 64, types: ['water'], counters: [{ id: 812, name: 'Rillaboom', description: 'Vantagem' }, { id: 818, name: 'Inteleon', description: 'Vantagem' }] },
          { id: 6, name: 'Charizard-GMax', level: 65, types: ['fire', 'flying'], counters: [{ id: 839, name: 'Coalossal', description: 'Rock Blast (4x)' }, { id: 818, name: 'Inteleon', description: 'Snipe Shot' }] }
        ],
        recommendedTeams: [
          {
            starterId: 810, starterName: 'Grookey', description: 'Use Rock para Charizard.',
            team: [
              { id: 812, name: 'Rillaboom', level: 65, types: ['grass'], location: 'Evolução', notes: 'Fraco a Charizard. Use em Inteleon (se ele tiver).', keyMoves: ['Drum Beating'] },
              { id: 839, name: 'Coalossal', level: 64, types: ['rock', 'fire'], location: 'Evolução', notes: 'Rock Blast é 4x em Charizard. MVP.', keyMoves: ['Rock Blast'] },
              { id: 861, name: 'Grimmsnarl', level: 64, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Play Rough em Dragapult/Haxorus.', keyMoves: ['Play Rough'] },
              { id: 815, name: 'Cinderace', level: 64, types: ['fire'], location: 'Troca', notes: 'Pyro Ball em Aegislash/Mr. Rime.', keyMoves: ['Pyro Ball'] },
              { id: 862, name: 'Obstagoon', level: 64, types: ['dark', 'normal'], location: 'Evolução', notes: 'Night Slash em Aegislash/Dragapult.', keyMoves: ['Night Slash'] },
              { id: 260, name: 'Swampert', level: 64, types: ['water', 'ground'], location: 'Dynamax Adventures', notes: 'Earthquake.', keyMoves: ['Earthquake'] }
            ]
          },
          {
            starterId: 813, starterName: 'Scorbunny', description: 'Cinderace vence Aegislash/Mr. Rime.',
            team: [
              { id: 815, name: 'Cinderace', level: 65, types: ['fire'], location: 'Evolução', notes: 'Pyro Ball em Aegislash/Mr. Rime.', keyMoves: ['Pyro Ball'] },
              { id: 839, name: 'Coalossal', level: 64, types: ['rock', 'fire'], location: 'Evolução', notes: 'Rock Blast 4x em Charizard.', keyMoves: ['Rock Blast'] },
              { id: 861, name: 'Grimmsnarl', level: 64, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Play Rough em Dragons.', keyMoves: ['Play Rough'] },
              { id: 537, name: 'Seismitoad', level: 64, types: ['water', 'ground'], location: 'Wild Area', notes: 'Surf em Charizard.', keyMoves: ['Surf'] },
              { id: 823, name: 'Corviknight', level: 64, types: ['flying', 'steel'], location: 'Evolução', notes: 'Brave Bird.', keyMoves: ['Brave Bird'] },
              { id: 462, name: 'Magnezone', level: 64, types: ['electric', 'steel'], location: 'Isle of Armor', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 816, starterName: 'Sobble', description: 'Inteleon vence Charizard.',
            team: [
              { id: 818, name: 'Inteleon', level: 65, types: ['water'], location: 'Evolução', notes: 'Snipe Shot em Charizard. Ice Beam em Dragons.', keyMoves: ['Snipe Shot'] },
              { id: 815, name: 'Cinderace', level: 64, types: ['fire'], location: 'Troca', notes: 'Pyro Ball em Aegislash.', keyMoves: ['Pyro Ball'] },
              { id: 861, name: 'Grimmsnarl', level: 64, types: ['dark', 'fairy'], location: 'Evolução', notes: 'Play Rough.', keyMoves: ['Play Rough'] },
              { id: 839, name: 'Coalossal', level: 64, types: ['rock', 'fire'], location: 'Evolução', notes: 'Backup para Charizard.', keyMoves: ['Rock Blast'] },
              { id: 862, name: 'Obstagoon', level: 64, types: ['dark', 'normal'], location: 'Evolução', notes: 'Night Slash.', keyMoves: ['Night Slash'] },
              { id: 849, name: 'Toxtricity', level: 64, types: ['electric', 'poison'], location: 'Evolução', notes: 'Overdrive.', keyMoves: ['Overdrive'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sv-paldea',
    game: 'Scarlet / Violet',
    region: 'Paldea',
    image: 'https://img.pokemondb.net/boxes/scarlet.jpg',
    starters: [
      { id: 906, name: 'Sprigatito', color: 'bg-green-100 hover:bg-green-200 border-green-500' },
      { id: 909, name: 'Fuecoco', color: 'bg-red-100 hover:bg-red-200 border-red-500' },
      { id: 912, name: 'Quaxly', color: 'bg-blue-100 hover:bg-blue-200 border-blue-500' }
    ],
    leaders: [
      {
        id: 'katy', name: 'Katy', specialty: 'bug', badge: 'Bug Badge', location: 'Cortondo', description: 'Katy usa Bug types. Use Fire/Flying/Rock.', acePokemonId: 216,
        team: [
          { id: 919, name: 'Nymble', level: 14, types: ['bug'], counters: [{ id: 909, name: 'Fuecoco', description: 'Ember' }, { id: 661, name: 'Fletchling', description: 'Peck' }] },
          { id: 917, name: 'Tarountula', level: 14, types: ['bug'], counters: [{ id: 909, name: 'Fuecoco', description: 'Ember' }, { id: 661, name: 'Fletchling', description: 'Peck' }] },
          { id: 216, name: 'Teddiursa', level: 15, types: ['normal'], notes: 'Tera Bug', counters: [{ id: 909, name: 'Fuecoco', description: 'Ember' }, { id: 661, name: 'Fletchling', description: 'Peck' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Desvantagem. Use Flying/Fire.',
            team: [
              { id: 906, name: 'Sprigatito', level: 15, types: ['grass'], location: 'Inicial', notes: 'Cuidado com Bug.', keyMoves: ['Bite'] },
              { id: 661, name: 'Fletchling', level: 14, types: ['normal', 'flying'], location: 'South Province', notes: 'Peck é 2x. MVP.', keyMoves: ['Peck'] },
              { id: 921, name: 'Pawmi', level: 14, types: ['electric'], location: 'South Province', notes: 'Resistente.', keyMoves: ['Thundershock'] },
              { id: 917, name: 'Tarountula', level: 13, types: ['bug'], location: 'South Province', notes: 'Resiste Bug.', keyMoves: ['Bug Bite'] },
              { id: 298, name: 'Azurill', level: 13, types: ['normal', 'fairy'], location: 'South Province', notes: 'Tank.', keyMoves: ['Water Gun'] },
              { id: 915, name: 'Lechonk', level: 13, types: ['normal'], location: 'South Province', notes: 'Normal type.', keyMoves: ['Tackle'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Vantagem Total.',
            team: [
              { id: 909, name: 'Fuecoco', level: 15, types: ['fire'], location: 'Inicial', notes: 'Ember destrói o ginásio. MVP.', keyMoves: ['Ember'] },
              { id: 661, name: 'Fletchling', level: 14, types: ['normal', 'flying'], location: 'South Province', notes: 'Backup.', keyMoves: ['Peck'] },
              { id: 921, name: 'Pawmi', level: 14, types: ['electric'], location: 'South Province', notes: 'Support.', keyMoves: ['Thundershock'] },
              { id: 915, name: 'Lechonk', level: 13, types: ['normal'], location: 'South Province', notes: 'Tank.', keyMoves: ['Tackle'] },
              { id: 179, name: 'Mareep', level: 13, types: ['electric'], location: 'South Province', notes: 'Static.', keyMoves: ['Thundershock'] },
              { id: 54, name: 'Psyduck', level: 13, types: ['water'], location: 'South Province', notes: 'Water Gun.', keyMoves: ['Water Gun'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Neutro. Use Flying.',
            team: [
              { id: 912, name: 'Quaxly', level: 15, types: ['water'], location: 'Inicial', notes: 'Wing Attack é bom.', keyMoves: ['Wing Attack'] },
              { id: 661, name: 'Fletchling', level: 14, types: ['normal', 'flying'], location: 'South Province', notes: 'Peck. MVP.', keyMoves: ['Peck'] },
              { id: 921, name: 'Pawmi', level: 14, types: ['electric'], location: 'South Province', notes: 'Support.', keyMoves: ['Thundershock'] },
              { id: 935, name: 'Charcadet', level: 14, types: ['fire'], location: 'South Province (Rare)', notes: 'Ember.', keyMoves: ['Ember'] },
              { id: 917, name: 'Tarountula', level: 13, types: ['bug'], location: 'South Province', notes: 'Resiste.', keyMoves: ['Bug Bite'] },
              { id: 194, name: 'Wooper-Paldea', level: 13, types: ['poison', 'ground'], location: 'South Province', notes: 'Resiste Bug.', keyMoves: ['Poison Tail'] }
            ]
          }
        ]
      },
      {
        id: 'brassius', name: 'Brassius', specialty: 'grass', badge: 'Grass Badge', location: 'Artazon', description: 'Brassius usa Grass types. Use Fire/Flying/Bug.', acePokemonId: 185,
        team: [
          { id: 548, name: 'Petilil', level: 16, types: ['grass'], counters: [{ id: 909, name: 'Fuecoco', description: 'Incinerate' }, { id: 662, name: 'Fletchinder', description: 'Ember' }] },
          { id: 928, name: 'Smoliv', level: 16, types: ['grass', 'normal'], counters: [{ id: 909, name: 'Fuecoco', description: 'Incinerate' }, { id: 919, name: 'Nymble', description: 'Bug Bite' }] },
          { id: 185, name: 'Sudowoodo', level: 17, types: ['rock'], notes: 'Tera Grass', counters: [{ id: 919, name: 'Nymble', description: 'Bug Bite' }, { id: 662, name: 'Fletchinder', description: 'Ember' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Desvantagem. Use Flying/Bug.',
            team: [
              { id: 907, name: 'Floragato', level: 17, types: ['grass'], location: 'Evolução', notes: 'Resiste Grass.', keyMoves: ['Bite'] },
              { id: 662, name: 'Fletchinder', level: 17, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flame Charge/Ember. MVP.', keyMoves: ['Flame Charge'] },
              { id: 919, name: 'Nymble', level: 16, types: ['bug'], location: 'South Province', notes: 'Bug Bite é 2x.', keyMoves: ['Bug Bite'] },
              { id: 931, name: 'Squawkabilly', level: 16, types: ['normal', 'flying'], location: 'Artazon', notes: 'Aerial Ace.', keyMoves: ['Aerial Ace'] },
              { id: 666, name: 'Vivillon', level: 16, types: ['bug', 'flying'], location: 'Evolução', notes: 'Gust/Bug Bite.', keyMoves: ['Gust'] },
              { id: 935, name: 'Charcadet', level: 16, types: ['fire'], location: 'South Province', notes: 'Ember.', keyMoves: ['Ember'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Vantagem Total.',
            team: [
              { id: 910, name: 'Crocalor', level: 17, types: ['fire'], location: 'Evolução', notes: 'Incinerate. MVP.', keyMoves: ['Incinerate'] },
              { id: 662, name: 'Fletchinder', level: 17, types: ['fire', 'flying'], location: 'Evolução', notes: 'Flame Charge.', keyMoves: ['Flame Charge'] },
              { id: 919, name: 'Nymble', level: 16, types: ['bug'], location: 'South Province', notes: 'Bug Bite.', keyMoves: ['Bug Bite'] },
              { id: 216, name: 'Teddiursa', level: 16, types: ['normal'], location: 'Cortondo', notes: 'Fury Swipes.', keyMoves: ['Fury Swipes'] },
              { id: 183, name: 'Marill', level: 18, types: ['water', 'fairy'], location: 'South Province', notes: 'Rollout (Bom contra Sudowoodo normal).', keyMoves: ['Rollout'] },
              { id: 58, name: 'Growlithe', level: 16, types: ['fire'], location: 'South Province', notes: 'Ember.', keyMoves: ['Ember'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Desvantagem. Use Flying.',
            team: [
              { id: 913, name: 'Quaxwell', level: 17, types: ['water'], location: 'Evolução', notes: 'Wing Attack.', keyMoves: ['Wing Attack'] },
              { id: 662, name: 'Fletchinder', level: 17, types: ['fire', 'flying'], location: 'Evolução', notes: 'Ember/Peck. MVP.', keyMoves: ['Flame Charge'] },
              { id: 919, name: 'Nymble', level: 16, types: ['bug'], location: 'South Province', notes: 'Bug Bite.', keyMoves: ['Bug Bite'] },
              { id: 931, name: 'Squawkabilly', level: 16, types: ['normal', 'flying'], location: 'Artazon', notes: 'Aerial Ace.', keyMoves: ['Aerial Ace'] },
              { id: 935, name: 'Charcadet', level: 16, types: ['fire'], location: 'South Province', notes: 'Ember.', keyMoves: ['Ember'] },
              { id: 206, name: 'Dunsparce', level: 16, types: ['normal'], location: 'South Province', notes: 'Rollout.', keyMoves: ['Rollout'] }
            ]
          }
        ]
      },
      {
        id: 'iono', name: 'Iono', specialty: 'electric', badge: 'Electric Badge', location: 'Levincia', description: 'Iono usa Electric types. Use Ground.', acePokemonId: 429,
        team: [
          { id: 940, name: 'Wattrel', level: 23, types: ['electric', 'flying'], counters: [{ id: 980, name: 'Clodsire', description: 'Ancient Power' }, { id: 933, name: 'Naclstack', description: 'Smack Down' }] },
          { id: 939, name: 'Bellibolt', level: 23, types: ['electric'], counters: [{ id: 980, name: 'Clodsire', description: 'Mud Shot' }, { id: 551, name: 'Sandile', description: 'Mud-Slap' }] },
          { id: 404, name: 'Luxio', level: 23, types: ['electric'], counters: [{ id: 980, name: 'Clodsire', description: 'Mud Shot' }, { id: 749, name: 'Mudbray', description: 'High Horsepower' }] },
          { id: 429, name: 'Mismagius', level: 24, types: ['ghost'], notes: 'Tera Electric (Levitate: Imune a Ground!)', counters: [{ id: 980, name: 'Clodsire', description: 'Yawn/Poison' }, { id: 933, name: 'Naclstack', description: 'Salt Cure' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Floragato resiste. Use Clodsire.',
            team: [
              { id: 907, name: 'Floragato', level: 24, types: ['grass'], location: 'Evolução', notes: 'Resiste Electric.', keyMoves: ['Seed Bomb'] },
              { id: 980, name: 'Clodsire', level: 24, types: ['poison', 'ground'], location: 'Evolução Wooper', notes: 'Imune a Electric. MVP.', keyMoves: ['Mud Shot'] },
              { id: 933, name: 'Naclstack', level: 24, types: ['rock'], location: 'Evolução', notes: 'Salt Cure em Mismagius.', keyMoves: ['Salt Cure'] },
              { id: 551, name: 'Sandile', level: 23, types: ['ground', 'dark'], location: 'Asado Desert', notes: 'Imune a Electric.', keyMoves: ['Mud-Slap'] },
              { id: 749, name: 'Mudbray', level: 23, types: ['ground'], location: 'Area 2', notes: 'Bulldoze.', keyMoves: ['Bulldoze'] },
              { id: 929, name: 'Dolliv', level: 23, types: ['grass', 'normal'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Razor Leaf'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Use Ground types.',
            team: [
              { id: 910, name: 'Crocalor', level: 24, types: ['fire'], location: 'Evolução', notes: 'Incinerate.', keyMoves: ['Incinerate'] },
              { id: 980, name: 'Clodsire', level: 24, types: ['poison', 'ground'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Mud Shot'] },
              { id: 551, name: 'Sandile', level: 23, types: ['ground', 'dark'], location: 'Asado Desert', notes: 'Imune.', keyMoves: ['Mud-Slap'] },
              { id: 933, name: 'Naclstack', level: 24, types: ['rock'], location: 'Evolução', notes: 'Salt Cure.', keyMoves: ['Salt Cure'] },
              { id: 749, name: 'Mudbray', level: 23, types: ['ground'], location: 'Area 2', notes: 'High Horsepower.', keyMoves: ['High Horsepower'] },
              { id: 940, name: 'Wattrel', level: 23, types: ['electric', 'flying'], location: 'Coast', notes: 'Resiste.', keyMoves: ['Spark'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Desvantagem. Clodsire salva.',
            team: [
              { id: 913, name: 'Quaxwell', level: 24, types: ['water'], location: 'Evolução', notes: 'Fraco a Electric.', keyMoves: ['Water Pulse'] },
              { id: 980, name: 'Clodsire', level: 24, types: ['poison', 'ground'], location: 'Evolução', notes: 'MVP Absoluto.', keyMoves: ['Mud Shot'] },
              { id: 551, name: 'Sandile', level: 23, types: ['ground', 'dark'], location: 'Asado Desert', notes: 'Imune.', keyMoves: ['Mud-Slap'] },
              { id: 749, name: 'Mudbray', level: 23, types: ['ground'], location: 'Area 2', notes: 'High Horsepower.', keyMoves: ['High Horsepower'] },
              { id: 933, name: 'Naclstack', level: 24, types: ['rock'], location: 'Evolução', notes: 'Salt Cure.', keyMoves: ['Salt Cure'] },
              { id: 929, name: 'Dolliv', level: 23, types: ['grass', 'normal'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Razor Leaf'] }
            ]
          }
        ]
      },
      {
        id: 'kofu', name: 'Kofu', specialty: 'water', badge: 'Water Badge', location: 'Cascarrafa', description: 'Kofu usa Water types. Use Electric/Grass.', acePokemonId: 740,
        team: [
          { id: 976, name: 'Veluza', level: 29, types: ['water', 'psychic'], counters: [{ id: 941, name: 'Kilowattrel', description: 'Electro Ball' }, { id: 908, name: 'Meowscarada', description: 'Flower Trick' }] },
          { id: 961, name: 'Wugtrio', level: 29, types: ['water'], counters: [{ id: 923, name: 'Pawmot', description: 'Thunder Punch' }, { id: 930, name: 'Arboliva', description: 'Energy Ball' }] },
          { id: 740, name: 'Crabominable', level: 30, types: ['fighting', 'ice'], notes: 'Tera Water', counters: [{ id: 941, name: 'Kilowattrel', description: 'Electro Ball' }, { id: 939, name: 'Bellibolt', description: 'Discharge' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Vantagem Total.',
            team: [
              { id: 908, name: 'Meowscarada', level: 36, types: ['grass', 'dark'], location: 'Evolução', notes: 'Flower Trick destrói Veluza/Wugtrio.', keyMoves: ['Flower Trick'] },
              { id: 941, name: 'Kilowattrel', level: 30, types: ['electric', 'flying'], location: 'Evolução', notes: 'Electro Ball.', keyMoves: ['Electro Ball'] },
              { id: 923, name: 'Pawmot', level: 30, types: ['electric', 'fighting'], location: 'Evolução', notes: 'Thunder Punch.', keyMoves: ['Thunder Punch'] },
              { id: 939, name: 'Bellibolt', level: 30, types: ['electric'], location: 'Evolução', notes: 'Discharge.', keyMoves: ['Discharge'] },
              { id: 26, name: 'Raichu', level: 30, types: ['electric'], location: 'Evolução Pikachu', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
              { id: 930, name: 'Arboliva', level: 30, types: ['grass', 'normal'], location: 'Evolução', notes: 'Energy Ball.', keyMoves: ['Energy Ball'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Desvantagem. Use Electric.',
            team: [
              { id: 910, name: 'Crocalor', level: 30, types: ['fire'], location: 'Evolução', notes: 'Fraco a Water.', keyMoves: ['Incinerate'] },
              { id: 941, name: 'Kilowattrel', level: 30, types: ['electric', 'flying'], location: 'Evolução', notes: 'MVP. Imune a Ground (se houver).', keyMoves: ['Electro Ball'] },
              { id: 939, name: 'Bellibolt', level: 30, types: ['electric'], location: 'Evolução', notes: 'Discharge. Tank.', keyMoves: ['Discharge'] },
              { id: 923, name: 'Pawmot', level: 30, types: ['electric', 'fighting'], location: 'Evolução', notes: 'Thunder Punch.', keyMoves: ['Thunder Punch'] },
              { id: 405, name: 'Luxray', level: 30, types: ['electric'], location: 'Evolução', notes: 'Spark.', keyMoves: ['Spark'] },
              { id: 948, name: 'Toedscool', level: 30, types: ['ground', 'grass'], location: 'Wild', notes: 'Mega Drain.', keyMoves: ['Mega Drain'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Neutro. Use Electric/Grass.',
            team: [
              { id: 913, name: 'Quaxwell', level: 30, types: ['water'], location: 'Evolução', notes: 'Resiste Water.', keyMoves: ['Water Pulse'] },
              { id: 941, name: 'Kilowattrel', level: 30, types: ['electric', 'flying'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Electro Ball'] },
              { id: 405, name: 'Luxray', level: 30, types: ['electric'], location: 'Evolução', notes: 'Spark.', keyMoves: ['Spark'] },
              { id: 939, name: 'Bellibolt', level: 30, types: ['electric'], location: 'Evolução', notes: 'Discharge.', keyMoves: ['Discharge'] },
              { id: 930, name: 'Arboliva', level: 30, types: ['grass', 'normal'], location: 'Evolução', notes: 'Energy Ball.', keyMoves: ['Energy Ball'] },
              { id: 947, name: 'Brambleghast', level: 30, types: ['grass', 'ghost'], location: 'Evolução', notes: 'Power Whip.', keyMoves: ['Power Whip'] }
            ]
          }
        ]
      },
      {
        id: 'larry', name: 'Larry', specialty: 'normal', badge: 'Normal Badge', location: 'Medali', description: 'Larry usa Normal types. Use Fighting.', acePokemonId: 398,
        team: [
          { id: 775, name: 'Komala', level: 35, types: ['normal'], counters: [{ id: 979, name: 'Annihilape', description: 'Drain Punch' }, { id: 923, name: 'Pawmot', description: 'Arm Thrust' }] },
          { id: 982, name: 'Dudunsparce', level: 35, types: ['normal'], counters: [{ id: 913, name: 'Quaquaval', description: 'Brick Break' }, { id: 448, name: 'Lucario', description: 'Aura Sphere' }] },
          { id: 398, name: 'Staraptor', level: 36, types: ['normal', 'flying'], notes: 'Tera Normal', counters: [{ id: 934, name: 'Garganacl', description: 'Salt Cure' }, { id: 941, name: 'Kilowattrel', description: 'Electro Ball' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Meowscarada é rápido.',
            team: [
              { id: 908, name: 'Meowscarada', level: 36, types: ['grass', 'dark'], location: 'Evolução', notes: 'U-turn.', keyMoves: ['Flower Trick'] },
              { id: 923, name: 'Pawmot', level: 36, types: ['electric', 'fighting'], location: 'Evolução', notes: 'MVP. Fighting moves.', keyMoves: ['Brick Break'] },
              { id: 979, name: 'Annihilape', level: 36, types: ['fighting', 'ghost'], location: 'Evolução Primeape', notes: 'Imune a Normal.', keyMoves: ['Drain Punch'] },
              { id: 934, name: 'Garganacl', level: 36, types: ['rock'], location: 'Evolução', notes: 'Resiste Normal/Flying.', keyMoves: ['Salt Cure'] },
              { id: 448, name: 'Lucario', level: 36, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 941, name: 'Kilowattrel', level: 36, types: ['electric', 'flying'], location: 'Evolução', notes: 'Para Staraptor.', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Skeledirge é imune a Normal.',
            team: [
              { id: 911, name: 'Skeledirge', level: 36, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Imune a Normal (Cuidado com Staraptor).', keyMoves: ['Torch Song'] },
              { id: 979, name: 'Annihilape', level: 36, types: ['fighting', 'ghost'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Drain Punch'] },
              { id: 923, name: 'Pawmot', level: 36, types: ['electric', 'fighting'], location: 'Evolução', notes: 'Fighting moves.', keyMoves: ['Brick Break'] },
              { id: 934, name: 'Garganacl', level: 36, types: ['rock'], location: 'Evolução', notes: 'Salt Cure.', keyMoves: ['Salt Cure'] },
              { id: 959, name: 'Tinkaton', level: 36, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Gigaton Hammer'] },
              { id: 941, name: 'Kilowattrel', level: 36, types: ['electric', 'flying'], location: 'Evolução', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Vantagem Total.',
            team: [
              { id: 914, name: 'Quaquaval', level: 36, types: ['water', 'fighting'], location: 'Evolução', notes: 'Fighting type destrói Larry.', keyMoves: ['Brick Break'] },
              { id: 934, name: 'Garganacl', level: 36, types: ['rock'], location: 'Evolução', notes: 'Resiste Flying.', keyMoves: ['Salt Cure'] },
              { id: 923, name: 'Pawmot', level: 36, types: ['electric', 'fighting'], location: 'Evolução', notes: 'Fighting moves.', keyMoves: ['Brick Break'] },
              { id: 979, name: 'Annihilape', level: 36, types: ['fighting', 'ghost'], location: 'Evolução', notes: 'Imune a Normal.', keyMoves: ['Drain Punch'] },
              { id: 448, name: 'Lucario', level: 36, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 980, name: 'Clodsire', level: 36, types: ['poison', 'ground'], location: 'Evolução', notes: 'Tank.', keyMoves: ['Poison Jab'] }
            ]
          }
        ]
      },
      {
        id: 'ryme', name: 'Ryme', specialty: 'ghost', badge: 'Ghost Badge', location: 'Montenevera', description: 'Double Battle! Use Dark/Ghost.', acePokemonId: 849,
        team: [
          { id: 354, name: 'Banette', level: 41, types: ['ghost'], counters: [{ id: 943, name: 'Mabosstiff', description: 'Crunch' }, { id: 983, name: 'Kingambit', description: 'Kowtow Cleave' }] },
          { id: 778, name: 'Mimikyu', level: 41, types: ['ghost', 'fairy'], counters: [{ id: 936, name: 'Armarouge', description: 'Armor Cannon' }, { id: 934, name: 'Garganacl', description: 'Salt Cure' }] },
          { id: 972, name: 'Houndstone', level: 41, types: ['ghost'], counters: [{ id: 908, name: 'Meowscarada', description: 'Night Slash' }, { id: 943, name: 'Mabosstiff', description: 'Crunch' }] },
          { id: 849, name: 'Toxtricity', level: 42, types: ['electric', 'poison'], notes: 'Tera Ghost', counters: [{ id: 980, name: 'Clodsire', description: 'Earthquake' }, { id: 553, name: 'Krookodile', description: 'Crunch' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Vantagem Total.',
            team: [
              { id: 908, name: 'Meowscarada', level: 42, types: ['grass', 'dark'], location: 'Evolução', notes: 'Dark moves destroem Ghosts. MVP.', keyMoves: ['Night Slash'] },
              { id: 943, name: 'Mabosstiff', level: 42, types: ['dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 983, name: 'Kingambit', level: 42, types: ['dark', 'steel'], location: 'Evolução Bisharp', notes: 'Kowtow Cleave.', keyMoves: ['Kowtow Cleave'] },
              { id: 980, name: 'Clodsire', level: 42, types: ['poison', 'ground'], location: 'Evolução', notes: 'Earthquake em Toxtricity.', keyMoves: ['Earthquake'] },
              { id: 937, name: 'Ceruledge', level: 42, types: ['fire', 'ghost'], location: 'Evolução Charcadet (Violet)', notes: 'Shadow Sneak.', keyMoves: ['Shadow Sneak'] },
              { id: 934, name: 'Garganacl', level: 42, types: ['rock'], location: 'Evolução', notes: 'Salt Cure quebra Mimikyu.', keyMoves: ['Salt Cure'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Skeledirge é Ghost.',
            team: [
              { id: 911, name: 'Skeledirge', level: 42, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Shadow Ball. Cuidado (recebe 2x de Ghost).', keyMoves: ['Shadow Ball'] },
              { id: 943, name: 'Mabosstiff', level: 42, types: ['dark'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Crunch'] },
              { id: 983, name: 'Kingambit', level: 42, types: ['dark', 'steel'], location: 'Evolução', notes: 'Resiste Ghost.', keyMoves: ['Kowtow Cleave'] },
              { id: 980, name: 'Clodsire', level: 42, types: ['poison', 'ground'], location: 'Evolução', notes: 'Counter de Toxtricity.', keyMoves: ['Earthquake'] },
              { id: 553, name: 'Krookodile', level: 42, types: ['ground', 'dark'], location: 'Desert', notes: 'Crunch/Earthquake.', keyMoves: ['Crunch'] },
              { id: 934, name: 'Garganacl', level: 42, types: ['rock'], location: 'Evolução', notes: 'Salt Cure.', keyMoves: ['Salt Cure'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Use Dark types.',
            team: [
              { id: 914, name: 'Quaquaval', level: 42, types: ['water', 'fighting'], location: 'Evolução', notes: 'Aqua Step.', keyMoves: ['Aqua Step'] },
              { id: 943, name: 'Mabosstiff', level: 42, types: ['dark'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Crunch'] },
              { id: 983, name: 'Kingambit', level: 42, types: ['dark', 'steel'], location: 'Evolução', notes: 'Resiste Ghost.', keyMoves: ['Kowtow Cleave'] },
              { id: 980, name: 'Clodsire', level: 42, types: ['poison', 'ground'], location: 'Evolução', notes: 'Counter de Toxtricity.', keyMoves: ['Earthquake'] },
              { id: 936, name: 'Armarouge', level: 42, types: ['fire', 'psychic'], location: 'Evolução Charcadet (Scarlet)', notes: 'Mystical Fire.', keyMoves: ['Mystical Fire'] },
              { id: 934, name: 'Garganacl', level: 42, types: ['rock'], location: 'Evolução', notes: 'Salt Cure.', keyMoves: ['Salt Cure'] }
            ]
          }
        ]
      },
      {
        id: 'tulip', name: 'Tulip', specialty: 'psychic', badge: 'Psychic Badge', location: 'Alfornada', description: 'Tulip usa Psychic types. Use Bug/Ghost/Dark.', acePokemonId: 671,
        team: [
          { id: 981, name: 'Farigiraf', level: 44, types: ['normal', 'psychic'], counters: [{ id: 908, name: 'Meowscarada', description: 'Night Slash' }, { id: 943, name: 'Mabosstiff', description: 'Crunch' }] },
          { id: 282, name: 'Gardevoir', level: 44, types: ['psychic', 'fairy'], counters: [{ id: 983, name: 'Kingambit', description: 'Iron Head' }, { id: 959, name: 'Tinkaton', description: 'Gigaton Hammer' }] },
          { id: 956, name: 'Espathra', level: 44, types: ['psychic'], counters: [{ id: 911, name: 'Skeledirge', description: 'Shadow Ball' }, { id: 985, name: 'Scream Tail', description: 'Crunch' }] },
          { id: 671, name: 'Florges', level: 45, types: ['fairy'], notes: 'Tera Psychic', counters: [{ id: 983, name: 'Kingambit', description: 'Iron Head' }, { id: 959, name: 'Tinkaton', description: 'Gigaton Hammer' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Vantagem Absoluta.',
            team: [
              { id: 908, name: 'Meowscarada', level: 45, types: ['grass', 'dark'], location: 'Evolução', notes: 'Imune a Psychic. MVP.', keyMoves: ['Night Slash'] },
              { id: 983, name: 'Kingambit', level: 45, types: ['dark', 'steel'], location: 'Evolução', notes: 'Iron Head em Florges/Gardevoir.', keyMoves: ['Iron Head'] },
              { id: 959, name: 'Tinkaton', level: 45, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer destrói Fadas.', keyMoves: ['Gigaton Hammer'] },
              { id: 937, name: 'Ceruledge', level: 45, types: ['fire', 'ghost'], location: 'Violet', notes: 'Shadow Claw.', keyMoves: ['Shadow Claw'] },
              { id: 943, name: 'Mabosstiff', level: 45, types: ['dark'], location: 'Evolução', notes: 'Imune a Psychic.', keyMoves: ['Crunch'] },
              { id: 936, name: 'Armarouge', level: 45, types: ['fire', 'psychic'], location: 'Scarlet', notes: 'Armor Cannon.', keyMoves: ['Armor Cannon'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Ghost/Fire ajuda.',
            team: [
              { id: 911, name: 'Skeledirge', level: 45, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 983, name: 'Kingambit', level: 45, types: ['dark', 'steel'], location: 'Evolução', notes: 'MVP. Resiste Psychic.', keyMoves: ['Iron Head'] },
              { id: 959, name: 'Tinkaton', level: 45, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer.', keyMoves: ['Gigaton Hammer'] },
              { id: 943, name: 'Mabosstiff', level: 45, types: ['dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 937, name: 'Ceruledge', level: 45, types: ['fire', 'ghost'], location: 'Violet', notes: 'Shadow Claw.', keyMoves: ['Shadow Claw'] },
              { id: 462, name: 'Magnezone', level: 45, types: ['electric', 'steel'], location: 'Evolução', notes: 'Flash Cannon.', keyMoves: ['Flash Cannon'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Cuidado com Gardevoir.',
            team: [
              { id: 914, name: 'Quaquaval', level: 45, types: ['water', 'fighting'], location: 'Evolução', notes: 'Fraco a Psychic.', keyMoves: ['Aqua Step'] },
              { id: 983, name: 'Kingambit', level: 45, types: ['dark', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Iron Head'] },
              { id: 959, name: 'Tinkaton', level: 45, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer.', keyMoves: ['Gigaton Hammer'] },
              { id: 943, name: 'Mabosstiff', level: 45, types: ['dark'], location: 'Evolução', notes: 'Crunch.', keyMoves: ['Crunch'] },
              { id: 936, name: 'Armarouge', level: 45, types: ['fire', 'psychic'], location: 'Scarlet', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 988, name: 'Slither Wing', level: 45, types: ['bug', 'fighting'], location: 'Area Zero (Scarlet)', notes: 'Leech Life.', keyMoves: ['Leech Life'] }
            ]
          }
        ]
      },
      {
        id: 'grusha', name: 'Grusha', specialty: 'ice', badge: 'Ice Badge', location: 'Glaseado', description: 'Grusha usa Ice types. Use Fire/Steel/Rock.', acePokemonId: 334,
        team: [
          { id: 873, name: 'Frosmoth', level: 47, types: ['ice', 'bug'], counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 936, name: 'Armarouge', description: 'Armor Cannon' }] },
          { id: 614, name: 'Beartic', level: 47, types: ['ice'], counters: [{ id: 914, name: 'Quaquaval', description: 'Brick Break' }, { id: 448, name: 'Lucario', description: 'Aura Sphere' }] },
          { id: 975, name: 'Cetitan', level: 47, types: ['ice'], counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 959, name: 'Tinkaton', description: 'Gigaton Hammer' }] },
          { id: 334, name: 'Altaria', level: 48, types: ['dragon', 'flying'], notes: 'Tera Ice', counters: [{ id: 959, name: 'Tinkaton', description: 'Gigaton Hammer' }, { id: 983, name: 'Kingambit', description: 'Iron Head' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Fraco a Ice. Use Fire/Steel.',
            team: [
              { id: 908, name: 'Meowscarada', level: 48, types: ['grass', 'dark'], location: 'Evolução', notes: 'Muito fraco a Ice. Cuidado.', keyMoves: ['Night Slash'] },
              { id: 911, name: 'Skeledirge', level: 48, types: ['fire', 'ghost'], location: 'Troca/Ovo', notes: 'MVP se tiver.', keyMoves: ['Torch Song'] },
              { id: 959, name: 'Tinkaton', level: 48, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer destrói Ice.', keyMoves: ['Gigaton Hammer'] },
              { id: 983, name: 'Kingambit', level: 48, types: ['dark', 'steel'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 937, name: 'Ceruledge', level: 48, types: ['fire', 'ghost'], location: 'Violet', notes: 'Bitter Blade.', keyMoves: ['Bitter Blade'] },
              { id: 936, name: 'Armarouge', level: 48, types: ['fire', 'psychic'], location: 'Scarlet', notes: 'Armor Cannon.', keyMoves: ['Armor Cannon'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Vantagem Total.',
            team: [
              { id: 911, name: 'Skeledirge', level: 48, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Torch Song derrete o ginásio. MVP.', keyMoves: ['Torch Song'] },
              { id: 959, name: 'Tinkaton', level: 48, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer.', keyMoves: ['Gigaton Hammer'] },
              { id: 983, name: 'Kingambit', level: 48, types: ['dark', 'steel'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 448, name: 'Lucario', level: 48, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 934, name: 'Garganacl', level: 48, types: ['rock'], location: 'Evolução', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] },
              { id: 937, name: 'Ceruledge', level: 48, types: ['fire', 'ghost'], location: 'Violet', notes: 'Bitter Blade.', keyMoves: ['Bitter Blade'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Quaquaval luta bem.',
            team: [
              { id: 914, name: 'Quaquaval', level: 48, types: ['water', 'fighting'], location: 'Evolução', notes: 'Brick Break/Close Combat.', keyMoves: ['Close Combat'] },
              { id: 959, name: 'Tinkaton', level: 48, types: ['fairy', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Gigaton Hammer'] },
              { id: 983, name: 'Kingambit', level: 48, types: ['dark', 'steel'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 936, name: 'Armarouge', level: 48, types: ['fire', 'psychic'], location: 'Scarlet', notes: 'Armor Cannon.', keyMoves: ['Armor Cannon'] },
              { id: 448, name: 'Lucario', level: 48, types: ['fighting', 'steel'], location: 'North Province', notes: 'Meteor Mash.', keyMoves: ['Meteor Mash'] },
              { id: 934, name: 'Garganacl', level: 48, types: ['rock'], location: 'Evolução', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] }
            ]
          }
        ]
      },
      {
        id: 'rika', name: 'Elite Four Rika', specialty: 'ground', badge: 'Elite Four #1', location: 'Pokémon League', description: 'Mestra do tipo Ground.', acePokemonId: 980,
        team: [
          { id: 340, name: 'Whiscash', level: 57, types: ['water', 'ground'], counters: [{ id: 908, name: 'Meowscarada', description: 'Flower Trick (4x)' }, { id: 407, name: 'Roserade', description: 'Giga Drain (4x)' }] },
          { id: 323, name: 'Camerupt', level: 57, types: ['fire', 'ground'], counters: [{ id: 914, name: 'Quaquaval', description: 'Aqua Step (4x)' }, { id: 964, name: 'Palafin', description: 'Jet Punch (4x)' }] },
          { id: 232, name: 'Donphan', level: 57, types: ['ground'], counters: [{ id: 914, name: 'Quaquaval', description: 'Aqua Step' }, { id: 908, name: 'Meowscarada', description: 'Flower Trick' }] },
          { id: 51, name: 'Dugtrio', level: 57, types: ['ground'], counters: [{ id: 908, name: 'Meowscarada', description: 'Flower Trick' }, { id: 914, name: 'Quaquaval', description: 'Aqua Step' }] },
          { id: 980, name: 'Clodsire', level: 58, types: ['poison', 'ground'], notes: 'Tera Ground', counters: [{ id: 934, name: 'Garganacl', description: 'Earthquake' }, { id: 998, name: 'Baxcalibur', description: 'Icicle Crash' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Vantagem. Flower Trick é MVP.',
            team: [
              { id: 908, name: 'Meowscarada', level: 58, types: ['grass', 'dark'], location: 'Evolução', notes: 'Flower Trick destrói Whiscash/Dugtrio.', keyMoves: ['Flower Trick'] },
              { id: 964, name: 'Palafin', level: 58, types: ['water'], location: 'Finizen (Union Circle)', notes: 'Jet Punch para Camerupt.', keyMoves: ['Jet Punch'] },
              { id: 998, name: 'Baxcalibur', level: 58, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 934, name: 'Garganacl', level: 58, types: ['rock'], location: 'Evolução', notes: 'Resiste Poison.', keyMoves: ['Earthquake'] },
              { id: 448, name: 'Lucario', level: 58, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 983, name: 'Kingambit', level: 58, types: ['dark', 'steel'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Desvantagem. Use aliados.',
            team: [
              { id: 911, name: 'Skeledirge', level: 58, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Fraco a Ground. Evite.', keyMoves: ['Shadow Ball'] },
              { id: 407, name: 'Roserade', level: 58, types: ['grass', 'poison'], location: 'North Province', notes: 'Giga Drain para Whiscash.', keyMoves: ['Giga Drain'] },
              { id: 964, name: 'Palafin', level: 58, types: ['water'], location: 'Troca', notes: 'Jet Punch.', keyMoves: ['Jet Punch'] },
              { id: 998, name: 'Baxcalibur', level: 58, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 978, name: 'Tatsugiri', level: 58, types: ['dragon', 'water'], location: 'Casseroya', notes: 'Surf.', keyMoves: ['Surf'] },
              { id: 938, name: 'Tadbulb', level: 58, types: ['electric'], location: 'Evolução (Bellibolt)', notes: 'Levitate se tiver item.', keyMoves: ['Water Pulse'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Vantagem com Aqua Step.',
            team: [
              { id: 914, name: 'Quaquaval', level: 58, types: ['water', 'fighting'], location: 'Evolução', notes: 'Aqua Step varre Camerupt e Donphan.', keyMoves: ['Aqua Step'] },
              { id: 930, name: 'Arboliva', level: 58, types: ['grass', 'normal'], location: 'Evolução', notes: 'Energy Ball.', keyMoves: ['Energy Ball'] },
              { id: 998, name: 'Baxcalibur', level: 58, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 934, name: 'Garganacl', level: 58, types: ['rock'], location: 'Evolução', notes: 'Salt Cure.', keyMoves: ['Salt Cure'] },
              { id: 983, name: 'Kingambit', level: 58, types: ['dark', 'steel'], location: 'Evolução', notes: 'Iron Head.', keyMoves: ['Iron Head'] },
              { id: 979, name: 'Annihilape', level: 58, types: ['fighting', 'ghost'], location: 'Evolução', notes: 'Rage Fist.', keyMoves: ['Rage Fist'] }
            ]
          }
        ]
      },
      {
        id: 'poppy', name: 'Elite Four Poppy', specialty: 'steel', badge: 'Elite Four #2', location: 'Pokémon League', description: 'Criança prodígio do tipo Steel.', acePokemonId: 959,
        team: [
          { id: 879, name: 'Copperajah', level: 58, types: ['steel'], counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 914, name: 'Quaquaval', description: 'Close Combat' }] },
          { id: 462, name: 'Magnezone', level: 58, types: ['electric', 'steel'], counters: [{ id: 980, name: 'Clodsire', description: 'Earthquake (4x)' }, { id: 445, name: 'Garchomp', description: 'Earthquake (4x)' }] },
          { id: 437, name: 'Bronzong', level: 58, types: ['steel', 'psychic'], counters: [{ id: 911, name: 'Skeledirge', description: 'Shadow Ball' }, { id: 983, name: 'Kingambit', description: 'Kowtow Cleave' }] },
          { id: 823, name: 'Corviknight', level: 58, types: ['flying', 'steel'], counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 923, name: 'Pawmot', description: 'Thunder Punch' }] },
          { id: 959, name: 'Tinkaton', level: 59, types: ['fairy', 'steel'], notes: 'Tera Steel', counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 980, name: 'Clodsire', description: 'Earthquake' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Desvantagem. Use Fire/Fighting.',
            team: [
              { id: 908, name: 'Meowscarada', level: 60, types: ['grass', 'dark'], location: 'Evolução', notes: 'Fraco a Steel.', keyMoves: ['Knock Off'] },
              { id: 937, name: 'Ceruledge', level: 60, types: ['fire', 'ghost'], location: 'Violet', notes: 'Bitter Blade derrete Steel.', keyMoves: ['Bitter Blade'] },
              { id: 936, name: 'Armarouge', level: 60, types: ['fire', 'psychic'], location: 'Scarlet', notes: 'Armor Cannon.', keyMoves: ['Armor Cannon'] },
              { id: 448, name: 'Lucario', level: 60, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 997, name: 'Arcanine', level: 60, types: ['fire'], location: 'South Province', notes: 'Flamethrower.', keyMoves: ['Flamethrower'] },
              { id: 335, name: 'Zangoose', level: 60, types: ['normal'], location: 'South Province', notes: 'Close Combat.', keyMoves: ['Close Combat'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Skeledirge destrói este time.',
            team: [
              { id: 911, name: 'Skeledirge', level: 60, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Torch Song vence sozinho.', keyMoves: ['Torch Song'] },
              { id: 980, name: 'Clodsire', level: 60, types: ['poison', 'ground'], location: 'Evolução', notes: 'Earthquake para Magnezone.', keyMoves: ['Earthquake'] },
              { id: 934, name: 'Garganacl', level: 60, types: ['rock'], location: 'Evolução', notes: 'Resiste.', keyMoves: ['Salt Cure'] },
              { id: 448, name: 'Lucario', level: 60, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 983, name: 'Kingambit', level: 60, types: ['dark', 'steel'], location: 'Evolução', notes: 'Kowtow Cleave.', keyMoves: ['Kowtow Cleave'] },
              { id: 959, name: 'Tinkaton', level: 60, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Resiste Steel.', keyMoves: ['Gigaton Hammer'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Quaquaval luta bem.',
            team: [
              { id: 914, name: 'Quaquaval', level: 60, types: ['water', 'fighting'], location: 'Evolução', notes: 'Close Combat destrói Steel.', keyMoves: ['Close Combat'] },
              { id: 937, name: 'Ceruledge', level: 60, types: ['fire', 'ghost'], location: 'Violet', notes: 'Bitter Blade.', keyMoves: ['Bitter Blade'] },
              { id: 936, name: 'Armarouge', level: 60, types: ['fire', 'psychic'], location: 'Scarlet', notes: 'Armor Cannon.', keyMoves: ['Armor Cannon'] },
              { id: 983, name: 'Kingambit', level: 60, types: ['dark', 'steel'], location: 'Evolução', notes: 'Kowtow Cleave.', keyMoves: ['Kowtow Cleave'] },
              { id: 448, name: 'Lucario', level: 60, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 980, name: 'Clodsire', level: 60, types: ['poison', 'ground'], location: 'Evolução', notes: 'Earthquake.', keyMoves: ['Earthquake'] }
            ]
          }
        ]
      },
      {
        id: 'larry-e4', name: 'Elite Four Larry', specialty: 'flying', badge: 'Elite Four #3', location: 'Pokémon League', description: 'Larry retorna com tipos voadores.', acePokemonId: 973,
        team: [
          { id: 357, name: 'Tropius', level: 59, types: ['grass', 'flying'], counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 998, name: 'Baxcalibur', description: 'Ice Beam (4x)' }] },
          { id: 741, name: 'Oricorio', level: 59, types: ['electric', 'flying'], counters: [{ id: 934, name: 'Garganacl', description: 'Stone Edge' }, { id: 998, name: 'Baxcalibur', description: 'Icicle Crash' }] },
          { id: 334, name: 'Altaria', level: 59, types: ['dragon', 'flying'], counters: [{ id: 998, name: 'Baxcalibur', description: 'Ice Beam (4x)' }, { id: 959, name: 'Tinkaton', description: 'Play Rough' }] },
          { id: 398, name: 'Staraptor', level: 59, types: ['normal', 'flying'], counters: [{ id: 923, name: 'Pawmot', description: 'Double Shock' }, { id: 934, name: 'Garganacl', description: 'Stone Edge' }] },
          { id: 973, name: 'Flamigo', level: 60, types: ['fighting', 'flying'], notes: 'Tera Flying', counters: [{ id: 923, name: 'Pawmot', description: 'Double Shock' }, { id: 959, name: 'Tinkaton', description: 'Play Rough' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Desvantagem total. Use aliados.',
            team: [
              { id: 908, name: 'Meowscarada', level: 61, types: ['grass', 'dark'], location: 'Evolução', notes: 'Fraco a Flying.', keyMoves: ['Play Rough'] },
              { id: 923, name: 'Pawmot', level: 61, types: ['electric', 'fighting'], location: 'Evolução', notes: 'Double Shock MVP.', keyMoves: ['Double Shock'] },
              { id: 934, name: 'Garganacl', level: 61, types: ['rock'], location: 'Evolução', notes: 'Stone Edge destrói Flying.', keyMoves: ['Stone Edge'] },
              { id: 998, name: 'Baxcalibur', level: 61, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 959, name: 'Tinkaton', level: 61, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer.', keyMoves: ['Gigaton Hammer'] },
              { id: 462, name: 'Magnezone', level: 61, types: ['electric', 'steel'], location: 'Evolução', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Neutro. Use Rock/Electric.',
            team: [
              { id: 911, name: 'Skeledirge', level: 61, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Torch Song em Tropius.', keyMoves: ['Torch Song'] },
              { id: 934, name: 'Garganacl', level: 61, types: ['rock'], location: 'Evolução', notes: 'MVP. Stone Edge.', keyMoves: ['Stone Edge'] },
              { id: 923, name: 'Pawmot', level: 61, types: ['electric', 'fighting'], location: 'Evolução', notes: 'Double Shock.', keyMoves: ['Double Shock'] },
              { id: 998, name: 'Baxcalibur', level: 61, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 939, name: 'Bellibolt', level: 61, types: ['electric'], location: 'Evolução', notes: 'Discharge.', keyMoves: ['Discharge'] },
              { id: 964, name: 'Palafin', level: 61, types: ['water'], location: 'Troca', notes: 'Jet Punch.', keyMoves: ['Jet Punch'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Neutro. Ice Spinner ajuda.',
            team: [
              { id: 914, name: 'Quaquaval', level: 61, types: ['water', 'fighting'], location: 'Evolução', notes: 'Ice Spinner ajuda.', keyMoves: ['Ice Spinner'] },
              { id: 934, name: 'Garganacl', level: 61, types: ['rock'], location: 'Evolução', notes: 'Stone Edge.', keyMoves: ['Stone Edge'] },
              { id: 923, name: 'Pawmot', level: 61, types: ['electric', 'fighting'], location: 'Evolução', notes: 'Double Shock.', keyMoves: ['Double Shock'] },
              { id: 998, name: 'Baxcalibur', level: 61, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 462, name: 'Magnezone', level: 61, types: ['electric', 'steel'], location: 'Evolução', notes: 'Thunderbolt.', keyMoves: ['Thunderbolt'] },
              { id: 936, name: 'Armarouge', level: 61, types: ['fire', 'psychic'], location: 'Scarlet', notes: 'Armor Cannon.', keyMoves: ['Armor Cannon'] }
            ]
          }
        ]
      },
      {
        id: 'hassel', name: 'Elite Four Hassel', specialty: 'dragon', badge: 'Elite Four #4', location: 'Pokémon League', description: 'Mestre Dragão emotivo.', acePokemonId: 998,
        team: [
          { id: 715, name: 'Noivern', level: 60, types: ['flying', 'dragon'], counters: [{ id: 998, name: 'Baxcalibur', description: 'Ice Beam (4x)' }, { id: 700, name: 'Sylveon', description: 'Moonblast' }] },
          { id: 612, name: 'Haxorus', level: 60, types: ['dragon'], counters: [{ id: 959, name: 'Tinkaton', description: 'Play Rough' }, { id: 998, name: 'Baxcalibur', description: 'Icicle Crash' }] },
          { id: 691, name: 'Dragalge', level: 60, types: ['poison', 'dragon'], counters: [{ id: 983, name: 'Kingambit', description: 'Iron Head' }, { id: 445, name: 'Garchomp', description: 'Earthquake' }] },
          { id: 841, name: 'Flapple', level: 60, types: ['grass', 'dragon'], counters: [{ id: 998, name: 'Baxcalibur', description: 'Ice Beam (4x)' }, { id: 959, name: 'Tinkaton', description: 'Play Rough' }] },
          { id: 998, name: 'Baxcalibur', level: 61, types: ['dragon', 'ice'], notes: 'Tera Dragon', counters: [{ id: 959, name: 'Tinkaton', description: 'Gigaton Hammer' }, { id: 448, name: 'Lucario', description: 'Close Combat' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Meowscarada tem Play Rough.',
            team: [
              { id: 908, name: 'Meowscarada', level: 62, types: ['grass', 'dark'], location: 'Evolução', notes: 'Play Rough ajuda.', keyMoves: ['Play Rough'] },
              { id: 959, name: 'Tinkaton', level: 62, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Imune a Dragon. MVP.', keyMoves: ['Play Rough', 'Gigaton Hammer'] },
              { id: 998, name: 'Baxcalibur', level: 62, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 282, name: 'Gardevoir', level: 62, types: ['psychic', 'fairy'], location: 'South Province', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 700, name: 'Sylveon', level: 62, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 184, name: 'Azumarill', level: 62, types: ['water', 'fairy'], location: 'Casseroya', notes: 'Play Rough.', keyMoves: ['Play Rough'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Skeledirge resiste a Grass/Bug.',
            team: [
              { id: 911, name: 'Skeledirge', level: 62, types: ['fire', 'ghost'], location: 'Evolução', notes: 'Shadow Ball.', keyMoves: ['Shadow Ball'] },
              { id: 959, name: 'Tinkaton', level: 62, types: ['fairy', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Play Rough'] },
              { id: 998, name: 'Baxcalibur', level: 62, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Glaive Rush.', keyMoves: ['Glaive Rush'] },
              { id: 445, name: 'Garchomp', level: 62, types: ['dragon', 'ground'], location: 'Area Zero', notes: 'Dragon Claw.', keyMoves: ['Dragon Claw'] },
              { id: 861, name: 'Grimmsnarl', level: 62, types: ['dark', 'fairy'], location: 'Tagtree', notes: 'Spirit Break.', keyMoves: ['Spirit Break'] },
              { id: 983, name: 'Kingambit', level: 62, types: ['dark', 'steel'], location: 'Evolução', notes: 'Kowtow Cleave.', keyMoves: ['Kowtow Cleave'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Ice Spinner ajuda.',
            team: [
              { id: 914, name: 'Quaquaval', level: 62, types: ['water', 'fighting'], location: 'Evolução', notes: 'Ice Spinner.', keyMoves: ['Ice Spinner'] },
              { id: 959, name: 'Tinkaton', level: 62, types: ['fairy', 'steel'], location: 'Evolução', notes: 'MVP.', keyMoves: ['Play Rough'] },
              { id: 998, name: 'Baxcalibur', level: 62, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] },
              { id: 700, name: 'Sylveon', level: 62, types: ['fairy'], location: 'Evolução', notes: 'Moonblast.', keyMoves: ['Moonblast'] },
              { id: 979, name: 'Annihilape', level: 62, types: ['fighting', 'ghost'], location: 'Evolução', notes: 'Rage Fist.', keyMoves: ['Rage Fist'] },
              { id: 448, name: 'Lucario', level: 62, types: ['fighting', 'steel'], location: 'North Province', notes: 'Dragon Pulse.', keyMoves: ['Dragon Pulse'] }
            ]
          }
        ]
      },
      {
        id: 'geeta', name: 'Top Champion Geeta', specialty: 'champion', badge: 'Champion', location: 'Pokémon League', description: 'A Campeã Suprema de Paldea.', acePokemonId: 969,
        team: [
          { id: 956, name: 'Espathra', level: 61, types: ['psychic'], counters: [{ id: 908, name: 'Meowscarada', description: 'Night Slash' }, { id: 983, name: 'Kingambit', description: 'Kowtow Cleave' }] },
          { id: 673, name: 'Gogoat', level: 61, types: ['grass'], counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 937, name: 'Ceruledge', description: 'Bitter Blade' }] },
          { id: 976, name: 'Veluza', level: 61, types: ['water', 'psychic'], counters: [{ id: 908, name: 'Meowscarada', description: 'Flower Trick' }, { id: 923, name: 'Pawmot', description: 'Thunder Punch' }] },
          { id: 713, name: 'Avalugg', level: 61, types: ['ice'], counters: [{ id: 911, name: 'Skeledirge', description: 'Torch Song' }, { id: 448, name: 'Lucario', description: 'Aura Sphere' }] },
          { id: 983, name: 'Kingambit', level: 61, types: ['dark', 'steel'], counters: [{ id: 914, name: 'Quaquaval', description: 'Close Combat (4x)' }, { id: 923, name: 'Pawmot', description: 'Close Combat (4x)' }] },
          { id: 969, name: 'Glimmora', level: 62, types: ['rock', 'poison'], notes: 'Tera Rock', counters: [{ id: 914, name: 'Quaquaval', description: 'Aqua Step' }, { id: 983, name: 'Kingambit', description: 'Iron Head' }] }
        ],
        recommendedTeams: [
          {
            starterId: 906, starterName: 'Sprigatito', description: 'Meowscarada cobre muito bem.',
            team: [
              { id: 908, name: 'Meowscarada', level: 63, types: ['grass', 'dark'], location: 'Evolução', notes: 'Flower Trick e Night Slash. MVP.', keyMoves: ['Flower Trick', 'Night Slash'] },
              { id: 59, name: 'Arcanine', level: 63, types: ['fire'], location: 'South Province', notes: 'Flamethrower para Gogoat/Avalugg/Kingambit.', keyMoves: ['Flamethrower'] },
              { id: 964, name: 'Palafin', level: 63, types: ['water'], location: 'Finizen (Union Circle)', notes: 'Jet Punch destrói Kingambit.', keyMoves: ['Jet Punch'] },
              { id: 983, name: 'Kingambit', level: 63, types: ['dark', 'steel'], location: 'Evolução', notes: 'Kowtow Cleave e Iron Head.', keyMoves: ['Kowtow Cleave'] },
              { id: 959, name: 'Tinkaton', level: 63, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer.', keyMoves: ['Gigaton Hammer'] },
              { id: 934, name: 'Garganacl', level: 63, types: ['rock'], location: 'Evolução', notes: 'Salt Cure.', keyMoves: ['Salt Cure'] }
            ]
          },
          {
            starterId: 909, starterName: 'Fuecoco', description: 'Skeledirge é excelente.',
            team: [
              { id: 911, name: 'Skeledirge', level: 63, types: ['fire', 'ghost'], location: 'Evolução', notes: 'MVP. Derrete metade do time.', keyMoves: ['Torch Song'] },
              { id: 763, name: 'Tsareena', level: 63, types: ['grass'], location: 'Evolução', notes: 'Trop Kick.', keyMoves: ['Trop Kick'] },
              { id: 983, name: 'Kingambit', level: 63, types: ['dark', 'steel'], location: 'Evolução', notes: 'Kowtow Cleave.', keyMoves: ['Kowtow Cleave'] },
              { id: 964, name: 'Palafin', level: 63, types: ['water'], location: 'Troca', notes: 'Jet Punch.', keyMoves: ['Jet Punch'] },
              { id: 448, name: 'Lucario', level: 63, types: ['fighting', 'steel'], location: 'North Province', notes: 'Aura Sphere.', keyMoves: ['Aura Sphere'] },
              { id: 998, name: 'Baxcalibur', level: 63, types: ['dragon', 'ice'], location: 'Glaseado', notes: 'Icicle Crash.', keyMoves: ['Icicle Crash'] }
            ]
          },
          {
            starterId: 912, starterName: 'Quaxly', description: 'Quaquaval destrói Kingambit e Glimmora.',
            team: [
              { id: 914, name: 'Quaquaval', level: 63, types: ['water', 'fighting'], location: 'Evolução', notes: 'MVP. Close Combat e Aqua Step.', keyMoves: ['Close Combat', 'Aqua Step'] },
              { id: 937, name: 'Ceruledge', level: 63, types: ['fire', 'ghost'], location: 'Violet', notes: 'Bitter Blade.', keyMoves: ['Bitter Blade'] },
              { id: 930, name: 'Arboliva', level: 63, types: ['grass', 'normal'], location: 'Evolução', notes: 'Energy Ball.', keyMoves: ['Energy Ball'] },
              { id: 983, name: 'Kingambit', level: 63, types: ['dark', 'steel'], location: 'Evolução', notes: 'Kowtow Cleave.', keyMoves: ['Kowtow Cleave'] },
              { id: 959, name: 'Tinkaton', level: 63, types: ['fairy', 'steel'], location: 'Evolução', notes: 'Gigaton Hammer.', keyMoves: ['Gigaton Hammer'] },
              { id: 937, name: 'Ceruledge', level: 63, types: ['fire', 'ghost'], location: 'Violet', notes: 'Bitter Blade.', keyMoves: ['Bitter Blade'] }
            ]
          }
        ]
      },
    ]
  }
];
