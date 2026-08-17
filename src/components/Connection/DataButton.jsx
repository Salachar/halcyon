import ImportExportIcon from '@mui/icons-material/ImportExport';

export default function DataButton({ onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      title="App data — export, import, send to device"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.35rem 0.5rem',
        backgroundColor: 'transparent',
        color: 'rgb(79, 209, 197)',
        border: '1px solid rgba(79, 209, 197, 0.4)',
        borderRadius: '2px',
        cursor: 'pointer',
        ...style,
      }}
    >
      <ImportExportIcon style={{ fontSize: 14 }} />
    </button>
  );
}
