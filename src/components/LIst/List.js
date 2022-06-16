import React, { useEffect, useState } from 'react'


let ldata = []
const List = () => {
    const [l,setl] = useState([]);
    
    const Fetchlist = async () => {
        const token = localStorage.getItem('jwt')
        const res = await fetch(`http://localhost:1337/api/projects`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`

            }
        })
        const {data} = await res.json()
        console.log(data)
        ldata.push(...ldata,data)
        setl(prevArray => [...prevArray, {k:2}])
        console.log(l)

    }
    useEffect( async() => {
       await Fetchlist()
       setl(prevArray => [...prevArray, ...ldata])
        console.log(l)
    }, [])

    

    const tableRows=l.map(
        (element)=>{
            return( 
                
              <tr>
                <td>{element.id}</td>
                <td>{2}</td>
                <td>6</td>
              </tr>
                
            )
        }
    )
    return(
        <div>
            
          <table>
              <thead>
                <tr>    
                  <th> Name</th>
                  <th>Marks</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>      
              
        </div>
    )
}

export default List