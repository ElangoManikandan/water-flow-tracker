// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import WaterService from './services/WaterService';
// // // // // // import { Droplets, Power, Navigation, Activity } from 'lucide-react';
// // // // // // import './App.css';

// // // // // // function App() {
// // // // // //   const [status, setStatus] = useState(null);
// // // // // //   const [error, setError] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchData = () => {
// // // // // //       WaterService.getStatus()
// // // // // //         .then(response => {
// // // // // //           setStatus(response.data);
// // // // // //           setError(null);
// // // // // //         })
// // // // // //         .catch(err => {
// // // // // //           console.error("Backend connection failed");
// // // // // //           setError("Connecting to Station...");
// // // // // //         });
// // // // // //     };

// // // // // //     fetchData(); 
// // // // // //     const interval = setInterval(fetchData, 2000);
// // // // // //     return () => clearInterval(interval);
// // // // // //   }, []);

// // // // // //   // NEW LOGIC: Returns an array of strings for all active flows
// // // // // //   const getActiveFlows = () => {
// // // // // //     if (!status) return [];
// // // // // //     const flows = [];
// // // // // //     const { 
// // // // // //       navamaniMotor, thadakovilMotor, mallamalMotor, 
// // // // // //       ariyurValve, thadakovilValve, ganeshValve 
// // // // // //     } = status;

// // // // // //     if (navamaniMotor) {
// // // // // //       flows.push(`Navamani → ${ariyurValve === 1 ? "Ariyur Tank" : "Navamani Nagar Tank"}`);
// // // // // //     }
// // // // // //     if (thadakovilMotor) {
// // // // // //       flows.push(`Thadakovil → ${thadakovilValve === 1 ? "Thadakovil Tank 1" : "Thadakovil Tank 2"}`);
// // // // // //     }
// // // // // //     if (mallamalMotor) {
// // // // // //       flows.push(`Mallamal → ${ganeshValve === 1 ? "Ganesh Nagar Area" : "Navamani Nagar Tank"}`);
// // // // // //     }

// // // // // //     return flows;
// // // // // //   };

// // // // // //   const activeFlows = getActiveFlows();
// // // // // //   const isFlowing = activeFlows.length > 0;

// // // // // //   if (error) return <div className="loading-state">{error}</div>;
// // // // // //   if (!status) return <div className="loading-state">Initialising System...</div>;

// // // // // //   return (
// // // // // //     <div className="dashboard-wrapper">
// // // // // //       <header className="main-header">
// // // // // //         <div className="brand">
// // // // // //           <Droplets className="brand-icon" size={32} />
// // // // // //           <h1>Pungambadi Water Tracker</h1>
// // // // // //         </div>
        
// // // // // //         {/* UPDATED STATUS DISPLAY: Supports multiple destinations */}
// // // // // //         <div className={`status-display ${isFlowing ? 'active' : ''}`}>
// // // // // //           <Activity className={isFlowing ? 'pulse' : ''} />
// // // // // //           <div className="destination-list">
// // // // // //             {isFlowing ? (
// // // // // //               activeFlows.map((flow, index) => (
// // // // // //                 <div key={index} className="flow-item"><strong>{flow}</strong></div>
// // // // // //               ))
// // // // // //             ) : (
// // // // // //               <strong>All Motors Stopped</strong>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <main className="controls-container">
// // // // // //         {/* MOTOR CONTROL CARD */}
// // // // // //         <section className="ui-card">
// // // // // //           <div className="card-header">
// // // // // //             <Power size={20} /> Station Motors</div>
// // // // // //           <div className="item-list">
// // // // // //             {[
// // // // // //               { id: 'navamani', label: 'Navamani Nagar' },
// // // // // //               { id: 'thadakovil', label: 'Thada Kovil' },
// // // // // //               { id: 'mallamal', label: 'Mallamal Kovil' }
// // // // // //             ].map(m => (
// // // // // //               <div key={m.id} className="control-row">
// // // // // //                 <span className="row-label">{m.label}</span>
// // // // // //                 <button 
// // // // // //                   className={`toggle-btn ${status[`${m.id}Motor`] ? 'on' : 'off'}`}
// // // // // //                   onClick={() => WaterService.toggleMotor(m.id, !status[`${m.id}Motor`])}
// // // // // //                 >
// // // // // //                   {status[`${m.id}Motor`] ? "RUNNING" : "START"}
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* VALVE CONTROL CARD */}
// // // // // //         <section className="ui-card">
// // // // // //           <div className="card-header"><Navigation size={20} /> Line Diversion</div>
// // // // // //           <div className="item-list">
// // // // // //             {[
// // // // // //               { id: 'ariyur', label: 'Ariyur Line' },
// // // // // //               { id: 'thadakovil', label: 'Thada Kovil Line' },
// // // // // //               { id: 'ganesh', label: 'Ganesh Nagar Line' }
// // // // // //             ].map(v => (
// // // // // //               <div key={v.id} className="control-row">
// // // // // //                 <span className="row-label">{v.label}</span>
// // // // // //                 <div className="valve-switcher">
// // // // // //                   <button 
// // // // // //                     className={status[`${v.id}Valve`] === 1 ? 'active' : ''} 
// // // // // //                     onClick={() => WaterService.updateValve(v.id, 1)}
// // // // // //                   >Pos 1</button>
// // // // // //                   <button 
// // // // // //                     className={status[`${v.id}Valve`] === 2 ? 'active' : ''} 
// // // // // //                     onClick={() => WaterService.updateValve(v.id, 2)}
// // // // // //                   >Pos 2</button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default App;


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Droplets, Power, Navigation, Activity, ArrowRight, ArrowDown } from 'lucide-react';
// // // // // import './App.css';

