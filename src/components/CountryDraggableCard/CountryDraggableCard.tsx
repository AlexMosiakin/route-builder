import { useDraggable } from "@dnd-kit/core";
import type { Country } from "../../domain/country";
import { Card } from "antd";

interface CountryDraggableCardProps {
    id: string;
    country: Country;
    onAddCountryNode: (country: Country) => void;
}

export const CountryDraggableCard = ({
    id,
    country,
    onAddCountryNode,
}: CountryDraggableCardProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: {
            country,
        },
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Card key={country.name.common} style={{ marginBottom: '10px' }} onClick={() => onAddCountryNode(country)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>{country.flag}</span>
                    <span>{country.name.common}</span>
                </div>
            </Card>
        </div>
    )
}
