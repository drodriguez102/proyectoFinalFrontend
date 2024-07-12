import React, { Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import Login from "./paginas/auth/Login";
import Registro from "./paginas/auth/Registro";
import RutasProtegidas from './paginas/auth/RutasProtegidas';
import AgregarClientes from './paginas/modulos/AgregarClientes';
import EditarClientes from './paginas/modulos/EditarClientes';
import MostrarClientes from './paginas/modulos/MostrarClientes';
import MostrarProveedor from './paginas/modulos/MostrarProveedor';
import AgregarProveedor from './paginas/modulos/AgregarProveedor';
import EditarProveedor from './paginas/modulos/EditarProveedor';
import MostrarProductos from './paginas/modulos/MostrarProducto';
import EditarProducto from './paginas/modulos/EditarProducto';
import AgregarProductos from './paginas/modulos/AgregarProductos';


function App() {

  return (
    <div className="App">
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<Navigate to="/login" />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/registro' exact  element={<Registro />} />
            <Route path='/home' exact element={<RutasProtegidas element ={<Home />}/> }></Route>
            <Route path='/clientes' exact element={<RutasProtegidas element ={<MostrarClientes />}/>}></Route>
            <Route path='/clientes/agregar' exact element={<RutasProtegidas element ={<AgregarClientes />}/>}></Route>
            <Route path='/clientes/editar/:id' exact element={<RutasProtegidas element ={<EditarClientes />}/>} ></Route>
            <Route path='/proveedor' exact element={<RutasProtegidas element ={<MostrarProveedor />}/>}></Route>
            <Route path='/proveedor/agregar' exact element={<RutasProtegidas element ={<AgregarProveedor />}/>}></Route>
            <Route path='/proveedor/editar/:id' exact element={<RutasProtegidas element ={<EditarProveedor />}/>} ></Route>
            <Route path='/productos' exact element={<RutasProtegidas element ={<MostrarProductos />}/>}></Route>
            <Route path='/productos/agregar' exact element={<RutasProtegidas element ={<AgregarProductos />}/>}></Route>
            <Route path='/productos/editar/:id' exact element={<RutasProtegidas element ={<EditarProducto />}/>} ></Route>
            
          </Routes>
        </BrowserRouter>
      </Fragment>
    </div>
  );
}

export default App;
