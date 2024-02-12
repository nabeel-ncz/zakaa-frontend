export default function Skeleton({ width, height }: any) {
    return (
        <div
            className={`bg-gray-300 animate-pulse rounded`}
            style={{ width, height }}
        ></div>
    );
};
