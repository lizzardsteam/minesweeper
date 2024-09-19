import { version } from "../config/version"

export type ResponseType<DataType> = {
    errorCode: number
    message: string
    data: DataType
    version: string
}

export class ResponseWriter {
    public static write<DataType>(data: DataType, erroCode: number, message: string): ResponseType<DataType> {
        return {
            errorCode: erroCode,
            message: message,
            data: data,
            version: version
        }
    }
}
