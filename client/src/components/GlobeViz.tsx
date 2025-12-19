
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

            {/* Actual Globe - Optimized Configuration */}
            <Globe
                ref={globeEl}
                // OPTIMIZATION: Use lower res texture if possible, but safe defaults for now.
                // Removed night-sky.png background for cleaner look / less VRAM usage if needed.
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="#000000" // Pure black background is faster than image

                pointsData={pointsData}
                pointLat="lat"
                pointLng="lng"
                pointColor={() => '#ff3333'} // constant red for now, or use colorScale
                pointAltitude={(d: any) => d.magnitude ? d.magnitude * 0.05 : 0.1}
                pointRadius={0.4} // Slightly smaller points
                pointsMerge={true} // Performance critical

                ringsData={ringsData}
                ringLat="lat"
                ringLng="lng"
                ringColor={() => '#ff0000'}
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
                labelColor={() => 'rgba(255, 255, 255, 0.75)'}
                labelResolution={1} // Lower resolution for labels
            />

            {/* HUD / Glass Overlay */}
            <div className="absolute top-4 left-4 z-10 p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur-md w-80">
                <h1 className="text-white font-bold text-lg tracking-widest uppercase mb-2">
                    OSINT <span className="text-primary">GLOBE</span>
                </h1>

                {/* Navigation */}
                <a href="/explorer" className="block mb-4 text-xs text-primary hover:text-accent font-mono underline decoration-dotted">
                    [ ACCESS LEGACY EXPLORER ]
                </a>

                <div className="text-xs text-white/50 font-mono mt-1 border-t border-white/10 pt-2">
                    LIVE FEED // NASA EONET
                </div>
                <div className="mt-2 text-xs font-mono text-white/80">
                    EVENTS DETECTED: <span className="text-accent">{data.length}</span>
                    <span className="ml-2 text-green-500 text-[10px]">[OPTIMIZED]</span>
                </div>

                {/* Data Inspector / Scrollable List */}
                <div className="mt-4 max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {data.slice(0, 50).map(event => (
                        <div key={event.id} className="text-[10px] text-white/70 bg-white/5 p-2 rounded hover:bg-white/10 transition">
                            <div className="font-bold text-primary truncate">{event.title}</div>
                            <div className="flex justify-between mt-1">
                                <span>{event.category}</span>
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
