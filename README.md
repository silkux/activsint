# Visualizador de Eventos de Activismo

Un visualizador interactivo de eventos de alto impacto social que permite identificar momentos clave donde el activismo es más efectivo. Diseñado para ayudar a activistas a ser más precisos y coordinados en sus acciones.

## 🎯 Propósito

Este visualizador recopila eventos de alto impacto social (como la muerte de Kshamenk, la orca en cautiverio en Argentina) y los analiza a través de variables de impacto social:

- **Cobertura Mediática**: ¿Cuánta atención mediática recibió el evento?
- **Movilización Activista**: ¿Cuál es el potencial de movilización de activistas?
- **Conciencia Pública**: ¿Cuánta conciencia pública se generó?
- **Potencial de Éxito**: ¿Cuál es el potencial de lograr cambios?

## 📊 Características

### 1. Mapa Interactivo de Eventos
- Visualización de eventos en una cuadrícula geográfica
- Eventos color-codificados por nivel de impacto
- Información detallada de cada evento al hacer clic

### 2. Sistema de Filtros Avanzado
- Filtrar por categoría (cautiverio, maltrato, tráfico, etc.)
- Filtrar por estado (activo, en curso, resuelto)
- Filtrar por nivel mínimo de impacto

### 3. Panel de Detalles
- Información completa del evento
- Métricas de impacto visualizadas
- Número de activistas involucrados
- Fuentes de información

### 4. Centro de Notificaciones
- Notificar a activistas en la zona del evento
- Múltiples métodos de entrega (email, push, SMS)
- Estimación de alcance

### 5. Estadísticas Agregadas
- Total de activistas involucrados
- Promedios de impacto
- Distribución de eventos por estado

## 🎨 Diseño

El visualizador sigue una **filosofía científico-ambiental**:

- **Paleta de colores**: Azul océano (#0F5A7F) + Verde bosque (#2D8659) + Naranja alerta (#E67E22)
- **Tipografía**: Merriweather (títulos elegantes) + Inter (cuerpo limpio)
- **Estructura**: Tres columnas (Filtros | Mapa | Detalles)
- **Responsive**: Optimizado para desktop y tablet

## 📋 Eventos Incluidos

El visualizador incluye eventos clave de Latinoamérica:

1. **Kshamenk (2025)**: Muerte de orca en cautiverio en Argentina
2. **Zoológico de Luján (2024)**: Maltrato animal documentado
3. **Caso Mina (2025)**: Cierre de zoológico en México
4. **Keiko (1993)**: Ballena de "Free Willy"
5. **Operación Anti-Tráfico (2025)**: Rescate de fauna silvestre
6. **Albergue de Perros (2025)**: Rescate en Nuevo León
7. **Igualdad Animal (2022)**: Campañas de impacto global

## 🚀 Cómo Usar

### Explorar Eventos
1. Abre el visualizador
2. Navega por los eventos en el mapa central
3. Haz clic en un evento para ver detalles completos

### Filtrar Eventos
1. Usa el panel de filtros en la izquierda
2. Selecciona una categoría, estado o nivel de impacto
3. Los eventos se actualizan automáticamente

### Notificar Activistas
1. Selecciona un evento
2. En el panel de detalles, haz clic en "Notificar Activistas"
3. Elige los métodos de entrega
4. Envía las notificaciones

## 📊 Variables de Impacto

Cada evento se evalúa en una escala de 0-100 para:

| Variable | Descripción |
|----------|-------------|
| Cobertura Mediática | Alcance en medios (TV, prensa, redes sociales) |
| Movilización Activista | Potencial de activistas para actuar |
| Conciencia Pública | Nivel de conocimiento público del evento |
| Potencial de Éxito | Probabilidad de lograr cambios concretos |

## 🏗️ Estructura del Proyecto

```
client/
├── src/
│   ├── components/
│   │   ├── EventMap.tsx          # Visualización de eventos
│   │   ├── EventDetails.tsx      # Detalles del evento
│   │   ├── FilterPanel.tsx       # Panel de filtros
│   │   ├── NotificationCenter.tsx # Centro de notificaciones
│   │   └── ImpactStats.tsx       # Estadísticas
│   ├── data/
│   │   └── events.ts            # Base de datos de eventos
│   ├── pages/
│   │   └── Home.tsx             # Página principal
│   └── index.css                # Estilos globales
└── public/
    └── images/                  # Imágenes del proyecto
```

## 🔧 Tecnologías

- **React 19**: Framework frontend
- **TypeScript**: Tipado estático
- **Tailwind CSS 4**: Estilos
- **shadcn/ui**: Componentes UI
- **Lucide React**: Iconos

## 📈 Casos de Uso

### Para Activistas
- Identificar eventos donde el activismo es más efectivo
- Coordinar acciones con otros activistas
- Recibir notificaciones de eventos importantes

### Para Organizaciones
- Monitorear eventos de alto impacto
- Evaluar potencial de movilización
- Planificar campañas basadas en datos

### Para Investigadores
- Analizar patrones de activismo
- Estudiar impacto mediático de eventos
- Evaluar efectividad de acciones

## 🌍 Impacto Social

Este visualizador busca:

1. **Precisión**: Ayudar a activistas a enfocarse en eventos con mayor potencial
2. **Coordinación**: Facilitar la colaboración entre activistas
3. **Eficiencia**: Maximizar el impacto de las acciones
4. **Transparencia**: Mostrar datos verificados y fuentes confiables

## 📝 Notas

- Los datos incluidos son ejemplos basados en eventos reales
- Se pueden agregar más eventos y métricas personalizadas
- El sistema de notificaciones es un prototipo educativo
- Se recomienda validar datos con fuentes oficiales

## 🤝 Contribuciones

Para agregar nuevos eventos o mejorar el visualizador:

1. Edita `client/src/data/events.ts`
2. Agrega nuevos eventos con sus métricas
3. Actualiza las categorías si es necesario

## 📞 Contacto

Para preguntas o sugerencias sobre el visualizador, contacta a los desarrolladores.

---

**Visualizador de Activismo © 2025** | Diseñado para maximizar el impacto social
