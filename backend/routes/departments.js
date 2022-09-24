const Department = require('../model/departments')

module.exports = app => {
  app.get('/department', async (req, res, next) => {
    try {
      const result = await Department.find().sort({ create_date: -1 });
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  })

  app.get('/department/:id', async (req, res, next) => {
    try {
      const result = await Department.findById(req.params.id);
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  })

  app.post('/department', async (req, res, next) => {
    try {
      const result = await Department.create(req.body);
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  })

  app.put('/department/:id', async (req, res, next) => {
    try {
      const result = await Department.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  });

  app.delete('/department/:id', async (req, res, next) => {
    try {
      const result = await Department.findByIdAndRemove(req.params.id);
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  });
}
