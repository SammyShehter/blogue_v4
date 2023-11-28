import mongoose, {Schema, SchemaTypes} from "mongoose"
import EventEmitter from "events"
import { Post } from "@/types/services/mongo.types"

class MongooseService {
    constructor() {
        console.log("MongooseService instance created")
    }

    private postSchema = new Schema<Post>(
        {
            content: {type: String, required: true, unique: true},
            author: {type: String, required: true},
            category: {type: String, required: true},
            slug: {type: String, required: true}
        },
        {timestamps: true, versionKey: false}
    )

    private postStorage = mongoose.model<Post>("posts", this.postSchema)

    connectWithRetry = (
        eventEmmiter: EventEmitter,
        count: number = 0,
        retryAttempt: number = 5,
        retrySeconds: number = 5
    ) => {
        if (count >= retryAttempt) {
            console.log("Connection to Mongo DB failed")
            process.exit(1)
        }
        console.log("Attemptin to connect to Mongo DB")
        mongoose
            .connect(process.env.MONGO_CONNECTION_STRING as string, {
                dbName: "blogue",
            })
            .then(() => {
                console.log("MongoDB is connected")
                eventEmmiter.emit("ready")
            })
            .catch(async (err) => {
                count++
                console.log(
                    `MongoDB connection failed, will retry ${count}/${retryAttempt} attempt after ${retrySeconds} seconds`,
                    err.message
                )
                setTimeout(
                    () => this.connectWithRetry(eventEmmiter, count),
                    retrySeconds * 1000
                )
            })
    }

    findPostsByAuthor = async (author: string): Promise<Array<Post>> => this.postStorage.find({author}, {_id: 0}).lean().exec()

    findPostsByCategories = async (category: string): Promise<Array<Post>> => this.postStorage.find({category}, {_id: 0}).lean().exec()

    getAllPosts = async (): Promise<Array<Post>> => this.postStorage.find({}, {_id: 0}).lean().exec()

    addUser = async (userFields: CreateUserDto): Promise<User> => {
        const instance = new this.userStorage({
            ...userFields,
        })
        await instance.save()
        return instance
    }

    findUserByEmail = async (email: string): Promise<User> => {
        return this.userStorage.findOne({email}).exec()
    }

    findUserByUsername = async (username: string): Promise<User> => {
        return this.userStorage.findOne({username}).exec()
    }
}

export default new MongooseService()
