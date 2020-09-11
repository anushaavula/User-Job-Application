import React from 'react'
import axios from 'axios'
class Application extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            contact:'',
            job:'',
            experience:'',
            skills:''
        }
    }
    handleChange=(e)=>{
        this.setState({
           [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
       e.preventDefault()
       const formData={
           name:this.state.name,
           email:this.state.email,
           phone:this.state.contact,
           jobTitle:this.state.job,
           experience:this.state.experience,
           skills:this.state.skills
       }
       console.log(formData)
     axios.post('http://dct-application-form.herokuapp.com/users/application-form',formData)
           .then((response)=>{
                 //  console.log('resolve',response.data)
                console.log(response.data)
           }) 

           .catch((err)=>{
               console.log('reject',err)
           })
    }
    render(){
        return(
            <div>
                <h1>Applying for job</h1>
                <form onSubmit={this.handleSubmit}>
                    <lable htmlFor="name">Full name</lable>
                    <input type="text" id="name" value={this.state.name} name="name" onChange={this.handleChange}/><br/>
                    <lable htmlFor="email">Email address</lable>
                    <input type="text" id="email" value={this.state.email} name="email" onChange={this.handleChange}
                     placeholder="example@example.com"/><br/>
                    <lable htmlFor="contact">Contact number</lable>
                    <input type="text" id="contact" value={this.state.contact} name="contact" onChange={this.handleChange}
                    placeholder="+91 9988554344"/><br/>
                    <lable>Applying for job</lable>
                    <select value={this.state.job} name="job" onChange={this.handleChange}>
                          <option value="">--select--</option>
                          <option value="Front-End Developer">Front-End Developer</option>
                          <option value="Node.js Developer">Node.js Developer</option>
                          <option value="MEAN Stack Developer">MEAN Stack Developer</option>
                          <option value="FULL Stack Developer">FULL Stack Developer</option>
                    </select><br/>
                    <lable htmlFor="experience">Experience</lable>
                   <input type="text" value={this.state.experience} name="experience" onChange={this.handleChange}
                   placeholder="Experience (2years ,3 months)"/><br/>
                    <lable htmlFor="skills">Technical Skills</lable>
                    <textarea id="skills" value={this.state.skills} name="skills" onChange={this.handleChange} placeholder="Technical skills">
                    </textarea><br/>
                    <input type="submit" value="send Application"/>
                </form>
            </div>
        )
    }
}

export default Application