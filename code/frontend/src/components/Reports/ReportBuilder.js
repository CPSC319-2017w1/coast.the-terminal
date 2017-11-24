/**
 * Created by steph on 2017-11-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import TableRenderers from 'react-pivottable/TableRenderers';
import {reportinfo} from '../Filtering/Data.js';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables
  };
};

const Plot = createPlotlyComponent(window.Plotly);

const mapDispatchToProps = dispatch => {
  return {

  };
};

const data = reportinfo;

class ReportBuilderContainer extends React.Component {
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
      filename: "Trending Reports",
      pivotState: {
        data: reportinfo,
        cols:["Working Month"],
        aggregatorName: "Count Unique Values", vals: ["Contractor Name"],
        rendererName: "Stacked Column Chart",
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

ReportBuilderContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired
};

const ReportBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportBuilderContainer);

export default ReportBuilder;