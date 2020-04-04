import React, { Component } from 'react'
import './styles.css';

export default class LiveStream extends Component {

    state = {
        loading: true
    }

    async componentDidMount() {
        const url = "https://demo6238992.mockable.io/getVideoUrl";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ url: data.videoUrl, loading: false });
        this.startPolling();
    }

    startPolling() {
        setTimeout(async () => {
            const url = "http://demo9529061.mockable.io/getQuestions";
            const response = await fetch(url);
            const data = await response.json();
            // const data = {
            //     "isError": false,
            //     "success": {
            //         "data": {
            //             "showQuestion": true,
            //             "id": "1",
            //             "questions": [
            //                 {
            //                     "question": "How's it going?",
            //                     "answers": ["Great", "Awesome", "Not Interesting", "I can't understand"],
            //                     "correctAnswer": "Awesome"
            //                 }
            //             ]
            //         },
            //         "message": "Successfully Done!!"
            //     }
            // }
            this.setState({ questions: data.success.data.questions })
        }, 10000)
    }

    render() {

        return (
            <div>
                <div
                    className="title"
                >
                    <img
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
                        src={this.state.url}
                        className={"iframe"}
                        height="378"
                        width="620"
                        scrolling="no" /> :
                    <div><img className={"uc-spinner-real"} src="https://res.cloudinary.com/urbanclap/image/upload/v1484052239/web-assets/LogoUC.png" alt="Urban Company logo"></img></div>
                }
                {
                    this.state.questions ?
                        <div>
                            {this.state.questions.map(obj => (
                                <div className="ques-container">
                                    <div>Q. {obj.question}</div>
                                    <div className="ans-container">
                                        {obj.answers.map( ans => (
                                            <div className="ans">
                                                <input type="radio" id={ans} name={obj.question} value={ans} />
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




