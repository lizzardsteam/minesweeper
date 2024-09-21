import { ResponseWriter } from "./ResponseWriter"
import { Response } from "express"

export const HttpStatus = {
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    SERVICE_UNAVAILABLE: 503,
}

export function handleInternalError(res: Response): void {
    res.setHeader("Content-Type", "application/json")
    res.status(HttpStatus.INTERNAL_ERROR).json(ResponseWriter.write(null, 1, "Inernal server error. Please try again in a couple of seconds!"))
}

export function handleBadRequest(res: Response, errorCode: number, message: string): void {
    res.setHeader("Content-Type", "application/json")
    res.status(HttpStatus.BAD_REQUEST).json(ResponseWriter.write(null, errorCode, message))
}

export function handleSuccess<DataType>(res: Response, data: DataType, message: string): void {
    res.setHeader("Content-Type", "application/json")
    res.status(HttpStatus.SUCCESS).json(ResponseWriter.write(data, 0, message))
}
