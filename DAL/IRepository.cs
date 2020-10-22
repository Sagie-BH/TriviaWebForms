using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace DAL
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Get(string identifier);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

        TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

        bool Add(TEntity entity);

        void Remove(TEntity entity);
    }
}
