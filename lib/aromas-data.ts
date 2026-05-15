export interface AromaData {
  number: number
  name: string
  family: 'Fresco' | 'Floral' | 'Terra'
  slug: string
  color: string
  tagline: string
  description: string
  story: string          // longer narrative for the detail page
  notes: { top: string; heart: string; base: string }
  image: string          // primary product image
  images: string[]       // gallery of images for detail page
  properties: string[]
  environments: string[]
}

export const AROMAS: AromaData[] = [
  {
    number: 2,
    name: 'Verbena',
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
    family: 'Floral',
    slug: 'floral-velvet',
    color: '#C9A8C4',
    tagline: 'La suavidad hecha fragancia',
    description: 'Una composición floral envuelta en seda. Pétalos de rosa y peonía se entrelazan con un fondo suave de almizcle.',
    story: 'Floral Velvet es una declaración de elegancia femenina. Inspirado en los bouquets que perfuman las habitaciones de los grandes hoteles, este blend une la voluptuosidad de la peonía con la delicadeza del iris. La terciopela del almizcle lo convierte en un abrazo olfativo.',
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
    family: 'Terra',
    slug: 'oud-imperial',
    color: '#9C7443',
    tagline: 'La profundidad del oriente',
    description: 'Inspirado en los perfumes de Medio Oriente. Oud, maderas preciosas y especias crean una experiencia olfativa de lujo atemporal.',
    story: 'Oud Imperial lleva la esencia del oriente a cada rincón. El oud, conocido como el "oro negro" de la perfumería, se funde con el azafrán y la rosa para crear una fragancia de lujo atemporal. Es el aroma de los palacios, las noches estrelladas y la hospitalidad ancestral.',
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
    family: 'Floral',
    slug: 'french-lavander',
    color: '#A89BC9',
    tagline: 'Los campos de Provenza en tu hogar',
    description: 'Lavanda francesa de alta pureza con notas aromáticas herbáceas. Calma, equilibrio y la elegancia atemporal del sur de Francia.',
    story: 'Imaginamos los campos violetas que se extienden bajo el sol del sur de Francia. French Lavender es ese paisaje hecho fragancia: la lavanda en su expresión más pura, complementada por el romero y el espliego que crecen entre los surcos. Cada vela encendida es un viaje instantáneo a la Provenza.',
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
    family: 'Fresco',
    slug: 'jengibre-te-blanco',
    color: '#C4B48A',
    tagline: 'Calidez especiada, frescura serena',
    description: 'El picante sutil del jengibre fresco encuentra la serenidad del té blanco. Un equilibrio sofisticado entre energía y calma.',
    story: 'Jengibre & Té Blanco surgió de buscar el balance perfecto: la calidez que energiza sin inquietar. El jengibre fresco aporta vitalidad y foco; el té blanco, la serenidad de una tarde tranquila. Es el aroma ideal para los momentos en que querés estar alerta y en paz al mismo tiempo.',
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
    family: 'Terra',
    slug: 'cardamom-woods',
    color: '#8C7060',
    tagline: 'Especias nobles sobre raíces antiguas',
    description: 'Cardamomo verde sobre un corazón de maderas oscuras. Evoca caravanas, biblioteca de viajero y la riqueza de lo auténtico.',
    story: 'Cardamom & Woods es el aroma de los relatos de viaje. El cardamomo verde recuerda a los mercados especiados de Oriente Medio; las maderas profundas evocan una biblioteca de libros antiguos. Este blend es para quienes aprecian lo auténtico, lo que tiene historia y peso.',
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
    family: 'Terra',
    slug: 'sandalo-pimenta-rosa',
    color: '#C48A8A',
    tagline: 'El contraste que conquista',
    description: 'La cremosidad del sándalo indio con la vivacidad de la pimienta rosa. Una dualidad perfecta: suave y audaz al mismo tiempo.',
    story: 'Sándalo & Pimienta Rosa es un contraste que funciona. La cremosidad envolvente del sándalo, trabajada desde hace siglos en la perfumería india, encuentra la chispa inesperada de la pimienta rosa. El resultado es un blend que sorprende: suave en la base, audaz en la salida, irresistible en conjunto.',
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
    family: 'Fresco',
    slug: 'green-amber',
    color: '#7A9E7A',
    tagline: 'Naturaleza viva, calidez dorada',
    description: 'Ámbar cálido con un corazón de hojas verdes y musgo. La fusión de lo orgánico y lo luminoso, como un bosque al amanecer.',
    story: 'Green Amber es la fragrancia del amanecer en el bosque. Ese momento exacto cuando la luz dorada atraviesa los árboles y el aire huele a tierra húmeda, hojas verdes y algo dulce que viene del suelo. Un aroma que conecta con la naturaleza sin salir de casa.',
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

export function getAromaBySlug(slug: string): AromaData | undefined {
  return AROMAS.find((a) => a.slug === slug)
}