// // // // // function App() {
// // // // //   const initialState = {
// // // // //     navamaniMotor: false,
// // // // //     thadakovilMotor: false,
// // // // //     mallamalMotor: false,
// // // // //     ariyurValve: 1,
// // // // //     thadakovilValve: 1,
// // // // //     ganeshValve: 1
// // // // //   };

// // // // //   const [status, setStatus] = useState(() => {
// // // // //     const saved = localStorage.getItem('waterSystemData');
// // // // //     return saved ? JSON.parse(saved) : initialState;
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     localStorage.setItem('waterSystemData', JSON.stringify(status));
// // // // //   }, [status]);

// // // // //   const toggleMotor = (name) => {
// // // // //     setStatus(prev => ({ ...prev, [name]: !prev[name] }));
// // // // //   };

// // // // //   const updateValve = (name, position) => {
// // // // //     setStatus(prev => ({ ...prev, [name]: position }));
// // // // //   };

// // // // //   const getActiveFlows = () => {
// // // // //     const flows = [];
// // // // //     if (status.navamaniMotor) {
// // // // //       flows.push(`நவமணி மோட்டார் → ${status.ariyurValve === 1 ? "ஆரியூர் தொட்டி" : "நவமணி நகர் தொட்டி"}`);
// // // // //     }
// // // // //     if (status.thadakovilMotor) {
// // // // //       flows.push(`தடாகோவில் மோட்டார் → ${status.thadakovilValve === 1 ? "தடாகோவில் தொட்டி (சிறிய)" : "தடாகோவில் தொட்டி (பெரிய)"}`);
// // // // //     }
// // // // //     if (status.mallamalMotor) {
// // // // //       flows.push(`மல்லம்மாள் மோட்டார் → ${status.ganeshValve === 1 ? "கணேஷ் நகர் பகுதி" : "நவமணி நகர் தொட்டி"}`);
// // // // //     }
// // // // //     return flows;
// // // // //   };

// // // // //   const activeFlows = getActiveFlows();
// // // // //   const isFlowing = activeFlows.length > 0;

// // // // //   // Custom Valve Icon Component to show direction
// // // // //   const ValveIcon = ({ position }) => (
// // // // //     <div className={`valve-visual ${position === 1 ? 'pos-1' : 'pos-2'}`}>
// // // // //       <Navigation className="base-valve" />
// // // // //       {position === 1 ? <ArrowRight className="direction-arrow" /> : <ArrowDown className="direction-arrow" />}
// // // // //     </div>
// // // // //   );

// // // // //   return (
// // // // //     <div className="dashboard-wrapper">
// // // // //       <header className="main-header">
// // // // //         <div className="brand">
// // // // //           <Droplets className="brand-icon" size={32} />
// // // // //           <h1>புங்கம்பாடி தண்ணீர் கண்காணிப்பு</h1>
// // // // //         </div>
        
