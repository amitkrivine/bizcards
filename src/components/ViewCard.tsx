import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import Card from "../interfaces/Card";
import { getCardById } from "../services/CardService";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { SiteTheme } from "../App";

interface ViewCardProps {

}
 
const ViewCard: FunctionComponent<ViewCardProps> = () => {
    const { darkMode, toggleDarkMode } = useContext(SiteTheme);

    const { cardId } = useParams();
    
    const [currentCard, setCurrentCard] = useState<Card>({
       title: "", subtitle: "", description: "", phone: "", email: "", address: {country: "", city: "", street: "", houseNumber: 0}, image: {}
    });

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        if (!cardId) return;

        getCardById(cardId)
            .then((response) => {
                setCurrentCard(response.data);
                console.log("Card data:", response.data)
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                        title: "Oops...",
                        text: "Something went wrong",
                        icon: "error"
                })
            });
    },[cardId]);

    // Geocode address
    const geocodeAddress = async (address: string) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
            );
            const data = await response.json();
            
            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                    displayName: data[0].display_name
                };
            }
            return null;
        } catch (error) {
            console.error("Geocoding error:", error);
            return null;
        }
    };

    // Initialize map
    useEffect(() => {
        if (!currentCard.address?.city || !mapContainerRef.current) {
            return;
        }

        // If map already exists, don't create another one
        if (mapInstanceRef.current) {
            return;
        }

        const initMap = async () => {
            console.log("Initializing Leaflet map...");

            try {
                // Create search query from address
                const searchQuery = `${currentCard.address?.street} ${currentCard.address?.houseNumber}, ${currentCard.address?.city}, ${currentCard.address?.country}`;
                console.log("Geocoding address:", searchQuery);

                // Get coordinates with OpenStreetMap's geocoding
                const coords = await geocodeAddress(searchQuery);
                
                // Fallback to just city and country
                if (!coords) {
                    const cityQuery = `${currentCard.address?.city}, ${currentCard.address?.country}`;
                    console.log("Trying city only:", cityQuery);
                    const cityCoords = await geocodeAddress(cityQuery);
                    
                    if (!cityCoords) {
                        console.error("Could not geocode address");
                        Swal.fire({
                            title: "Location not found",
                            text: "Could not find the address on the map",
                            icon: "warning"
                        });
                        return;
                    }
                    initializeMap(cityCoords.lat, cityCoords.lng, cityQuery);
                } else {
                    initializeMap(coords.lat, coords.lng, searchQuery);
                }

            } catch (error) {
                console.error("Error initializing map:", error);
            }
        };

        const initializeMap = (lat: number, lng: number, address: string) => {
            if (!mapContainerRef.current) return;

            // Create map
            const map = L.map(mapContainerRef.current).setView([lat, lng], 15);
            mapInstanceRef.current = map;

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(map);

            // Fix for default marker icon not showing
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });

            // Add map marker
            const marker = L.marker([lat, lng]).addTo(map);
            markerRef.current = marker;

            marker.bindPopup(`<strong>${currentCard.title}</strong><br/>${address}`).openPopup();

            console.log("Map initialized successfully");
        };

        initMap();

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
            if (markerRef.current) {
                markerRef.current = null;
            }
        };
    }, [currentCard]);

    
    return (<>
        <Navbar/>
        <div className="container mt-3 mb-5">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 pe-4" style={{maxWidth: "400px"}}>
                        <img src={currentCard.image?.url} className="img-fluid rounded-start object-fit-contain p-3" alt={currentCard.image?.alt} style={{height: "100%"}}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title fw-bold h4">{currentCard.title}</h5>
                            <p className="card-text"><small className="text-body-secondary">{currentCard.subtitle}</small></p>
                            <hr />
                            <p className="card-text">{currentCard.description}</p>
                            <div>
                                <p className="card-text"><span className="fw-bolder">Email: </span>{currentCard.email || "-"}</p>
                                <p className="card-text"><span className="fw-bolder">Phone: </span>{currentCard.phone || "-"}</p>
                                <p className="card-text"><span className="fw-bolder">Website: </span><Link to={currentCard.web || "."} style={{color: "#83c5be"}}>{currentCard.web || "-"}</Link></p>
                                {currentCard.address && <p className="card-text"><span className="fw-bolder">Address: </span>{currentCard.address.street} {currentCard.address.houseNumber}, {currentCard.address.city} {currentCard.address.state}, {currentCard.address.country}</p>}
                            </div>
                            <p className="card-text pt-3"><small className="text-body-secondary">BizNumber - {currentCard.bizNumber}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                ref={mapContainerRef}
                style={{height: "300px", width: "100%", border:"1px solid rgba(0, 0, 0, 0.175)", borderRadius:"0.375rem"}}
            />
            <div style={{height: "30px"}}/>
        </div>

        <Footer/>
    </>);
}
 
export default ViewCard;