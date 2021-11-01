import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Posts from './components/DisplayPosts'
import Login from './components/Login'
import Register from './components/Register'
import {Cookies, CookiesProvider} from "react-cookie";
import {Component} from "react";
import {getUserInfo} from "./Functions";
import AddCategory from "./components/AddCategory";
import Categories from './components/CategoryList';
import UpdatePost from "./components/UpdatePost";
import DeletePost from "./components/DeletePost";
import AddPost from "./components/AddPost"
import PostDetail from "./components/PostDetail"


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            cookies: new Cookies()
        }
    }

    componentDidMount() {
        if (this.state.cookies.get("myToken")) {
            getUserInfo(this.state.cookies.get("myToken")).then((data) => {
                this.setState({
                    user: data
                })
            })
        }

    }

    logOut() {
        var cookies1 = new Cookies()
        cookies1.remove("myToken")
        window.location.reload(false);
    }

    render() {
        const auth = this.state.cookies.get("myToken")

        return (
            <CookiesProvider>


                <BrowserRouter>
                    <div className="App">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="">My Blog</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        {(auth) ? (
                                            <li className="nav-item">
                                                <a className="nav-link" href="/addpost">Add Post</a>
                                            </li>) : ''}
                                        {(auth) ? (
                                            <li className="nav-item">
                                                <a className="nav-link" href="/addCategory">Add Category</a>
                                            </li>) : ''}
                                        {(auth) ? (
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                                   role="button"
                                                   data-bs-toggle="dropdown" aria-expanded="false">
                                                    Profile
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                                    <li><a className="dropdown-item" href="">Edit Settings</a>
                                                    </li>

                                                    <li><a className="dropdown-item" href="">Show
                                                        Profile</a>
                                                    </li>

                                                    <li><a className="dropdown-item" href="">Edit
                                                        Profile</a>
                                                    </li>

                                                    <li><a className="dropdown-item" href="">Create
                                                        Profile</a>
                                                    </li>


                                                </ul>
                                            </li>) : ''}
                                        {(auth) ? (
                                            <li className="nav-item">

                                                <a className="nav-link" href="" onClick={this.logOut}>Logout</a>
                                            </li>) : ''}
                                        {(!auth) ? (
                                            <li className="nav-item">
                                                <a className="nav-link" href="/login">Login</a>
                                            </li>) : ''}
                                        {(!auth) ? (
                                            <li className="nav-item">
                                                <a className="nav-link" href="">Register</a>
                                            </li>) : ''}


                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                               role="button"
                                               data-bs-toggle="dropdown" aria-expanded="false">
                                                Category
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Categories />
                                            </ul>
                                        </li>

                                    </ul>
                                    <form className="d-flex" method="post" action="{% url 'search_post' %}">

                                        <input className="form-control me-2" type="search" placeholder="Search Post"
                                               aria-label="Search"
                                               name="search_target"/>
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">

                                            <a className="nav-link" href="#"></a>

                                            {(!auth) ? (<a className="nav-link" href="/login">Login</a>) :
                                                (<a className="nav-link">{this.state.user.username}</a>)}

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="container">
                            <br/>

                            <Route exact path="/" component={Posts} user={this.state.user}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/addCategory" component={AddCategory}/>
                            <Route exact path="/updatepost" component={UpdatePost}/>
                            <Route exact path="/deletepost" component={DeletePost}/>
                            <Route exact path="/addpost" component={AddPost}/>
                            <Route exact path="/displaypost" component={PostDetail}/>
                        </div>
                    </div>
                </BrowserRouter>

            </CookiesProvider>
        );
    }
}

export default App;
