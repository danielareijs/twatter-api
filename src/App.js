import React from 'react';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            tweets: [],
            isLoading: true
        }
    }
    componentDidMount(){
        fetch('http://localhost:3000/tweets')
        .then(res => res.json())
        .then(data => {
            this.setState({
                tweets: data,
                isLoading: false
            });
        })
    }

    render(){
        const tweets;
        if(this.state.tweets) {
            tweets = this.state.tweets.map(tweet => {
                return(
                <div>
                    <p>{tweet.name}({tweet.username})</p>
                    <h2>{tweet.message}</h2>
                </div>
                )
            })
        }

        console.log(tweets);
        return (
            <div>
                {this.state.isLoading && <p>Loading...</p>}
                {this.state.tweets && tweets}
            </div>
        )
    }
}

export default App;