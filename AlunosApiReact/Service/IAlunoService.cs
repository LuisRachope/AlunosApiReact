using AlunosApiReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlunosApiReact.Service
{
    public interface IAlunoService
    {
        Task<IEnumerable<Aluno>> GetAll();
        Task<Aluno> GetById(int id);
        Task<IEnumerable<Aluno>> GetAlunosByNome(string nome);
        Task Insert(Aluno aluno);
        Task Update(Aluno aluno);
        Task Delete(Aluno aluno);
    }
}
