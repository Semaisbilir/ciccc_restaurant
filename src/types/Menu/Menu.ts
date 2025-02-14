export interface itemMenuProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    photo: string;
    price: string;
    desc: string;
}

export interface MenuProps {
    menuItems: itemMenuProps[];
}

export interface MenuListProps {
    items: any[];
    onAddToCart?: (item: any) => void;
    onViewFullMenu?: () => void;
    onViewDetails?: () => void;
}
