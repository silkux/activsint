import { ActivismEvent } from '@/data/events';
import { Bell, MapPin, Users, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NotificationCenterProps {
  event: ActivismEvent | null;
}

/**
 * NotificationCenter Component
 * 
 * Design Philosophy: Scientific-Environmental
 * - Allows activists to be notified about events in their region
 * - Shows notification options and delivery methods
 * - Displays estimated reach and impact
 */
export default function NotificationCenter({ event }: NotificationCenterProps) {
  const [notificationSent, setNotificationSent] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState<string[]>(['email', 'push']);

  if (!event) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <Bell size={32} className="text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 text-sm">
          Selecciona un evento para enviar notificaciones
        </p>
      </div>
    );
  }

  const handleNotify = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  const toggleMethod = (method: string) => {
    setSelectedMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  // Calculate estimated reach
  const estimatedReach = Math.round(
    (event.activists * event.impactMetrics.activistMobilization) / 100
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-blue-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={24} className="text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Centro de Notificaciones</h3>
      </div>

      {/* Event Info */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.name}</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin size={16} />
          <span>
            {event.location.city}, {event.location.country}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} />
          <span>
            <strong>{event.activists}</strong> activistas en la zona
          </span>
        </div>
      </div>

      {/* Notification Methods */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Métodos de Notificación
        </label>
        <div className="space-y-2">
          {[
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'push', label: 'Notificación Push', icon: Bell },
            { id: 'sms', label: 'SMS', icon: MessageSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => toggleMethod(id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                selectedMethods.includes(id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedMethods.includes(id)}
                onChange={() => {}}
                className="w-4 h-4 accent-blue-600"
              />
              <Icon size={18} className="text-gray-600" />
              <span className="font-medium text-gray-900">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Impact Estimation */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <p className="text-xs text-gray-600 uppercase font-semibold mb-2">
          Alcance Estimado
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-green-600">{estimatedReach}</span>
          <span className="text-gray-600">activistas notificados</span>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-green-600"
            style={{
              width: `${Math.min((estimatedReach / event.activists) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Send Button */}
      <Button
        onClick={handleNotify}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
      >
        {notificationSent ? '✅ Notificaciones Enviadas' : 'Enviar Notificaciones'}
      </Button>

      {/* Success Message */}
      {notificationSent && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            ✅ Notificaciones enviadas exitosamente a activistas en {event.location.city}
          </p>
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-gray-600 mt-4 text-center">
        Los activistas recibirán información sobre este evento y oportunidades para actuar
      </p>
    </div>
  );
}
