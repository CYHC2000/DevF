// Travel Manager Module - Using modern ECMAScript features

// Use const for arrays and objects that won't be reassigned
const destinations = [];

// Base prices for different destinations (in USD)
const destinationPrices = new Map([
    ['paris', 800],
    ['london', 750],
    ['new york', 600],
    ['tokyo', 1000],
    ['sydney', 900],
    ['rome', 700],
    ['barcelona', 650],
    ['amsterdam', 680]
]);

// Transportation costs (per person)
const transportCosts = {
    plane: 500,
    train: 200,
    bus: 100,
    car: 150
};

// Hotel costs per night (per person)
const hotelCostPerNight = 80;

// Function to add a new destination (using arrow function)
export const addDestination = (destination, date, transport, nights, people) => {
    // Validate inputs
    if (!destination || !date || !transport) {
        throw new Error('All fields are required');
    }
    
    const newDestination = {
        id: Date.now(), // Unique ID for each destination
        name: destination,
        date: date,
        transport: transport,
        nights: parseInt(nights),
        people: parseInt(people),
        createdAt: new Date().toISOString()
    };
    
    destinations.push(newDestination);
    return newDestination;
};

// Function to calculate cost (using arrow function)
export const calculateCost = (destination, transport, nights = 3, people = 1) => {
    // Get destination price (case insensitive)
    const destKey = destination.toLowerCase();
    const destinationPrice = destinationPrices.get(destKey) || 500; // Default $500 if destination not found
    
    // Get transport cost
    const transportPrice = transportCosts[transport] || 150;
    
    // Calculate total cost
    const hotelTotal = hotelCostPerNight * nights * people;
    const transportTotal = transportPrice * people;
    const destinationTotal = destinationPrice * people;
    
    const totalCost = destinationTotal + transportTotal + hotelTotal;
    
    // Apply discount for groups (more than 3 people get 10% off)
    let finalCost = totalCost;
    if (people > 3) {
        const discount = totalCost * 0.10;
        finalCost = totalCost - discount;
    }
    
    return {
        baseCost: totalCost,
        discount: people > 3 ? totalCost * 0.10 : 0,
        finalCost: finalCost,
        breakdown: {
            destination: destinationTotal,
            transport: transportTotal,
            hotel: hotelTotal
        }
    };
};

// Function to get all destinations (arrow function)
export const getAllDestinations = () => {
    return [...destinations]; // Return a copy to avoid direct modification
};

// Function to get a destination by ID (arrow function)
export const getDestinationById = (id) => {
    return destinations.find(dest => dest.id === id);
};

// Function to delete a destination (arrow function)
export const deleteDestination = (id) => {
    const index = destinations.findIndex(dest => dest.id === id);
    if (index !== -1) {
        destinations.splice(index, 1);
        return true;
    }
    return false;
};

// Function to get available destinations for dropdown (arrow function)
export const getUniqueDestinations = () => {
    const uniqueNames = [...new Set(destinations.map(dest => dest.name))];
    return uniqueNames;
};

// Function to format currency (arrow function)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
};

// Function to validate date (arrow function)
export const isDateValid = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
};