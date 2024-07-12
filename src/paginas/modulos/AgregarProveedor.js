import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

const AgregarProveedor = () => {

  const navigate = useNavigate();

  const [proveedor, setProveedor] = useState({
    nombres: "",
    apellidos: "",
    marca: "",
    cedula: "",
    correo: "",
    numeroContacto: "",
    nit: "",
    direccion: ""
  });

  useEffect(() => {
    document.getElementById("nombres").focus();
  }, []);

  const onChange = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value
    });
  };

  const CrearProveedor = async () => {
    const data = {
      nombres: proveedor.nombres,
      apellidos: proveedor.apellidos,
      marca: proveedor.marca,
      cedula: proveedor.cedula,
      correo: proveedor.correo,
      numeroContacto: proveedor.numeroContacto,
      nit: proveedor.nit,
      direccion: proveedor.direccion
    };

    try {
      const response = await APIInvoke.invokePOST("/api/proveedor", data);
      const idProveedor = response._id;

      if (!idProveedor) {
        throw new Error("Hubo un error al agregar un proveedor");
      }

      swal({
        title: 'Información',
        text: 'El proveedor fue creado con éxito',
        icon: 'success',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });
      navigate("/proveedor");

    } catch (error) {
      swal({
        title: 'Error',
        text: error.message,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    CrearProveedor();
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
              <h3 className="card-title">
                <Link to={"/proveedor/agregar"} className="btn btn-block btn-primary btn-sm">Crear Proveedor</Link>
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
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor="nombres">Nombres</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese su nombre'
                    id='nombres'
                    name='nombres'
                    value={proveedor.nombres}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="apellidos">Apellidos</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese sus apellidos'
                    id='apellidos'
                    name='apellidos'
                    value={proveedor.apellidos}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="marca">Marca</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese marca que maneja'
                    id='marca'
                    name='marca'
                    value={proveedor.marca}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="cedula">Cédula</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Ingrese su cédula'
                    id='cedula'
                    name='cedula'
                    value={proveedor.cedula}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="correo">Correo</label>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Ingrese su correo'
                    id='correo'
                    name='correo'
                    value={proveedor.correo}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="numeroContacto">Número de Contacto</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Ingrese su número de contacto'
                    id='numeroContacto'
                    name='numeroContacto'
                    value={proveedor.numeroContacto}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="nit">NIT</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Ingrese su NIT'
                    id='nit'
                    name='nit'
                    value={proveedor.nit}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese su dirección'
                    id='direccion'
                    name='direccion'
                    value={proveedor.direccion}
                    onChange={onChange}
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

export default AgregarProveedor;