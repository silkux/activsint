
import React, { useEffect, useState, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { fetchOsintData, OsintEvent } from '@/services/osintData';
import { scaleLinear } from 'd3-scale';

const GlobeViz: React.FC = () => {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const [data, setData] = useState<OsintEvent[]>([]);
    const [loading, setLoading] = useState(true);

    // Color scale for magnitude
    const colorScale = scaleLinear<string>()
        .domain([0, 5])
        .range(['#00ff00', '#ff0000'])
        .clamp(true);

    const [bootLogs, setBootLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setBootLogs(prev => [...prev, `> ${msg}`]);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            // BOOT SEQUENCE VISUALIZATION
            addLog("INITIALIZING SYSTEM...");
            await new Promise(r => setTimeout(r, 600));

            addLog("ESTABLISHING SECURE CONNECTION...");
            await new Promise(r => setTimeout(r, 600));

            addLog("CONNECTING TO NASA EONET SATELLITE FEED...");

            try {
                const events = await fetchOsintData();

                if (mounted) {
                    addLog(`DATA STREAM ESTABLISHED: ${events.length} EVENTS`);
                    await new Promise(r => setTimeout(r, 800));

                    addLog("OPTIMIZING GEOMETRY MESH...");
                    await new Promise(r => setTimeout(r, 800));

                    // OPTIMIZATION: Limit to top 50 recent events
                    const recentEvents = events.slice(0, 50);
                    setData(recentEvents);

                    addLog("RENDERING GEOSPATIAL INTERFACE...");
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

    // OPTIMIZATION: Memoized data processing prevents re-calculation on every frame
    const ringsData = React.useMemo(() => data, [data]);
    const pointsData = React.useMemo(() => data, [data]);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

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
                pointColor={() => '#00ffff'} // CYAN POINTS
                pointAltitude={(d: any) => d.magnitude ? d.magnitude * 0.05 : 0.1}
                pointRadius={0.4} // Slightly smaller points
                pointsMerge={true} // Performance critical

                ringsData={ringsData}
                ringLat="lat"
                ringLng="lng"
                ringColor={() => '#ff00ff'} // MAGENTA RINGS
                ringMaxRadius={1.5} // Smaller rings to avoid screen clutter
                ringPropagationSpeed={1.5}
                ringRepeatPeriod={800} // Slightly faster pulse but less overlap

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
                labelSize={1.2}
                labelDotRadius={0.3}
                labelColor={() => 'rgba(255, 0, 255, 0.75)'} // Magenta Labels
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
                <div className="mt-2 text-xs font-mono text-white/80">
                    EVENTS DETECTED: <span className="text-primary font-bold text-lg">{data.length}</span>
                    <span className="ml-2 text-secondary text-[10px]">[OPTIMIZED]</span>
                </div>

                {/* Data Inspector / Scrollable List */}
                <div className="mt-4 max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
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
