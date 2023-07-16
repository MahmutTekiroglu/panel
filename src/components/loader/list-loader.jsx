import { Card, CardBody } from "reactstrap"

function ListLoader({text}){
    return (
        <Card className="loader-card">
            <CardBody className="loader-card-body">
            <div role="status" className="ms-2 spinner-border text-dark"></div> <div className="text">{text}</div>
            </CardBody>
        </Card>
    )
}

export default ListLoader