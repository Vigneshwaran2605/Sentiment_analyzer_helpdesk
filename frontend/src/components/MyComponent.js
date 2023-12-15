import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/my-model/')
            .then(response => {
            setData(response.data);
            console.log('Data received:', response.data);})
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>My Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.title} - {item.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
