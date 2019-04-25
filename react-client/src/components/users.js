import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
class Users extends React.Component {
    state = {
        users: [],
        name: ''
    }

    componentDidMount() {
        axios
          .get('http://localhost:4000/api/users')
          .then(res => {
            this.setState({
              users: res.data
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    
      changeHandler = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
      }
    
      getData = () => {
        axios
          .get('http://localhost:4000/api/users')
          .then(res => {
            console.log(res)
            this.setState({
              users: res.data
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    
      addPost = (e) => {
        e.preventDefault()
        axios
          .post(`http://localhost:4000/api/users`, {name: this.state.name})
          .then(res => {
            console.log(res)
            this.getData();
          })
          .catch(err => {
            console.log(err)
          })
        this.setState({
          name: ''
        })
      }
    
      deletePost = (e) => {
        e.preventDefault()
        console.log(e.target.id)
    
        axios
          .delete(`http://localhost:4000/api/users/${e.target.id}`)
          .then(res => {
            console.log(res)
            this.getData();
          })
          .catch(err => {
            console.log(err)
            this.getData();
          })
      }
    
      updatePost = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        axios
          .put(`http://localhost:4000/api/users/${e.target.id}`, {name: this.state.name})
          .then(res => {
            console.log(res)
            this.getData()
          })
          .catch(err => console.log(err))
          this.setState({
            name: ''
          })
      }


    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.changeHandler}
                    />

                    <button onClick={this.addPost}>Add Post</button>
                </form>
                {this.state.users.map(user => (
                    <div>
                        <Link to={`api/users/${user.id}`}><h2>{user.name}</h2></Link>
                        <button onClick={this.deletePost} id={user.id}>Delete</button>
                        <button onClick={this.updatePost} id={user.id}>Update</button>
                    </div>
                ))}
            </div>
        )
    }
}

export default Users;