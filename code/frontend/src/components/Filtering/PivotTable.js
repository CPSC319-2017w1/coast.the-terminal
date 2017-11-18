/**
 * Created by steph on 2017-11-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import '../Filtering/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import items from '../Filtering/Data.js'

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables
  };
};

const Plot = createPlotlyComponent(window.Plotly);

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      // TODO - dispatch action to change isLoggedIn to false in state
      // Ideas: "<Welcome ${username}!> <Logout>"
    }
  };
};

const data = items;

class PivotTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pivotState: props };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pivotState: nextProps});
  }

  componentWillMount() {
    this.setState({
      mode: "demo",
      filename: "Contractor Data",
      pivotState: {
        data: items,
        rendererName: "Table",
        plotlyOptions: {width: 900, height: 500}
      }
    });
  }


  render() {
    return <PivotTableUI
      data={data} onChange={s => this.setState({pivotState: s})}
      renderers={Object.assign({}, TableRenderers, createPlotlyRenderers(Plot))}
      {...this.state.pivotState} unusedOrientationCutoff={Infinity}
    />;
  }
}

PivotTableContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired
};

const PivotTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(PivotTableContainer);

export default PivotTable;