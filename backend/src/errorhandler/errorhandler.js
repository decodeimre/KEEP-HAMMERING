

export const errorHandler = (error, req, res, next) => {

    if (error.status) {
        res.status(error.status).json({msg: error.message})
    }else {
        error.status = 444
        res.status(error.status).json({msg: error.message})
    }
}

export const notFound = (req, res, next) => {
    res.status(404).send({message: "Sorry, path not found"})
}