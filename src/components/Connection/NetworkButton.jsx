import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SignalWifi1BarIcon from '@mui/icons-material/SignalWifi1Bar';

import { useSocket } from '@hooks/useSocket';

const STATUS_COLOR = {
  connected:    'rgb(0, 170, 40)',
  connecting:   'rgb(250, 204, 21)',
  disconnected: 'rgba(148, 163, 184, 0.5)',
  error:        'rgb(239, 68, 68)',
};

const STATUS_ICON = {
  connected:    <WifiIcon style={{ fontSize: 14 }} />,
  connecting:   <SignalWifi1BarIcon style={{ fontSize: 14 }} />,
  disconnected: <WifiOffIcon style={{ fontSize: 14 }} />,
  error:        <WifiOffIcon style={{ fontSize: 14 }} />,
};

const STATUS_LABEL = {
  connected:    'Online',
  connecting:   'Connecting...',
  disconnected: 'Offline',
  error:        'Error',
};

export default function NetworkButton({ onClick, style = {} }) {
  const { status } = useSocket();
  const color = STATUS_COLOR[status];

  return (
    <button
      onClick={onClick}
      title="Network connection"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.35rem 0.5rem',
        backgroundColor: 'transparent',
        color,
        border: `1px solid ${color}`,
        borderRadius: '2px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {STATUS_ICON[status]}
      <span>{STATUS_LABEL[status]}</span>
    </button>
  );
}
