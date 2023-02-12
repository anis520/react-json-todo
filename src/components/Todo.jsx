import React, { Component } from 'react'
import { FaThList,FaCircle,FaRegWindowClose, FaTrashRestoreAlt } from "react-icons/fa";
import { MdOutlineAddTask} from "react-icons/md";
import {BsPinFill} from "react-icons/bs";
import {BiLoaderCircle} from "react-icons/bi";
import {IoMdCloudDone} from "react-icons/io";
import {BsFillTrashFill} from "react-icons/bs";
import'./Todo.css'
import axios from 'axios';
export class Todo extends Component {

      constructor(props){


        super(props)
        this.state={

              todos:[],
              model:'',
              input:{
                title:'',
                status:'panding'
              }

        }
  

      }


componentDidMount=()=>{

axios.get('http://localhost:5000/todos').then((res)=>{
  console.log(res.data);
  this.setState((prevstate)=>({

  ...prevstate,todos:[...res.data]


  }))


})


}
handlemodel=()=>{



  this.setState((prevstate)=>({

    ...prevstate,model:'show'
  
  
    }))

}
handlemodelhide=()=>{



  this.setState((prevstate)=>({

    ...prevstate,model:''
  
  
    }))

}
handelinput=(e)=>{

this.setState((prevstate)=>({

...prevstate,
input:{
  ...prevstate.input,
  [e.target.name]:e.target.value
}


}))


}
handelinputsubmit=(e)=>{
e.preventDefault()
axios.post('http://localhost:5000/todos',this.state.input).then((res)=>{
console.log(res.data);
this.setState((prevstate)=>({

  ...prevstate,todos:[...prevstate.todos,res.data],model:'',input:{title:'',status:'panding'}


  }))



}).catch();



}
 
handeldelete=(id)=>{
console.log(id);
  axios.delete(`http://localhost:5000/todos/${id}`).then((res)=>{
    console.log(res.data);
    this.setState((prevstate)=>({
    
      ...prevstate,todos:[...prevstate.todos.filter((data) => data.id !== id)]
    
    
      }))
    
    
    
    }).catch();
    


}

// handel cancel

handeltocancel=(id,title)=>{


  axios.put(`http://localhost:5000/todos/${id}`,{'status':'cancel','title':title}).then((res)=>{
    console.log(res.data);
    this.setState((prevstate)=>({
      ...prevstate,todos:[res.data,...prevstate.todos.filter((data) => data.id !== id)]
 
    
    
      }))
    
    
    }).catch();
    



}

// handel panding

handelpanding=(id,title)=>{


  axios.put(`http://localhost:5000/todos/${id}`,{'status':'panding','title':title}).then((res)=>{
    console.log(res.data);
    this.setState((prevstate)=>({
      ...prevstate,todos:[res.data,...prevstate.todos.filter((data) => data.id !== id)]
 
    
    
      }))
    
    
    }).catch();
    



}

// handel complete

handelcomplete=(id,title)=>{


  axios.put(`http://localhost:5000/todos/${id}`,{'status':'complete','title':title}).then((res)=>{
    console.log(res.data);
    this.setState((prevstate)=>({
      ...prevstate,todos:[res.data,...prevstate.todos.filter((data) => data.id !== id)]
 
    
    
      }))
    
    
    }).catch();
    



}

  render() {
    const{todos,model,input}=this.state
    return (
      <div className='todo'> 
          <div className="left">

                <div className='head'>
                    <img src="https://scontent.fcgp3-1.fna.fbcdn.net/v/t39.30808-6/312822036_1607263369718310_8039182981695817415_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG5oslLaL5waRlREPx2xTL24lLRtBvcQ6DiUtG0G9xDoNdU5QdJlxz-0vBjeYihI4l0ohIHZXCXBnlOAzgAVIPt&_nc_ohc=HGO0PeQUSuoAX_PlMS8&_nc_ht=scontent.fcgp3-1.fna&oh=00_AfCELKct6KYYiyKsOaZP8WyTEk7uYN4mP9vGCE_OT6Ef8A&oe=63EE306C" alt="" />
                    <div className="s">
                        
                        <h4>Hello Anis</h4>
                         <p>Anisul hoque</p>
                        </div>   
                </div>
                    <div className="line"></div>
                <div className="body">
                    <p><span><FaThList></FaThList></span> Todo status </p>
                      
                      <div className="type">
                        <p className='s1'><span><FaCircle></FaCircle></span><span><BiLoaderCircle ></BiLoaderCircle></span> Panding</p>
                        <p className='s2'><span><FaCircle></FaCircle></span><span><IoMdCloudDone></IoMdCloudDone></span> Complete</p>
                        <p className='s3'><span><FaCircle></FaCircle></span><span><FaTrashRestoreAlt></FaTrashRestoreAlt></span> Cancel</p>
                      </div>
                
                </div>
                <div className="footer">
                        
                        <p onClick={this.handlemodel}><span><MdOutlineAddTask></MdOutlineAddTask></span>ADD</p>
                        
                        <div className={`model ${model}`}>
                          
                          
                          <div className="con">

                          <div className="head">
                          <p>Add todos</p>
                          <FaRegWindowClose className='cls' onClick={this.handlemodelhide}></FaRegWindowClose>
                          </div>     
                          <div className="body">
                            <form  onSubmit={this.handelinputsubmit} method="post" action="">


                            <label htmlFor="title">Name</label>
                            <input onChange={this.handelinput} name='title' value={input.title} type="text" id='title' />
                            <label htmlFor="status">Status</label>
                            <select  onChange={this.handelinput} name='status' value={input.status}    id="status" >
  <option value="panding">Panding</option>
  <option value="complete">Complete</option>
  <option value="cancel">Cancel</option>
 
</select>
<button  type='submit'>Save</button>
                            </form>
                          </div>

                          </div>
                          
                          
                          
                          
                          
                          
                          </div>
                        
                        
                        
                        
                        
                        

                </div>



          </div>
          <div className="right">



               <ul>

               {todos.map((item,index)=>{

               return(

                 <li key={index}><FaCircle className={item.status} ></FaCircle><BsPinFill></BsPinFill><p>{item.title}</p>
                 
                 
                 { item.status =='cancel'&& 
                 <>
                 <BiLoaderCircle   onClick={()=>this.handelpanding(item.id,item.title)}   className='todostatus'> </BiLoaderCircle>
                
                 <IoMdCloudDone   onClick={()=>this.handelcomplete(item.id,item.title)}  className='todostatus'></IoMdCloudDone>
                 <BsFillTrashFill onClick={()=>this.handeldelete(item.id)} className='todostatus'></BsFillTrashFill>
                 </>
               }
                 
                 { item.status =='panding'&& 
                 <>
             
                 <FaTrashRestoreAlt  onClick={()=>this.handeltocancel(item.id,item.title)}   className='todostatus'></FaTrashRestoreAlt>
                 <IoMdCloudDone   onClick={()=>this.handelcomplete(item.id,item.title)}  className='todostatus'></IoMdCloudDone>
                 

               
                
                
                 </>
               }
                 
                 { item.status =='complete'&& 
                 <>
                 <FaTrashRestoreAlt  onClick={()=>this.handeltocancel(item.id,item.title)}    className='todostatus'></FaTrashRestoreAlt>
                 <BiLoaderCircle    onClick={()=>this.handelpanding(item.id,item.title)}    className='todostatus'> </BiLoaderCircle>
                 
                 
                 
                 </>
               }
                 
                 
                 
                 </li>
                 
                 
                 )


               })}

   
               </ul>


          </div>

           
         
 


      </div>

           

    )
  }
}

export default Todo