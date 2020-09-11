import React from 'react'
import moment from 'moment'
import axios from 'axios'
class Dashboard extends React.Component{
    constructor(){
        super()
        this.state={
            candidates:[],
            jobTitles:['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer'],
            selectedJob:'Front-End Developer'
        }
    }
    componentDidMount(){
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
             .then((response)=>{
                 const candidates=response.data
                 this.setState({candidates})
             }) 
             .catch((err)=>{
                 console.log(err)
             })       
    }
    handleTitle=(title)=>{
              this.setState({selectedJob:title})
    }
    handleViewDetails=(id)=>{
         axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
         .then((response)=>{
            // console.log(response.data)
            const candidate=response.data
            alert(`${candidate.name},${candidate.email},${candidate.phone}`)
         })
    }
    handleStatus=(id,status)=>{
         axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{status})
              .then((response)=>{
             // console.log(response.data)
             const candidate=response.data
             this.setState(prevState=>({
                 candidates:prevState.candidates.map(cand=>{
                     if(cand._id===candidate._id){
                         return {candidate}
                     }else{
                         return {cand}
                     }
                 })
             }))
              })
              .catch((err)=>{
                  console.log(err)
              })
    }
     render(){
         return(
             <div>
                 <h1>Admin Dashboard</h1>
                
                 {
                     this.state.jobTitles.map((title)=>{
                         return <button onClick={()=> {this.handleTitle(title)}}>{title}</button>
                     })
                 }<br/>
                {/*
                 <button onClick={()=>{
                     this.handleTitle('Front-End Developer')
                 }}>Front-End Developer</button>
                 <button onClick={()=>{
                     this.handleTitle('Node.js Developer')
                 }}>Node.js Developer</button>
                 <button onClick={()=>{
                     this.handleTitle('MEAN Stack Developer')
                 }}>MEAN Stack Developer</button>
                 <button onClick={()=>{
                     this.handleTitle('FULL Stack Developer')
                 }}>FULL Stack Developer</button><br/>
                */}
                 {this.state.selectedJob}
                 <p>list of candidates applied for {this.state.selectedJob}job</p>
                 <table>
                     <thead>
                         <tr>
                             <th>name</th>
                             <th>Technical skills</th>
                             <th>experience</th>
                             <th>applied Data</th>
                             <th>View Details</th>
                             <th>update Application Status</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                             this.state.candidates.filter(candidate=>candidate.jobTitle===this.state.selectedJob).map(candidate=>{
                                 return(
                                     <tr>
                                         <td>{candidate.name}</td>
                                         <td>{candidate.skills}</td>
                                         <td>{candidate.experience}</td>
                                         <td>{moment(candidate.createdAt).format("MM/DD/YYYY")}</td>
                                         <td><button onClick={()=>{
                                             this.handleViewDetails(candidate._id)
                                         }}>view Details</button></td>
                                         <td>
                                             
                                             {candidate.status ==='applied'?(
                                                 <div>
                                                     <button onClick={()=>{
                                                         this.handleStatus(candidate._id,'shortListed')
                                                     }}>shortList</button>
                                             <button onClick={()=>{
                                                 this.handleStatus(candidate._id,'rejected')
                                             }}>reject</button>
                                                 </div>
                                             ):(
                                                 <button>{candidate.status}</button>
                                             )
                                            }
                                             
                                             </td>
                                         
                                     </tr>
                                 )
                             })
                         }
                     </tbody>
                 </table>
             </div>
         )
     }
             
}
export default Dashboard