// // // // //         <div className={`status-display ${isFlowing ? 'active' : ''}`}>
// // // // //           <Activity className={isFlowing ? 'pulse' : ''} />
// // // // //           <div className="destination-list">
// // // // //             {isFlowing ? (
// // // // //               activeFlows.map((flow, index) => (
// // // // //                 <div key={index} className="flow-item"><strong>{flow}</strong></div>
// // // // //               ))
// // // // //             ) : (
// // // // //               <strong>தற்போது மோட்டார்கள் நிறுத்தி வைக்கப்பட்டுள்ளது</strong>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="controls-container">
// // // // //         {/* மோட்டார் கட்டுப்பாடுகள் */}
// // // // //         <section className="ui-card">
// // // // //           <div className="card-header"><Power size={20} /> மோட்டார் ஸ்டேஷன்கள்</div>
// // // // //           <div className="item-list">
// // // // //             {[
// // // // //               { id: 'navamaniMotor', label: 'நவமணி நகர்' },
// // // // //               { id: 'thadakovilMotor', label: 'தடாகோவில்' },
// // // // //               { id: 'mallamalMotor', label: 'மல்லம்மாள் கோவில்' }
// // // // //             ].map(m => (
// // // // //               <div key={m.id} className="control-row">
// // // // //                 <span className="row-label">{m.label}</span>
// // // // //                 <button 
// // // // //                   className={`toggle-btn ${status[m.id] ? 'on' : 'off'}`}
// // // // //                   onClick={() => toggleMotor(m.id)}
// // // // //                 >
// // // // //                   {status[m.id] ? "இயங்குகிறது" : "துவக்குக"}
// // // // //                 </button>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* வால்வு கட்டுப்பாடுகள் */}
// // // // //         <section className="ui-card">
// // // // //           <div className="card-header"><Navigation size={20} /> வால்வு நிலைகள்</div>
// // // // //           <div className="item-list">
// // // // //             {[
// // // // //               { id: 'ariyurValve', label: 'ஆரியூர் வழி' },
// // // // //               { id: 'thadakovilValve', label: 'தடாகோவில் வழி' },
// // // // //               { id: 'ganeshValve', label: 'கணேஷ் நகர் வழி' }
// // // // //             ].map(v => (
// // // // //               <div key={v.id} className="control-row">
// // // // //                 <span className="row-label">{v.label}</span>
// // // // //                 <div className="valve-interface" onClick={() => updateValve(v.id, status[v.id] === 1 ? 2 : 1)}>
// // // // //                    <ValveIcon position={status[v.id]} />
// // // // //                    <span className="pos-label">நிலை {status[v.id]}</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section>
// // // // //       </main>
      
// // // // //       <footer className="footer-reset">
// // // // //         <button onClick={() => { localStorage.clear(); window.location.reload(); }}>
// // // // //           விவரங்களை அழிக்க
// // // // //         </button>
// // // // //       </footer>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { Droplets, Power, Navigation, Activity } from 'lucide-react';
// // // // import './App.css';

// // // // function App() {
// // // //   const initialState = {
// // // //     navamaniMotor: false,
// // // //     thadakovilMotor: false,
// // // //     mallamalMotor: false,
// // // //     ariyurValve: 1,
// // // //     thadakovilValve: 1,
// // // //     ganeshValve: 1
// // // //   };

// // // //   const [status, setStatus] = useState(() => {
// // // //     const saved = localStorage.getItem('waterSystemData');
// // // //     return saved ? JSON.parse(saved) : initialState;
// // // //   });

// // // //   useEffect(() => {
// // // //     localStorage.setItem('waterSystemData', JSON.stringify(status));
// // // //   }, [status]);

// // // //   const toggleMotor = (name) => {
// // // //     setStatus(prev => ({ ...prev, [name]: !prev[name] }));
// // // //   };

// // // //   const updateValve = (name, position) => {
// // // //     setStatus(prev => ({ ...prev, [name]: position }));
// // // //   };

// // // //   const getActiveFlows = () => {
// // // //     const flows = [];
// // // //     if (status.navamaniMotor) {
// // // //       flows.push(`நவமணி → ${status.ariyurValve === 1 ? "அரியூர்" : "நவமணி நகர்"}`);
// // // //     }
// // // //     if (status.thadakovilMotor) {
// // // //       flows.push(`தடாகோவில் → ${status.thadakovilValve === 1 ? "தொட்டி 1" : "தொட்டி 2"}`);
// // // //     }
// // // //     if (status.mallamalMotor) {
// // // //       flows.push(`மல்லம்மாள் → ${status.ganeshValve === 1 ? "கணேஷ் நகர்" : "நவமணி நகர்"}`);
// // // //     }
// // // //     return flows;
// // // //   };

// // // //   const activeFlows = getActiveFlows();
// // // //   const isFlowing = activeFlows.length > 0;

// // // //   // Visual Valve Component using Images
// // // //   const ValveVisual = ({ valveId, position }) => {
// // // //     // Temporary Picsum URLs: Using different IDs or filters to distinguish positions
// // // //     const imgUrl = position === 1 
// // // //       ? `https://picsum.photos/id/10/200/200` // Represents Position 1
// // // //       : `https://picsum.photos/id/20/200/200`; // Represents Position 2

// // // //     return (
// // // //       <div className="valve-image-container">
// // // //         <img src={imgUrl} alt={`Valve Position ${position}`} className="valve-photo" />
// // // //         <div className="position-overlay">நிலை {position}</div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="dashboard-wrapper">
// // // //       <header className="main-header">
// // // //         <div className="brand">
// // // //           <Droplets className="brand-icon" size={32} />
// // // //           <h1>புங்கம்பாடி தண்ணீர் கண்காணிப்பு</h1>
// // // //         </div>
        
