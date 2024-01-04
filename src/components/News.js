// /* eslint-disable no-undef */
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        // console.log("This is Constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1, 
            totalResults: 0
        }
        document.title = `${this.captializeFirstLetter(this.props.category)} - NEWSMonkey`;
    }
    captializeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsed = await data.json();
        this.props.setProgress(70);
        console.log(parsed);
        this.setState({
            articles: parsed.articles,
            totalResults: parsed.totalResults,
            loading: true
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // console.log("CDM");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7809ae670d074143b50912e7032c2ed8&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsed = await data.json();
        // console.log(parsed);
        // this.setState({articles: parsed.articles, 
        //     totalResults: parsed.totalResults,
        //     loading: false});
        this.updateNews();
    }

    handleNextClick = async () => {
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     console.log("Next");
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7809ae670d074143b50912e7032c2ed8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parsed = await data.json();
        //     // console.log(parsed);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsed.articles,
        //         loading: false
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }
    handlePrevClick = async () => {
        // console.log("Prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7809ae670d074143b50912e7032c2ed8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsed = await data.json();
        // console.log(parsed);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsed.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsed = await data.json();
        console.log(parsed);
        this.setState({
            articles: parsed.articles,
            totalResults: this.state.articles.concat(parsed.totalResults),
            // loading: false
        });
    }

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.captializeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                {/* <Spinner /> */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader=<Spinner/>
                    >
                        <div className="container">
                            <div className="row">
                                {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick} > &larr; Prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div> */}
            </>
        )
    }
}
