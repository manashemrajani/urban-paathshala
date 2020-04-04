import React, { Component } from 'react'
import ReactPlayer from "react-player";


export default class VideoPlayBack extends Component {
    
    state= {
        playing: true,
        currentIndex: 0
    }

    data = {
        questions: [
            {
                time: 1450,
                questionText: "How many times a day should you wash your hands a day?",
                questionId: 1,
                options: [
                    { key: "1", value: "1"},
                    { key: "2", value: "10"},
                    { key: "3", value: "100"}
                ]
            },
            {
                time: 1500,
                questionText: "How can you prevent the spread of corona virus?",
                questionId: 2,
                options: [
                    { key: "1", value: "Isolation"},
                    { key: "2", value: "Going to Jobs"},
                    { key: "3", value: "Eating Medicine at home"}
                ]
            },
            {
                time: 1550,
                questionText: "How does the corona virus spread?",
                questionId: 3,
                options: [
                    { key: "1", value: "Through Air you breath"},
                    { key: "2", value: "Through Surfaces"},
                    { key: "3", value: "By touching infected people"}
                ]
            }
        ]
    }

    setPlayerRef = (player) => {
        this.playerRef = player;
    };
    

    onPlaybackProgress = state => {
        console.log(state.playedSeconds);
        if(state.playedSeconds >= this.data.questions[this.state.currentIndex].time){
            this.setState({playing: false, displayQuestion: this.data.questions[this.state.currentIndex].questionText});
            if(this.state.currentIndex < this.data.questions.length- 1)
                this.setState({currentIndex: this.state.currentIndex+1});
                console.log(this.state.currentIndex);
                this.playerRef.seekTo(this.data.questions[this.state.currentIndex -1].time)
        }
    }

    render() {
        return (
            <div>
                <ReactPlayer
                    ref={this.setPlayerRef}
                    controls={false}
                    playing={this.state.playing}
                    onProgress={this.onPlaybackProgress}
                    progressInterval={1000}
                    width="300px"
                    height="300px" 
                    url="https://www.youtube.com/watch?v=ea4GxJIJUjU"/>            
                    {this.state.displayQuestion}
            </div>
        )
    }
}
