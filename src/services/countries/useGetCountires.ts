import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../api/countries/countries";

export const useGetCountries = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['countriesAll'],
        queryFn: fetchCountries,
    });

    return {
        countries: data,
        isCountriesLoading: isLoading,
        countriesError: error,
    }
};