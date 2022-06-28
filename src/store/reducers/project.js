const initState = {
    // projects: [
    //     {
    //         id:1,name:'Pet Feeder',image:'Product-1.png',Price:20,discount:'2',
    //         discountPrice:20 - 2/100 * 20, quantity:10,
    //          des:" Assured Quality Product "




    //     },


    // ],
    project: {}
}




const projectReducer = (state = initState, action) => {
    switch (action.type) {

        case 'ADD_PROJECT':
            // const projects = action.payload
            // console.log(data)
            const data = action.payload


            return{
                    ...state, data
            }

                

            


        case 'PROJECT':

            const project = action.payload;
            // return action.payload
            return{...state,project:project}

           
           
          
           



        case 'DECREMENT':
            return state - 1;


        default:
            return state
    }
}
export default projectReducer