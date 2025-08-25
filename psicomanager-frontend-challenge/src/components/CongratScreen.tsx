
const CongratsScreen = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      style={{
        backgroundImage: "url('../assets/parabens.PNG')", // substitua pela imagem desejada
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
      }}
    >
      <h1>🎉 Parabéns!</h1>
      <p>Seu cadastro foi finalizado com sucesso.</p>
      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#00c896',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Fechar
      </button>
    </div>
  );
};

export default CongratsScreen;