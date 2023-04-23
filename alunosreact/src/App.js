import React, {useState, useEffect} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/cadastro.png';
//import { Modal } from 'bootstrap';

function App() {

  const baseUrl="https://localhost:44301/api/alunos";

  const [data, setData]=useState([]);

  const [modalIncluir, setModalIncluir]=useState(false);

  const [alunoSelecionado, setAlunoSelecinado]=useState(
    {
      id: '',
      nome: '',
      email: '',
      idade: ''
    })

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setAlunoSelecinado({
      ...alunoSelecionado,
      [name]: value
    });
    console.log(alunoSelecionado);
  }  
  
  const requestGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const requestPost=async()=>{
    delete alunoSelecionado.id;
    alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
      await axios.post(baseUrl, alunoSelecionado)
      .then(response=>{
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      }).catch(error=>{
        console.log(error);
      })
  }

  useEffect(()=>{
    requestGet();
  },[])

  return (
    <div className="aluno-container">
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro"></img>
        <button className="btn btn-success" onClick={()=>abrirFecharModalIncluir()}>Incluir Novo Aluno</button>
      </header>
        <table className="table table-bordered" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
        {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className="btn btn-primary">Editar</button> {" "}
                <button className="btn btn-danger">Excluir</button>
              </td>
             </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Alunos</ModalHeader>    
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br/>
            <input type="text" className="form-control" name="nome" onChange={handleChange}/>
            <label>Email: </label>
            <br/>
            <input type="text" className="form-control" name="email" onChange={handleChange}/>
            <label>Idade: </label>
            <br/>
            <input type="text" className="form-control" name="idade" onChange={handleChange}/>
          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>requestPost()}>Incluir</button>
          <button className="btn btn-danger" onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default App;