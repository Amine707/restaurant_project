import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        if (dish != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>
                                <p>{dish.description}</p>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(Comments) {
        const cmnts = Comments.map((cmnt)=> {
            return (
                <p>{cmnt.comment}<br/><br/>--{cmnt.author}, {cmnt.date} </p>
            );
        });
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {cmnts}
            </div>
        );
    }

    render() {
        if(this.props.dish != null) {
            return (
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish.comments)}
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }

    }
}

export default DishDetail;