// // // //         <div className={`status-display ${isFlowing ? 'active' : ''}`}>
// // // //           <Activity className={isFlowing ? 'pulse' : ''} />
// // // //           <div className="destination-list">
// // // //             {isFlowing ? (
// // // //               activeFlows.map((flow, index) => <div key={index} className="flow-item"><strong>{flow}</strong></div>)
// // // //             ) : (
// // // //               <strong>அனைத்து மோட்டார்கள் நிறுத்தம்</strong>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <main className="controls-container">
// // // //         {/* Motor Section */}
// // // //         <section className="ui-card">
// // // //           <div className="card-header"><Power size={20} /> மோட்டார்கள்</div>
// // // //           <div className="item-list">
// // // //             {[
// // // //               { id: 'navamaniMotor', label: 'நவமணி நகர்' },
// // // //               { id: 'thadakovilMotor', label: 'தடாகோவில்' },
// // // //               { id: 'mallamalMotor', label: 'மல்லம்மாள் கோவில்' }
// // // //             ].map(m => (
// // // //               <div key={m.id} className="control-row">
// // // //                 <span className="row-label">{m.label}</span>
// // // //                 <button 
// // // //                   className={`toggle-btn ${status[m.id] ? 'on' : 'off'}`}
// // // //                   onClick={() => toggleMotor(m.id)}
// // // //                 >
// // // //                   {status[m.id] ? "இயங்குகிறது" : "START"}
// // // //                 </button>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         {/* Valve Section with Real Image Toggle */}
// // // //         <section className="ui-card">
// // // //           <div className="card-header"><Navigation size={20} /> வால்வு நிலைகள்</div>
// // // //           <div className="valve-grid">
// // // //             {[
// // // //               { id: 'ariyurValve', label: 'அரியூர் வழி' },
// // // //               { id: 'thadakovilValve', label: 'தடாகோவில் வழி' },
// // // //               { id: 'ganeshValve', label: 'கணேஷ் நகர் வழி' }
// // // //             ].map(v => (
// // // //               <div key={v.id} className="valve-photo-card" onClick={() => updateValve(v.id, status[v.id] === 1 ? 2 : 1)}>
// // // //                  <span className="valve-label">{v.label}</span>
// // // //                  <ValveVisual valveId={v.id} position={status[v.id]} />
// // // //                  <p className="tap-hint">மாற்ற தட்டவும்</p>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;
// // // import React, { useState, useEffect } from 'react';
// // // import { Droplets, Power, Navigation, Activity } from 'lucide-react';
// // // import './App.css';

// // // function App() {
// // //   const initialState = {
// // //     navamaniMotor: false,
// // //     thadakovilMotor: false,
// // //     mallamalMotor: false,
// // //     ariyurValve: 1,
// // //     thadakovilValve: 1,
// // //     ganeshValve: 1
// // //   };

// // //   const [status, setStatus] = useState(() => {
// // //     const saved = localStorage.getItem('waterSystemData');
// // //     return saved ? JSON.parse(saved) : initialState;
// // //   });

// // //   useEffect(() => {
// // //     localStorage.setItem('waterSystemData', JSON.stringify(status));
// // //   }, [status]);

// // //   const toggleMotor = (name) => {
// // //     setStatus(prev => ({ ...prev, [name]: !prev[name] }));
// // //   };

// // //   const updateValve = (name, position) => {
// // //     setStatus(prev => ({ ...prev, [name]: position }));
// // //   };

// // //   const getActiveFlows = () => {
// // //     const flows = [];
// // //     if (status.navamaniMotor) {
// // //       flows.push(`நவமணி → ${status.ariyurValve === 1 ? "அரியூர்" : "நவமணி நகர்"}`);
// // //     }
// // //     if (status.thadakovilMotor) {
// // //       flows.push(`தடாகோவில் → ${status.thadakovilValve === 1 ? "தடாகோவில் தொட்டி (சிறிய)" : "தடாகோவில் தொட்டி (பெரிய)"}`);
// // //     }
// // //     if (status.mallamalMotor) {
// // //       flows.push(`மல்லம்மாள் → ${status.ganeshValve === 1 ? "கணேஷ் நகர்" : "நவமணி நகர்"}`);
// // //     }
// // //     return flows;
// // //   };

// // //   const activeFlows = getActiveFlows();
// // //   const isFlowing = activeFlows.length > 0;

// // //   return (
// // //     <div className="dashboard-wrapper">
// // //       <header className="main-header">
// // //         <div className="brand">
// // //           <Droplets className="brand-icon" size={32} />
// // //           <h1>புங்கம்பாடி தண்ணீர் கண்காணிப்பு</h1>
// // //         </div>
        
