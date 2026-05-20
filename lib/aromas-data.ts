export interface AromaData {
  number: number
  name: string
  concept: string
  family: 'Fresco' | 'Floral' | 'Terra'
  slug: string
  color: string
  tagline: string
  description: string
  story: string
  notes: { top: string; heart: string; base: string }
  image: string
  images: string[]
  properties: string[]
  environments: string[]
  // Brand graphics (2026 collection only)
  trama?: string       // colored full-bleed background pattern
  tramaLight?: string  // light version for secondary sections
  icon?: string        // botanical illustration (black on white, use multiply blend)
}

// ── Colección 2026 — 4 fragancias oficiales ────────────────────────────────
export const AROMAS: AromaData[] = [
  {
    number: 1,
    name: 'Velvet',
    concept: 'Sofisticación',
    family: 'Floral',
    slug: 'velvet',
    color: '#7E2738',
    tagline: 'La elegancia en su estado más puro',
    description: 'Rosa Búlgara y Peonías en su máxima expresión. Una fragancia floral aterciopelada que envuelve cada espacio con sofisticación y gracia natural.',
    story: 'Al alba del verano, cuando el rocío todavía cubre la superficie del jardín y las rosas abren en su máximo esplendor, se produce el antiguo ritual familiar de recolección floral. Velvet captura ese instante preciso: la flor en su plenitud, antes de que el sol la transforme.',
    notes: { top: 'Floral-verde suave', heart: 'Rosa Búlgara, Peonías, Higo', base: 'Muguet & Almizcle' },
    image: '/media/_MG_3566.jpg',
    images: ['/media/_MG_3566.jpg', '/media/MG_9578-scaled.jpg'],
    properties: ['floral', 'aterciopelado', 'elegante', 'almizclado'],
    environments: ['dormitorios', 'living', 'recibidores', 'espacios de pausa'],
    trama: '/brand/graphics/trama-velvet.png',
    tramaLight: '/brand/graphics/trama-velvet-light.png',
    icon: '/brand/graphics/icon-velvet.png',
  },
  {
    number: 2,
    name: 'Linaje',
    concept: 'Magnetismo',
    family: 'Terra',
    slug: 'linaje',
    color: '#CB6F36',
    tagline: 'La huella que une pasado y presente',
    description: 'Sándalo y Ámbar de profundidad cálida, con la chispa de la Pimienta Rosa y la dulzura de la Frambuesa. Un aroma que magnetiza y perdura.',
    story: 'El linaje es la huella invisible que une pasado y presente: raíces profundas, gestos heredados y vínculos que perduran más allá del tiempo. Esta fragancia lleva esa esencia — amaderada, especiada, sensual — como quien lleva en el cuerpo la historia de su familia.',
    notes: { top: 'Especiada-frutal vibrante', heart: 'Sándalo, Pimienta Rosa, Frambuesa', base: 'Ámbar sensual y duradero' },
    image: '/media/_MG_3545.jpg',
    images: ['/media/_MG_3545.jpg', '/media/MG_9590-scaled.jpg'],
    properties: ['amaderado', 'especiado', 'cálido', 'balsámico'],
    environments: ['espacios íntimos', 'rincones de lectura', 'meditación nocturna', 'ambientes de encuentro'],
    trama: '/brand/graphics/trama-linaje.png',
    tramaLight: '/brand/graphics/trama-linaje-light.png',
    icon: '/brand/graphics/icon-linaje.png',
  },
  {
    number: 3,
    name: 'Roble',
    concept: 'Introspección',
    family: 'Terra',
    slug: 'roble',
    color: '#496130',
    tagline: 'El silencio profundo del taller',
    description: 'Cardamomo y Vetiver sobre un corazón de Cedro. Una fragancia amaderada y estructurada que invita al pensamiento y la calma interior.',
    story: 'En el aroma de la madera trabajada, donde el tiempo permanece suspendido entre herramientas heredadas, vetas nobles y el silencio profundo del taller, habita la memoria del oficio. Roble es ese lugar: íntimo, concentrado, lleno de presencia.',
    notes: { top: 'Especiada fresca', heart: 'Cardamomo, Vetiver, Cedro', base: 'White Musk & Ámbar cálido' },
    image: '/media/_MG_3533.jpg',
    images: ['/media/_MG_3533.jpg', '/media/MG_9566-scaled.jpg'],
    properties: ['amaderado', 'terroso', 'introspectivo', 'elegante'],
    environments: ['estudios creativos', 'bibliotecas', 'home office', 'entradas'],
    trama: '/brand/graphics/trama-roble.png',
    tramaLight: '/brand/graphics/trama-roble-light.png',
    icon: '/brand/graphics/icon-roble.png',
  },
  {
    number: 4,
    name: 'Brisa',
    concept: 'Renovación',
    family: 'Fresco',
    slug: 'brisa',
    color: '#77C1EC',
    tagline: 'La claridad de la mañana',
    description: 'Verbena y Lima Ácida con el dulzor del Pomelo Rosado y el Higo. Una fragancia cítrica y herbal que transforma cualquier espacio en energía renovada.',
    story: 'Una casa luminosa despierta con las ventanas abiertas, mientras el aire fresco recorre cada rincón y la claridad de la mañana transforma el espacio en renovación. Brisa captura ese instante cotidiano: fresco, luminoso, lleno de posibilidad.',
    notes: { top: 'Cítrica brillante', heart: 'Verbena, Lima Ácida, Pomelo Rosado', base: 'Higo & Muguet suave' },
    image: '/media/_MG_3521.jpg',
    images: ['/media/_MG_3521.jpg', '/media/MG_9617-scaled.jpg'],
    properties: ['cítrico', 'herbal', 'fresco', 'luminoso'],
    environments: ['cocinas', 'estudios', 'espacios creativos', 'ambientes de bienestar'],
    trama: '/brand/graphics/trama-brisa.png',
    tramaLight: '/brand/graphics/trama-brisa-light.png',
    icon: '/brand/graphics/icon-brisa.png',
  },
]

