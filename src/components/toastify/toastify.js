import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast(type,message) {
    if (type == "success") {
        toast.success(message)
    } else if ( type == "warning") {
        toast.warning(message)
    }else {
        toast.error(message)
    }
}

export function Toastify() {
    return (
        <ToastContainer autoClose={1500} hideProgressBar={false}/>
    )
}