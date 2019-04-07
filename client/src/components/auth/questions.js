import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Question extends Component {
  constructor(props){
    super(props);
    this.state={
      st:false,
      answer:"",
      correctanswer:"",
      question:"",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      explaination:""
    }
    this.onChange=this.onChange.bind(this);
    this.check=this.check.bind(this);
  }
  onChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.id
    })
  }
  componentDidMount(){
    axios.get(`/api/question/${this.props.match.params.index}`).then(res=>{
      res=res.data;
      //console.log("gggggg",res.err);
      if(res.err==-1)
      {
        this.props.history.push('/dashboard');
      }
      this.setState({
        st:true,
        question:res.question,
        option1:res.option1,
        option2:res.option2,
        option3:res.option3,
        option4:res.option4,
        correctanswer:res.answer,
        explaination:res.explaination
      })
      console.log(this.state);
    }).catch(err=>{
      console.log("eeeee",err);
    })
  }
  check=()=>{
    //console.log(thie.state.answer);
    if(this.state.answer!="" &&this.state.answer===this.state.correctanswer){
        this.props.history.push('/dashboard');
    }
  }

  render(){
    return(
      <div className="question">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.state.st?<div className="alert alert-success alert-dismissible fade show">
                <button className="close" data-dismiss="alert" type="button">&times;</button>
                <strong>Welcome!!</strong>
                <p className="lead text-center">Please answer a simple question to proceed further</p>
              </div>:""}
              <h1 className="display-4 text-center">Question : :-)</h1>
              <p className="lead text-center">Answer atleast one questions and proceed its easy!!!! </p>
              <h4 className="display-4 text-center">{this.state.question}</h4>
              <div className="custom-control custom-radio d-inline-block float-left m-4">
                <input type="radio" className="custom-control-input" value={this.state.option1} id="1" name="answer" onClick={this.onChange}/>
                <label className="custom-control-label" for="1">{this.state.option1}</label>
              </div>
              <div className="custom-control custom-radio d-inline-block float-left m-4">
                <input type="radio" className="custom-control-input" id="2" value={this.state.option2} name="answer"  onClick={this.onChange}/>
                <label className="custom-control-label" for="2">{this.state.option2}</label>
              </div>

              <div className="custom-control custom-radio d-inline-block float-left m-4">
                <input type="radio" className="custom-control-input" value={this.state.option3} id="3" name="answer"  onClick={this.onChange}/>
                <label className="custom-control-label" for="3">{this.state.option3}</label>
              </div>

              <div className="custom-control custom-radio d-inline-block float-left m-4">
                <input type="radio" className="custom-control-input" value={this.state.option4} id="4" name="answer"  onClick={this.onChange}/>
                <label className="custom-control-label" for="4">{this.state.option4}</label>
              </div>
              {this.state.answer===this.state.correctanswer&&this.state.answer!=""?
                <div className="text-center" style={{clear:"left"}}>
                  <h6>EXPLAINATION:</h6>
                  <p className="lead text-center p-3" style={{border:"1px solid blue", borderRadius:"5%"}}>{this.state.explaination}
                    <br/> <h6 className="text-center" style={{color:'blue'}}>You can now submit</h6>
                  </p>
                </div>:""}
                {this.state.answer!=this.state.correctanswer&&this.state.answer!=""?
                  <div className="text-center pt-2 pb-2 mb-2" style={{clear:"left",backgroundColor:"rgba(255,32,0,0.5)"}}>
                    <h6>WRONG</h6>
                  </div>:""}
                  {this.state.answer===this.state.correctanswer&&this.state.answer!=""?
                    <div>
                      <div className="text-center" style={{clear:"left"}}>
                        <button type="button" className="btn btn-primary p-2" style={{width:"30%"}} onClick={this.check}>Done</button>
                      </div>
                      <div className="text-center">
                      <Link to="/questions/add" className="btn btn-danger p-2 mt-3">Contribute by adding a question</Link>
                      </div>
                    </div>:""}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Question;
