import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
    // ESTADOS
    // Presupuesto (Estados)
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    // Gastos (Estados)
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos')
            ? JSON.parse(localStorage.getItem('gastos'))
            : []
    );
    // Modal (Estados)
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    // Dinero (Estados)
    const [disponible, setDisponible] = useState(presupuesto);
    const [gastado, setGastado] = useState(0);
    // Editar (Estados)
    const [gastoEditar, setGastoEditar] = useState({});
    // Filtros
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    // EFECTOS
    // LocalStorage (GASTOS)
    useEffect(() => {
        // Calcular lo total gastado
        const totalGastado = gastos.reduce(
            (total, gasto) => gasto.cantidad + total,
            0
        );
        // Calcular lo disponible
        const totalDisponible = presupuesto - totalGastado;

        // Asignar valores
        setGastado(totalGastado);
        setDisponible(totalDisponible);

        // Guardar en LocalStorage
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);
    // Editar
    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);
    // LocalStorage (PRESUPUESTO)
    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto]);
    // Filtros
    useEffect(() => {
        if (filtro) {
            // Filtrar gastos por categoria
            const gastoFiltrados = gastos.filter(
                (gasto) => gasto.categoria === filtro
            );

            setGastosFiltrados(gastoFiltrados);
        }
    }, [filtro, gastos]);
    // Redireccionar
    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);

    // Crear un nuevo gasto
    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    // Guarda los gastos
    const guardarGasto = (gasto) => {
        if (gasto.id) {
            // Actualizar
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            );
            setGastos(gastosActualizados);
        } else {
            // Nuevo Gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
        setGastos(gastosActualizados);
    };

    return (
        <div className={modal ? 'fijar' : ''}>
            {/* Header */}
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                setDisponible={setDisponible}
                disponible={disponible}
                gastado={gastado}
            />

            {/* Boton Nuevo Gasto */}
            {isValidPresupuesto && (
                <>
                    {/* Listado de Gastos */}
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>
                    {/* Agregar un nuevo Gasto */}
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Icono Nuevo Gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {/* Modal */}
            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    presupuesto={presupuesto}
                    disponible={disponible}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
}

export default App;
