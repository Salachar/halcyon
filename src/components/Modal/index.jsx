import CloseIcon from '@mui/icons-material/Close';

import {
  Backdrop, SmallBox, MediumBox, LargeBox, Header, HeaderText, Title, Subtitle, CloseButton, Body, Message,
} from './Modal.styles';

const SIZE_BOX = {
  small: SmallBox,
  medium: MediumBox,
  large: LargeBox,
};

// One internal implementation, three sized exports (ModalSmall/
// ModalMedium/ModalLarge) — same open/onClose/title/subtitle/message/
// children API as the old Modal component, so callers migrate by
// swapping the import and picking a size, not by relearning a new
// shape. `open` gates rendering internally (returns null when false),
// same as before — callers can render unconditionally and just flip
// `open`, rather than needing their own {x && <Modal/>} wrapper.
function BaseModal({ size, open, onClose, title, subtitle, message, children }) {
  if (!open) return null;
  const Box = SIZE_BOX[size];
  const hasHeader = Boolean(title || subtitle || onClose);

  return (
    <Backdrop onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        {hasHeader && (
          <Header>
            <HeaderText>
              {title && <Title>{title}</Title>}
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </HeaderText>
            {onClose && (
              <CloseButton onClick={onClose} aria-label="Close">
                <CloseIcon style={{ fontSize: 18 }} />
              </CloseButton>
            )}
          </Header>
        )}

        {(message || children) && (
          <Body>
            {message && <Message>{message}</Message>}
            {children}
          </Body>
        )}
      </Box>
    </Backdrop>
  );
}

export function ModalSmall(props) {
  return <BaseModal size="small" {...props} />;
}

export function ModalMedium(props) {
  return <BaseModal size="medium" {...props} />;
}

export function ModalLarge(props) {
  return <BaseModal size="large" {...props} />;
}

// Default export is Medium — matches "Modal/ModalMedium" being treated
// as the same thing, just named explicitly when a caller wants to be
// unambiguous about size.
export default ModalMedium;
