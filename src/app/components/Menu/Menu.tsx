import { useState } from 'react';

type MenuProps = {
  onSpeedChange: (speed: number) => void;
  onNotasChange: (notas: [number, number][]) => void;
};

const Menu = ({ onSpeedChange, onNotasChange }: MenuProps) => {
  const [speed, setSpeed] = useState<number>(100);
  const [notas, setNotas] = useState<[number, number][]>([]);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(e.target.value);
    setSpeed(speed);
    onSpeedChange(speed);
  };

  const handleNotasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nota = Number(e.target.value);
    const newNotas = notas.filter((n) => n[1] !== nota);
    if (newNotas.length === notas.length) {
      newNotas.push([0, nota]);
    }
    setNotas(newNotas);
    onNotasChange(newNotas);
  };

  return (
    <div className="menu">
      <div className="opcao">
        <label htmlFor="speed">Velocidade:</label>
        <input
          type="number"
          id="speed"
          name="speed"
          value={speed}
          onChange={handleSpeedChange}
        />
      </div>
      <div className="opcao">
        <label htmlFor="notas">Notas:</label>
        <select id="notas" name="notas" onChange={handleNotasChange}>
          <option value="0">Selecione uma nota</option>
          <option value="1">Dó</option>
          <option value="2">Ré</option>
          <option value="3">Mi</option>
          <option value="4">Fá</option>
          <option value="5">Sol</option>
          <option value="6">Lá</option>
          <option value="7">Si</option>
        </select>
      </div>
      <div className="opcao">
        <label>Notas adicionadas:</label>
        <ul>
          {notas.map((nota, i) => (
            <li key={i}>
              {`Nota ${i + 1}: (${nota[0]}, ${nota[1]})`}
              <button
                onClick={() => {
                  setNotas(notas.filter((n) => n !== nota));
                  onNotasChange(notas.filter((n) => n !== nota));
                }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
