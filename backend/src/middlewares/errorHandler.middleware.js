
export const errorHandler = (err, req, res, next) => {
    try {
        console.log(Object(err))
        const message = err.message
        const code = err.code || 500

        console.log(`Error: ${message}`)
        console.log(`Code: ${code}`)
        res.status(code).send(message)
    } catch (e) {
        console.log(e.message)
        res.status(404).send(e.message)
    }
}