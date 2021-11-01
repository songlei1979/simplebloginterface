import React, {Component, Fragment} from 'react';
import {getAllCategories, getAllPosts} from "../Functions";

class CategoryList extends Component {

    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        getAllCategories().then((data) => {
            this.setState({
                categories: data
            })
        })
    }

    render() {
        return (
            <Fragment>
                {this.state.categories.map(category =>
                    <li><a className="dropdown-item" href="" key={category.id}>{category.name}</a>
                    </li>
                )}
            </Fragment>
        );
    }
}

export default CategoryList;