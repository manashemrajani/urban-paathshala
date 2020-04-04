import React, { Component } from 'react'
import './styles.css';

export default class LiveStream extends Component {

    state = {
        loading: true,
        questionDisplay: false
    }

    async componentDidMount() {
        const url = "https://demo6238992.mockable.io/getVideoUrl";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ url: data.videoUrl, loading: false });
        this.startPolling();
    }

    valChanged = e => {
        const ans = e.target.value;
        this.postAnswer(ans);
    }


    async postAnswer(ans) {
        const url = "http://demo9529061.mockable.io/postAnswer";
        await fetch(url,{method: "post", body: JSON.stringify({chosenAnswer: ans, name: "manas"})});
        this.setState({ questionDisplay: false});
    }
    startPolling() {
        setInterval(async () => {
            const url = "http://demo9529061.mockable.io/getQuestions"; // amit wala
            // const url = "http://demo6238992.mockable.io/getQuestions"; // mera wala
            const response = await fetch(url);
            const data = await response.json();
            if(data.success.data.id !== this.state.id){
                this.setState({ questions: data.success.data.questions, id: data.success.data.id, questionDisplay: true })
            }
        }, 5000)
    }

    render() {

        return (
            <div>
                <div
                    className="title"
                >
                    <img
                        alt="Urban Company"
                        style={{ height: 60 }}
                        src="https://res.cloudinary.com/urbanclap/image/upload/fl_progressive:steep/v1488970821/categories/category_v2/category_30813ea0.png"
                    />
                    <div
                        className="heading"
                    >
                        Welcome to the LiveStream of Urban Company's - Paathshala
                    </div>
                </div>
                {!this.state.loading ?
                    <iframe
                        title="Live Streaming Content"
                        src={this.state.url}
                        className={"iframe"}
                        height="378"
                        width="620"
                        scrolling="no" /> :
                    <div><img className={"uc-spinner-real"} src="https://res.cloudinary.com/urbanclap/image/upload/v1484052239/web-assets/LogoUC.png" alt="Urban Company logo"></img></div>
                }
                {
                    this.state.questionDisplay && this.state.questions ?
                        <div>
                            {this.state.questions.map(obj => (
                                <div className="ques-container">
                                    <div>Q. {obj.question}</div>
                                    <div className="ans-container">
                                        {obj.answers.map( ans => (
                                            <div className="ans">
                                                <input onChange= {this.valChanged} type="radio" id={ans} name={obj.question} value={ans} />
                                                <label for={ans}>{ans}</label>                       
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div> : null
                }
            </div>
        )
    }
}




