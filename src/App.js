import './App.css';

import Image from './assets/SVG/31.svg';

function App() {
  return (
    <div className="App">

      <div className="container">

        <input type="text" />

        <div className="today">
          <img src={Image} alt="" srcset="" />
          <div className="content">
            <h1>hoje 23c</h1>
            <h2>Parcialmente Nublado</h2>
            <p>Vento: 9km/h</p>
            <p>Humidade: 80%</p>
            <p>Pressão: 1003hPA</p>
          </div>
        </div>

        <div className="after-today">
          <img src={Image} alt="" srcset="" />
          <div className="content">
            <h1>hoje 23c</h1>
            <h2>Parcialmente Nublado</h2>
            <p>Vento: 9km/h</p>
            <p>Humidade: 80%</p>
            <p>Pressão: 1003hPA</p>
          </div>
        </div>



        <div className="after-today">
          <img src={Image} alt="" srcset="" />
          <div className="content">
            <h1>hoje 23c</h1>
            <h2>Parcialmente Nublado</h2>
            <p>Vento: 9km/h</p>
            <p>Humidade: 80%</p>
            <p>Pressão: 1003hPA</p>
          </div>
        </div>


      </div>

    </div>
  );
}

export default App;
