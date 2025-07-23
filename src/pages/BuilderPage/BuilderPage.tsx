import { Spin } from "antd";
import { useGetCountries } from "../../services/countries/useGetCountires";

export const BuilderPage = () => {
  const { countries, isCountriesLoading } = useGetCountries();

  if (isCountriesLoading) {
    return <Spin size="large" />
  }

  return (
    <div>
      <h1>BuilderPage</h1>
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </div>
  )
}
