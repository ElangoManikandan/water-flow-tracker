import axios from 'axios';

// Ensure this matches your Spring Boot port (usually 8080)
const API_BASE_URL = "http://localhost:8080/api/water";

const WaterService = {
    // GET current system status from MySQL
    getStatus: () => axios.get(`${API_BASE_URL}/status`),

        // POST toggle motor state (Enforces "One Motor Only" logic in backend)
    toggleMotor: (name, isOn) => 
        axios.post(`${API_BASE_URL}/motor/${name}?isOn=${isOn}`),

    // POST update valve position to divert flow
    updateValve: (name, position) => 
        axios.post(`${API_BASE_URL}/valve/${name}?position=${position}`)
};

export default WaterService;