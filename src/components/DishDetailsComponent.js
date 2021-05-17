import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


function RenderDish({dish}) {
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

function RenderComments({comments}) {
    const cmnts = comments.map((cmnt)=> {
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

const  DishDetail = (props) => {
    if(props.dish != null) {
        return (
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.dish.comments}/>
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