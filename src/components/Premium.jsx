import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

const Premium = () => {
    const [userPremium, setIsPremium] = useState(false);
    useEffect(()=> {
        verifyPremiumUser()
    }, [])
    
    const verifyPremiumUser = async () => {
        try {
            const res = axios.get(BASE_URL + "/premium/verify", {withCredentials: true})
            if(res?.data?.isPremium) {
                setIsPremium(true);
            }
        }
        catch(err) {
            console.log(err?.message);
        }
    }


    const handleBuyClick = async (type) => {
        try {
            const order = await axios.post(BASE_URL + "/payment/create", {
                type
            }, {withCredentials: true});
            
            const {amount, keyId, currency, notes, orderId} = order.data;
             // Open Razorpay Checkout(i.e. payment dialog box from razorpay)
            const options = {
                key: keyId, // Replace with your Razorpay key_id
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency,
                name: 'Dev Tinder', // name of app
                description: 'Connect to other devlopers',
                order_id: orderId, // This is the order_id created in the backend
                // callback_url: 'http://localhost:3000/payment-success', // Your success URL
                prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: '9999999999'
                },
                theme: {
                color: '#F37254'
                },
                handler: verifyPremiumUser,
            };
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch(err) {
            console.log(err);
        }

    }
  return (
    <div>
        {userPremium ?
        <div>Your are already a premium user</div> :
        <div className="flex w-full">
            <div className="card bg-base-300 py-5 rounded-box grid  grow place-items-center">
               <h1 className="font-bold text-3xl">Silver Membership</h1>
               <ul>
                <li>- Access to premium content</li>
                <li>- Priority customer support</li>
                <li>- Chat with other people</li>
                <li>- 100 connection requests per day</li>
                <li>- Blue Tick</li>
                <li>- 3 months</li>
               </ul>
               <button className="btn btn-secondary" onClick={() => handleBuyClick("silver")}>Buy Silver</button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 py-5 rounded-box grid grow place-items-center">
                <h1 className="font-bold text-3xl">Gold Membership</h1>
                <ul>
                    <li>- Access to premium content</li>
                    <li>- Priority customer support</li>
                    <li>- Chat with other people</li>
                    <li>- Infinite connection requests per day</li>
                    <li>- Blue Tick</li>
                    <li>- 6 months</li>
                </ul>
                <button className="btn btn-primary" onClick={() => handleBuyClick("gold")}>Buy Gold</button>
            </div>
        </div>}
    </div>
  )
}

export default Premium