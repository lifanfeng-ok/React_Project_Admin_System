import React, { Component } from 'react'
import {
    Icon,
    Card,
    Statistic,
    DatePicker,
    Timeline, Progress, Collapse
} from 'antd'
import './home.less'
import * as PropTypes from "prop-types";

const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker
const { Panel } = Collapse;

class Home extends Component {

    state = {
        isVisited: true
    }

    handleChange = (isVisited) => {
        return () => this.setState({isVisited})
    }

    render() {
        const {isVisited} = this.state;
        const text = 'A dog is a type of domesticated animal.\n' +
            '  Known for its loyalty and faithfulness,'
        return (
            <div className='home'>
                <Card
                    className="home-card"
                    title="商品总量"
                    extra={<Icon style={{color: 'rgba(0,0,0,.45)'}} type="question-circle"/>}
                    style={{width: '250px', height: '90%'}}
                    headStyle={{color: 'rgba(0,0,0,.45)'}}
                >
                    <Statistic
                        value={1128163}
                        suffix="个"
                        style={{fontWeight: 'bolder'}}
                    />
                    <Statistic
                        value={15}
                        valueStyle={{fontSize: 15}}
                        prefix={'周同比'}
                        suffix={<div>%<Icon style={{color: 'red', marginLeft: 10}} type="arrow-down"/></div>}
                    />
                    <Statistic
                        value={10}
                        valueStyle={{fontSize: 15}}
                        prefix={'日同比'}
                        suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
                    />
                    <Statistic
                        value={40}
                        valueStyle={{fontSize: 15}}
                        prefix={'日同比'}
                        suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
                    />
                    <Statistic
                        value={30}
                        valueStyle={{fontSize: 15}}
                        prefix={'日同比'}
                        suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
                    />
                    <Progress type="circle" percent={30} width={80} style={{marginRight:'10px', marginTop:'8px'}} />
                    <Progress type="circle" percent={70} width={80} status="exception" style={{marginTop: '8px'}}/>
                </Card>
                <div className='home-right'>
                    <Collapse
                        defaultActiveKey={['1','2','3']}
                        onChange={(key)=>{console.log(key)}}
                        bordered

                    >
                        <Panel header="This is panel header 1" key="1">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </div>

            </div>
        )
    }
}
export default Home