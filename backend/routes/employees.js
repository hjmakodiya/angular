const Employee = require('../model/employees')

module.exports = app => {
    app.get('/employee', async (req, res, next) => {
        try {
            const result = await Employee.find();
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.get('/employee/:id', async (req, res, next) => {
        try {
            const result = await Employee.findById(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.post('/employee', async (req, res, next) => {
        try {
            const result = await Employee.create(req.body);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })
    
    app.put('/employee/:id', async (req, res, next) => {
        try {
            const result = await Employee.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    });

    app.delete('/employee/:id', async (req, res, next) => {
        try {
            const result = await Employee.findByIdAndRemove(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    });
}
