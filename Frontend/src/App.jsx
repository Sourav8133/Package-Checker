import { useEffect, useRef, useState } from 'react'
import './App.css'

const ICONS = {
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h9l3 3v15H6z" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="20" x2="6" y2="12" />
      <line x1="12" y1="20" x2="12" y2="7" />
      <line x1="18" y1="20" x2="18" y2="4" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
    </svg>
  ),
}

const RECENT_SCANS = [
  {
    name: 'Parle-G Biscuits',
    datetime: '28 May 2025 • 10:30 AM',
    status: 'compliant',
    swatch: '#e8543c',
    emoji: '🍪',
  },
  {
    name: 'Head & Shoulders Shampoo',
    datetime: '28 May 2025 • 09:15 AM',
    status: 'non-compliant',
    swatch: '#eef2f6',
    emoji: '🧴',
  },
  {
    name: 'Freedom Sunflower Oil',
    datetime: '27 May 2025 • 04:45 PM',
    status: 'compliant',
    swatch: '#f4d13a',
    emoji: '🛢️',
  },
]

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'history', label: 'History', icon: 'history' },
  { key: 'reports', label: 'Reports', icon: 'reports' },
  { key: 'profile', label: 'Profile', icon: 'profile' },
]

function StatusBadge({ status }) {
  const isCompliant = status === 'compliant'
  return (
    <span className={`status-badge ${isCompliant ? 'is-compliant' : 'is-noncompliant'}`}>
      <span className="status-badge-icon">{isCompliant ? ICONS.check : ICONS.x}</span>
      {isCompliant ? 'Compliant' : 'Non-Compliant'}
    </span>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage)
      }
    }
  }, [selectedImage])

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      event.target.value = ''
      return
    }

    setSelectedImage(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          <span>📦</span>
          <h1>Package Checker</h1>
        </div>

        <button className="settings">⚙</button>
      </header>

      <main>

        <section className="info-card">

          <div className="info-text">

            <h2>
              Check packaged products for
              <br />
              <span>Legal Metrology</span> compliance
            </h2>

            <p>
              Scan or upload the product image to extract details
              and check compliance with Legal Metrology rules.
            </p>

            <div className="features">
              <div><span className="feature-icon">{ICONS.shield}</span>Fast & Accurate</div>
              <div><span className="feature-icon">{ICONS.lock}</span>Secure & Private</div>
            </div>

          </div>

        </section>

        <section className="scan-card">

          <div className="scan-icon">{ICONS.camera}</div>

          <h3>Scan Product</h3>
          <p>Take a photo or upload an image of the product package</p>

          <div className="scan-actions">
            <button className="btn btn-primary">
              {ICONS.camera}
              Open Camera
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => fileInputRef.current.click()}
              >
              {ICONS.upload}
              Upload Image
              </button>

          </div>

          {selectedImage && (
  <>
    <div className="image-preview">
      <button
        className="remove-image"
        onClick={handleRemoveImage}
      >
        ✕
      </button>

      <img src={selectedImage} alt="Selected product" />
    </div>

    <button className="check-button">
      Check Compliance
    </button>
  </>
)}

         <input
  type="file"
  accept="image/*"
  hidden
  ref={fileInputRef}
  onChange={handleFileChange}
/>

          <span className="scan-hint">JPG, PNG or JPEG (Max. 10MB)</span>

        </section>

        <section className="recent-scans">

          <div className="recent-scans-header">
            <h3>Recent Scans</h3>
            <button className="view-all">
              View All
              <span className="chevron">{ICONS.chevron}</span>
            </button>
          </div>

          <ul className="scan-list">
            {RECENT_SCANS.map((scan) => (
              <li className="scan-item" key={scan.name}>
                <div className="scan-thumb" style={{ background: scan.swatch }}>
                  {scan.emoji}
                </div>

                <div className="scan-details">
                  <p className="scan-name">{scan.name}</p>
                  <p className="scan-datetime">{scan.datetime}</p>
                </div>

                <StatusBadge status={scan.status} />

                <span className="chevron scan-item-chevron">{ICONS.chevron}</span>
              </li>
            ))}
          </ul>

        </section>

      </main>

      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activeTab === item.key ? 'is-active' : ''}`}
            onClick={() => setActiveTab(item.key)}
          >
            <span className="nav-icon">{ICONS[item.icon]}</span>
            {item.label}
          </button>
        ))}
      </nav>

    </div>
  )
}

export default App
