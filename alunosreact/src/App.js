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
  const [modalEditar, setModalEditar]=useState(false);
  const [modalExcluir, setModalExcluir]=useState(false);
  const [updateData, setUpdateData]=useState(true);

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

  const abrirFecharModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir=()=>{
    setModalExcluir(!modalExcluir);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setAlunoSelecinado({
      ...alunoSelecionado,
      [name]: value
    });
    console.log(alunoSelecionado);
  }  
  
  const selecionarAluno=(aluno, opcao)=>{
    setAlunoSelecinado(aluno);
    (opcao === "Editar") ?
      abrirFecharModalEditar(): abrirFecharModalExcluir();
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
        setUpdateData(true);
      }).catch(error=>{
        console.log(error);
      })
  }

  const requestPut=async()=>{
    alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
    console.log(baseUrl+"/"+alunoSelecionado.id, alunoSelecionado)  
    await axios.put(baseUrl+"/id?id="+alunoSelecionado.id, alunoSelecionado)
      .then(response=>{
        var resposta=response.data;
        var dadosAuxiliar=data;
        dadosAuxiliar.map(aluno=>{
          if(aluno.id===alunoSelecionado.id){
            aluno.nome=resposta.name;
            aluno.email=resposta.email;
            aluno.idade=resposta.idade;
          }
        });
        abrirFecharModalEditar();
        setUpdateData(true);
      }).catch(error=>{
        console.log(error);
      })
  }

  const requestDelete=async()=>{
      await axios.delete(baseUrl+"/id?id="+alunoSelecionado.id, alunoSelecionado)
      .then(response=>{
        setData(data.filter(aluno=> aluno.id !== response.data));
          abrirFecharModalExcluir();
          setUpdateData(true);
      }).catch(error=>{
        console.log(error);
      })
  }
  
  useEffect(()=>{
    if(updateData){
      requestGet();
      setUpdateData(false);
    }
  },[updateData])

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
                <button className="btn btn-primary" onClick={()=>selecionarAluno(aluno, "Editar")}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={()=>selecionarAluno(aluno, "Excluir")}>Excluir</button>
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

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Alunos</ModalHeader>    
        <ModalBody>
          <div className="form-group">
            <label>ID: </label><br/>
            <input type="text" className="form-control" name="nome" readOnly
                   value={alunoSelecionado && alunoSelecionado.id}/>
            <label>Nome: </label><br/>
            <input type="text" className="form-control" name="nome" onChange={handleChange}
                   value={alunoSelecionado && alunoSelecionado.nome}/>
            <label>Email: </label><br/>
            <input type="text" className="form-control" name="email" onChange={handleChange}
                   value={alunoSelecionado && alunoSelecionado.email}/>
            <label>Idade: </label><br/>
            <input type="text" className="form-control" name="idade" onChange={handleChange}
                   value={alunoSelecionado && alunoSelecionado.idade}/>
          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>requestPut()}>Editar</button>
          <button className="btn btn-danger" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>

      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          <p>Deseja realmente excluir o(a) aluno(a) : {alunoSelecionado && alunoSelecionado.nome}?</p>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>requestDelete()}>Sim</button>
          <button className="btn btn-primary" onClick={()=>abrirFecharModalExcluir()}>Não</button>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default App;