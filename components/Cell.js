import React, { Component } from 'react';
import Util from '../helpers/Util';

export default class Cell extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      correctValue: this.props.data.value,
      row: this.props.data.row,
      col: this.props.data.col,
      flag: false
    }
  }

  onChange(event) {
    const numbers = new RegExp("[0-9]");
    let value = parseInt(event.target.value, 10);
    if (this.props.data.activated && (numbers.test(value) || !value)) {
      if (!value) {
        value = '';
      }
      this.setState({value: value, flag: false});
      this.props.removeFlag({row: this.state.row, col: this.state.col});
      this.props.updateSudoku(value, {row: this.state.row, col: this.state.col});
    }
  }

  onDoubleClick(event) {
    if (this.props.data.value !== '') {
      if (!this.state.flag) {
        this.props.addFlag({row: this.state.row, col: this.state.col});
      } else {
        this.props.removeFlag({row: this.state.row, col: this.state.col});
      }
      this.setState({
        flag: !this.state.flag
      })
    } else if (this.props.data.value === '') {
      Util.message("It's empty.");
    }
  }

  render() {

    let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <td 
        className={
          "cell-block " + 
          (error ? 'error ' : '') + 
          (this.props.data.activated ? '' : 'prefilled ') +
          (this.state.flag ? 'flag' : '' )
        }>
        <input
          className="cell-input" 
          type="text" 
          value={this.props.data.value} 
          maxLength="1"
          disabled={!this.props.data.activated}
          onChange={e => this.onChange(e)} 
          onDoubleClick={e => this.onDoubleClick(e)} />
      </td>
    );
  }
}


