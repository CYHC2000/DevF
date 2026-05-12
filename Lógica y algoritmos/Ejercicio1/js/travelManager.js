const destinations = [];

const destinationPrices = new Map([
    ['paris', 800],
    ['londres', 750],
    ['nueva york', 600],
    ['tokio', 1000],
    ['sydney', 900],
    ['toronto', 700],
    ['ciudad de méxico', 650],
    ['honkong', 680],
    ['rio de janeiro', 680]
]);

const transportCosts = {
    plane: 500,
    train: 200,
    bus: 100,
    car: 150
};

const hotelCostPerNight = 80;

export const addDestination = (destination, date, transport, nights, people) => {
    if (!destination || !date || !transport) {
        throw new Error('Todos los campos son obligatorios');
    }

    const newDestination = {
        id: Date.now(),
        name: destination,
        key: destination.toLowerCase,
        date,
        transport,
        nights: parseInt(nights),
        people: parseInt(people)
    };

    destinations.push(newDestination);
    return newDestination;
};

export const calculateCost = (destination, transport, nights = 3, people = 1) => {
    const destinationPrice = destinationPrices.get(destination.toLowerCase()) || 500;
    const transportPrice = transportCosts[transport] || 150;

    const hotelTotal = hotelCostPerNight * nights * people;
    const transportTotal = transportPrice * people;
    const destinationTotal = destinationPrice * people;

    const total = hotelTotal + transportTotal + destinationTotal;

    const discount = people > 3 ? total * 0.1 : 0;

    return {
        finalCost: total - discount,
        discount,
        breakdown: {
            hotel: hotelTotal,
            transport: transportTotal,
            destination: destinationTotal
        }
    };
};

export const getAllDestinations = () => [...destinations];

export const deleteDestination = (id) => {
    const index = destinations.findIndex(d => d.id === id);
    if (index !== -1) destinations.splice(index, 1);
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
};

export const isDateValid = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0,0,0,0);
    return date >= today;
};