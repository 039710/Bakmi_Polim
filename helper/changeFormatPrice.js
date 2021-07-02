const changeFormatPrice = (price) =>{
    return `IDR `+price.toLocaleString('id-ID')
}

module.exports = changeFormatPrice