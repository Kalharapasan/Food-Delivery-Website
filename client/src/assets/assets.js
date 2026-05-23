import logo from './logo.jpg'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'

const createMenuIcon = (label, background) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${background}" />
                    <stop offset="100%" stop-color="#111827" />
                </linearGradient>
            </defs>
            <rect width="96" height="96" rx="24" fill="url(#bg)" />
            <circle cx="48" cy="44" r="22" fill="rgba(255,255,255,0.15)" />
            <text x="48" y="52" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff">${label}</text>
        </svg>
    `

    return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const assets ={
    logo,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon
}

export const menu_list = [
    { menu_name: 'Salad', menu_image: createMenuIcon('S', '#10B981') },
    { menu_name: 'Rolls', menu_image: createMenuIcon('R', '#F59E0B') },
    { menu_name: 'Deserts', menu_image: createMenuIcon('D', '#EC4899') },
    { menu_name: 'Sandwich', menu_image: createMenuIcon('Sa', '#3B82F6') },
    { menu_name: 'Cake', menu_image: createMenuIcon('C', '#8B5CF6') },
    { menu_name: 'Pure Veg', menu_image: createMenuIcon('PV', '#22C55E') },
    { menu_name: 'Pasta', menu_image: createMenuIcon('P', '#F97316') },
    { menu_name: 'Noodles', menu_image: createMenuIcon('N', '#14B8A6') }
]

export const url = 'http://localhost:4000'