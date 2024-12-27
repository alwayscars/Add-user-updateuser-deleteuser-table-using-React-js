import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

 function App() {
  const[users,setusers]=useState([]);
  const[newname,setname]=useState("");
  const[newmail,setmail]=useState("");
  const[newweb,setweb]=useState("");
  useEffect(()=>{
           fetch('https://jsonplaceholder.typicode.com/users')
           .then((response)=>response.json())
           .then((json)=> setusers(json))
  },[])
  function Adduser(){     
    const name= newname.trim();
    const email=newmail.trim();
    const website=newweb.trim();    
    if(name && email && website){
      fetch("https://jsonplaceholder.typicode.com/users",
      {
        method: "POST",
        body : JSON.stringify({
          name,
          email,
          website
        }),
        headers:{
          "Content-Type":"application/json; charset=UTF-8"
        }
      }
    ).then((response)=> response.json())
    .then(data=>{
      setusers([...users, data]);
      window.alert("New data added")
    })
    }
    setname("");
    setmail("");
    setweb("");
  }
  function onchangehandler(id,key,value){
      setusers((users)=>{
           return users.map(user=>{
           return user.id=== id ? {...user,[key]:value } : user;
           })

      })
    }
  function updateuser(id){
    const user =users.find((user)=> user.id === id );
    fetch(`https://jsonplaceholder.typicode.com/users/10`,
      {
        method: "PUT",
        body : JSON.stringify(user),
        headers:{
          "Content-Type":"application/json; charset=UTF-8"
        }
      }
    ).then((response)=> response.json())
    .then(data=>{
      window.alert("Updated successfully");
    })
  }
  function deleteuser(id){
    const user =users.find((user)=> user.id === id );
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    ).then((response)=> response.json())
    .then(data=>{
      setusers((users)=> {
        return users.filter(user=> user.id!==id)
      }
      )
      window.alert("Deleted successfully");
    })
  }
  return (
    <div className="App">
      <table className='table'>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map(user=>
          <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td><input type='text'  onChange={e=>onchangehandler(user.id,'email',e.target.value)} value={user.email}></input></td>
          <td><input type='text'  onChange={e=>onchangehandler(user.id,'website',e.target.value)} value={user.website}></input></td>
          <td><button className='button2' onClick={()=>updateuser(user.id)}>Update</button><br/>
          &nbsp;
          <button className='button1' onClick={()=>deleteuser(user.id)}>Delete</button></td>
          </tr>
          )}
        </tbody>
        <tfoot> 
          <tr>
            <td></td>
            <td><input type='text' placeholder='Enter name...' value={newname} onChange={(e)=>setname(e.target.value)}></input></td>
            <td><input type='text' placeholder='Enter email...' value={newmail} onChange={(e)=>setmail(e.target.value)}></input></td>
            <td><input type='text' placeholder='Enter website...' value={newweb} onChange={(e)=>setweb(e.target.value)}></input></td>
            <td><button className='button3' onClick={Adduser}>Add user</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
