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
                Activism Visualizer
              </h1>
              <p className="text-gray-600 mt-1">
                Identify key moments where activism is most effective
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
              <h3 className="font-bold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">
                    Events Shown
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {filteredEvents.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">
                    Total Activists
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredEvents
                      .reduce((sum, e) => sum + e.activists, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">
                    Avg. Impact
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
            💡 For the best experience, view this site on a larger screen
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">About this Visualizer</h3>
              <p className="text-sm text-gray-600">
                A tool to identify key social impact moments where activism can be most effective and precise.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Impact Variables</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>📺 Media Coverage</li>
                <li>👥 Activist Mobilization</li>
                <li>🌍 Public Awareness</li>
                <li>✅ Success Potential</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Data Sources</h3>
              <p className="text-sm text-gray-600">
                Information gathered from international media, activist organizations, and verified impact reports.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>
              Activism Visualizer © 2025 | Designed to maximize social impact
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
