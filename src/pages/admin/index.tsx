import {GetServerSideProps} from "next"
import {parse} from "cookie"
import {hashString} from "@/utils/common"
import redisService from "@/services/redis.service"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = context.req.headers.cookie
        ? parse(context.req.headers.cookie)
        : {}
    const token = cookies.token

    const hashed = hashString(token)

    console.log(hashed)

    const answer = await redisService.get(`user:${hashed}`)

    console.log(answer)

    const validSession = answer

    if (!validSession) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }

    return {props: {validSession}}
}

export default function AdminPage({validSession}: any) {
    if (!validSession) {
        return <div>Access Denied</div>
    }

    return <div>Welcome to the Admin Page</div>
}
