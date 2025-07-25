import { Input, Spin, Typography } from "antd";
import { useGetCountries } from "../../services/countries/useGetCountires";
import type { Country } from "../../domain/country";
import { useState } from "react";
import { CountryDraggableCard } from "../CountryDraggableCard/CountryDraggableCard";
import { type Node } from '@xyflow/react'

interface AddCountryNodePanelProps {
    nodes: Node[];
    onAddCountryNode: (country: Country) => void;
}

export const AddCountryNodePanel = ({ nodes, onAddCountryNode }: AddCountryNodePanelProps) => {
    const { countries, isCountriesLoading } = useGetCountries();
    const [search, setSearch] = useState('');
    const style = {
        wrapper: {
            padding: '0 20px',
            maxHeight: '100vh',
            overflowY: 'scroll',
        },
        countrySearchInput: {
            marginBottom: '10px',
        },
    }

    const unselectedCountries = countries?.filter((country) => !nodes.some((node) => node.id === country.name.common));

    if (isCountriesLoading) {
        return <Spin size="large" />
    }

    return (
        <div style={style.wrapper as React.CSSProperties}>
            <Typography.Title level={5}>Choose a country</Typography.Title>
            <Input placeholder="Search for a country" onChange={(e) => setSearch(e.target.value)} style={style.countrySearchInput} />
            {unselectedCountries?.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase())).map((country) => (
                <CountryDraggableCard
                    id={country.name.common}
                    country={country}
                    onAddCountryNode={onAddCountryNode}
                    key={country.name.common}
                />
            ))}
        </div>
    )
}
