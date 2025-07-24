import { Input, Spin, Typography } from "antd";
import { useGetCountries } from "../../services/countries/useGetCountires";
import type { Country } from "../../domain/country";
import { useState } from "react";
import { CountryDraggableCard } from "../CountryDraggableCard/CountryDraggableCard";

interface AddCountryNodePanelProps {
    onAddCountryNode: (country: Country) => void;
}

export const AddCountryNodePanel = ({ onAddCountryNode }: AddCountryNodePanelProps) => {
    const { countries, isCountriesLoading } = useGetCountries();
    const [search, setSearch] = useState('');


    if (isCountriesLoading) {
        return <Spin size="large" />
    }

    return (
        <div>
            <Typography.Title level={5}>Choose a country</Typography.Title>
            <Input placeholder="Search for a country" onChange={(e) => setSearch(e.target.value)} />
            {countries?.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase())).map((country) => (
                <CountryDraggableCard
                    id={country.name.common}
                    country={country}
                    onAddCountryNode={onAddCountryNode}
                />
            ))}
        </div>
    )
}