// // //         <div className={`status-display ${isFlowing ? 'active' : ''}`}>
// // //           <Activity className={isFlowing ? 'pulse' : ''} />
// // //           <div className="destination-list">
// // //             {isFlowing ? (
// // //               activeFlows.map((flow, index) => <div key={index} className="flow-item"><strong>{flow}</strong></div>)
// // //             ) : (
// // //               <strong>அனைத்து மோட்டார்கள் நிறுத்தம்</strong>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <main className="controls-container">
// // //         {/* மோட்டார்கள் பிரிவு */}
// // //         <section className="ui-card">
// // //           <div className="card-header"><Power size={20} /> மோட்டார்கள்</div>
// // //           <div className="item-list">
// // //             {[
// // //               { id: 'navamaniMotor', label: 'நவமணி நகர்' },
// // //               { id: 'thadakovilMotor', label: 'தடாகோவில்' },
// // //               { id: 'mallamalMotor', label: 'மல்லம்மாள் கோவில்' }
// // //             ].map(m => (
// // //               <div key={m.id} className="control-row">
// // //                 <span className="row-label">{m.label}</span>
// // //                 <button 
// // //                   className={`toggle-btn ${status[m.id] ? 'on' : 'off'}`}
// // //                   onClick={() => toggleMotor(m.id)}
// // //                 >
// // //                   {status[m.id] ? "இயங்குகிறது" : "துவக்க அழுத்தவும்"}
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* வால்வு பிரிவு - இரண்டு படங்கள் முறையில் */}
// // //         <section className="ui-card">
// // //           <div className="card-header"><Navigation size={20} /> வால்வு நிலைகள்</div>
// // //           <div className="valve-section-list">
// // //             {[
// // //               { id: 'ariyurValve', label: 'அரியூர் வழி' },
// // //               { id: 'thadakovilValve', label: 'தடாகோவில் வழி' },
// // //               { id: 'ganeshValve', label: 'கணேஷ் நகர் வழி' }
// // //             ].map(v => (
// // //               <div key={v.id} className="valve-control-block">
// // //                 <span className="valve-main-label">{v.label}</span>
// // //                 <div className="valve-images-pair">
// // //                   {/* Position 1 Image */}
// // //                   <div 
// // //                     className={`valve-option ${status[v.id] === 1 ? 'selected' : ''}`}
// // //                     onClick={() => updateValve(v.id, 1)}
// // //                   >
// // //                     <img src={`https://picsum.photos/id/10/100/100`} alt="Pos 1" />
// // //                     <span>நிலை 1</span>
// // //                   </div>
                  
// // //                   {/* Position 2 Image */}
// // //                   <div 
// // //                     className={`valve-option ${status[v.id] === 2 ? 'selected' : ''}`}
// // //                     onClick={() => updateValve(v.id, 2)}
// // //                   >
// // //                     <img src={`https://picsum.photos/id/20/100/100`} alt="Pos 2" />
// // //                     <span>நிலை 2</span>
// // //                   </div>
// // //                 </div>
// // //                 <p className="tap-hint">நிலையை மாற்ற அழுத்தவும்</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import React, { useState, useEffect } from 'react';
// // import { Droplets, Power, Navigation, Activity } from 'lucide-react';
// // import './App.css';

// // function App() {
// //   // 1. புதிய வால்வு (kalumettupattiValve) சேர்க்கப்பட்ட ஆரம்ப நிலை
// //   const initialState = {
// //     navamaniMotor: false,
// //     thadakovilMotor: false,
// //     mallamalMotor: false,
// //     ariyurValve: 1,
// //     thadakovilValve: 1,
// //     ganeshValve: 1,
// //     kalumettupattiValve: 1 
// //   };

// //   const [status, setStatus] = useState(() => {
// //     const saved = localStorage.getItem('waterSystemData');
// //     return saved ? JSON.parse(saved) : initialState;
// //   });

// //   useEffect(() => {
// //     localStorage.setItem('waterSystemData', JSON.stringify(status));
// //   }, [status]);

// //   const toggleMotor = (name) => {
// //     setStatus(prev => ({ ...prev, [name]: !prev[name] }));
// //   };

// //   const updateValve = (name, position) => {
// //     setStatus(prev => ({ ...prev, [name]: position }));
// //   };

// //   // 2. புதிய எக்செல் ஷீட் படி மாற்றப்பட்ட லாஜிக்
// //   const getActiveFlows = () => {
// //     const flows = [];
// //     const { navamaniMotor, thadakovilMotor, mallamalMotor, 
// //             ariyurValve, thadakovilValve, ganeshValve, kalumettupattiValve } = status;

