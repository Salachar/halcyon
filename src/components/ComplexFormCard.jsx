const DURATION_LABELS = { I: 'Instantaneous', S: 'Sustained', P: 'Permanent' };

export default function ComplexFormCard({ form }) {
  const fadeLabel = form.fadeValue != null ? `Fade ${form.fadeValue}` : 'No Fade';
  const meta = `${fadeLabel} · ${DURATION_LABELS[form.duration]}`;

  return (
    <div className="sr-skill-card">
      <div className="sr-skill-card-identity">
        <div className="sr-skill-card-name">{form.label}</div>
        <div className="sr-skill-card-meta">{meta}</div>
      </div>
      <div className="sr-skill-card-body">
        <p className="sr-skill-card-description">{form.description}</p>
      </div>
    </div>
  );
}
