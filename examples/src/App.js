import vis from 'vis/dist/vis-timeline-graph2d.min'
import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment-timezone'
import './App.css'

moment.tz.setDefault('UTC')

const groupsExample = {
  groups: [],
  items: [],
  options: {
    editable: {
      remove: true,
      updateTime: true,
    },
    groupOrder: 'content', // groupOrder can be a property name or a sorting function
    moment: function(date) {
      return vis.moment(date).utc()
    },
    max: moment(1000 * 60 * 60 * 5),
    min: moment(0),
    zoomMin: 1000 * 60 * 30,
    zoomMax: 1000 * 60 * 30,
  },
}

const now = moment(0)
  .hours(0)
  .minutes(0)
  .seconds(0)
  .milliseconds(0)
const groupCount = 3
const itemCount = 3

// create a data set with groups
const names = ['John', 'Alston', 'Lee', 'Grant']
for (let g = 0; g < groupCount; g++) {
  groupsExample.groups.push({ id: g, content: names[g] })
}

// create a dataset with items
for (let i = 0; i < itemCount; i++) {
  const start = now.clone().add(Math.floor(Math.random() * 60), 'seconds')
  const group = i
  groupsExample.items.push({
    id: i,
    group: group,
    content:
      'item ' +
      i +
      ' <span style="color:#97B0F8">(' +
      names[group] +
      ')</span>',
    start: start,
    end: start.clone().add(10, 'minutes'),
    type: 'range',
  })
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIds: [],
    }
  }

  render() {
    return (
      <div className="App">
        <Timeline
          {...groupsExample}
          clickHandler={this.clickHandler.bind(this)}
          selection={this.state.selectedIds}
        />
      </div>
    )
  }

  clickHandler(props) {
    const { group } = props
    const selectedIds = groupsExample.items
      .filter(item => item.group === group)
      .map(item => item.id)
    this.setState({
      selectedIds,
    })
  }
}

export default App
