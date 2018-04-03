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
			avatar: '',
			// 简历编辑项
			nameEdit: false,
			name: '你的名字',
			careerEdit: false,
			career: '你的职业',
			locateEdit: false,
			locate: '你的所在地',
			contactEdit: false,
			contact: '你的联系方式'
		}
	}

	componentWillMount () {
		this.setState({
			avatar: 'https://avatars1.githubusercontent.com/u/18412359?s=460&v=4',
			baseInfo: [
				{
					name: 'name',
					text: '姓名'
				}, {
					name: 'career',
					text: '职业'
				}, {
					name: 'locate',
					text: '所在地'
				}, {
					name: 'contact',
					text: '联系方式'
				}
			]
		})
	}

	// 实时改变对应字段的值
	changeItem (name, e) {
		this.setState({
			[name]: e.target.value
		})
	}

	// 实时改变对应字段的状态
	changeEdit (edit) {
		if (!this.state[edit]) {
			this.setState({
				[edit]: true
			})
		} else {
			this.setState({
				[edit]: false
			})
		}
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
			<div>
				<Row>
					<Col span={4}>
						{/* 个人信息 */}
						<div><img style={{width: '100%'}} src={ this.state.avatar } alt=""/></div>
						{
							this.state.baseInfo.map((item, index) => {
								let element
								if (!this.state[item.name + 'Edit']) {
									element = <span>{ this.state[item.name] }<button onClick={ () => { this.setState({[item.name + 'Edit']: true}) } }>编辑</button></span>
								} else {
									element = (
										<span>
											<input type="text" placeholder="Enter sth, pls..." value={ this.state[item.name] } onChange={ this.changeItem.bind(this, item.name) } onBlur={ this.changeEdit.bind(this, item.name + 'Edit') } />
											<button onClick={ () => { this.setState({[item.name + 'Edit']: false}) } }>保存</button>
										</span>
									)
								}
								return (
								   <div>
									   <span>{ item.text }: </span>
										{element}
								   </div>
								) 
							})
						}
					</Col>
					<Col span={20}>个人描述</Col>
				</Row>
				<div style={ {margin: '0 auto', textAlign: 'center'} } onClick={ this.save.bind(this) }>提交</div>
			</div>
		)
	}
}
