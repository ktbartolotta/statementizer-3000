import React from 'react';
import ReactDOM from 'react-dom';

import * as Random from 'random';

import './index.css';


class AddStatementsButton extends React.Component {
    render() {
        return (
            <div>
                <button 
                    className="add-statement-button"
                    onClick={this.props.onClick}
                >
                    Send Statment
                </button>
            </div>
        );
    }
}

class AddStatementsList extends React.Component {
    constructor(props) {
        super(props);

        this.onOptionSelect = this.onOptionSelect.bind(this);
    }

    render() {
        return (
            <div>
                <select 
                    className="add-statement-link-list"
                    size="10"
                    onChange={this.onOptionSelect}
                >
                    {this.getStatementOptions()}
                </select>

                
            </div>
        );
    }

    getStatementOptions() {
        let options = this.props.statementIdList;

        return options.map( (option) => {
            return <option
                key={option}
                value={option}
            >
                {option}
            </option>
        })
    }

    onOptionSelect(e) {
        this.props.handleChange(e.target.value)
    }
}

class AddStatementsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statementIdList: ['one', 'two', 'three', 'four'],
            selectValue: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    render() {
        return (
            <div className="add-statements-section">
                <h1>this is the add section.</h1>
                <AddStatementsButton 
                    onClick={this.handleClick}/>
                <AddStatementsList
                    statementIdList={this.state.statementIdList}
                    handleChange={this.handleChange}
                />
            </div>
        );
    }

    handleClick() {
        // alert(Random.int(1,500));
        let statementIdList = this.state.statementIdList;
        let newValue = Random.int(1, 1000);
        this.setState({statementIdList: [...statementIdList, newValue]});
    }

    handleChange(value) {
        this.setState({selectedValue: value});
        alert(value);
    }
}

class ViewStatementsSection extends React.Component {
    render() {
        return (
            <div>
                <h1>this is the view section.</h1>
                <textarea className="view-statments-textarea" cols="50" rows="30"/>
            </div>
        );
    }
}

class Statmentizer extends React.Component {
    render() {
        return (
            <div className="statementizer">
                <AddStatementsSection />
                <ViewStatementsSection />
            </div>
        );
    }
}


ReactDOM.render(
    <Statmentizer />,
    document.getElementById('root')
);
