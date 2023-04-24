import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Background from '../components/Background/Background';
import Menu from '../components/Menu/Menu';

const App = () => {
const [bpm, setBpm] = useState<number>(100);
const [notas, setNotas] = useState<[number, number][]>([]);

const handleSpeedChange = (speed: number) => {
  setBpm(speed);
};

const handleNotasChange = (notas: [number, number][]) => {
  setNotas(notas);
};

return (
  <div className="app">
      <Background bpm={bpm} notas={notas} />
      <Menu onSpeedChange={handleSpeedChange} onNotasChange={handleNotasChange} />
  </div>
);

}

ReactDOM.render(<App />, document.getElementById('root'));