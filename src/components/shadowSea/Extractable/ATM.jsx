import { useState } from 'react';

import { Line, Divider, DataTable, InsetBox, Spacer } from '@shadowsea/ShadowSeaComponents';
import Extractable from '../Extractable/Extractable';

export default function ATM({
  id,
  model = 'ATM-500',
  location = "Not Set",
  network = 'CityBank',
  accountHolder = "PRIVATE",
  balance = "PRIVATE",
  transactions = [],
  lastService,
  credits = 0,
  physicalCredits = 0,
}) {
  return (
    <div style={{ position: 'relative' }}>
      {/* ATM container */}
      <div
        style={{
          border: '2px solid rgb(79, 209, 197)',
          borderRadius: '4px',
          padding: '1rem',
          backgroundColor: 'rgba(29, 35, 50, 0.3)',
          position: 'relative',
        }}
      >
        {/* Header with ATM icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          {/* CSS ATM Icon */}
          <div style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0 }}>
            {/* ATM body */}
            <div
              style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: 'rgb(79, 209, 197)',
                borderRadius: '2px',
              }}
            />
            {/* Card slot */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                left: '4px',
                width: '16px',
                height: '3px',
                backgroundColor: 'rgb(19, 23, 34)',
                borderRadius: '1px',
              }}
            />
            {/* Screen */}
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: '6px',
                width: '12px',
                height: '4px',
                backgroundColor: 'rgb(0, 255, 65)',
                opacity: 0.6,
              }}
            />
          </div>

          <Line smoke large bold style={{ margin: 0 }}>
            [ATM - MODEL {model}]
          </Line>
        </div>

        <Line cyan>{location}</Line>
        <Divider />

        {/* ATM Info */}
        <DataTable
          data={[
            { label: 'Network', value: network },
            { label: 'Status', value: 'ONLINE' },
            { label: 'Account Holder', value: accountHolder },
            { label: 'Current Balance', value: balance },
          ]}
        />

        {/* Recent Transactions */}
        {transactions.length > 0 && (
          <InsetBox title="RECENT TRANSACTIONS:">
            {transactions.map((transaction, i) => (
              <Line key={i} neon style={{ fontSize: '0.875rem' }}>
                {transaction}
              </Line>
            ))}
          </InsetBox>
        )}

        {lastService && (
          <Line yellow style={{ fontSize: '0.75rem' }}>
            Last service: {lastService}
          </Line>
        )}

        {Boolean(credits) && (
          <>
            <Divider />
            <Extractable
              id={`${id}-atm-extractable`}
              digitalItems={[
                {
                  id: `${id}-atm-credits-item`,
                  label: 'Transaction Skim',
                  description: `Account: ${accountHolder} - Small % from daily transactions`,
                  value: credits,
                  isCredits: true,
                },
              ]}
            />
          </>
        )}

        {Boolean(physicalCredits) && (
          <>
            <Spacer />
            <Line yellow bold>SECURE LOCKBOX</Line>
            <Extractable
              id={`${id}-atm-lockbox-extractable`}
              physicalItems={[
                {
                  id: `${id}-atm-lockbox-item`,
                  label: 'Lockbox Holdings',
                  value: physicalCredits,
                  isCredits: true,
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
