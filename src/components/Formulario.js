import { Fragment, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { PropTypes } from "prop-types";

const Formulario = ({crearCita})=> {
    
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    // captar lo que el usario escribe
    const actualizarState = (e) => {

        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // cuando el usuario presiona agregar cita

    const submitCita = (e)=> {
        e.preventDefault();
        
        // validar
        if(mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "" ){
            actualizarError(true);
            return;
        }
        
        actualizarError(false);
        // Asignar un ID
        cita.id = uuidv4();

        // crear la cita
        crearCita(cita);

        // reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return(
        <Fragment>
            <h1>Crar Cita</h1>

            { error ? <p className="alerta-error">Todos los campos son obligatorios </p> : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Propietario"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea 
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Síntomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar Cita
                </button>
            </form>

        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;