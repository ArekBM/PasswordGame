import Modal from 'react-modal'
import ParticleEngine from './Fireworks';


type EndModalProps = {
    isOpen: boolean;
    onClose: () => void
}

const modalStyles: Modal.Styles = {
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '0.25rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      width: '300px',
      maxWidth: '100%',
      zIndex: 1000,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }
}

const EndModal: React.FC<EndModalProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <ParticleEngine />
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Sent Email Alert"
                style={modalStyles}
            >
                <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-semibold">You Win!</h2>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
                </div>
                </Modal>
        </>
    );
  };
    
export default EndModal;
