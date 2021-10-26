export const getSelected = (obj: any): any => {
    return Object.keys(obj).reduce((object: any, el: any) => {
        if (typeof obj[el] === "string" || typeof obj[el] === "number") {
            if (obj[el]) {
                if (el === "gender") {
                    object = {
                        ...object,
                        [el]: obj[el] === "1" ? "male" : "female"
                    }
                } else if (el === "trafficProvider") {
                    object = {
                        ...object,
                        [el]: obj[el] === "1" ? "App" : obj[el] === "2" ? "Mobile" : "Cashier"
                    }
                } else {
                    object = {
                        ...object,
                        [el]: obj[el]
                    }
                }
            }
        } else {
            let res = {};
            for (let key in obj[el]) {
                if (obj[el][key]) {
                    if (key.includes("From")) {
                        res = {
                            ...res,
                            "from": obj[el][key]
                        }
                    } else if (key.includes("To")) {
                        res = {
                            ...res,
                            "to": obj[el][key]
                        }
                    } else {
                        res = {
                            ...res,
                            [key]: obj[el][key]
                        }
                    }
                }
            }
            object = {
                ...object,
                [el]: res
            }
        }
        return object
    }, {})
}


export const getListFromClients = (arr: any) => {
    return arr.map((el: any) => {
        const { firstName, lastName, image } = el
        return {
            name: firstName + " " + lastName,
            image
        }
    })
}