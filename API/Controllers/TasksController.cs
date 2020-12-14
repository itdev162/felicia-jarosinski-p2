using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Tasks;
using System.Linq;
using Domain;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly DataContext context;
        public TasksController(DataContext context)
        {
            this.context = context;
        }

        ///<summary>
        ///GET api/todos
        ///</summary>
        ///<returns> A list of todos </returns>
        [HttpGet]
        public ActionResult<List<Todo>> Get()
        {
            return this.context.Tasks.ToList();
        }

        ///<summary>
        ///GET api/todos/[id]
        ///</summary>
        ///<param name="id">Todo id<param>
        ///<returns>A single todo of the given id</returns>
        [HttpGet("{id}")]
        public ActionResult<Todo> GetById(Guid id)
        {
            return this.context.Tasks.Find(id);
        }

        ///<summary>
        ///POST api/post
        ///</summary>
        ///<param name="request">JSON request w/ todo fields</param>
        ///<returns>A new todo</returns>

        [HttpPost]
        public ActionResult<Todo> Create([FromBody] Todo request)
        {
            var todo = new Todo
            {
                Id = request.Id,
                Title = request.Title,
                Body = request.Body,
                Date = request.Date
            };

            context.Tasks.Add(todo);
            var success = context.SaveChanges() > 0;

            if (success)
            {
                return todo;
            }

            throw new Exception("Error creating todo");
        }

        ///<summary>
        ///PUT api/put
        ///</summary>
        ///<param name="request">JSON request containing one or more updated Todo fields</param>
        ///<returns>An updated todo</returns>
        [HttpPut]

        public ActionResult<Todo> Update([FromBody] Todo request)
        {
            var post = context.Tasks.Find(request.Id);

            if (post == null)
            {
                throw new Exception("Could not find post!");
            }

            //update post
            post.Title = request.Title != null ? request.Title : post.Title;
            post.Body = request.Body != null ? request.Body : post.Body;
            post.Date = request.Date != null ? request.Date : post.Date;

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return Todo;
            }

            throw new Exception("Error updating todo");
        }
    }
    /* public async Task<ActionResult<List<Post>>> List()
    {
        return await this.mediator.Send(new List.Query());
    } */
}