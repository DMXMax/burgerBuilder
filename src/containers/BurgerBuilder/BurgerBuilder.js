import React, {Component} from 'react';
import Aux from '../../hoc/AuxFile';

class BurgerBuilder extends Component{
// eslint-disable-next-line
    constructor(props){
        super(props)
    }

    render(){
        return (<Aux>
            <div>Burger View</div>
            <div>Burger Controls</div>
        </Aux>);
    }
}

export default BurgerBuilder;