// //     if (navamaniMotor) {
// //       flows.push(`நவமணி → ${ariyurValve === 1 ? "அரியூர் தொட்டி" : "நவமணி நகர் தொட்டி"}`);
// //     }
// //     if (thadakovilMotor) {
// //       flows.push(`தடாகோவில் → ${thadakovilValve === 1 ? "தடாகோவில் தொட்டி 1" : "தடாகோவில் தொட்டி 2"}`);
// //     }
// //     if (mallamalMotor) {
// //       // மல்லம்மாள் மோட்டாருக்கு இரண்டு வால்வு நிலைகளும் காட்டப்படும்
// //       flows.push(`மல்லம்மாள் (கணேஷ் நகர் வழி) → ${ganeshValve === 1 ? "கணேஷ் நகர் பகுதி" : "நவமணி நகர் தொட்டி"}`);
// //       flows.push(`மல்லம்மாள் (கலுமெட்டுப்பட்டி வழி) → ${kalumettupattiValve === 1 ? "கலுமெட்டுப்பட்டி தொட்டி" : "கணேஷ் நகர் தொட்டி"}`);
// //     }
// //     return flows;
// //   };

// //   const activeFlows = getActiveFlows();
// //   const isFlowing = activeFlows.length > 0;

// //   return (
// //     <div className="dashboard-wrapper">
// //       <header className="main-header">
// //         <div className="brand">
// //           <Droplets className="brand-icon" size={32} />
// //           <h1>புங்கம்பாடி தண்ணீர் கண்காணிப்பு</h1>
// //         </div>
        
// //         <div className={`status-display ${isFlowing ? 'active' : ''}`}>
// //           <Activity className={isFlowing ? 'pulse' : ''} />
// //           <div className="destination-list">
// //             {isFlowing ? (
// //               activeFlows.map((flow, index) => <div key={index} className="flow-item"><strong>{flow}</strong></div>)
// //             ) : (
// //               <strong>அனைத்து மோட்டார்கள் நிறுத்தம்</strong>
// //             )}
// //           </div>
// //         </div>
// //       </header>

// //       <main className="controls-container">
// //         {/* மோட்டார்கள் */}
// //         <section className="ui-card">
// //           <div className="card-header"><Power size={20} /> மோட்டார்கள்</div>
// //           <div className="item-list">
// //             {[
// //               { id: 'navamaniMotor', label: 'நவமணி நகர் மோட்டார்' },
// //               { id: 'thadakovilMotor', label: 'தடாகோவில்' },
// //               { id: 'mallamalMotor', label: 'மல்லம்மாள் கோவில்' }
// //             ].map(m => (
// //               <div key={m.id} className="control-row">
// //                 <span className="row-label">{m.label}</span>
// //                 <button 
// //                   className={`toggle-btn ${status[m.id] ? 'on' : 'off'}`}
// //                   onClick={() => toggleMotor(m.id)}
// //                 >
// //                   {status[m.id] ? "இயங்குகிறது" : "துவக்க அழுத்தவும்"}
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         {/* வால்வுகள் - கலுமெட்டுப்பட்டி வால்வு சேர்க்கப்பட்டுள்ளது */}
// //         <section className="ui-card">
// //           <div className="card-header"><Navigation size={20} /> வால்வு நிலைகள்</div>
// //           <div className="valve-section-list">
// //             {[
// //               { id: 'ariyurValve', label: 'அரியூர் வழி மாற்றி' },
// //               { id: 'thadakovilValve', label: 'தடாகோவில் மாற்றி' },
// //               { id: 'ganeshValve', label: 'கணேஷ் நகர் மாற்றி' },
// //               { id: 'kalumettupattiValve', label: 'கலுமெட்டுப்பட்டி மாற்றி' }
// //             ].map(v => (
// //               <div key={v.id} className="valve-control-block">
// //                 <span className="valve-main-label">{v.label}</span>
// //                 <div className="valve-images-pair">
// //                   {[1, 2].map(pos => (
// //                     <div 
// //                       key={pos}
// //                       className={`valve-option ${status[v.id] === pos ? 'selected' : ''}`}
// //                       onClick={() => updateValve(v.id, pos)}
// //                     >
// //                       <img src={`https://picsum.photos/id/${pos === 1 ? '10' : '20'}/100/100`} alt={`Pos ${pos}`} />
// //                       <span>நிலை {pos}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <p className="tap-hint">நிலையை மாற்ற அழுத்தவும்</p>
// //               </div>
// //             ))}
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect } from 'react';
// import { Droplets, Power, Navigation, Activity } from 'lucide-react';
// import './App.css';

// function App() {
//   const initialState = {
//     navamaniMotor: false,
//     thadakovilMotor: false,
//     mallamalMotor: false,
//     ariyurValve: 1,
//     thadakovilValve: 1,
//     ganeshValve: 1,
//     kalumettupattiValve: 1 
//   };

//   const [status, setStatus] = useState(() => {
//     const saved = localStorage.getItem('waterSystemData');
//     return saved ? JSON.parse(saved) : initialState;
//   });

//   useEffect(() => {
//     localStorage.setItem('waterSystemData', JSON.stringify(status));
//   }, [status]);

//   const toggleMotor = (name) => {
//     setStatus(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const updateValve = (name, position) => {
//     setStatus(prev => ({ ...prev, [name]: position }));
//   };

