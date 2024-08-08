import { useNavigate } from 'react-router-dom'; // Use React Router for navigation
import useGameStore from '../store/gameStore';
import './SettingsPage.css'; 

export default function Settings() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { boardSize, setBoardSize } = useGameStore();

  function setBackgroundColor(color) {
    document.documentElement.style.setProperty('--global-background-color', color);
  }

  const startGame = () => {
    navigate('/game'); // Use navigate function to redirect
  };

  return (
    <div className="settings-page"> {/* Apply class for styling */}
      <h1>Memory Game Settings</h1>
      <div className="setting-item">
        <label>
          Background Color:
          <input
            type="color"
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
      </div>
      <div className="setting-item">
        <label>
          Board Size:
          <input
            type="number"
            value={boardSize}
            onChange={(e) => setBoardSize(parseInt(e.target.value))}
            min="2"
            max="10"
          />
        </label>
      </div>
      <button onClick={startGame} className="start-button">Start Game</button>
    </div>
  );
}