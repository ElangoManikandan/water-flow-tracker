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
