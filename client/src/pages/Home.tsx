import EventDetails from '@/components/EventDetails';
import EventMap from '@/components/EventMap';
import FilterPanel from '@/components/FilterPanel';
import { events } from '@/data/events';
import { ActivismEvent } from '@/data/events';
import { useState, useMemo } from 'react';

/**
 * Home Page - Visualizador de Eventos de Activismo
 * 
 * Design Philosophy: Scientific-Environmental
 * - Three-column layout: Filters | Map/Events | Details
 * - Color-coded impact metrics
 * - Responsive design for mobile/tablet
 * - Real-time filtering and selection
 */
export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<ActivismEvent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [minImpact, setMinImpact] = useState(0);

  // Filter events based on selected criteria
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Category filter
      if (selectedCategory && event.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus && event.status !== selectedStatus) {
        return false;
      }

      // Impact filter - calculate average impact
      const avgImpact =
        (event.impactMetrics.mediaReach +
          event.impactMetrics.activistMobilization +
          event.impactMetrics.publicAwareness +
          event.impactMetrics.successPotential) /
        4;

      if (avgImpact < minImpact) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, selectedStatus, minImpact]);

  // Reset selected event if it's filtered out
  if (selectedEvent && !filteredEvents.find((e) => e.id === selectedEvent.id)) {
    setSelectedEvent(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-4xl">🌍</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Visualizador de Activismo
              </h1>
              <p className="text-gray-600 mt-1">
                Identifica momentos clave donde el activismo es más efectivo
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1 h-full overflow-y-auto">
            <FilterPanel
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              minImpact={minImpact}
              onCategoryChange={setSelectedCategory}
              onStatusChange={setSelectedStatus}
              onImpactChange={setMinImpact}
            />

            {/* Summary Stats */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Resumen</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">
                    Eventos Mostrados
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {filteredEvents.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">
                    Activistas Totales
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredEvents
                      .reduce((sum, e) => sum + e.activists, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">
                    Impacto Promedio
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      filteredEvents.reduce((sum, e) => {
                        const avg =
                          (e.impactMetrics.mediaReach +
                            e.impactMetrics.activistMobilization +
                            e.impactMetrics.publicAwareness +
                            e.impactMetrics.successPotential) /
                          4;
                        return sum + avg;
                      }, 0) / (filteredEvents.length || 1)
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Event Map */}
          <div className="lg:col-span-2 h-full overflow-hidden rounded-lg border border-gray-200 shadow-lg">
            <EventMap
              events={filteredEvents}
              selectedEvent={selectedEvent}
              onSelectEvent={setSelectedEvent}
            />
          </div>

          {/* Right Sidebar - Event Details */}
          <div className="lg:col-span-1 h-full overflow-hidden rounded-lg border border-gray-200 shadow-lg">
            <EventDetails event={selectedEvent} />
          </div>
        </div>

        {/* Mobile Layout Info */}
        <div className="lg:hidden mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            💡 Para una mejor experiencia, visualiza este sitio en una pantalla más grande
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Sobre este Visualizador</h3>
              <p className="text-sm text-gray-600">
                Una herramienta para identificar momentos clave de alto impacto social donde el
                activismo puede ser más efectivo y preciso.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Variables de Impacto</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>📺 Cobertura Mediática</li>
                <li>👥 Movilización Activista</li>
                <li>🌍 Conciencia Pública</li>
                <li>✅ Potencial de Éxito</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Fuentes de Datos</h3>
              <p className="text-sm text-gray-600">
                Información recopilada de medios internacionales, organizaciones activistas y
                reportes de impacto verificados.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>
              Visualizador de Activismo © 2025 | Diseñado para maximizar el impacto social
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
