import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('@/components/Map'), {
    loading: () => <p>Loading...</p>,
})


export default function Map() {
    return (
        <DynamicMap />
    );
}
