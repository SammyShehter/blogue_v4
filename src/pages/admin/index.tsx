import {GetServerSideProps} from "next"
import {parse} from "cookie"
import {hashString} from "@/utils/common"
import redisService from "@/services/redis.service"
import { ErrorCodes } from "@/utils/errorCodes"

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const cookies = context.req.headers.cookie
            ? parse(context.req.headers.cookie)
            : {}
        const token = cookies.token
        if (!token) {
            throw ErrorCodes.TOKEN_ABSENT
        }
        const hashed = hashString(token)
        const validSession = await redisService.get(`user:${hashed}`)
        if(!validSession) {
            throw ErrorCodes.USER_NOT_FOUND
        }
        return {props: {validSession}}
    } catch (error) {
        console.log("admin.getServerSideProps", error)
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }
}

export default function AdminPage({validSession}: any) {
    return <div>Welcome to the Admin Page</div>
}
