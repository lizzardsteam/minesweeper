import { Request } from "express"
import { Logger } from "pino";

export type RequestWithLogger = Request & { logger?: Logger<never, boolean> }
