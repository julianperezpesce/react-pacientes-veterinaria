import React, { Fragment, useState } from 'react';
import { v4 } from 'uuid';


const Formulario = ({crearCita}) => {

    //Crear state de citas
    const [ cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, actualizarError ] = useState(false);

    //funcion que se ejecuta cada vez que utiliza un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando se envia el formulario
    const submitCita = e => {
        e.preventDefault();

        //Validacion
        if (mascota.trim() === '' || 
                propietario.trim() === '' || 
                fecha.trim() === '' || 
                hora.trim() === '' || 
                sintomas.trim() === '') {

            actualizarError(true);
            return;
        }

        //Eliminar el mensaje previo
        actualizarError(false);

        //Asignar ID
        cita.id = v4();

        //Crear cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });

    }

    return (
        <Fragment>
           <h2>Crear cita</h2> 

           {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null} 

           <form
                onSubmit={submitCita}
           >

               <label>Nombre de mascota</label>
               <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"     
                    onChange={actualizarState}
                    value={mascota}         
               />
               
               <label>Nombre del dueño</label>
               <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"  
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
                   className="u-full-width"
                   name="sintomas"
                   placeholder="Descripción"
                   onChange={actualizarState}  
                   value={sintomas}  
               ></textarea>
               <button
                    type="submit"
                    className="u-full-width button-primary"
               >Agregar cita</button>
           </form>
        </Fragment>  
    
    );
}
 
export default Formulario;