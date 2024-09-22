import { Board } from "../models/minesweeper/Board"
import User from "../models/users/User"

type userId = string
type cookieToken = string

/**
 * This is the users database. It shall remain in memory only until testing is complete
 * afterwards users will be moved into a SQLite database.
 */
const users: Map<string, User> = new Map()

/**
 * Current boards contains a single board for each user.
 * Only one board can be played at a time. This is why on game over
 * the old board should be saved in history and a new board should be
 * generated in it's place.
 */
const currentBoards: Map<userId, Board> = new Map()

// User tokens maps the cookie given to a user on login to the user id.
const userTokens: Map<cookieToken, userId> = new Map()

export default {
    users,
    currentBoards,
    userTokens
}
