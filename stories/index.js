import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { withContext} from 'recompose';

import Griddle from '../src/index';

import Cell from '../src/components/Cell';
import Row from '../src/components/Row';
import TableBody from '../src/components/TableBody';
import TableHeadingCell from '../src/components/TableHeadingCell';
import TableHeading from '../src/components/TableHeading';
import { Table } from '../src/components/Table';
import TableContainer from '../src/components/TableContainer';
import ColumnDefinition from '../src/components/ColumnDefinition';
import RowDefinition from '../src/components/RowDefinition';

import fakeData from './fakeData';

import LocalPlugin from '../src/plugins/local';

storiesOf('Griddle main', module)
  .add('with local', () => {
    return (
      <Griddle data={fakeData} plugins={[LocalPlugin]}>
        <RowDefinition>
          <ColumnDefinition id="name" order={2} />
          <ColumnDefinition id="state" order={1} />
        </RowDefinition>
      </Griddle>
    )
  })

storiesOf('Cell', module)
  .add('base cell', () => {
    const someValue = "hi from storybook"

    return <table>
      <tbody>
        <tr>
          <Cell value={someValue}
            className="someClass"
            style={{ fontSize: 20, color: "#FAB" }}
            onClick={() => console.log('clicked')}
            onMouseOver={() => console.log('mouse over')}
            onMouseOut={() => console.log('mouse out')}
          />
      </tr>
      </tbody>
    </table>
  });

storiesOf('Row', module)
  .add('base row', () => {
    const cells = [
      <td>One</td>,
      <td>Two</td>,
      <td>Three</td>
    ];

    return (
      <table>
        <tbody>
          <Row
            cells={cells}
            onClick={() => console.log('clicked')}
            onMouseOver={() => console.log('mouse over')}
            onMouseOut={() => console.log('mouse out')}
          />
        </tbody>
      </table>
    )
  })

storiesOf('TableBody', module)
  .add('base table body', () => {
    const rowIds = [1,2,3];

    const FakeRow = ({griddleKey}) => <tr><td>Row id: {griddleKey}</td></tr>;

    return (
      <table>
        <TableBody rowIds={rowIds} Row={FakeRow} />
      </table>
    )
  })

storiesOf('TableHeadingCell', module)
  .add('base table heading cell', () => {
    return (
      <table>
        <thead>
          <tr>
            <TableHeadingCell
              title="New Title"
              onClick={() => console.log('clicked')}
              onMouseOver={() => console.log('mouse over')}
              onMouseOut={() => console.log('mouse out')}
            />
          </tr>
        </thead>
      </table>
    )
  })

storiesOf('TableHeading', module)
  .add('base table heading', () => {
    const columnTitles = ['one', 'two', 'three'];

    return (
      <table>
        <TableHeading columnTitles={columnTitles} TableHeadingCell={TableHeadingCell} />
      </table>
    )
  })

storiesOf('Table', module)
  .add('base table', () => {
    const tableHeading = props => (
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
      </thead>
    );

    const tableBody = props => (
      <tbody>
        <tr>
          <td>uno</td>
          <td>dos</td>
          <td>tres</td>
        </tr>
      </tbody>
    );

    return (
      <Table
        TableHeading={tableHeading}
        TableBody={tableBody}
      />
    );
  })

storiesOf('TableContainer', module)
  .add('base', () => {
    const tableHeading = (props) => (
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
      </thead>
    );

    const tableBody = (props) => (
      <tbody>
        <tr>
          <td>uno</td>
          <td>dos</td>
          <td>tres</td>
        </tr>
      </tbody>
    );

    class BaseWithContext extends React.Component {
      static childContextTypes = {
        components: React.PropTypes.object.isRequired
      }

      getChildContext() {
        return {
          components: {
            TableBody: tableBody,
            TableHeading: tableHeading
          }
        };
      }

      render() {
        return (
          <div>
            {this.props.children}
          </div>
        );
      }
    }

    const TableComposed = TableContainer(Table);

    return (
      <BaseWithContext>
        <TableComposed />
      </BaseWithContext>
    );
  })
