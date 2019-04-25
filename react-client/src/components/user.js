import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class User extends React.Component {
    state = {
        posts: [],
        user: '',
        text: '',
    }

    componentDidMount() {
        console.log(this.props.match)
        const id = this.props.match.params.id
        axios
        .get(`http://localhost:4000/api/users/${id}`)
        .then(res => {
          this.setState({
            user: res.data
          })
          console.log(this.state)
        })
        .catch(err => {
          console.log(err)
        })
    }


    fetchPosts = () => {
        const id = this.props.match.params.id
        axios
        .get(`http://localhost:4000/api/users/${id}/posts`)
        .then(res => {
          console.log(res)
          this.setState({
            posts: res.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    addPost = (e) => {
        e.preventDefault()
        axios
          .post(`http://localhost:4000/api/posts`, {name: this.state.text})
          .then(res => {
            console.log(res)
            this.fetchPosts();
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
          .delete(`http://localhost:4000/api/posts/${e.target.id}`)
          .then(res => {
            console.log(res)
            this.fetchPosts();
          })
          .catch(err => {
            console.log(err)
            this.getData();
          })
      }

    render() {
        return (
            <div>
                <Link to="/"><button>go back</button></Link>
                <h1>{this.state.user.name}</h1>
                <button onClick={this.fetchPosts} id={this.state.user.id}>Show Posts</button>
                   <form>
                   <input
                       type="text"
                       name="text"
                       placeholder="text"
                       value={this.state.text}
                       onChange={this.changeHandler}
                   />
                   <button onClick={this.addPost}>Add Post</button>
                    </form>
                {this.state.posts.map(post => (
                <div>
                   <h2>{post.text}</h2> 
                   <button onClick={this.addPost} id={post.id}>Add Post</button>
                   <button onClick={this.deletePost} id={post.id}>Delete Post</button>
               </div>
                ))}

            </div>
        )
    }
}

export default User;