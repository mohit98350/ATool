export const add_project = (data) =>{
    return{
        type :'ADD_PROJECT',
        payload:data
    }
}

export const fetch_project = (data) =>{
    return{
        type :'PROJECT',
        payload:data
    }
}
export const dec = () =>{
    return{
        type :'DECREMENT'
    }
}