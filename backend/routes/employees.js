const Employee = require('../model/employees')

module.exports = app => {
    app.get('/employee', async (req, res, next) => {
        try {
            //const result = await Employee.find();
            const result = await Employee.aggregate([
                {
                  $lookup: {
                    from: "departments", // collection name in db
                    localField: "department",
                    foreignField: "_id",
                    as: "department"
                  }
                }
            ])
            
            for (key in result) {
                result[key].salary = result[key].salary.toString();
                result[key].department = result[key].department[0].name;
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.get('/employee/:id', async (req, res, next) => {
        try {
            const result = await Employee.findById(req.params.id).lean();
            result.salary = result.salary.toString();
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