//   // புதிய படிநிலை (Hierarchy) லாஜிக்
//   const getActiveFlows = () => {
//     const flows = [];
//     const { navamaniMotor, thadakovilMotor, mallamalMotor, 
//             ariyurValve, thadakovilValve, ganeshValve, kalumettupattiValve } = status;

//     if (navamaniMotor) {
//       flows.push(`நவமணி → ${ariyurValve === 1 ? "அரியூர் தொட்டி" : "நவமணி நகர் தொட்டி"}`);
//     }
//     if (thadakovilMotor) {
//       flows.push(`தடாகோவில் → ${thadakovilValve === 1 ? "தடாகோவில் தொட்டி (சிறிய)" : "தடாகோவில் தொட்டி (பெரிய)"}`);
//     }
//     if (mallamalMotor) {
//       if (kalumettupattiValve === 1) {
//         flows.push("மல்லம்மாள் → கலுமெட்டுப்பட்டி தொட்டி");
//       } else {
//         flows.push(`மல்லம்மாள் → ${ganeshValve === 1 ? "கணேஷ் நகர் பகுதி" : "நவமணி நகர் தொட்டி"}`);
//       }
//     }
//     return flows;
//   };

//   const activeFlows = getActiveFlows();
//   const isFlowing = activeFlows.length > 0;

//   return (
//     <div className="dashboard-wrapper">
//       <header className="main-header">
//         <div className="brand">
//           <Droplets className="brand-icon" size={32} />
//           <h1>புங்கம்பாடி தண்ணீர் கண்காணிப்பு</h1>
//         </div>
        
//         <div className={`status-display ${isFlowing ? 'active' : ''}`}>
//           <Activity className={isFlowing ? 'pulse' : ''} />
//           <div className="destination-list">
//             {isFlowing ? (
//               activeFlows.map((flow, index) => <div key={index} className="flow-item"><strong>{flow}</strong></div>)
//             ) : (
//               <strong>அனைத்து மோட்டார்கள் நிறுத்தம்</strong>
//             )}
//           </div>
//         </div>
//       </header>

//       <main className="controls-container">
//         {/* மோட்டார்கள் */}
//         <section className="ui-card">
//           <div className="card-header"><Power size={20} /> மோட்டார்கள்</div>
//           <div className="item-list">
//             {[
//               { id: 'navamaniMotor', label: 'நவமணி நகர்' },
//               { id: 'thadakovilMotor', label: 'தடாகோவில்' },
//               { id: 'mallamalMotor', label: 'மல்லம்மாள் கோவில்' }
//             ].map(m => (
//               <div key={m.id} className="control-row">
//                 <span className="row-label">{m.label}</span>
//                 <button 
//                   className={`toggle-btn ${status[m.id] ? 'on' : 'off'}`}
//                   onClick={() => toggleMotor(m.id)}
//                 >
//                   {status[m.id] ? "இயங்குகிறது" : "துவக்க அழுத்தவும்"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* வால்வுகள் */}
//         <section className="ui-card">
//           <div className="card-header"><Navigation size={20} /> வால்வு நிலைகள்</div>
//           <div className="valve-section-list">
//             {[
//               { id: 'ariyurValve', label: 'அரியூர் வழி மாற்றி' },
//               { id: 'thadakovilValve', label: 'தடாகோவில் மாற்றி' },
//               { id: 'kalumettupattiValve', label: 'கலுமெட்டுப்பட்டி மாற்றி (முதன்மை)' },
//               { id: 'ganeshValve', label: 'கணேஷ் நகர் மாற்றி' }
//             ].map(v => (
//               <div key={v.id} className="valve-control-block">
//                 <span className="valve-main-label">{v.label}</span>
//                 <div className="valve-images-pair">
//                   <div 
//                     className={`valve-option ${status[v.id] === 1 ? 'selected' : ''}`}
//                     onClick={() => updateValve(v.id, 1)}
//                   >
//                     <img src={`https://picsum.photos/id/10/100/100`} alt="Pos 1" />
//                     <span>நிலை 1</span>
//                   </div>
                  
//                   <div 
//                     className={`valve-option ${status[v.id] === 2 ? 'selected' : ''}`}
//                     onClick={() => updateValve(v.id, 2)}
//                   >
//                     <img src={`https://picsum.photos/id/20/100/100`} alt="Pos 2" />
//                     <span>நிலை 2</span>
//                   </div>
//                 </div>
//                 <p className="tap-hint">நிலையை மாற்ற அழுத்தவும்</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Droplets, Power, Navigation, Activity } from 'lucide-react';
import './App.css';

