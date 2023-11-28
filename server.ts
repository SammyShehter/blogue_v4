import next from "next"
import createServer from "./api"
import {init, initEvents} from "./src/utils/common"

const port = process.env.PORT
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

init()

initEvents.once("go", () => {
    nextApp.prepare().then(() => {
        const server = createServer()

        server.all("*", (req, res) => {
            return handle(req, res)
        })

        server.listen(port, () => {
            console.log(`> Ready on port ${port}`)
        })
    })
})
