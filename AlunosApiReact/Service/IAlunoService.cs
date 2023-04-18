using System.Collections.Generic;
using System.Threading.Tasks;
using AlunosApiReact.Models;

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
