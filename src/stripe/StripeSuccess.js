// We use useEffect() to make request to backend
// so that we can create a new order for the user who paid the booking
// and show the booking in user purchase/booking history

import react, {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
import { stripeSuccessRequest } from "../actions/stripe";
import {LoadingOutlined} from '@ant-design/icons';

const StripeSuccess = ({match, history}) => {

    const {auth: { token }} = useSelector((state) => ({...state}));
    // or const {token} = auth; 

    useEffect(() => {
        //console.log('Send this hotelid to backend to create order', match.params.hotelId);
        stripeSuccessRequest(token, match.params.hotelId).then(res => {
            if (res.data.success) {
                //console.log('stripe success response', res.data);
                history.push('/dashboard');
            } else {
            history.push('/stripe/cancel');
            }
        });
    }, [history, match.params.hotelId]);
   
    
    
    return (
        <div className="container">
            <div className="d-flex justify-content-center p-5">
                <LoadingOutlined className="display-1 text-danger p-5"/>
            </div>
        </div>
    )
};

export default StripeSuccess;