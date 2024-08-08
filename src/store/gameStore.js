import create from 'zustand';

const useGameStore = create((set) => ({
  boardSize: 4, // Default board size
  setBoardSize: (size) => set({ boardSize: size }),
}));

export default useGameStore;