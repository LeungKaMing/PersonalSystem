/* 
	个人简历：
	1. 满足用户可编辑功能(前端实现)；
	2. 保存功能，预览功能，发布功能，草稿功能(后端实现)。其中预览为用gulp推送到服务器，发布为即用gulp推送到服务器又把简历下载到本地。；
*/
import { Row, Col, Avatar, Input, Button, Icon } from 'antd';
import { saveResume, getResume } from 'API'

export default class AboutMe extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			baseInfo: [],
			avatar: ''
		}
	}

	componentWillMount () {
		// console.log(CKEDITOR)
	}

	componentDidMount () {
		this.setState({
			avatar: 'https://avatars1.githubusercontent.com/u/18412359?s=460&v=4',
			baseInfo: [
				{
					name: 'name',
					text: '姓名',
					status: false
				}, {
					name: 'career',
					text: '职业',
					status: false
				}, {
					name: 'locate',
					text: '所在地',
					status: false
				}, {
					name: 'contact',
					text: '联系方式',
					status: false
				}
			]
		})
		window.CKEDITOR.replace('editorArea', {width: '500px', toolbar: 'Full'})
	}

	// 改变按钮状态
	changeStatus (per, perIndex, entire) {
		let container = []
		entire.map((item, index)=>{
			if (index !== perIndex) {
				// 非当前索引就统一改变其状态值为false
				item.status = false
				container.push(item)
			} else {
				// 当前索引的就判断状态开关
				if (!per.status) {
					per.status = true
				} else {
					per.status = false
				}
				// 放进容器
				container.push(per)
			}
		})
		// 触发render
		this.setState({
			baseInfo: container
		})
	}

	// 改变输入框值
	changeInputVal (per, perIndex, entire, e) {
		let container2 = []
		entire.map((item, index) => {
			// 非当前索引就不改变输入框值
			if (index !== perIndex) {
				container2.push(item)
			} else {
				per.name = e.target.value
				container2.push(per)
			}
		})
		// 触发render
		this.setState({
			baseInfo: container2
		})
	}

	// 保存用户个人简历
	save () {
		const self = this
		console.log('submit')
		saveResume({
			data: {
				userName: self.state.name,
				career: self.state.career,
				locate: self.state.locate,
				contact: self.state.contact
			},
			onSuccess (res) {
				console.log(res)
			},
			onFailure (err) {
				console.log(err)
			}
		})
	}

	render () {
		return (
			<div style={{marginTop: '10px', fontSize: '16px'}}>
				<Row>
					<Col span={6} style={{backgroundColor: '#254665'}}>
						{/* 个人信息 */}
						<div><img style={{paddingTop: '10px', width: '200px'}} src={ this.state.avatar } alt=""/></div>
						{/* 背景色 */}
						<div style={{padding: '0 10px', height: '100vh'}}>
							{
								this.state.baseInfo.map((item, index, entire) => {
									let element
									if (!item.status) {
										element = (
											<span style={{color: '#fff'}}>
												<span style={{display: 'inline-block', marginRight: '100px', width: '100px'}}>{item.name }</span>
												<button onClick={ this.changeStatus.bind(this, item, index, entire) }>编辑</button>
											</span>
										)
									} else {
										element = (
											<span>
												<input type="text" style={{display: 'inline-block', marginRight: '100px', width: '100px'}} value={ item.name } onChange={ this.changeInputVal.bind(this, item, index, entire) }/>
												<button style={{color: '#fff'}} onClick={ this.changeStatus.bind(this, item, index, entire) }>保存</button>
											</span>
										)
									}
									return (
										<div key={index} style={{paddingTop: '10px', textAlign: 'left'}}>
											<span style={{display: 'inline-block', paddingRight: '20px', width: '100px', color: '#fff'}}>{ item.text }: </span>
											{element}
										</div>
									) 
								})
							}
						</div>
					</Col>
					<Col span={18}>
						<div style={{ marginLeft: '250px' }}>
							<textarea id="editorArea" name="editorArea" rows="10" cols="80"></textarea>
						</div>
					</Col>
				</Row>
				{/* <div style={ {margin: '0 auto', textAlign: 'center'} } onClick={ this.save.bind(this) }>提交</div> */}
			</div>
		)
	}
}
