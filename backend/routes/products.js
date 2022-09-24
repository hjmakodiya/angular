const Products = require("../model/products")
const fileupload = require("express-fileupload");
const generateUniqueId = require('generate-unique-id');
const { uploadFile, getFile, deleteFile } = require("../include/aws_operation")
const { AWS_PRODUCT_PATH, AWS_BASE_URL } = require("../include/config")

module.exports = app => {
    app.use(fileupload());

    app.post("/product", async (req, res, next) => {
        try {
            const payload = req.body;
            const { name, data } = req.files.image
            const { category } = req.body
            const productImagePath = AWS_PRODUCT_PATH + "/" + category + "/" + name

            payload.product_id = generateUniqueId({
                length: 5,
                useLetters: false
            });
            payload.image_url = productImagePath

            await uploadFile(productImagePath, data, app.awsPool)

            const result = await Products.create(payload)
            res.status(200)
                .json({ message: "Product Added Successfully", data: result })
        } catch (error) {
            next(error)
        }
    })

    app.put("/product/:product_id", async (req, res, next) => {
        try {
            const { product_id } = req.params
            const product = await Products.findOne({ product_id })
            if (!product) {
                throw { status: 401, message: "Product doesn't exist." }
            }

            const payload = req.body;
            if (req.files && req.files.image) {
                const { name, data } = req.files.image
                const { category } = req.body
                const productImagePath = AWS_PRODUCT_PATH + "/" + category + "/" + name

                if (productImagePath != product.image_url) {
                    payload.image_url = productImagePath
                    await deleteFile(product.image_url, app.awsPool) //delete old file
                    await uploadFile(productImagePath, data, app.awsPool) //upload new file
                }
            }

            const result = await Products.updateOne({ product_id }, req.body)
            res.status(200)
                .json({ message: "Product Updated Successfully", data: result })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/product/:product_id", async (req, res, next) => {
        try {
            const { product_id } = req.params
            const product = await Products.findOne({ product_id })
            if (!product) {
                throw { status: 401, message: "Product doesn't exist." }
            }

            await deleteFile(product.image_url, app.awsPool)

            const result = await Products.deleteOne({ product_id })
            res.status(200)
                .json({ message: "Product Deleted Successfully", data: result })
        } catch (error) {
            next(error)
        }
    })

    app.get("/product/:product_id", async (req, res, next) => {
        try {
            const { product_id } = req.params
            const result = await Products.findOne({ product_id }).lean()

            // const image = await getFile(result.image_url, app.awsPool)
            // console.log("image====>", image);

            // let buf = Buffer.from(image);
            // let base64 = buf.toString('base64');

            result.image_url = `${AWS_BASE_URL}/${result.image_url}`
            // console.log("result====>", result);

            res.status(200).json({ message: "Product By Id", data: result })
            //res.send(`<html><img src='${result.image_url}'/></html>`)
            //res.send(`<html><img src='https://hemali-demo-bucket.s3.ap-south-1.amazonaws.com/space-walk.jpg'/></html>`)
        } catch (error) {
            next(error)
        }
    })

    app.get("/product", async (req, res, next) => {
        try {
            let result = await Products.find().lean();
            result.forEach((r, index) => {
                result[index].image_url = `${AWS_BASE_URL}/${r.image_url}`
            })
            res.status(200)
                .json({ message: "Product List Successfully", data: result })
        } catch (error) {
            next(error)
        }
    })
}