using AlunosApiReact.Models;
using AlunosApiReact.Models.View;
using AlunosApiReact.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlunosApiReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private IAlunoService _alunoService;

        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAlunoAll()
        {
            try
            {
                IEnumerable<Aluno> alunos = await _alunoService.GetAll();

                if (alunos is null)
                {
                    return BadRequest("Falha ao tentar trazer a listagem de alunos.");
                }

                return Ok(alunos);
            }
            catch (Exception)
            {
                return BadRequest("Request inválido.");
            }
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetAlunoById(int id)
        {
            try
            {
                Aluno aluno = await _alunoService.GetById(id);

                if (aluno is null)
                {
                    return BadRequest($"Falha ao tentar pesquiasar o aluno Id = {aluno.Id}.");
                }

                return Ok(aluno);
            }
            catch (Exception)
            {
                return BadRequest("Request inválido.");
            }
        }

        [HttpGet("AlunoPorNome")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunoByNome([FromQuery] string nome)
        {
            try
            {
                var alunos = await _alunoService.GetAlunosByNome(nome);

                if (alunos.Count() == 0)
                {
                    return NotFound($"Não existem alunos com o critério {nome}");
                }

                return Ok(alunos);
            }
            catch (Exception)
            {
                return BadRequest("Request inválido.");
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlunoViewModel viewModel)
        {
            try
            {
                Aluno aluno = new Aluno { Nome = viewModel.Nome, Email = viewModel.Email, Idade = viewModel.Idade };

                _alunoService.Insert(aluno);

                return Ok(viewModel);
            }
            catch (Exception)
            {
                return BadRequest("Request inválido.");
            }
        }

        [HttpPut("id")]
        public async Task<IActionResult> Update([FromBody] AlunoViewModel viewModel, int id)
        {
            try
            {
                Aluno aluno = await _alunoService.GetById(id);

                if (aluno is not null)
                {
                    aluno.Nome = viewModel.Nome;
                    aluno.Email = viewModel.Email;
                    aluno.Idade = viewModel.Idade;

                    await _alunoService.Update(aluno);

                    return Ok(viewModel);
                }

                return BadRequest("Falha ao tentar alterar o aluno.");
            }
            catch (Exception)
            {
                return BadRequest("Request inválido.");
            }
        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Aluno aluno = await _alunoService.GetById(id);

                if (aluno is not null)
                {
                    await _alunoService.Delete(aluno);

                    return Ok($"O Aluno: {aluno.Id} - {aluno.Nome} foi deletado com sucesso.");
                }

                return BadRequest("Falha ao tentar excluir o aluno.");
            }
            catch (Exception)
            {
                return BadRequest("Request inválido.");
            }
        }
    }
}
