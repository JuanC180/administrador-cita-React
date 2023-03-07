import { Fragment, useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

  

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas])

  // funcion que tome las citas actules y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([ ...citas, cita ]);
  }

  const eliminarCita = (id) =>{
    const nuevaCita = citas.filter( (cita) => cita.id !== id)
    guardarCitas( nuevaCita)
  }

  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus citas';


  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita = {crearCita}
            ></Formulario>
          </div>
          <div className="one-half column">
            <h2> {titulo} </h2>
            {citas.map( (cita) => {
              return(
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita = {eliminarCita}
              ></Cita>
            )})}
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
