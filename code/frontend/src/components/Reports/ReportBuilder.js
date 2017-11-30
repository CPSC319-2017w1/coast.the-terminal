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
import { isLoading, hasStoppedLoading } from '../../actions/main-actions';
import { viewReportData } from '../../actions/report-info-actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables,
    reportData: state.reportData
  };
};

const Plot = createPlotlyComponent(window.Plotly);

const mapDispatchToProps = dispatch => {
  return {
    getData: (token) => {
      dispatch(isLoading());
      dispatch(viewReportData(token));
    },
    stopLoading: () => {
      dispatch(hasStoppedLoading());
    }
  };
};

class ReportBuilderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pivotState: props };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pivotState: nextProps});
    if (nextProps.reportData.data && nextProps.reportData.data.length > 0) {
      this.setState({pivotState: {
        data: nextProps.reportData.data,
        cols:["Working Month"],
        aggregatorName: "Count Unique Values", vals: ["Contractor Name"],
        rendererName: "Stacked Column Chart",
        plotlyOptions: {width: 900, height: 500}
      }});
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getData(this.props.user.token);
  }

  componentWillMount() {
    /**
     * set data for report here
     */
    this.setState({
      mode: "demo",
      filename: "Trending Reports",
      pivotState: {
        data: this.state.pivotState.data,
        cols: ["Working Month"],
        aggregatorName: "Count Unique Values", vals: ["Contractor Name"],
        rendererName: "Stacked Column Chart",
        plotlyOptions: {width: 900, height: 500}
      }
    });
  }

  render() {
    return <PivotTableUI
      data={this.state.pivotState.data} onChange={s => this.setState({pivotState: s})}
      renderers={Object.assign({}, TableRenderers, createPlotlyRenderers(Plot))}
      {...this.state.pivotState} unusedOrientationCutoff={Infinity}
    />;
  }
}

ReportBuilderContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  reportData: PropTypes.object.isRequired
};

const ReportBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportBuilderContainer);

export default ReportBuilder;