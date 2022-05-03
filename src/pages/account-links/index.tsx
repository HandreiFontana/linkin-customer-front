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
    const [categories, setCategories] = useState([]);
    const [links, setLinks] = useState([]);

    const params = useParams<RouteParams>()

    useEffect(() => {
        async function loadCategories() {
            const { id } = params

            try {
                const categoriesValues: Category[] = []
                const linksValues: Link[] = []

                const responseCategories = await api.get(`/categories/${id}`);

                responseCategories.data.map(async (category: Category) => {
                    categoriesValues.push(category)
                })

                setCategories(categoriesValues as []) // "as []" remove error

                const responseLinks = await api.get(`/links/${id}`);

                responseLinks.data.map(async (link: Link) => {
                    linksValues.push(link)
                })

                setLinks(linksValues as []) // "as []" remove error
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
        <>
            <div>
                {categories.map((category: Category) => (
                    <>
                        <h1 key={category.id}>{category.name}</h1>
                        <div>
                            {links.filter((link: Link) => link.category_id === category.id).map((link: Link) => (
                                <div key={link.id}>
                                    <h3>{link.title}</h3>
                                    <p>{link.description}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default AccountLinks