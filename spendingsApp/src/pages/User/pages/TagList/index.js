import React from 'react';
import { ListFactory } from '../Factory'

export default ListFactory({
    pageTitle: 'Tags',
    list: {
        source: [
            { label: 'Alimentação', route: 'View' },
            { label: 'Transporte', route: 'View' },
            { label: 'Moradia', route: 'View' },
            { label: 'Mercado', route: 'View' },
        ],
        onPress: ({ navigation }, item) => {
            console.tron.log(item);
        }
    }
})
