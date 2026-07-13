import axios from "axios";

export const getCoordinates = async (location) => {

    try {

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: location,
                    format: "json",
                    limit: 1,
                },
                headers: {
                    "User-Agent": "Disaster-Management-System/1.0",
                },
            }
        );

        if (response.data.length === 0) {

            return null;

        }

        return {
            latitude: Number(response.data[0].lat),
            longitude: Number(response.data[0].lon),
        };

    } catch (error) {

        throw new Error("Unable to fetch coordinates.");

    }

};