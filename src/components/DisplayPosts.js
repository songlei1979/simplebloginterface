import React, {Component} from 'react';
import {deletePost, getAllPosts, getUserInfo, isMyPost} from "../Functions";
import {Cookies} from "react-cookie";
import {Link} from "react-router-dom";


class DisplayPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: {},
            cookies: new Cookies()
        }
    }

    componentDidMount() {
        getAllPosts().then((data) => {
            this.setState({
                posts: data
            })
        });
        if (this.state.cookies.get("myToken")) {
            getUserInfo(this.state.cookies.get("myToken")).then((data) => {
                this.setState({
                    user: data
                })
            })
        }
    }

    render() {
        return (

            <div>
                {this.state.posts.map(post =>
                    <div key={post.id}>
                        <p><Link to={{pathname:"/displaypost",
                                    state: {postid: post.id}}}
                                >{post.title}</Link> -
                            <a href={'#'}>{post.category}</a> -
                            {post.auther} - {post.post_date}</p>
                        <p>{post.snippet}</p>
                        {
                            isMyPost(post.auther, this.state.user) ? (
                                <Link to={{pathname:"/updatepost",
                                    state: {postid: post.id}}}
                                className={"btn btn-secondary"}
                                >Edit</Link>
                            ) : ("")

                        }
                        {
                            isMyPost(post.auther, this.state.user) ? (
                                <Link to={{pathname:"/deletepost",
                                    state: {postid: post.id}}}
                                className={"btn btn-danger"}
                                >Delete</Link>
                            ) : ("")

                        }
                        <br/>
                    </div>
                )}
            </div>
        );
    }
}

export default DisplayPosts;