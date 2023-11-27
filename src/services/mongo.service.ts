import mongoose, {Schema, SchemaTypes} from "mongoose"
import EventEmitter from "events"

class MongooseService {
    constructor() {
        console.log("MongooseService instance created")
    }

    private userSchema = new Schema<Post>(
        {
            content: {type: String, required: true, unique: true}
        },
        {timestamps: true, versionKey: false}
    )

    private userStorage = mongoose.model<User>("users", this.userSchema)

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
            .connect(process.env.MONGO_CONNECTION_STRING, {
                dbName: "auth",
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

    findRole = async (value: string): Promise<Role> => {
        const res = await this.roleStorage.findOne({value}, {value: 0}).exec()
        return res
    }

    findRoleById = async (_id: string): Promise<Role> => {
        return this.roleStorage.findOne({_id}, {_id: 0}).exec()
    }

    getAllUsers = async (): Promise<ParsedUsers> => {
        return this.userStorage.find({}, {_id: 0, password: 0}).populate({path: "role", select: "value -_id"}).lean()
    }

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
