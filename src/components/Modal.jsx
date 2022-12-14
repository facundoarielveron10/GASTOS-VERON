import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import CerrarModal from '../img/cerrar.svg';

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    disponible,
    gastoEditar,
    setGastoEditar,
}) => {
    // ESTADOS
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    // EFECTOS
    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, []);

    // Oculta el Modal
    const ocultarModal = () => {
        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
            setGastoEditar({});
        }, 500);
    };

    // Guarda los datos en los State
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('');
            }, 3000);
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha });
        setGastoEditar({});
    };

    return (
        <div className="modal">
            {/* Boton Cerrar Modal */}
            <div className="cerrar-modal">
                <img
                    src={CerrarModal}
                    alt="Boton Cerrar Modal"
                    onClick={ocultarModal}
                />
            </div>
            {/* Formulario */}
            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>
                    {gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
                </legend>
                {/* Alertas */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                {/* Nombre */}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="A??ade el Nombre del Gasto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                {/* Cantidad */}
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="A??ade la cantidad del gasto: Ej 300"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>
                {/* Categoria */}
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="descanso">Descanso</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                {/* Boton Enviar */}
                <input
                    type="submit"
                    value={
                        gastoEditar.nombre ? 'Guardar Cambios' : 'A??adir Gasto'
                    }
                />
            </form>
        </div>
    );
};

export default Modal;
