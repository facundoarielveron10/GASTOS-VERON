import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
    setDisponible,
}) => {
    // ESTADOS
    const [mensaje, setMensaje] = useState('');

    // Validar nuevo presupuesto
    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto valido');
            return;
        }
        // Sacamos las alertas previas
        setMensaje('');
        setIsValidPresupuesto(true);
        setDisponible(presupuesto);
    };

    return (
        // Contenedor Presupuesto
        <div className="contenedor-presupuesto contenedor sombra">
            {/* Formulario */}
            <form className="formulario" onSubmit={handlePresupuesto}>
                {/* Presupuesto */}
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu Presupuesto"
                        id="presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>
                {/* Boton Enviar */}
                <input type="submit" value="Añadir" />
                {/* Alertas */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    );
};

export default NuevoPresupuesto;
