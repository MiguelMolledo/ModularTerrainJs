



import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MainTab from '../components/MainTab';


const tabs = [
    { label: "Dashboard", content: <div>Welcome to the Home page!</div> },
    { label: "Maps", content: <div>Maps content goes here.</div> },
    { label: "Terrains", content: <div>Terrains content goes here.</div> },
    { label: "Materials", content: <div>Materials content goes here.</div> },
];


const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <main style={{ padding: "2rem" }}>
            <div>
                <MainTab></MainTab>
            </div>

        </main>
    );
};


export default DashboardPage;


