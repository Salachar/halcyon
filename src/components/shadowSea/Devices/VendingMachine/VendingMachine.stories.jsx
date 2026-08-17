import VendingMachine from './VendingMachine';
import { getDrinks } from '@data/random/drinks';

export default {
  title: 'Terminal/VendingMachine',
  component: VendingMachine,
};

export const BlankProps = () => (
  <VendingMachine />
);

// Office vending machine - optimal cooling
export const OfficeVendingMachine = () => (
  <VendingMachine
    id="vm-office-lobby-01"
    model="VENDTRON-3000"
    location="Corporate Office - Main Lobby"
    temperature={35}
    drinks={getDrinks([0, 1, 4, 6, 9, 15])}
  >
    <div style={{ fontSize: '0.875rem', color: 'rgb(203, 213, 225)', textAlign: 'center' }}>
      <div style={{ marginBottom: '0.5rem', color: 'rgb(79, 209, 197)', fontWeight: 'bold' }}>
        💼 OFFICE HOURS SPECIAL
      </div>
      <div>All drinks 20% off before 10:00</div>
    </div>
  </VendingMachine>
);

// Warehouse - some sold out, slightly warm
export const WarehouseVendingMachine = () => (
  <VendingMachine
    id="vm-warehouse-breakroom"
    model="QUICKDRINX-2000"
    location="SecureCargo Warehouse - Break Room"
    brandName="QUICKDRINX"
    temperature={55}
    drinks={getDrinks([5, 8, 10, 16, 17, 19], [1, 4])}
  />
);

// Casino premium machine - ice cold
export const CasinoVendingMachine = () => (
  <VendingMachine
    id="vm-casino-vip-lounge"
    model="LUXDRINX ELITE"
    location="Lucky Flight Casino - VIP Lounge"
    brandName="LUXDRINX"
    statusText="COMPLIMENTARY SERVICE"
    temperature={32}
    drinks={getDrinks([3, 6, 11, 12, 13, 14])}
  >
    <div style={{ fontSize: '0.875rem', color: 'rgb(251, 191, 36)', textAlign: 'center', padding: '0.5rem' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>✨ VIP MEMBERS</div>
      <div style={{ fontSize: '0.75rem', color: 'rgb(203, 213, 225)' }}>All beverages complimentary</div>
    </div>
  </VendingMachine>
);

// Gym/fitness center - cool
export const GymVendingMachine = () => (
  <VendingMachine
    id="vm-gym-main-floor"
    model="FITDRINX PRO"
    location="Power Fitness Center - Main Floor"
    brandName="FITDRINX"
    temperature={40}
    drinks={getDrinks([8, 9, 15, 16, 17, 18])}
  >
    <div style={{ fontSize: '0.875rem', color: 'rgb(16, 185, 129)', textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        💪 FUEL YOUR WORKOUT
      </div>
      <div style={{ fontSize: '0.75rem', color: 'rgb(203, 213, 225)' }}>
        Electrolytes • Hydration • Energy
      </div>
    </div>
  </VendingMachine>
);

// Abandoned building - mostly sold out, warm
export const MostlySoldOut = () => (
  <VendingMachine
    id="vm-abandoned-floor3"
    model="OLDDRINX-1000"
    location="Abandoned Office Building - Floor 3"
    brandName="OLD STOCK"
    statusText="LOW INVENTORY"
    temperature={78}
    drinks={getDrinks([0, 1, 4, 7, 10, 13], [0, 1, 2, 4, 5])}
  >
    <div style={{
      fontSize: '0.75rem',
      color: 'rgb(239, 68, 68)',
      textAlign: 'center',
      fontStyle: 'italic'
    }}>
      ⚠️ Machine not serviced in 47 days
    </div>
  </VendingMachine>
);

// Data center - optimal cooling
export const DataCenterVendingMachine = () => (
  <VendingMachine
    id="vm-datacenter-s7"
    model="TECHDRINX-4000"
    location="DataVault Systems - Server Room"
    brandName="TECHDRINX"
    statusText="STAY HYDRATED"
    temperature={33}
    drinks={getDrinks([0, 6, 8, 9, 16, 17])}
  >
    <div style={{ fontSize: '0.875rem', color: 'rgb(79, 209, 197)', textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
        💻 CODE FUEL
      </div>
      <div style={{ fontSize: '0.75rem', color: 'rgb(203, 213, 184)' }}>
        Keeping servers and devs cool
      </div>
    </div>
  </VendingMachine>
);

// Mixed drinks with custom coffee
export const CustomBrandingMachine = () => (
  <VendingMachine
    id="vm-custom-cafe"
    model="CYBERDRINX-5000"
    location="Cyber Café - Main Floor"
    brandName="CYBERDRINX"
    statusText="STAY WIRED"
    temperature={38}
    drinks={[
      ...getDrinks([0, 6, 8]),
      { name: 'COLD BREW NITRO', pattern: 'waves', color: 'red', available: true },
      { name: 'ICED MOCHA', pattern: 'swirl', color: 'orange', available: true },
      { name: 'ESPRESSO SHOT', pattern: 'stripe', color: 'red', available: false },
    ]}
  >
    <div style={{ fontSize: '0.875rem', color: 'rgb(79, 209, 197)', textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
        ☕ NEW: Coffee Selection
      </div>
      <div style={{ fontSize: '0.75rem', color: 'rgb(203, 213, 225)' }}>
        Fresh brewed daily
      </div>
    </div>
  </VendingMachine>
);
