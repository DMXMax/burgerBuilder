import React, {Component} from 'react';
import Aux from '../../hoc/AuxFile';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{
// eslint-disable-next-line
    constructor(props){
        super(props)
    }

    render(){
        return (<Aux>
            <Burger/>
            <div>Burger Controls</div>
            
        </Aux>);
    }
}

export default BurgerBuilder;

