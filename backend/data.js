import bcrypt from 'bcryptjs';

// data de las categorias de reparaciones

const data = {
    users: [
        {
            name: 'Ricardo Martinez',
            email: 'admin@email.com',
            password: bcrypt.hashSync('123123'),
            isAdmin: true,
        },
        {
            name: 'Hanael martinoli',
            email: 'perroide@chipsi.com',
            password: bcrypt.hashSync('123123'),
            isAdmin: false,
        },
        {
            name: 'Miguel hernandez',
            email: 'mikkel@email.com',
            password: bcrypt.hashSync('123123'),
            isAdmin: false,
        },
    ],

    products: [
        {
            // _id: '1',
            name: 'Reparacion de iphones',
            slug: 'reparacion-apple-iphone-11-screen',
            category: 'smartphones',
            brand: 'apple',
            line: 'iphone',
            model: '11',
            part: 'screen',
            price: 400,
            countInStock: 12,   
            description: 'Pantalla rota, pixeles apagados, pantalla no enciende',
            rating: 5,
            numReviews: 14,
            image: '/images/bcknd.jpeg',

        },
        {
            // _id: '2',
            name: 'Reparacion de huawei',
            slug: 'reparacion-huawei-mate-8-screen',
            category: 'smartphones',
            brand: 'huawei',
            line: 'mate',
            model: '8',
            part: 'screen',
            price: 1170,
            countInStock: 12,      
            description: 'Pantallas rotas, centros de carga, bateria, camara, botones',
            rating: 4.5,
            numReviews: 14,
            image: '/images/brk.jpeg',

        },
        {
            // _id: '3',
            name: 'reparacion de zte',
            slug: 'reparaciones-zte-blade-v-3-pantalla',
            category: 'smartphones',
            brand: 'zte',
            line: 'blade',
            model: '3',
            part: 'screen',
            price: 120,
            countInStock: 12,    
            description: 'Pantallas rotas, centros de carga, bateria, camara, botones',
            rating: 3.9,
            numReviews: 13,
            image: '/images/iph.jpeg',

        },
        {
            // _id: '4',
            name: 'Reparacion de motorola',
            slug: 'reparaciones-motorola-motox-play-pantalla',
            category: 'smartphones',
            brand: 'motorola',
            line: 'moto x',
            model: 'play',
            part: 'screen',
            price: 700,
            countInStock: 12,      
            description: 'Pantallas rotas, centros de carga, bateria, camara, botones',
            rating: 4.7,
            numReviews: 10,
            image: '/images/bcknd.jpeg',

        },
        
    ]
};

export default data;