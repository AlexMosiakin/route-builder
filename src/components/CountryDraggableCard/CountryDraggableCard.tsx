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
    const style = {
        wrapper: transform ? {
            opacity: 0.5,
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,    
            cursor: 'grabbing',
            position: 'fixed',
            zIndex: 10,
        } : undefined,
        card: {
            marginBottom: '10px',
            cursor: 'pointer',
            width: '300px',
        },
        cardContent: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            fontSize: '22px',
        },
    };

    return (
        <div ref={setNodeRef} style={style.wrapper as React.CSSProperties} {...listeners} {...attributes}>
            <Card hoverable key={country.name.common} style={style.card} onClick={() => onAddCountryNode(country)}>
                <div style={style.cardContent}>
                    <span>{country.flag}</span>
                    <span>{country.name.common}</span>
                </div>
            </Card>
        </div>
    )
}
