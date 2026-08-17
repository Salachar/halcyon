import EncryptedMessage from './EncryptedMessage';

export default {
  title: 'Terminal/EncryptedMessage',
  component: EncryptedMessage,
};

export const BlankProps = () => (
  <EncryptedMessage />
);

export const Unlocked = () => (
    <EncryptedMessage
      messages={[
        "FROM: Warehouse Manager",
        "TO: All Units",
        "---",
        "Shipment delayed 3 days. Casino taking priority.",
        "Don't ask questions. Just update your schedules.",
        "- M"
      ]}
    />
);
