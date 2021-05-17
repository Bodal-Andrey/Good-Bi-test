import React from "react";
import { connect } from "react-redux";
import { Operation } from "./reducer.js";
import getGender from "./selectors.js";

const withAddName = (Component) => {
  class WithAddName extends React.PureComponent {

    state = {
      name: ``,
    };

    onChange(evt) {
      this.setState({
        name: evt.target.value
      });
    }

    onSubmitForm() {
      const { loadName } = this.props;
      const { name } = this.state;

      loadName(name);
      
      this.clearState();
    }

    clearState() {
      this.setState({name: ``});
    }

    render() {
      const { gender } = this.props;
      return (
        <Component
          {...this.props}
          onSubmitForm={this.onSubmitForm.bind(this)}
          onChange={this.onChange.bind(this)}
          gender={gender}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    gender: getGender(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    loadName: (name) => dispatch(Operation.loadName(name)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAddName);
};

export default withAddName;
