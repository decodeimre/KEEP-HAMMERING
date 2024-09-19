

export const errorHandler = (error, req, res, next) => {

    if (error.status) {
        console.log(error)
        res.status(error.status).json({msg: error.message, status: error.status})
    }else {
        console.log(error)
        error.status = 500
        res.status(error.status).json({msg: error.message, status: error.status})
    }
}

export const notFound = (req, res, next) => {
    const error = new Error ('path not found', req.originalUrl);
    error.status = 404;
    next(error)
}

