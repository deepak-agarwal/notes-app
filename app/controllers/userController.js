
const { User } = require('../models/user')
const Profile = require('../models/profile')

//localhost:3005/users/register
module.exports.register = function (req, res) {
    const {skills,hobbies,username,email,password} = req.body
    const body = {username,email,password}
    const user = new User(body)
    user.save()
        .then((user) => {
            const userId = user._id
            const profile = new Profile({userId,skills,hobbies})
            profile.save()
            .then(profile=>{
                Profile.findById(profile._id).populate('userId')
                .then(user => {
                    res.json(user)
                })
            })
        })
        .catch((err) => {
            res.send(err)
        })
}
// private route
module.exports.account = (req, res) => {
    const { user } = req
    res.send(user)



}

module.exports.logout = function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send({ notice: 'successfully logged out' })
        })
        .catch((err) => {
            res.send(err)
        })
}
//login
module.exports.login = (req, res) => {
    const body = req.body
    const ip = req.ip

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            if (!user.ips.includes(ip)) {
                return user.generateToken()
            }
            else {
                res.json(user)
            }
        })
        .then((user) => {
            console.log('user  ', user)
            user.ips.push(ip)
            return user.save()
        })
        .then(user => {
            res.set('x-auth', user.tokens[user.tokens.length - 1].token).json(user)
        })
        .catch((err) => {
            res.send(err)
        })

}
