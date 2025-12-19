import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, MapPin, Calendar, ShieldAlert, Share2 } from 'lucide-react';
import { OsintEvent } from '@/services/osintData';

interface EventOverlayProps {
    event: OsintEvent | null;
    onClose: () => void;
    userLocation: { lat: number; lng: number } | null;
}

const EventOverlay: React.FC<EventOverlayProps> = ({ event, onClose, userLocation }) => {
    if (!event) return null;

    // Calculate distance if user location is available (mock calculation)
    const distance = userLocation ? Math.floor(Math.random() * 5000) : 'Unknown';
    const urgency = event.category.toLowerCase().includes('protest') || event.category.toLowerCase().includes('rescue') ? 'CRITICAL' : 'STANDARD';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-black/90 border border-primary/50 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.2)] rounded-sm overflow-hidden font-mono text-white"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-primary/20 bg-primary/10">
                    <div className="flex items-center gap-2 text-primary">
                        <ShieldAlert className="w-5 h-5 animate-pulse" />
                        <span className="font-bold tracking-widest uppercase text-sm">INTELLIGENCE BRIEFING</span>
                    </div>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1 uppercase leading-tight font-display text-shadow-glow">
                            {event.title}
                        </h2>
                        <div className="flex items-center gap-3 text-xs text-white/60">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1 text-secondary"><MapPin className="w-3 h-3" /> {event.source}</span>
                        </div>
                    </div>

                    <p className="text-sm text-white/80 leading-relaxed border-l-2 border-secondary pl-3 bg-secondary/5 py-2">
                        {event.description || "No specific intelligence data available for this sector. Proceed with standard monitoring protocols."}
                    </p>

                    {/* Tactical Info */}
                    <div className="grid grid-cols-2 gap-3 text-xs mt-4">
                        <div className="bg-white/5 p-2 rounded border border-white/10">
                            <div className="text-white/40 uppercase tracking-wider mb-1">Impact Radius</div>
                            <div className="font-bold text-secondary">LOCAL // {distance} KM</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded border border-white/10">
                            <div className="text-white/40 uppercase tracking-wider mb-1">Tactical Urgency</div>
                            <div className={`font-bold ${urgency === 'CRITICAL' ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                                {urgency}
                            </div>
                        </div>
                    </div>

                    {/* Intelligent Activism / Vegan Context */}
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-300">
                        <span className="font-bold block mb-1">🌱 ACTIVIST OPPORTUNITY:</span>
                        This event aligns with vegan advocacy directives. Mobilization is recommended.
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                        <button className="flex-1 bg-primary/20 hover:bg-primary hover:text-black text-primary border border-primary/50 py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all group">
                            <Bell className="w-4 h-4" />
                            <span>Subscribe</span>
                        </button>
                        <button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/20 py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                            <Share2 className="w-4 h-4" />
                            <span>Share Intel</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EventOverlay;
