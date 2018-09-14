import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxFile';

const withErrorHandler = (WrappedComponent, axios)=> {
  return class extends Component {
    state = {
      error: null,
    }

    errorConfirmedHandler=()=>{
      this.setState({error:null});
    }
      componentWillMount(){
        axios.interceptors.request.use(req=>{
          this.setState({error:null});
          return req;
        });
        axios.interceptors.response.use(res=>res, err=>{
          this.setState({error:err});     
        });
      }
    render() {
      return (
        <Aux >
          <div style={{textAlign:'center'}}>
          <Modal show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error? this.state.error.message:null} 
          </Modal>
          <WrappedComponent {...this.props} />
        </div>
        </Aux>
    );
    } 
  }
}

export default withErrorHandler;

