import { categories } from '@/data/events';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  selectedCategory: string | null;
  selectedStatus: string | null;
  minImpact: number;
  onCategoryChange: (category: string | null) => void;
  onStatusChange: (status: string | null) => void;
  onImpactChange: (impact: number) => void;
}

/**
 * FilterPanel Component
 * 
 * Design Philosophy: Scientific-Environmental
 * - Clean, organized filter controls
 * - Visual feedback for selected filters
 * - Responsive layout
 */
export default function FilterPanel({
  selectedCategory,
  selectedStatus,
  minImpact,
  onCategoryChange,
  onStatusChange,
  onImpactChange,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const statuses = [
    { value: 'active', label: '🔴 Activo', color: 'bg-red-100 text-red-800' },
    { value: 'ongoing', label: '🟡 En Curso', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'resolved', label: '✅ Resuelto', color: 'bg-green-100 text-green-800' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-bold text-gray-900">Filtros</h3>
        <ChevronDown
          size={20}
          className={`text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 py-4 space-y-6 border-t border-gray-200">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Categoría
            </label>
            <div className="space-y-2">
              <button
                onClick={() => onCategoryChange(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Todas las categorías
              </button>
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => onCategoryChange(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    selectedCategory === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Estado
            </label>
            <div className="space-y-2">
              <button
                onClick={() => onStatusChange(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  selectedStatus === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Todos los estados
              </button>
              {statuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => onStatusChange(status.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    selectedStatus === status.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">{status.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Impact Slider */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Impacto Mínimo: {minImpact}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={minImpact}
              onChange={(e) => onImpactChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Bajo</span>
              <span>Alto</span>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              onCategoryChange(null);
              onStatusChange(null);
              onImpactChange(0);
            }}
            className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
}
