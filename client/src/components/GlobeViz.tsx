import React, { useEffect, useState, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { fetchOsintData, OsintEvent } from '@/services/osintData';
import { scaleLinear } from 'd3-scale';
import AskPanel from './AskPanel';

const GlobeViz: React.FC = () => {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const [data, setData] = useState<OsintEvent[]>([]);
    const [activists, setActivists] = useState<any[]>([]); // New Activist Layer
    const [loading, setLoading] = useState(true);

    // Color scale for magnitude
    const colorScale = scaleLinear<string>()
        .domain([0, 5])
        .range(['#00ff00', '#ff0000'])
        .clamp(true);

    const [bootLogs, setBootLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setBootLogs(prev => [...prev, `> ${msg}`]);

    // SIMULATION: Fake real-time users connecting
    useEffect(() => {
        const interval = setInterval(() => {
            const newActivist = {
                id: `user-${Date.now()}`,
                lat: (Math.random() - 0.5) * 160, // Bias towards central latitudes
                lng: (Math.random() - 0.5) * 360,
                type: 'activist',
                title: 'Active Agent',
                magnitude: 0.5
            };
            setActivists(prev => [...prev.slice(-20), newActivist]); // Keep last 20 users
        }, 2000); // New user every 2 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            // EXTENDED STORYTELLING BOOT SEQUENCE
            addLog("INITIALIZING NEURAL LINK...");
            await new Promise(r => setTimeout(r, 800));

            addLog("ESTABLISHING SECURE CONNECTION...");
            await new Promise(r => setTimeout(r, 600));

            addLog("SCANNING GLOBAL SATELLITE ARRAYS...");
            await new Promise(r => setTimeout(r, 700));

            addLog("FEED: NASA EONET ONLINE.");
            addLog("FEED: RSS REAL-TIME NEWS READY.");
            await new Promise(r => setTimeout(r, 600));

            addLog("SEARCHING FOR ANIMAL ACTIVISM INCIDENTS...");
            await new Promise(r => setTimeout(r, 900));

            try {
                const events = await fetchOsintData();

                if (mounted) {
                    addLog(`DATA ACQUIRED: ${events.length} CRITICAL EVENTS FOUND.`);
                    await new Promise(r => setTimeout(r, 800));

                    addLog("DETECTING LATENT AGENTS IN YOUR PROXIMITY...");
                    await new Promise(r => setTimeout(r, 1000));

                    addLog("ANALYZING FUTURE VECTORS...");
                    addLog("QUERY PREDICTION: [WHERE ARE YOU?] [NEWS HERE]");
                    await new Promise(r => setTimeout(r, 1200));

                    // Limit to high-impact events for performance
                    const recentEvents = events.slice(0, 500);
                    setData(recentEvents);

                    addLog("GENERATING GEOSPATIAL INTERFACE...");
                    await new Promise(r => setTimeout(r, 500));

                    setLoading(false);
                }
            } catch (e) {
                console.error("Critical failure loading globes", e);
                if (mounted) {
                    addLog("CONNECTION FAILED. ENGAGING MOCK PROTOCOLS.");
                    await new Promise(r => setTimeout(r, 1000));
                    setLoading(false);
                }
            }
        };

        loadData();

        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.3; // Slower rotation for stability
        }

        return () => { mounted = false; };
    }, []);

    // Merge Events and Activists for rendering
    const pointsData = React.useMemo(() => [...data, ...activists], [data, activists]);

    // Rings only for critical events (Magenta) and fresh activists (Green)
    const ringsData = React.useMemo(() => [...data, ...activists], [data, activists]);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

            {/* AskPanel (Intelligence Layer) */}
            <AskPanel events={data} />

            {/* Interactive Boot Sequence */}
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000">
                    <div className="w-96 p-6 border border-primary/30 bg-black/90 font-mono text-xs rounded-lg shadow-[0_0_30px_rgba(0,255,204,0.1)]">
                        <div className="text-primary mb-4 font-bold border-b border-white/10 pb-2">
                            System Boot v2.4.1
                        </div>
                        <div className="flex flex-col gap-1 h-32 overflow-hidden text-white/70">
                            {bootLogs.map((log, i) => (
                                <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                                    <span className="text-accent mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                    {log}
                                </div>
                            ))}
                            <div className="animate-pulse text-primary">_</div>
                        </div>
                    </div>
                </div>
            )}

            {/* CRT SCANLINE & GRID OVERLAY */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
            <div className="absolute inset-0 z-10 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

            {/* Actual Globe - Optimized Configuration */}
            <Globe
                ref={globeEl}
                // OPTIMIZATION: Use lower res texture if possible, but safe defaults for now.
                // Removed night-sky.png background for cleaner look / less VRAM usage if needed.
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="#050014" // Deep Indigo Void from CSS

                pointsData={pointsData}
                pointLat="lat"
                pointLng="lng"
                // COLOR LOGIC: Activists = Neon Green (#00ff00), Events = Cyan (#00ffff)
                pointColor={(d: any) => d.type === 'activist' ? '#00ff00' : '#00ffff'}
                pointAltitude={(d: any) => d.type === 'activist' ? 0.02 : (d.magnitude ? d.magnitude * 0.05 : 0.1)}
                pointRadius={(d: any) => d.type === 'activist' ? 0.2 : 0.4}
                pointsMerge={true} // Performance critical

                ringsData={ringsData}
                ringLat="lat"
                ringLng="lng"
                // RING LOGIC: Activists = Green Pulse, Events = Magenta Pulse
                ringColor={(d: any) => d.type === 'activist' ? '#00ff00' : '#ff00ff'}
                ringMaxRadius={(d: any) => d.type === 'activist' ? 0.8 : 1.5}
                ringPropagationSpeed={1.5}
                ringRepeatPeriod={800}

                onPointHover={(point: any) => {
                    // Handle tooltip or logic here if needed
                    if (globeEl.current) {
                        globeEl.current.controls().autoRotate = !point;
                    }
                }}

                labelsData={pointsData}
                labelLat="lat"
                labelLng="lng"
                labelText="title"
                labelSize={(d: any) => d.type === 'activist' ? 0.5 : 1.2}
                labelDotRadius={0.3}
                labelColor={(d: any) => d.type === 'activist' ? 'rgba(0, 255, 0, 0.75)' : 'rgba(255, 0, 255, 0.75)'}
                labelResolution={1} // Lower resolution for labels
            />

            {/* HUD / Glass Overlay */}
            <div className="absolute top-4 left-4 z-30 p-4 rounded-none border-l-4 border-primary bg-black/40 backdrop-blur-md w-80 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                <h1 className="text-primary font-bold text-xl tracking-widest uppercase mb-2 font-display drop-shadow-md">
                    OSINT <span className="text-secondary">GLOBE</span>
                </h1>

                {/* Navigation */}
                <a href="/explorer" className="block mb-4 text-xs text-secondary hover:text-white font-mono uppercase tracking-wider">
                    [ &gt;&gt; ACCESS LEGACY EXPLORER ]
                </a>

                <div className="text-xs text-white/50 font-mono mt-1 border-t border-white/10 pt-2 flex justify-between">
                    <span>LIVE FEED // NASA EONET</span>
                    <span className="animate-pulse text-accent">● REC</span>
                </div>
                <div className="mt-2 text-xs font-mono text-white/80 space-y-1">
                    <div className="flex justify-between">
                        <span>EVENTS DETECTED:</span>
                        <span className="text-primary font-bold">{data.length}</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                        <span>ACTIVE AGENTS:</span>
                        <span className="font-bold">{activists.length}</span>
                    </div>
                </div>

                {/* Data Inspector / Scrollable List */}
                <div className="mt-4 max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {/* Show Activists at top if recent */}
                    {activists.slice(-3).reverse().map(activist => (
                        <div key={activist.id} className="text-[10px] text-green-100/70 border-l-2 border-green-500 bg-green-500/5 p-2 transition-all">
                            <div className="font-bold text-green-400 truncate uppercase">{'>>'} NEW AGENT CONNECTED</div>
                            <div className="font-mono text-xs opacity-70">
                                LOC: {activist.lat.toFixed(2)}, {activist.lng.toFixed(2)}
                            </div>
                        </div>
                    ))}

                    {data.slice(0, 50).map(event => (
                        <div key={event.id} className="text-[10px] text-cyan-100/70 border-l-2 border-transparent hover:border-accent hover:bg-white/5 p-2 transition-all cursor-crosshair">
                            <div className="font-bold text-primary truncate uppercase">{event.title}</div>
                            <div className="flex justify-between mt-1 font-mono text-xs">
                                <span className="text-secondary">{event.category}</span>
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GlobeViz;
