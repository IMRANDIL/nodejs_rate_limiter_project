

exports.exampleRateLimitController = async(req,res,next)=>{
    try {
        res.json({ message: 'Successfully accessed data.' });
    } catch (error) {
        console.error(error)
    }
}