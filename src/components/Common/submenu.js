import React from "react";
import { Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { allPages } from "routes/allRoutes";

function SubMenu({category, activeIndex}) {
    let pages = Object.entries(allPages);
    pages = pages.filter(([key, value]) => key == category);
    pages = pages[0][1]
    return (
        <>
            <Card className="breadcrumb-pages">
                <CardBody className="breadcrumb-pages-body">
                    {pages.map((page,index) =>
                        <div className={ activeIndex == page.path ? "item active" : "item" } key={index}>
                            <Link to={page.group+page.path}>
                                <div className="icon"><i className={page.icon}></i></div>
                                <div className="text">{page.title}</div>
                            </Link>
                        </div>
                    )}
                </CardBody>
            </Card>
        </>
    )
}


export default SubMenu