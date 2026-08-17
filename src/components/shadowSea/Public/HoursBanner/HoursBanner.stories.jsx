import HoursBanner from './HoursBanner';

export default {
  title: 'Terminal/HoursBanner',
  component: HoursBanner,
};

export const BlankProps = () => (
  <HoursBanner />
);

// Open business
export const OpenBusiness = () => (
  <HoursBanner
    name="CAVE CLUB"
    hours="20:00 - 06:00"
    days="Every Night"
    location="Ports District, Eastern Section"
    note="Best time: 23:00-03:00 (peak crowd, live music)"
  />
);

// Closed business
export const ClosedBusiness = () => (
  <HoursBanner
    name="NEON DINER"
    hours="06:00 - 22:00"
    days="Mon-Sat"
    location="Central District, Main Street"
    note="Opens at 06:00 - Breakfast specials available"
  />
);

// Closing soon (warning)
export const ClosingSoon = () => (
  <HoursBanner
    name="LUCKY FLIGHT CASINO"
    hours="18:00 - 04:00"
    days="Every Night"
    location="Central District, Near Metro Station"
    note="Last entry at 03:30"
  />
);

// Minimal info
export const MinimalInfo = () => (
  <HoursBanner
    name="24/7 BODEGA"
    hours="24 Hours"
  />
);
