import * as React from "react";

import axios from "axios"

//https://randomuser.me/api -- this is the API that we have to fetch using AXIOS
const {useState} = React
const {useEffect} = React



//************************* THIS IS WHERE WE CREATED A FUNCTION THAT FETCHES THE API ABOVE FOR DATA ****************************
const fetchRandomData = () =>{
 return axios.get('https://randomuser.me/api')
  .then(({data}) => {
    console.log(data);
    return data
})
  .catch(err =>{
    console.error(err) ;
  });
}

const getFullUserName = (userInfo)=>{
 const {name : {first,last}}= userInfo;
 return `${first} ${last}}`
}

function App() {
const [counter,setCounter]=useState(0); 
const [userInfos,setUserInfos]=useState([]);
const [randomUserDataJSON,setRandomUserDataJSON]= useState('');

useEffect(()=>{
       fetchRandomData().then(randomData=>{
        // After using useEffect to execute the fetchRandomData function,
        // we've then stored our data in the setRandomUserDataJSON and made it STRINGIFY  
       setRandomUserDataJSON(JSON.stringify(randomData,null,2) || 'No USER DATA');
       setUserInfos(randomData.results);
      })
    },[])

  return (
    <div className="App">
      <h1>Counter</h1>
      <p>{counter}</p>

      <button onClick={()=>{
        setCounter(counter+1)
      }}>Increase Counter</button>
     <div>
      {userInfos.map((userInfo, idx)=>(

        <div key={idx}>
        <p>{getFullUserName(userInfo)}</p>
        <img src={userInfo.picture.thumbnail}/>
        </div>

       ))}
</div>
      <pre>{randomUserDataJSON}</pre>

    </div>
  );
}

export default App;
