export interface AromaPrinciple {
  name: string
  type: string
  description: string
}

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
  aromaticProfile?: string
  principles?: AromaPrinciple[]
  ritualText?: string
  image: string
  images: string[]
  properties: string[]
  environments: string[]
  // Brand graphics (2026 collection only)
  trama?: string
  tramaLight?: string
  icon?: string
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
    tagline: 'Un refugio de suavidad, delicadeza y distinción.',
    description: 'Rosas abiertas, flores suaves y acordes aterciopelados despliegan un universo sofisticado y envolvente que recuerda la suavidad de las manos, la elegancia silenciosa y el refugio íntimo del hogar. Homenaje a la delicadeza del tacto, transforma el espacio en un refugio de memoria y confort.',
    story: 'Al alba del verano, cuando el rocío todavía cubre la superficie del jardín y las rosas abren en su máximo esplendor, se produce el antiguo ritual familiar de recolección floral. Este blend honra los pétalos recién cortados, la feminidad en su forma más profunda y la belleza delicada de lo heredado.',
    notes: { top: 'Floral-verde suave', heart: 'Rosa Búlgara, Peonías, Higo', base: 'Muguet & Almizcle' },
    aromaticProfile: 'Salida floral-verde suave, corazón romántico y elegante, base almizclada aterciopelada y sofisticada.',
    principles: [
      { name: 'Rosa Búlgara', type: 'Flor', description: 'Uno de los tesoros más preciados de la perfumería botánica. En la complejidad de sus pétalos se despliega una fragancia rica, roja y aterciopelada con matices verdes, dulces y especiados. Aporta sofisticación, feminidad y una profundidad que constituye el corazón de esta composición.' },
      { name: 'Peonías', type: 'Flor', description: 'Exuberante, delicada y luminosa. Sus pétalos liberan una frescura suave y envolvente, donde conviven transparencia y sensualidad. Expande la estructura floral con ligereza y elegancia.' },
      { name: 'Higo', type: 'Fruto', description: 'Verde, cremoso y ligeramente dulce, su aroma reúne hoja, savia y pulpa en una textura vegetal profunda. Introduce una calidez aterciopelada que madura la composición y aporta cuerpo.' },
      { name: 'Muguet', type: 'Flor', description: 'Ligero, blanco y cristalino. Frescura limpia y etérea que ilumina la fragancia desde su centro más delicado.' },
      { name: 'White Musk', type: 'Base botánica', description: 'El velo íntimo de la composición. Su textura limpia y persistente prolonga el perfume con suavidad aterciopelada, aportando duración y una sensualidad silenciosa.' },
    ],
    ritualText: 'Velvet invita a crear una atmósfera de belleza silenciosa, donde cada nota perfuma el presente mientras evoca memorias delicadas.',
    image: '/media/_MG_3566.jpg',
    images: ['/media/_MG_3566.jpg', '/media/MG_9578-scaled.jpg'],
    properties: ['floral', 'aterciopelada', 'elegante', 'verde', 'almizclada'],
    environments: ['dormitorios', 'livings', 'recibidores', 'espacios de pausa'],
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
    tagline: 'Raíces profundas, presencia cálida y sensualidad duradera.',
    description: 'Especias vibrantes, maderas sagradas y resinas envolventes construyen un blend profundamente magnético, donde la energía del presente dialoga con la profundidad de lo ancestral. Perfume de raíz cálida, sensualidad balsámica y elegancia duradera. Encarna la intimidad, la conexión emocional y la fuerza silenciosa de aquello que permanece.',
    story: 'El linaje es la huella invisible que une pasado y presente: raíces profundas, gestos heredados y vínculos que perduran más allá del tiempo. Es memoria viva, refugio y permanencia transformados en presencia.',
    notes: { top: 'Especiada-frutal vibrante', heart: 'Sándalo, Pimienta Rosa, Frambuesa', base: 'Ámbar sensual y duradero' },
    aromaticProfile: 'Salida especiada-frutal vibrante, corazón cálido amaderado, base ambarada sensual y duradera.',
    principles: [
      { name: 'Sándalo', type: 'Madera', description: 'Sagrada, cremosa y profundamente balsámica. Su aroma cálido y meditativo despliega una riqueza suave que envuelve la composición con profundidad, sensualidad y permanencia.' },
      { name: 'Pimienta Rosa', type: 'Fruto', description: 'Vibrante, especiada y ligeramente frutal. Sus bayas liberan una energía chispeante que aporta frescura rosada, magnetismo y una apertura luminosa.' },
      { name: 'Frambuesa', type: 'Fruto', description: 'Dulce, jugosa y delicadamente ácida. Introduce una dimensión frutal que suaviza las especias y aporta dinamismo seductor al corazón del perfume.' },
      { name: 'Ámbar', type: 'Resina', description: 'Cálido, envolvente y balsámico. Su profundidad resinosa sostiene la estructura con sensualidad, permanencia y una elegancia duradera.' },
    ],
    ritualText: 'Linaje crea una atmósfera envolvente. Pensada para momentos de luz tenue, que invita a bajar el ritmo, conectar y permanecer.',
    image: '/media/_MG_3545.jpg',
    images: ['/media/_MG_3545.jpg', '/media/MG_9590-scaled.jpg'],
    properties: ['amaderada', 'especiada', 'cálida', 'sensual', 'balsámica'],
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
    tagline: 'Maderas nobles y especias profundas para habitar lo esencial.',
    description: 'Especias exóticas, raíces terrosas y maderas nobles despliegan una fragancia introspectiva, sofisticada y enigmática que narra un viaje hacia lo esencial. Perfume de carácter sereno, estructura profunda y misterio elegante. Encarna la permanencia, la contemplación y la fuerza silenciosa de aquello que perdura.',
    story: 'En el aroma de la madera trabajada, donde el tiempo permanece suspendido entre herramientas heredadas, vetas nobles y el silencio profundo del taller, habita la memoria del oficio. Un homenaje sensorial a quienes construyen con paciencia, visión y una íntima conexión con la materia.',
    notes: { top: 'Especiada fresca', heart: 'Cardamomo, Vetiver, Cedro', base: 'White Musk & Ámbar cálido' },
    aromaticProfile: 'Salida especiada fresca, corazón amaderado estructurado, base cálida almizclada y profunda.',
    principles: [
      { name: 'Cardamomo', type: 'Semilla', description: 'Exótico, fresco y especiado. Sus semillas concentran una intensidad aromática vibrante con matices verdes, cítricos y cálidos. Aporta misterio y sofisticación desde la apertura.' },
      { name: 'Vetiver', type: 'Raíz', description: 'Profundo, seco y terroso. Su estructura mineral y amaderada desarrolla una presencia estable que aporta introspección, carácter y solidez.' },
      { name: 'Cedro', type: 'Madera', description: 'Noble, seco y resinoso. Despliega una arquitectura aromática serena que evoca permanencia, estructura y la belleza del oficio.' },
      { name: 'White Musk', type: 'Base aromática', description: 'Limpio, aterciopelado y persistente. Suaviza la intensidad de las maderas y prolonga la composición con equilibrio.' },
      { name: 'Ámbar', type: 'Resina', description: 'Dulce, cálido y balsámico. Aporta profundidad, duración y una presencia envolvente.' },
    ],
    ritualText: 'Roble acompaña momentos de creación, contemplación y enfoque.',
    image: '/media/_MG_3533.jpg',
    images: ['/media/_MG_3533.jpg', '/media/MG_9566-scaled.jpg'],
    properties: ['amaderada', 'especiada', 'terrosa', 'elegante', 'introspectiva'],
    environments: ['estudios creativos', 'bibliotecas', 'hoteles', 'espacios de trabajo', 'entradas'],
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
    tagline: 'Frescura viva y cítrica que revitaliza cuerpo y espacio.',
    description: 'Cítricos radiantes, verdes frescos y notas botánicas revitalizantes construyen una experiencia limpia, luminosa y expansiva que despeja, purifica y revitaliza. Perfume de luz suave, frescura viva y renovación cotidiana. Encarna el bienestar, la claridad y la energía serena de los nuevos comienzos.',
    story: 'Una casa luminosa despierta con las ventanas abiertas, mientras el aire fresco recorre cada rincón y la claridad de la mañana transforma el espacio en renovación. Brisa nace como un homenaje al instante preciso donde todo vuelve a ordenarse y comenzar de nuevo.',
    notes: { top: 'Cítrica brillante', heart: 'Verbena, Lima Ácida, Pomelo Rosado', base: 'Higo & Muguet suave' },
    aromaticProfile: 'Salida cítrica brillante, corazón herbal fresco, base verde suave y revitalizante.',
    principles: [
      { name: 'Verbena', type: 'Flor', description: 'Herbal, cítrica y revitalizante. Sus hojas liberan una frescura luminosa asociada a limpieza, claridad y renovación, constituyendo el impulso vital de esta composición.' },
      { name: 'Lima Ácida', type: 'Cítrico', description: 'Brillante, verde y chispeante. Su pulpa intensa aporta una energía refrescante que despeja, estimula y revitaliza.' },
      { name: 'Pomelo Rosado', type: 'Fruto', description: 'Jugoso, radiante y ligeramente amargo. Introduce una vitalidad expansiva y luminosa que dinamiza el corazón cítrico del perfume.' },
      { name: 'Muguet', type: 'Flor', description: 'Ligero, blanco y cristalino, despliega una frescura limpia y etérea que ilumina la fragancia desde su centro más delicado.' },
      { name: 'Higo', type: 'Fruto', description: 'Verde, suave y delicadamente dulce. Su textura aterciopelada equilibra la frescura con profundidad y serenidad.' },
    ],
    ritualText: 'Brisa revitaliza el aire y transforma el espacio en una experiencia de renovación.',
    image: '/media/_MG_3521.jpg',
    images: ['/media/_MG_3521.jpg', '/media/MG_9617-scaled.jpg'],
    properties: ['cítrica', 'herbal', 'fresca', 'luminosa', 'verde'],
    environments: ['cocinas', 'estudios', 'espacios creativos', 'galerías', 'bienestar cotidiano'],
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
