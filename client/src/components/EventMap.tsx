import { ActivismEvent } from '@/data/events';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

interface EventMapProps {
  events: ActivismEvent[];
  selectedEvent: ActivismEvent | null;
  onSelectEvent: (event: ActivismEvent) => void;
}

/**
 * EventMap Component
 * 
 * Design Philosophy: Scientific-Environmental
 * - Displays events as interactive nodes on a geographic visualization
 * - Color-coded by impact metrics (heatmap style)
 * - Responsive grid layout with event cards
 * 
 * Note: Using a grid-based layout instead of actual map library for simplicity
 * and better performance in static environment
 */
export default function EventMap({ events, selectedEvent, onSelectEvent }: EventMapProps) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Calculate impact score for color intensity
  const getImpactColor = (event: ActivismEvent) => {
    const avgImpact =
      (event.impactMetrics.mediaReach +
        event.impactMetrics.activistMobilization +
        event.impactMetrics.publicAwareness) /
      3;

    if (avgImpact >= 80) return '#E74C3C'; // Red - Critical
    if (avgImpact >= 70) return '#E67E22'; // Orange - High
    if (avgImpact >= 60) return '#F39C12'; // Yellow - Medium
    return '#2D8659'; // Green - Standard
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-green-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mapa de Eventos Activistas</h2>
        <p className="text-gray-600">
          {events.length} eventos de alto impacto social en Latinoamérica
        </p>
      </div>

      {/* Events Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => {
            const impactColor = getImpactColor(event);
            const isSelected = selectedEvent?.id === event.id;
            const isHovered = hoveredEvent === event.id;

            const borderStyle = isSelected 
              ? 'border-blue-600 ring-2 ring-blue-300' 
              : 'border-gray-200';

            const scaleStyle = isHovered ? 'scale-105' : '';

            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 bg-white shadow-sm hover:shadow-md ${borderStyle} ${scaleStyle}`}
                style={{
                  borderLeftColor: impactColor,
                  borderLeftWidth: '4px',
                }}
              >
                {/* Location Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} style={{ color: impactColor }} />
                  <span className="text-xs font-semibold text-gray-600 uppercase">
                    {event.location.city}, {event.location.country}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-bold text-gray-900 mb-2 text-sm line-clamp-2">
                  {event.name}
                </h3>

                {/* Impact Metrics - Mini Bars */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Cobertura Mediática</span>
                    <span className="font-semibold text-gray-900">
                      {event.impactMetrics.mediaReach}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${event.impactMetrics.mediaReach}%`,
                        backgroundColor: impactColor,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-gray-600">Movilización Activista</span>
                    <span className="font-semibold text-gray-900">
                      {event.impactMetrics.activistMobilization}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${event.impactMetrics.activistMobilization}%`,
                        backgroundColor: impactColor,
                      }}
                    />
                  </div>
                </div>

                {/* Activists Count */}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: impactColor }} />
                  <span>
                    <strong>{event.activists}</strong> activistas involucrados
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      event.status === 'active'
                        ? 'bg-red-100 text-red-800'
                        : event.status === 'ongoing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {event.status === 'active'
                      ? '🔴 Activo'
                      : event.status === 'ongoing'
                        ? '🟡 En Curso'
                        : '✅ Resuelto'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
