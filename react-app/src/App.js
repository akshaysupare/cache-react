
import './App.css';
import { useState } from 'react';
import { useForm } from "react-hook-form"

function App() {
  var res = "Enter Key"
  var [value, setValue] = useState(res)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  
  const onSubmit = async (data) => {
    // console.log(data)    
  
    var key = String(data['key'])
    var val = String(data['val'])
    var expiry = String(data['expiry'])

    var url;
    var methodd 
    if ( val.length> 0 && expiry.length>0 ) {
      url = `http://localhost:9000/set_key?key=${key}&val=${val}&expiry=${expiry}`;
      methodd = "POST";
    } else {
      url = `http://localhost:9000/get_key?key=${key}`;
      methodd = "GET";
    }
    
    let response = await fetch(url, {
      method: methodd,
 
    })

    res = await response.text()    
   
    const getPayload = () => {
      setValue(res)
    };
    getPayload();  
    
  }

  return (
    <div className="App">
      <h2>Demo for Get/Set LRU Cache using React</h2>
      <form action='' onSubmit={handleSubmit(onSubmit)}>

        <label>Key : </label>
        <input type= 'text' placeholder='Enter key (required)'  {...register("key", {required:true})}></input>
        <br></br>
        <label>Value : </label>
        <input type='text' placeholder='Optional, for setting cache' {...register("val")}></input>
        <br></br>
        <label>Expiry : </label>
        <input type='text' placeholder='Optional, for setting cache' {...register("expiry")}></input>
        <tr></tr><br></br>
     
        {/* <button onClick={() => { setValue(value  + 2)}}  type='submit'>Set</button>  */}
      <button type='submit' > Submit </button>
      
        <br></br><hr></hr>
        <h3>Response </h3>
        {value}


      </form>
    </div>
  );
}

export default App;
