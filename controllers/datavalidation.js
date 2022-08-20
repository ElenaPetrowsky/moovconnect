import axios from "axios"

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


export const sendMessage = (phone, message)=> {
    const AuthToken = process.env.MESSAGE_AUTH_TOKEN
    const url = "https://api.letexto.com/v1/campaigns"
    const header = {
        "Authorization": "Bearer " + AuthToken,
        "Content-Type": "application/json"
    }
    const body = {
        step:null,
        sender:"INPHB TEAM",
        name:"MoovConnect",
        campaignType:"SIMPLE",
        recipientSource:"CUSTOM",
        groupId:null,
        filename:null,
        saveAsModel:false,
        destination:"NAT_INTER",
        message:`${message}`,
        emailText:null,
        recipients:[{"phone":`225${phone}`}],
        sendAt:[],
        dlrUrl:"http://dlr.my.domain.com",responseUrl:"http://res.my.domain.com"
    }
    axios
    .post(url, body, {headers:header})
    .then(res => {
        let id = res.data.id
        let url = `https://api.letexto.com/v1/campaigns/${id}/schedules`
        axios.post(url,{},{headers:header})
            .then(res => {
                console.log(res.data)
            })
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
    })
    .catch(error => {
        console.error(error);
    });
}