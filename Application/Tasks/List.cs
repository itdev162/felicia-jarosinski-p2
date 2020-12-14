using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tasks
{
    public class List
    {
        public class Query : IRequest<List<Todo>> { }

        public class Handler : IRequestHandler<Query, List<Todo>>
        {
            private readonly DataContext context;

            public Handler(DataContext context) => this.context = context;
            public Task<List<Todo>> Handle(Query request, CancellationToken cancellationToken)
            {
                return this.context.Tasks.ToListAsync();
            }
        }
    }
}