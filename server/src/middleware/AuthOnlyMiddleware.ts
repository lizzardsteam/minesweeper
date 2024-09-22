import { Request, Response, NextFunction } from "express"
import { serverConfig } from "../config/server"
import { validate as uuidValidate } from "uuid"
import { handleBadRequest } from "../utils/response"

const AuthOnlyRouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Check if auth cookie is valid.
    let authCookie = req.cookies[serverConfig.authCookieName]
    let isAuthCookieValid = uuidValidate(authCookie)

    if (!isAuthCookieValid) {
        handleBadRequest(res, 4, "Authenitaction required.")
        return
    } else {
        next()
    }
}

export default AuthOnlyRouteMiddleware
