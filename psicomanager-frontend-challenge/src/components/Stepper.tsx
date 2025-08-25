
const steps = ['Cadastrar um conta','Canais de envio de mensagem de cobrança' , 'Forma de pagamento da cobrança'];

export default function StepIndicator({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px' }}>
      {steps.map((label, index) => {
        const isCompleted = index < step;
        const isActive = index === step;

        const backgroundColor = isCompleted
          ? '#4caf50' // verde concluído
          : isActive
          ? '#2196f3' // azul ativo
          : '#cfd8dc'; // cinza pendente

        const borderColor = isActive ? '#1976d2' : 'transparent';

        return (
          <div key={index} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor,
                border: `2px solid ${borderColor}`,
                margin: '0 auto',
                transition: 'all 0.3s ease',
              }}
            />
            <span style={{ fontSize: '14px', marginTop: '8px', display: 'block', color: '#333' }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}