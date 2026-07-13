import api from "./api";

export const createIncident = async (formData) => {

    const response = await api.post(
        "/incidents",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const getAllIncidents = async () => {

    const response = await api.get("/incidents");

    return response.data;
};

export const getIncidentById = async (id) => {

    const response = await api.get(`/incidents/${id}`);

    return response.data;

};


export const getIncidentStats = async () => {

    const response = await api.get("/incidents/stats");

    return response.data;

};