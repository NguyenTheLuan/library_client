import ModalReservationDetails from 'components/customComponents/Modals/ModalForm/ModalReservationDetails';
import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { GoInfo } from "react-icons/go";

function ViewReservationDetails({ reservationDetails }) {
    //Xem thông tin chi tiết
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    //Nhận props từ con
    const onShow = (isShow) => {
        setShow(isShow);
    };

    return (
        <>
            <Button variant="none" onClick={handleShow}><GoInfo style={{ fontSize: "30px", color: "#714FFC" }} /></Button>
            <ModalReservationDetails reservationDetails={reservationDetails} onShow={onShow} isShow={show} />
        </>
    )
}

export default ViewReservationDetails
