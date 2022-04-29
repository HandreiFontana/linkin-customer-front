import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

interface RouteParams {
    id: string;
}

interface Category {
    id: string;
    name: string;
}

interface Link {
    id: string;
    title: string;
    description: string;
    url: string;
    isPrivate: boolean;
    category_id: string;
}

const AccountLinks: React.FC = () => {
    const [categories, setCategories] = useState([])

    const params = useParams<RouteParams>()

    useEffect(() => {
        async function loadCategories() {
            const { id } = params

            try {
                const categoriesValues: Category[] = []
                const response = await api.get(`/categories/${id}`);

                response.data.map(async (category: Category) => {
                    categoriesValues.push(category)
                })

                setCategories(categoriesValues as []) // "as []" remove error
            } catch (e) {
                console.log(e);
                return;
            }
        }

        if (params.id) {
            loadCategories()
        }
    }, [params, params.id])


    return (
        <div>
            {categories.map((category: Category) => (
                <h1 key={category.id}>{category.name}</h1>
            ))}
        </div>
    )
}

export default AccountLinks