// ── Colección original — 8 fragancias anteriores (solo en /nuestros-aromas) ─
export const AROMAS_LEGACY: AromaData[] = [
  {
    number: 2,
    name: 'Verbena',
    concept: 'Energía',
    family: 'Fresco',
    slug: 'verbena',
    color: '#8BAF8B',
    tagline: 'Frescura que despierta los sentidos',
    description: 'Notas vivas de verbena limón y hierbas del mediterráneo. Un aroma que evoca jardines en primavera y energía renovada.',
    story: 'Verbena nació de un viaje por la costa mediterránea, donde la brisa trae consigo el aroma intenso y limpio de las hierbas silvestres. Queríamos capturar esa frescura que hace respirar profundo al cruzar el umbral de casa. Es el aroma de los días que empiezan bien.',
    notes: { top: 'Verbena, Limón', heart: 'Hierba verde, Hoja', base: 'Musgo blanco, Almizcle' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8842-scaled-e1681317841299-1536x1536-62758a2ee6f417ab8417207386037479-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8842-scaled-e1681317841299-1536x1536-62758a2ee6f417ab8417207386037479-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6420-scaled-e1696461568818-1536x1536-77992b0b0802559e1b17219546572465-480-0.webp',
    ],
    properties: ['energizante', 'refrescante', 'estimulante'],
    environments: ['cocina', 'estudio', 'baño'],
  },
  {
    number: 5,
    name: 'Floral Velvet',
    concept: 'Delicadeza',
    family: 'Floral',
    slug: 'floral-velvet',
    color: '#C9A8C4',
    tagline: 'La suavidad hecha fragancia',
    description: 'Una composición floral envuelta en seda. Pétalos de rosa y peonía se entrelazan con un fondo suave de almizcle.',
    story: 'Floral Velvet es una declaración de elegancia femenina. Inspirado en los bouquets que perfuman las habitaciones de los grandes hoteles, este blend une la voluptuosidad de la peonía con la delicadeza del iris.',
    notes: { top: 'Rosa, Peonía', heart: 'Jazmín, Iris', base: 'Almizcle, Cedro' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8453-scaled-e1685916235552-1534x1536-0788f88e8f8219233017219543914857-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8453-scaled-e1685916235552-1534x1536-0788f88e8f8219233017219543914857-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8828-scaled-e1696446538937-1536x1536-b64c509761dbf2909f17219502779342-480-0.webp',
    ],
    properties: ['romántico', 'delicado', 'femenino'],
    environments: ['dormitorio', 'sala de estar', 'baño'],
  },
  {
    number: 17,
    name: 'Oud Imperial',
    concept: 'Lujo',
    family: 'Terra',
    slug: 'oud-imperial',
    color: '#9C7443',
    tagline: 'La profundidad del oriente',
    description: 'Inspirado en los perfumes de Medio Oriente. Oud, maderas preciosas y especias crean una experiencia olfativa de lujo atemporal.',
    story: 'Oud Imperial lleva la esencia del oriente a cada rincón. El oud, conocido como el "oro negro" de la perfumería, se funde con el azafrán y la rosa para crear una fragancia de lujo atemporal.',
    notes: { top: 'Cardamomo, Azafrán', heart: 'Oud, Rosa oriental', base: 'Ámbar, Pachuli' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/fidela_1500x1500-d6cea907ea13a1799e17662504066445-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/fidela_1500x1500-d6cea907ea13a1799e17662504066445-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6325-scaled-e1681511963528-1536x1536-63c86a7359b0c0a91a17219540086209-480-0.webp',
    ],
    properties: ['lujoso', 'intenso', 'exótico'],
    environments: ['sala de estar', 'comedor', 'dormitorio'],
  },
  {
    number: 19,
    name: 'French Lavender',
    concept: 'Calma',
    family: 'Floral',
    slug: 'french-lavander',
    color: '#A89BC9',
    tagline: 'Los campos de Provenza en tu hogar',
    description: 'Lavanda francesa de alta pureza con notas aromáticas herbáceas. Calma, equilibrio y la elegancia atemporal del sur de Francia.',
    story: 'Imaginamos los campos violetas que se extienden bajo el sol del sur de Francia. French Lavender es ese paisaje hecho fragancia: la lavanda en su expresión más pura, complementada por el romero y el espliego.',
    notes: { top: 'Lavanda, Eucalipto', heart: 'Espliego, Romero', base: 'Almizcle, Cedro blanco' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8828-scaled-e1696446538937-1536x1536-b64c509761dbf2909f17219502779342-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8828-scaled-e1696446538937-1536x1536-b64c509761dbf2909f17219502779342-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8842-scaled-e1681317841299-1536x1536-62758a2ee6f417ab8417207386037479-480-0.webp',
    ],
    properties: ['relajante', 'calmante', 'equilibrante'],
    environments: ['dormitorio', 'sala de meditación', 'baño'],
  },
  {
    number: 21,
    name: 'Jengibre & Té Blanco',
    concept: 'Equilibrio',
    family: 'Fresco',
    slug: 'jengibre-te-blanco',
    color: '#C4B48A',
    tagline: 'Calidez especiada, frescura serena',
    description: 'El picante sutil del jengibre fresco encuentra la serenidad del té blanco. Un equilibrio sofisticado entre energía y calma.',
    story: 'Jengibre & Té Blanco surgió de buscar el balance perfecto: la calidez que energiza sin inquietar. El jengibre fresco aporta vitalidad y foco; el té blanco, la serenidad de una tarde tranquila.',
    notes: { top: 'Jengibre, Limón', heart: 'Té blanco, Jazmín', base: 'Vetiver, Cedro' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6420-scaled-e1696461568818-1536x1536-77992b0b0802559e1b17219546572465-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6420-scaled-e1696461568818-1536x1536-77992b0b0802559e1b17219546572465-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8842-scaled-e1681317841299-1536x1536-62758a2ee6f417ab8417207386037479-480-0.webp',
    ],
    properties: ['vigorizante', 'equilibrante', 'fresco'],
    environments: ['estudio', 'cocina', 'oficina home'],
  },
  {
    number: 27,
    name: 'Cardamom & Woods',
    concept: 'Autenticidad',
    family: 'Terra',
    slug: 'cardamom-woods',
    color: '#8C7060',
    tagline: 'Especias nobles sobre raíces antiguas',
    description: 'Cardamomo verde sobre un corazón de maderas oscuras. Evoca caravanas, biblioteca de viajero y la riqueza de lo auténtico.',
    story: 'Cardamom & Woods es el aroma de los relatos de viaje. El cardamomo verde recuerda a los mercados especiados de Oriente Medio; las maderas profundas evocan una biblioteca de libros antiguos.',
    notes: { top: 'Cardamomo, Pimienta negra', heart: 'Sándalo, Vetiver', base: 'Musgo, Cuero, Ámbar' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/lupe1-116177fdb85d6c531817662394131806-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/lupe1-116177fdb85d6c531817662394131806-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/fidela_1500x1500-d6cea907ea13a1799e17662504066445-480-0.webp',
    ],
    properties: ['terroso', 'especiado', 'masculino'],
    environments: ['sala de estar', 'estudio', 'comedor'],
  },
  {
    number: 44,
    name: 'Sándalo & Pimienta Rosa',
    concept: 'Contraste',
    family: 'Terra',
    slug: 'sandalo-pimenta-rosa',
    color: '#C48A8A',
    tagline: 'El contraste que conquista',
    description: 'La cremosidad del sándalo indio con la vivacidad de la pimienta rosa. Una dualidad perfecta: suave y audaz al mismo tiempo.',
    story: 'Sándalo & Pimienta Rosa es un contraste que funciona. La cremosidad envolvente del sándalo, trabajada desde hace siglos en la perfumería india, encuentra la chispa inesperada de la pimienta rosa.',
    notes: { top: 'Pimienta rosa, Bergamota', heart: 'Sándalo, Geranio', base: 'Vainilla, Ámbar dorado' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6325-scaled-e1681511963528-1536x1536-63c86a7359b0c0a91a17219540086209-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6325-scaled-e1681511963528-1536x1536-63c86a7359b0c0a91a17219540086209-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8453-scaled-e1685916235552-1534x1536-0788f88e8f8219233017219543914857-480-0.webp',
    ],
    properties: ['sensual', 'cálido', 'sofisticado'],
    environments: ['dormitorio', 'sala de estar', 'spa en casa'],
  },
  {
    number: 46,
    name: 'Green Amber',
    concept: 'Naturaleza',
    family: 'Fresco',
    slug: 'green-amber',
    color: '#7A9E7A',
    tagline: 'Naturaleza viva, calidez dorada',
    description: 'Ámbar cálido con un corazón de hojas verdes y musgo. La fusión de lo orgánico y lo luminoso, como un bosque al amanecer.',
    story: 'Green Amber es la fragrancia del amanecer en el bosque. Ese momento exacto cuando la luz dorada atraviesa los árboles y el aire huele a tierra húmeda, hojas verdes y algo dulce que viene del suelo.',
    notes: { top: 'Hojas verdes, Bergamota', heart: 'Musgo, Bambú', base: 'Ámbar dorado, Pachuli' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_9339-scaled-e1696449873304-1536x1536-b7487dc550d9a95c5917209852352855-480-0.webp',
    images: [
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_9339-scaled-e1696449873304-1536x1536-b7487dc550d9a95c5917209852352855-480-0.webp',
      'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6420-scaled-e1696461568818-1536x1536-77992b0b0802559e1b17219546572465-480-0.webp',
    ],
    properties: ['natural', 'terroso', 'fresco'],
    environments: ['sala de estar', 'oficina', 'jardín interior'],
  },
]

export function getAllAromas(): AromaData[] {
  return [...AROMAS, ...AROMAS_LEGACY]
}

export function getAromaBySlug(slug: string): AromaData | undefined {
  return getAllAromas().find((a) => a.slug === slug)
}
