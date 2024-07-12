import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";

const EditarProductos = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    //definimos los estados
    const [equipo, setEquipo] = useState('');
    const [procesador, setProcesador] = useState('');
    const [memoriaRam, setMemoriaRam] = useState('');
    const [tamanoDisco, setTamanoDisco] = useState('');
    const [tipoPantalla, setTipoPantalla] = useState('');
    const [garantia, setGarantia] = useState('');
    const [valor, setValor] = useState('');

    const modificarProductos = async (e) => {
        e.preventDefault();
        await APIInvoke.invokePUT(`/api/productos/${id}`, {
            equipo, procesador, memoriaRam, tamanoDisco, tipoPantalla, garantia, valor
        });
        navigate('/productos');
    };

    useEffect(() => {
        getProducto();
        // eslint-disable-next-line
    }, []);

    const getProducto = async () => {
        const response = await APIInvoke.invokeGET(`/api/productos/${id}`);
        setEquipo(response.equipo);
        setProcesador(response.procesador);
        setMemoriaRam(response.memoriaRam);
        setTamanoDisco(response.tamanoDisco);
        setTipoPantalla(response.tipoPantalla);
        setGarantia(response.garantia);
        setValor(response.valor);
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"/home"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={modificarProductos}>
                                <div className='form-group'>
                                    <label htmlFor="equipo">Equipo</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese nombre del equipo'
                                        id='equipo'
                                        name='equipo'
                                        value={equipo}
                                        onChange={(e) => setEquipo(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="procesador">Procesador</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el procesador'
                                        id='procesador'
                                        name='procesador'
                                        value={procesador}
                                        onChange={(e) => setProcesador(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="memoriaRam">Memoria RAM</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese la memoria RAM'
                                        id='memoriaRam'
                                        name='memoriaRam'
                                        value={memoriaRam}
                                        onChange={(e) => setMemoriaRam(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="tamanoDisco">Tamaño Disco</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el tamaño del disco'
                                        id='tamanoDisco'
                                        name='tamanoDisco'
                                        value={tamanoDisco}
                                        onChange={(e) => setTamanoDisco(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="tipoPantalla">Tipo de Pantalla</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el tipo de pantalla'
                                        id='tipoPantalla'
                                        name='tipoPantalla'
                                        value={tipoPantalla}
                                        onChange={(e) => setTipoPantalla(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="garantia">Garantía</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese la garantía'
                                        id='garantia'
                                        name='garantia'
                                        value={garantia}
                                        onChange={(e) => setGarantia(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="valor">Valor</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el valor'
                                        id='valor'
                                        name='valor'
                                        value={valor}
                                        onChange={(e) => setValor(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type='submit' className='btn btn-primary'>Guardar</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default EditarProductos;
