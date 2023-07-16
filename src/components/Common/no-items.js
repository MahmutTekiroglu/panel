import { Card, CardBody } from "reactstrap"

function NoItems({text, func}){
    return (
        <Card className="no-item">
            <CardBody className="no-item-body">
                <div className="text"><i className="fas fa-ban"></i> {text}</div>
                {func && 
                    <button className="btn btn-success btn-sm w-20" onClick={() => { func() }}><i className="fas fa-plus"></i></button>
                }
            </CardBody>
        </Card>
    )
}

export default NoItems