import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import WebServiceRequest from "actions/request";
import ListLoader from "components//loader/list-loader"
import NoItems from "components//Common/no-items"
import { Toast } from "components/toastify/toastify";
import SweetAlert from "react-bootstrap-sweetalert"
import { Modal, Table, Row, Col, Card, CardBody } from "reactstrap"

function UserList(){

    const [userList, setUserList] = useState([])
    const [userFilter, setUserFilter] = useState({search:"", status: ""})
    const [userForm, setUserForm] = useState({username:"", login_name: "", password:"", status:"1", id: ""})
    const [formType, setFormType] = useState("")
    const [onSweetalert, setOnSweetalert] = useState({isActive: false, type: "info", title: "Kullanıcı Silinecek", message: "Seçtiğiniz kullaniciyı silmek istediğnize emin misiniz", confirmText: "Evet, Sil", cancelText:"Vazgeç"})

    const [modal, setModal] = useState(false)
    const [loading, SetLoading] = useState(true)

    useEffect(() => {
        UserList()
      }, []);
    
    async function UserList() {
        SetLoading(true)
        let data = await WebServiceRequest(userFilter, "user/list")
        await setUserList(data)
        SetLoading(false)
    }

    function userAdd() {
        setUserForm({username:"", login_name: "", password:"", status:"1", id: ""})
        setModal(true); 
        setFormType("add")
    }

    async function userUpdate(data) {
        setUserForm({login_name:data.login_name, username:data.username, password:data.password, status:data.status, id: data.id})
        setFormType("update")
        setModal(true)
    }

    async function UserSave() {
        let data = await WebServiceRequest(userForm, `user/${formType}`)
        if (data[0].S == "T") {
            Toast("success", data[0].message)
            UserList()
        }else {
            Toast("error", data[0].error_message)
        }
        setModal(false)
    }

    async function userDelete(id) {
        let data = await WebServiceRequest({id:id}, `user/delete`)
        if (data[0].S == "T") {
            Toast("success", data[0].message)
            UserList()
        }else {
            Toast("error", data[0].error_message)
        }
        setOnSweetalert({...onSweetalert, isActive:false})
    }

    async function userDeleteBtn(id) {
        setOnSweetalert({...onSweetalert, isActive:true, id:id})
    }


    return (
        <React.Fragment>


            <div className="page-content">

                <MetaTags>
                    <title>Belha | Kullanıcı Listesi</title>
                </MetaTags>

                <Card>
                    <CardBody>
                    <form onSubmit={(e) => { UserList(); e.preventDefault();}}>
                        <Row>
                            <Col md="8" sm="12">
                                <div>
                                    <label className="form-label">Arama</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Arama Yapabilirsiniz"
                                        value={userFilter.search}
                                        onChange={ (e) => { setUserFilter({...userFilter, search: e.target.value}) } }
                                    />
                                </div>
                            </Col>
                            <Col md="2" sm="12">
                                <div>
                                    <label className="form-label">Durum</label>
                                    <select className="form-control" value={userFilter.status} onChange={ (e) => { setUserFilter({...userFilter, status: e.target.value}); } }>
                                        <option value="">Seçiniz</option>
                                        <option value="1">Aktif</option>
                                        <option value="0">Pasif</option>
                                    </select>
                                </div>
                            </Col>
                            <Col md="2" sm="12">
                                <button className="btn btn-dark w-100 search"><i className="fas fa-search"></i></button>
                            </Col>
                        </Row>
                    </form>
                    </CardBody>    
                </Card>

                { userList.length == 0 && !loading && <NoItems text={"Kullanıcı Kaydı Bulunamadı"} func={userAdd}/> }
                { loading && <ListLoader text={"Kullanıcı kayıtları listeleniyor..."}/> }
                { !loading && userList.length != 0 && 
                    <Card>
                        <CardBody>
                            <div className="table-responsive">
                                <Table className="table table-bordered table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th style={{width:"15%"}}>Ad Soyad</th>
                                        <th style={{width:"15%"}}>Kullanıcı Adı</th>
                                        <th style={{width:"10%"}}>Şifre</th>
                                        <th className="text-center" style={{width:"5%"}}>Durum</th>
                                        <th style={{width:"10%"}}><button onClick={ () => { userAdd() }} className="btn btn-success btn-sm w-100"><i className="fas fa-plus"></i> Kullanıcı Ekle</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { userList && userList.map((user,index) =>
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>{user.login_name}</td>
                                            <td>*****</td>
                                            <td>
                                                { user.status == "1" ? 
                                                    <span className="bg-success badge badge-succes w-100">Aktif</span> :
                                                    <span className="bg-dark badge badge-dark w-100">Pasif</span>
                                                }
                                            </td>
                                            <td className="buttons two-btn">
                                                <button className="btn btn-outline-warning btn-sm" onClick={ () => {setModal(true); userUpdate(user)}} ><i className="fas fa-edit"></i></button>
                                                <button className="btn btn-dark btn-sm" onClick={ () => {userDeleteBtn(user.id)}}><i className="fas fa-times "></i></button>
                                            </td>
                                        </tr> 
                                    )}
                                </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                }

                <Modal isOpen={modal} centered={true}>
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myModalLabel">
                            Kullanıcı Ekleme Formu
                        </h5>
                        <button type="button" onClick={() => { setModal(false)}} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) => {UserSave(); e.preventDefault();}}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">Ad Soyad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ad Soyad"
                                    value={userForm.username}
                                    required
                                    onChange={ (e) => { setUserForm({...userForm, username: e.target.value}) } }
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">Kullanıcı Adı</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Kullanıcı Adı"
                                    value={userForm.login_name}
                                    required
                                    onChange={ (e) => { setUserForm({...userForm, login_name: e.target.value}) } }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="userpassword">Şifre</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Şifre"
                                    value={userForm.password}
                                    required
                                    onChange={ (e) => { setUserForm({...userForm, password: e.target.value}) } }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="userpassword">Durum</label>
                                <select className="form-control" value={userForm.status} onChange={ (e) => { setUserForm({...userForm, status: e.target.value}) } }>
                                    <option value="1">Aktif</option>
                                    <option value="0">Pasif</option>
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button type="button" onClick={() => {setModal(false)}} className="btn btn-secondary" data-dismiss="modal">
                                    Kapat
                                </button>
                                <button type="submit" className="btn btn-dark">
                                    Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                    
                </Modal>
            </div>

            {onSweetalert.isActive && (
                <SweetAlert
                    title={onSweetalert.title}
                    info
                    showCancel
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="danger"
                    confirmBtnText={onSweetalert.confirmText}
                    cancelBtnText={onSweetalert.cancelText}
                    onConfirm={() => {
                        userDelete(onSweetalert.id)
                    }}
                    onCancel={() => {
                        setOnSweetalert({...onSweetalert, isActive:false})
                    }}
                >
                    {onSweetalert.message}
                </SweetAlert>
            )}
        </React.Fragment>
    )
}

export default UserList