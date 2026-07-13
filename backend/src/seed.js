import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import Incident from "./models/incident.js";
import User from "./models/users.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const imageUrls = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "imageUrls.json"),
        "utf-8"
    )
);

const getImage = (fileName) => {

    const image = imageUrls.find(
        (img) => img.fileName === fileName
    );

    return image ? [image.url] : [];

};

const incidents = [

{
title:"Major Flood in Varanasi",
description:"Heavy rainfall caused the Ganga river to overflow, flooding residential areas and disrupting transportation.",
type:"flood",
severity:"severe",
status:"reported",
location:"Varanasi, Uttar Pradesh",
coordinates:{latitude:25.3176,longitude:82.9739},
images:getImage("Flood-rescue-India.jpg")
},

{
title:"Forest Fire Near Jim Corbett",
description:"A forest wildfire spread rapidly due to strong winds. Firefighters continue containment efforts.",
type:"fire",
severity:"severe",
status:"in-progress",
location:"Nainital, Uttarakhand",
coordinates:{latitude:29.3919,longitude:79.4542},
images:getImage("Forest-wildfire.jpg")
},

{
title:"Earthquake Tremors Reported",
description:"Moderate earthquake tremors were felt across the city. No casualties have been reported.",
type:"earthquake",
severity:"moderate",
status:"resolved",
location:"Guwahati, Assam",
coordinates:{latitude:26.1445,longitude:91.7362},
images:getImage("Earthquake-damaged-buildings.jpg")
},

{
title:"Landslide Blocks Mountain Highway",
description:"Heavy rainfall triggered a landslide, blocking the main highway for several hours.",
type:"landslide",
severity:"severe",
status:"in-progress",
location:"Shimla, Himachal Pradesh",
coordinates:{latitude:31.1048,longitude:77.1734},
images:getImage("Rockslide-highway.jpg")
},

{
title:"Cyclone Warning Issued",
description:"Authorities have advised evacuation as a severe cyclone approaches the coastline.",
type:"cyclone",
severity:"severe",
status:"reported",
location:"Puri, Odisha",
coordinates:{latitude:19.8135,longitude:85.8312},
images:getImage("Cyclone-satellite.jpg")
},

{
title:"Commercial Building Fire",
description:"Fire broke out inside a commercial building causing major property damage.",
type:"fire",
severity:"moderate",
status:"resolved",
location:"Lucknow, Uttar Pradesh",
coordinates:{latitude:26.8467,longitude:80.9462},
images:getImage("Building-fire.jpg")
},

{
title:"Medical Emergency During Marathon",
description:"Several runners collapsed because of dehydration during a city marathon.",
type:"medical",
severity:"minor",
status:"resolved",
location:"Bengaluru, Karnataka",
coordinates:{latitude:12.9716,longitude:77.5946},
images:getImage("Ambulance-emergency.jpg")
},

{
title:"Flash Flood Near River",
description:"Flash floods damaged nearby villages after continuous heavy rainfall.",
type:"flood",
severity:"moderate",
status:"reported",
location:"Patna, Bihar",
coordinates:{latitude:25.5941,longitude:85.1376},
images:getImage("Flash-flood-road.jpg")
},

{
title:"Industrial Factory Fire",
description:"A fire broke out inside an industrial warehouse causing heavy smoke.",
type:"fire",
severity:"severe",
status:"reported",
location:"Surat, Gujarat",
coordinates:{latitude:21.1702,longitude:72.8311},
images:getImage("Factory-fire.jpg")
},

{
title:"Bridge Collapse Investigation",
description:"Engineers are assessing structural damage after partial bridge collapse.",
type:"earthquake",
severity:"moderate",
status:"reported",
location:"Pune, Maharashtra",
coordinates:{latitude:18.5204,longitude:73.8567},
images:getImage("Damaged-bridge.jpg")
},

{
title:"Flooded Railway Station",
description:"Railway services were suspended after floodwater entered platforms.",
type:"flood",
severity:"moderate",
status:"in-progress",
location:"Mumbai, Maharashtra",
coordinates:{latitude:19.0760,longitude:72.8777},
images:getImage("Flooded-train-station.jpg")
},

{
title:"Emergency Rescue Operation",
description:"NDRF teams rescued families stranded after heavy flooding.",
type:"flood",
severity:"severe",
status:"in-progress",
location:"Kochi, Kerala",
coordinates:{latitude:9.9312,longitude:76.2673},
images:getImage("Disaster-rescue-team.jpg")
},

{
title:"Emergency Relief Shelter",
description:"Temporary shelters have been established for displaced families.",
type:"cyclone",
severity:"moderate",
status:"reported",
location:"Visakhapatnam, Andhra Pradesh",
coordinates:{latitude:17.6868,longitude:83.2185},
images:getImage("Disaster-shelter.jpg")
},

{
title:"Hospital Emergency Evacuation",
description:"Patients were safely evacuated after smoke spread through the ICU.",
type:"medical",
severity:"moderate",
status:"resolved",
location:"Hyderabad, Telangana",
coordinates:{latitude:17.3850,longitude:78.4867},
images:getImage("Emergency-room.jpg")
},

{
title:"River Overflow Warning",
description:"Authorities issued warnings after water levels crossed danger marks.",
type:"flood",
severity:"moderate",
status:"reported",
location:"Darbhanga, Bihar",
coordinates:{latitude:26.1542,longitude:85.8918},
images:getImage("Overflowing-river.jpg")
},

{
title:"Mountain Landslide",
description:"Heavy rain caused rocks and mud to slide across mountain roads.",
type:"landslide",
severity:"moderate",
status:"reported",
location:"Manali, Himachal Pradesh",
coordinates:{latitude:32.2432,longitude:77.1892},
images:getImage("Mountain-landslide.jpg")
},

{
title:"Firefighters Control Blaze",
description:"Firefighters successfully controlled a warehouse blaze after four hours.",
type:"fire",
severity:"moderate",
status:"resolved",
location:"Ahmedabad, Gujarat",
coordinates:{latitude:23.0225,longitude:72.5714},
images:getImage("Firefighters-fire.jpg")
},

{
title:"Rescue Teams Deployed",
description:"Emergency responders continue rescue efforts after severe flooding.",
type:"flood",
severity:"severe",
status:"in-progress",
location:"Chennai, Tamil Nadu",
coordinates:{latitude:13.0827,longitude:80.2707},
images:getImage("Flood-rescue-boat.jpg")
},

{
title:"Storm Damage Assessment",
description:"Officials are assessing damage caused by strong winds and rainfall.",
type:"cyclone",
severity:"moderate",
status:"resolved",
location:"Kolkata, West Bengal",
coordinates:{latitude:22.5726,longitude:88.3639},
images:getImage("Storm-destruction.jpg")
},

{
title:"Firefighters Rescue Residents",
description:"Residents trapped inside a residential building were safely rescued.",
type:"fire",
severity:"minor",
status:"resolved",
location:"Jaipur, Rajasthan",
coordinates:{latitude:26.9124,longitude:75.7873},
images:getImage("Firefighters-action.jpg")
}

];

const importData = async () => {
    try {

        // Find the first registered user
        const user = await User.findOne();

        if (!user) {
            console.log("❌ No user found.");
            console.log("Please register a user before running the seed.");
            process.exit(1);
        }

        // Remove old incidents
        await Incident.deleteMany();

        // Attach the user and random timestamps
        const incidentData = incidents.map((incident) => {

            const randomDays = Math.floor(Math.random() * 180);

            const createdDate = new Date();

            createdDate.setDate(createdDate.getDate() - randomDays);

            return {

                ...incident,

                reportedBy: user._id,

                createdAt: createdDate,

                updatedAt: createdDate,

            };

        });

        // Insert into MongoDB
        await Incident.insertMany(incidentData);

        console.log("=========================================");
        console.log("✅ 20 Demo Incidents Inserted Successfully");
        console.log("=========================================");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }
};

importData();