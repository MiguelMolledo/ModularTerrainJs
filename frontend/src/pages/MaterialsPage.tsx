


import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MainTab from '../components/MainTab';

const materialsData = [
    {
        id: 1,
        name: "XPS Foam",
        description: "High-density extruded polystyrene foam, ideal for carving, shaping, and building lightweight miniature terrain bases and structures.",
        image: "https://picsum.photos/200?1",
        webLinks: "https://en.wikipedia.org/wiki/Extruded_polystyrene_foam",
        price: 15,
        dimensions: "60x60x2 cm"
    },
    {
        id: 2,
        name: "PVA Glue",
        description: "Versatile white glue used for bonding foam, flock, sand, and other basing materials. Dries clear and is safe for most crafting surfaces.",
        image: "https://picsum.photos/200?2",
        webLinks: "https://en.wikipedia.org/wiki/Polyvinyl_acetate",
        price: 5,
        dimensions: "500ml"
    },
    {
        id: 3,
        name: "Acrylic Paint Set",
        description: "Water-based acrylic paints in assorted colors, perfect for painting foam, terrain, and miniatures with vibrant, durable finishes.",
        image: "https://picsum.photos/200?3",
        webLinks: "https://en.wikipedia.org/wiki/Acrylic_paint",
        price: 20,
        dimensions: "12x20ml tubes"
    },
    {
        id: 4,
        name: "Mod Podge",
        description: "All-in-one sealer, glue, and finish. Used to seal foam terrain, add durability, and prepare surfaces for painting and weathering.",
        image: "https://picsum.photos/200?4",
        webLinks: "https://en.wikipedia.org/wiki/Mod_Podge",
        price: 8,
        dimensions: "236ml"
    },
    {
        id: 5,
        name: "Static Grass",
        description: "Fine synthetic fibers that mimic grass. Applied with glue to create realistic grassy effects on miniature bases and terrain.",
        image: "https://picsum.photos/200?5",
        webLinks: "https://en.wikipedia.org/wiki/Static_grass",
        price: 7,
        dimensions: "30g bag"
    },
    {
        id: 6,
        name: "Foam Cutter",
        description: "Hot wire tool for precise cutting and shaping of XPS foam. Essential for crafting detailed terrain features and structures.",
        image: "https://picsum.photos/200?6",
        webLinks: "https://en.wikipedia.org/wiki/Hot-wire_foam_cutter",
        price: 25,
        dimensions: "Handheld"
    },
    {
        id: 7,
        name: "Basing Sand",
        description: "Fine, clean sand for adding realistic texture to bases and terrain. Easily glued and painted for natural ground effects.",
        image: "https://picsum.photos/200?7",
        webLinks: "https://en.wikipedia.org/wiki/Sand",
        price: 3,
        dimensions: "250g bag"
    },
    {
        id: 8,
        name: "Cork Sheets",
        description: "Thin cork sheets for creating rocky outcrops, ruins, and elevation on miniature bases and terrain boards.",
        image: "https://picsum.photos/200?8",
        webLinks: "https://en.wikipedia.org/wiki/Cork_(material)",
        price: 6,
        dimensions: "30x20x0.5 cm"
    },
    {
        id: 9,
        name: "Scatter Flock",
        description: "Colored ground foam used to simulate moss, undergrowth, and foliage on terrain and miniature bases.",
        image: "https://picsum.photos/200?9",
        webLinks: "https://en.wikipedia.org/wiki/Flock_(texture)",
        price: 4,
        dimensions: "50g bag"
    },
    {
        id: 10,
        name: "Craft Knife",
        description: "Precision hobby knife for cutting foam, card, and other materials. Essential for detailed miniature and terrain work.",
        image: "https://picsum.photos/200?10",
        webLinks: "https://en.wikipedia.org/wiki/Utility_knife",
        price: 5,
        dimensions: "Standard"
    },
    {
        id: 11,
        name: "Woodland Scenics Rocks",
        description: "Pre-cast lightweight rocks for adding realistic stone features to terrain and miniature bases.",
        image: "https://picsum.photos/200?11",
        webLinks: "https://woodlandscenics.woodlandscenics.com/",
        price: 9,
        dimensions: "Assorted"
    },
    {
        id: 12,
        name: "Textured Rolling Pin",
        description: "Embosses patterns onto XPS foam for stone, brick, or wood effects. Great for dungeon tiles and scenic bases.",
        image: "https://picsum.photos/200?12",
        webLinks: "https://en.wikipedia.org/wiki/Rolling_pin",
        price: 18,
        dimensions: "15cm"
    }
];



function MaterialsPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <MainTab />
            <section>
                <div style={{ textAlign: "center", fontWeight: "bold", marginBottom: "1rem" }}>ALL MATERIALS</div>   <ul>
                    {materialsData.map((material) => (
                        <li style={{ maxWidth: "220px", maxHeight: "350px", margin: "10px", listStyle: "none", display: "inline-block", verticalAlign: "top" }}>
                            <Card style={{ maxWidth: "200px", maxHeight: "340px" }}>
                                <Card.Img variant="top" src={material.image} style={{ maxHeight: "120px", objectFit: "cover" }} />
                                <Card.Body>
                                    <Card.Title>{material.name}</Card.Title>
                                    <Card.Text style={{ maxHeight: "80px", overflow: "hidden" }}>
                                        {material.description}
                                    </Card.Text>
                                    <Button variant="primary" href={material.webLinks}>Buy</Button>
                                </Card.Body>
                            </Card>
                        </li>))}
                </ul>
            </section>
        </main>)
}




export default MaterialsPage;