function App() {
  const initialState = {
    navamaniMotor: false,
    thadakovilMotor: false,
    mallamalMotor: false,
    ariyurValve: 1,
    thadakovilValve: 1,
    ganeshValve: 1,
    kalumettupattiValve: 1 
  };

  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem('waterSystemData');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('waterSystemData', JSON.stringify(status));
  }, [status]);

  const toggleMotor = (name) => {
    setStatus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const updateValve = (name, position) => {
    setStatus(prev => ({ ...prev, [name]: position }));
  };

  const getActiveFlows = () => {
    const flows = [];
    const { navamaniMotor, thadakovilMotor, mallamalMotor, 
            ariyurValve, thadakovilValve, ganeshValve, kalumettupattiValve } = status;

    if (navamaniMotor) {
      flows.push(`நவமணி → ${ariyurValve === 1 ? "அரியூர் தொட்டி" : "நவமணி நகர் தொட்டி"}`);
    }
    if (thadakovilMotor) {
      flows.push(`தடாகோவில் → ${thadakovilValve === 1 ? "தடாகோவில் தொட்டி 1" : "தடாகோவில் தொட்டி 2"}`);
    }
    if (mallamalMotor) {
      if (ganeshValve === 2) {
        // கணேஷ் நகர் ஜங்ஷன் நிலை 2-ல் இருந்தால்
        flows.push("மல்லம்மாள் → நவமணி நகர் தொட்டி");
      } else {
        // கணேஷ் நகர் ஜங்ஷன் நிலை 1-ல் இருக்கும் போது கலுமெட்டுப்பட்டி ஜங்ஷனைப் பொறுத்தது
        if (kalumettupattiValve === 1) {
          flows.push("மல்லம்மாள் → கலுமெட்டுப்பட்டி தொட்டி");
        } else {
          flows.push("மல்லம்மாள் → கணேஷ் நகர் தொட்டி");
        }
      }
    }
    return flows;
  };

  const activeFlows = getActiveFlows();
  const isFlowing = activeFlows.length > 0;

  return (
    <div className="dashboard-wrapper">
      <header className="main-header">
        <div className="brand">
          <Droplets className="brand-icon" size={32} />
          <h1>புங்கம்பாடி தண்ணீர் கண்காணிப்பு</h1>
        </div>
        
        <div className={`status-display ${isFlowing ? 'active' : ''}`}>
          <Activity className={isFlowing ? 'pulse' : ''} />
          <div className="destination-list">
            {isFlowing ? (
              activeFlows.map((flow, index) => <div key={index} className="flow-item"><strong>{flow}</strong></div>)
            ) : (
              <strong>அனைத்து மோட்டார்கள் நிறுத்தம்</strong>
            )}
          </div>
        </div>
      </header>

      <main className="controls-container">
        {/* மோட்டார்கள் */}
        <section className="ui-card">
          <div className="card-header"><Power size={20} /> மோட்டார்கள்</div>
          <div className="item-list">
            {[
              { id: 'navamaniMotor', label: 'நவமணி நகர்' },
              { id: 'thadakovilMotor', label: 'தடாகோவில்' },
              { id: 'mallamalMotor', label: 'மல்லம்மாள் கோவில்' }
            ].map(m => (
              <div key={m.id} className="control-row">
                <span className="row-label">{m.label}</span>
                <button 
                  className={`toggle-btn ${status[m.id] ? 'on' : 'off'}`}
                  onClick={() => toggleMotor(m.id)}
                >
                  {status[m.id] ? "இயங்குகிறது" : "துவக்க அழுத்தவும்"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* வால்வுகள் */}
        <section className="ui-card">
          <div className="card-header"><Navigation size={20} /> வால்வு நிலைகள்</div>
          <div className="valve-section-list">
            {[
              { id: 'ariyurValve', label: 'அரியூர் வழி மாற்றி' },
              { id: 'thadakovilValve', label: 'தடாகோவில் மாற்றி' },
              { id: 'ganeshValve', label: 'கணேஷ் நகர் ஜங்ஷன்' },
              { 
                id: 'kalumettupattiValve', 
                label: 'கலுமெட்டுப்பட்டி ஜங்ஷன்',
                isBinary: true // Open/Close Label-க்காக
              }
            ].map(v => (
              <div key={v.id} className={`valve-control-block ${v.id === 'kalumettupattiValve' && status.ganeshValve === 2 ? 'disabled-valve' : ''}`}>
                <span className="valve-main-label">{v.label}</span>
                <div className="valve-images-pair">
                  {[1, 2].map(pos => (
                    <div 
                      key={pos}
                      className={`valve-option ${status[v.id] === pos ? 'selected' : ''}`}
                      onClick={() => updateValve(v.id, pos)}
                    >
                      <img src={`https://picsum.photos/id/${pos === 1 ? '10' : '20'}/100/100`} alt={`Pos ${pos}`} />
                      <span>{v.isBinary ? (pos === 1 ? "திறந்து (Open)" : "மூடி (Close)") : `நிலை ${pos}`}</span>
                    </div>
                  ))}
                </div>
                <p className="tap-hint">மாற்ற அழுத்தவும்</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
