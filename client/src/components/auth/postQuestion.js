import React,{Component} from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import isEmpty from '../../validation/is-empty'
import axios from 'axios'

class postQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      question:"",option1:"",option2:"",option3:"",option4:"",answer:"",explaination:"",
      error:{}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){

  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const newQuestion={
      question:this.state.question,answer:this.state.answer,option1:this.state.option1,option2:this.state.option2,option3:this.state.option3,option4:this.state.option4,explaination:this.state.explaination
    }
    axios.post('/api/question/add',newQuestion)
      .then(res=>{
          console.log(res.data);
          this.props.history.push('/dashboard');
      })
      .catch(err=>{throw(err)});
  }

  render(){
    const {error} = this.state;
    const options = [
      {label:'*Select what your position ',value:'0'},
      {label:'option1',value:'1'},
      {label:'option2',value:'2'},
      {label:'option3',value:'3'},
      {label:'option4',value:'4'}
    ];
    return(
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h4 className="display-4 text-center">CREATE YOUR PROFILE</h4>
              <small className="from-text text-muted">*required fields</small>

            <form onSubmit={this.onSubmit} className="form-group">
              <TextAreaFieldGroup name="question" placeholder="enter question here" value={this.state.question} onChange={this.onChange} error={error.question}/>

              <TextFieldGroup name="option1"
                placeholder="option1" value={this.state.option1} onChange={this.onChange} error={error.option1} />

              <TextFieldGroup name="option2"
                placeholder="option2" value={this.state.option2} onChange={this.onChange} error={error.option2}/>

              <TextFieldGroup name="option3"
                placeholder="option3" value={this.state.option3} onChange={this.onChange} error={error.option3}  />

              <TextFieldGroup name="option4"
                placeholder="option4" value={this.state.option4} onChange={this.onChange} error={error.option4} />


              <SelectListGroup name="answer" value={this.state.answer} onChange={this.onChange} error={error.answer} options={options}/>
              <TextFieldGroup name="explaination"
                  placeholder="explaination" value={this.state.explaination} onChange={this.onChange} error={error.explaination} />
              <br/>
              <button type="submit" className="btn btn-danger btn-block">Submit</button>

            </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}


export default postQuestion;
