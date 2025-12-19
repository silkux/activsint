// Eventos de alto impacto social relacionados con activismo animal
// Variables de impacto: cobertura mediática, movilización activista, alcance geográfico

export interface ActivismEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  impactMetrics: {
    mediaReach: number; // 0-100 (cobertura mediática)
    activistMobilization: number; // 0-100 (potencial de movilización)
    publicAwareness: number; // 0-100 (conciencia pública)
    successPotential: number; // 0-100 (potencial de éxito de acciones)
  };
  category: 'captivity' | 'habitat' | 'trafficking' | 'abuse' | 'legal_victory' | 'rescue';
  status: 'active' | 'resolved' | 'ongoing';
  activists: number; // cantidad de activistas involucrados
  sources: string[];
}

export const events: ActivismEvent[] = [
  {
    id: 'kshamenk-2025',
    name: 'Muerte de Kshamenk - Orca en Cautiverio',
    description: 'La orca Kshamenk, rescatada en 1992 después de un varamiento, murió tras 33 años en cautiverio en Mundo Marino, Argentina. Su muerte reavivó el debate sobre el bienestar de cetáceos en cautiverio y generó movilización global de activistas.',
    date: '2025-12-14',
    location: {
      city: 'San Clemente del Tuyú',
      country: 'Argentina',
      latitude: -36.3667,
      longitude: -56.7500,
    },
    impactMetrics: {
      mediaReach: 95, // Cobertura masiva internacional
      activistMobilization: 88, // Alto potencial de movilización
      publicAwareness: 92, // Gran conciencia pública
      successPotential: 75, // Potencial para cambios en regulaciones
    },
    category: 'captivity',
    status: 'active',
    activists: 2500,
    sources: ['CNN', 'BBC', 'La Nación', 'Infobae', 'Whale Sanctuary Project'],
  },
  {
    id: 'zoologico-lujan-2024',
    name: 'Maltrato en Zoológico de Luján',
    description: 'Investigación revela maltrato sistemático de animales en el Zoológico de Luján. Activistas documentaron condiciones insalubres y muerte de múltiples felinos. Caso reabierto por la Cámara Federal de Casación Penal.',
    date: '2024-09-15',
    location: {
      city: 'Luján',
      country: 'Argentina',
      latitude: -34.7500,
      longitude: -59.1167,
    },
    impactMetrics: {
      mediaReach: 78,
      activistMobilization: 82,
      publicAwareness: 70,
      successPotential: 68,
    },
    category: 'abuse',
    status: 'ongoing',
    activists: 1200,
    sources: ['Infobae', 'La Nación', 'Activistas por los Animales'],
  },
  {
    id: 'mina-osa-mexico-2025',
    name: 'Cierre del Zoológico La Pastora - Caso Mina',
    description: 'La osa Mina se hizo viral por su crítico estado de salud en el zoológico La Pastora en Nuevo León, México. Las irregularidades en su caso llevaron a las autoridades ambientales a clausurar el zoológico.',
    date: '2025-10-03',
    location: {
      city: 'Monterrey',
      country: 'México',
      latitude: 25.6866,
      longitude: -100.3161,
    },
    impactMetrics: {
      mediaReach: 85,
      activistMobilization: 79,
      publicAwareness: 88,
      successPotential: 82,
    },
    category: 'legal_victory',
    status: 'resolved',
    activists: 1800,
    sources: ['El País', 'Profepa', 'Redes Sociales'],
  },
  {
    id: 'keiko-ballena-1993',
    name: 'Caso Keiko - Ballena de "Free Willy"',
    description: 'Keiko, la ballena que interpretó a Willy en la película, fue rescatada de un parque marino en México. Su reintroducción en la naturaleza se convirtió en un hito del activismo marino, aunque enfrentó desafíos.',
    date: '1993-01-01',
    location: {
      city: 'Ciudad de México',
      country: 'México',
      latitude: 19.4326,
      longitude: -99.1332,
    },
    impactMetrics: {
      mediaReach: 92,
      activistMobilization: 85,
      publicAwareness: 95,
      successPotential: 60,
    },
    category: 'rescue',
    status: 'resolved',
    activists: 5000,
    sources: ['PETA', 'Whale Sanctuary Project', 'Medios Internacionales'],
  },
  {
    id: 'trafico-fauna-latam-2025',
    description: 'Operación coordinada de autoridades ambientales en Latinoamérica rescata 222 animales víctimas de tráfico ilegal. 9 de cada 10 animales capturados por comercio ilegal mueren durante el traslado.',
    name: 'Operación Anti-Tráfico de Fauna Silvestre',
    date: '2025-10-20',
    location: {
      city: 'Latinoamérica',
      country: 'Múltiples',
      latitude: -15.7942,
      longitude: -52.2319,
    },
    impactMetrics: {
      mediaReach: 72,
      activistMobilization: 76,
      publicAwareness: 65,
      successPotential: 71,
    },
    category: 'trafficking',
    status: 'active',
    activists: 800,
    sources: ['Agencia de Investigación del Delito', 'Autoridades Ambientales'],
  },
  {
    id: 'albergue-perros-nuevo-leon-2025',
    name: 'Rescate de 60+ Perros en Albergue de Nuevo León',
    description: 'Activistas y autoridades rescatan más de 60 perros en estado crítico de un albergue en Santa Catarina, Nuevo León. El caso genera indignación y salta a la arena política.',
    date: '2025-09-17',
    location: {
      city: 'Santa Catarina',
      country: 'México',
      latitude: 25.6500,
      longitude: -100.3667,
    },
    impactMetrics: {
      mediaReach: 68,
      activistMobilization: 80,
      publicAwareness: 72,
      successPotential: 74,
    },
    category: 'abuse',
    status: 'ongoing',
    activists: 600,
    sources: ['El País', 'Autoridades Locales', 'Redes Sociales'],
  },
  {
    id: 'igualdad-animal-2022',
    name: 'Campañas de Igualdad Animal - Impacto 2022',
    description: 'Investigaciones encubiertas y campañas de Igualdad Animal ayudaron a más de 202 millones de animales en 2022. Organización internacional con red de 4000+ activistas en Latinoamérica.',
    date: '2022-12-31',
    location: {
      city: 'Latinoamérica',
      country: 'Múltiples',
      latitude: -15.7942,
      longitude: -52.2319,
    },
    impactMetrics: {
      mediaReach: 75,
      activistMobilization: 88,
      publicAwareness: 70,
      successPotential: 85,
    },
    category: 'legal_victory',
    status: 'ongoing',
    activists: 4000,
    sources: ['Igualdad Animal', 'Reportes de Impacto'],
  },
];

export const categories = {
  captivity: {
    label: 'Cautiverio',
    color: '#E67E22', // Naranja
    icon: '🔒',
  },
  habitat: {
    label: 'Hábitat',
    color: '#2D8659', // Verde
    icon: '🌍',
  },
  trafficking: {
    label: 'Tráfico Ilegal',
    color: '#E74C3C', // Rojo
    icon: '⚠️',
  },
  abuse: {
    label: 'Maltrato',
    color: '#C0392B', // Rojo oscuro
    icon: '💔',
  },
  legal_victory: {
    label: 'Victoria Legal',
    color: '#27AE60', // Verde claro
    icon: '✅',
  },
  rescue: {
    label: 'Rescate',
    color: '#3498DB', // Azul claro
    icon: '🆘',
  },
};
