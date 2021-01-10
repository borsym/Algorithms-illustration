import React, { Component } from 'react';

class Counter extends Component {
    state = { 
        value: this.props.value,
        tags: ['tag1', 'tag2', 'tag3']

    };

    styles = {
        fontSize: 50,
        fontWeight: 'bold'
    };

    renderTags() {
        if(this.state.tags.length === 0) return null;
        return <ul>{this.state.tags.map(tag => <li key={tag} >{ tag }</li>)} </ul>
    }

    handleIncrement = () => {
       this.setState( { count: this.state.value + 1})
    }; 

    render() { 
        //console.log('props', this.props)
        return <React.Fragment>
            <div>
                <p>{this.state.value}</p>
               <button onClick={this.handleIncrement} className="btn btn-secondary btn-sm">Increase</button>
            </div>
            </React.Fragment>;
    }

    
}
 
export default Counter;