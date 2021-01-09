import React, { Component } from 'react';

class Counter extends Component {
    state = { 
        count: 1,
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

    render() { 
        return <React.Fragment>
            <div>
                { this.state.tags.length === 0 && 'Plase createa a new tag!'}
                {this.renderTags()}
            </div>
            </React.Fragment>;
    }

    
}
 
export default Counter;