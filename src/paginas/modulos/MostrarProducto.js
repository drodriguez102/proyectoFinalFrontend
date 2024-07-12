import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";


const MostrarProductos = () => {

const [producto, setProductos] = useState([]);

const getProductos = async () => {
    try {
    const response = await APIInvoke.invokeGET("/api/productos");
    setProductos(response.producto);
    } catch (error) {
    console.error("Error al obtener productos:", error);
    }
};

useEffect(() => {
    getProductos();
}, []);

const eliminarProductos = async (e, idProducto) => {
    try {
    const response = await APIInvoke.invokeDELETE(`/api/productos/${idProducto}`);
    if (response.msg === "El producto ha sido eliminado") {
        const msg = "El producto fue eliminado correctamente";
        swal({
        title: "Información",
        text: msg,
        icon: "success",
        button: {
            confirm: {
            text: 'OK',
            value: true,
            className: 'btn btn-danger',
            closeModal: true
            }
        }
        });
        getProductos(); 
    } else {
        throw new Error("El producto no pudo ser eliminado correctamente");
    }
    } catch (error) {
    const msg = "El producto no pudo ser eliminado correctamente";
    swal({
        title: "Error",
        text: msg,
        icon: "error",
        button: {
        confirm: {
            text: 'OK',
            value: true,
            className: 'btn btn-danger',
            closeModal: true
        }
        }
    });
    console.error("Error al eliminar producto:", error);
    }
};

return (
    <div className="wrapper">
    <Navbar />
    <SidebarContainer />
    <div className="content-wrapper">
        <ContentHeader
        titulo={"Dashboard"}
        breadCrumb1={"Inicio"}
        breadCrumb2={"Productos"}
        ruta1={"/home"}
        />

        <section className="content">
        <div className="card">
            <div className="card-header">
            <h3 className="card-title">
                <Link to={"/productos/agregar"} className="btn btn-block btn-primary btn-sm">Agregar Producto</Link>
            </h3>
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
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th style={{ width: "20%" }}>Equipo</th>
                    <th style={{ width: "15%" }}>Procesador</th>
                    <th style={{ width: "15%" }}>Memoria RAM</th>
                    <th style={{ width: "15%" }}>Tamaño Disco</th>
                    <th style={{ width: "15%" }}>Tipo Pantalla</th>
                    <th style={{ width: "10%" }}>Garantía</th>
                    <th style={{ width: "10%" }}>Valor</th>
                    <th style={{ width: "10%" }}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {producto.map((producto, index) => (
                    <tr key={index}>
                    <td>{producto.equipo}</td>
                    <td>{producto.procesador}</td>
                    <td>{producto.memoriaRam}</td>
                    <td>{producto.tamañoDisco}</td>
                    <td>{producto.tipoPantalla}</td>
                    <td>{producto.garantia}</td>
                    <td>{producto.valor}</td>
                    <td>
                        <Link to={`/productos/editar/${producto._id}`} className="btn btn-primary mt-2 mb-2">
                        <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button onClick={(e) => eliminarProductos(e, producto._id)} className="btn btn-danger ml-2">
                        <i className="fas fa-trash"></i>
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
export default MostrarProductos;
