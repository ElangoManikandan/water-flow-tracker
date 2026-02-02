import axios from 'axios';

// Ensure this matches your Spring Boot port (usually 8080)
const API_BASE_URL = "http://localhost:8080/api/water";

const WaterService = {

    getStatus: () => axios.get(`${API_BASE_URL}/status`),
    toggleMotor: (name, isOn) => 
        axios.post(`${API_BASE_URL}/motor/${name}?isOn=${isOn}`),
    updateValve: (name, position) => 
        axios.post(`${API_BASE_URL}/valve/${name}?position=${position}`)
};

export default WaterService;