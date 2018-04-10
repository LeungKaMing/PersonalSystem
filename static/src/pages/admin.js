import ProjectList from '../components/projectList'
import AboutMe from '../components/aboutMe'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			renderElement: <div>欢迎来到个人系统</div>
		}
		this.menuClick = this.menuClick.bind(this)
	}
	componentWillMount () {
		// 去除登录页背景
		document.getElementsByTagName('canvas')[0].style.display = 'none'
	}

	menuClick (item) {
		if (item.key === '1') {
			// 菜单第一项为项目列表
			this.setState({
				renderElement: <ProjectList />
			})
		} else if (item.key === '2') {
			// 菜单第二项为个人简历
			this.setState({
				renderElement: <AboutMe />
			})
		} else if (item.key === '3') {
			// 菜单第三为博客
			this.setState({
				renderElement: <div>博客</div>
			})
		} else if (item.key === '4') {
			// 菜单第四为聊天室
			this.setState({
				renderElement: <div>聊天室</div>
			})
		} else if (item.key === '5') {
			// 菜单第五为拖拽系统
			this.setState({
				renderElement: <div>拖拽系统</div>
			})
		} else {
			this.setState({
				renderElement: <div>待定</div>
			})
		}
	}

	render () {
		return (
			<div>
				<Layout>
					<Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} collapsible>
						<Menu theme="dark" mode="inline" onClick={ (item) => {this.menuClick(item)} }>
							<Menu.Item key="1">
								<Icon type="user" />
								<span className="nav-text">项目列表</span>
							</Menu.Item>
							<Menu.Item key="2">
								<Icon type="video-camera" />
								<span className="nav-text">个人简历</span>
							</Menu.Item>
							<Menu.Item key="3">
								<Icon type="upload" />
								<span className="nav-text">博客</span>
							</Menu.Item>
							<Menu.Item key="4">
								<Icon type="bar-chart" />
								<span className="nav-text">聊天室</span>
							</Menu.Item>
							<Menu.Item key="5">
								<Icon type="cloud-o" />
								<span className="nav-text">拖拽系统</span>
							</Menu.Item>
							<Menu.Item key="6">
								<Icon type="clock-circle-o" />
								<span className="nav-text">待定</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout style={{ marginLeft: 200, background: '#fff' }}>
						{/* <Header style={{ background: '#fff', padding: 0 }} /> */}
						<Content>
							<div style={{ paddingLeft: 24, textAlign: 'center' }}>
								{ this.state.renderElement }
							</div>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
	}
}