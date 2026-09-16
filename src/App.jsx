import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, createContext } from 'react';

import Home from './pages/Home';
import Rules from './pages/Rules';
import Runners from './pages/Runners';

import Characters from './pages/Characters';
import Gear from './pages/Gear';
import ShadowSea from './pages/ShadowSea';
import Notes from './pages/Notes';

import { SocketProvider } from '@hooks/useSocket';
import { GameMessagesProvider } from '@context/GameMessagesContext';
import TransferReceiver from '@components/TransferReceiver';
import MessageSubheader from '@components/Connection/MessageSubheader';

const scrollPositions = {};

export const NavExtraContext = createContext({ setNavExtra: () => {} });

export default function App() {
  const location = useLocation();
  const contentRef = useRef(null);
  const [navExtra, setNavExtra] = useState(null);

  // Scroll restore only applies to pages that are actually scrollable
  // (.sr-page). Full-bleed pages (.sr-fullbleed) and Characters manage
  // their own scroll/tab state and are skipped here — no route list to
  // maintain, it's just "does a .sr-page exist in the shell right now."
  useEffect(() => {
    const currentPath = location.pathname;
    const isCharacters = currentPath.startsWith('/characters');
    const scrollEl = contentRef.current?.querySelector('.sr-page');
    if (!scrollEl || isCharacters) return;

    if (scrollPositions[currentPath] !== undefined) {
      requestAnimationFrame(() => {
        scrollEl.scrollTop = scrollPositions[currentPath];
      });
    }

    return () => {
      scrollPositions[currentPath] = scrollEl.scrollTop;
    };
  }, [location.pathname]);

  return (
    <SocketProvider>
      <GameMessagesProvider>
        <NavExtraContext.Provider value={{ setNavExtra }}>
          <div className="sr-app" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
          }}>
            <nav className="sr-nav">
              <SrNavLink to="/" label="Home" end />
              <SrNavLink to="/rules" label="Rules" />
              <SrNavLink to="/runners" label="Runners" />

              <div className="sr-nav-divider" />

              <SrNavLink to="/characters" label="Characters" live />
              <SrNavLink to="/gear" label="Market" live />
              <SrNavLink to="/shadowsea" label="ShadowSea" live />
              <SrNavLink to="/notes" label="Notes" live />

              {navExtra && <div className="sr-nav-extra">{navExtra}</div>}
            </nav>

            {/* Global message subheader — always visible */}
            <MessageSubheader />

            <div ref={contentRef} className="sr-content-shell">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/runners" element={<Runners />} />
                <Route path="/gear" element={<Gear />} />
                <Route path="/characters/:slug?" element={<Characters />} />
                <Route path="/shadowsea" element={<ShadowSea />} />
                <Route path="/notes" element={<Notes />} />
              </Routes>
            </div>
          </div>

          {/* Global — listens for incoming device transfers on any page */}
          <TransferReceiver />
        </NavExtraContext.Provider>
      </GameMessagesProvider>
    </SocketProvider>
  );
}

function SrNavLink({ to, label, end = false, live = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive ? 'sr-nav-link sr-nav-link--active' : 'sr-nav-link'
      }
    >
      {live && <span className="sr-nav-live-dot" />}
      {label}
    </NavLink>
  );
}
