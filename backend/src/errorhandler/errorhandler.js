

export const errorHandler = (error, req, res, next) => {

    if (error.status) {
        res.status(error.status).json({msg: error.message, status: error.status})
    }else {
        error.status = 500
        res.status(error.status).json({msg: error.message, status: error.status})
    }
}

export const notFound = (req, res, next) => {
    const error = new Error ('path not found');
    error.status = 404;
    next(error)
}