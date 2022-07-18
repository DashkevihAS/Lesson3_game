import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: `Угадайте число от ${this.props.min} до ${this.props.max} `,
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * (this.props.max - this.props.min)) +
        this.props.min,
      count: 0,
      isWin: false,
      isReadOnly: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => {
      if (
        state.userNumber &&
        (state.userNumber <= this.props.max) &&
        (state.userNumber >= this.props.min)
      ) {
        return {
          count: state.count + 1};
      }
    });

    this.setState(state => {
      if (
        ((!state.userNumber ||
          (state.userNumber > this.props.max) ||
          (state.userNumber < this.props.min))) &&
          !state.isWin
      ) {
        return {
          result: `Число должно быть в диапазоне
          от ${this.props.min} до ${this.props.max} `,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше  загаданного`,
        };
      }

      if ((state.userNumber < state.randomNumber) && !state.isWin) {
        return {
          result: `${state.userNumber} меньше  загаданного`,
        };
      }

      if (state.isWin) {
        return {
          result: `Угадайте число от ${this.props.min} до ${this.props.max} `,
          randomNumber:
          Math.floor(Math.random() * (this.props.max - this.props.min)) +
          this.props.min,
          count: 0,
          isWin: false,
        };
      }

      return {
        result: `Вы угадали загаданное число ${state.userNumber}, 
        попыток: ${state.count} `,
        isWin: true,
      };
    });
    this.setState(() => ({
      userNumber: '',
    }));
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          {!this.state.isWin ?
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}
          /> :
          <input className={style.input} type='number' id='user_number' readOnly
            onChange={this.handleChange} value={this.state.userNumber}
          />
          }

          <button className={style.btn}>
            {!this.state.isWin ? 'Угадать' : 'Сыграть еще'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};
