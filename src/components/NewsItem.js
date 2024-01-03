/* eslint-disable react/style-prop-object */
import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
        <div className="my-3">
            {/* <div className="card" style={{width: "18rem"}}> */}
            <div className="card" >
                <img src={!imageUrl?"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw1eXkFXQVQfpVoaLMzBKVOK&ust=1703849355461000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPi4hNCDsoMDFQAAAAAdAAAAABAD":imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
                </div>
            </div>
        </div>
    )
  }
}
