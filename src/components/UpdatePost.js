import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {
    getAllCategories,
    getThePost,
    getUserInfo,
    updatePost,
} from "../Functions";
import {Cookies} from "react-cookie";
import ImageUploading from 'react-images-uploading';
import JoditEditor from "jodit-react";


function UpdatePost(props) {
    const location = new useLocation()
    const {postid} = location.state;
    const [allowToChange, setAllowToChange] = useState(null)
    const [title, setTitle] = useState('')
    const [header_image, setHeader_image] = useState('')
    const [title_tag, setTitle_tag] = useState('')
    const [snippet, setSnippet] = useState('')
    const [body, setBody] = useState('')
    const [auther, setAuther] = useState(0)
    const [category, setCategory] = useState(0)
    const [categories, setCategories] = useState(0)
    let cookies = new Cookies()
    const editor = useRef(null)
    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    useEffect(async () => {

        if (cookies.get('myToken')) {
            await getUserInfo(cookies.get("myToken")).then((data) => {
                setAuther(data.id)
                console.log("cookie: " + auther)
            })

            getThePost(postid).then((data) => {
                console.log(data.auther)


                if (data.auther == auther) {
                    setAllowToChange(true)
                } else {
                    setAllowToChange(false)
                }
                setTitle(data.title)
                setHeader_image(data.header_image)
                setTitle_tag(data.title_tag)
                setBody(data.body)
                setCategory(data.category)
                setSnippet(data.snippet)
            })

            getAllCategories().then((data) => {
                    console.log(data)
                    setCategories(data)
                }
            )

        }

    }, [allowToChange])

    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setHeader_image(imageList[0]);
    };

    const updatePostBtn = () => {
        var bodyText = document.getElementById("bodyEditor").value
        console.log(bodyText)
        updatePost(cookies.get("myToken"), postid, title, header_image, title_tag, snippet, bodyText, auther, category);
    }

    return (
        <div>
            {
                allowToChange && allowToChange ? (
                    <div>
                        <h1>Update Post</h1>
                        <div className="mb-3">
                            <label htmlFor={"title"} className={"form-label"}>Title</label>
                            <input type={"text"} className={"form-control"} id={"title"}
                                   value={title} onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <label htmlFor={"header_image"} className={"form-label"}>Header Image</label>
                        <img src={header_image} width={"50px"}/>
                        <div className="mb-3">
                            <ImageUploading
                                multiple
                                value={[header_image]}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                      imageList,
                                      onImageUpload,
                                      onImageRemoveAll,
                                      onImageUpdate,
                                      onImageRemove,
                                      isDragging,
                                      dragProps,
                                  }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper">
                                        <button
                                            style={isDragging ? {color: 'red'} : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            Click or Drop here
                                        </button>
                                        &nbsp;
                                        <button onClick={onImageRemoveAll}>Remove all images</button>
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                {/*<img src={image['data_url']} alt="" width="100"/>*/}
                                                <div className="image-item__btn-wrapper">
                                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"title_tag"} className={"form-label"}>Title Tag</label>
                            <input type={"text"} className={"form-control"} id={"title_tag"}
                                   value={title_tag} onChange={e => setTitle_tag(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"snippet"} className={"form-label"}>Snippet</label>
                            <input type={"text"} className={"form-control"} id={"snippet"}
                                   value={snippet} onChange={e => setSnippet(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"body"} className={"form-label"}>Body</label>
                            <JoditEditor id={'bodyEditor'}
                                         ref={editor}
                                         value={body}
                                         config={config}
                                         tabIndex={1} // tabIndex of textarea
                                // onBlur={newContent => setBody(newContent)} // preferred to use only this option to update the content for performance reasons
                                // onChange={newContent => {
                                //     setBody(newContent)
                                // }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"Category"} className={"form-label"}>Category</label>
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                {categories && categories.map(cat => {
                                        return (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        )
                                    }
                                )}
                            </select>
                        </div>
                        <button className={"btn btn-primary"} onClick={updatePostBtn}>Edit</button>
                    </div>
                ) : (<div>You are not allowed to use this page</div>)
            }
        </div>
    );
}

export default UpdatePost;
