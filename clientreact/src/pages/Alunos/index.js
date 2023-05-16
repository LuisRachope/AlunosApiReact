import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

import logoCadastro from '../../assets/cadastro1.png';

import {FiXCircle, FiEdit, FiUserX} from 'react-icons/fi'

export default function Alunos() {

    return (
        <div className="aluno-container">
            <header>
               <img src={logoCadastro} alt="Cadastro" />
               <span>Bem-Vindo, <strong></strong>!</span>
               <Link className="button" to="/aluno/novo/0">Novo Aluno</Link>
               <button type="button" class="center-button">
                    <div class="icon-wrapper">
                        <FiXCircle size={45} color='#17202a'></FiXCircle>
                    </div>
               </button>
            </header>

            <form>
              <input type='text' placeholder='Nome'/>
              <button type='button' class='button'>
                  Filtrar aluno por nome (parcial)
              </button>
            </form>

            <h1>Relação de Alunos</h1>
            <ul> 
                <li>
                    <b>Nome:</b>Paulo<br/><br/>
                    <b>Email:</b>paulo@email.com<br/><br/>
                    <b>Idade:</b>22<br/><br/>
                    <button type="button">
                        <FiEdit size='25' color='#17202a'></FiEdit>
                    </button>

                    <button type="button"> 
                        <FiUserX size='25' color='#17202a'></FiUserX>
                    </button>
                </li>
            </ul>
            <br/>
            <ul>
                <li key='{aluno.id}'>
                <b>Nome:</b><br/><br/>
                <b>Email:</b><br/><br/>
                <b>Idade:</b><br/><br/>

                <button type="button"> 
                    <FiEdit size='25' color='#17202a'></FiEdit>
                </button>

                <button type="button"> 
                    <FiUserX size='25' color='#17202a'></FiUserX>
                </button>
               </li>
            </ul>
        </div>
     );
}