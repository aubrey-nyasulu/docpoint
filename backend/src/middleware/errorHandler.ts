import errorResponse from '../lib/errorResponse'

type ExpressError = Error & {
    code?: number
    errors?: ThisType<Error>
    statusCode?: number
}

const errorHandler = (
    err: ExpressError,
    req: any,
    res: any,
    next: () => void
) => {
    let error: ExpressError = { ...err }
    error.message = err.message

    if (err.name === 'CastError') {
        const message = 'resource not found'
        error = new errorResponse(message, 404)
    }

    if (err.code === 11000) {
        const message = 'no duplicate username(s) or key(s) are allowed'
        error = new errorResponse(message, 401)
    }

    if (err.name === 'ValidationError') {
        const message = Object
            .values(err?.errors ?? {})
            .map(era => era.message).join(',')

        error = new errorResponse(message, 401)
    }

    res.status(error.statusCode || 500).json(
        { error: error.message || 'server error' }
    )
}

export default errorHandler