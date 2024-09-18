import { ResponseType, ResponseWriter } from "./ResponseWriter";

export const HttpStatus = {
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
    SUCCESS: 200
}

export function handleInternalError(): ResponseType<null> {
    return ResponseWriter.write(null, HttpStatus.INTERNAL_ERROR, "Inernal server error. Please try again in a couple of seconds!")
}

export function handleBadRequest(message: string): ResponseType<null> {
    return ResponseWriter.write(null, HttpStatus.BAD_REQUEST, message)
}

export function handleSuccess<DataType>(data: DataType, message: string): ResponseType<DataType> {
    return ResponseWriter.write(data, HttpStatus.SUCCESS, message)
}
