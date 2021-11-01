import axios from 'axios';
import * as querystring from "querystring";
import {Cookies} from "react-cookie";


const BASE_URL = 'https://iscg7420simpleblogapi.herokuapp.com/';
// const BASE_URL = 'http://127.0.0.1:8000/';
export function getAllPosts(){
    let url = BASE_URL + 'api/posts/'
    return axios.get(url).then(response => response.data);
}

export function getThePost(postid){
    let url = BASE_URL + 'api/posts/' + postid + '/'
    return axios.get(url).then(response => response.data);
}

export function userLogin(username, password){
    let url = BASE_URL + 'auth/'
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    return axios.post(url, bodyFormData)
		.then(response => {
		    console.log(response.data.token)
            var cookies = new Cookies()
		    cookies.set('myToken', response.data.token)
            window.location.reload(false);
		})
		.catch(err => Promise.reject('Authentication Failed!'));
}

export function getUserInfo(token){
    let url = BASE_URL + 'api/getuser/'
    return axios.get(url, {headers: {
		'Authorization': 'Token '+token}}).then(response => response.data);
}

export function addCategory(name){
    let url = BASE_URL + 'api/categories/'
    return axios.post(url, {name:name})
		.then(response => {
		    alert(response.data.name+" has been added")
            window.location.reload(false);
		})
		.catch(err => Promise.reject('Add Category Failed!'));
}

export async function getAllCategories(){
    let url = BASE_URL + 'api/categories/'
    return await axios.get(url).then(response => response.data);
}

export function isMyPost(author, user){
    if (Object.keys(user).length !=0){
        return user.id == author
    }
    return false
}

export function updatePost(token, postid, title, header_image, title_tag,snippet, body, auther, category){
    let url = BASE_URL + 'api/posts/'+postid+'/'
    return axios.put(url, {
        "title": title,
        // "header_image": header_image,
        "title_tag": title_tag,
        "body": body,
        "snippet": snippet,
        "auther": auther,
        "category": category,
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
		    alert("Post Updated")
            window.location.href = "/";
		})
		.catch(err => Promise.reject('Edit Post Failed!'));
}

export function deletePost(token, postid){
    let url = BASE_URL + 'api/posts/'+postid+'/'

    return axios.delete(url, {headers: {
		'Authorization': 'Token '+token}}).
    then(response => {
         alert("Post Deleted")
    });
}

export function addPost(token, title, header_image, title_tag,snippet, body, auther, category){
    let url = BASE_URL + 'api/posts/'
    return axios.post(url, {
        "title": title,
        // "header_image": header_image,
        "title_tag": title_tag,
        "body": body,
        "snippet": snippet,
        "auther": auther,
        "category": category,
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
		    alert("Post Added")
            window.location.href = "/";
		})
		.catch(err => Promise.reject('Add Post Failed!'));
}

export function likePost(token, userID, postID){
    let url = BASE_URL + 'api/likepost/'
    return axios.patch(url, {
        "user_id":userID,
        "post_id":postID
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
            window.location.reload(false);
		})
		.catch(err => Promise.reject('Something wrong'));
}

export function disLikePost(token, userID, postID){
    let url = BASE_URL + 'api/dislikepost/'
    return axios.patch(url, {
        "user_id":userID,
        "post_id":postID
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
            window.location.reload(false);
		})
		.catch(err => Promise.reject('Something wrong'));
}