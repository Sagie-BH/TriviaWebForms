using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public sealed class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        
        static private DbContext Context = new TriviaEntities();
        private readonly DbSet<TEntity> entities;
        private Repository(DbContext context)
        {
            Context = context;
            entities = Context.Set<TEntity>();
        }
        private static readonly Repository<TEntity> instance = null;
        public static Repository<TEntity> Instance
        {
            get => instance ?? new Repository<TEntity>(Context);
        }

        public TEntity Get(string email)
        {
            return entities.Find(email);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return entities.ToList();
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return entities.Where(predicate);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return entities.SingleOrDefault(predicate);
        }

        public bool Add(TEntity entity)
        {
            try
            {
                entities.Add(entity);
                Context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public void Remove(TEntity entity)
        {
            entities.Remove(entity);
            Context.SaveChanges();
        }
    }
}
