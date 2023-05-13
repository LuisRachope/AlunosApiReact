import React from 'react';
import './styles.css'
import logoImagem from '../../assets/Login.png'

export default function Login(){
    return (
        <div className='login-container'>
            <section className='form'>

                <img src={logoImagem} alt='Login' id='img1'></img>
                <form>
                    <h1>Cadastro de Alunos</h1>
                    <input placeholder='Email'></input>
                    <input type='password' placeholder='Password'></input>
                    <button class='button' type='sumit'>Login</button>
                </form>

            </section>
        </div>
    );
}
