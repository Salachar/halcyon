import { useState, useEffect } from 'react';
import {
  Line,
  Divider,
  Section,
  InsetBox,
} from '@shadowsea/ShadowSeaComponents';

export default function Workstation({
  owner = 'Employee',
  role = 'Worker',
  status = 'IDLE',
  lastActivity = 'Unknown',
  openTabs = [],
  recentFiles = [],
  emails = 0,
  productivity = 50,
  cpuUsage = 30,
  uptime = '4d 12h 37m',
  children,
}) {
  const getStatusColor = () => {
    const colors = {
      'LOCKED': 'rgb(239, 68, 68)',
      'IDLE': 'rgb(251, 191, 36)',
      'ACTIVE': 'rgb(34, 197, 94)',
      'AWAY': 'rgb(148, 163, 184)',
    };
    return colors[status] || 'rgb(148, 163, 184)';
  };

  return (
    <div
      style={{
        border: '2px solid rgb(77, 167, 188)',
        borderRadius: '4px',
        backgroundColor: 'rgba(29, 35, 50, 0.5)',
        padding: '1rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        {/* Monitor icon */}
        <div
          style={{
            width: '40px',
            height: '30px',
            backgroundColor: 'rgb(45, 53, 72)',
            border: '2px solid rgb(77, 167, 188)',
            borderRadius: '3px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getStatusColor(),
              boxShadow: `0 0 8px ${getStatusColor()}`,
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <Line smoke bold style={{ margin: 0, fontSize: '1rem' }}>
            [WORKSTATION - {owner.toUpperCase()}]
          </Line>
          <Line cyan style={{ margin: 0, fontSize: '0.8rem' }}>
            {role}
          </Line>
        </div>

        {/* Status badge */}
        <div
          style={{
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: getStatusColor(),
            backgroundColor: `${getStatusColor()}20`,
            border: `1px solid ${getStatusColor()}`,
            borderRadius: '3px',
            fontFamily: 'monospace',
          }}
        >
          {status}
        </div>
      </div>

      <Divider />

      {/* System stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.5rem',
          marginBottom: '1rem',
          marginTop: '0.75rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
            CPU
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'rgb(79, 209, 197)' }}>
            {cpuUsage}%
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
            UPTIME
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'rgb(251, 191, 36)' }}>
            {uptime}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
            EMAILS
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'rgb(239, 68, 68)' }}>
            {emails}
          </div>
        </div>
      </div>

      {/* Last activity */}
      <div
        style={{
          padding: '0.5rem',
          backgroundColor: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '3px',
          marginBottom: '1rem',
        }}
      >
        <Line yellow style={{ fontSize: '0.8rem', margin: 0 }}>
          Last activity: {lastActivity}
        </Line>
      </div>

      {/* Open browser tabs */}
      {openTabs.length > 0 && (
        <>
          <Section title="OPEN BROWSER TABS:" color="cyan">
            {openTabs.map((tab, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.35rem',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              >
                <span
                  style={{
                    color: tab.type === 'suspicious' ? 'rgb(239, 68, 68)' : 'rgb(79, 209, 197)',
                  }}
                >
                  {tab.title}
                </span>
              </div>
            ))}
          </Section>
        </>
      )}

      {/* Recent files */}
      {recentFiles.length > 0 && (
        <InsetBox title="RECENT FILES:" color="smoke">
          {recentFiles.map((file, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.35rem',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
              }}
            >
              <span style={{ color: 'rgb(133, 175, 231)' }}>{file.name}</span>
              <span style={{ color: 'rgb(148, 163, 184)' }}>{file.timestamp}</span>
            </div>
          ))}
        </InsetBox>
      )}

      {/* Productivity joke */}
      <div
        style={{
          padding: '0.5rem',
          backgroundColor: productivity > 80 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${productivity > 80 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: '3px',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.25rem' }}>
          PRODUCTIVITY SCORE
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              flex: 1,
              height: '8px',
              backgroundColor: 'rgba(100, 100, 100, 0.3)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${productivity}%`,
                height: '100%',
                backgroundColor: productivity > 80 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                transition: 'width 0.3s',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: productivity > 80 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
              fontFamily: 'monospace',
            }}
          >
            {productivity}%
          </span>
        </div>
      </div>

      {Boolean(children) && (
        <div style={{
          margin: '1rem 0',
          fontSize: '0.875rem',
        }}>
          {children }
        </div>
      )}
    </div>
  );
}
