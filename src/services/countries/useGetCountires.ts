import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../api/countries/countries";
import type { Country } from "../../domain/country";

export const useGetCountries = () => {
    const { data, isLoading, error } = useQuery<Country[]>({
        queryKey: ['countriesAll'],
        queryFn: fetchCountries,
    });

    return {
        countries: data,
        isCountriesLoading: isLoading,
        countriesError: error,
    }
};