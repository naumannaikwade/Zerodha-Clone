import React from 'react';
import './Apps.css';

function Apps() {
  // Mock apps data
  const apps = [
    {
      id: 1,
      name: 'Smallcase',
      logo: 'https://assets.smallcase.com/images/smallcase-logo.svg',
      desc: 'Invest in ready-made portfolios of stocks & ETFs.',
      link: 'https://www.smallcase.com/',
    },
    {
      id: 2,
      name: 'Sensibull',
      logo: 'https://sensibull.com/static/media/logo.2b7e6e7b.svg',
      desc: 'Options trading simplified for everyone.',
      link: 'https://sensibull.com/',
    },
    {
      id: 3,
      name: 'Streak',
      logo: 'https://www.streak.tech/images/logo.svg',
      desc: 'Algo trading platform for retail investors.',
      link: 'https://www.streak.tech/',
    },
    {
      id: 4,
      name: 'GoldenPi',
      logo: 'https://www.goldenpi.com/assets/images/logo.svg',
      desc: 'Invest in bonds and fixed income products.',
      link: 'https://www.goldenpi.com/',
    },
  ];

  // Fallback for logo error
  const handleImgError = (e, name) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
    e.target.parentNode.querySelector('.apps-fallback').style.display = 'flex';
  };

  return (
    <div className="apps-bg">
      <div className="apps-container">
        <div className="apps-card">
          <div className="apps-header">Apps & Integrations</div>
          <div className="apps-tagline">Connect with India's best investment & trading tools</div>
          <div className="apps-grid">
            {apps.map(app => (
              <div className="apps-tile" key={app.id}>
                <img src={app.logo} alt={app.name} className="apps-logo" onError={e => handleImgError(e, app.name)} />
                <div className="apps-fallback" style={{display:'none',justifyContent:'center',alignItems:'center',width:56,height:56,borderRadius:'50%',background:'#e0e0e0',fontWeight:700,fontSize:22,color:'#387ed1',marginBottom:18}}>
                  {app.name.split(' ').map(w=>w[0]).join('').toUpperCase()}
                </div>
                <div className="apps-title">{app.name}</div>
                <div className="apps-desc">{app.desc}</div>
                <a href={app.link} className="apps-btn" target="_blank" rel="noopener noreferrer">Open</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apps;