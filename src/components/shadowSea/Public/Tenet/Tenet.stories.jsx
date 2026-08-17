import Tenet from './Tenet';

export default {
  title: 'Terminal/Tenet',
  component: Tenet,
};

export const BlankProps = () => (
  <Tenet />
);


// Public active profile with intercom
export const PublicProfile = () => (
  <Tenet
    id="TEN-4729581"
    name="Alex Chen"
    tagline="Software Engineer @ CyberTech Solutions"
    district="Central District"
    connections={247}
    mutualConnections={12}
    bio="Building the future of network security. Coffee enthusiast and part-time tinkerer."
    privacy="PUBLIC"
    status="ACTIVE"
    memberSince="2065"
    enableIntercom={true}
    onIntercom={() => console.log('Intercom clicked')}
  />
);

// Friends only profile
export const FriendsOnlyProfile = () => (
  <Tenet
    id="TEN-8392047"
    name="Sam Rivera"
    tagline="Freelance Designer"
    district="Ports District"
    connections={89}
    mutualConnections={5}
    bio="Visual storyteller. Always looking for the next creative challenge."
    privacy="FRIENDS"
    status="ACTIVE"
    memberSince="2067"
    enableIntercom={true}
    onIntercom={() => console.log('Intercom clicked')}
  />
);

// Private profile
export const PrivateProfile = () => (
  <Tenet
    id="TEN-1829374"
    name="Jordan Park"
    district="The Hills"
    connections={432}
    privacy="PRIVATE"
    status="ACTIVE"
    memberSince="2063"
  />
);

// Suspended account (no intercom)
export const SuspendedAccount = () => (
  <Tenet
    id="TEN-5647382"
    name="Casey Walsh"
    privacy="PUBLIC"
    status="SUSPENDED"
    memberSince="2066"
  />
);

// Deleted account (no intercom)
export const DeletedAccount = () => (
  <Tenet
    id="TEN-2938475"
    name="Morgan Lee"
    privacy="PUBLIC"
    status="DELETED"
    memberSince="2064"
  />
);

// Minimal public profile without intercom
export const MinimalProfile = () => (
  <Tenet
    id="TEN-7392847"
    name="Riley Quinn"
    connections={12}
    privacy="PUBLIC"
    status="ACTIVE"
    memberSince="2068"
  />
);

// High connections profile
export const PopularProfile = () => (
  <Tenet
    id="TEN-4829301"
    name="Taylor Kim"
    tagline="Community Organizer | Digital Rights Advocate"
    district="Mosscroft"
    connections={1847}
    mutualConnections={34}
    bio="Fighting for digital privacy and community access to technology. Every voice matters."
    privacy="PUBLIC"
    status="ACTIVE"
    memberSince="2062"
    enableIntercom={true}
    onIntercom={() => console.log('Intercom clicked')}
  />
);
