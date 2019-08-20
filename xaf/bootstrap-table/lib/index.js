import TableRender from '@xaf/table-render'
import Table from './Table'
import TableBody from './TableBody'
import TableColumn from './TableColumn'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const BootstrapTable =({collection,headers,selectOne})=>{
    return(
    <TableRender
      selectOne={selectOne}
      headers ={headers}
      collection={collection}
      TableBody={TableBody}
      TableHeader={TableHeader}
      TableColumn={TableColumn}
      TableRow={TableRow}
      Table={Table}
      />)
}
export { BootstrapTable}