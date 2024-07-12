import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../configuracion/APIInvoke';


const MostrarProveedor = () => {
    const [proveedor, setProveedor] = useState([]);

    const getProveedor = async () => {
        try {
            const response = await APIInvoke.invokeGET('/api/proveedor');
            setProveedor(response);
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
        }
    };

    useEffect(() => {
        getProveedor();
    }, []);

    const eliminarProveedor = async (e, idProveedor) => {
        try {
            const response = await APIInvoke.invokeDELETE((`/api/proveedor/${idProveedor}`));
            if (response.msg === "El proveedor ha sido eliminado") {
                const msg = "El proveedor fue eliminado correctamente";
                swal({
                    title: "Informacion",
                    text: msg,
                    icon: "success",
                    button: {
                        confirm: {
                            text: 'OK',
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });
                getProveedor();
            } else {
                const msg = "El proveedor no pudo ser eliminado correctamente";
                swal({
                    title: "Error",
                    text: msg,
                    icon: "error",
                    button: {
                        confirm: {
                            text: 'OK',
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error al eliminar proveedor:', error);
        }
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <SidebarContainer />
            <div className='content-wrapper'>
                <ContentHeader
                    titulo={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"./home"}
                />
                <section className='content'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'>
                                <Link to={"/proveedor/agregar"} className='btn btn-block btn-primary btn-sm'>
                                    Crear Proveedor
                                </Link>
                            </h3>
                            <div className='card-tools'>
                                <button type='button' className='btn btn-tool' data-card-widget='collapse' title='collapse'>
                                    <i className='fas fa-minus'></i>
                                </button>
                                <button type='button' className='btn btn-tool' data-card-widget='remove' title='Remove'>
                                    <i className='fas fa-times'></i>
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Nombres proveedores</th>
                                        <th style={{ width: '15%' }}>Apellidos proveedor</th>
                                        <th style={{ width: '15%' }}>Marca</th>
                                        <th style={{ width: '10%' }}>Cedula</th>
                                        <th style={{ width: '10%' }}>Correo</th>
                                        <th style={{ width: '15%' }}>Numero Contacto</th>
                                        <th style={{ width: '10%' }}>Nit</th>
                                        <th style={{ width: '15%' }}>Direccion</th>
                                        <th style={{ width: '10%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proveedor.map((proveedor, index) => (
                                        <tr key={index}>
                                            <td>{proveedor.nombres}</td>
                                            <td>{proveedor.apellidos}</td>
                                            <td>{proveedor.marca}</td>
                                            <td>{proveedor.cedula}</td>
                                            <td>{proveedor.correo}</td>
                                            <td>{proveedor.numeroContacto}</td>
                                            <td>{proveedor.nit}</td>
                                            <td>{proveedor.direccion}</td>
                                            <td>
                                            <Link to={`/proveedor/editar/${proveedor._id}`} className="btn btn-primary mt-2 mb-2">
                                            <i class="fa-solid fa-user-pen"></i>
                                            </Link>

                                            <button onClick={(e) => eliminarProveedor(e, proveedor._id)} className="btn btn-danger">
                                            <i class="fa-solid fa-trash"></i>
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default MostrarProveedor;
