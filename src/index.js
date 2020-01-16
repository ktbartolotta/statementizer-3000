import React from 'react';
import ReactDOM from 'react-dom';
import * as Random from 'random';
import * as Statements from './statementsAllDay';
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

class ViewStatementsSection extends React.Component {
    render() {
        return (
            <div>
                <h1>this is the view section.</h1>
                <textarea 
                    className="view-statments-textarea"
                    cols="75" rows="30"
                    value={this.props.statementContents}
                />
            </div>
        );
    }
}

class Statementizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statementIdList: [],
            selectedValue: '',
            statementContents: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="statementizer">
                <h1>this is the add section.</h1>
                <AddStatementsButton 
                    onClick={this.handleClick}/>
                <AddStatementsList
                    statementIdList={this.state.statementIdList}
                    handleChange={this.handleChange}
                />
                <ViewStatementsSection
                    statementContents={this.state.statementContents}
                />
            </div>
        );
    }

    async handleClick() {
        let statementIdList = this.state.statementIdList;
        // let newValue = Random.int(1, 1000);
        let newValue = await Statements.createStatement();
        this.setState({statementIdList: [...statementIdList, newValue]});
    }

    async handleChange(value) {
        this.setState({selectedValue: value});

        let newStatementContents = await Statements.getStatementById(value);
        // let newStatementContents = `${value} is the new statements contents.`
        this.setState({statementContents: newStatementContents});
        //alert(value);
    }
}


ReactDOM.render(
    <Statementizer />,
    document.getElementById('root')
);
