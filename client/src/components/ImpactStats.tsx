import { ActivismEvent } from '@/data/events';
import { BarChart, TrendingUp, Users, Globe } from 'lucide-react';

interface ImpactStatsProps {
  events: ActivismEvent[];
}

/**
 * ImpactStats Component
 * 
 * Design Philosophy: Scientific-Environmental
 * - Displays aggregate statistics across all events
 * - Visual representation of impact metrics
 * - Shows trends and key insights
 */
export default function ImpactStats({ events }: ImpactStatsProps) {
  // Calculate aggregate metrics
  const totalActivists = events.reduce((sum, e) => sum + e.activists, 0);
  const avgMediaReach = Math.round(
    events.reduce((sum, e) => sum + e.impactMetrics.mediaReach, 0) / (events.length || 1)
  );
  const avgMobilization = Math.round(
    events.reduce((sum, e) => sum + e.impactMetrics.activistMobilization, 0) / (events.length || 1)
  );
  const avgAwareness = Math.round(
    events.reduce((sum, e) => sum + e.impactMetrics.publicAwareness, 0) / (events.length || 1)
  );

  // Count by status
  const activeCount = events.filter((e) => e.status === 'active').length;
  const ongoingCount = events.filter((e) => e.status === 'ongoing').length;
  const resolvedCount = events.filter((e) => e.status === 'resolved').length;

  const stats = [
    {
      label: 'Activistas Totales',
      value: totalActivists.toLocaleString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Cobertura Mediática Promedio',
      value: `${avgMediaReach}%`,
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Movilización Promedio',
      value: `${avgMobilization}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Conciencia Pública Promedio',
      value: `${avgAwareness}%`,
      icon: BarChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <Icon size={32} className={`${stat.color} opacity-20`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart size={20} className="text-blue-600" />
          Distribución por Estado
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">🔴 Activos</span>
              <span className="text-sm font-bold text-gray-900">{activeCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-red-600"
                style={{ width: `${(activeCount / events.length) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">🟡 En Curso</span>
              <span className="text-sm font-bold text-gray-900">{ongoingCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-yellow-600"
                style={{ width: `${(ongoingCount / events.length) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">✅ Resueltos</span>
              <span className="text-sm font-bold text-gray-900">{resolvedCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-green-600"
                style={{ width: `${(resolvedCount / events.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
