const sup = (req,res,next) => {
    console.log('we are in sup');
    console.log('req : ')
    next()
}

const how = () => {
    console.log('how')
}

module.exports = {sup,how}