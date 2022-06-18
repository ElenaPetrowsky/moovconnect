

export const isChiffre = (variable)=> {
    let reg = /^\d{10}$/

    return reg.test(variable) ?  true : false
}

export const isLettre = (variable)=> {
    let reg = /^[a-zA-Z]*$/

    return reg.test(variable) ?  true : false
}

export const regNumPiece = (variable)=> {
    let reg = /[^a-zA-Z0-9]/

    return reg.test(variable) ?  true : false
}
