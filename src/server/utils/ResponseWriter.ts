import { version } from "../config/version"

export type ResponseType<DataType> = {
    code: number
    message: string
    data: DataType
    version: string
}

export class ResponseWriter {
    public static write<DataType>(data: DataType, code: number, message: string): ResponseType<DataType> {
        return {
            code: code,
            message: message,
            data: data,
            version: version
        }
    }
}
