import React from 'react';
import {Link, useParams} from 'react-router-dom';
import './styles.css';

import {FiCornerDownLeft, FiUserPlus} from 'react-icons/fi'

export default function NovoAluno() {

    const {alunoId} = useParams();

    return (
        <div className='novo-aluno-container'>
            <div className='content'>
                <section>
                    <FiUserPlus size={105} color='#17202a'/>
                    <h1>{alunoId === '0'? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className='back-link' to='/alunos'>
                        <FiCornerDownLeft size={25} color='#17202a'/>
                        Retornar
                    </Link>
                    <form>
                        <input placeholder='Nome'/>
                        <input placeholder='Email'/>
                        <input placeholder='Idade'/>
                        <button className='button' type='submit'>{alunoId === '0'? 'Incluir' : 'Atualizar'}</button>
                    </form>
                </section>
            </div>
        </div>
    )
}
