import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

class Commentform extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            NameTouched: false,
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {

        const target = event.target;
        const value = target.value;

        this.setState({
            Name: value
        });
    }

    handleBlur (event) {
        this.setState({
            NameTouched: true
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(event) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, this.select.value, this.state.Name, this.Comment.value);
    }

    render() {

        let error = '' ;
        if (this.state.NameTouched && this.state.Name.length <= 2) {
            error='Must be greater than 2 characters';
        }
        else {
            if (this.state.NameTouched && this.state.Name.length > 15) {
                error='Must be 15 characters or less';
            }
        }

        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="RatingSelect">Rating</Label>
                                <Input type="select" name="select" id="RatingSelect"
                                       innerRef={(input) => this.select = input}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Name">Your Name</Label>
                                <Input type="text" name="Name" id="Name" placeholder="Your Name"
                                       value={this.state.Name}
                                       valid={error === ''}
                                       invalid={error !== ''}
                                       onBlur={this.handleBlur}
                                       onChange={this.handleNameChange} />
                                <FormFeedback>{error}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Comment">Comment</Label>
                                <Input type="textarea" name="Comment" id="Comment" rows="6"
                                       innerRef={(input) => this.Comment = input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({dish}) {
    if (dish != null)
        return(
            <div>
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    else
        return(
            <div></div>
        );
}

function RenderComments({comments, postComment, dishId}) {
    const cmnts = comments.map((cmnt)=> {
        return (
            <Stagger in>
                {comments.map((comment) => {
                    return (
                        <Fade in>
                            <li key={cmnt.id}>
                                <p>{cmnt.comment}<br/><br/>--{cmnt.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))} </p>
                            </li>
                        </Fade>
                    );
                })}
            </Stagger>
        );
    });
    return(
        <div>
            <h4>Comments</h4>
            {cmnts}
            <Commentform dishId={dishId} postComment={postComment} />
        </div>
    );
}


const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                                        postComment={props.postComment}
                                        dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }

}


export default DishDetail;