import express from "express"
import blogueRouter from "./routes/blogue"
import {senderCheck} from "./middleware/common.middleware"
import {handleError, init, initEvents} from "./utils/common"
import {ErrorCodes} from "./utils/errorCodes"

const app = express()

app.use(express.json())
app.use(senderCheck)

app.use("/api", blogueRouter)
app.use((req, res) => {
    return handleError(ErrorCodes.POST_UNAVAILABLE, res, 404)
})

const port = process.env.PORT

init()

initEvents.once("go", () => {
    app.listen(port, () => {
        console.log(`> Ready on port ${port}`)
    })
})
