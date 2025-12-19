import { ActivismEvent, categories } from '@/data/events';
import { AlertCircle, Globe, MapPin, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventDetailsProps {
  event: ActivismEvent | null;
}

/**
 * EventDetails Component
 * 
 * Design Philosophy: Scientific-Environmental
 * - Displays comprehensive event information with visual metrics
 * - Uses color-coded impact indicators
 * - Responsive layout with detailed breakdown
 */
export default function EventDetails({ event }: EventDetailsProps) {
  if (!event) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600 text-center">
          Selecciona un evento para ver detalles completos
        </p>
      </div>
    );
  }

  const category = categories[event.category];
  const avgImpact = Math.round(
    (event.impactMetrics.mediaReach +
      event.impactMetrics.activistMobilization +
      event.impactMetrics.publicAwareness +
      event.impactMetrics.successPotential) /
      4
  );

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      {/* Header with Category */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
            <div className="flex items-center gap-2 text-blue-100">
              <MapPin size={18} />
              <span>
                {event.location.city}, {event.location.country}
              </span>
            </div>
          </div>
          <div
            className="text-4xl"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          >
            {category.icon}
          </div>
        </div>

        {/* Category Badge */}
        <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full">
          <span className="text-sm font-semibold">{category.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Descripción</h3>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>

        {/* Date and Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Fecha del Evento</p>
            <p className="text-lg font-bold text-gray-900">
              {new Date(event.date).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Estado</p>
            <p className="text-lg font-bold">
              {event.status === 'active' && '🔴 Activo'}
              {event.status === 'ongoing' && '🟡 En Curso'}
              {event.status === 'resolved' && '✅ Resuelto'}
            </p>
          </div>
        </div>

        {/* Impact Metrics */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Métricas de Impacto</h3>

          {/* Overall Impact Score */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Impacto General</span>
              <span className="text-3xl font-bold text-blue-600">{avgImpact}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-green-600 transition-all"
                style={{ width: `${avgImpact}%` }}
              />
            </div>
          </div>

          {/* Individual Metrics */}
          <div className="space-y-4">
            {/* Media Reach */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">Cobertura Mediática</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {event.impactMetrics.mediaReach}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all"
                  style={{ width: `${event.impactMetrics.mediaReach}%` }}
                />
              </div>
            </div>

            {/* Activist Mobilization */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-green-600" />
                  <span className="font-semibold text-gray-900">Movilización Activista</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {event.impactMetrics.activistMobilization}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-green-600 transition-all"
                  style={{ width: `${event.impactMetrics.activistMobilization}%` }}
                />
              </div>
            </div>

            {/* Public Awareness */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-orange-600" />
                  <span className="font-semibold text-gray-900">Conciencia Pública</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {event.impactMetrics.publicAwareness}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-orange-600 transition-all"
                  style={{ width: `${event.impactMetrics.publicAwareness}%` }}
                />
              </div>
            </div>

            {/* Success Potential */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-600" />
                  <span className="font-semibold text-gray-900">Potencial de Éxito</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {event.impactMetrics.successPotential}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-red-600 transition-all"
                  style={{ width: `${event.impactMetrics.successPotential}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activists Involved */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <div className="flex items-center gap-2 mb-1">
            <Users size={20} className="text-blue-600" />
            <span className="font-semibold text-gray-900">Activistas Involucrados</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{event.activists.toLocaleString()}</p>
        </div>

        {/* Sources */}
        {event.sources.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Fuentes</h3>
            <div className="flex flex-wrap gap-2">
              {event.sources.map((source, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            Notificar Activistas
          </Button>
          <Button variant="outline" className="flex-1">
            Compartir Evento
          </Button>
        </div>
      </div>
    </div>
  );
}
