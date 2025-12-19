import React, { useState } from 'react';
import { Search, Loader2, Send, Database, AlertTriangle } from 'lucide-react';
import { queryWeaviate, SearchResult } from '@/services/weaviateService';
import { OsintEvent } from '@/services/osintData';
import { motion, AnimatePresence } from 'framer-motion';

interface AskPanelProps {
    events: OsintEvent[];
}

const AskPanel: React.FC<AskPanelProps> = ({ events }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await queryWeaviate(query, events);
            setResult(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
            {/* Toggle Button */}
            <div className="pointer-events-auto">
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="bg-black/60 backdrop-blur-md border border-primary/50 text-primary px-4 py-3 rounded-full flex items-center gap-2 hover:bg-primary/20 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                    >
                        <Database className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">INTEL INQUIRY</span>
                    </motion.button>
                )}
            </div>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="pointer-events-auto w-80 md:w-96 bg-black/80 backdrop-blur-xl border border-primary/30 rounded-none overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-3 border-b border-primary/20 flex justify-between items-center bg-[linear-gradient(90deg,rgba(255,0,255,0.1),transparent)]">
                            <div className="flex items-center gap-2">
                                <span className="text-primary animate-pulse"><Database className="w-4 h-4" /></span>
                                <h3 className="text-primary font-bold text-[10px] tracking-widest uppercase font-display">Neural Interface // Weaviate v4</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white text-xs font-mono">[ TERMINATE ]</button>
                        </div>

                        {/* Results Area */}
                        <div className="p-4 min-h-[200px] max-h-[350px] overflow-y-auto bg-black/40 font-mono text-xs space-y-4 custom-scrollbar">
                            {!result && !loading && (
                                <div className="text-white/40 text-center mt-12 space-y-2">
                                    <p className="animate-pulse">AWAITING NEURAL SEED...</p>
                                    <p className="text-[9px] opacity-50 uppercase mt-4 italic">Try: "Identify circus clusters" or "Recent captivity casualties"</p>
                                </div>
                            )}

                            {loading && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-secondary text-[10px] animate-pulse">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        <span>RETRIEVING VECTOR EMBEDDINGS...</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-none overflow-hidden">
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                            className="h-full bg-secondary w-1/3 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                                        />
                                    </div>
                                </div>
                            )}

                            {result && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="text-green-400 border-l-2 border-green-500 pl-3 py-1 bg-green-500/5 leading-relaxed">
                                        <span className="text-green-500 font-bold mr-2">SYS:</span>
                                        {result.answer}
                                    </div>

                                    {result.sources.length > 0 && (
                                        <div className="space-y-2 pt-2">
                                            <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] border-b border-white/10 pb-1">Verified Evidence</div>
                                            {result.sources.map(src => (
                                                <motion.div
                                                    key={src.id}
                                                    whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                                    className="bg-white/5 p-2 border-l border-primary/20 hover:border-primary/60 transition-all cursor-crosshair group"
                                                >
                                                    <div className="text-primary text-[10px] font-bold truncate tracking-tight group-hover:text-white transition-colors">{src.title}</div>
                                                    <div className="flex justify-between text-[8px] text-white/40 mt-1 uppercase">
                                                        <span>{src.category}</span>
                                                        <span className="text-secondary opacity-60">REL: {(result.confidence * 100).toFixed(0)}%</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSearch} className="p-3 border-t border-white/10 flex gap-2 bg-black/80">
                            <div className="flex-1 relative">
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-primary opacity-50"><Search className="w-3 h-3" /></div>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="TRANSMIT QUERY..."
                                    className="w-full bg-white/5 border border-white/10 text-white text-[10px] font-mono pl-7 pr-2 py-2 outline-none focus:border-secondary/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !query.trim()}
                                className="bg-primary/20 text-primary px-3 py-2 border border-primary/30 hover:bg-primary hover:text-black disabled:opacity-30 transition-all cursor-pointer"
                            >
                                <Send className="w-3 h-3" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AskPanel;
