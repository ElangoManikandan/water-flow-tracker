import React, { useState, useEffect } from 'react';
import { Droplets, Power, Navigation, Activity } from 'lucide-react';
import './App.css';
// ஆரியூர் வால்வு
import ariyur_open from './assets/ganesh-nagar-valve-open.jpeg';
import ariyur_close from './assets/ganesh-nagar-valve-open.jpeg';
// // தடாகோவில் வால்வு
import thadakovil_open from './assets/ganesh-nagar-valve-open.jpeg';
import thadakovil_close from './assets/ganesh-nagar-valve-open.jpeg';
// கணேஷ் நகர் வால்வு
import ganesh_open from './assets/ganesh-nagar-valve-open.jpeg';
import ganesh_close from './assets/ganesh-nagar-valve-close.jpeg';
// கலுமெட்டுப்பட்டி வால்வு
import kalu_open from './assets/ganesh-nagar-valve-open.jpeg';
import kalu_close from './assets/ganesh-nagar-valve-open.jpeg';

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

  // வால்வு படங்களை மேப் செய்தல்
  const valveImages = {
    ariyurValve: { 1: ariyur_open, 2: ariyur_close },
    thadakovilValve: { 1: thadakovil_open, 2: thadakovil_close },
    ganeshValve: { 1: ganesh_open, 2: ganesh_close },
    kalumettupattiValve: { 1: kalu_open, 2: kalu_close }
  };

  const getActiveFlows = () => {
    const flows = [];
    const { navamaniMotor, thadakovilMotor, mallamalMotor, 
            ariyurValve, thadakovilValve, ganeshValve, kalumettupattiValve } = status;

    if (navamaniMotor) {
      flows.push(`நவமணி → ${ariyurValve === 1 ? "ஆரியூர் தொட்டி" : "நவமணி நகர் தொட்டி"}`);
    }
    if (thadakovilMotor) {
      flows.push(`தடாகோவில் → ${thadakovilValve === 1 ? "தடாகோவில் தொட்டி (சிறிய)" : "தடாகோவில் தொட்டி (பெரிய)"}`);
    }
    if (mallamalMotor) {
      if (ganeshValve === 2) {
        flows.push("மல்லம்மாள் → நவமணி நகர் தொட்டி");
      } else {
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
          <Droplets className="brand-icon" size={100} />
          <h2>புங்கம்பாடி ஊராட்சி - தண்ணீர் கண்காணிப்பு</h2>
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

        {/* வால்வுகள் - 8 படங்கள் முறை */}
        <section className="ui-card">
          <div className="card-header"><Navigation size={20} /> வால்வு நிலைகள்</div>
          <div className="valve-section-list">
            {[
              { id: 'ariyurValve', label: 'ஆரியூர் வழி மாற்றி' },
              { id: 'thadakovilValve', label: 'தடாகோவில் மாற்றி' },
              { id: 'ganeshValve', label: 'கணேஷ் நகர் ஜங்ஷன்' },
              { id: 'kalumettupattiValve', label: 'கலுமெட்டுப்பட்டி மாற்றி' }
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
                      {/* இங்கே 8 தனித்தனி படங்கள் நிலைக்கேற்ப மாறும் */}
                      <img 
                        src={valveImages[v.id][pos]} 
                        alt={`${v.label} நிலை ${pos}`} 
                      />
                      <span>{pos === 1 ? "திறந்து (Open)" : "மூடி (Close)"}</span>
                    </div>
                  ))}
                </div>
                <p className="tap-hint">மாற்ற அழுத்தவும்</p>
              </div>
            ))}
          </div>
        </section>

        {/* நீர் ஓட்டம் */}
        <div className="status-card">
          <div className="status-header">
            <Activity className={isFlowing ? 'pulse' : ''} />
            <strong>தற்போதைய நீர் ஓட்டம்</strong>
          </div>
          <div className={`status-display ${isFlowing ? 'active' : ''}`}>
            <div className="destination-list">
              {isFlowing ? (
                activeFlows.map((flow, index) => <div key={index} className="flow-item"><strong>{flow}</strong></div>)
              ) : (
                <strong>அனைத்து மோட்டார்கள் நிறுத்தம்</strong>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;