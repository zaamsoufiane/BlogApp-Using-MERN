exports.signupValidator = (req, res, next) => {
    req.check('username', 'Username is required !').notEmpty()
                                                   .isLength({min: 5})
                                                   .withMessage('Username must contain more than 5 Characters');
    
    req.check('password', 'Password is required !').notEmpty()
                         .isLength({min: 6})
                         .withMessage('Password must contain more than 6 Characters')

    const errors = req.validationErrors()

    if(errors){
        return res.status(400).json({message: errors[0].msg})
    }
     next()
}