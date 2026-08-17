import VIPList from './VIPList';

export default {
  title: 'Terminal/VIPList',
  component: VIPList,
};

export const BlankProps = {
  args: {},
};

export const PenthousePartyVIPs = {
  name: 'Penthouse Party VIP List',
  args: {
    eventName: "Steel Jackhammer's Recovery Party",
    location: "Peach Trees - Unit 4201",
    date: "Nov 16-18, 2067 (Ongoing)",
    vips: [
      {
        name: 'Zenit',
        status: 'ARRIVED',
        notes: 'KILL!KILL!KILL! journalist - Known for intimate athlete interviews',
        clearance: 'PRESS',
        arrivalTime: '18:30',
      },
      {
        name: 'Ikhon',
        alias: 'The Warlock',
        status: 'ARRIVED',
        notes: 'Killmatch performer - Friendly when supplied, unstable otherwise',
        clearance: 'VIP',
        arrivalTime: '19:15',
      },
      {
        name: 'Thugger',
        status: 'ARRIVED',
        notes: 'Current champion - 11-month win streak, never shuts up about it',
        clearance: 'VIP',
        arrivalTime: '20:00',
      },
      {
        name: 'Raze',
        status: 'ARRIVED',
        notes: 'Tech specialist - Gambling problem, always fishing for gossip',
        clearance: 'VIP',
        arrivalTime: '19:45',
      },
      {
        name: 'Amande',
        status: 'ARRIVED',
        notes: 'Mech pilot - Quiet, keeps to herself, barely recognized without her rig',
        clearance: 'VIP',
        arrivalTime: '21:00',
      },
      {
        name: 'Master Crimson',
        status: 'ARRIVED',
        notes: 'Veteran athlete - Arvtagarna member, seems bored with everything',
        clearance: 'VIP',
        arrivalTime: '18:00',
      },
      {
        name: 'Goliathess',
        status: 'ARRIVED',
        notes: 'Rising star - Here for the drama, loves engineering storylines',
        clearance: 'VIP',
        arrivalTime: '20:30',
      },
      {
        name: 'Jade Boomslang',
        status: 'ARRIVED',
        notes: 'New talent - Virid Vipers sponsored, desperately seeking connections',
        clearance: 'VIP',
        arrivalTime: '19:00',
      },
    ],
  },
};
