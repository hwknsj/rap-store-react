export function formatPrice (cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export function rando (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function slugify (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function getHipName () {
  const adjectives = [
    'Dope',
    'Fly',
    'Rap',
    'Bad',
    'Baddest',
    'Ill',
    'Illest',
    'Best',
    'Money',
    'Hit',
    'Bangin',
    'Solid',
    'Trill',
    'Hip',
    'Killer',
    'Most',
    'Drippin',
    'Nasty',
    'Raw',
    'Trap',
    'Trappin',
    'Gucci',
    'Poppin',
    'Fleek',
    'Saucy',
    'Boss',
    'Wicked',
    'Ratchet',
    'Shook',
    'Icy',
    'Cold',
    'Loaded',
    'Filthy',
    'Blessed',
    'Rich',
    'Turnt',
    'Hustlin',
    'Milli',
    'Cash',
    'Gang',
    'Whippin',
    'Boujee',
    'Lit',
    'Royal',
    'Realest',
    'Still',
    'Fire',
    'Flame',
    'Heated',
    'Fresh',
    'Lowkey',
    'Grime',
    'Straight',
    'Certified',
    'Chill'
  ]

  const nouns = [
    'Bando',
    'Gold',
    'Dope',
    'Grime',
    'Down',
    'South',
    'ATLanta',
    'Strength',
    'Lyricist',
    'Up',
    'Dope',
    'Rap',
    'Stars',
    'Forever',
    '4ever',
    'Everywhere',
    'Beats',
    'Rhymes',
    'Flows',
    'Flex',
    'Trap',
    'Bando',
    'Work',
    'Weight',
    'Poet',
    'Street',
    'Cuts',
    'Finds',
    'Necessary'
  ]
  return `${rando(adjectives)}${rando(nouns)}`
}
