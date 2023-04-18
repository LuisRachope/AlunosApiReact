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
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Aluno> alunos = await _alunoService.GetAll();

            if (alunos is null)
            {
                return BadRequest("Falha ao tentar trazer a listagem de alunos.");
            }

            return Ok(alunos);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetById(int id)
        {
            Aluno aluno = await _alunoService.GetById(id);

            if (aluno is null)
            {
                return BadRequest($"Falha ao tentar pesquiasar o aluno Id = {aluno.Id}.");
            }

            return Ok(aluno);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlunoViewModel viewModel)
        {
            Aluno aluno = new Aluno { Nome = viewModel.Nome, Email = viewModel.Email, Idade = viewModel.Idade };

            _alunoService.Insert(aluno);

            return Ok(viewModel);
        }

        [HttpPut("id")]
        public async Task<IActionResult> Update([FromBody] AlunoViewModel viewModel, int id)
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

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int id)
        {
            Aluno aluno = await _alunoService.GetById(id);

            if (aluno is not null)
            {
                await _alunoService.Delete(aluno);

                return Ok($"O Aluno: {aluno.Id} - {aluno.Nome} foi deletado com sucesso.");
            }

            return BadRequest("Falha ao tentar excluir o aluno.");
        }
    }
}
