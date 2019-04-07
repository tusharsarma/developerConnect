import React, { Component } from "react";
import {connect} from 'react-redux'
import {loginUser} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      errors:{}
    };
  }
  onChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.auth);
    if(nextProps.auth.isAuthenticated){
      this.props.history.push(`/question/${nextProps.auth.user.qindex}`);
    }else if(nextProps.error){
      this.setState({
        errors:nextProps.error.error
      })
    }
  }
  onSubmit=(e)=>{
    e.preventDefault();
    const userData={
      email:this.state.email,
      password:this.state.password
    }
    this.props.loginUser(userData);
  }
  render() {
    const {errors} = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup error={errors.email} placeholder="Email Address" value={this.state.email} onChange={this.onChange} name="email" />
                <TextFieldGroup type="password" error={errors.password} placeholder="Password" value={this.state.password} onChange={this.onChange} name="password" />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  error:state.error,
  auth:state.auth
})

export default connect(mapStateToProps,{loginUser})(Login);
