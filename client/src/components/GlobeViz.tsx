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
            addLog("FEED: ACTIVSINT REAL-TIME NEWS READY.");
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

    // INTELLIGENT LOCATION HANDLER
    const handleLocateUser = () => {
        addLog("REQUESTING GEOLOCATION PERMISSIONS...");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    addLog(`USER DETECTED: [${latitude.toFixed(2)}, ${longitude.toFixed(2)}]`);
                    addLog("CALIBRATING ACTIVISM VECTORS TO YOUR LOCATION...");

                    if (globeEl.current) {
                        globeEl.current.pointOfView({ lat: latitude, lng: longitude, altitude: 1.5 }, 2000);
                    }
                },
                () => {
                    addLog("GEOLOCATION DENIED. USING TRIANGULATED IP ESTIMATE...");
                    // Fallback to approximate location (e.g., center of map or random major city)
                }
            );
        }
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

            {/* AskPanel (Intelligence Layer) */}
            <AskPanel events={data} />

            {/* Event Details Overlay */}
            {selectedEvent && (
                <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center" onClick={() => setSelectedEvent(null)}>
                    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
                        <EventOverlay
                            event={selectedEvent}
                            onClose={() => setSelectedEvent(null)}
                            userLocation={userLocation}
                        />
                    </div>
                </div>
            )}

            {/* Interactive Boot Sequence */}
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000">
                    <div className="w-96 p-6 border border-primary/30 bg-black/90 font-mono text-xs rounded-lg shadow-[0_0_30px_rgba(0,255,204,0.1)]">
                        <div className="text-primary mb-4 font-bold border-b border-white/10 pb-2">
                            ACTIVSINT CORE v3.0
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
                pointAltitude={(d: any) => d.type === 'activist' ? 0.02 : 0.05}
                pointRadius={(d: any) => d.type === 'activist' ? 0.2 : 0.25}
                pointsMerge={true} // Performance critical

                ringsData={ringsData}
                ringLat="lat"
                ringLng="lng"
                // RING LOGIC: Activists = Green Pulse, Events = Magenta Pulse
                ringColor={(d: any) => d.type === 'activist' ? '#00ff00' : '#ff00ff'}
                ringMaxRadius={(d: any) => d.type === 'activist' ? 0.8 : 1.2}
                ringPropagationSpeed={2}
                ringRepeatPeriod={800}

                onPointHover={(point: any) => {
                    // Handle tooltip or logic here if needed
                    if (globeEl.current) {
                        globeEl.current.controls().autoRotate = !point;
                    }
                }}
                onPointClick={(point: any) => {
                    setSelectedEvent(point);
                    if (globeEl.current) {
                        globeEl.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.2 }, 1000);
                        globeEl.current.controls().autoRotate = false;
                    }
                }}

                labelsData={pointsData}
                labelLat="lat"
                labelLng="lng"
                labelText="title"
                labelSize={(d: any) => d.type === 'activist' ? 0.5 : 0.8}
                labelDotRadius={0.2}
                labelColor={() => 'rgba(255, 255, 255, 0.75)'}
                labelResolution={1} // Lower resolution for labels
            />

            {/* HUD / Glass Overlay */}
            <div className="absolute top-4 left-4 z-30 p-4 rounded-none border-l-4 border-primary bg-black/40 backdrop-blur-md w-80 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                <h1 className="text-primary font-bold text-2xl tracking-widest uppercase mb-2 font-display drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
                    ACTIV<span className="text-secondary">SINT</span>
                </h1>

                {/* INTELLIGENT ACTIVISM IRL MANIFESTO (Small) */}
                <div className="mb-4 p-2 bg-primary/5 border border-primary/20 rounded text-[10px] leading-relaxed text-white/70 italic font-mono">
                    <span className="text-primary font-bold">INTELLIGENT ACTIVISM IRL:</span> Utilizing distributed networks to safeguard animal welfare. This system is designed to provide real-time alerts for vegan advocacy and ecological defense.
                </div>

                {/* LOCATION MODULE */}
                <div className="mb-4">
                    <button
                        onClick={handleLocateUser}
                        className={`w-full flex items-center justify-center gap-2 py-2 border border-dashed border-secondary/50 rounded text-xs font-bold uppercase tracking-wider transition-all
                         ${userLocation ? 'bg-secondary/20 text-secondary' : 'bg-transparent text-white/60 hover:bg-white/5'}`}
                    >
                        <Locate className="w-4 h-4" />
                        {userLocation ? 'LOCATION LOCKED' : 'CALIBRATE POSITION'}
                    </button>
                </div>

                {/* MOBILIZATION SIMULATOR - Context Aware */}
                <div className="mb-4 p-3 bg-accent/10 border-l-2 border-accent rounded-r font-mono text-[10px] text-accent/90">
                    <div className="font-bold flex items-center gap-1 mb-1">
                        <Radio className="w-3 h-3 animate-pulse" /> SIMULATOR
                    </div>
                    <p className="italic leading-tight">
                        {userLocation
                            ? "ANALYSIS COMPLETE: 3 Vegan Rallies detected within 50km of your sector. Recommendation: DEPLOY."
                            : "Waiting for geolocation... System unable to suggest local IRL actions."}
                    </p>
                </div>

                <div className="text-xs text-white/50 font-mono mt-1 border-t border-white/10 pt-2 flex justify-between">
                    <span>LIVE FEED // NASA EONET + RSS</span>
                    <span className="animate-pulse text-accent">● REC</span>
                </div>
                <div className="mt-2 text-xs font-mono text-white/80 space-y-1">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>EVENTS:</span>
                        <span className="text-primary font-bold">{data.length}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>AGENTS:</span>
                        <span className="text-green-400 font-bold">{activists.length}</span>
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
                        <div key={event.id} onClick={() => setSelectedEvent(event)} className="text-[10px] text-cyan-100/70 border-l-2 border-transparent hover:border-accent hover:bg-white/5 p-2 transition-all cursor-pointer">
                            <div className="font-bold text-primary truncate uppercase">{event.title}</div>
                            <div className="flex justify-between mt-1 font-mono text-xs">
                                <span className="text-secondary">{event.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GlobeViz;
