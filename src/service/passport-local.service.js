import bCrypt from 'bcrypt'
import userModel, { User } from '../models/users.model'
import { logger, errorLog } from './logger.service.js'

const LocalStrategy = passport_local.Strategy
const validatePassword = (user, password) => bCrypt.compareSync(password, user.password)
const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10))

const passportLocal = (app) => {

    passport.serializeUser((user, next) => {
        next(null, user._id)
    })

    passport.deserializeUser((id, next) => {
        userModel.findById(id, (err, user) => {
            next(err, user)
        })
    })

    passport.use('login',
        new LocalStrategy(
            {
                passReqToCallback: true
            },
            (req, username, password, next) => {
                userModel.findOne({ username: username }, (err, user) => {
                    if (err) return next(err)
                    if (!user) {
                        logger.info('Usuario no encontrado')
                        return next(null, false)
                    }
                    if (!validatePassword(user, password)) {
                        logger.info('Password inválida')
                        return next(null, false)
                    }
                    return next(null, user)
                })
            }
        )
    )

    passport.use('register',
        new LocalStrategy(
            {
                passReqToCallback: true
            },
            (req, username, next) => {
                const findOrCreateUser = () => {
                    userModel.findOne({ username: username }, (err, user) => {
                        if (err) {
                            errorLog.error(err)
                            return next(err)
                        }
                        if (user) {
                            logger.info('Usuario ya existe')
                            return next(null, false)
                        } else {
                            const { username, password, email, firstName, lastName, address, age, phone, avatar } = req.body
                            let newUser = new userModel()
                            newUser.username = username
                            newUser.password = createHash(password)
                            newUser.email = email
                            newUser.firstName = firstName
                            newUser.lastName = lastName
                            newUser.address = address
                            newUser.age = Number(age)
                            newUser.phone = phone
                            newUser.avatar = avatar
                            newUser.save((err) => {
                                if (err) {
                                    errorLog.error(err)
                                    throw err
                                }
                                logger.info('Usuario registrado')
                                return next(null, newUser)
                            })
                        }
                    })
                }
                process.nextTick(findOrCreateUser)
            }
        )
    )

    app.use(passport.initialize())
    app.use(passport.session())
}

export default passportLocal
