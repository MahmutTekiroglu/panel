import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import WebServiceRequest from "actions/request";
import ListLoader from "components//loader/list-loader"
import NoItems from "components//Common/no-items"
import { Toast } from "components/toastify/toastify";
import SweetAlert from "react-bootstrap-sweetalert"
import { Modal, Table, Row, Col, Card, CardBody,  Nav, NavItem, NavLink, } from "reactstrap"
import Moment from 'react-moment';
import classnames from "classnames"

import bistLogo from "../../assets/images/bist-logo.png";
import garantiLogo from "../../assets/images/garanti-logo.png";
import kozalLogo from "../../assets/images/kozal-logo.png";

  
function StocksReports(){

    const [stocks, setStocks] = useState([])
    const [stocksHistory, setStocksHistory] = useState([])
    const [tabs, setTabs] = useState("1")

    const garantiCode = "GARAN"
    const kozalCode = "KOZAL"
    const bistCode = "XU100"

    const [loading, SetLoading] = useState(true)

    useEffect(() => {
        SetLoading(true)
      }, [tabs]);

      useEffect(() => {
        const interval = setInterval(() => {
            stocksList()
        }, 2000);
        return () => clearInterval(interval);
      }, []);

      useEffect(() => {
        const interval = setInterval(() => {
            stocksHistoryList()
        }, 2000);
        return () => clearInterval(interval);
      }, [tabs]);

    
    async function stocksHistoryList() {
        let code
        if (tabs == 1) {
            code = bistCode
        } else if (tabs == 2){
            code = garantiCode
        } else {
            code = kozalCode
        }
        let data = await WebServiceRequest({code : code}, "stocks/history")
        setStocksHistory(data)
        SetLoading(false)
    }

    async function stocksList() {
        let data = await WebServiceRequest({}, "stocks/list")
        setStocks(data)
    }
    
    function currencyFormat(num) {
        let value = parseFloat(num)
        return value ? value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null
    }

    return (
        <React.Fragment>

            <div className="page-content">

                <MetaTags>
                    <title>Belha | Borsa Takip</title>
                </MetaTags>
                {stocks.length > 0 && 
                
                <Nav pills className="navtab-bg nav-justified">
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                            active: tabs === "1",
                            })}
                            onClick={() => {
                            setTabs("1")
                            }}
                        >
                            <img src={bistLogo} className="borsa-logo" />
                            <span>{ stocks[0].price && currencyFormat(stocks[0].price)}</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                            active: tabs === "2",
                            })}
                            onClick={() => {
                            setTabs("2")
                            }}
                        >
                            <img src={garantiLogo} className="borsa-logo" />
                            <span>{ stocks[1].price && currencyFormat(stocks[1].price)} ₺</span>

                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                            active: tabs === "3",
                            })}
                            onClick={() => {
                            setTabs("3")
                            }}
                        >
                            <img src={kozalLogo} className="borsa-logo" />
                            <span>{ stocks[2].price && currencyFormat(stocks[2].price)} ₺</span>
                        </NavLink>
                    </NavItem>
                </Nav>
                
                }


                { stocksHistory.length == 0 && !loading && <NoItems text={"borsa Kaydı Bulunamadı"}/> }
                { loading && <ListLoader text={"Borsa kayıtları listeleniyor..."}/> }
                { !loading && stocksHistory.length != 0 && 
                    <Card>
                        <CardBody>
                            <div className="table-responsive">
                                <Table className="table table-bordered table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-center" style={{width:"10%"}}>Ad</th>
                                        <th className="text-center" style={{width:"10%"}}>Kod</th>
                                        <th className="text-center" style={{width:"10%"}}>Son Kontrol</th>
                                        <th className="text-center" style={{width:"10%"}}>Fiyat</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    { stocksHistory && stocksHistory.map((item,index) =>
                                        <tr key={index}>
                                            <td className="text-left">{item.name}</td>
                                            <td className="text-center">{item.code}</td>
                                            <td className="text-center"><Moment format="DD/MM/YYYY HH:mm:ss" >{item.date}</Moment></td>
                                            <td className="text-right">{currencyFormat(item.price)} { item.code != bistCode && '₺'}</td>
                                  
                                        </tr> 
                                    )}
                                </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                }
            </div>
        </React.Fragment>
    )
}

export default StocksReports