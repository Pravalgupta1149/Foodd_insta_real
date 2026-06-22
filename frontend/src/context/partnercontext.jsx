import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const PartnerContext = React.createContext();

export const PartnerProvider = ({ children }) => {
    const [partnerData, setPartnerData] = useState(null);

    const fetchPartnerData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/food-partner/getcurrentpartner`, {
                credentials: true,
            });
            const data = response.data;
            setPartnerData(data.foodpartner);
            console.log('Fetched partner data:', data.foodpartner);
        } catch (error) {
            console.error('Error fetching partner data:', error);

        }
    };

    useEffect(() => {
        fetchPartnerData();
    }, []);

    return (
        <PartnerContext.Provider value={{ partnerData, setPartnerData }}>
            {children}
        </PartnerContext.Provider>
    );

}
