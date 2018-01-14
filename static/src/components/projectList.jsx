import { Layout, Menu, Icon, Table } from 'antd';
const { Column } = Table;
const { Header, Content, Footer, Sider } = Layout;

// 默认表单数据
const data = [
    {
        key: '1',
        name: 'John',
        category: 'default',
        createTime: 'New York No. 1 Lake Park',
        }, {
        key: '2',
        name: 'Jim',
        category: 'default',
        createTime: 'London No. 1 Lake Park',
        }, {
        key: '3',
        name: 'Joe',
        category: 'default',
        createTime: 'Sidney No. 1 Lake Park',
    }
];
export default class ProjectList extends React.Component {
    render () {
        return (
            <div>
                <Table dataSource={data}>
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
                    render={(text, record) => {
                        return (
                            <span>
                                <a href="#">编辑</a>
                                <a href="#">查看</a>
                            </span>
                        )
                    }}
                    />
                </Table>
            </div>
        )
    }
}
