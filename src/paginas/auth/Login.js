import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import APIInvoke from '../../configuracion/APIInvoke';

function Login() {
    const navigate = useNavigate();

    // Definimos el estado del componente
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        document.getElementById("email").focus();
    }, []);

    const IniciarSesion = async () => {
        if (password.length < 10) {
            const msg = "El password debe tener mínimo 10 caracteres";
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
        } else {
            const data = {
                email: usuario.email,
                password: usuario.password
            };
            const response = await APIInvoke.invokePOST('/api/auth', data);
            const mensaje = response.msg;
            if (mensaje === 'Usuario no encontrado' || mensaje === 'contraseña incorrecta') {
                const msg = 'No es posible iniciar sesión, valide sus datos';
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    button: {
                        confirm: {
                            text: 'OK',
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            } else {
                // Aquí vamos a obtener el token
                const jwt = response.token;

                // Guardar el token en el local storage
                localStorage.setItem('token', jwt);

                // Nos logueamos y nos dirigimos a la página home
                navigate('/home');
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        IniciarSesion();
    };

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to="#" style={{ fontWeight: 'bold' }}>Iniciar sesión</Link>
                </div>
                <div className='card'>
                    <div className='card-body login-card-body'>
                        <p className='login-box-msg'>Ingrese los datos para loguearse</p>
                        <form onSubmit={onSubmit}>

                            <div className='input-group mb-3'>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <div className='input-group-append'>
                                    <div className='input-group-text'>
                                        <span className='fas fa-envelope'/>
                                    </div>
                                </div>
                            </div>

                            <div className='input-group mb-3'>
                                <input
                                    type='password'
                                    className='form-control'
                                    placeholder='Contraseña'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                                <div className='input-group-append'>
                                    <div className='input-group-text'>
                                        <span className='fas fa-lock'/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='social-auth-links text-center mb-3'>
                                <button type='submit' className='btn btn-block btn-primary'>Ingresar</button>
                                <Link to="/registro" className='btn btn-block btn-danger'>Regristrarse</Link>
                            </div>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;