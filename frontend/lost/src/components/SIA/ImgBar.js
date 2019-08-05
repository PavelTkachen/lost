import React, {Component} from 'react'
// import { 
//     Button, CardHeader, Card, 
//     CardBody, Input, Container, 
//     Row, Col, Fade, Toast, ToastBody, ToastHeader
//     } from 'reactstrap';
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faDrawPolygon, faVectorSquare, faWaveSquare, faDotCircle, 
    faArrowRight, faArrowLeft , faExpandArrowsAlt
} from '@fortawesome/free-solid-svg-icons'
import { 
    faImage
} from '@fortawesome/free-regular-svg-icons'
import { Icon, Dropdown, Menu, Input, Message, Statistic, Divider, Button, List, Label, Header } from 'semantic-ui-react'
import LabelInput from './LabelInput'
import actions from '../../actions'
const { siaShowImgBar } = actions

class ImgBar extends Component{

    constructor(props) {
        super(props)
        this.state = {
            position: {
                top: 0,
                left: 0,
            }
        }
    }

    componentDidMount(){
        
    }
    componentDidUpdate(prevProps){

        if (this.props.svg !== prevProps.svg){
            this.setState({
                position: {...this.state.position,
                left: this.props.svg.left,
                top: this.props.svg.top,
                }
            })
        }
    }

    handleLabelUpdate(label){
        console.log('ImgBar label update', label)
    }

    render(){
        if (!this.props.imgBar.show) return null
        if (!this.props.annos.image) return null
        const activeItem='home'
        return(
        <div style={{
            position:'fixed', 
            top: this.state.position.top, 
            left:this.state.position.left,
            }}>
                {/* <div className="handle" style={{cursor: 'grab'}}>Drag</div> */}
            <Menu inverted>
                <Menu.Item  
                active={activeItem === 'bla'} 
                >
                {this.props.annos.image.number +" / "+ this.props.annos.image.amount}
                </Menu.Item>
                <Menu.Item
                active={activeItem === 'messages'}
                >
                {this.props.annos.image.url.split('/').pop() +" (ID: "+this.props.annos.image.id+")"}
                </Menu.Item>
                <Menu.Menu position='right'>
                <Menu.Item>
                    <LabelInput
                        relatedId={this.props.annos.image.id}
                        visible={true}
                        onLabelUpdate={label => this.handleLabelUpdate(label)}
                        possibleLabels={this.props.possibleLabels}
                        />
                </Menu.Item>
                <Menu.Item
                    active={activeItem === 'logout'}
                    onClick={() => this.props.siaShowImgBar(false)}
                >
                <Icon inverted size="small" name="close"></Icon>
                </Menu.Item>
                </Menu.Menu>
            </Menu>
            {/* <Fade in={this.props.imgBar.show}> 
            <Card style={{minWidth:"600px"}} >
            <CardBody>
                <Row>
                    <Col xs='5' sm='5' lg='5'>
                        <Input></Input>
                    </Col>
                    <Col xs='2' sm='2' lg='2'>
                    <FontAwesomeIcon icon={faArrowRight} /> {this.props.annos.image.number} / {this.props.annos.image.amount}
                    </Col>
                    <Col xs='4' sm='4' lg='4'>
                         {this.props.annos.image.url.split('/').pop()} (ID: {this.props.annos.image.id})
                    </Col>
                    <Col xs='1' sm='1' lg='1'>
                         <Button close onClick={() => this.props.siaShowImgBar(false)} />
                    </Col>
                </Row>
                </CardBody>
            </Card>
            </Fade> */}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        annos: state.sia.annos,
        layoutUpdate: state.sia.layoutUpdate,
        uiConfig: state.sia.uiConfig,
        imgBar: state.sia.imgBar,
        svg: state.sia.svg,
        possibleLabels: state.sia.possibleLabels,
    })
}
export default connect(mapStateToProps, 
    {siaShowImgBar}
)(ImgBar)