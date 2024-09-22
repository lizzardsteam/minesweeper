import { Board } from "../models/minesweeper/Board";
import User from "../models/users/User";

type userId = string
type sessionToken = string
const users: Map<string, User> = new Map()
const currentBoards: Map<userId, Board> = new Map()
const userSessions: Map<sessionToken, userId> = new Map()

export default {
    users,
    currentBoards,
    userSessions
}
