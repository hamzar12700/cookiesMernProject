function responseHandler(req,status , message, res){
return res.json({
    status : status,
    message : message
})
}

module.exports = responseHandler