using System;
namespace Domain
{
    public class Task
    {
        public Guid Id {get; set;}
        public DateTime Date {get; set;}
        public string Title {get; set;}
        public string Body {get; set;}
    }
}