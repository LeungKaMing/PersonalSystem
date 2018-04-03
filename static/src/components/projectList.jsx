import { Layout, Menu, Icon, Table } from 'antd';
const { Column } = Table;
const { Header, Content, Footer, Sider } = Layout;

export default class ProjectList extends React.Component {
    constructor (props) {
			super(props)
			this.state = {
				dataSource: []
			}
		}
		
		componentWillMount () {
			this.init()
		}

    render () {
			return (
				<div>
					<Table dataSource={this.state.dataSource}>
						<Column
							title="创建人"
							dataIndex="name"
							key="name"
						/>
						<Column
							title="类别"
							dataIndex="category"
							key="category"
						/>
						<Column
							title="创建时间"
							dataIndex="createTime"
							key="createTime"
						/>
						<Column
							title="操作"
							key="action"
							render={(record) => {
								return (
									<span>
											<a href="javascript:void(0);" style={{paddingRight: '20px'}} onClick={()=>this.goTo(record, 'view')}>查看</a>
											<a href="javascript:void(0);" style={{paddingRight: '20px'}} onClick={()=>this.goTo(record, 'edit')}>编辑</a>
											<a href="javascript:void(0);" style={{paddingRight: '20px'}} onClick={()=>this.goTo(record, 'delete')}>删除</a>
									</span>
								)
							}}
						/>
				</Table>
			</div>
		)
	}

	/**
	 * 初始化
	 */
	init () {
		// mock
		this.setState({
			dataSource: [
				{
					key: '1',
					name: 'John',
					category: 'default',
					createTime: 'New York No. 1 Lake Park'
				}, {
					key: '2',
					name: 'Jim',
					category: 'default',
					createTime: 'London No. 1 Lake Park'
				}, {
					key: '3',
					name: 'Joe',
					category: 'default',
					createTime: 'Sidney No. 1 Lake Park'
				}
			]
		})
	}

	/**
	 * 根据状态跳转相应页面
	 * @param {*} record 当前行信息
	 * @param {*} status 按钮状态
	 */
	goTo (record, status) {
		console.log(`当前状态是: ${status}`)
	}
}
